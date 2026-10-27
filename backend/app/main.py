import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from .config import get_allowed_origins, get_mail_settings, get_rate_limit_per_hour
from .emailer import EmailDeliveryError, send_inquiry_notification
from .rate_limit import InMemoryRateLimiter
from .schemas import InquiryAccepted, InquiryIn
from .storage import create_inquiry, init_db

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()

    mail = get_mail_settings()
    if not mail.is_configured:
        logger.warning(
            "Inquiry email notifications are disabled. Set OZEE_MAIL_TO, "
            "OZEE_SMTP_USERNAME, and OZEE_SMTP_PASSWORD to enable them. "
            "Inquiries will still be stored in SQLite."
        )
    else:
        logger.info("Inquiry email notifications enabled for %s", mail.mail_to)

    yield


app = FastAPI(
    title="OzeePower API",
    version="0.1.0",
    description="Inquiry API for the OzeePower showcase website.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

limiter = InMemoryRateLimiter(limit=get_rate_limit_per_hour())


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("X-Frame-Options", "DENY")
        return response


app.add_middleware(SecurityHeadersMiddleware)


def error_response(code: str, message: str, http_status: int, fields=None) -> JSONResponse:
    payload: dict = {"error": {"code": code, "message": message}}
    if fields:
        payload["error"]["fields"] = fields
    return JSONResponse(status_code=http_status, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    fields = []
    for error in exc.errors():
        location = [part for part in error.get("loc", ()) if part not in ("body", "query")]
        field = ".".join(str(part) for part in location) or "request"
        message = error.get("msg", "Invalid value.").removeprefix("Value error, ")
        fields.append({"field": field, "message": message})

    return error_response(
        "VALIDATION_ERROR",
        "Please review the submitted fields.",
        status.HTTP_400_BAD_REQUEST,
        fields=fields,
    )


def client_key(request: Request) -> str:
    if request.client and request.client.host:
        return request.client.host
    return "unknown"


@app.get("/api/v1/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post(
    "/api/v1/inquiries",
    response_model=InquiryAccepted,
    status_code=status.HTTP_201_CREATED,
)
def submit_inquiry(payload: InquiryIn, request: Request):
    # Sync endpoint: FastAPI runs it in a thread pool so the blocking SMTP
    # delivery below does not stall the event loop.
    if not limiter.allow(client_key(request)):
        return error_response(
            "RATE_LIMITED",
            "Too many inquiries from this address. Please try again later or call us directly.",
            status.HTTP_429_TOO_MANY_REQUESTS,
        )

    # Spam trap: real visitors leave the hidden field empty.
    if payload.company:
        return error_response(
            "VALIDATION_ERROR",
            "Please review the submitted fields.",
            status.HTTP_400_BAD_REQUEST,
            fields=[{"field": "request", "message": "Submission rejected."}],
        )

    inquiry = payload.model_dump()
    reference = create_inquiry(inquiry)

    notification_sent = False
    try:
        notification_sent = send_inquiry_notification(inquiry, reference)
    except EmailDeliveryError:
        # The inquiry is already stored. Keep the request successful and let
        # the UI tell the visitor that the email copy did not go out.
        logger.exception("Inquiry %s stored but email notification failed", reference)

    return InquiryAccepted(
        id=reference,
        message="Your inquiry has been received.",
        notification_sent=notification_sent,
    )

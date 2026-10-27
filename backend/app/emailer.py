import html
import logging
import smtplib
import ssl
import time
from datetime import datetime, timezone
from email.message import EmailMessage
from email.utils import formataddr, formatdate, make_msgid

from .config import MailSettings, get_mail_settings

logger = logging.getLogger(__name__)


class EmailDeliveryError(RuntimeError):
    """Raised when the notification could not be delivered."""


def _clean(value) -> str:
    if value is None or value == "":
        return "—"
    return str(value)


def _subject(name: str, reference: str) -> str:
    safe_name = " ".join(str(name).split())
    return f"[OzeePower] New inquiry {reference} — {safe_name}"


def _plain_body(inquiry: dict, reference: str) -> str:
    consent = "yes" if inquiry.get("consent_to_contact") else "no"
    return "\n".join(
        [
            "New inquiry received from the OzeePower website.",
            "",
            f"Reference: {reference}",
            f"Received (UTC): {datetime.now(timezone.utc):%Y-%m-%d %H:%M}",
            "",
            f"Name: {_clean(inquiry.get('name'))}",
            f"Email: {_clean(inquiry.get('email'))}",
            f"Phone: {_clean(inquiry.get('phone'))}",
            f"Sector: {_clean(inquiry.get('project_type'))}",
            f"Location: {_clean(inquiry.get('location'))}",
            f"Preferred solution: {_clean(inquiry.get('preferred_product'))}",
            f"Estimated monthly bill: {_clean(inquiry.get('estimated_bill'))}",
            f"Consent to contact: {consent}",
            "",
            "Message:",
            _clean(inquiry.get("message")),
            "",
            "--",
            "This notification was sent to the address configured in OZEE_MAIL_TO.",
            "Reply directly to this email to respond to the inquirer when a Reply-To address is present.",
        ]
    )


def _html_body(inquiry: dict, reference: str) -> str:
    consent = "Yes" if inquiry.get("consent_to_contact") else "No"
    rows = [
        ("Reference", reference),
        ("Received (UTC)", f"{datetime.now(timezone.utc):%Y-%m-%d %H:%M}"),
        ("Name", _clean(inquiry.get("name"))),
        ("Email", _clean(inquiry.get("email"))),
        ("Phone", _clean(inquiry.get("phone"))),
        ("Sector", _clean(inquiry.get("project_type"))),
        ("Location", _clean(inquiry.get("location"))),
        ("Preferred solution", _clean(inquiry.get("preferred_product"))),
        ("Estimated monthly bill", _clean(inquiry.get("estimated_bill"))),
        ("Consent to contact", consent),
    ]

    table_rows = "\n".join(
        "<tr>"
        f'<th align="left" style="padding:6px 12px 6px 0;color:#475569;font-weight:600;">{html.escape(label)}</th>'
        f'<td style="padding:6px 0;color:#0f172a;">{html.escape(value)}</td>'
        "</tr>"
        for label, value in rows
    )

    message = html.escape(_clean(inquiry.get("message"))).replace("\n", "<br>")

    return f"""\
<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f5f8fc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
      <div style="background:#0b2d5c;padding:20px 24px;color:#ffffff;">
        <div style="font-size:18px;font-weight:700;">OzeePower</div>
        <div style="font-size:13px;color:#a7f3d0;margin-top:4px;">New website inquiry</div>
      </div>
      <div style="padding:24px;">
        <h1 style="font-size:18px;margin:0 0 16px;color:#0b2d5c;">New inquiry {html.escape(reference)}</h1>
        <table style="border-collapse:collapse;font-size:14px;width:100%;">{table_rows}</table>
        <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#475569;margin:24px 0 8px;">Message</h2>
        <div style="font-size:14px;line-height:1.6;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;">{message}</div>
      </div>
      <div style="padding:14px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
        Sent to the address configured in <code>OZEE_MAIL_TO</code>. Reply directly to this email to respond to the inquirer when a Reply-To address is present.
      </div>
    </div>
  </body>
</html>"""


def _build_message(settings: MailSettings, inquiry: dict, reference: str) -> EmailMessage:
    message = EmailMessage()
    message["Subject"] = _subject(inquiry.get("name", ""), reference)
    message["From"] = formataddr(("OzeePower Website", settings.mail_from))
    message["To"] = settings.mail_to
    message["Date"] = formatdate(localtime=False)
    message["Message-ID"] = make_msgid(domain="ozeepower.com.ph")

    inquirer_email = (inquiry.get("email") or "").strip()
    if inquirer_email:
        message["Reply-To"] = inquirer_email

    message.set_content(_plain_body(inquiry, reference))
    message.add_alternative(_html_body(inquiry, reference), subtype="html")
    return message


def _deliver(settings: MailSettings, message: EmailMessage) -> None:
    context = ssl.create_default_context()

    if settings.use_ssl:
        with smtplib.SMTP_SSL(
            settings.host, settings.port, timeout=15, context=context
        ) as smtp:
            smtp.login(settings.username, settings.password)
            smtp.send_message(message)
        return

    with smtplib.SMTP(settings.host, settings.port, timeout=15) as smtp:
        smtp.ehlo()
        if settings.use_tls:
            smtp.starttls(context=context)
            smtp.ehlo()
        smtp.login(settings.username, settings.password)
        smtp.send_message(message)


def send_inquiry_notification(
    inquiry: dict,
    reference: str,
    settings: MailSettings | None = None,
    attempts: int = 2,
) -> bool:
    """Send the inquiry to the company inbox.

    Returns False when email is not configured. Raises EmailDeliveryError
    when delivery was attempted but failed; the inquiry is already stored
    before this function is called.
    """
    settings = settings or get_mail_settings()

    if not settings.is_configured:
        logger.warning(
            "Email notification skipped for %s: OZEE_MAIL_TO, "
            "OZEE_SMTP_USERNAME, and OZEE_SMTP_PASSWORD are not configured.",
            reference,
        )
        return False

    message = _build_message(settings, inquiry, reference)
    last_error: Exception | None = None

    for attempt in range(1, attempts + 1):
        try:
            _deliver(settings, message)
            logger.info("Inquiry notification sent: %s", reference)
            return True
        except (smtplib.SMTPException, OSError) as exc:
            last_error = exc
            logger.warning(
                "Email notification attempt %s/%s failed for %s: %s",
                attempt,
                attempts,
                reference,
                exc.__class__.__name__,
            )
            if attempt < attempts:
                time.sleep(1)

    raise EmailDeliveryError(
        f"Email notification failed for {reference}: "
        f"{last_error.__class__.__name__ if last_error else 'unknown error'}"
    ) from last_error

# API Routes

> **Status:** `GET /api/v1/health` and `POST /api/v1/inquiries` are
> implemented in `backend/` and covered by tests. There is no staff
> inquiry-management interface; inquiries are emailed to the company
> Gmail inbox and kept in SQLite as a backup.

## 1. API strategy

Implemented: a React frontend calls a Python FastAPI backend. Valid
inquiries are stored in SQLite, emailed to the company inbox, and returned
with a public reference code. The browser never receives backend
credentials.

-   **Phase 1 (implemented):** Static showcase, product/service
    information, contact links, and a working inquiry endpoint.
-   **Phase 2 (implemented):** `POST /api/v1/inquiries` stores
    submissions and sends a Gmail SMTP notification when configured.
-   **Staff management:** intentionally out of scope. No admin routes or
    UI are planned for this showcase.

Suggested API prefix: `/api/v1`.

## 2. Implemented routes

  -------------------------------------------------------------------------------
  Method            Route                     Purpose           Authentication
  ----------------- ------------------------- ----------------- -----------------
  `GET`             `/api/v1/health`          Health check for  None; exposes no
                                              deployment        sensitive details
                                              monitoring

  `POST`            `/api/v1/inquiries`       Submit a          Public, with
                                              consultation or   validation and
                                              quotation inquiry abuse protection
  -------------------------------------------------------------------------------

The inquiry is stored in SQLite and, when Gmail SMTP is configured, a
notification email is sent to the company inbox. No staff list, update,
or delete routes exist, by design.

Implementation status:

-   `GET /api/v1/health` --- implemented.
-   `POST /api/v1/inquiries` --- implemented: validation, honeypot,
    rate limit, SQLite storage, email notification.
-   Staff routes --- out of scope; not implemented and not planned.

## 3. Inquiry request contract

`POST /api/v1/inquiries`

Example request:

``` json
{
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "phone": "+63 9XX XXX XXXX",
  "projectType": "residential",
  "location": "Cabanatuan City, Nueva Ecija",
  "message": "I would like to request a solar installation quotation.",
  "consentToContact": true
}
```

Fields:

-   `name` --- required, trimmed, reasonable maximum length.
-   `email` --- optional if phone is supplied; validate format when
    provided.
-   `phone` --- optional if email is supplied; validate length and
    allowed characters.
-   `projectType` --- required enum: `residential`, `commercial`,
    `industrial`, or `other`.
-   `location` --- optional.
-   `preferredProduct` --- optional, length-limited; the product or
    service the visitor is interested in.
-   `estimatedBill` --- optional, length-limited; the visitor's stated
    monthly electricity bill from the estimator.
-   `message` --- required, length-limited plain text.
-   `consentToContact` --- required boolean indicating the user agrees
    to be contacted about the inquiry.
-   `company` --- hidden honeypot field; must be empty. Real clients
    send an empty string.

Do not collect unnecessary personal information. Publish an appropriate
privacy notice before collecting inquiries.

## 4. Success and error responses

Success response (`201 Created`):

``` json
{
  "id": "OP-20261026-DC1C92",
  "message": "Your inquiry has been received.",
  "notificationSent": true
}
```

`notificationSent` is `false` when the inquiry was stored but the company
email could not be sent (unconfigured SMTP or delivery failure). The
frontend must show a warning and phone/email fallbacks in that case; it
must not claim an email was delivered.

Validation response (`400 Bad Request`):

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please review the submitted fields."
  }
}
```

Use `401 Unauthorized` for missing authentication, `403 Forbidden` for
insufficient permissions, `404 Not Found` for unknown records,
`429 Too Many Requests` for rate limits, and `500 Internal Server Error`
for unexpected failures. Do not return stack traces, secrets, or
database details to public clients.

## 5. Validation and security requirements

-   Validate all submitted data on the server; client-side validation is
    only for user experience.
-   Use HTTPS in production.
-   Apply rate limiting, spam protection, request size limits, and
    server-side validation.
-   Escape or safely render user-provided content to prevent cross-site
    scripting.
-   Use parameterized queries or a safe ORM if a database is used.
-   Keep credentials in environment variables or a secrets manager,
    never in committed files or `VITE_*` variables.
-   There are no staff endpoints. Do not add any without a separately
    approved requirement, authentication, and authorization.
-   Send notification email only to the company address configured in
    `OZEE_MAIL_TO`; never expose SMTP credentials to the browser.
-   Define inquiry retention, access, and deletion rules before
    production.
-   Log operational events without unnecessarily logging personal data.
-   Add tests for valid submissions, invalid fields, abuse controls, and
    authorization.

## 6. Implementation decision log

Recorded 2026-10-26:

-   Backend: Python 3.12 + FastAPI, served with Uvicorn.
-   Data store: SQLite (`backend/data/inquiries.db`, configurable with
    `OZEE_DB_PATH`) kept as a backup record.
-   Email delivery: **implemented** with Gmail SMTP. Configure
    `OZEE_MAIL_TO`, `OZEE_SMTP_USERNAME`, `OZEE_SMTP_PASSWORD`, and
    optionally `OZEE_MAIL_FROM` (defaults to the username). Defaults:
    `smtp.gmail.com:587` with STARTTLS; port `465` with
    `OZEE_SMTP_USE_SSL=true` is also supported. Delivery is retried once
    before failing.
-   Email failure behavior: the inquiry remains stored, the API returns
    `201` with `notificationSent: false`, and the UI shows phone/email
    fallbacks.
-   Staff inquiry management: **out of scope**. The company receives
    inquiries by email and does not need an admin interface.
-   Spam controls: hidden honeypot field plus an in-memory per-IP rate
    limit (`OZEE_RATE_LIMIT_PER_HOUR`, default 5). The limiter is
    per-process and should be replaced with a shared store before
    running multiple workers.
-   Validation: Pydantic schemas enforce required fields, lengths,
    contact-method presence, phone digit count, and consent.
-   CORS: origins from `OZEE_ALLOWED_ORIGINS` (defaults to local
    development origins).
-   Privacy: the form states that submitted details are used only to
    respond to the inquiry. A formal privacy notice and retention policy
    still require approval.

Before production, record hosting, the exact Gmail recipient and App
Password setup, a shared rate-limit store, retention/deletion rules, and
monitoring in `SOURCE_OF_TRUTH.md`.

# OzeePower Backend

FastAPI service for the public inquiry form. The frontend calls
`POST /api/v1/inquiries`. Each accepted inquiry is:

1. stored in SQLite (backup record), and
2. emailed to the company inbox through Gmail SMTP when configured.

The API returns a public reference code (`OP-YYYYMMDD-XXXXXX`).

## Status

Implemented:

- `GET /api/v1/health`
- `POST /api/v1/inquiries` with server-side validation, a hidden spam
  trap, a per-IP hourly rate limit, SQLite persistence, and an email
  notification.
- Plain-text and HTML notification emails with `Reply-To` set to the
  inquirer when they supplied an email address.

Not implemented (and not planned for the showcase MVP):

- Staff authentication and inquiry-management routes. No staff UI is
  required; the company reads inquiries in its Gmail inbox.
- SMS notification.

Known limitations:

- Rate limiting is in memory and per process. Use a shared store before
  running multiple workers.
- If email delivery fails, the inquiry remains in SQLite and the API
  returns `201` with `notificationSent: false`. The UI then asks the
  visitor to call or email directly.

## Local setup

From the `backend` directory:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
python -m uvicorn app.main:app --reload --port 8000
```

Open http://127.0.0.1:8000/docs for the interactive API docs.

## Tests

```powershell
python -m pytest
```

Tests never send real email. The API tests explicitly clear SMTP
environment variables, and the emailer tests replace the SMTP transport
with a fake.

## Gmail notification setup

1. Enable 2-Step Verification on the company Google account.
2. Create a Gmail App Password at
   <https://myaccount.google.com/apppasswords>.
3. Copy `.env.example` to `.env` and fill in:

```dotenv
OZEE_MAIL_TO=company-inbox@gmail.com
OZEE_SMTP_USERNAME=company-inbox@gmail.com
OZEE_SMTP_PASSWORD=the-16-character-app-password
OZEE_MAIL_FROM=company-inbox@gmail.com
```

Never commit `.env`. The `.gitignore` excludes `.env` and `.env.*`
except `.env.example`.

Gmail defaults are already applied:

- `OZEE_SMTP_HOST=smtp.gmail.com`
- `OZEE_SMTP_PORT=587` with STARTTLS (`OZEE_SMTP_USE_TLS=true`)
- Use port `465` and `OZEE_SMTP_USE_SSL=true` if you prefer implicit SSL.

If any of `OZEE_MAIL_TO`, `OZEE_SMTP_USERNAME`, or `OZEE_SMTP_PASSWORD`
is missing, notifications are skipped, a warning is logged at startup,
and the API returns `notificationSent: false`.

## Configuration

Copy `.env.example` to `.env` (loaded automatically) or set the values in
your shell. Available settings:

- `OZEE_DB_PATH` - SQLite file path.
- `OZEE_ALLOWED_ORIGINS` - comma-separated CORS origins.
- `OZEE_RATE_LIMIT_PER_HOUR` - submissions allowed per IP per hour.
- `OZEE_MAIL_TO` - company inbox that receives inquiry notifications.
- `OZEE_SMTP_USERNAME` - Gmail address used to authenticate SMTP.
- `OZEE_SMTP_PASSWORD` - Gmail App Password (not the account password).
- `OZEE_MAIL_FROM` - sender address; defaults to `OZEE_SMTP_USERNAME`.
- `OZEE_SMTP_HOST`, `OZEE_SMTP_PORT`, `OZEE_SMTP_USE_TLS`,
  `OZEE_SMTP_USE_SSL` - SMTP transport overrides.

> The current rate limiter is in memory and per process. Replace it with
> a shared store before running multiple workers in production.

# OzeePower Showcase Website

Responsive showcase site for OzeePower Solar & Energy Solutions, built
with React + Vite + TypeScript and a Python (FastAPI) inquiry API.
Submitting an inquiry stores it in SQLite and emails the company Gmail
inbox when SMTP is configured.

## Project structure

```text
ozee_main/
  Docs/                  Project scope, plan, API contract, source of truth
  src/
    components/          Page sections and modals
    data/                Central company/product/process content
    types/               Shared TypeScript types
    lib/api.ts           Inquiry API client
    App.tsx              Page composition and modal/form state
    index.css            Tailwind entry + brand design tokens
  public/assets/         Brochure image
  backend/
    app/                 FastAPI app, schemas, storage, rate limit, emailer
    tests/               API and email tests
  index.html
  vite.config.ts         Vite + Tailwind + local /api proxy
```

## Frontend

```powershell
npm.cmd install
npm.cmd run dev
```

- Dev server: http://localhost:3000
- API calls to `/api` are proxied to http://127.0.0.1:8000.
- Set `VITE_API_URL` for a deployed API origin (see `.env.example`).

## Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
python -m uvicorn app.main:app --reload --port 8000
```

## Inquiry email notifications

Inquiries are always stored in SQLite. To also email the company Gmail
inbox, copy `backend/.env.example` to `backend/.env` and set:

```dotenv
OZEE_MAIL_TO=company-inbox@gmail.com
OZEE_SMTP_USERNAME=company-inbox@gmail.com
OZEE_SMTP_PASSWORD=the-gmail-app-password
OZEE_MAIL_FROM=company-inbox@gmail.com
```

Use a Gmail App Password, not the normal account password. When email is
not configured or delivery fails, the API still returns success with
`notificationSent: false`, and the form shows phone/email fallbacks
instead of claiming an email was sent.

See `backend/README.md` for full configuration and limitation notes.

## Checks

```powershell
npm.cmd run lint     # TypeScript, no emit
npm.cmd run build    # type-check + production build
cd backend; python -m pytest
```

## Documentation

Read `Docs/SOURCE_OF_TRUTH.md` before changing business facts or claims.
Brochure-derived product details, contact numbers, certifications, and
savings figures still require company confirmation before launch.

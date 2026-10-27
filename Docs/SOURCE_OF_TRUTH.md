# Source of Truth

## Purpose

This document records what is known, what is proposed, and what must be
verified for the OzeePower showcase website. It prevents assumptions
from being mistaken for company-approved facts or implemented
functionality.

## Authority order

When sources conflict, use this order:

1.  Explicit, recent approval from the authorized OzeePower
    representative.
2.  Official company assets and current company-controlled channels.
3.  The supplied OzeePower brochure, as a reference that may be
    outdated.
4.  Project documentation and code comments.
5.  Developer assumptions, generic stock content, and AI-generated
    suggestions.

Never silently override a verified business fact. Record the change and
update affected pages and documents.

## Confirmed project context

-   Project name: **OzeePower Showcase Website**.
-   Purpose: public-facing company showcase, not a full business
    management system.
-   Initial reference: user-supplied OzeePower brochure image.
-   The brochure's central message is "Powering a Brighter and
    Sustainable Future."
-   The brochure presents residential, commercial, and industrial use
    cases.
-   The brochure describes a six-stage process from consultation through
    handover and after-sales support.
-   The brochure lists solar panels, inverters, hybrid systems, battery
    storage, transfer switches, protection devices, and
    cables/accessories.
-   The brochure displays several equipment brands. Their current
    availability and relationship with OzeePower must be confirmed
    before publication.

These statements describe the supplied reference. They do not
independently verify current company operations, stock, certifications,
or partnerships.

## Confirmed decisions

| Topic | Decision | Status |
| --- | --- | --- |
| Frontend | React 19 + Vite 7 | Confirmed 2026-10-26 |
| Language | TypeScript | Confirmed 2026-10-26 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`; brand tokens in `src/index.css` | Confirmed 2026-10-26 |
| Initial architecture | Static React showcase plus a Python inquiry API | Confirmed 2026-10-26 |
| Backend | Python 3.12, FastAPI, SQLite storage | Confirmed 2026-10-26 |
| Inquiry form | Implemented `POST /api/v1/inquiries`; inquiries are stored in SQLite and emailed to the company Gmail via SMTP when configured | Confirmed 2026-10-26 |
| Email notification | Gmail SMTP to the company inbox; SQLite kept as backup. Recipient address and App Password still to be supplied | Confirmed 2026-10-26 |
| Staff inquiry management | Not required; no admin UI or staff inquiry routes | Confirmed 2026-10-26 |
| Design source | `ozee_fronten_design2` was used as the frontend design reference | Confirmed 2026-10-26 |
| Hosting/domain | To be confirmed | Undecided |
| Analytics | Excluded until explicitly approved | Proposed exclusion |

When a decision is finalized, change the status to **Confirmed**,
include the date and decision owner if known, and update all affected
documents.

## Implementation status (2026-10-26)

-   Frontend foundation and homepage sections were ported from the
    `ozee_fronten_design2` design into `src/`.
-   Shared sections: header/navigation, hero, solutions, six-stage
    process, customer sectors, why-choose-us, brands, contact, footer,
    brochure modal, and product detail modal.
-   Design tokens and base accessibility styles live in
    `src/index.css`.
-   Central business content lives in `src/data/companyData.ts`.
-   Backend lives in `backend/` (FastAPI). Implemented routes:
    `GET /api/v1/health` and `POST /api/v1/inquiries`.
-   Inquiries are stored in SQLite. The API applies server-side
    validation, a hidden honeypot field, and a per-IP in-memory hourly
    rate limit.
-   When Gmail SMTP is configured, a plain-text and HTML notification is
    emailed to the company inbox with a `Reply-To` for the inquirer.
    Delivery is retried once before it is reported as failed.
-   Email failures do not lose the inquiry: the API still returns `201`
    with `notificationSent: false`, and the form shows phone/email
    fallbacks rather than claiming an email was delivered.
-   The form shows honest success and failure states and does not claim
    delivery when the API call fails.
-   `npm run build` and `npm run lint` pass. Backend tests pass.
-   Not implemented: SMS notification, staff authentication and
    inquiry-management routes (out of scope), shared/distributed rate
    limiting, and production hosting.
-   Pending: the exact company Gmail recipient and a Gmail App Password
    must be supplied before real delivery can be verified.

## Facts requiring verification before launch

-   Exact office address and current office hours.
-   Telephone numbers, email address, website domain, and social
    profiles.
-   Official logo files, logo usage rules, and brand colors.
-   Current products, specifications, availability, and warranties.
-   Current brand partnerships or authorized reseller status.
-   Installer qualifications, certifications, safety claims, and
    insurance claims.
-   Actual project photographs and permission to publish them.
-   Customer testimonials, case studies, savings figures, and
    performance claims.
-   Privacy notice, inquiry handling process, and data retention policy
    if a form is used.

Do not invent missing details. Use a clearly marked TODO in development,
or omit the detail from public output until verified.

## Content carried over from the design that still needs review

The ported design contains specific marketing and technical claims that
are **not verified** by this project. Review and approve or remove them
before launch:

-   Product efficiency, module wattage, cycle-life, warranty, and
    compliance figures in `src/data/companyData.ts`.
-   Estimated savings percentages and payback language used by the
    sectors estimator and cards.
-   "Tier-1", "certified", "PEC compliant", and similar qualification
    claims.
-   Brand relationships, manufacturer names, and recommended-brand
    lists.
-   Installation timelines and process deliverables.
-   Contact names, mobile numbers, office address, email, office hours,
    and map link.
-   Office photographs and the brochure image usage rights.

The UI labels these areas as brochure references rather than verified
facts, but the underlying content is still subject to company approval.

## Content rules

-   Use the brochure as reference material, not as proof of claims that
    may have changed.
-   Do not fabricate awards, certifications, statistics, guarantees,
    testimonials, customer logos, or completed projects.
-   Do not promise a specific electricity-bill reduction or system
    payback without reliable, context-specific evidence and approval.
-   Do not state a brand is an official partner or authorized
    distributor unless verified.
-   Do not publish personal contact information beyond the
    business-approved details.
-   Keep contact information in one central content/configuration source
    where practical, rather than duplicating it across components.

## Technical rules

-   The actual repository and tested code are the source of truth for
    implemented functionality.
-   A planned API route is not an implemented API route.
-   A UI form is not a working submission flow unless delivery has been
    tested end-to-end.
-   Do not store secrets in source control or frontend environment
    variables exposed to the browser.
-   Update diagrams and route documentation whenever the architecture
    changes.
-   Record dependencies, scripts, and framework versions based on the
    actual package manifest, not assumptions in this document.

## Change log

| Date | Change | Status |
| --- | --- | --- |
| 2026-10-23 | Initial source-of-truth document created from the supplied brochure and initial website concept | Initial draft |
| 2026-10-26 | Confirmed React + Vite + TypeScript + Tailwind frontend, Python FastAPI + SQLite backend, and working inquiry submission; recorded content-review items from the design | Confirmed |
| 2026-10-26 | Added Gmail SMTP inquiry notification with SQLite backup and `notificationSent` response flag; removed staff inquiry-management scope | Confirmed |

## Open decisions

-   Supply the exact company Gmail recipient address and confirm that a
    Gmail App Password can be created for it. Until then, real delivery
    cannot be verified.
-   Confirm hosting and domain ownership.
-   Confirm official content, contact information, and image assets,
    including all flagged claims above.
-   Confirm the inquiry retention and deletion policy.

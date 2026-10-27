# OzeePower Showcase Website

## Project overview

OzeePower's showcase website is intended to present the company's solar
power and energy solutions, explain its service process, establish
trust, and help residential, commercial, and industrial customers get in
touch.

The supplied OzeePower brochure is the initial content and visual
reference. The website should translate the brochure into a usable,
responsive web experience rather than reproduce the entire image as one
large banner.

## Main objectives

1.  Explain what OzeePower provides and whom it serves.
2.  Present product categories and end-to-end project services.
3.  Communicate the company's stated value propositions in clear
    language.
4.  Display verified contact details and provide straightforward inquiry
    paths.
5.  Establish a consistent, accessible, mobile-friendly company
    presence.

## Audience

-   Homeowners considering solar energy.
-   Businesses seeking to reduce operating costs or improve energy
    resilience.
-   Industrial customers with larger energy requirements.
-   People researching solar panels, inverters, hybrid systems,
    batteries, and electrical accessories.

## Content outline

### Hero

Use the brand line from the brochure as a starting point: "Powering a
Brighter and Sustainable Future." Pair it with a concise value statement
and a prominent contact or consultation action.

### Solutions and products

The brochure lists solar panels, inverters (on-grid and hybrid), hybrid
solar systems, battery energy storage systems, automatic transfer
switches, surge protection devices, electrical protection and safety
accessories, and cables/conduits/accessories. Verify current
availability and wording with the company before publishing.

### Project process

The brochure describes six stages: concept and consultation; system
design and engineering; supply of quality equipment; professional
installation; testing and commissioning; project handover and
after-sales support.

### Customer segments

Residential, commercial, and industrial applications.

### Trust and brand content

The brochure emphasizes trusted brands, safety and quality, an
experienced team, customized solutions, after-sales support, and
sustainability. Do not invent certifications, warranties, performance
figures, customer testimonials, or project outcomes.

### Contact

The brochure lists an office in Cabanatuan City, Nueva Ecija, plus
telephone numbers, email, and a website. Transcribe these details only
after checking the source image and confirm them with the business
before launch. Avoid treating OCR or small brochure text as
authoritative when uncertain.

## Design direction

-   Primary visual identity: deep navy/corporate blue, green accents,
    white or pale neutral backgrounds.
-   Photography: solar installations, equipment, and project teams;
    prioritize company-owned images.
-   Layout: strong hero, clear section hierarchy, restrained cards,
    legible typography, and visible calls to action.
-   Tone: professional, direct, helpful, and grounded in verifiable
    claims.
-   Motion: subtle and purposeful; respect reduced-motion preferences.

Suggested starter palette (not an official brand specification): navy
`#0B2D5C`, green `#278443`, white `#FFFFFF`, pale background `#F5F8FC`.
Confirm against official logo assets.

## Technology (confirmed 2026-10-26)

-   Frontend: React 19 + Vite 7.
-   Language: TypeScript.
-   Styling: Tailwind CSS v4 via `@tailwindcss/vite`, with brand design
    tokens in `src/index.css`.
-   Content: structured local data in `src/data/companyData.ts`.
-   Backend: Python 3.12 + FastAPI, storing inquiries in SQLite and
    emailing them to the company Gmail inbox through SMTP.
-   Hosting: static hosting for the frontend plus a Python-capable host
    for the API; not yet selected.

The showcase remains static by default. The Python API currently exists
only for inquiry submission, Gmail notification, and health checks.

## Functional scope

### MVP

-   Responsive showcase homepage.
-   Navigation to page sections.
-   Product/service category presentation.
-   Six-stage project process.
-   Customer-segment presentation.
-   Verified brand and trust content.
-   Contact links and office location/directions link.
-   Inquiry form wired to the Python API, with server-side validation,
    SQLite storage, Gmail notification to the company inbox, and clear
    success/failure states.

### Not included by default

-   Online checkout or payment.
-   Customer login.
-   Admin dashboard or staff inquiry management.
-   CRM or ERP integration.
-   Automated solar system sizing or quotations.
-   Live inverter/battery monitoring.
-   Database-backed project tracking.

## Success criteria

Visitors should quickly understand the company's offering, explore
relevant solutions, and reach a reliable contact method. The site should
be responsive, accessible, performant, and easy for a developer or
business owner to maintain.

## Related documents

-   `API_ROUTES.md` --- implemented inquiry API contract, including
    email-notification behavior. No staff routes.
-   `DIAGRAMS.md` --- conceptual architecture, user flow, component
    structure, and inquiry flow.
-   `IMPLEMENTATION_PLAN.md` --- phased implementation and acceptance
    checklist.
-   `SOURCE_OF_TRUTH.md` --- authoritative project decisions and
    verified facts.
-   `AGENTS.md` --- rules for AI coding agents and contributors.

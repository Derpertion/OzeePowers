# Implementation Plan

## Goal

Build a responsive, polished showcase website for OzeePower using the
supplied company brochure as the initial source for branding, service
descriptions, product categories, process stages, and contact
information.

## Guiding principles

-   Present the company clearly and professionally; prioritize inquiries
    over unnecessary complexity.
-   Treat brochure details as source material, but verify contact
    details, current product availability, brand relationships,
    certifications, and claims before publishing.
-   Mobile-first, accessible, fast, and easy to maintain.
-   Keep the first release small. Do not add authentication, an admin
    dashboard, e-commerce, or a database without a confirmed
    requirement.
-   Use real company assets when available. Clearly treat sourced stock
    images as placeholders and replace them with authorized company
    photographs when possible.

## Stack (confirmed 2026-10-26)

-   Frontend: React 19 + Vite 7.
-   Language: TypeScript.
-   Styling: Tailwind CSS v4 via `@tailwindcss/vite`, with brand design
    tokens in `src/index.css`.
-   Content: structured local data for product categories, service
    stages, brands, and contact details.
-   Backend: Python 3.12 + FastAPI, storing inquiries in SQLite and
    emailing the company Gmail inbox through SMTP.
-   Hosting: static hosting for the frontend plus a Python-capable host
    for the API; not yet selected.

Record any change to these assumptions in `SOURCE_OF_TRUTH.md`.

## Current progress (2026-10-26)

-   **Phase 0:** partially complete. The design and initial content
    exist; owner approval, asset permissions, and contact verification
    remain open.
-   **Phase 1:** complete. Project foundation, design tokens, shared
    sections, lint, and production build are in place.
-   **Phase 2:** homepage MVP implemented from the
    `ozee_fronten_design2` design. Content review is still required.
-   **Phase 3:** telephone, email, and map links are in place; the
    inquiry form is wired to a tested FastAPI/SQLite endpoint and Gmail
    SMTP notification. Real Gmail delivery and production spam
    hardening remain open.
-   **Phases 4-5:** not started.

## Phase 0 --- Confirm and prepare

1.  Confirm the business owner approves the website scope and public
    content.
2.  Verify official logo files, contact information, address, email,
    social profiles, and domain.
3.  Obtain permission to use product photographs, project photos, and
    brand logos.
4.  Confirm whether the inquiry form must send/store submissions or
    whether direct phone/email links are sufficient.
5.  Confirm hosting and domain ownership.

**Exit criteria:** required content and assets are identified;
unverified claims are flagged.

## Phase 1 --- Project foundation

1.  Initialize the frontend project and version control.
2.  Establish a consistent folder structure for components, sections,
    content, styles, and assets.
3.  Set design tokens for brand colors, typography, spacing, border
    radii, shadows, and breakpoints.
4.  Add a reusable site header, navigation, footer, buttons, cards, and
    section containers.
5.  Add linting/formatting and a basic build check.

**Exit criteria:** the project starts locally, builds successfully, and
shared components follow the project conventions.

## Phase 2 --- Homepage MVP

Build these sections in order:

1.  Header and hero with primary inquiry call to action.
2.  Solutions/product categories.
3.  Six-step project process.
4.  Residential, commercial, and industrial audiences.
5.  Why choose OzeePower.
6.  Trusted brands, subject to verification.
7.  Project portfolio, if authorized project photos exist.
8.  Contact details and footer.

**Exit criteria:** all key information is accessible, links work, and
the layout is responsive.

## Phase 3 --- Contact conversion

1.  Add telephone and email links using `tel:` and `mailto:`.
2.  Add a map/directions link using a verified address.
3.  Inquiry form: implemented with a FastAPI endpoint, SQLite backup
    storage, and Gmail SMTP notification to the company inbox.
4.  Add server-side validation, honeypot and rate limiting, a privacy
    note, and clear confirmation/error states.
5.  Show phone/email fallbacks when email delivery fails or is not
    configured.
6.  Test the entire inquiry journey on mobile and desktop, including a
    real Gmail delivery check once credentials are supplied.

**Exit criteria:** visitors can reliably contact the company; form
submissions are not silently discarded or falsely reported as sent.

## Phase 4 --- Quality and accessibility

-   Test at common mobile, tablet, and desktop widths.
-   Verify keyboard navigation, visible focus, heading order, accessible
    names, form labels, color contrast, and reduced-motion behavior.
-   Add descriptive alt text for meaningful images; use empty alt text
    for decorative images.
-   Optimize image size and format; lazy-load below-the-fold images
    where appropriate.
-   Check broken links, console errors, missing assets, and responsive
    overflow.
-   Verify metadata, favicon, social sharing metadata, and page title.
-   Run production build and test the built output, not just the
    development server.

## Phase 5 --- Content review and launch

1.  Obtain business approval of wording, logo usage, contact details,
    product claims, and images.
2.  Test the production domain, HTTPS, redirects, and contact links.
3.  If analytics are added, document what is collected and obtain any
    required consent.
4.  Set up basic uptime/build monitoring and a process for updating
    company information.
5.  Keep a rollback copy of the last known-good release.

## Acceptance checklist

-   [ ] The website communicates OzeePower's offering within the first
    screen.
-   [ ] Navigation and calls to action work.
-   [ ] All brochure-derived facts intended for publication have been
    reviewed.
-   [ ] The layout works on small mobile screens without horizontal
    scrolling.
-   [ ] Contact details are verified and clickable where appropriate.
-   [ ] No placeholder text, broken images, or fake testimonials remain.
-   [ ] No credentials or private keys are exposed in frontend code.
-   [ ] A production build completes successfully.
-   [ ] `PROJECT.md`, `API_ROUTES.md`, `DIAGRAMS.md`,
    `SOURCE_OF_TRUTH.md`, and `AGENTS.md` match the actual state of the
    project.

## Out of scope unless approved

E-commerce and payments, user accounts, a content-management system, a
staff dashboard, CRM integrations, automated quotation calculation, live
solar monitoring, and a database-backed project management system.

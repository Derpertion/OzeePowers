# AGENTS.md --- OzeePower Showcase Website

## Mission

Build and maintain a professional, responsive showcase website for
OzeePower. Use the brochure as the initial reference, but prioritize
verified company facts, accessibility, maintainability, performance, and
reliable contact paths.

## Read before changing the project

Before making substantive changes, read:

1.  `PROJECT.md` for purpose, audience, and scope.
2.  `SOURCE_OF_TRUTH.md` for verified facts and unresolved decisions.
3.  `IMPLEMENTATION_PLAN.md` for phases and acceptance criteria.
4.  `API_ROUTES.md` before changing inquiry behavior or backend
    contracts.
5.  `DIAGRAMS.md` when changing architecture or major user flows.

If these documents conflict, do not guess. Follow `SOURCE_OF_TRUTH.md`
for business facts and the actual repository for implemented behavior;
then propose a documentation correction.

## Project status and assumptions

-   React 19 + Vite 7 + TypeScript is the **confirmed** frontend stack.
-   Tailwind CSS v4 with brand tokens in `src/index.css` is the
    confirmed styling approach.
-   The first release is a showcase site, not an e-commerce platform or
    business management system.
-   The Python/FastAPI inquiry API is implemented. `GET /api/v1/health`
    and `POST /api/v1/inquiries` exist and are tested. Inquiries are
    stored in SQLite and emailed to the company Gmail inbox when SMTP is
    configured; there are no staff inquiry-management routes or UI.
-   Do not claim an inquiry email was delivered when the API reports
    `notificationSent: false`. Show phone/email fallbacks instead.
-   Do not introduce additional backend services, databases,
    authentication, analytics, or paid services without a clear
    requirement.

## Brand and content consistency

-   Use the OzeePower name and the approved logo assets consistently.
-   Use the proposed navy/green/white palette only as a starting point;
    prefer official brand assets if supplied.
-   Keep headings, buttons, cards, spacing, and section styles
    consistent.
-   Use the brochure's message as a content starting point, not a reason
    to copy the whole brochure image into the page.
-   Do not fabricate product availability, pricing, savings, payback
    periods, certifications, warranties, testimonials, or partner
    relationships. The ported design contains unverified specifics;
    review the list in `SOURCE_OF_TRUTH.md` before launch.
-   Verify business contact information before launch.
-   Keep repeated business facts in a central content source where
    practical.
-   Write concise, professional copy. Avoid generic filler and
    unsupported superlatives.

## Architecture and implementation

-   Prefer small, focused, reusable components.
-   Separate content data, UI components, page sections, styles, and
    assets.
-   Keep components understandable; do not create abstractions for
    one-off trivial markup without a clear benefit.
-   Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`,
    proper headings, and real buttons/links).
-   Use links for navigation and buttons for actions.
-   Use stable, meaningful component and variable names.
-   Avoid unnecessary dependencies. Explain why a new dependency is
    needed.
-   Do not silently change framework, language, build tooling, or folder
    conventions.
-   Do not hard-code secrets or private tokens into frontend code.
    Variables prefixed with `VITE_` are public to the client and must
    never contain secrets.
-   Do not add placeholder links that appear functional. If a
    destination is not known, omit the link or mark it clearly as a
    development TODO.

## Accessibility

-   All interactive controls must be keyboard accessible.
-   Provide visible focus indicators.
-   Use meaningful accessible names and labels.
-   Associate form labels with inputs and explain validation errors in
    text.
-   Maintain logical heading hierarchy and sufficient color contrast.
-   Provide descriptive alt text for informative images and empty alt
    text for decorative images.
-   Do not rely on color alone to convey meaning.
-   Respect `prefers-reduced-motion` and avoid motion that blocks
    content.

## Responsive design and performance

-   Design mobile-first and test small, medium, and wide viewports.
-   Prevent horizontal overflow and clipped content.
-   Use appropriately sized images and modern formats when practical.
-   Avoid loading large images unnecessarily above the fold.
-   Lazy-load noncritical below-the-fold media where appropriate.
-   Avoid layout shifts and unnecessary client-side work.
-   Do not optimize by removing accessibility or meaningful content.

## Forms and security

-   Client-side validation improves usability but does not replace
    server-side validation.
-   If inquiry submission is implemented, follow `API_ROUTES.md`.
-   Provide honest success, validation, and failure states.
-   Add appropriate spam protection and rate limiting to public
    endpoints.
-   Collect only information necessary to respond to the inquiry.
-   Add an approved privacy notice before collecting personal data.
-   There is no staff inquiry-management interface. The company inbox
    receives notifications; do not add admin routes or UI without a new
    approved requirement.
-   Never log passwords, tokens, or unnecessary personal information.
    Gmail SMTP credentials belong in backend environment variables only.

## Code quality and verification

Before considering a change complete:

1.  Inspect the existing repository scripts and conventions.
2.  Run relevant linting, tests, and production build commands that are
    available.
3.  Check browser console errors and broken links where possible.
4.  Verify the changed UI at mobile and desktop widths.
5.  Confirm that contact links and any inquiry flow work.
6.  Update relevant documentation if routes, architecture, scope, or
    decisions changed.
7.  Report which checks ran and which could not be run. Never claim a
    check passed if it was not executed.

Do not invent test commands. Inspect `package.json` and the repository
configuration first.

## Git and file hygiene

-   Keep changes focused and avoid unrelated rewrites.
-   Do not commit build outputs, dependency folders, local secrets, or
    machine-specific configuration unless explicitly required.
-   Preserve existing user work; inspect files before overwriting them.
-   Use clear commit messages if commits are requested.
-   Do not add generated assets or dependencies without checking their
    size and licensing implications.

## Documentation updates

Update the relevant document whenever a material decision changes:

-   Scope and content → `PROJECT.md`
-   API contract or inquiry flow → `API_ROUTES.md`
-   Architecture or user flow → `DIAGRAMS.md`
-   Confirmed facts and decisions → `SOURCE_OF_TRUTH.md`
-   Schedule, milestones, and acceptance criteria →
    `IMPLEMENTATION_PLAN.md`

Mark unimplemented or optional features as such. Keep documentation
aligned with the actual code.

## Definition of done

A task is complete only when its intended behavior is implemented,
relevant checks have been run where possible, the result is responsive
and accessible, unsupported business claims have not been introduced,
and affected documentation has been updated.

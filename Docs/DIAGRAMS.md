# Diagrams

> These diagrams describe the implemented showcase website and its
> inquiry flow. Update them when architecture, routes, components, or
> delivery behavior change.

## 1. High-level architecture

``` mermaid
flowchart TD
    Visitor[Website visitor] --> Browser[Responsive browser UI]
    Browser --> Pages[React + Vite showcase]
    Pages --> Content[Local structured content]
    Pages --> ContactLinks[Telephone / Email / Map links]
    Pages --> API[FastAPI inquiry API]
    API --> Validation[Validation, honeypot, rate limit]
    Validation --> Storage[(SQLite backup record)]
    Validation --> Mail[Gmail SMTP notification]
    Mail --> Inbox[Company Gmail inbox]
```

Implemented path (2026-10-26): Browser -> React + Vite showcase ->
FastAPI `POST /api/v1/inquiries` -> validation, honeypot, and in-memory
rate limit -> SQLite storage -> Gmail SMTP notification to the company
inbox. There is no staff/admin path. When SMTP is not configured or
delivery fails, the inquiry stays in SQLite, the response carries
`notificationSent: false`, and the UI shows phone/email fallbacks.

## 2. Visitor journey

``` mermaid
flowchart TD
    Start[Visitor lands on homepage] --> Hero[Understand OzeePower's offer]
    Hero --> Solutions[Explore products and services]
    Solutions --> Process[Review project process]
    Process --> Audience[Choose residential, commercial, or industrial]
    Audience --> Trust[Review brands and reasons to choose OzeePower]
    Trust --> Contact[Contact or request a consultation]
    Contact --> Result{Contact method}
    Result -->|Phone or email| Direct[Open device contact action]
    Result -->|Inquiry form| Form[Validate and submit inquiry]
    Form --> Confirmation[Show clear success or error message]
```

## 3. Component structure

Implemented components under `src/components/`:

``` mermaid
flowchart TD
    App[App] --> Layout[Page layout]
    Layout --> Header[Header / Navigation]
    Layout --> Main[Page sections]
    Layout --> Footer[Footer / Contact details]
    Main --> Hero[Hero]
    Main --> Solutions[SolutionsSection]
    Main --> Process[ProcessSection]
    Main --> Sectors[SectorsSection]
    Main --> Why[WhyChooseUs]
    Main --> Brands[BrandsSection]
    Main --> Contact[ContactSection]
    Contact --> Inquiry[InquiryForm - wired to API]
    Layout --> Brochure[BrochureModal]
    Solutions --> ProductModal[ProductDetailModal]
```

## 4. Inquiry data flow

``` mermaid
sequenceDiagram
    actor Visitor
    participant UI as Inquiry form
    participant API as FastAPI inquiry API
    participant DB as SQLite backup
    participant Mail as Gmail SMTP

    Visitor->>UI: Enter inquiry details
    UI->>UI: Basic client-side checks
    UI->>API: POST /api/v1/inquiries
    API->>API: Validate, rate-limit, spam-check
    alt Valid inquiry
        API->>DB: Store minimum required fields
        DB-->>API: Reference code created
        API->>Mail: Send notification to company inbox
        alt Email delivered
            Mail-->>API: Accepted
            API-->>UI: 201 + reference code, notificationSent true
            UI-->>Visitor: Confirmation with reference code
        else Email failed or unconfigured
            Mail-->>API: Error / skipped
            API-->>UI: 201 + reference code, notificationSent false
            UI-->>Visitor: Warning plus phone/email fallbacks
        end
    else Invalid or blocked
        API-->>UI: 400 / 429 response
        UI-->>Visitor: Explain how to correct or retry
    end
```

## 5. Diagram maintenance

Update these diagrams whenever the actual architecture, routes,
component tree, or inquiry flow changes. Do not leave a diagram
describing an optional feature as if it is already implemented. Mark
planned or deferred features clearly in pull requests and project
documentation.

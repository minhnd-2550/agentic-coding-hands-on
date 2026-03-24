<!--
Sync Impact Report
- Version change: N/A → 1.0.0 (initial creation)
- Added sections: Core Principles (5), Technology Stack & Constraints, Development Workflow, Governance
- Templates status:
  - .momorph/templates/plan-template.md ✅ compatible (Constitution Compliance Check aligns)
  - .momorph/templates/spec-template.md ✅ compatible (responsive breakpoints, security TR align)
  - .momorph/templates/tasks-template.md ✅ compatible (TDD flow, phase structure align)
- Follow-up TODOs: none
-->

# Agentic Coding Live Demo Constitution

## Core Principles

### I. Clean Code & Minimal Complexity

Every file MUST have a single, clear responsibility. Functions MUST be short, descriptively named, and free of side effects where possible. No dead code, no commented-out blocks, no premature abstractions. Prefer explicit over clever. Duplication is acceptable when the alternative is a forced abstraction. YAGNI applies — implement only what is needed now.

### II. Test-First Development (NON-NEGOTIABLE)

TDD is mandatory for all feature work. The cycle MUST follow: write failing test → implement minimal code to pass → refactor. No implementation code may be written without a corresponding test that fails first. Integration tests MUST cover Supabase data access, API routes, and middleware logic. Unit tests MUST cover pure business logic and utility functions.

### III. Responsive-First UI

All UI components MUST render correctly across mobile (320px+), tablet (768px+), and desktop (1024px+) breakpoints. Tailwind CSS utility classes MUST be used with a mobile-first approach (`sm:`, `md:`, `lg:` prefixes). Every new page or component MUST be visually verified at all three breakpoints before completion. No fixed widths that break on smaller screens.

### IV. Secure by Default (OWASP Compliance)

All user input MUST be validated and sanitized on both client and server. Server Actions and API Routes MUST verify authentication and authorization before processing. Environment variables and secrets MUST never be exposed to client bundles — use `NEXT_PUBLIC_` prefix only for truly public values. CSRF protection MUST be enforced via Supabase SSR cookie handling. SQL injection prevention is handled by Supabase client — raw queries are prohibited. XSS prevention MUST be maintained by avoiding `dangerouslySetInnerHTML` unless content is explicitly sanitized. Content Security Policy headers SHOULD be configured in middleware. Dependencies MUST be audited regularly (`yarn audit`).

### V. Simplicity & Maintainability

Start with the simplest solution that works. Avoid over-engineering: no unnecessary abstractions, no premature optimization, no feature flags for unreleased features. File and folder naming MUST be consistent and predictable. Prefer co-location — keep related files together. Comments are allowed only where logic is non-obvious; the code itself MUST be self-documenting.

## Technology Stack & Constraints

**Runtime & Framework**:
- Next.js 15 with App Router (Turbopack for dev)
- React 19 with Server Components as default
- TypeScript in strict mode (`strict: true` in tsconfig)

**Styling**:
- Tailwind CSS 4 via PostCSS
- Mobile-first responsive design
- No CSS-in-JS libraries; no inline styles except for dynamic values

**Backend & Data**:
- Supabase for authentication, database (PostgreSQL), and real-time
- `@supabase/ssr` for server-side auth with cookie-based sessions
- Supabase client created via `src/libs/supabase/client.ts` (browser) and `src/libs/supabase/server.ts` (server)
- Middleware handles auth session refresh via `src/libs/supabase/middleware.ts`

**Deployment**:
- Cloudflare Workers via `@opennextjs/cloudflare`
- Wrangler for local preview and type generation
- Edge-compatible code only — no Node.js-only APIs in runtime paths

**Package Management**:
- Yarn 1.x (classic)
- Lock file (`yarn.lock`) MUST be committed
- New dependencies require justification

**Project Structure**:
```
src/
├── app/              # Next.js App Router pages and layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles (Tailwind imports)
├── components/       # Reusable UI components
├── libs/             # Shared libraries and utilities
│   └── supabase/     # Supabase client configuration
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── utils/            # Pure utility functions
```

**Path Alias**: `@/*` maps to `./src/*`

**Cloudflare Workers Constraints**:
- No `fs`, `path`, `child_process`, or other Node.js built-in modules in runtime code
- Maximum worker size limits apply — keep bundles lean
- Use `CloudflareEnv` interface for environment bindings

## Development Workflow

**Branch Strategy**: Feature branches off `main`, merged via pull request.

**Code Quality Gates**:
1. `yarn lint` MUST pass with zero errors
2. All tests MUST pass
3. TypeScript compilation MUST succeed with zero errors (`yarn build`)
4. Responsive design verified at mobile/tablet/desktop

**Commit Convention**: Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).

**Development Cycle**:
1. Write/update spec
2. Write failing tests (TDD)
3. Implement minimal code to pass tests
4. Refactor if needed
5. Verify responsive design
6. Run lint + build
7. Commit and push

**Security Review Checklist** (per feature):
- [ ] All user inputs validated (client + server)
- [ ] Auth checks on all protected routes/actions
- [ ] No secrets in client-accessible code
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Dependencies audited for known vulnerabilities

## Governance

This constitution is the authoritative source for all development decisions in this project. All code reviews and pull requests MUST verify compliance with these principles. Any deviation MUST be documented with explicit justification in the PR description.

**Amendment Process**:
1. Propose change with rationale
2. Document impact on existing code
3. Update constitution with new version
4. Propagate changes to dependent templates

**Versioning**: Semantic versioning — MAJOR for principle removals/redefinitions, MINOR for new principles/sections, PATCH for clarifications.

**Compliance**: Every PR reviewer MUST check constitution compliance as part of the review process.

**Version**: 1.0.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-18

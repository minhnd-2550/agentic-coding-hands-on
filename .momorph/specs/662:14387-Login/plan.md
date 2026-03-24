# Implementation Plan: Login Screen

**Frame**: `662:14387-Login`
**Date**: 2026-03-18
**Spec**: `specs/662:14387-Login/spec.md`

---

## Summary

Implement the Login screen for SAA 2025 — a full-page hero with artistic key visual background, Google OAuth login (restricted to `@sun-asterisk.com`), a tri-language selector (VN/EN/JP), and a copyright footer. Authentication uses Supabase Auth PKCE flow in **redirect mode**, deployed on Cloudflare Workers via OpenNext. The i18n system is a lightweight custom solution (React Context + JSON + localStorage). Rate limiting is configurable and backed by a Supabase `login_attempts` table.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router, Turbopack)
**Primary Dependencies**: React 19, Tailwind CSS 4, `@supabase/ssr` ^0.8.0, `@supabase/supabase-js` ^2.90.1
**Database**: Supabase (PostgreSQL) — new `login_attempts` table for rate limiting
**Testing**: Vitest (unit/integration) + Playwright (E2E) + @testing-library/react
**State Management**: React Context (i18n) + localStorage (language persistence)
**API Style**: Supabase Auth SDK (PKCE flow) + Next.js Route Handlers
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare` ^1.14.4

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Principle I — Clean Code**: Single-responsibility files, feature-based co-location, no premature abstractions. Each component maps 1:1 to a Figma node.
- [x] **Principle II — TDD**: Tests written first for auth callback, domain validation, i18n, toast, and all interactive components. Vitest for unit/integration, Playwright for E2E.
- [x] **Principle III — Responsive-First**: Mobile-first Tailwind (`sm:`, `md:`, `lg:`), verified at 320px / 768px / 1024px per design-style.md breakpoints.
- [x] **Principle IV — Secure by Default**: Domain restriction (dual-layer: Google `hd` param + server-side validation), CSRF via Supabase SSR cookies, CSP headers in middleware, no secrets in client bundle, configurable rate limiting.
- [x] **Principle V — Simplicity**: Lightweight custom i18n (no external library), minimal component tree, YAGNI.

**Violations**: None.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based, co-located under `src/components/login/`, `src/components/layout/`, `src/components/ui/`
- **Styling Strategy**: Tailwind CSS 4 utility classes, mobile-first responsive. Design tokens from `design-style.md` mapped to Tailwind arbitrary values. Montserrat + Montserrat Alternates loaded via `next/font/google`.
- **Data Fetching**: Server Components for initial auth check (login page, root page). Client Components only for interactive elements (LoginButton, LanguageSelector, Toast).
- **i18n Strategy**: Custom `I18nProvider` (Client Component) wrapping `{children}` in root layout. JSON translation files. `useI18n()` hook provides `t(key)` and `setLocale()`. Reads localStorage on mount, defaults to `'vn'`. No cross-tab sync.
- **Server/Client boundary**: Root `layout.tsx` (Server Component) → `<I18nProvider>` (Client Component `"use client"`) wraps `{children}`. Login page is Server Component that renders Client Component children.

### Backend Approach

- **Auth**: Supabase Auth with Google OAuth provider using **PKCE flow** in **redirect mode** (edge-compatible, no server-side secret needed for code exchange)
- **OAuth Flow**:
  1. Client calls `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '<origin>/auth/callback', queryParams: { hd: 'sun-asterisk.com' } } })`
  2. Browser redirects to Google → user authenticates (restricted to `sun-asterisk.com`)
  3. Google redirects to Supabase → Supabase redirects to `/auth/callback?code=...`
  4. Route Handler exchanges `code` for session via `supabase.auth.exchangeCodeForSession(code)`
  5. Server validates email domain as defense-in-depth
  6. If valid: session cookie set automatically by `@supabase/ssr` → redirect to `/`
  7. If invalid: redirect to `/login?error=domain_restricted`
- **Domain Restriction**: Dual layer — Google OAuth `hd` parameter (first line) + server-side domain validation in callback (defense-in-depth)
- **Rate Limiting**: Configurable via env vars (`RATE_LIMIT_MAX_ATTEMPTS` default 5, `RATE_LIMIT_WINDOW_MINUTES` default 15). Track failed attempts per IP in `login_attempts` table. Works on stateless edge workers because state is in Supabase.
- **Session Management**: Cookie-based via `@supabase/ssr` (existing `src/libs/supabase/` helpers)

### Integration Points

- **Existing Supabase helpers**: `src/libs/supabase/client.ts` (browser), `src/libs/supabase/server.ts` (server), `src/libs/supabase/middleware.ts` (session refresh)
- **New Root Middleware**: `src/middleware.ts` — uses existing middleware helper for session refresh + auth redirect logic + CSP headers
- **Cloudflare Compatibility**: All code edge-compatible. No Node.js-only APIs. PKCE flow works on edge runtime. `@opennextjs/cloudflare` handles deployment.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/662:14387-Login/
├── spec.md              # Feature specification
├── design-style.md      # Design style guide
├── plan.md              # This file
└── assets/              # Reference screenshots
```

### Source Code (new and modified files)

```text
# NEW FILES
src/
├── app/
│   ├── login/
│   │   ├── page.tsx              # Login page (Server Component: auth check → redirect if logged in)
│   │   └── loading.tsx           # Loading skeleton while SSR
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback: exchange code, validate domain, rate limit
├── components/
│   ├── login/
│   │   ├── LoginHero.tsx         # Hero section: key visual + title + description + login button
│   │   ├── LoginButton.tsx       # "LOGIN With Google" button (Client Component)
│   │   └── LoginBackground.tsx   # Full-page background: key visual image + gradient overlays
│   ├── layout/
│   │   ├── Header.tsx            # Header: logo (left) + language selector (right)
│   │   ├── Footer.tsx            # Footer: copyright text (sticky bottom, centered)
│   │   └── Logo.tsx              # SAA 2025 logo image
│   └── ui/
│       ├── LanguageSelector.tsx  # Language dropdown: VN/EN/JP with flags (Client Component)
│       └── Toast.tsx             # Toast notification: auto-dismiss 5s, role="alert" (Client Component)
├── libs/
│   └── i18n/
│       ├── context.tsx           # I18nProvider (Client Component) + useI18n hook
│       ├── translations/
│       │   ├── vn.json           # Vietnamese translations
│       │   ├── en.json           # English translations
│       │   └── jp.json           # Japanese translations
│       └── types.ts              # TranslationKey type, Locale type
├── hooks/
│   └── useToast.ts               # Toast state management: show/hide/auto-dismiss
├── middleware.ts                  # Root middleware: session refresh + auth redirect + CSP
├── types/
│   └── auth.ts                   # AuthState, LoginError types
└── utils/
    └── auth.ts                   # isAllowedDomain(email), rate limit config helpers

# TEST FILES
vitest.config.ts                   # Vitest configuration (jsdom, path aliases)
vitest.setup.ts                    # Test setup: import @testing-library/jest-dom
playwright.config.ts               # Playwright E2E configuration
src/
├── __tests__/
│   ├── utils/
│   │   └── auth.test.ts          # Unit: isAllowedDomain, getRateLimitConfig
│   ├── libs/
│   │   └── i18n.test.ts          # Unit: i18n context, language switching, localStorage
│   ├── middleware.test.ts         # Integration: auth redirect, CSP headers, public route exclusion
│   ├── components/
│   │   ├── LoginButton.test.tsx  # Unit: loading state, click handler, double-click prevention, error toast
│   │   ├── LanguageSelector.test.tsx # Unit: dropdown, language change, flag display, keyboard nav
│   │   ├── Toast.test.tsx        # Unit: show/hide, auto-dismiss, role="alert"
│   │   ├── Header.test.tsx       # Unit: logo + language selector rendering
│   │   └── Footer.test.tsx       # Unit: copyright text, i18n
│   └── app/
│       └── auth/
│           └── callback.test.ts  # Integration: code exchange, domain validation, rate limiting
└── e2e/
    └── login.spec.ts             # E2E: full login flow, language switch, error scenarios

# ASSET FILES (downloaded from Figma via get_media_files)
public/
├── images/
│   ├── login-bg.webp             # Key visual background (optimized from 662:14389)
│   └── root-further.png          # ROOT FURTHER logo (from 2939:9548)
└── icons/
    ├── logo-saa.png              # SAA 2025 logo (from I662:14391;178:1033;178:1030)
    ├── google.svg                # Google icon (from I662:14426;186:1766)
    ├── flag-vn.svg               # Vietnam flag (from I662:14391;186:1696;186:1821;186:1709)
    ├── flag-en.svg               # UK flag (export manually — not in media files)
    ├── flag-jp.svg               # Japan flag (export manually — not in media files)
    └── chevron-down.svg          # Chevron icon (not in media files — use inline SVG or heroicons)
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Replace Geist fonts with Montserrat + Montserrat Alternates. Update metadata (title: "Sun Annual Awards 2025"). Wrap `{children}` with `<I18nProvider>`. |
| `src/app/page.tsx` | Replace default Next.js content with server-side auth check → redirect to `/login` (unauthenticated) or homepage (authenticated) |
| `src/app/globals.css` | Add Montserrat font family to `@theme` config. Add design tokens as CSS custom properties. Remove default light/dark theme. |
| `package.json` | Add devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`. Add scripts: `test`, `test:e2e`. |
| `.env.example` | Add `RATE_LIMIT_MAX_ATTEMPTS=5` and `RATE_LIMIT_WINDOW_MINUTES=15` |

### Dependencies

| Package | Version | Purpose | Justification |
|---------|---------|---------|---------------|
| `vitest` | ^3 | Unit/integration testing | Constitution Principle II: TDD mandatory; no test framework currently exists |
| `@testing-library/react` | ^16 | Component testing utilities | Standard React testing library |
| `@testing-library/jest-dom` | ^6 | DOM matchers for tests | `toBeInTheDocument`, `toHaveAttribute`, etc. |
| `jsdom` | ^25 | DOM environment for Vitest | Required for rendering React components in tests |
| `@playwright/test` | ^1 | E2E testing | End-to-end login flow verification |

**Note**: All runtime dependencies already exist (`@supabase/ssr`, `@supabase/supabase-js`, `next`, `react`, `tailwindcss`). Only test tooling is new.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Test Setup

**Goal**: Download Figma assets and configure test infrastructure.

1. **Download Figma assets** via `get_media_files`:
   - `I662:14391;178:1033;178:1030` → `public/icons/logo-saa.png` (SAA logo)
   - `2939:9548` → `public/images/root-further.png` (ROOT FURTHER logo)
   - `I662:14426;186:1766` → `public/icons/google.svg` (Google icon)
   - `I662:14391;186:1696;186:1821;186:1709` → `public/icons/flag-vn.svg` (VN flag)
   - Key visual background: export from Figma as optimized WebP → `public/images/login-bg.webp`
   - EN/JP flags + chevron: source from flag icon libraries or create inline SVGs

2. **Install test dependencies**:
   ```bash
   yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test
   ```

3. **Configure Vitest**: Create `vitest.config.ts` with jsdom environment, `@/*` path aliases, setup file for `@testing-library/jest-dom`

4. **Configure Playwright**: Create `playwright.config.ts` with base URL, Chromium browser

5. **Update package.json scripts**: `"test": "vitest"`, `"test:e2e": "playwright test"`

6. **Create Rate Limiting DB table** in Supabase:
   ```sql
   CREATE TABLE login_attempts (
     id BIGSERIAL PRIMARY KEY,
     ip TEXT NOT NULL,
     error_type TEXT NOT NULL,
     attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
   );
   CREATE INDEX idx_login_attempts_ip_time ON login_attempts (ip, attempted_at);
   ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
   -- RLS: Only service role can insert/read (callback route uses server client)
   ```
   This MUST be done before Phase 1.6 (OAuth Callback) which queries this table.

### Phase 1: Foundation (Blocking — all must complete before Phase 2)

**Goal**: Build shared infrastructure that all components depend on.

1. **Auth types** (`src/types/auth.ts`):
   - `LoginErrorType = 'domain_restricted' | 'auth_cancelled' | 'auth_failed' | 'rate_limited'`
   - `RateLimitConfig = { maxAttempts: number; windowMinutes: number }`
   - Note: `Locale` type lives in `src/libs/i18n/types.ts` (single source of truth — do NOT duplicate here)

2. **Auth utilities** (`src/utils/auth.ts`):
   - `isAllowedDomain(email: string): boolean` — checks `@sun-asterisk.com`
   - `getRateLimitConfig(): RateLimitConfig` — reads from env vars with defaults
   - TDD: Write `auth.test.ts` first (valid domain, invalid domain, edge cases, config defaults)

3. **i18n System** (`src/libs/i18n/`):
   - `types.ts`: `TranslationKey` union type, `Locale` type
   - `translations/vn.json`, `en.json`, `jp.json`: All UI strings (login button, intro text, copyright, toast messages, language names)
   - `context.tsx`: `I18nProvider` (Client Component) + `useI18n()` hook. Reads localStorage on mount, defaults to `'vn'`. Provides `t(key)` function and `setLocale(locale)`. Validates stored locale, falls back to `'vn'` on corruption.
   - TDD: Write `i18n.test.ts` first

4. **Toast System** (`src/components/ui/Toast.tsx` + `src/hooks/useToast.ts`):
   - `useToast()`: `{ show(message, type), dismiss(), isVisible, message, type }` — simple `useState` hook, NOT a context provider (only used within LoginButton's Client Component boundary)
   - `Toast.tsx`: Pure presentational component. Props: `{ message: string; type: 'error' | 'info'; isVisible: boolean; onDismiss: () => void }`. Renders at top-right (desktop) / top-center (mobile) via `fixed` positioning, auto-dismiss 5s via `useEffect` timer, `role="alert"`, `aria-live="assertive"`, z-[100]
   - **Rendering pattern**: `LoginButton` (Client Component) uses `useToast()` internally and renders `<Toast>` as a sibling. Since `Toast` uses `fixed` positioning, it visually appears at the top of the viewport regardless of DOM position.
   - TDD: Write `Toast.test.tsx` first

5. **Root Middleware** (`src/middleware.ts`):
   - Uses existing `src/libs/supabase/middleware.ts` helper: call `createClient(request)` → get `{ supabase, supabaseResponse }` → call `supabase.auth.getUser()` to check session → return `supabaseResponse` (with updated cookies)
   - Auth redirect logic: `/login` for unauthenticated (except `/auth/callback`), `/` for authenticated visiting `/login`
   - CSP headers:
     - `default-src 'self'`
     - `script-src 'self' 'unsafe-inline'` (required by Next.js)
     - `connect-src 'self' ${NEXT_PUBLIC_SUPABASE_URL} https://accounts.google.com https://*.googleapis.com`
     - `form-action 'self' https://accounts.google.com`
     - `frame-ancestors 'none'`
   - Matcher config: exclude `/_next/static`, `/_next/image`, `/icons`, `/images`, `/favicon.svg`
   - TDD: Write `middleware.test.ts` first (auth redirect, CSP headers, public route exclusion)

6. **OAuth Callback Route** (`src/app/auth/callback/route.ts`):
   - GET handler: Extract `code` from URL params
   - Create Supabase server client, exchange code via `exchangeCodeForSession(code)`
   - Validate email domain with `isAllowedDomain()`
   - Rate limit check: Query `login_attempts` table for IP (configurable thresholds)
   - On failure: Insert into `login_attempts`, redirect to `/login?error=<error_type>`
   - On success: Redirect to `/` (session cookie set automatically)
   - TDD: Write `callback.test.ts` first

### Phase 2: UI Components (Core Login — MVP)

**Goal**: Implement the login page UI end-to-end.

1. **Update globals.css**:
   - Remove default light/dark theme variables
   - Add design tokens from `design-style.md` as CSS custom properties
   - Add Montserrat font family to `@theme` config

2. **Update root layout** (`src/app/layout.tsx`):
   - Replace Geist fonts with Montserrat + Montserrat Alternates via `next/font/google`
   - Update metadata: `title: "Sun Annual Awards 2025"`, `description: "SAA 2025 - Root Further"`
   - Wrap `{children}` with `<I18nProvider>`

3. **Update root page** (`src/app/page.tsx`):
   - Server Component: Check auth via `createClient()` (server) → `supabase.auth.getUser()`
   - If authenticated: render homepage placeholder (or redirect to dashboard in future)
   - If not authenticated: `redirect('/login')`

4. **LoginBackground** (`src/components/login/LoginBackground.tsx`):
   - Full-page key visual: `<Image>` with `fill`, `object-cover`, `priority`
   - Left gradient overlay: `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)`
   - Bottom gradient overlay: `linear-gradient(0deg, #00101A 22.48%, transparent 51.74%)`
   - Z-index stacking per design-style.md (z-0, z-[1], z-[2])
   - Maps to spec Items C, Rectangle 57, Cover

5. **Logo** (`src/components/layout/Logo.tsx`):
   - `<Image>` with SAA logo SVG, `alt="Sun Annual Awards 2025"`, `52x48px`
   - Prop `clickable?: boolean` for reuse on other pages (non-interactive on login)
   - Maps to spec Item A.1

6. **Header** (`src/components/layout/Header.tsx`):
   - Fixed top, full-width, `h-20`, `bg-[rgba(11,15,18,0.8)]`, z-50
   - Flex row: Logo left, LanguageSelector right
   - Responsive padding: `px-4` (mobile) → `px-12` (tablet) → `px-36` (desktop)
   - Maps to spec Item A

7. **LanguageSelector** (`src/components/ui/LanguageSelector.tsx`):
   - Client Component (`"use client"`)
   - Button: flag (24x24) + locale code (Montserrat Bold 16px white) + chevron (24x24)
   - Dropdown: `#00070C` bg, `1px solid #998C5F` border, `8px` radius, `6px` padding
   - Selected item: `rgba(255, 234, 158, 0.2)` bg, `2px` radius
   - Non-selected hover: `rgba(255, 255, 255, 0.1)`
   - Keyboard: Enter/Space toggle, Arrow keys navigate, Escape close
   - ARIA: `aria-expanded`, `aria-haspopup="listbox"`, `role="option"` per item
   - Click outside to close (document click listener)
   - TDD: Write `LanguageSelector.test.tsx` first
   - Maps to spec Items A.2, A.2.1

8. **LoginHero** (`src/components/login/LoginHero.tsx`):
   - **Client Component** (`"use client"`) — contains i18n text (`useI18n()` hook) and interactive child (`<LoginButton>`)
   - Props: `errorType?: LoginErrorType` (passed from page.tsx, forwarded to LoginButton)
   - Contains: ROOT FURTHER image (451x200, responsive scale), description text via `t('login.intro_line1')` / `t('login.intro_line2')`, `<LoginButton errorType={errorType}>`
   - Layout: flex column, `gap-20` between visual and content, `gap-6` between text and button
   - Content left padding: `16px`. Responsive: centered on mobile (`text-center items-center`), left-aligned on desktop (`lg:text-left lg:items-start`)
   - Maps to spec Items B, B.1, B.2

9. **LoginButton** (`src/components/login/LoginButton.tsx`):
   - Client Component (`"use client"`)
   - Yellow `#FFEA9E` bg, dark `#00101A` text, Montserrat Bold 22px, `8px` radius, `16px 24px` padding
   - Google icon (24x24) right of text, `8px` gap
   - Hover: `brightness(0.92)` + `box-shadow: 0 2px 8px rgba(0,0,0,0.15)`, 150ms transition
   - Active: `brightness(0.88)` + `scale(0.98)`
   - Loading: disabled, opacity 0.7, spinner replaces Google icon
   - Click: `supabase.auth.signInWithOAuth()` with redirect mode, PKCE, `hd: 'sun-asterisk.com'`
   - Double-click prevention: disable immediately on click
   - Receives `errorType?: LoginErrorType` prop from parent (Server Component passes `searchParams.error`)
   - On mount with `errorType`: calls `useToast().show()` with i18n-translated error message
   - Responsive: `w-full` base (mobile-first) → `lg:w-[305px]` (desktop). **Important**: Tailwind mobile-first means base class = mobile, breakpoint prefix = larger screens.
   - TDD: Write `LoginButton.test.tsx` first
   - Maps to spec Item B.3

10. **Footer** (`src/components/layout/Footer.tsx`):
    - Sticky bottom, full-width, `border-t border-[#2E3940]`
    - Copyright text: Montserrat Alternates Bold 16px white, centered
    - `t('footer.copyright')` for i18n
    - Responsive padding: `py-6 px-4` (mobile) → `py-8 px-12` (tablet) → `py-10 px-[90px]` (desktop)
    - Maps to spec Item D

11. **Login Page** (`src/app/login/page.tsx`):
    - Server Component: Check auth → redirect to `/` if already logged in
    - Receives `searchParams` prop (Next.js 15 App Router convention): `{ searchParams: Promise<{ error?: string }> }`
    - Extracts `error` and passes as prop to `<LoginHero errorType={error as LoginErrorType}>` → which passes to `<LoginButton errorType={errorType}>`
    - **Server→Client data flow**: `page.tsx (Server, reads searchParams)` → `LoginHero (Client Component, receives prop)` → `LoginButton (Client, receives prop, shows toast via useEffect)`
    - Render: `<LoginBackground>` + `<Header>` + `<LoginHero errorType={error}>` + `<Footer>`
    - Note: `<Toast>` is NOT rendered at page level — it is rendered inside `<LoginButton>` (Client Component) which manages toast state via `useToast()`. The Toast uses `fixed` positioning so it appears at viewport top regardless of DOM position.
    - `min-h-screen`, `bg-[#00101A]`, `relative overflow-hidden`

12. **Login Loading** (`src/app/login/loading.tsx`):
    - Simple centered spinner on dark background

### Phase 3: Polish & Security Hardening

**Goal**: Error handling, accessibility, responsive verification, E2E tests.

1. **Error handling**: Parse `?error` query param on login page → map to i18n toast messages for all 4 error types (`domain_restricted`, `auth_cancelled`, `auth_failed`, `rate_limited`). Note: Rate limiting DB table is created in Phase 0.6.

2. **Responsive verification**: Visual test at 320px, 768px, 1024px for all components per design-style.md breakpoints

3. **Accessibility audit**: Tab order (Language selector → Login button), ARIA attributes, screen reader test, focus ring visibility, `prefers-reduced-motion`

4. **i18n completeness**: Verify all 3 translation files have all keys, no missing translations

5. **E2E tests** (`src/e2e/login.spec.ts`):
   - Full login flow (mock OAuth redirect)
   - Language switch: VN → EN → JP → verify all text updates
   - Error toast scenarios: each error type
   - Responsive: viewport at 320px, 768px, 1024px
   - Accessibility: keyboard navigation through all interactive elements

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Google OAuth redirect incompatible with Cloudflare Workers | Low | High | Supabase Auth PKCE flow is edge-compatible. Validate early with `wrangler dev`. |
| Key visual image too large for page load | Low | Medium | Use optimized WebP, `<Image>` with `priority`, serve from `public/` (static CDN via Cloudflare). |
| Rate limiting: DB latency on every login attempt | Low | Low | `login_attempts` is lightweight; add index on `(ip, attempted_at)`. For scale, migrate to Cloudflare Rate Limiting. |
| i18n flash of wrong language on first load | Low | Low | Accept brief flash (localStorage in useEffect). Could mitigate with cookie-based locale in future. |
| Supabase `hd` parameter bypass | Low | Medium | Defense-in-depth: server-side domain validation always runs in callback. |
| Montserrat Alternates not available as Google Font | Low | Low | Verify availability; fallback to Montserrat if needed. |
| EN/JP flag SVGs not in Figma media files | Medium | Low | Source from open flag icon libraries (flagcdn.com, circle-flags). |

### Estimated Complexity

- **Frontend**: Medium (responsive hero layout, i18n system, toast, language selector dropdown with ARIA)
- **Backend**: Low (Supabase Auth handles OAuth; callback route is thin; rate limiting is simple DB query)
- **Testing**: Medium (OAuth flow mocking, rate limiting scenarios, i18n persistence)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Login button → OAuth flow → callback → redirect
- [x] **External dependencies**: Supabase Auth (Google provider)
- [x] **Data layer**: `login_attempts` table for rate limiting
- [x] **User workflows**: Full login flow, language switching, error handling

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Login button → loading state → redirect/error. Language selector → i18n update. |
| App ↔ External API | Yes | Supabase Auth OAuth flow, callback code exchange |
| App ↔ Data Layer | Yes | Rate limiting counter in `login_attempts` table |
| Cross-platform | Yes | Responsive at 320px, 768px, 1024px |

### Test Environment

- **Environment type**: Local (Vitest + jsdom for unit; Playwright for E2E)
- **Test data strategy**: Mock Supabase Auth responses; fixture translation files; mock `login_attempts` queries
- **Isolation approach**: Fresh state per test; mock localStorage; reset DB mocks

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth (`signInWithOAuth`, `exchangeCodeForSession`) | Mock | Cannot trigger real Google OAuth in CI |
| Supabase DB (`login_attempts` queries) | Mock | Avoid DB dependency in unit tests |
| localStorage | Mock (jsdom) | Test i18n persistence deterministically |
| Next.js Router (`redirect`, `useSearchParams`) | Mock (`next/navigation`) | Test navigation without full app |
| Toast system | Real | Lightweight, no external deps |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Click login → Google OAuth triggered with correct params (provider: google, hd: sun-asterisk.com, redirect mode)
   - [x] Callback: valid code + @sun-asterisk.com email → session set → redirect to `/`
   - [x] Language selector: change VN → EN → all UI text re-renders in English
   - [x] Already authenticated user visits /login → middleware redirects to `/`
   - [x] Page loads, reads localStorage language preference → displays correct locale

2. **Error Handling**
   - [x] Callback: non @sun-asterisk.com domain → redirect to `/login?error=domain_restricted`
   - [x] User cancels OAuth redirect → redirect to `/login?error=auth_cancelled`
   - [x] Callback: invalid/expired code → redirect to `/login?error=auth_failed`
   - [x] Rate limit: exceeds configurable threshold → redirect to `/login?error=rate_limited`
   - [x] Login page: reads `?error` param → shows correct toast message (i18n translated)

3. **Edge Cases**
   - [x] Double-click login button → only one `signInWithOAuth` call
   - [x] Page loads with no localStorage language → defaults to VN
   - [x] Corrupted localStorage locale → fallback to VN
   - [x] Responsive layout at 320px → button full-width, title scales, text wraps
   - [x] Callback with missing `code` param → redirect to `/login?error=auth_failed`

### Tooling & Framework

- **Test framework**: Vitest 3 (unit/integration) + Playwright 1.x (E2E)
- **Supporting tools**: @testing-library/react, @testing-library/jest-dom, jsdom
- **CI integration**: `yarn test` (Vitest) + `yarn test:e2e` (Playwright) in PR checks

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Auth callback (code exchange + domain validation + rate limit) | 90%+ | High |
| UI components (LoginButton, LanguageSelector, Toast) | 85%+ | High |
| Middleware (auth redirect + CSP) | 85%+ | High |
| i18n system (context, translations, persistence) | 80%+ | Medium |
| Error scenario mapping (query param → toast) | 90%+ | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` reviewed and approved (all QA resolved)
- [x] `design-style.md` reviewed and approved (dropdown styles included)
- [ ] Supabase project configured with Google OAuth provider
- [ ] Google Cloud Console: OAuth consent screen + credentials configured
- [ ] Supabase Google OAuth: `hd` parameter available for domain restriction
- [ ] Figma assets exported (key visual, logo, flags, icons)
- [ ] `login_attempts` table created in Supabase

### External Dependencies

- Supabase Auth service (Google OAuth provider configured)
- Google OAuth API (consent screen, client ID/secret in Supabase dashboard)
- Cloudflare Workers deployment target

### Environment Variables

```env
# Already exist in project
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<supabase-anon-key>
SUPABASE_SECRET_KEY=<supabase-service-role-key>
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>

# NEW — configurable rate limiting
RATE_LIMIT_MAX_ATTEMPTS=5
RATE_LIMIT_WINDOW_MINUTES=15
```

### Figma Media Files Available for Download

| Node ID | Asset | URL Status |
|---------|-------|------------|
| `I662:14391;178:1033;178:1030` | SAA Logo (PNG) | Available |
| `2939:9548` | ROOT FURTHER Logo (PNG) | Available |
| `I662:14426;186:1766` | Google Icon (SVG) | Available |
| `I662:14391;186:1696;186:1821;186:1709` | Vietnam Flag (SVG) | Available |
| `I662:14391;186:1696;186:1821;186:1441` | Chevron Down | Not available (use inline SVG) |
| EN Flag | UK/Northern Ireland Flag | Not in media files (source externally) |
| JP Flag | Japan Flag | Not in media files (source externally) |
| `662:14389` | Key Visual Background | Not in media files (export from Figma as WebP) |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (asset download + test setup), then Phase 1 (TDD: tests first)

---

## Notes

- The current `src/app/page.tsx` is the default Next.js starter page — will be replaced with auth check + redirect.
- No `src/middleware.ts` exists yet — new file using existing `src/libs/supabase/middleware.ts` helper.
- No `src/components/` directory exists yet — all components are new.
- Fonts: Current layout uses Geist Sans/Mono — will be replaced with Montserrat/Montserrat Alternates.
- `globals.css` uses Tailwind v4 `@theme inline` syntax — design tokens will be added there.
- Supabase PKCE flow is edge-compatible and doesn't require server-side secrets for code exchange — critical for Cloudflare Workers.
- Rate limiting env vars (`RATE_LIMIT_MAX_ATTEMPTS`, `RATE_LIMIT_WINDOW_MINUTES`) should be added to `.env.example` and Cloudflare Workers env.
- The i18n system is intentionally lightweight. If project grows, consider upgrading to `next-intl`.
- OAuth uses **redirect mode** (not popup) per user requirement — no popup blocker issues.
- Language persistence is localStorage only — no cross-tab sync via `storage` event listener.

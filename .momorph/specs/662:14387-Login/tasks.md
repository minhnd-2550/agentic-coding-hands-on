# Tasks: Login Screen

**Frame**: `662:14387-Login`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Download assets, install test tooling, configure test infrastructure, create DB table.

- [x] T001 Download Figma media assets (logo-saa.png, root-further.png, google.svg, flag-vn.svg) via get_media_files and save to public/icons/ and public/images/ | public/icons/, public/images/
- [x] T002 Source missing assets: flag-en.svg (UK flag), flag-jp.svg (Japan flag) from flag icon library (e.g. flagcdn.com/circle-flags), create chevron-down.svg as inline SVG, export login-bg.webp from Figma | public/icons/, public/images/
- [x] T003 Install test devDependencies: `yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test` | package.json
- [x] T004 [P] Create Vitest configuration with jsdom environment, `@/*` path aliases, and setup file | vitest.config.ts
- [x] T005 [P] Create Vitest setup file importing @testing-library/jest-dom matchers | vitest.setup.ts
- [x] T006 [P] Create Playwright configuration with base URL, Chromium browser config | playwright.config.ts
- [x] T007 Add test scripts to package.json: `"test": "vitest"`, `"test:e2e": "playwright test"` | package.json
- [x] T008 Create `login_attempts` rate limiting table in Supabase with index and RLS policy (SQL from plan.md Phase 0.6) | Supabase Dashboard / migration
- [x] T009 Add rate limit env vars to .env.example: `RATE_LIMIT_MAX_ATTEMPTS=5`, `RATE_LIMIT_WINDOW_MINUTES=15` | .env.example

**Checkpoint**: Test infrastructure ready, assets downloaded, DB table created.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories. TDD: write failing tests FIRST, then implement.

**CRITICAL**: No user story work can begin until this phase is complete.

### Types & Utilities

- [x] T010 [P] Create auth types: `LoginErrorType`, `RateLimitConfig` (Locale type lives in i18n/types.ts) | src/types/auth.ts
- [x] T011 [P] Write failing tests for `isAllowedDomain()` and `getRateLimitConfig()`: valid domain, invalid domain, edge cases (empty, null, subdomains), config defaults, config from env | src/__tests__/utils/auth.test.ts
- [x] T012 Implement `isAllowedDomain(email)` and `getRateLimitConfig()` to pass tests | src/utils/auth.ts

### i18n System

- [x] T013 [P] Create i18n types: `Locale = 'vn' | 'en' | 'jp'`, `TranslationKey` union type for all UI strings | src/libs/i18n/types.ts
- [x] T014 [P] Create Vietnamese translation file with all UI strings (login button, intro lines, copyright, toast messages, language names) | src/libs/i18n/translations/vn.json
- [x] T015 [P] Create English translation file with all UI strings | src/libs/i18n/translations/en.json
- [x] T016 [P] Create Japanese translation file with all UI strings | src/libs/i18n/translations/jp.json
- [x] T017 Write failing tests for I18nProvider and useI18n hook: default locale VN, language switching, localStorage persistence, corrupted localStorage fallback, t() function returns correct strings | src/__tests__/libs/i18n.test.ts
- [x] T018 Implement I18nProvider (Client Component "use client") and useI18n hook: reads localStorage on mount, defaults to 'vn', provides t(key) and setLocale(), validates stored locale | src/libs/i18n/context.tsx

### Toast System

- [x] T019 Write failing tests for Toast component: renders when visible, hidden when not, auto-dismiss after 5s, role="alert", aria-live="assertive", onDismiss callback | src/__tests__/components/Toast.test.tsx
- [x] T020 [P] Implement useToast hook: show(message, type), dismiss(), isVisible, message, type — simple useState, NOT context provider | src/hooks/useToast.ts
- [x] T021 Implement Toast presentational component: fixed positioning (top-right desktop, top-center mobile), auto-dismiss 5s via useEffect, role="alert", aria-live="assertive", z-[100] | src/components/ui/Toast.tsx

### Middleware

- [x] T022 Write failing tests for root middleware: unauthenticated → redirect to /login, authenticated at /login → redirect to /, /auth/callback excluded from redirect, CSP headers present with Google OAuth domains, static routes excluded from matcher | src/__tests__/middleware.test.ts
- [x] T023 Implement root middleware: use existing src/libs/supabase/middleware.ts helper (createClient → getUser), auth redirect logic, CSP headers (default-src, script-src, connect-src with Supabase + Google domains, form-action, frame-ancestors), matcher config | src/middleware.ts

### OAuth Callback

- [x] T024 Write failing tests for OAuth callback route: valid code + sun-asterisk.com email → redirect to /, non-sun-asterisk domain → redirect to /login?error=domain_restricted, invalid code → auth_failed, missing code → auth_failed, rate limit exceeded → rate_limited, inserts into login_attempts on failure | src/__tests__/app/auth/callback.test.ts
- [x] T025 Implement OAuth callback GET route handler: extract code, exchangeCodeForSession, validate domain with isAllowedDomain, check rate limit via login_attempts table (configurable thresholds), redirect on success/failure | src/app/auth/callback/route.ts

**Checkpoint**: Foundation ready — all shared infrastructure tested and working. User story implementation can begin.

---

## Phase 3: User Story 1 — Login with Google (Priority: P1) MVP

**Goal**: User can click "LOGIN With Google", authenticate via Google OAuth (redirect mode), and be redirected to homepage. Restricted to @sun-asterisk.com. Error toasts for all failure scenarios.

**Independent Test**: Click login button → redirects to Google OAuth with correct params. After callback, authenticated user lands on homepage. Error params show translated toast.

### Styling & Layout Foundation (US1)

- [x] T026 [US1] Update globals.css: remove default light/dark theme variables, add design tokens from design-style.md as CSS custom properties, add Montserrat font family to @theme config | src/app/globals.css
- [x] T027 [US1] Update root layout: replace Geist fonts with Montserrat + Montserrat Alternates via next/font/google, update metadata (title: "Sun Annual Awards 2025"), wrap {children} with I18nProvider | src/app/layout.tsx
- [x] T028 [US1] Update root page: Server Component with auth check via createClient (server) → supabase.auth.getUser(), redirect to /login if unauthenticated, render homepage placeholder if authenticated | src/app/page.tsx

### UI Components (US1)

- [x] T029 [P] [US1] Implement LoginBackground: full-page key visual <Image fill object-cover priority>, left gradient overlay (90deg, #00101A → transparent at 25.41%), bottom gradient overlay (0deg, #00101A at 22.48% → transparent), z-index stacking (z-0, z-[1], z-[2]) | src/components/login/LoginBackground.tsx
- [x] T030 [P] [US1] Implement Logo: <Image> with SAA logo, alt="Sun Annual Awards 2025", 52x48px, clickable prop for reuse (non-interactive on login) | src/components/layout/Logo.tsx
- [x] T031 [P] [US1] Write failing tests for Footer: renders copyright text via i18n t(), responsive padding, border-top styling | src/__tests__/components/Footer.test.tsx
- [x] T032 [P] [US1] Implement Footer: sticky bottom, full-width, border-t border-[#2E3940], copyright via t('footer.copyright'), Montserrat Alternates Bold 16px white centered, responsive padding (py-6 px-4 → md:py-8 md:px-12 → lg:py-10 lg:px-[90px]) | src/components/layout/Footer.tsx
- [x] T033 [P] [US1] Write failing tests for Header: renders Logo and LanguageSelector, responsive padding, fixed positioning, semi-transparent bg | src/__tests__/components/Header.test.tsx
- [x] T034 [US1] Implement Header: fixed top-0 w-full h-20 z-50, bg-[rgba(11,15,18,0.8)], flex row space-between, Logo left + LanguageSelector right, responsive padding (px-4 → md:px-12 → lg:px-36) | src/components/layout/Header.tsx
- [x] T035 [P] [US1] Write failing tests for LoginButton: renders text + Google icon, click triggers supabase.auth.signInWithOAuth with correct params (provider google, redirect mode, hd sun-asterisk.com), double-click prevention (disabled on first click), loading state (disabled + opacity 0.7), error toast shown on mount when errorType prop present, responsive width (w-full base, lg:w-[305px]) | src/__tests__/components/LoginButton.test.tsx
- [x] T036 [US1] Implement LoginButton (Client Component "use client"): yellow #FFEA9E bg, dark #00101A text, Montserrat Bold 22px, 8px radius, 16px 24px padding, Google icon right of text with 8px gap, hover brightness(0.92) + box-shadow 150ms transition, active brightness(0.88) + scale(0.98), loading state, double-click prevention, signInWithOAuth redirect mode with PKCE + hd param, receives errorType prop → shows toast via useToast on mount, renders Toast component internally | src/components/login/LoginButton.tsx
- [x] T037 [US1] Implement LoginHero (Client Component "use client"): ROOT FURTHER image (451x200 responsive scale), description text via t('login.intro_line1')/t('login.intro_line2') Montserrat Bold 20px white, <LoginButton errorType={errorType}>, flex column gap-20 (visual→content), gap-6 (text→button), responsive centered mobile → lg:left-aligned desktop | src/components/login/LoginHero.tsx

### Page Assembly (US1)

- [x] T038 [US1] Implement Login page (Server Component): auth check → redirect to / if authenticated, read searchParams.error, render LoginBackground + Header + LoginHero(errorType) + Footer, min-h-screen bg-[#00101A] relative overflow-hidden | src/app/login/page.tsx
- [x] T039 [US1] Implement Login loading skeleton: centered spinner on dark #00101A background | src/app/login/loading.tsx

**Checkpoint**: User Story 1 complete — user can login with Google, see error toasts, authenticated users are redirected. All components render at all breakpoints.

---

## Phase 4: User Story 2 — Switch Language (Priority: P2)

**Goal**: User can switch display language between VN, EN, JP via dropdown in header. Selection persists in localStorage. All UI text updates without page reload.

**Independent Test**: Click language selector → dropdown opens with 3 options. Select EN → all text updates to English. Reload page → still EN. No localStorage → defaults to VN.

### Frontend (US2)

- [x] T040 [US2] Write failing tests for LanguageSelector: renders current flag + locale code + chevron, click toggles dropdown, dropdown shows 3 options (VN/EN/JP) with flags, selecting option calls setLocale and closes dropdown, selected item has yellow highlight bg rgba(255,234,158,0.2), keyboard nav (Enter/Space toggle, Arrow keys, Escape close), aria-expanded, aria-haspopup="listbox", role="option" per item, click outside closes dropdown | src/__tests__/components/LanguageSelector.test.tsx
- [x] T041 [US2] Implement LanguageSelector (Client Component "use client"): toggle button (flag 24x24 + locale code Montserrat Bold 16px white + chevron 24x24, padding 16px, border-radius 4px), dropdown container (#00070C bg, 1px solid #998C5F border, 8px radius, 6px padding, flex column, z-[60]), selected item (rgba(255,234,158,0.2) bg, 2px radius), non-selected hover (rgba(255,255,255,0.1)), keyboard navigation, ARIA attributes, click-outside handler via useEffect document listener, chevron rotation on open | src/components/ui/LanguageSelector.tsx

**Checkpoint**: User Stories 1 & 2 complete — full login flow + language switching working.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Error handling refinement, responsive verification, accessibility, E2E tests.

- [x] T042 [P] Verify error→toast mapping: all 4 error types (domain_restricted, auth_cancelled, auth_failed, rate_limited) show correct i18n-translated toast messages on login page load with ?error param
- [x] T043 [P] Responsive verification: visually verify all components at 320px, 768px, 1024px breakpoints per design-style.md. Fix any layout issues.
- [x] T044 [P] Accessibility audit: verify tab order (Language selector → Login button), all ARIA attributes, visible focus rings on interactive elements, color contrast ratios (white on dark ≥ 7:1, dark on yellow ≥ 4.5:1), prefers-reduced-motion respected
- [x] T045 [P] i18n completeness check: verify all 3 translation files (vn.json, en.json, jp.json) have identical key sets, no missing translations
- [x] T046 Write E2E tests with Playwright: full login flow (mock OAuth redirect → callback → homepage), language switch (VN → EN → JP → verify text), error toast scenarios (each error type), responsive viewports (320px, 768px, 1024px), keyboard navigation | src/e2e/login.spec.ts

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No dependencies, start immediately
     ↓
Phase 2 (Foundation)     → Depends on Phase 1 completion, BLOCKS all user stories
     ↓
Phase 3 (US1 - Login)    → Depends on Phase 2 completion
Phase 4 (US2 - Language) → Depends on Phase 2 completion
     ↓                        (US1 and US2 can run in parallel)
Phase 5 (Polish)         → Depends on Phase 3 + Phase 4 completion
```

### Within Phase 2 (Foundation)

```
T010 (auth types) ──┐
T013 (i18n types) ──┤── Can run in parallel (different files)
T014-T016 (translations) ─┘
     ↓
T011 → T012 (auth utils: test first → implement)
T017 → T018 (i18n context: test first → implement)
T019 → T020+T021 (toast: test first → implement hook + component)
T022 → T023 (middleware: test first → implement)
T024 → T025 (callback: test first → implement)
```

### Within Phase 3 (US1)

```
T026-T028 (styling + layout + root page) ── Sequential (layout depends on globals.css)
     ↓
T029 (LoginBackground) ─┐
T030 (Logo)             ─┤── Can run in parallel (independent components)
T031→T032 (Footer)      ─┤
T033→T034 (Header)      ─┘
     ↓
T035→T036 (LoginButton: test → implement)
     ↓
T037 (LoginHero: depends on LoginButton)
     ↓
T038 (Login page: assembles all components)
T039 (Loading: independent)
```

### Parallel Opportunities

| Context | Parallel Tasks |
|---------|---------------|
| Phase 1 | T004 + T005 + T006 (config files) |
| Phase 2 types | T010 + T013 + T014 + T015 + T016 (different files) |
| Phase 2 features | T011/T012, T017/T018, T019/T020/T021 (after types done, independent streams) |
| Phase 3 components | T029 + T030 + T031/T032 + T033/T034 (independent UI components) |
| Phase 4 | Can start immediately after Phase 2 (independent of US1) |
| Phase 5 | T042 + T043 + T044 + T045 (independent audits) |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1 — Login with Google) **only**
3. **STOP and VALIDATE**: Test login flow end-to-end with `wrangler dev`
4. Deploy MVP if ready

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready
2. Phase 3 (US1 - Login) → Test → Deploy basic login
3. Phase 4 (US2 - Language) → Test → Deploy with language switching
4. Phase 5 (Polish) → Test → Final deploy

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 46 |
| **Phase 1 (Setup)** | 9 tasks |
| **Phase 2 (Foundation)** | 16 tasks |
| **Phase 3 (US1 - Login)** | 14 tasks |
| **Phase 4 (US2 - Language)** | 2 tasks |
| **Phase 5 (Polish)** | 5 tasks |
| **Parallelizable tasks** | 22 tasks (marked [P]) |
| **TDD task pairs** | 8 pairs (test → implement) |
| **MVP scope** | Phase 1 + 2 + 3 (39 tasks) |

---

## Notes

- TDD is mandatory per constitution: every test task (T011, T017, T019, T022, T024, T031, T033, T035, T040) MUST be written and FAIL before the corresponding implementation task
- Commit after each task or logical group (e.g., test + implementation pair)
- Run `yarn test` before moving to next phase
- Mark tasks complete as you go: `[x]`
- US2 (LanguageSelector) can technically start in parallel with US1 after Foundation is complete, but if solo developer, do US1 first for faster MVP
- All Tailwind classes use mobile-first convention: base = mobile, breakpoint prefix = larger screens

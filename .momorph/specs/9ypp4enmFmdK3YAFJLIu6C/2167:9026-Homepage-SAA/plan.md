# Implementation Plan: Homepage SAA

**Frame**: `2167:9026-Homepage-SAA`
**Date**: 2026-03-19
**Spec**: `specs/9ypp4enmFmdK3YAFJLIu6C/2167:9026-Homepage-SAA.csv`

---

## Summary

Build the Homepage for Sun* Annual Awards 2025 — the authenticated landing page after login. The page includes a hero banner with countdown timer, event information, "Root Further" content section, award categories grid (6 cards), Sun* Kudos promotion block, and a floating action button. The existing Header and Footer components must be refactored from login-specific to shared navigation components with active state synchronization.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, React 19 Server Components)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr
**Database**: PostgreSQL via Supabase (tables: `events`, `award_categories`, `notifications`)
**Testing**: Vitest (unit) + Playwright (E2E) — TDD mandatory per constitution
**State Management**: React Context (i18n existing), React useState for local UI state (FAB, notification panel)
**API Style**: Supabase client SDK (server-side data fetching in Server Components)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — TypeScript strict, Montserrat font, CSS variables
- [x] Uses approved libraries and patterns — Supabase client, Tailwind CSS 4, Next.js App Router
- [x] Adheres to folder structure guidelines — `src/components/`, `src/hooks/`, `src/types/`, `src/utils/`
- [x] Meets security requirements — Server-side data fetching, auth check in page.tsx, CSP headers
- [x] Follows testing standards — TDD cycle: write failing test → implement → refactor

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| None | N/A | N/A |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based grouping under `src/components/home/` for homepage-specific components. Shared components (`Header`, `Footer`, `FAB`) under `src/components/layout/`.
- **Styling Strategy**: Tailwind CSS 4 utility classes with existing CSS variables. Mobile-first responsive (320px → 768px → 1024px).
- **Data Fetching**: Server Components fetch data from Supabase on the server (events, award_categories). Client Components only for interactive elements (countdown timer, FAB toggle, notification panel).
- **Layout Strategy**: Use Next.js **route groups** to separate authenticated and unauthenticated layouts:
  - `src/app/(auth)/login/` — Login page with minimal Header (Logo + LanguageSelector only) and minimal Footer (copyright only). This preserves the existing login page behavior.
  - `src/app/(main)/` — Authenticated pages with full Header (nav links + notification + language + profile) and full Footer (nav links + copyright). Homepage is `src/app/(main)/page.tsx`.
  - Root `layout.tsx` — Keeps I18nProvider, fonts, metadata. No Header/Footer here.
  - `src/app/(main)/layout.tsx` — **NEW**: Renders full Header, Footer, and FAB for all authenticated pages.
  - `src/app/(auth)/layout.tsx` — **NEW**: Renders minimal Header and Footer for login flow.
- **Rendering Split**:
  - **Server Components**: `page.tsx` (data fetching), `HeroSection`, `ContentSection`, `AwardsSection`, `KudosSection`
  - **Client Components**: `CountdownTimer`, `FloatingActionButton`, `NotificationPanel`, `ProfileDropdown`, `NavLink` (uses `usePathname`)
  - **Note**: `Header` stays as a Server Component — interactive children (`NavLink`, `NotificationPanel`, `ProfileDropdown`, `LanguageSelector`) are Client Components embedded inside.

### Backend Approach

- **API Design**: No custom API routes needed. All data fetched via Supabase client in Server Components.
- **Data Access**: `createServerClient` from `src/libs/supabase/server.ts` (already exists).
- **Database Tables Needed** (all with RLS enabled per constitution security requirement):
  - `events` — id, event_date, venue, broadcast_note, created_at (new migration, RLS: read-only for authenticated users)
  - `award_categories` — id, name, slug, short_description, thumbnail_url, display_order, created_at (new migration, RLS: read-only for authenticated users)
  - `notifications` — id, user_id, title, body, read, created_at (new migration, RLS: users can only read/update their own notifications)
- **Seed Data**: Include seed SQL in the migration files (INSERT statements after CREATE TABLE) for the 1 event record and 6 award categories. This keeps seed data version-controlled and reproducible.

### Integration Points

- **Existing Services**: Supabase auth (session check), i18n context (VN/EN), LanguageSelector component
- **Shared Components to Refactor**: `Header.tsx` (add nav links, notification, profile), `Footer.tsx` (add nav links, copyright)
- **Shared Components to Reuse**: `Logo.tsx` (already exists), `LanguageSelector.tsx` (already exists)
- **New Shared Components**: `NavLink` (active state aware), `FloatingActionButton`, `NotificationPanel`, `ProfileDropdown`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/9ypp4enmFmdK3YAFJLIu6C/2167:9026-Homepage-SAA/
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
.momorph/specs/9ypp4enmFmdK3YAFJLIu6C/
└── 2167:9026-Homepage-SAA.csv   # Feature specification
```

### Source Code (affected areas)

```text
# Database Migrations
supabase/migrations/
├── 20260319_create_events.sql
├── 20260319_create_award_categories.sql
└── 20260319_create_notifications.sql

# Types
src/types/
├── event.ts              # Event, AwardCategory types
└── notification.ts       # Notification type

# Shared Layout Components (refactor + new)
src/components/layout/
├── Header.tsx            # REFACTOR: add nav links, notification, profile dropdown
├── Footer.tsx            # REFACTOR: add nav links, active state sync
├── Logo.tsx              # REUSE: no changes
├── NavLink.tsx           # NEW: active-state-aware navigation link
├── FloatingActionButton.tsx  # NEW: FAB with expanded menu
├── NotificationPanel.tsx     # NEW: dropdown with infinity scroll
└── ProfileDropdown.tsx       # NEW: account menu dropdown

# Homepage Components
src/components/home/
├── HeroSection.tsx       # Hero banner container (Server Component)
├── CountdownTimer.tsx    # Live countdown (Client Component)
├── EventInfo.tsx         # Static event details
├── CtaButtons.tsx        # ABOUT AWARDS / ABOUT KUDOS buttons
├── ContentSection.tsx    # Root Further description block
├── AwardsSectionHeader.tsx  # Section title
├── AwardCard.tsx         # Individual award category card
├── AwardsGrid.tsx        # Grid container for 6 cards
└── KudosSection.tsx      # Sun* Kudos promotion block

# Hooks
src/hooks/
├── useCountdown.ts       # Countdown timer logic
└── useNotifications.ts   # Notification fetching with pagination

# Root Layout (unchanged structure, no Header/Footer here)
src/app/
├── layout.tsx            # KEEP: I18nProvider, fonts, metadata (no Header/Footer)
│
# Authenticated Route Group
├── (main)/
│   ├── layout.tsx        # NEW: full Header + Footer + FAB wrapper
│   ├── page.tsx          # MOVE+REFACTOR: Homepage with all sections (from src/app/page.tsx)
│   └── loading.tsx       # NEW: skeleton loading state for homepage
│
# Auth Route Group (preserves existing login behavior)
├── (auth)/
│   ├── layout.tsx        # NEW: minimal Header + Footer wrapper
│   └── login/
│       ├── page.tsx      # MOVE: existing login page (from src/app/login/page.tsx)
│       └── loading.tsx   # MOVE: existing login loading (from src/app/login/loading.tsx)
│
# Auth Callback (stays at root level for OAuth redirect)
└── auth/
    └── callback/
        └── route.ts      # KEEP: no changes

# Assets (download from Figma)
public/images/
├── hero-bg.png           # Hero section background artwork
├── root-further-logo.png # Root Further typography image
├── award-bg.png          # Award card golden circle background
├── award-top-talent.png  # Award name overlay
├── award-top-project.png
├── award-top-project-leader.png
├── award-best-manager.png
├── award-signature-creator.png
├── award-mvp.png
├── kudos-bg.png          # Kudos section background
└── kudos-logo.svg        # KUDOS text logo
public/icons/
├── bell.svg              # Notification bell
├── arrow-up-right.svg    # CTA button arrow icon
├── pen.svg               # FAB pen icon
└── saa-rocket.svg        # FAB SAA icon

# Tests
src/__tests__/
├── components/
│   ├── home/
│   │   ├── HeroSection.test.tsx
│   │   ├── CountdownTimer.test.tsx
│   │   ├── EventInfo.test.tsx
│   │   ├── CtaButtons.test.tsx
│   │   ├── ContentSection.test.tsx
│   │   ├── AwardsSectionHeader.test.tsx
│   │   ├── AwardCard.test.tsx
│   │   ├── AwardsGrid.test.tsx
│   │   └── KudosSection.test.tsx
│   └── layout/
│       ├── NavLink.test.tsx
│       ├── Header.test.tsx          # Refactored Header tests
│       ├── Footer.test.tsx          # Refactored Footer tests
│       ├── FloatingActionButton.test.tsx
│       ├── NotificationPanel.test.tsx
│       └── ProfileDropdown.test.tsx
├── hooks/
│   ├── useCountdown.test.ts
│   └── useNotifications.test.ts
└── e2e/ (or src/e2e/)
    └── homepage.spec.ts
```

---

## Implementation Strategy

### Phase Breakdown

#### Phase 0: Asset Preparation & Database Setup
- Download all media assets from Figma using `get_media_files` URLs to `public/images/` and `public/icons/` (see Assets table below)
- Create Supabase migration `20260319_create_events.sql`: CREATE TABLE + RLS policies (authenticated read-only) + INSERT seed data (1 event: date=2025-12-26, venue='Âu Cơ Art Center', broadcast_note='Tường thuật trực tiếp qua sóng Livestream')
- Create Supabase migration `20260319_create_award_categories.sql`: CREATE TABLE + RLS policies (authenticated read-only) + INSERT seed data (6 categories with name, slug, short_description, thumbnail_url, display_order)
- Create Supabase migration `20260319_create_notifications.sql`: CREATE TABLE + RLS policies (users read/update own only) — no seed data
- Define TypeScript types in `src/types/event.ts` (`Event`, `AwardCategory`) and `src/types/notification.ts` (`Notification`)
- Add i18n translation keys for homepage text to `vn.json`, `en.json`, `jp.json` (keys: `home.coming_soon`, `home.event_time`, `home.event_venue`, `home.event_broadcast`, `home.about_awards`, `home.about_kudos`, `home.awards_title`, `home.awards_subtitle`, `home.detail`, `home.kudos_title`, `home.kudos_label`, `home.fab_rules`, `home.fab_write_kudos`, `footer.copyright`, `notification.view_all`)

#### Phase 1: Route Groups & Shared Layout Foundation (Header/Footer Refactor)
**Priority: P0 — blocks all other work**

**Step 1a: Route group migration (structural, no UI changes)**
- Create `src/app/(main)/` and `src/app/(auth)/` route groups
- Move `src/app/page.tsx` → `src/app/(main)/page.tsx`
- Move `src/app/login/` → `src/app/(auth)/login/`
- Create `src/app/(auth)/layout.tsx` — renders existing minimal Header + Footer (preserves login page exactly as-is)
- Create `src/app/(main)/layout.tsx` — will render full Header + Footer + FAB (placeholder for now)
- **Verify**: Run ALL existing login E2E tests — they must pass unchanged after this refactor

**Step 1b: NavLink component**
- **TDD**: Write tests for `NavLink` component (active/hover/normal states, pathname matching)
- Implement `NavLink` — shared between Header and Footer, uses `usePathname()` for active state

**Step 1c: Full Header for authenticated pages**
- **TDD**: Write tests for refactored `Header` (3 nav links, notification bell placeholder, language, profile placeholder)
- Create `Header.tsx` variant with navigation: accepts `variant="full"` (nav + controls) or `variant="minimal"` (logo + language only, current behavior)
- Wire full Header into `src/app/(main)/layout.tsx`

**Step 1d: Full Footer for authenticated pages**
- **TDD**: Write tests for refactored `Footer` (4 nav links + copyright, active state sync with header)
- Create `Footer.tsx` variant: `variant="full"` (nav links + logo + copyright) or `variant="minimal"` (copyright only)
- Wire full Footer into `src/app/(main)/layout.tsx`
- **Verify**: Run ALL existing login E2E tests again — must still pass

#### Phase 2: Hero Section (Keyvisual + Countdown + Event Info + CTA)
**Priority: P1 — core above-the-fold content**
- **TDD**: Write tests for `useCountdown` hook (calculation, zero-padding, expiry behavior)
- Implement `useCountdown` hook — interval-based countdown from `event_date`
- **TDD**: Write tests for `CountdownTimer` component (renders 3 units, updates, hides label on expiry)
- Implement `CountdownTimer` client component
- Implement `EventInfo` server component (static display)
- Implement `CtaButtons` component (2 CTA buttons with hover states)
- Implement `HeroSection` container — assembles all hero sub-components
- Verify responsive: mobile stack, desktop horizontal layout

#### Phase 3: Content & Awards Section
**Priority: P1 — main content area**
- Implement `ContentSection` — static Root Further text block (Server Component)
- **TDD**: Write tests for `AwardCard` component (renders image/title/desc/CTA, click navigation, hover effect, 2-line ellipsis)
- Implement `AwardCard` component
- Implement `AwardsSectionHeader` — caption, divider, title, subtitle
- **TDD**: Write tests for `AwardsGrid` (renders 6 cards, responsive grid 3→2→1 columns)
- Implement `AwardsGrid` — fetches from `award_categories` table, renders grid
- Implement `KudosSection` — promotion block with CTA

#### Phase 4: Interactive Components (FAB, Notifications, Profile)
**Priority: P2 — enhanced functionality**
- **TDD**: Write tests for `FloatingActionButton` (open/close toggle, 2 menu items, fixed position)
- Implement `FloatingActionButton` — toggle state, 'Thể lệ' and 'Viết KUDOS' options, X close button
- **TDD**: Write tests for `useNotifications` hook (fetch, pagination, unread count)
- Implement `useNotifications` hook — Supabase realtime subscription for unread count
- **TDD**: Write tests for `NotificationPanel` (max 5 initial, infinity scroll, 'Xem tất cả' link, badge)
- Implement `NotificationPanel`
- **TDD**: Write tests for `ProfileDropdown` (Profile/Sign out/Admin options, role-based visibility)
- Implement `ProfileDropdown`

#### Phase 5: Page Assembly & Polish
**Priority: P1**
- Implement `src/app/(main)/page.tsx` — compose all sections (auth check → fetch events + award_categories from Supabase → render HeroSection, ContentSection, AwardsGrid, KudosSection)
- Create `src/app/(main)/loading.tsx` — skeleton loading state with placeholder blocks matching page sections
- Verify responsive design at 320px, 768px, 1024px for ALL components
- Accessibility: keyboard navigation for FAB and dropdowns, aria-labels on interactive elements, semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`)
- **E2E tests**: Write Playwright tests for full homepage flow (page load, countdown, award card click, FAB interaction, notification panel, responsive viewports)

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Header/Footer refactor breaks login page | Medium | High | Thorough test coverage on existing login tests before refactoring; run full test suite after each change |
| Countdown timer drift on long page sessions | Low | Low | Use `setInterval` with absolute target time comparison (not relative decrement) |
| Large hero background images slow page load | Medium | Medium | Use Next.js `<Image>` with priority loading, WebP format, appropriate sizes |
| Notification realtime subscription on Cloudflare Workers | Medium | High | Test Supabase realtime on Cloudflare edge; fallback to polling if incompatible |
| i18n translation keys missing for new content | Low | Low | Add all keys upfront in Phase 0; type-safe TranslationKey ensures compile-time check |

### Estimated Complexity

- **Frontend**: High (42 design items, multiple interactive components, responsive grid)
- **Backend**: Low (3 simple tables, no complex business logic, Supabase handles auth)
- **Testing**: High (TDD mandatory, unit + integration + E2E for all components)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Header ↔ Footer active state sync, CountdownTimer ↔ useCountdown hook, AwardsGrid ↔ Supabase data
- [x] **External dependencies**: Supabase (events, award_categories, notifications tables)
- [x] **Data layer**: Server Component data fetching, notification realtime subscription
- [x] **User workflows**: Page load → view countdown → click award card → navigate; FAB open/close; notification panel scroll

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown timer updates, FAB toggle, notification badge count |
| Service ↔ Service | No | N/A |
| App ↔ External API | Yes | Supabase data fetch for events and award_categories |
| App ↔ Data Layer | Yes | CRUD notifications, read event data, read award categories |
| Cross-platform | Yes | Responsive layout at 320px, 768px, 1024px breakpoints |

### Test Environment

- **Environment type**: Local (Supabase local via `supabase start`) + Playwright for E2E
- **Test data strategy**: Supabase seed script with fixture data for events and award_categories
- **Isolation approach**: Fresh database state per test suite via migration reset

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock in unit tests | Isolate component logic from network |
| Supabase client | Real in integration/E2E | Verify actual data flow |
| Date/Time (countdown) | Mock `Date.now()` | Deterministic countdown testing |
| `usePathname` (NavLink) | Mock via Next.js test utils | Test active state without routing |
| Notification realtime | Mock Supabase channel | Avoid flaky realtime tests in CI |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Homepage loads with all sections visible (hero, content, awards, kudos, footer)
   - [x] Countdown timer displays correct remaining time and updates
   - [x] 6 award cards render with correct data from database
   - [x] Click award card navigates to Award Information page with correct hash
   - [x] Header/Footer nav links show correct active state for current page
   - [x] FAB opens expanded menu with 'Thể lệ' and 'Viết KUDOS'
   - [x] Notification panel shows max 5 items with infinity scroll

2. **Error Handling**
   - [x] Unauthenticated user redirected to /login (existing middleware)
   - [x] Award card image fails to load → shows placeholder
   - [x] Database connection error → graceful error boundary
   - [x] Notification fetch failure → badge hidden, panel shows error message

3. **Edge Cases**
   - [x] Countdown reaches 0 → 'Coming soon' label hides, shows 00:00:00
   - [x] Event date in the past → countdown shows 00:00:00
   - [x] No notifications → badge hidden, panel shows empty state
   - [x] Award description exceeds 2 lines → text truncated with ellipsis
   - [x] Responsive: all sections stack properly on 320px mobile

### Tooling & Framework

- **Test framework**: Vitest + @testing-library/react (unit), Playwright (E2E)
- **Supporting tools**: @testing-library/jest-dom for assertions, vitest mock for timers
- **CI integration**: `yarn test` (Vitest) and `yarn test:e2e` (Playwright) in CI pipeline

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Hooks (useCountdown, useNotifications) | 90%+ | High |
| Interactive components (FAB, NotificationPanel, ProfileDropdown) | 85%+ | High |
| Static display components (AwardCard, EventInfo, ContentSection) | 80%+ | Medium |
| E2E critical paths (page load, navigation, countdown) | Key flows | High |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] CSV spec approved and reviewed
- [ ] Supabase migrations for `events`, `award_categories`, `notifications` created
- [ ] Figma assets downloaded to `public/` directory
- [ ] i18n translation keys for homepage text added to VN/EN/JP JSON files

### External Dependencies

- Supabase local instance running (`supabase start`)
- Figma media assets (hero background, award thumbnails, icons) — URLs available from `get_media_files`

### Assets to Download

| Figma Node | Target Path | Description |
|------------|------------|-------------|
| `2167:9028` | `public/images/hero-bg.png` | Hero section background artwork |
| `2788:12911` | `public/images/root-further-logo.png` | Root Further typography logo |
| `3204:10155` | `public/images/hero-artwork-right.png` | Hero right-side artwork |
| `3204:10154` | `public/images/hero-artwork-left.png` | Hero left-side artwork |
| `I2167:9075;214:1019;81:2442` | `public/images/award-bg.png` | Award card golden circle BG |
| `I2167:9075;214:1019;214:666;10:951` | `public/images/award-top-talent.png` | Top Talent name overlay |
| `I2167:9076;214:1019;214:666;214:654` | `public/images/award-top-project.png` | Top Project name overlay |
| `I2167:9077;214:1019;214:666;214:655` | `public/images/award-top-project-leader.png` | Top Project Leader overlay |
| `I2167:9079;214:1019;214:666;214:656` | `public/images/award-best-manager.png` | Best Manager overlay |
| `I2167:9080;214:1019;214:666;214:657` | `public/images/award-signature-creator.png` | Signature Creator overlay |
| `I2167:9081;214:1019;214:666;214:653` | `public/images/award-mvp.png` | MVP overlay |
| `I3390:10349;313:8416` | `public/images/kudos-bg.png` | Kudos section background |
| `I3390:10349;329:2948` | `public/images/kudos-logo.svg` | KUDOS text logo |
| `I2167:9091;186:2101;186:2020;186:1420` | `public/icons/bell.svg` | Notification bell icon |
| `I5022:15169;214:3839;186:1763` | `public/icons/pen.svg` | FAB pen icon |
| `I5022:15169;214:3839;186:1766;214:3762` | `public/icons/saa-rocket.svg` | FAB SAA rocket icon |
| `I2167:9091;178:1033;178:1030` | `public/icons/logo-saa.png` | Header logo (already exists as logo-saa.png) |
| `I5001:14800;342:1408;178:1030` | `public/icons/logo-saa-footer.png` | Footer logo |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → 1 → 2 → 3 → 4 → 5)

---

## Notes

- **Route group migration is the most critical path** — Phase 1 Step 1a moves files into `(auth)` and `(main)` route groups. This must be done first and verified with existing login E2E tests before any Header/Footer changes.
- **Header/Footer variant approach** — Rather than creating separate components, use a `variant` prop (`"full"` | `"minimal"`) to support both authenticated (nav + controls) and unauthenticated (logo + language only) layouts. This keeps a single source of truth for shared styling.
- **Countdown timer** uses client-side `setInterval` with absolute time comparison (not relative decrement) to avoid drift.
- **Award card data** comes from `award_categories` Supabase table. The 6 categories are seeded in migration, ordered by `display_order`.
- **Notification realtime** uses Supabase Realtime channels. If incompatible with Cloudflare Workers edge runtime, fall back to periodic polling (every 30s).
- **FAB is a global component** — placed in `src/app/(main)/layout.tsx` so it appears on all authenticated pages but NOT on login.
- **Middleware unchanged** — The existing middleware at `src/middleware.ts` handles auth redirects. Route groups don't affect middleware behavior because `(auth)` and `(main)` are transparent to URL routing.
- **No new npm dependencies required** — all functionality achievable with existing stack.

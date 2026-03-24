# Tasks: Homepage SAA

**Frame**: `2167:9026-Homepage-SAA`
**Prerequisites**: plan.md (required), 2167:9026-Homepage-SAA.csv (spec)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets, Database, Types, i18n)

**Purpose**: Download assets, create database tables, define types, add i18n keys

- [x] T001 Download hero background artwork from Figma | public/images/hero-bg.png
- [x] T002 [P] Download Root Further logo from Figma | public/images/root-further-logo.png
- [x] T003 [P] Download hero artwork images (left + right) from Figma | public/images/hero-artwork-left.png, public/images/hero-artwork-right.png
- [x] T004 [P] Download 6 award card images (bg + name overlays) from Figma | public/images/award-*.png
- [x] T005 [P] Download Kudos section assets (bg + logo) from Figma | public/images/kudos-bg.png, public/images/kudos-logo.svg
- [x] T006 [P] Download icon assets (bell, arrow-up-right, pen, saa-rocket, footer logo) from Figma | public/icons/bell.svg, public/icons/arrow-up-right.svg, public/icons/pen.svg, public/icons/saa-rocket.svg, public/icons/logo-saa-footer.png
- [x] T007 [P] Create Supabase migration for `events` table with RLS (authenticated read-only) + seed data (event_date=2025-12-26, venue='Âu Cơ Art Center', broadcast_note='Tường thuật trực tiếp qua sóng Livestream') | supabase/migrations/20260319_create_events.sql
- [x] T008 [P] Create Supabase migration for `award_categories` table with RLS (authenticated read-only) + seed 6 categories (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) with name, slug, short_description, thumbnail_url, display_order | supabase/migrations/20260319_create_award_categories.sql
- [x] T009 [P] Create Supabase migration for `notifications` table with RLS (users read/update own only), columns: id, user_id, title, body, read, created_at | supabase/migrations/20260319_create_notifications.sql
- [x] T010 [P] Define TypeScript types: Event (id, event_date, venue, broadcast_note), AwardCategory (id, name, slug, short_description, thumbnail_url, display_order) | src/types/event.ts
- [x] T011 [P] Define TypeScript type: Notification (id, user_id, title, body, read, created_at) | src/types/notification.ts
- [x] T012 [P] Add i18n translation keys for homepage to VN/EN/JP: home.coming_soon, home.event_time, home.event_venue, home.event_broadcast, home.about_awards, home.about_kudos, home.awards_title, home.awards_subtitle, home.detail, home.kudos_title, home.kudos_label, home.fab_rules, home.fab_write_kudos, notification.view_all | src/libs/i18n/translations/vn.json, en.json, jp.json
- [ ] T013 Run `supabase db reset` to apply migrations and verify seed data | supabase/

---

## Phase 2: Foundation — Route Groups & Shared Layout (P0, blocks all user stories)

**Purpose**: Migrate to route groups, create NavLink, refactor Header/Footer with variant support

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Step 2a: Route Group Migration (structural, no UI changes)

- [x] T014 Create `src/app/(main)/` route group directory and move `src/app/page.tsx` → `src/app/(main)/page.tsx` | src/app/(main)/page.tsx
- [x] T015 Create `src/app/(auth)/login/` route group directory and move `src/app/login/page.tsx` → `src/app/(auth)/login/page.tsx`, move `src/app/login/loading.tsx` → `src/app/(auth)/login/loading.tsx` | src/app/(auth)/login/
- [x] T016 Create auth route group layout that renders existing minimal Header + Footer (preserves login page exactly as-is) | src/app/(auth)/layout.tsx
- [x] T017 Create main route group layout placeholder (renders children only for now) | src/app/(main)/layout.tsx
- [x] T018 Verify ALL existing login E2E tests pass unchanged after route group migration — run `yarn test:e2e` | src/e2e/login.spec.ts

### Step 2b: NavLink Component

- [x] T019 **TDD**: Write failing tests for NavLink component — active state (yellow text + underline when pathname matches), hover state (light background), normal state (default text), click navigation, scroll-to-top when clicking already-active link | src/__tests__/components/layout/NavLink.test.tsx
- [x] T020 Implement NavLink client component using `usePathname()` from next/navigation. Props: href, label, className. Renders `<Link>` with conditional active/hover/normal styles using Tailwind | src/components/layout/NavLink.tsx

### Step 2c: Full Header

- [x] T021 **TDD**: Write failing tests for Header with variant="full" — renders logo, 3 NavLinks (About SAA 2025, Award Information, Sun* Kudos), notification bell icon (40x40px), LanguageSelector, profile icon (40x40px). Also test variant="minimal" renders only logo + LanguageSelector (existing behavior) | src/__tests__/components/layout/Header.test.tsx
- [x] T022 Refactor Header component to accept `variant` prop ("full" | "minimal"). variant="full": add nav links using NavLink, notification bell button, profile button. variant="minimal": keep existing logo + LanguageSelector. Default variant="minimal" for backward compatibility | src/components/layout/Header.tsx
- [x] T023 Update `src/app/(main)/layout.tsx` to render `<Header variant="full" />` | src/app/(main)/layout.tsx

### Step 2d: Full Footer

- [x] T024 **TDD**: Write failing tests for Footer with variant="full" — renders logo (69x64px), 4 NavLinks (About SAA 2025, Award Information, Sun* Kudos, Tiêu chuẩn chung), copyright text 'Bản quyền thuộc về Sun* © 2025'. Also test variant="minimal" renders copyright only (existing behavior). Test active state sync with header (same pathname matching as NavLink) | src/__tests__/components/layout/Footer.test.tsx
- [x] T025 Refactor Footer component to accept `variant` prop ("full" | "minimal"). variant="full": add logo, NavLinks, copyright. variant="minimal": keep existing copyright only. Default variant="minimal" for backward compatibility | src/components/layout/Footer.tsx
- [x] T026 Update `src/app/(main)/layout.tsx` to render `<Footer variant="full" />` | src/app/(main)/layout.tsx
- [x] T027 Verify ALL existing login E2E tests still pass after Header/Footer refactor — run `yarn test:e2e` | src/e2e/login.spec.ts

**Checkpoint**: Route groups active, Header/Footer support full+minimal variants, login page unchanged

---

## Phase 3: User Story 1 — Hero Section (Priority: P1) 🎯 MVP

**Goal**: Display hero banner with ROOT FURTHER title, countdown timer, event info, and CTA buttons
**Independent Test**: Authenticated user sees hero section with live countdown, correct event info, and working CTA navigation

### Hooks (US1)

- [x] T028 **TDD**: Write failing tests for `useCountdown` hook — accepts target Date, returns {days, hours, minutes} with zero-padding (always 2 digits), updates every 60 seconds, returns 00/00/00 when expired, isExpired flag | src/__tests__/hooks/useCountdown.test.ts
- [x] T029 Implement `useCountdown` hook — uses `setInterval` with absolute time comparison against `Date.now()`. Returns `{days: string, hours: string, minutes: string, isExpired: boolean}`. Clears interval on unmount | src/hooks/useCountdown.ts

### Components (US1)

- [x] T030 **TDD**: Write failing tests for CountdownTimer — renders 3 flip-clock units (DAYS/HOURS/MINUTES), displays 'Coming soon' label when not expired, hides label when expired, shows 00 values on expiry | src/__tests__/components/home/CountdownTimer.test.tsx
- [x] T031 [P] [US1] Implement CountdownTimer client component ("use client") — receives `eventDate` prop, uses `useCountdown` hook, renders flip-clock style digits with unit labels | src/components/home/CountdownTimer.tsx
- [x] T032 [P] [US1] **TDD**: Write failing tests for EventInfo — renders event date '26/12/2025', venue 'Âu Cơ Art Center', broadcast note, responsive layout | src/__tests__/components/home/EventInfo.test.tsx
- [x] T033 [P] [US1] Implement EventInfo server component — receives event data as props, displays time/venue/broadcast note with labels | src/components/home/EventInfo.tsx
- [x] T034 [P] [US1] **TDD**: Write failing tests for CtaButtons — renders 'ABOUT AWARDS' and 'ABOUT KUDOS' buttons with arrow icons, hover state swap, click navigation | src/__tests__/components/home/CtaButtons.test.tsx
- [x] T035 [P] [US1] Implement CtaButtons component — two Link buttons with icon, hover style: normal↔filled swap, routes to /award-information and /sun-kudos | src/components/home/CtaButtons.tsx
- [x] T036 [US1] **TDD**: Write failing tests for HeroSection — renders ROOT FURTHER title, CountdownTimer, EventInfo, CtaButtons, hero background image | src/__tests__/components/home/HeroSection.test.tsx
- [x] T037 [US1] Implement HeroSection server component — container with background image, assembles CountdownTimer (passes event_date), EventInfo (passes event data), CtaButtons. Uses Next.js Image for background with priority loading | src/components/home/HeroSection.tsx

**Checkpoint**: Hero section renders with live countdown and working CTAs

---

## Phase 4: User Story 2 — Content & Awards Section (Priority: P1)

**Goal**: Display Root Further content, awards section header, 6 award cards in responsive grid, and Kudos promotion block
**Independent Test**: Authenticated user sees Root Further text, 6 award cards with correct data from database, cards link to correct award pages

### Components (US2)

- [x] T038 [P] [US2] **TDD**: Write failing tests for ContentSection — renders Root Further logo image, multi-paragraph Vietnamese text, English quote 'A tree with deep roots fears no storm' with translation | src/__tests__/components/home/ContentSection.test.tsx
- [x] T039 [P] [US2] Implement ContentSection server component — static text block with Root Further logo image above, text content, quote block. Responsive typography | src/components/home/ContentSection.tsx
- [x] T040 [P] [US2] **TDD**: Write failing tests for AwardsSectionHeader — renders caption 'Sun* annual awards 2025', horizontal divider, title 'Hệ thống giải thưởng', subtitle | src/__tests__/components/home/AwardsSectionHeader.test.tsx
- [x] T041 [P] [US2] Implement AwardsSectionHeader component — caption, `<hr>` divider, title, subtitle text | src/components/home/AwardsSectionHeader.tsx
- [x] T042 [US2] **TDD**: Write failing tests for AwardCard — renders thumbnail image, title, description (max 2 lines with ellipsis via line-clamp-2), 'Chi tiết' button with arrow icon, whole card clickable to /award-information#[slug], hover effect (translate-y lift), image error shows placeholder | src/__tests__/components/home/AwardCard.test.tsx
- [x] T043 [US2] Implement AwardCard component — receives AwardCategory as prop, renders card with image (Next.js Image), title, description (line-clamp-2), detail link. Wrapped in Link to /award-information#slug. Hover: transform translateY(-4px) transition | src/components/home/AwardCard.tsx
- [x] T044 [US2] **TDD**: Write failing tests for AwardsGrid — renders 6 AwardCard components, responsive grid (1 col mobile, 2 col tablet, 3 col desktop), fetches data from award_categories table | src/__tests__/components/home/AwardsGrid.test.tsx
- [x] T045 [US2] Implement AwardsGrid server component — receives AwardCategory[] as props, renders CSS grid with responsive columns (grid-cols-1 md:grid-cols-2 lg:grid-cols-3) | src/components/home/AwardsGrid.tsx
- [x] T046 [P] [US2] **TDD**: Write failing tests for KudosSection — renders 'Phong trào ghi nhận' label, 'Sun* Kudos' title, 'ĐIỂM MỚI CỦA SAA 2025' badge, description text, KUDOS logo on right, 'Chi tiết' button with yellow background and arrow icon | src/__tests__/components/home/KudosSection.test.tsx
- [x] T047 [P] [US2] Implement KudosSection component — two-column layout (content left, KUDOS logo right), dark background with gold border accent, CTA button links to /sun-kudos. Responsive: stacks on mobile | src/components/home/KudosSection.tsx

**Checkpoint**: Content and awards sections render with database data, responsive grid works

---

## Phase 5: User Story 3 — Interactive Components (Priority: P2)

**Goal**: FAB with expanded menu, notification panel with infinity scroll, profile dropdown with role-based options
**Independent Test**: FAB opens/closes with correct options, notification bell shows badge and scrollable panel, profile menu shows role-appropriate options

### Floating Action Button (US3)

- [x] T048 [US3] **TDD**: Write failing tests for FloatingActionButton — closed state: renders oval button with pen + SAA icons, fixed bottom-right. Open state: renders 'Thể lệ' button (rocket icon + text), 'Viết KUDOS' button (pen icon + text), red X close button. Toggle behavior: click opens, X closes. Navigation: 'Thể lệ' → /tieu-chuan-chung, 'Viết KUDOS' → /write-kudos | src/__tests__/components/layout/FloatingActionButton.test.tsx
- [x] T049 [US3] Implement FloatingActionButton client component ("use client") — useState for isOpen toggle, fixed position bottom-right (z-50), closed: oval pill with icons, open: vertical stack of 2 option buttons + red circle X button below. Animation: CSS transition on opacity+transform | src/components/layout/FloatingActionButton.tsx
- [x] T050 [US3] Add FloatingActionButton to `src/app/(main)/layout.tsx` | src/app/(main)/layout.tsx

### Notification System (US3)

- [x] T051 [US3] **TDD**: Write failing tests for `useNotifications` hook — fetches initial 5 notifications, returns unreadCount, loadMore function for pagination, markAsRead function, handles fetch errors gracefully (returns empty array + error flag) | src/__tests__/hooks/useNotifications.test.ts
- [x] T052 [US3] Implement `useNotifications` hook — uses Supabase browser client for fetching notifications (ordered by created_at DESC, limit 5 per page), tracks page offset for infinity scroll, computes unread count, provides markAsRead mutation. Fallback: if realtime incompatible, use polling (30s interval) | src/hooks/useNotifications.ts
- [x] T053 [US3] **TDD**: Write failing tests for NotificationPanel — renders bell icon with red badge dot (when unread > 0), hides badge when unread = 0, click opens dropdown panel, panel shows max 5 items initially, scroll loads more (infinity scroll), 'Xem tất cả' link at bottom, empty state when no notifications, error state, keyboard accessible (Escape closes) | src/__tests__/components/layout/NotificationPanel.test.tsx
- [x] T054 [US3] Implement NotificationPanel client component ("use client") — bell button (40x40px) with conditional badge dot, dropdown panel with notification list, uses `useNotifications` hook, IntersectionObserver for infinity scroll trigger, 'Xem tất cả' link, outside click to close | src/components/layout/NotificationPanel.tsx

### Profile Dropdown (US3)

- [x] T055 [US3] **TDD**: Write failing tests for ProfileDropdown — renders user avatar icon (40x40px), click opens dropdown, shows 'Profile' option, shows 'Sign out' option, 'Admin Dashboard' visible only for admin role, click 'Sign out' calls supabase.auth.signOut, keyboard accessible (Escape closes), outside click closes | src/__tests__/components/layout/ProfileDropdown.test.tsx
- [x] T056 [US3] Implement ProfileDropdown client component ("use client") — user avatar button, dropdown with profile link, sign out action (calls supabase.auth.signOut + redirect to /login), conditional Admin Dashboard link (check user metadata for admin role) | src/components/layout/ProfileDropdown.tsx
- [x] T057 [US3] Wire NotificationPanel and ProfileDropdown into Header variant="full" — replace placeholder bell and profile buttons with actual components | src/components/layout/Header.tsx

**Checkpoint**: FAB, notifications, and profile dropdown all functional with keyboard accessibility

---

## Phase 6: Page Assembly & Polish

**Purpose**: Compose homepage, loading states, responsive verification, accessibility, E2E tests

- [x] T058 Implement homepage page.tsx — auth check (redirect if no user), fetch events + award_categories from Supabase server client, render all sections in order: HeroSection, ContentSection, AwardsSectionHeader + AwardsGrid, KudosSection. Use semantic HTML: `<main>`, `<section>` per block | src/app/(main)/page.tsx
- [x] T059 [P] Create loading skeleton for homepage — placeholder blocks matching hero, content, awards grid, kudos section shapes with pulse animation | src/app/(main)/loading.tsx
- [x] T060 [P] Verify responsive design at 320px, 768px, 1024px for ALL components — fix any layout breaks | all components
- [x] T061 [P] Add accessibility attributes — aria-labels on all interactive buttons (FAB, notification bell, profile, CTA buttons, award cards), aria-expanded on dropdowns, role="navigation" on Header/Footer nav, semantic heading hierarchy (h1 for ROOT FURTHER, h2 for section titles) | all components
- [ ] T062 Write Playwright E2E tests for homepage — page load with all sections, countdown timer displays, click award card navigates to /award-information#slug, FAB open/close, notification panel open/scroll, header/footer active state, responsive viewport tests (320px, 768px, 1024px) | src/e2e/homepage.spec.ts
- [x] T063 Run full test suite (unit + E2E) and fix any failures — `yarn test && yarn test:e2e` | all tests
- [x] T064 Run lint and build verification — `yarn lint && yarn build` | project root

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — can start immediately. All T001-T012 are parallel.
- **Phase 2 (Foundation)**: Depends on Phase 1 completion (migrations must be applied, types defined). **BLOCKS all user stories.**
- **Phase 3 (US1 Hero)**: Depends on Phase 2 completion (Header/Footer/NavLink ready, route groups active).
- **Phase 4 (US2 Content & Awards)**: Depends on Phase 2. **Can run in parallel with Phase 3** if team capacity allows.
- **Phase 5 (US3 Interactive)**: Depends on Phase 2. Can run in parallel with Phase 3 and 4.
- **Phase 6 (Polish)**: Depends on Phases 3, 4, 5 all complete.

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD per constitution)
- Hooks before components that use them
- Child components before parent containers
- Core implementation before integration

### Parallel Opportunities

**Phase 1**: All 12 asset/migration/type tasks (T001-T012) are fully parallel.

**Phase 2**: Sequential within steps (2a→2b→2c→2d), but tests within each step can be parallel with implementation.

**Phase 3-5 (User Stories)**: All three phases can run in parallel after Phase 2:
- **US1** (T028-T037): Hero section
- **US2** (T038-T047): Content & Awards
- **US3** (T048-T057): Interactive components

**Within US1**: T031, T032-T033, T034-T035 are parallel (different files). T036-T037 depend on T031/T033/T035.

**Within US2**: T038-T039, T040-T041, T046-T047 are parallel. T042-T043 sequential (TDD). T044-T045 depends on T043.

**Within US3**: T048-T049 (FAB), T051-T054 (Notifications), T055-T056 (Profile) are parallel tracks.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (US1: Hero Section)
3. **STOP and VALIDATE**: Homepage shows hero with countdown, event info, CTA buttons
4. Continue Phase 4 (US2: Content & Awards)
5. Continue Phase 5 (US3: Interactive)
6. Phase 6 (Polish + E2E)

### Incremental Delivery

1. Phase 1 + 2 → Route groups active, Header/Footer refactored
2. Phase 3 → Hero section live → Test → Commit
3. Phase 4 → Awards + Content sections → Test → Commit
4. Phase 5 → FAB + Notifications + Profile → Test → Commit
5. Phase 6 → Polish + E2E → Final test → Deploy

---

## Notes

- Commit after each completed phase or logical task group
- Run `yarn test` before moving to next phase
- Run existing login E2E tests after Phase 2 tasks T018 and T027 to verify backward compatibility
- TDD is NON-NEGOTIABLE per constitution — every component/hook must have a failing test first
- Mark tasks complete as you go: `[x]`
- Total tasks: **64**

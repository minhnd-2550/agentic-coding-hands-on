# Tasks: Sun* Kudos - Live Board

**Frame**: `2940:13431-Sun-Kudos-Live-board`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1-US8)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, download assets, prepare project structure

- [x] T001 Install new dependencies: `@visx/wordcloud`, `d3-zoom`, `zod` | package.json
- [x] T002 Download hero background image from Figma and place in public/images/ | public/images/kudos-hero-bg.png
- [x] T003 [P] Download KUDOS logo SVG from Figma (SVN-Gotham rendered as SVG, no font needed) | public/images/kudos-logo.svg
- [x] T004 [P] SVN-Gotham font not needed — KUDOS logo is an SVG asset from Figma | N/A
- [x] T005 [P] Create Icon Components for all kudos icons (HeartIcon, PenIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon, LinkIcon, ArrowRightIcon, PanZoomIcon, GiftIcon, PlayIcon, ChevronDownIcon, BellIcon) — icons MUST be React components, not raw SVGs per design-style.md | src/components/icons/KudosIcons.tsx

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Database tables, types, utilities, API routes, and Realtime helper — ALL user stories depend on these

**CRITICAL**: No user story work can begin until this phase is complete

### Database Migrations

- [x] T006 [P] Create profiles table migration (id, name, email, avatar_url, department_id FK, star_count default 0, badge nullable) + trigger on auth.users INSERT to auto-create profile + RLS (authenticated read all, update own) | supabase/migrations/20260321100005_create_profiles.sql
- [x] T007 [P] Create kudos table migration (id uuid PK, sender_id FK→profiles, receiver_id FK→profiles, content text max 2000, hashtags text[], images text[] max 5, media_type text, hearts_count int default 0, created_at timestamptz) + RLS (authenticated read all, insert own) | supabase/migrations/20260321100000_create_kudos.sql
- [x] T008 [P] Create hearts table migration (id uuid PK, user_id FK→profiles, kudos_id FK→kudos, created_at) + unique constraint (user_id, kudos_id) + RLS (authenticated read all, insert/delete own) | supabase/migrations/20260321100001_create_hearts.sql
- [x] T009 [P] Create hashtags table migration (id uuid PK, name text unique max 50) + RLS (authenticated read) + seed data | supabase/migrations/20260321100002_create_hashtags.sql
- [x] T010 [P] Create departments table migration (id uuid PK, name text unique) + RLS (authenticated read) + seed data | supabase/migrations/20260321100003_create_departments.sql
- [x] T011 [P] Create secret_boxes table migration (id uuid PK, user_id FK→profiles, is_opened boolean default false, gift_description text nullable, opened_at timestamptz nullable) + RLS (authenticated read own, update own) | supabase/migrations/20260321100004_create_secret_boxes.sql
- [x] T012 Create DB functions: get_highlights(hashtag_filter, department_filter) returns top 5 kudos by hearts_count; get_user_stats(user_id) returns kudos sent/received/hearts/secret box counts; get_spotlight_data() returns recipient names with kudos counts | supabase/migrations/20260321100006_create_kudos_functions.sql

### Types & Utilities (TDD)

- [x] T013 Define all TypeScript types: Kudos, KudosWithUser, Heart, Hashtag, Department, SecretBox, UserProfile, SpotlightEntry, KudosStats, KudosFeedPage | src/types/kudos.ts
- [x] T014 Write tests for utility functions (truncateText at 3/5 lines, formatTimestamp HH:mm - MM/DD/YYYY, buildKudosUrl) | src/__tests__/utils/kudos.test.ts
- [x] T015 Implement utility functions: truncateText(text, maxLines), formatTimestamp(date), buildKudosUrl(kudosId) | src/utils/kudos.ts

### Realtime Helper

- [x] T016 Write tests for useSupabaseRealtime hook (subscribe to table, receive INSERT/UPDATE/DELETE events, cleanup on unmount) | src/__tests__/hooks/useSupabaseRealtime.test.ts
- [x] T017 Implement useSupabaseRealtime hook — generic helper that subscribes to a Supabase Realtime channel for a given table and event type, calls callback on change, cleans up on unmount | src/hooks/useSupabaseRealtime.ts

### API Route Handlers

- [x] T018 [P] Implement GET /api/kudos — cursor-based pagination (cursor param = created_at of last item, limit=20), filter by ?hashtag=name and ?department=id. Returns KudosFeedPage { data: KudosWithUser[], nextCursor: string | null }. Auth required. Validate with Zod. | src/app/api/kudos/route.ts
- [x] T019 [P] Implement GET /api/kudos/highlights — calls get_highlights DB function with optional hashtag/department filters. Returns top 5 KudosWithUser[]. Auth required. | src/app/api/kudos/highlights/route.ts
- [x] T020 [P] Implement POST/DELETE /api/kudos/:id/heart — POST creates heart row + increments hearts_count, DELETE removes heart + decrements. Unique constraint prevents duplicates. Auth required. Returns { hearted: boolean, hearts_count: number }. | src/app/api/kudos/[id]/heart/route.ts
- [x] T021 [P] Implement GET /api/users/me/stats — calls get_user_stats DB function for current user. Returns KudosStats. Auth required. | src/app/api/users/me/stats/route.ts
- [x] T022 [P] Implement GET /api/users/search — search profiles by name (ilike). Query param: ?q=name. Returns UserProfile[]. Auth required. | src/app/api/users/search/route.ts
- [x] T023 [P] Implement GET /api/spotlight — calls get_spotlight_data DB function. Returns SpotlightEntry[] (name, kudos_count). Auth required. | src/app/api/spotlight/route.ts
- [x] T024 [P] Implement GET /api/hashtags — fetch all hashtags sorted by name. Returns Hashtag[]. Auth required. | src/app/api/hashtags/route.ts
- [x] T025 [P] Implement GET /api/departments — fetch all departments sorted by name. Returns Department[]. Auth required. | src/app/api/departments/route.ts
- [x] T026 [P] Implement GET /api/gifts/recent — fetch 10 most recent opened secret boxes with user profile. Returns (SecretBox & { user: UserProfile })[]. Auth required. | src/app/api/gifts/recent/route.ts
- [x] T027 [P] Implement POST /api/secret-box/open — marks a secret box as opened (is_opened=true, opened_at=now). Auth required. Returns SecretBox. | src/app/api/secret-box/open/route.ts

### Shared UI Components

- [x] T028 [P] Build SectionHeader component — displays subtitle (24px/700 #FFEA9E "Sun* Annual Awards 2025") + title (57px/700 #FFEA9E). Props: subtitle, title, children (optional slot for filters). Mobile-first responsive. | src/components/kudos/SectionHeader.tsx
- [x] T029 [P] Build KudoSkeleton component — skeleton loader matching KudoPostCard shape (sender row, content block, action bar). Pulsing animation on bg-[#00101A]. | src/components/kudos/KudoSkeleton.tsx
- [x] T030 [P] Build SectionError component — displays error message + retry button. Props: message, onRetry. Dark theme styling. aria-role="alert". | src/components/kudos/SectionError.tsx
- [x] T031 [P] Build EmptyState component — displays icon + message text. Props: message. Used for "Khong co ket qua", "No kudos yet", etc. | src/components/kudos/EmptyState.tsx

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — View Kudos Feed (Priority: P1) + US4 Heart + US7 Copy Link

**Goal**: Display the ALL KUDOS section with infinite-scroll feed of kudo cards. Users can heart kudos and copy links. This is the core MVP.

**Independent Test**: Load `/kudos` and verify kudo cards render with sender, receiver, content, media, hashtags, hearts, copy link. Scroll triggers infinite load. Heart toggles count. Copy link shows toast.

### Tests (TDD — write failing tests first)

- [x] T032 [P] [US1] Write tests for KudoPostCard (renders sender/receiver, truncated content at 5 lines, timestamps, hashtag tags, heart count, copy link button) | src/__tests__/components/kudos/KudoPostCard.test.tsx
- [x] T033 [P] [US1] Write tests for KudoCardMedia (renders max 5 images, video play overlay, hides when no media, video failure shows placeholder) | src/__tests__/components/kudos/KudoCardMedia.test.tsx
- [x] T034 [P] [US1] Write tests for KudoCardContent (truncates at 5 lines with "...", full text when short) | src/__tests__/components/kudos/KudoCardContent.test.tsx
- [x] T035 [P] [US4] Write tests for HeartButton (toggle red/gray, optimistic count update, debounce 300ms, self-hearting allowed, revert on API failure) | src/__tests__/components/kudos/HeartButton.test.tsx
- [x] T036 [P] [US7] Write tests for CopyLinkButton (copies URL to clipboard, shows success toast, shows error toast on clipboard failure) | src/__tests__/components/kudos/CopyLinkButton.test.tsx
- [x] T037 [P] [US1] Write tests for ProfilePreview (shows on hover with user info, 200ms transition, hides on mouse leave) | src/__tests__/components/kudos/ProfilePreview.test.tsx
- [x] T038 [P] [US1] Write tests for useInfiniteKudos (fetches first page, loads next on scroll, appends data, handles realtime INSERT, handles API error) | src/__tests__/hooks/useInfiniteKudos.test.ts
- [x] T039 [P] [US4] Write tests for useHeartToggle (optimistic update, debounce, revert on failure, POST/DELETE toggle) | src/__tests__/hooks/useHeartToggle.test.ts

### Implementation (US1 + US4 + US7)

- [x] T040 [P] [US1] Build KudoCardSender component — displays avatar (40px circle), name (14px/700 #2E3940), star count, badge. Arrow icon between sender→receiver. Click navigates to profile. Hover triggers ProfilePreview. | src/components/kudos/KudoCardSender.tsx
- [x] T041 [P] [US1] Build KudoCardContent component — displays kudo text content truncated at maxLines (default 5) with "..." overflow. Font: 20px/700 Montserrat #2E3940. Click navigates to detail page. | src/components/kudos/KudoCardContent.tsx
- [x] T042 [P] [US1] Build KudoCardMedia component — displays max 5 image/video thumbnails in horizontal row (gap: 8px, ~100px square, radius: 8px). Videos show PlayIcon overlay. Video load failure shows "Video khong the tai" placeholder. | src/components/kudos/KudoCardMedia.tsx
- [x] T043 [P] [US1] Build KudoCardHashtags component — displays hashtag tags (#Dedicated, #Inspiring...) max 5 per line with "..." overflow. Color: #F17676 on rgba(241,118,118,0.2) bg. Click hashtag filters feed. Also displays hashtag label (e.g., "IDOL GIOI TRE") above content. | src/components/kudos/KudoCardHashtags.tsx
- [x] T044 [P] [US4] Build HeartButton component — optimistic heart toggle with 300ms debounce. Heart icon 20px: #999 inactive, #D4271D active. Count text 16px/700 #999. Scale animation 150ms on click. aria-label announces "Liked"/"Not liked". | src/components/kudos/HeartButton.tsx
- [x] T045 [P] [US7] Build CopyLinkButton component — copies buildKudosUrl(id) to clipboard. Shows "Link copied - ready to share!" toast via useToast. Shows error toast on failure. Text: 14px/500 #999 + LinkIcon. | src/components/kudos/CopyLinkButton.tsx
- [x] T046 [P] [US1] Build KudoCardActions component — flex row with HeartButton (left) and CopyLinkButton (right). justify-between. | src/components/kudos/KudoCardActions.tsx
- [x] T047 [P] [US1] Build ProfilePreview component — hover popup with avatar, name, department, star_count, badge. 200ms ease-out opacity+transform transition. Positioned above/below avatar. | src/components/kudos/ProfilePreview.tsx
- [x] T048 [US4] Implement useHeartToggle hook — manages optimistic liked state per kudos ID. Debounces API call (300ms). POST /api/kudos/:id/heart or DELETE. Reverts on failure with error toast. | src/hooks/useHeartToggle.ts
- [x] T049 [US1] Implement useInfiniteKudos hook — cursor-based pagination via IntersectionObserver. Fetches GET /api/kudos with cursor+limit. Supports hashtag/department filter params. Subscribes to Supabase Realtime `kudos` INSERT to prepend new kudos. Returns { kudos[], isLoading, error, loadMore, sentinelRef }. | src/hooks/useInfiniteKudos.ts
- [x] T050 [US1] Build KudoPostCard component — assembles KudoCardSender, KudoCardContent, KudoCardMedia, KudoCardHashtags, KudoCardActions. Card: bg-[#FFF8E1] rounded-3xl p-10 gap-4 flex flex-col. Hover: translateY(-2px). Timestamp "10:00 - 10/30/2025" format. Responsive: w-full on mobile, w-[680px] on desktop. | src/components/kudos/KudoPostCard.tsx
- [x] T051 [US1] Build AllKudos component — section container with SectionHeader ("Sun* Annual Awards 2025" / "ALL KUDOS") + two-column layout on desktop (feed 680px + sidebar 422px, gap: 40px). Renders kudo cards via useInfiniteKudos. Shows KudoSkeleton while loading, SectionError on failure. IntersectionObserver sentinel at bottom for infinite scroll. aria-live="polite" for realtime updates. Responsive: single column on mobile/tablet. | src/components/kudos/AllKudos.tsx

**Checkpoint**: US1 + US4 + US7 complete — kudo feed with hearts and copy link working

---

## Phase 4: User Story 2 — Highlight Kudos Carousel (Priority: P1)

**Goal**: Display top 5 most-hearted kudos in a carousel with hashtag/department filters

**Independent Test**: Load page and verify HIGHLIGHT KUDOS section shows carousel with 5 cards, navigation arrows, pagination "2/5", filter dropdowns work.

### Tests (TDD)

- [x] T052 [P] [US2] Write tests for HighlightCarousel (renders 5 cards, arrow navigation, disabled at boundaries, pagination updates, CSS transition) | src/__tests__/components/kudos/HighlightCarousel.test.tsx
- [x] T053 [P] [US2] Write tests for FilterDropdown (opens/closes, selects value, triggers onFilter callback, displays selected label) | src/__tests__/components/kudos/FilterDropdown.test.tsx

### Implementation (US2)

- [x] T054 [P] [US2] Build KudoHighlightCard component — reuses KudoCardSender, KudoCardContent (maxLines=3), KudoCardHashtags, KudoCardActions. Card: w-[528px] bg-[#FFF8E1] border-4 border-[#FFEA9E] rounded-2xl p-6 gap-4. Includes "Xem chi tiet" link. Side cards: opacity-0.7, scale-0.9, border 1px #998C5F. Responsive: w-full on mobile. | src/components/kudos/KudoHighlightCard.tsx
- [x] T055 [P] [US2] Build CarouselArrow component — circular button (48x48, rounded-full, bg-black/50). ChevronLeft/Right icon. Props: direction, disabled, onClick. Disabled: opacity-0.3, pointer-events-none. Hover: bg-black/70. | src/components/kudos/CarouselArrow.tsx
- [x] T056 [P] [US2] Build CarouselPagination component — displays "2/5" with left/right arrow buttons. Gap: 32px, centered. Font: 32px/700 Montserrat. | src/components/kudos/CarouselPagination.tsx
- [x] T057 [P] [US2] Build FilterDropdown component — bordered button (1px solid #998C5F, radius 4px, p-4). Shows label + ChevronDownIcon. Click opens dropdown list. Select triggers onFilter(value). Props: label, options[], onFilter. Hover: border-color #FFEA9E. Open: bg rgba(255,234,158,0.1). | src/components/kudos/FilterDropdown.tsx
- [x] T058 [US2] Implement useHighlightKudos hook — fetches GET /api/kudos/highlights with optional hashtag/department filter params. Subscribes to Supabase Realtime `hearts` changes to refresh ranking. Returns { highlights[], isLoading, error, setFilters }. | src/hooks/useHighlightKudos.ts
- [x] T059 [US2] Build HighlightCarousel component — CSS translateX transition (300ms ease-in-out). Current slide index state. Left/right fade gradients (linear-gradient from #00101A). Arrow navigation (disabled at index 0 / max). Keyboard: arrow keys navigate when focused. Handles < 5 items (dynamic pagination). | src/components/kudos/HighlightCarousel.tsx
- [x] T060 [US2] Build HighlightKudos component — section container with SectionHeader + filter row (Hashtag + Phong ban dropdowns). Fetches hashtags (GET /api/hashtags) and departments (GET /api/departments) for filter options. Renders HighlightCarousel. EmptyState when 0 highlights or filter returns no results ("Khong co ket qua"). | src/components/kudos/HighlightKudos.tsx

**Checkpoint**: US2 complete — highlight carousel with filters working

---

## Phase 5: User Story 3 — Send a Kudos / Hero Section (Priority: P1)

**Goal**: Display hero banner with "Ghi nhan" input bar and profile search. Click input opens kudos creation dialog (dialog out of scope).

**Independent Test**: Load page, verify hero banner with background, title, KUDOS logo, input bar. Click input bar triggers navigation/dialog open.

### Tests (TDD)

- [x] T061 [P] [US3] Write tests for KudosHero (renders title, KUDOS logo, background image, gradient overlay, input bar, search bar) | src/__tests__/components/kudos/KudosHero.test.tsx

### Implementation (US3)

- [x] T062 [P] [US3] Build KudosInputBar component — pill-shaped (738x72, radius 68px, border 1px #998C5F, bg rgba(255,234,158,0.1)). PenIcon left, placeholder "Hom nay, ban muon gui loi cam on va ghi nhan den ai?" (16px/500 #999). SearchIcon + "Tim kiem profile Sunner" on right side. Click left: opens kudos dialog. Click right: opens profile search. Hover: bg opacity 0.2, border #FFEA9E. Responsive: w-full h-14 on mobile. | src/components/kudos/KudosInputBar.tsx
- [x] T063 [US3] Build KudosHero component — relative container (h-[512px]). Background image (full-bleed). Gradient overlay (linear-gradient 25deg from #00101A). Title "He thong ghi nhan va cam on" (36px/700 Montserrat #FFF). KUDOS logo (SVN-Gotham ~140px #FFEA9E or Montserrat bold fallback). KudosInputBar below. Content at px-36. Responsive: h-auto, title 24px, logo 60px on mobile. | src/components/kudos/KudosHero.tsx

**Checkpoint**: US3 complete — hero section with input bar

---

## Phase 6: User Story 5 — Personal Statistics + US8 Recent Gifts (Priority: P2/P3)

**Goal**: Display sidebar with personal stats and 10 recent gift recipients

**Independent Test**: Verify sidebar shows 5 stat rows with correct numbers, "Mo Secret Box" button, and 10 Sunner gift list. Stats update in real-time.

### Tests (TDD)

- [x] T064 [P] [US5] Write tests for KudosStatsCard (renders 5 stat rows with labels/values, divider, Mo Secret Box button, disabled when 0 boxes) | src/__tests__/components/kudos/KudosStatsCard.test.tsx
- [x] T065 [P] [US5] Write tests for OpenGiftButton (click callback, disabled state with opacity 0.5) | src/__tests__/components/kudos/OpenGiftButton.test.tsx
- [x] T066 [P] [US8] Write tests for RecentGiftsList (renders 10 items with avatar/name/description, click navigates to profile, realtime update) | src/__tests__/components/kudos/RecentGiftsList.test.tsx

### Implementation (US5 + US8)

- [x] T067 [P] [US5] Build OpenGiftButton component — full-width, h-60px, bg-[#FFEA9E], rounded-lg, centered text + GiftIcon. "Mo Secret Box" label. Hover: bg-[#FFE082]. Active: bg-[#FFD54F]. Disabled: opacity-0.5, cursor-not-allowed. Click navigates to Secret Box screen. | src/components/kudos/OpenGiftButton.tsx
- [x] T068 [P] [US8] Build GiftListItem component — flex row with avatar (circle, small), name (bold), gift description (muted). Click navigates to profile. | src/components/kudos/GiftListItem.tsx
- [x] T069 [US5] Implement useKudosStats hook — fetches GET /api/users/me/stats. Subscribes to Realtime on `kudos`, `hearts`, `secret_box` tables for current user changes. Returns { stats: KudosStats, isLoading, error }. | src/hooks/useKudosStats.ts
- [x] T070 [US8] Implement useRecentGifts hook — fetches GET /api/gifts/recent. Subscribes to Realtime on `secret_box` UPDATE (is_opened=true). Returns { gifts[], isLoading, error }. | src/hooks/useRecentGifts.ts
- [x] T071 [US5] Build KudosStatsCard component — bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6. Renders stat rows: "So Kudos ban nhan duoc" / "So Kudos ban da gui" / "So tim ban nhan duoc" (with HeartIcon) / divider / "So Secret Box ban da mo" / "So Secret Box chua mo". Labels: 22px/700 #FFF. Values: 22px/700 #FFEA9E. OpenGiftButton at bottom. Disabled when unopened_count === 0. | src/components/kudos/KudosStatsCard.tsx
- [x] T072 [US8] Build RecentGiftsList component — bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6. Title "10 SUNNER NHAN QUA MOI NHAT". Renders up to 10 GiftListItems. Uses useRecentGifts hook. | src/components/kudos/RecentGiftsList.tsx

**Checkpoint**: US5 + US8 complete — sidebar with stats and gifts

---

## Phase 7: User Story 6 — Spotlight Board (Priority: P2)

**Goal**: Display interactive word-cloud of kudos recipients with pan/zoom and search

**Independent Test**: Verify Spotlight section shows total count ("388 KUDOS"), word cloud with names, search highlights a name, pan/zoom toggle works.

### Tests (TDD)

- [x] T073 [P] [US6] Write tests for SpotlightWordCloud (renders word cloud with names, search highlights matching name, pan/zoom toggle, empty state) | src/__tests__/components/kudos/SpotlightWordCloud.test.tsx

### Implementation (US6)

- [x] T074 [US6] Implement useSpotlightData hook — fetches GET /api/spotlight. Subscribes to Realtime on `kudos` INSERT to update counts. Returns { data: SpotlightEntry[], totalKudos: number, isLoading, error }. | src/hooks/useSpotlightData.ts
- [x] T075 [US6] Build SpotlightWordCloud component — uses @visx/wordcloud for layout + d3-zoom for pan/zoom. SVG rendering. Names sized 6-12px based on kudos_count (Montserrat, variable weight/color: #FFEA9E large / #DBD1C1 medium / #999 small). Search input filters/highlights matching name. PanZoomIcon toggles pan vs zoom mode. Renders inside 1157x548 container with border-[#998C5F] rounded-[47px]. | src/components/kudos/SpotlightWordCloud.tsx
- [x] T076 [US6] Build SpotlightBoard component — section container with SectionHeader ("Sun* Annual Awards 2025" / "SPOTLIGHT BOARD"). Total count "388 KUDOS" (32px/700 #FFF) + search bar + pan/zoom control in header bar. Renders SpotlightWordCloud. EmptyState when no data. Responsive: full-width, h-[300px] on mobile, h-[400px] tablet, h-[548px] desktop. | src/components/kudos/SpotlightBoard.tsx

**Checkpoint**: US6 complete — Spotlight board with word cloud

---

## Phase 8: Page Assembly & i18n

**Purpose**: Wire all sections into the /kudos page, add translations

- [x] T077 Create Kudos Live Board page — Server Component shell that fetches initial data (highlights, spotlight, first feed page, stats, gifts, hashtags, departments) via Supabase server client. Passes data as props to client section components. Composes: KudosHero → HighlightKudos → SpotlightBoard → AllKudos (with sidebar: KudosStatsCard + RecentGiftsList) → Footer. Page bg-[#00101A]. Content wrapper with gap-[120px] sections, px-36 on desktop. | src/app/(main)/kudos/page.tsx
- [x] T078 [P] Create loading.tsx — full-page skeleton: hero placeholder (h-[512px] bg-gradient), 3x SectionHeader skeletons, 3x KudoSkeleton cards, sidebar skeleton | src/app/(main)/kudos/loading.tsx
- [x] T079 [P] Add kudos.* i18n translation keys to Vietnamese translations (section titles, stat labels, button labels, error messages, empty states, toast messages) | src/libs/i18n/translations/vn.json
- [x] T080 [P] Add kudos.* i18n translation keys to English translations | src/libs/i18n/translations/en.json
- [x] T081 [P] Add kudos.* i18n translation keys to Japanese translations | src/libs/i18n/translations/jp.json
- [x] T082 [P] Add new TranslationKey entries for all kudos.* keys | src/libs/i18n/types.ts

**Checkpoint**: Full page assembled and navigable at /kudos

---

## Phase 9: Accessibility & Responsive Verification

**Purpose**: WCAG AA compliance and responsive design across all breakpoints

- [x] T083 Add skip link ("Skip to main content") to kudos page layout | src/app/(main)/kudos/page.tsx
- [x] T084 [P] Add aria-label to all kudo cards ("Kudos from [sender] to [receiver]"), heart button ("Liked"/"Not liked"), carousel controls ("Previous slide"/"Next slide"), filter dropdowns | src/components/kudos/*.tsx
- [x] T085 [P] Add aria-live="polite" region wrapping the kudos feed for screen reader real-time announcements | src/components/kudos/AllKudos.tsx
- [x] T086 [P] Implement keyboard navigation: Tab through all interactive elements, arrow keys for carousel navigation when focused, Escape closes dropdowns | src/components/kudos/HighlightCarousel.tsx, FilterDropdown.tsx
- [x] T087 [P] Add visible focus indicators (2px solid #FFEA9E outline, outline-offset: 2px) to all focusable elements across kudos components | src/components/kudos/*.tsx
- [x] T088 Verify responsive design at 320px, 768px, 1024px, 1440px — fix layout issues: hero height/title size, carousel single-card on mobile, feed single-column on mobile/tablet, sidebar below feed, footer column layout | src/components/kudos/*.tsx

**Checkpoint**: Accessible and responsive at all breakpoints

---

## Phase 10: Performance & Final QA

**Purpose**: Performance optimization, full test suite, production readiness

- [x] T089 Lazy-load SpotlightBoard with React.lazy + Suspense (pulsing placeholder fallback) | src/app/(main)/kudos/page.tsx
- [x] T090 [P] Add lazy-loading to images/videos in KudoCardMedia (loading="lazy" for images, preload="none" for videos) | src/components/kudos/KudoCardMedia.tsx
- [x] T091 [P] Verify page load < 3 seconds via Lighthouse audit. Optimize if needed: reduce initial data payload, defer non-critical sections | src/app/(main)/kudos/page.tsx
- [x] T092 Run full test suite: `yarn test` — all unit + integration tests must pass | (all test files)
- [x] T093 [P] Run lint: `yarn lint` — zero errors | (all source files)
- [x] T094 [P] Run build: `yarn build` — zero TypeScript errors, successful production build | (all source files)
- [x] T095 E2E smoke test: load /kudos → scroll feed → heart a kudo → copy link → filter highlights → navigate carousel → verify spotlight renders | src/e2e/kudos-live-board.spec.ts

**Checkpoint**: All tests pass, production-ready build, E2E verified

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────► Phase 2 (Foundation) ─────────► Phase 3-7 (User Stories)
                                                              │
                              ┌───────────────────────────────┤
                              │                               │
                         Phase 3 (US1+4+7)              Phase 5 (US3)
                         Core Feed + Heart              Hero Section
                              │                               │
                              ├──► Phase 4 (US2)              │
                              │    Highlight Carousel         │
                              │                               │
                              ├──► Phase 6 (US5+8)            │
                              │    Sidebar Stats + Gifts      │
                              │                               │
                              └──► Phase 7 (US6)              │
                                   Spotlight Board            │
                                                              │
                              ┌───────────────────────────────┘
                              │
                         Phase 8 (Assembly) ──► Phase 9 (A11y) ──► Phase 10 (QA)
```

### Within Each User Story

1. Tests MUST be written and FAIL before implementation (TDD — constitution mandate)
2. Hooks before components that use them
3. Sub-components before parent components
4. Section containers last (they assemble sub-components)

### Parallel Opportunities

- **Phase 1**: T002-T005 all parallel (assets + fonts + icons)
- **Phase 2**: T006-T011 all parallel (migrations), T018-T027 all parallel (API routes), T028-T031 all parallel (shared UI)
- **Phase 3**: T032-T039 all parallel (tests), T040-T047 all parallel (sub-components)
- **Phase 4-7**: Can run in parallel after Phase 3 (all depend on Phase 2+3 but not on each other)
- **Phase 8**: T078-T082 parallel (loading + i18n)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1 + US4 + US7 — core feed)
3. **STOP and VALIDATE**: Test independently — feed renders, hearts work, links copy
4. Deploy MVP if ready

### Incremental Delivery

1. Setup + Foundation → Core Feed (Phase 1-3) → **Deploy MVP**
2. Add Highlight Carousel (Phase 4) → Test → **Deploy**
3. Add Hero Section (Phase 5) → Test → **Deploy**
4. Add Sidebar (Phase 6) → Test → **Deploy**
5. Add Spotlight (Phase 7) → Test → **Deploy**
6. Assembly + Polish (Phase 8-10) → **Final Deploy**

---

## Notes

- Constitution mandates TDD: every implementation task has a corresponding test task that MUST run and FAIL first
- Commit after each logical task group (e.g., "feat: add kudo post card with sub-components")
- Existing Toast + useToast hook reused for copy link and error notifications — no new toast component needed
- Header and Footer are reused from existing (main) layout — no modifications
- Kudos creation dialog and Secret Box dialog are OUT OF SCOPE — input bar and button just trigger navigation
- Run `supabase db reset` after migration changes to apply locally

# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `2940:13431-Sun-Kudos-Live-board`
**Date**: 2026-03-21
**Spec**: `specs/2940:13431-Sun-Kudos-Live-board/spec.md`

---

## Summary

Build the **Sun* Kudos - Live Board** page (`/kudos`) — the main real-time kudos feed for the SAA 2025 event. The page displays a hero banner with kudos input, a highlighted kudos carousel (top 5), a Spotlight word-cloud board, an infinite-scroll kudos feed with sidebar stats, and real-time updates via Supabase Realtime. Dark theme with gold accents (#00101A background, #FFEA9E gold).

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, React 19)
**Primary Dependencies**: React 19, Tailwind CSS 4, @supabase/ssr, @visx/wordcloud, d3-zoom
**Database**: PostgreSQL (Supabase) — new tables: kudos, hearts, hashtags, departments, secret_boxes
**Testing**: Vitest (unit/integration) + Playwright (E2E) — TDD mandatory per constitution
**State Management**: React useState/useReducer (local), Supabase Realtime subscriptions (server)
**API Style**: Next.js API Routes (REST) + Supabase client direct queries

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. Clean Code** — Single responsibility per file, co-located components under `components/kudos/`
- [x] **II. Test-First (TDD)** — All phases start with failing tests before implementation
- [x] **III. Responsive-First** — Mobile-first Tailwind with `sm:`, `md:`, `lg:` breakpoints (320px → 768px → 1024px → 1440px)
- [x] **IV. Secure by Default** — Auth via Supabase SSR middleware, RLS on all tables, no raw queries, input validation with Zod
- [x] **V. Simplicity** — No unnecessary abstractions; prefer co-location; YAGNI

**Violations (justified):**

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| New dependency: `@visx/wordcloud` (~15KB gz) | Spotlight Board requires word-cloud layout algorithm; no existing solution in project | Custom Canvas implementation — higher dev cost, harder to maintain |
| New dependency: `d3-zoom` (~5KB gz) | Spotlight requires pan/zoom; battle-tested, tiny bundle | `use-gesture` — larger (~10KB), less SVG integration |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/components/kudos/`. Shared sub-components (SectionHeader, UserInfoRow) co-located alongside feature components. Reuse existing `Header`, `Footer`, `Toast`, `LanguageSelector`.
- **Styling Strategy**: Tailwind CSS 4 utility classes. Design tokens from `design-style.md` mapped to Tailwind arbitrary values (`bg-[#00101A]`, `text-[#FFEA9E]`). No CSS variables or CSS-in-JS.
- **Data Fetching**: Server Components for initial page load (SSR). Client Components for interactive sections (carousel, feed, sidebar) with Supabase browser client. Supabase Realtime for live updates.
- **Infinite Scroll**: `IntersectionObserver` via custom `useInfiniteKudos` hook with cursor-based pagination.
- **Carousel**: Custom implementation with CSS `transform: translateX()` transitions. No carousel library needed (only 5 items).

### Backend Approach

- **API Design**: Next.js Route Handlers under `src/app/api/kudos/`. Supabase client for data access (no raw SQL).
- **Data Access**: Supabase client with RLS policies. Server-side queries via `createServerClient`.
- **Validation**: Zod schemas for API input validation (pagination cursors, filter params, heart toggle).
- **Realtime**: Supabase Realtime channels subscribed client-side for `kudos`, `hearts`, `secret_boxes` tables.

### Integration Points

- **Existing Services**: Supabase Auth (session management via existing middleware), i18n (existing I18nProvider + translation keys)
- **Shared Components**: `Header` (variant="full"), `Footer` (variant="full"), `Toast`/`useToast`, `FloatingActionButton`, `ProfileDropdown`
- **Navigation**: Existing `(main)` layout group — add `/kudos` route alongside existing `/` and `/award-information`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2940:13431-Sun-Kudos-Live-board/
├── spec.md              # Feature specification (FINAL)
├── design-style.md      # Design specifications
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/(main)/kudos/
│   ├── page.tsx                    # Kudos Live Board page (Server Component shell)
│   └── loading.tsx                 # Page-level loading skeleton
├── app/api/kudos/
│   ├── route.ts                    # GET /api/kudos (paginated feed, filters)
│   ├── highlights/route.ts         # GET /api/kudos/highlights (top 5)
│   └── [id]/heart/route.ts         # POST/DELETE /api/kudos/:id/heart
├── app/api/users/
│   ├── me/stats/route.ts           # GET /api/users/me/stats
│   └── search/route.ts             # GET /api/users/search
├── app/api/spotlight/route.ts      # GET /api/spotlight
├── app/api/hashtags/route.ts       # GET /api/hashtags
├── app/api/departments/route.ts    # GET /api/departments
├── app/api/gifts/recent/route.ts   # GET /api/gifts/recent
├── app/api/secret-box/open/route.ts # POST /api/secret-box/open (trigger open — dialog UI out of scope)
├── components/kudos/
│   ├── KudosHero.tsx               # Hero banner with background + input bar
│   ├── KudosInputBar.tsx           # Pill-shaped "Ghi nhan" input trigger
│   ├── SectionHeader.tsx           # Reusable section header (subtitle + title)
│   ├── HighlightKudos.tsx          # Highlight section container
│   ├── HighlightCarousel.tsx       # Carousel logic + navigation
│   ├── KudoHighlightCard.tsx       # Individual highlight card
│   ├── CarouselArrow.tsx           # Carousel navigation arrow button
│   ├── CarouselPagination.tsx      # Page indicator (e.g., "2/5")
│   ├── FilterDropdown.tsx          # Hashtag/Department dropdown filter
│   ├── SpotlightBoard.tsx          # Spotlight section container
│   ├── SpotlightWordCloud.tsx      # @visx/wordcloud + d3-zoom implementation
│   ├── AllKudos.tsx                # All Kudos section container
│   ├── KudoPostCard.tsx            # Individual kudo card in feed
│   ├── KudoCardSender.tsx          # Sender/receiver info row
│   ├── KudoCardContent.tsx         # Truncated content block
│   ├── KudoCardMedia.tsx           # Image/video gallery (max 5)
│   ├── KudoCardHashtags.tsx        # Hashtag tags display
│   ├── KudoCardActions.tsx         # Heart button + Copy Link
│   ├── HeartButton.tsx             # Optimistic heart toggle
│   ├── CopyLinkButton.tsx          # Copy to clipboard + toast
│   ├── KudosStatsCard.tsx          # Personal statistics sidebar card
│   ├── OpenGiftButton.tsx          # "Mo Secret Box" button
│   ├── RecentGiftsList.tsx         # 10 Sunner gift recipients list
│   ├── GiftListItem.tsx            # Single gift recipient row
│   ├── ProfilePreview.tsx          # Hover popup showing user profile preview
│   ├── KudoSkeleton.tsx            # Skeleton loader for kudo card
│   ├── SectionError.tsx            # Retry-able error state per section
│   └── EmptyState.tsx              # Reusable empty/no-results state message
├── hooks/
│   ├── useInfiniteKudos.ts         # Cursor-based infinite scroll + realtime
│   ├── useHighlightKudos.ts        # Top 5 kudos with filter support
│   ├── useKudosStats.ts            # Personal stats with realtime
│   ├── useSpotlightData.ts         # Word-cloud data with realtime
│   ├── useRecentGifts.ts           # Recent gifts with realtime
│   ├── useHeartToggle.ts           # Optimistic heart with debounce
│   └── useSupabaseRealtime.ts      # Generic realtime subscription helper
├── components/icons/
│   └── KudosIcons.tsx              # Icon components: HeartIcon, PenIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon, LinkIcon, ArrowRightIcon, PanZoomIcon, GiftIcon, PlayIcon, ChevronDownIcon, BellIcon (per design-style.md — icons MUST be Icon Components, not raw SVGs)
├── types/
│   └── kudos.ts                    # Kudos, Heart, Hashtag, Department, SecretBox, SpotlightEntry, UserProfile types
└── utils/
    └── kudos.ts                    # Pure utility functions (truncateText, formatTimestamp, buildKudosUrl)

# Database Migrations
supabase/migrations/
├── 20260321100000_create_kudos.sql           # kudos table + RLS
├── 20260321100001_create_hearts.sql          # hearts table + unique constraint + RLS
├── 20260321100002_create_hashtags.sql        # hashtags table + RLS
├── 20260321100003_create_departments.sql     # departments table + RLS
├── 20260321100004_create_secret_boxes.sql    # secret_boxes table + RLS
├── 20260321100005_create_profiles.sql        # profiles table (star_count, badge, department_id, avatar_url) + trigger on auth.users insert + RLS
└── 20260321100006_create_kudos_functions.sql  # DB functions (get_highlights, get_user_stats, get_spotlight_data)

# Tests
src/__tests__/
├── components/kudos/
│   ├── KudoPostCard.test.tsx
│   ├── KudoCardMedia.test.tsx
│   ├── KudoCardContent.test.tsx
│   ├── HighlightCarousel.test.tsx
│   ├── HeartButton.test.tsx
│   ├── CopyLinkButton.test.tsx
│   ├── KudosStatsCard.test.tsx
│   ├── OpenGiftButton.test.tsx
│   ├── RecentGiftsList.test.tsx
│   ├── FilterDropdown.test.tsx
│   ├── SpotlightWordCloud.test.tsx
│   ├── ProfilePreview.test.tsx
│   ├── SectionError.test.tsx
│   └── KudosHero.test.tsx
├── hooks/
│   ├── useInfiniteKudos.test.ts
│   ├── useHeartToggle.test.ts
│   └── useSupabaseRealtime.test.ts
└── utils/
    └── kudos.test.ts

# i18n Updates
src/libs/i18n/translations/
├── vn.json  # Add kudos.* keys
├── en.json  # Add kudos.* keys
└── jp.json  # Add kudos.* keys
```

### Modified Files

| File | Changes |
|------|---------|
| `src/libs/i18n/translations/vn.json` | Add `kudos.*` translation keys |
| `src/libs/i18n/translations/en.json` | Add `kudos.*` translation keys |
| `src/libs/i18n/translations/jp.json` | Add `kudos.*` translation keys |
| `src/libs/i18n/types.ts` | Add new TranslationKey entries |
| `package.json` | Add `@visx/wordcloud`, `d3-zoom`, `zod` dependencies |
| `src/app/layout.tsx` | Add SVN-Gotham font loading (local font file from `public/fonts/`) |

### Dependencies

| Package | Version | Purpose | Size (gz) |
|---------|---------|---------|-----------|
| `@visx/wordcloud` | ^3.x | Spotlight word-cloud layout engine | ~15-20KB |
| `d3-zoom` | ^3.x | Pan/zoom for Spotlight board | ~5KB |
| `zod` | ^3.x | API input validation schemas | ~14KB |

---

## Implementation Strategy

### Phase 0: Asset Preparation & Database Foundation
- Download hero background, KUDOS logo (SVN-Gotham font), and UI icons from Figma
- Create Icon Components (`components/icons/KudosIcons.tsx`) for all 12+ icons from design-style.md
- Create all database migrations (profiles, kudos, hearts, hashtags, departments, secret_boxes)
- Seed hashtags and departments tables
- Create Supabase RLS policies for all new tables
- Create DB functions for complex queries (get_highlights, get_user_stats, get_spotlight_data)
- Create `profiles` table with trigger on `auth.users` insert (auto-create profile on signup)

### Phase 1: Foundation — Types, Utilities, Hooks (TDD)
- Define all TypeScript types (`types/kudos.ts`)
- Implement pure utilities (`utils/kudos.ts`: truncateText, formatTimestamp, buildKudosUrl)
- Create Supabase Realtime helper hook (`useSupabaseRealtime`)
- Create API route handlers (all 8 endpoints)
- Write tests first for all utilities and API routes

### Phase 2: Core Feed — US1 (P1) + US4 (P2) + US7 (P3)
- Build `KudoPostCard` with all sub-components (sender, content, media, hashtags, actions)
- Build `KudoCardMedia` with video play button overlay + video load failure placeholder ("Video khong the tai")
- Build `ProfilePreview` popup (shown on avatar/name hover, 200ms ease-out transition)
- Build `HeartButton` with optimistic toggle + 300ms debounce (spec edge case)
- Build `CopyLinkButton` + toast integration (US7)
- Build `AllKudos` section with `useInfiniteKudos` (infinite scroll)
- Build `SectionHeader` (reusable) + `EmptyState` (reusable no-results message)
- Build `KudoSkeleton` and `SectionError` (retry-able per section)
- Wire up Supabase Realtime for new kudos in feed
- Handle hashtag click-to-filter (FR-016)
- Responsive: mobile-first, single column

### Phase 3: Highlight Carousel — US2 (P1)
- Build `KudoHighlightCard` (shared sub-components with feed card)
- Build `HighlightCarousel` with CSS transitions
- Build `CarouselArrow` and `CarouselPagination`
- Build `FilterDropdown` for hashtag/department
- Build `useHighlightKudos` hook with filter support
- Build fade gradients on carousel edges
- Handle empty states: 0 highlights shows EmptyState, filters with no results show "Khong co ket qua"
- Handle < 5 highlights: carousel pagination adjusts dynamically (e.g., "1/3")
- Responsive: single card on mobile, full carousel on desktop

### Phase 4: Hero Section — US3 (P1)
- Build `KudosHero` with background image + gradient overlay
- Build `KudosInputBar` (click triggers dialog — dialog itself is out of scope)
- Load SVN-Gotham font for "KUDOS" logo text
- Responsive hero layout

### Phase 5: Sidebar — US5 (P2) + US8 (P3)
- Build `KudosStatsCard` with stat rows + divider
- Build `OpenGiftButton` (click navigates to Secret Box screen — dialog out of scope). Handle disabled state when 0 Secret Boxes (opacity: 0.5, cursor: not-allowed per spec edge case)
- Build `RecentGiftsList` + `GiftListItem`
- Build `useKudosStats` and `useRecentGifts` hooks with Realtime
- Create `/api/secret-box/open` route handler
- Responsive: below feed on mobile/tablet, right column on desktop

### Phase 6: Spotlight Board — US6 (P2)
- Install `@visx/wordcloud` + `d3-zoom`
- Build `SpotlightBoard` section container
- Build `SpotlightWordCloud` with word-cloud rendering
- Implement pan/zoom with d3-zoom
- Implement search/highlight via React state
- Build `useSpotlightData` hook with Realtime
- Responsive: full-width with reduced height on mobile

### Phase 7: Page Assembly & i18n
- Create `/kudos/page.tsx` (Server Component shell: fetch initial data SSR, import client sections)
- Create `/kudos/loading.tsx` (full-page skeleton with hero + section placeholders)
- Compose all sections in page order: Header → Hero → Highlights → Spotlight → AllKudos+Sidebar → Footer
- Add i18n translation keys for all user-facing text in `vn.json`, `en.json`, `jp.json`
- Update `types.ts` with new TranslationKey entries

### Phase 8: Accessibility & Responsive Verification
- Add skip link ("Skip to main content") in page layout
- Add `aria-label` to all kudo cards (sender→receiver), heart button state, carousel controls
- Add `aria-live="polite"` region for real-time kudos updates
- Keyboard navigation: Tab through all interactive elements, arrow keys for carousel
- Focus indicators: gold outline on all focusable elements (2px solid #FFEA9E)
- Responsive verification at 320px, 768px, 1024px, 1440px — fix any breakpoint issues

### Phase 9: Performance & Final QA
- Lazy-load Spotlight Board (`React.lazy` + Suspense) and image/video thumbnails
- Verify page load < 3s on standard connection (Lighthouse audit)
- Run full test suite (`yarn test`), lint (`yarn lint`), build (`yarn build`)
- E2E smoke test: load page → scroll feed → heart → copy link → filter highlights → carousel navigate

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| @visx/wordcloud incompatible with Cloudflare Workers | Low | High | Fallback to custom Canvas implementation (~10-15KB). Test edge compatibility early in Phase 6. |
| Supabase Realtime performance with many concurrent subscriptions (5 channels) | Medium | Medium | Use a single channel with multiplexed table listeners. Monitor connection count. |
| SVN-Gotham font not available as web font | Medium | Low | Use Montserrat bold as fallback for "KUDOS" logo. Download and self-host the font if license permits. |
| Large feed causing slow infinite scroll | Low | Medium | Cursor-based pagination with 20 items/page. Virtualization with `react-window` if > 200 items loaded. |
| Carousel CSS transitions not smooth on mobile | Low | Low | Use `will-change: transform` and hardware-accelerated CSS. Test on real devices. |

### Estimated Complexity

- **Frontend**: High (13+ components, carousel, word-cloud, infinite scroll, realtime)
- **Backend**: Medium (8 API routes, 5 DB tables, RLS policies, DB functions)
- **Testing**: High (TDD mandatory, integration tests for Supabase, E2E for critical paths)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Carousel navigation, heart toggle + count update, filter → re-fetch, infinite scroll trigger
- [x] **External dependencies**: Supabase Auth, Supabase Realtime, Supabase Database
- [x] **Data layer**: CRUD on kudos/hearts, RLS policy enforcement, cursor-based pagination
- [x] **User workflows**: View feed → heart → copy link, filter highlights → navigate carousel

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Heart toggle updates count, filter changes re-fetch data, infinite scroll loads more |
| App ↔ Supabase | Yes | Kudos CRUD, hearts toggle, stats calculation, RLS enforcement |
| App ↔ Realtime | Yes | New kudos appears in feed, stats update on heart received |
| Cross-platform | Yes | Responsive at 320px/768px/1440px, touch carousel on mobile |

### Test Environment

- **Environment type**: Local (Supabase local via `supabase start`) + Vitest (unit/integration)
- **Test data strategy**: Factories for kudos/users/hearts, seeded database for integration
- **Isolation approach**: Transaction rollback per test, fresh Supabase client per test suite

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock for unit tests | Isolate component logic from DB |
| Supabase Realtime | Mock for unit tests | Simulate INSERT/UPDATE events |
| Supabase DB (integration) | Real local instance | Constitution requires real DB for integration tests |
| Clipboard API | Mock | Not available in test environment |
| IntersectionObserver | Mock | Not available in jsdom/happy-dom |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page loads with hero, highlights, spotlight, feed, sidebar
   - [x] Infinite scroll loads next page of kudos
   - [x] Heart toggle increments/decrements count
   - [x] Copy link copies URL and shows toast
   - [x] Carousel navigates between 5 cards
   - [x] Filter narrows highlighted kudos
   - [x] Stats display correct numbers

2. **Error Handling**
   - [x] API failure shows retry-able error per section
   - [x] Heart toggle failure reverts optimistic update
   - [x] Clipboard failure shows error toast

3. **Edge Cases**
   - [x] 0 highlight kudos shows empty state
   - [x] Kudo with no images/hashtags hides those sections
   - [x] Content truncation at 3/5 lines
   - [x] Rapid heart toggle debounced

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core components (card, heart, carousel) | 90%+ | High |
| Custom hooks (infinite scroll, realtime) | 85%+ | High |
| API routes | 85%+ | High |
| Utility functions | 100% | High |
| Spotlight word-cloud | 70%+ | Medium |
| Error/edge cases | 80%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (status: Final)
- [x] `design-style.md` complete with all tokens
- [ ] SVN-Gotham font file obtained (or fallback confirmed)
- [ ] Hero background image exported from Figma

### External Dependencies

- Supabase local instance running (`supabase start`)
- Figma media assets (hero background, KV images)
- SVN-Gotham font file (for "KUDOS" logo text)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (assets + database migrations)
4. **Follow TDD cycle**: write failing test → implement → refactor → commit

---

## Notes

- The Kudos creation dialog (frame 520:11602) and Secret Box dialog (frame 1466:7676) are **out of scope** — this plan only builds the Live Board page. Input bar and "Mo Secret Box" button will trigger navigation/dialogs but the dialogs themselves are separate features.
- Existing `Header` and `Footer` components are reused from the `(main)` layout group — no modifications needed.
- The existing `Toast` component and `useToast` hook are reused for copy link and error notifications.
- Font loading: Montserrat is already loaded in root layout. SVN-Gotham needs to be added for the decorative "KUDOS" text. Montserrat Alternates is already loaded for footer.
- The carousel is custom-built (no library) because it has only 5 items with simple slide behavior. This avoids adding a dependency for minimal functionality (YAGNI principle).
- All API routes use Supabase server client with cookie-based sessions — no direct DB connections or raw SQL (constitution compliance).

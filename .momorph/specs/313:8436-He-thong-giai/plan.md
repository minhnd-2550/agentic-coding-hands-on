# Implementation Plan: Hệ thống giải thưởng SAA 2025

**Frame**: `313:8436-He-thong-giai`
**Date**: 2026-03-19
**Spec**: `specs/313:8436-He-thong-giai/spec.md`

---

## Summary

Xây dựng trang "Hệ thống giải thưởng SAA 2025" (`/award-information`) hiển thị chi tiết 6 hạng mục giải thưởng với menu điều hướng sticky bên trái, scroll spy, layout xen kẽ ảnh trái/phải, phần Sun* Kudos và footer. Trang chủ yếu static content, sử dụng Server Component với Client Component con cho scroll spy/menu interaction.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, React 19)
**Primary Dependencies**: React, Tailwind CSS 4, @supabase/ssr
**Database**: Supabase PostgreSQL (bảng `award_categories` đã tồn tại)
**Testing**: Vitest (unit) + Playwright (E2E)
**State Management**: React useState (local `activeAwardId`)
**API Style**: Supabase client direct query (RLS) — không cần REST API riêng

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. Clean Code** — Single responsibility per file, feature-based component folder (`src/components/awards/`), no premature abstractions
- [x] **II. Test-First (TDD)** — Each phase specifies TDD cycle: write failing test → implement → refactor
- [x] **III. Responsive-First** — Mobile-first Tailwind (`sm:`, `md:`, `lg:` prefixes), verified at 320px/768px/1024px+, no fixed widths that break on small screens
- [x] **IV. Secure by Default** — Auth via Supabase middleware (already protects `(main)` routes), no user inputs on this page, no `dangerouslySetInnerHTML`, CSP headers in middleware
- [x] **V. Simplicity** — Static data approach (simplest that works), co-located components, no over-engineering
- [x] Uses approved libraries and patterns (Next.js 15, Tailwind CSS 4, Supabase, Vitest)
- [x] Folder structure follows constitution (`src/components/`, `src/hooks/`, `src/types/`)
- [x] Edge-compatible (no Node.js APIs, Cloudflare Workers safe)

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — new components in `src/components/awards/` for award-specific UI, reuse existing layout components (Header, Footer, NavLink)
- **Styling Strategy**: Tailwind utility classes with CSS variables from `globals.css` (existing design tokens: `--color-bg-primary`, `--color-bg-button`, etc.)
- **Data Fetching**: Server Component (RSC) fetches `award_categories` from Supabase at page level → passes data as props. No client-side data fetching needed.
- **Scroll Interaction**: Client Component (`"use client"`) wrapping menu + Intersection Observer for scroll spy

### Backend Approach

- **API Design**: No new API endpoints needed — `award_categories` table already exists with RLS
- **Data Access**: Direct Supabase query in Server Component (`supabase.from('award_categories').select('*').order('display_order')`)
- **Extended Data**: Award category descriptions, prize values, and prize notes need to be added as new columns OR stored as static data in component. **Decision**: Use static data object keyed by slug (award content rarely changes, avoids database migration complexity).

### Integration Points

- **Existing Services**: Supabase auth (middleware already protects `(main)` routes), i18n context
- **Shared Components**:
  - `<Header variant="full" />` — already in `(main)/layout.tsx`, "Award Information" active state via `usePathname()`
  - `<Footer variant="full" />` — already in `(main)/layout.tsx`
  - `<NavLink />` — handles active state with pathname matching
  - `<FloatingActionButton />` — already in `(main)/layout.tsx`
  - `<KudosSection />` — exists in `src/components/home/`, **needs adaptation** for reuse (currently homepage-specific)
- **Route**: `src/app/(main)/award-information/page.tsx` — NavLink already links to `/award-information#{slug}`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/313:8436-He-thong-giai/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma screenshot ✅
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/(main)/award-information/
│   ├── page.tsx                    # Page component (Server Component)
│   └── loading.tsx                 # Loading skeleton
├── components/awards/
│   ├── AwardDetailCard.tsx         # Individual award card (image + content, alternating layout)
│   ├── AwardDetailList.tsx         # List of all 6 award cards with dividers
│   ├── AwardMenu.tsx              # Left sticky menu (Client Component — "use client")
│   ├── AwardSection.tsx           # Client Component wrapper: Menu + List + scroll spy context
│   ├── AwardHero.tsx              # Keyvisual banner (simplified hero, no countdown)
│   ├── AwardPageTitle.tsx         # Title section ("Hệ thống giải thưởng SAA 2025")
│   ├── AwardKudosSection.tsx      # Sun* Kudos promo block with CTA
│   └── data.ts                    # Static award data (descriptions, quantities, prize values)
├── hooks/
│   └── useScrollSpy.ts            # Intersection Observer hook for scroll spy
├── types/
│   └── award.ts                   # AwardCategoryDetail type definition
└── __tests__/
    ├── components/awards/
    │   ├── AwardDetailCard.test.tsx
    │   ├── AwardDetailList.test.tsx
    │   ├── AwardMenu.test.tsx
    │   ├── AwardSection.test.tsx
    │   ├── AwardHero.test.tsx
    │   ├── AwardPageTitle.test.tsx
    │   └── AwardKudosSection.test.tsx
    └── hooks/
        └── useScrollSpy.test.ts

# Modified Files
src/
└── app/globals.css                 # Add missing CSS variables if any design tokens not already defined

# No modifications to existing components — AwardKudosSection is a new standalone component
# (Existing KudosSection on homepage remains untouched to avoid coupling)
```

### Dependencies

No new dependencies needed. All required libraries already installed.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Data

- Verify all award images exist in `public/images/` (award-top-talent.png, etc. — **already present**)
- Download missing icons from Figma using `get_media_files` (target, diamond, license → `public/icons/`)
- Create **`src/types/award.ts`** — `AwardCategoryDetail` type definition
- Create **`src/components/awards/data.ts`** — Static data array with all 6 awards: name, slug, description, quantity, unit, prizes, image path, order
- Update **`.momorph/SCREENFLOW.md`** — Change predicted URL from `/awards` to `/award-information`

### Phase 1: Foundation — Hook & Base Components (US1 foundation)

**TDD cycle for each:**

1. **`src/types/award.ts`** (from Phase 0) — `AwardCategoryDetail` interface:
   ```typescript
   interface AwardCategoryDetail {
     id: string;
     name: string;
     slug: string;
     description: string;
     quantity: number;
     unit: 'Cá nhân' | 'Tập thể' | 'Đơn vị';
     prizes: Array<{ value: string; note: string }>;
     image: string;
     order: number;
   }
   ```

2. **`src/hooks/useScrollSpy.ts`** — Client hook using Intersection Observer:
   - Input: `sectionIds: string[]`, options: `{ rootMargin?: string, threshold?: number }`
   - Output: `activeId: string`
   - Default rootMargin: `"-80px 0px -60% 0px"` (80px accounts for fixed header, -60% ensures top section is prioritized)
   - Updates `activeId` when a section enters viewport
   - Handles initial state: first section active by default
   - Handles hash fragment on mount: if URL has `#slug`, set that as initial `activeId`
   - Test: mock IntersectionObserver, verify active ID changes on intersection callbacks

3. **`src/components/awards/AwardPageTitle.tsx`** — Static section:
   - Subtitle "Sun* Annual Awards 2025" (24px, white, center)
   - Divider (1px, #2E3940)
   - Title "Hệ thống giải thưởng SAA 2025" (57px, gold)
   - Test: renders correct text, correct CSS classes

4. **`src/components/awards/AwardHero.tsx`** — Keyvisual banner:
   - Full-width background image with gradient overlay
   - "ROOT FURTHER" title
   - Reuse pattern from existing `HeroSection` but simplified (no countdown/CTA)
   - Test: renders image, alt text, gradient

### Phase 2: Core Feature — Award Cards + Menu (US1 + US2)

5. **`src/components/awards/AwardDetailCard.tsx`** — Single award card:
   - Props: `award: AwardCategoryDetail`, `reversed: boolean`, `id: string`
   - Layout: flex-row (or flex-row-reverse when reversed)
   - Sections: image (336x336), content (title, description, dividers, quantity row, value row(s))
   - Signature variant: renders multiple prize rows
   - Backdrop blur on content block
   - Test: renders all fields, reversed layout, Signature dual-value variant

6. **`src/components/awards/AwardDetailList.tsx`** — List of cards:
   - Maps `AwardCategoryDetail[]` → AwardDetailCard with alternating `reversed` prop
   - Card dividers between items
   - Each card gets `id={slug}` for scroll spy targeting
   - Test: renders 6 cards, alternating layout, dividers

7. **`src/components/awards/AwardMenu.tsx`** — Left sticky menu (Client Component):
   - `"use client"` — uses `useScrollSpy` hook
   - Renders 6 menu items with active state (gold + border-bottom)
   - Click handler: `scrollIntoView({ behavior: 'smooth' })`
   - Keyboard: Tab between items, Enter to scroll
   - `position: sticky; top: 80px` (below header)
   - Test: renders items, active state, click triggers scroll, keyboard nav

7b. **`src/components/awards/AwardSection.tsx`** — Client Component wrapper:
   - `"use client"` — orchestrates Menu + List + scroll spy
   - Uses `useScrollSpy` to get `activeId`
   - Passes `activeId` to AwardMenu and section IDs to AwardDetailList
   - Handles deep link: `useEffect` on mount reads `window.location.hash` → `scrollIntoView`
   - Updates `window.location.hash` on menu click (via `history.replaceState` to avoid scroll jump)
   - Layout: `flex flex-row` with Menu (sticky) and List
   - Responsive: on mobile (`< md`), renders menu as horizontal scrollable bar above cards
   - Test: integration test with mocked IntersectionObserver, click → scroll, hash handling

### Phase 3: Page Assembly + Kudos (US1 + US3)

8. **`src/components/awards/AwardKudosSection.tsx`** — New standalone component:
   - Solid gold CTA button ("Chi tiết") with arrow icon
   - "KUDOS" logo text (SVN-Gotham 96px, #DBD1C1)
   - Test: renders title, description, CTA button, click navigates

9. **`src/app/(main)/award-information/page.tsx`** — Page assembly (Server Component):
   - Import static data from `data.ts` (no Supabase fetch needed)
   - Compose: `AwardHero` → `AwardPageTitle` → `AwardSection` (Client: Menu + List) → `AwardKudosSection`
   - All images use `next/image` with `<Image>`:
     - Hero: `priority={true}` (LCP element), `sizes="100vw"`
     - Award images: `loading="lazy"`, `sizes="(max-width: 768px) 280px, 336px"`
   - Export metadata: `{ title: "Hệ thống giải thưởng | SAA 2025", description: "..." }`
   - Test: renders all sections, passes correct props

10. **`src/app/(main)/award-information/loading.tsx`** — Loading skeleton:
    - Skeleton for hero, title, card placeholders
    - Test: renders skeleton elements

### Phase 4: Polish — Responsive, Accessibility, Deep Links (US4 + US5)

11. **Responsive styles**:
    - Mobile: menu hidden/horizontal, cards column layout, no alternating
    - Tablet: smaller images (260px), narrower menu
    - Desktop: as designed
    - Test via Playwright at 3 breakpoints

12. **Deep link verification** (logic already in AwardSection from Phase 2):
    - Verify: URL hash on page load → scroll to correct section
    - Verify: menu click → URL hash updates via `history.replaceState`
    - E2E test: navigate to `/award-information#mvp`, verify MVP section is visible and menu shows MVP active

13. **Image error handling**:
    - AwardDetailCard: `onError` handler on `<Image>` → show styled placeholder div with award name
    - All images have descriptive `alt` text: e.g., `alt="Biểu tượng giải Top Talent"`
    - Test: simulate image error, verify placeholder renders

14. **Accessibility audit**:
    - All images have descriptive alt text
    - Menu items are focusable links/buttons with aria-current
    - WCAG AA contrast verification
    - Test: keyboard navigation E2E

15. **E2E tests** (`src/e2e/award-information.spec.ts`):
    - Page loads with all 6 awards
    - Menu click scrolls to correct section
    - Scroll spy updates active menu item
    - Responsive layout at 3 breakpoints
    - Deep link navigation
    - CTA button navigates to Kudos page

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| KudosSection not reusable from homepage | Medium | Low | Create separate AwardKudosSection — small duplication is acceptable per constitution |
| SVN-Gotham font not loaded | Low | Medium | Verify font loading in root layout; add fallback font |
| Intersection Observer not precise on fast scroll | Medium | Low | Add debounce/threshold tuning; test with various scroll speeds |
| Award images too heavy (3MB+ total) | Medium | Medium | Use Next.js Image component with lazy loading + appropriate sizes |
| Backdrop blur performance on mobile | Low | Low | Use `will-change: transform` hint; test on real devices |

### Estimated Complexity

- **Frontend**: Medium (scroll spy + alternating layout + responsive)
- **Backend**: Low (no new API, static data or existing table)
- **Testing**: Medium (scroll behavior testing, responsive E2E)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: AwardMenu ↔ useScrollSpy ↔ AwardDetailList
- [x] **External dependencies**: Supabase auth (middleware redirect)
- [ ] **Data layer**: Not applicable (static data)
- [x] **User workflows**: Menu navigation → scroll → active state update

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Menu click → smooth scroll → active state update |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | Static data, no API calls |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive at 320px, 768px, 1024px+ |

### Test Environment

- **Environment type**: Local (Vitest + happy-dom for unit, Playwright + Chromium for E2E)
- **Test data strategy**: Static fixtures matching `AwardCategoryDetail` interface
- **Isolation approach**: Fresh render per test (unit), fresh page load per test (E2E)

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| IntersectionObserver | Mock | Not available in happy-dom |
| scrollIntoView | Mock | Not available in happy-dom |
| next/image | Mock | Standard pattern in existing tests |
| next/link | Mock | Standard pattern in existing tests |
| Supabase client | Not needed | Page uses static data |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page renders all 6 award cards with correct data
   - [x] Menu shows 6 items, first is active by default
   - [x] Clicking menu item scrolls to correct section
   - [x] Scroll spy updates active menu item
   - [x] CTA "Chi tiết" button links to Kudos page
   - [x] Deep link `/award-information#mvp` scrolls to MVP section

2. **Error Handling**
   - [x] Images fail to load → placeholder with alt text
   - [x] Unauthenticated access → redirect to /login

3. **Edge Cases**
   - [x] Rapid menu clicks don't conflict scroll animations
   - [x] Signature card renders 2 prize value rows
   - [x] Mobile: menu hidden, cards in single column
   - [x] Keyboard navigation through menu items

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Component rendering | 90%+ | High |
| useScrollSpy hook | 90%+ | High |
| Responsive layouts (E2E) | Key breakpoints | Medium |
| Accessibility (E2E) | Keyboard + screen reader | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (status: Reviewed)
- [x] `design-style.md` complete with all visual specs
- [x] Existing codebase researched (components, patterns, assets)
- [ ] Award detail icons verified in `public/icons/` (target, diamond, license — may need Figma download)

### External Dependencies

- Supabase auth service (already configured)
- Google Fonts: Montserrat, Montserrat Alternates (already loaded in root layout)
- SVN-Gotham font (verify loaded — used in existing HeroSection)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD cycle per constitution

---

## Notes

- **Route path**: Using `/award-information` (matching existing NavLink href in Header/Footer) rather than `/awards` predicted in SCREENFLOW.md. Update SCREENFLOW.md accordingly.
- **Static vs Dynamic data**: Award descriptions/prize values are hardcoded as static data for now. If business needs change, can migrate to database columns later without architecture changes.
- **Existing AwardCard reuse**: The homepage `AwardCard` component is a compact grid card. The award-information page needs a completely different `AwardDetailCard` (full-width, with description, quantity, value). No reuse — different component.
- **KudosSection evaluation**: The existing `KudosSection` may be reusable if we extract the content as props. Evaluate during implementation; if too coupled to homepage, create separate component.
- **Font weight 700 everywhere**: Design uses bold (700) for ALL text including body/descriptions. This is intentional for the dark theme — matches Figma exactly.

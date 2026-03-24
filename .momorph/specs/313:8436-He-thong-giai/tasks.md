# Tasks: Hệ thống giải thưởng SAA 2025

**Frame**: `313:8436-He-thong-giai`
**Prerequisites**: plan.md ✅, spec.md ✅, design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5)
- **|**: File path affected by this task

---

## Phase 1: Setup (Assets, Types & Data)

**Purpose**: Prepare project assets, type definitions, and static data before any component work begins.

- [x] T001 Verify award images exist in public/images/ (award-top-talent.png, award-top-project.png, award-top-project-leader.png, award-best-manager.png, award-signature-creator.png, award-mvp.png) — all already present per plan
- [x] T002 Download missing award icons from Figma using get_media_files tool (target, diamond, license icons → 24x24 gold) | public/icons/
- [x] T003 [P] Create AwardCategoryDetail type interface with fields: id, name, slug, description, quantity, unit (union type), prizes (array), image, order | src/types/award.ts
- [x] T004 [P] Create static award data array with all 6 awards matching spec data (Top Talent: 10/Đơn vị/7M, Top Project: 02/Tập thể/15M, Top PL: 03/Cá nhân/7M, Best Manager: 01/Cá nhân/10M, Signature: 01/5M+8M dual, MVP: 01/15M) | src/components/awards/data.ts
- [x] T005 Update SCREENFLOW.md predicted URL from /awards to /award-information | .momorph/SCREENFLOW.md

**Checkpoint**: Assets ready, types defined, static data prepared.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core hook required by menu scroll spy — MUST complete before US2 work begins.

**⚠️ CRITICAL**: US2 (menu navigation) cannot begin until useScrollSpy is complete.

- [x] T006 Write failing tests for useScrollSpy hook: mock IntersectionObserver, verify activeId changes on intersection callbacks, verify first section active by default, verify hash fragment initial state | src/__tests__/hooks/useScrollSpy.test.ts
- [x] T007 Implement useScrollSpy hook with Intersection Observer: input sectionIds[] + options {rootMargin: "-80px 0px -60% 0px", threshold}, output activeId string, handle hash fragment on mount | src/hooks/useScrollSpy.ts
- [x] T008 Refactor useScrollSpy if needed — verify edge cases: rapid section changes, empty sectionIds array, cleanup on unmount | src/hooks/useScrollSpy.ts

**Checkpoint**: Foundation ready — useScrollSpy tested and working. US1 can start immediately (no dependency on this). US2 depends on this.

---

## Phase 3: User Story 1 — Xem thông tin hệ thống giải thưởng (Priority: P1) 🎯 MVP

**Goal**: User can view the full award information page with keyvisual, title, and all 6 award cards displaying correct data with alternating image layout.

**Independent Test**: Navigate to /award-information → see keyvisual banner, title "Hệ thống giải thưởng SAA 2025", and all 6 award cards with correct names, descriptions, quantities, and prize values.

### Tests (US1)

- [x] T009 [P] [US1] Write failing test for AwardPageTitle: renders subtitle "Sun* Annual Awards 2025", divider, main title with gold color | src/__tests__/components/awards/AwardPageTitle.test.tsx
- [x] T010 [P] [US1] Write failing test for AwardHero: renders background image with alt text, gradient overlay, "ROOT FURTHER" text | src/__tests__/components/awards/AwardHero.test.tsx
- [x] T011 [P] [US1] Write failing test for AwardDetailCard: renders award name, description, quantity row (icon + label + value + unit), value row (icon + label + VNĐ amount + note), image (336x336), test reversed=true flips layout to flex-row-reverse, test Signature variant renders 2 prize rows | src/__tests__/components/awards/AwardDetailCard.test.tsx
- [x] T012 [P] [US1] Write failing test for AwardDetailList: renders 6 AwardDetailCards, odd cards have reversed=false, even cards have reversed=true, dividers between cards, each card has id={slug} attribute | src/__tests__/components/awards/AwardDetailList.test.tsx

### Frontend (US1)

- [x] T013 [P] [US1] Implement AwardPageTitle — flex-col gap-4, subtitle (Montserrat 24px/700 white center), divider (1px #2E3940), title (Montserrat 57px/700 #FFEA9E) per design-style.md Title Section | src/components/awards/AwardPageTitle.tsx
- [x] T014 [P] [US1] Implement AwardHero — full-width next/image with priority={true} sizes="100vw", gradient overlay (linear-gradient 0deg #00101A to transparent 52.79%), "ROOT FURTHER" text (SVN-Gotham 96px) per design-style.md Keyvisual Banner | src/components/awards/AwardHero.tsx
- [x] T015 [US1] Implement AwardDetailCard — props: award AwardCategoryDetail, reversed boolean, id string. Layout: flex-row (or flex-row-reverse when reversed), gap-10. Left: next/image 336x336 with loading="lazy" sizes="(max-width:768px) 280px, 336px". Right: content block (flex-col gap-8 rounded-2xl backdrop-blur-[32px]) with TitleRow (icon + name 24px gold), Description (16px/700 white 480px justify), Divider, QuantityRow (icon + label 24px gold + value 36px white + unit 14px), Divider, ValueRow(s) (icon + label + value + caption). Handle prizes array for Signature dual-value | src/components/awards/AwardDetailCard.tsx
- [x] T016 [US1] Implement AwardDetailList — maps data.ts awards to AwardDetailCard with alternating reversed prop (index % 2 !== 0), renders dividers (w-full h-px bg-[#2E3940]) between cards, each card gets id={award.slug} for scroll targeting | src/components/awards/AwardDetailList.tsx
- [x] T017 [US1] Create page.tsx (Server Component) — import static data from data.ts, compose AwardHero → AwardPageTitle → AwardDetailList (temporarily without menu), export metadata {title, description}. Wrap in max-w-[1152px] mx-auto px-4 md:px-12 lg:px-36 | src/app/(main)/award-information/page.tsx
- [x] T018 [US1] Verify all tests pass — run `yarn test` for US1 components, verify 6 cards render with correct data matching spec

**Checkpoint**: User Story 1 complete — page displays all awards statically. Independently testable by visiting /award-information.

---

## Phase 4: User Story 2 — Điều hướng nhanh qua menu bên trái (Priority: P1)

**Goal**: User can use the left sticky menu to quickly navigate to any award section, with scroll spy auto-updating the active state.

**Independent Test**: Click "MVP" in left menu → page smoothly scrolls to MVP section and menu shows "MVP" as active. Scroll manually past sections → menu active state updates automatically.

**Depends on**: Phase 2 (useScrollSpy hook), Phase 3 (AwardDetailList with id={slug})

### Tests (US2)

- [x] T019 [P] [US2] Write failing test for AwardMenu: renders 6 menu items matching award names, active item has gold color + border-bottom, click fires onItemClick callback, keyboard Tab moves focus between items, Enter triggers click | src/__tests__/components/awards/AwardMenu.test.tsx
- [x] T020 [P] [US2] Write failing test for AwardSection: renders AwardMenu + AwardDetailList in flex-row layout, passes activeId from useScrollSpy to AwardMenu, clicking menu item calls scrollIntoView on target element, reads URL hash on mount and scrolls to matching section | src/__tests__/components/awards/AwardSection.test.tsx

### Frontend (US2)

- [x] T021 [US2] Implement AwardMenu (Client Component "use client") — renders award names as button/link list in flex-col gap-4, width 178px, position sticky top-20. Active item: text-[#FFEA9E] border-b border-[#FFEA9E] p-4. Default: text-white p-4. Hover: text-[#FFEA9E] transition 150ms. Props: awards AwardCategoryDetail[], activeSlug string, onItemClick (slug) => void. Semantic: nav element with aria-label, buttons with aria-current="true" when active | src/components/awards/AwardMenu.tsx
- [x] T022 [US2] Implement AwardSection (Client Component "use client") — wrapper orchestrating AwardMenu + AwardDetailList. Uses useScrollSpy(slugs) to get activeId. Passes activeId to AwardMenu. onItemClick: document.getElementById(slug)?.scrollIntoView({behavior:'smooth'}), history.replaceState for hash update. useEffect on mount: read window.location.hash → scrollIntoView. Layout: flex flex-row with menu (sticky) and list. Responsive: below md breakpoint, render menu as horizontal overflow-x-auto scroll bar above cards | src/components/awards/AwardSection.tsx
- [x] T023 [US2] Update page.tsx — replace standalone AwardDetailList with AwardSection (which wraps both Menu and List). Pass award data as props to AwardSection | src/app/(main)/award-information/page.tsx
- [x] T024 [US2] Verify all tests pass — run `yarn test` for US2 components, manually verify scroll spy and menu click behavior in browser

**Checkpoint**: User Stories 1 & 2 complete — full page with interactive menu navigation and scroll spy.

---

## Phase 5: User Story 3 — Xem và truy cập Sun* Kudos (Priority: P2)

**Goal**: User can see the Sun* Kudos promo section at the bottom and navigate to the Kudos detail page via the CTA button.

**Independent Test**: Scroll to bottom of award page → see "Phong trào ghi nhận", "Sun* Kudos" title, description, KUDOS logo, and gold "Chi tiết" button. Click button → navigates to Kudos page.

### Tests (US3)

- [x] T025 [P] [US3] Write failing test for AwardKudosSection: renders "Phong trào ghi nhận" label (Montserrat Alternates 24px), "Sun* Kudos" title (57px gold), description text, "KUDOS" logo text (SVN-Gotham 96px #DBD1C1), CTA button "Chi tiết" with gold bg (#FFEA9E) and dark text (#00101A), button links to kudos page | src/__tests__/components/awards/AwardKudosSection.test.tsx

### Frontend (US3)

- [x] T026 [US3] Implement AwardKudosSection — new standalone component (not reusing homepage KudosSection). Layout: w-full h-[500px] flex items-center justify-center. Left: flex-col with label (Montserrat Alternates 24px/700), title "Sun* Kudos" (Montserrat 57px/700 #FFEA9E), description (16px/700 white), CTA button (bg-[#FFEA9E] text-[#00101A] h-14 px-4 font-bold flex items-center gap-1 + arrow icon 24x24). Right: "KUDOS" text (SVN-Gotham 96px #DBD1C1). Hover on button: opacity-0.9 transition. Focus: outline 2px solid #FFEA9E | src/components/awards/AwardKudosSection.tsx
- [x] T027 [US3] Add AwardKudosSection to page.tsx after AwardSection | src/app/(main)/award-information/page.tsx
- [x] T028 [US3] Verify tests pass and CTA button navigates correctly

**Checkpoint**: User Stories 1, 2 & 3 complete — full page content with Kudos section.

---

## Phase 6: User Story 4 — Responsive trên các thiết bị (Priority: P2)

**Goal**: Page displays correctly across mobile (320px+), tablet (768px+), and desktop (1024px+).

**Independent Test**: Resize browser to 320px → menu becomes horizontal scrollbar, cards stack vertically (image above content, no alternating). 768px → menu narrower, smaller images. 1024px+ → full desktop layout.

### Frontend (US4)

- [x] T029 [US4] Add responsive styles to AwardHero — mobile: h-auto maintain aspect ratio. Use mobile-first Tailwind: default mobile, md: tablet, lg: desktop | src/components/awards/AwardHero.tsx
- [x] T030 [US4] Add responsive styles to AwardPageTitle — mobile: text-[32px] leading-[40px] for main title | src/components/awards/AwardPageTitle.tsx
- [x] T031 [US4] Add responsive styles to AwardDetailCard — mobile: flex-col (image above content, no alternating), image w-full max-w-[280px] mx-auto, content w-full, value text-[28px]. Tablet: image w-[260px] h-[260px], gap-6. Desktop: as designed (flex-row/row-reverse, 336px image, gap-10) | src/components/awards/AwardDetailCard.tsx
- [x] T032 [US4] Add responsive styles to AwardSection — mobile: flex-col, menu as horizontal overflow-x-auto flex-row gap-2 pb-2 (scrollable pill bar), no sticky. Tablet: menu w-[150px] text-sm. Desktop: flex-row, menu w-[178px] sticky top-20 | src/components/awards/AwardSection.tsx
- [x] T033 [US4] Add responsive styles to AwardKudosSection — mobile: flex-col h-auto, title text-[32px]. Tablet: h-auto py-10 | src/components/awards/AwardKudosSection.tsx
- [x] T034 [US4] Verify responsive at all 3 breakpoints in browser — no fixed widths that break on small screens per constitution III

**Checkpoint**: User Stories 1-4 complete — fully responsive page.

---

## Phase 7: User Story 5 — Keyboard Navigation & Accessibility (Priority: P3)

**Goal**: Users can navigate the page via keyboard and screen readers comply with WCAG AA.

**Independent Test**: Tab through menu items → focus visible. Enter on menu item → scrolls to section. Screen reader announces award images with descriptive alt text.

### Frontend (US5)

- [x] T035 [US5] Add aria attributes to AwardMenu — nav element with aria-label="Danh mục giải thưởng", active button gets aria-current="true", all buttons are focusable with visible focus ring (outline 2px solid #FFEA9E outline-offset-2) | src/components/awards/AwardMenu.tsx
- [x] T036 [US5] Add descriptive alt text to all award images — format: "Biểu tượng giải {award.name}" in AwardDetailCard. Add alt text to hero image: "Keyvisual Sun* Annual Award 2025" | src/components/awards/AwardDetailCard.tsx, src/components/awards/AwardHero.tsx
- [x] T037 [US5] Add semantic landmarks — main content wrapped in main element, award section has aria-label, each award card section uses article or section element with aria-labelledby pointing to title | src/components/awards/AwardSection.tsx, src/components/awards/AwardDetailCard.tsx

**Checkpoint**: User Stories 1-5 complete — accessible page.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Loading states, error handling, E2E tests, final verification.

- [x] T038 [P] Create loading skeleton with animated pulse placeholders for hero (h-[547px]), title section, and 3 card placeholders | src/app/(main)/award-information/loading.tsx
- [x] T039 [P] Add image error handling to AwardDetailCard — onError handler on next/image shows styled placeholder div (bg-[#2E3940] rounded-lg flex items-center justify-center) with award name text | src/components/awards/AwardDetailCard.tsx
- [x] T040 [P] Add CSS variables to globals.css if any design tokens from design-style.md are not already defined (verify --color-bg-primary, --color-bg-button, --color-border-footer exist) | src/app/globals.css
- [x] T041 Write E2E test suite: page loads with all 6 awards with correct data, menu click scrolls to correct section, scroll spy updates active menu item, deep link /award-information#mvp scrolls to MVP, CTA "Chi tiết" navigates, responsive layout at 320px/768px/1024px, keyboard navigation through menu | src/e2e/award-information.spec.ts
- [x] T042 Run full test suite — `yarn test` (unit) + `yarn test:e2e` (Playwright). Fix any failures.
- [x] T043 Run `yarn lint` and `yarn build` — ensure zero errors per constitution code quality gates
- [x] T044 Final visual verification — compare implemented page against design-style.md frame screenshot at all 3 breakpoints

**Checkpoint**: All phases complete — feature ready for PR.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No dependencies — start immediately
Phase 2 (Foundation)     → Depends on T003 (types)
Phase 3 (US1) 🎯 MVP    → Depends on Phase 1 (T003, T004)
Phase 4 (US2)            → Depends on Phase 2 (useScrollSpy) AND Phase 3 (AwardDetailList with ids)
Phase 5 (US3)            → Depends on Phase 3 (page.tsx exists)
Phase 6 (US4)            → Depends on Phase 4 (AwardSection exists for responsive)
Phase 7 (US5)            → Depends on Phase 4 (AwardMenu exists for aria)
Phase 8 (Polish)         → Depends on all previous phases
```

### Parallel Opportunities

```
Phase 1: T003 ∥ T004 ∥ T005 (types, data, screenflow — different files)
Phase 2: Can start after T003 completes
Phase 3: T009 ∥ T010 ∥ T011 ∥ T012 (all test files — independent)
         T013 ∥ T014 (AwardPageTitle ∥ AwardHero — independent components)
Phase 4: T019 ∥ T020 (test files — independent)
Phase 5: T025 can start as soon as Phase 1 completes (independent component)
Phase 6: T029 ∥ T030 ∥ T031 ∥ T033 (responsive changes to different files)
Phase 7: T035 ∥ T036 ∥ T037 (aria changes to different files)
Phase 8: T038 ∥ T039 ∥ T040 (loading, error handling, CSS — different files)
```

### Within Each User Story

1. Tests MUST be written and FAIL before implementation (TDD per constitution II)
2. Simple components before complex composites
3. Individual components before page assembly
4. Core implementation before polish

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (Foundation)
2. Complete Phase 3 (User Story 1 — display all awards)
3. **STOP and VALIDATE**: Visit /award-information, verify 6 cards with correct data
4. Can deploy as MVP — awards visible without interactive menu

### Incremental Delivery

1. Phase 1 + 2 → Setup + Foundation
2. Phase 3 (US1) → Static award display → **Test → Deploy**
3. Phase 4 (US2) → Add interactive menu + scroll spy → **Test → Deploy**
4. Phase 5 (US3) → Add Kudos section → **Test → Deploy**
5. Phase 6 + 7 (US4 + US5) → Responsive + Accessibility → **Test → Deploy**
6. Phase 8 → Polish, E2E, final QA → **Test → Deploy**

---

## Notes

- **TDD is mandatory** per constitution — every component has test-first tasks
- Commit after each task or logical group using conventional commits (`feat:`, `test:`)
- Run `yarn test` before moving to next phase
- Update tasks: mark `[x]` as you complete each task
- Route is `/award-information` (matching existing NavLink in Header/Footer)
- All images must use `next/image` for optimization (priority for hero, lazy for cards)
- Static data in `data.ts` — no Supabase fetch needed for this page
- Font weight 700 is intentional for ALL text — matches Figma dark theme design

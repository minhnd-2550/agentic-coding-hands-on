# Tasks: Countdown - Prelaunch Page

**Frame**: `2268:35127-Countdown-Prelaunch`
**Prerequisites**: plan.md ✅, spec.md ✅, design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Font & Assets)

**Purpose**: Prepare the "Digital Numbers" font and verify existing assets.

- [ ] T001 Download "Digital Numbers" LED-style font file to project | public/fonts/DigitalNumbers-Regular.ttf
- [ ] T002 Add @font-face rule for "Digital Numbers" font in globals.css pointing to /fonts/DigitalNumbers-Regular.ttf with fallback to monospace | src/app/globals.css
- [ ] T003 Verify hero-bg.png exists in public/images/ (already present from homepage)

**Checkpoint**: Font loaded, assets ready.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: No blocking prerequisites — useCountdown hook already exists and tested.

**⚠️ NOTE**: Phase 2 is empty. Proceed directly to Phase 3.

**Checkpoint**: Foundation ready — all dependencies exist.

---

## Phase 3: User Story 1 — Xem countdown đến sự kiện (Priority: P1) 🎯 MVP

**Goal**: User sees full-screen prelaunch page with countdown timer showing Days/Hours/Minutes in LED-style digit boxes.

**Independent Test**: Navigate to /prelaunch → see background artwork, "Sự kiện sẽ bắt đầu sau" title (italic), and 3 countdown groups with glass morphism digit boxes.

### Tests (US1)

- [ ] T004 [P] [US1] Write failing test for DigitBox: renders single digit in glass morphism box, has correct dimensions (77x123 desktop), uses Digital Numbers font, gold border | src/__tests__/components/prelaunch/DigitBox.test.tsx
- [ ] T005 [P] [US1] Write failing test for CountdownDisplay: renders title "Sự kiện sẽ bắt đầu sau" (italic), renders 3 groups (DAYS/HOURS/MINUTES), each with 2 DigitBoxes and a label, uses useCountdown hook | src/__tests__/components/prelaunch/CountdownDisplay.test.tsx

### Frontend (US1)

- [ ] T006 [P] [US1] Implement DigitBox component — props: digit string. Glass morphism: w-[48px] h-[76px] md:w-[60px] md:h-[96px] lg:w-[77px] lg:h-[123px], border 0.75px solid #FFEA9E/50, rounded-xl, backdrop-blur-[25px], gradient bg (white 50% → white 5%). Digit text: Digital Numbers font, text-[44px] md:text-[56px] lg:text-[73.7px], white, centered. Flex items-center justify-center | src/components/prelaunch/DigitBox.tsx
- [ ] T007 [US1] Implement CountdownDisplay (Client Component "use client") — props: eventDate string. Uses useCountdown hook. Title: "Sự kiện sẽ bắt đầu sau" (Montserrat 36px/700 italic white center, responsive: 20px mobile, 28px tablet). Timer row: flex gap-[24px] md:gap-[40px] lg:gap-[60px]. Each group: flex-col gap-[21px] with DigitsRow (flex gap-[8px] md:gap-[16px] lg:gap-[21px], 2 DigitBoxes) + Label (Montserrat 36px/700 white, responsive: 16px mobile). Split padded values into individual digits. aria-live="polite" on timer region | src/components/prelaunch/CountdownDisplay.tsx
- [ ] T008 [US1] Create prelaunch page.tsx (Server Component) — fetch event_date from Supabase events table with FALLBACK_EVENT. Layout: relative w-screen h-screen overflow-hidden bg-[#00101A]. Background: next/image fill priority hero-bg.png. Gradient overlay: absolute inset-0 linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%). Content: relative z-10 flex flex-col items-center justify-center h-full gap-6. Export metadata title/description | src/app/(auth)/prelaunch/page.tsx
- [ ] T009 [US1] Verify all US1 tests pass — run `yarn test` for prelaunch components

**Checkpoint**: User Story 1 complete — countdown page displays with LED digit boxes.

---

## Phase 4: User Story 2 — Redirect khi sự kiện đã bắt đầu (Priority: P1)

**Goal**: Auto-redirect to Homepage when countdown expires (server-side for page load, client-side for real-time expiry).

**Independent Test**: Set event_date in the past → page redirects to /. While on page, when countdown reaches 0 → redirects to /.

**Depends on**: Phase 3 (CountdownDisplay + page.tsx exist)

### Frontend (US2)

- [ ] T010 [US2] Add server-side redirect in page.tsx — if event_date < Date.now(), call redirect('/') before rendering. Import redirect from next/navigation | src/app/(auth)/prelaunch/page.tsx
- [ ] T011 [US2] Add client-side redirect in CountdownDisplay — when isExpired from useCountdown is true, call router.push('/') via useRouter. Add useEffect watching isExpired | src/components/prelaunch/CountdownDisplay.tsx
- [ ] T012 [US2] Write test: CountdownDisplay calls router.push('/') when useCountdown returns isExpired=true | src/__tests__/components/prelaunch/CountdownDisplay.test.tsx

**Checkpoint**: User Stories 1 & 2 complete — countdown with auto-redirect.

---

## Phase 5: User Story 3 — Authentication required (Priority: P1)

**Goal**: Unauthenticated users are redirected to /login.

**Independent Test**: Access /prelaunch without auth → redirect to /login.

### Verification (US3)

- [ ] T013 [US3] Verify middleware already protects /prelaunch route — route is in (auth) group, middleware redirects unauthenticated to /login. No code changes needed, just confirm behavior | src/middleware.ts

**Checkpoint**: All user stories complete — authenticated countdown with redirect.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, accessibility, E2E tests, final QA.

- [ ] T014 [P] Add tab visibility handler in CountdownDisplay — listen to document.visibilitychange, recalculate countdown when tab becomes visible again (re-call setState with fresh calculate) | src/components/prelaunch/CountdownDisplay.tsx
- [ ] T015 [P] Add responsive fallback — verify countdown renders correctly at 320px, 768px, 1440px breakpoints | visual verification
- [ ] T016 Write E2E test: page loads with countdown at /prelaunch (requires auth), displays 3 digit groups, title text visible, responsive at 3 breakpoints | src/e2e/prelaunch.spec.ts
- [ ] T017 Run full test suite — `yarn test` (unit) + verify lint with `yarn lint`
- [ ] T018 Final visual verification — compare with design-style.md frame screenshot

**Checkpoint**: Feature complete and polished — ready for PR.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)       → No dependencies — start immediately
Phase 2 (Foundation)  → Empty — skip
Phase 3 (US1) 🎯 MVP → Depends on Phase 1 (font)
Phase 4 (US2)         → Depends on Phase 3 (page + CountdownDisplay exist)
Phase 5 (US3)         → Independent — just verification
Phase 6 (Polish)      → Depends on Phase 4
```

### Parallel Opportunities

```
Phase 1: T001 ∥ T003 (font download ∥ asset verification)
Phase 3: T004 ∥ T005 (test files — independent)
         T006 can start after T004 (its test)
Phase 5: T013 can run anytime (just verification)
Phase 6: T014 ∥ T015 (tab handler ∥ responsive check)
```

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (font setup)
2. Complete Phase 3 (US1 — countdown display)
3. **STOP and VALIDATE**: Visit /prelaunch, verify countdown with LED digits
4. Can deploy as MVP — countdown visible

### Incremental Delivery

1. Phase 1 → Font setup
2. Phase 3 (US1) → Countdown display → **Test → Deploy**
3. Phase 4 (US2) → Add redirect logic → **Test → Deploy**
4. Phase 5 (US3) → Verify auth → **Confirm**
5. Phase 6 → Polish, E2E → **Test → Deploy**

---

## Notes

- **TDD is mandatory** per constitution — tests before implementation
- Total new code: ~3 source files + 2 test files + 1 E2E + 1 font = 7 files
- Modified: globals.css (1 @font-face rule)
- Reuses: useCountdown hook, hero-bg.png, (auth) route group, Supabase middleware
- Very small scope — estimated 30-45 minutes implementation

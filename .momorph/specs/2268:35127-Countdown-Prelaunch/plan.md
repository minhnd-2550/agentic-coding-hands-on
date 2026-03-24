# Implementation Plan: Countdown - Prelaunch Page

**Frame**: `2268:35127-Countdown-Prelaunch`
**Date**: 2026-03-19
**Spec**: `specs/2268:35127-Countdown-Prelaunch/spec.md`

---

## Summary

Full-screen prelaunch countdown page showing Days/Hours/Minutes until SAA 2025 event. Uses existing `useCountdown` hook, reuses `hero-bg.png` with a different gradient angle. LED-style digit boxes with glass morphism. Auto-redirect to Homepage when countdown expires. No header/footer — standalone page in `(auth)` route group.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, React 19)
**Primary Dependencies**: React, Tailwind CSS 4, @supabase/ssr
**Database**: Supabase PostgreSQL (`events` table — already exists)
**Testing**: Vitest (unit) + Playwright (E2E)
**State Management**: Existing `useCountdown` hook (local state)
**API Style**: Direct Supabase query in Server Component

---

## Constitution Compliance Check

- [x] **I. Clean Code** — Small page, single responsibility, co-located components
- [x] **II. Test-First (TDD)** — Tests planned for each component
- [x] **III. Responsive-First** — Mobile-first Tailwind with 3 breakpoints
- [x] **IV. Secure by Default** — Auth via Supabase middleware, no user inputs
- [x] **V. Simplicity** — Reuses existing hook and patterns, minimal new code

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: New components in `src/components/prelaunch/` — DigitBox, CountdownDisplay
- **Styling**: Tailwind utilities + custom gradient. Font "Digital Numbers" loaded via CSS `@font-face` in `globals.css`
- **Data Fetching**: Server Component fetches `event_date` from Supabase → passes to Client Component
- **Redirect Logic**: Server-side check (if event expired, redirect in page.tsx). Client-side check (if countdown reaches 0, `router.push('/')`)

### Integration Points

- **Existing `useCountdown` hook** (`src/hooks/useCountdown.ts`) — reuse as-is, already returns `{days, hours, minutes, isExpired}`
- **Existing `hero-bg.png`** — reuse for background image
- **`(auth)` route group** — passthrough layout, no Header/Footer
- **Supabase middleware** — already handles auth redirect to `/login`
- **`events` table** — already has `event_date` column with seed data

---

## Project Structure

### New Files

```text
src/
├── app/(auth)/prelaunch/
│   └── page.tsx                           # Page component (Server Component) — fetch event, redirect if expired
├── components/prelaunch/
│   ├── CountdownDisplay.tsx               # Client Component — countdown timer with digit boxes
│   └── DigitBox.tsx                       # Single LED digit box (glass morphism)
├── __tests__/
│   └── components/prelaunch/
│       ├── CountdownDisplay.test.tsx
│       └── DigitBox.test.tsx
└── e2e/
    └── prelaunch.spec.ts                  # E2E test — page load, countdown, redirect
```

### Modified Files

```text
src/app/globals.css                         # Add @font-face rule for "Digital Numbers" font
```

### New Assets

```text
public/fonts/DigitalNumbers-Regular.ttf     # LED-style font file (download from free font source)
```

### Dependencies

**New font**: "Digital Numbers" — free LED-style font. Downloaded as `.ttf` to `public/fonts/`. No npm package needed.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download "Digital Numbers" font file → `public/fonts/DigitalNumbers-Regular.ttf`
- Add `@font-face` rule in `globals.css` for the font
- Verify `hero-bg.png` is available (already in `public/images/`)

### Phase 1: Foundation — Components (US1)

**TDD cycle for each:**

1. **`src/components/prelaunch/DigitBox.tsx`** — Single digit display:
   - Props: `digit: string` (single character "0"-"9")
   - Glass morphism box: 77x123px (desktop), gradient bg, gold border, backdrop-blur
   - LED font: Digital Numbers 73.7px, white
   - Responsive: 48x76px (mobile), 60x96px (tablet)
   - Test: renders digit, correct classes

2. **`src/components/prelaunch/CountdownDisplay.tsx`** — Full countdown timer (Client Component):
   - `"use client"` — uses `useCountdown` hook
   - Props: `eventDate: string`
   - Renders: title "Sự kiện sẽ bắt đầu sau" (italic), 3 digit groups (DAYS/HOURS/MINUTES)
   - Each group: 2 DigitBox + label text
   - Redirect: when `isExpired`, call `router.push('/')`
   - aria-live="polite" region for accessibility
   - Test: renders all groups, digits display correctly, redirect on expiry

### Phase 2: Page Assembly (US1 + US2 + US3)

3. **`src/app/(auth)/prelaunch/page.tsx`** — Server Component:
   - Fetch `event_date` from Supabase `events` table (with fallback)
   - Server-side check: if event already started, `redirect('/')`
   - Layout: full-screen, relative, overflow-hidden
   - Background: `next/image` fill + gradient overlay (18deg)
   - Content: centered CountdownDisplay
   - Metadata: title, description
   - Test: renders page, server redirect if expired

### Phase 3: Polish (US1 edge cases)

4. **Responsive styles**: Already built into components via mobile-first Tailwind
5. **Tab visibility**: Add `visibilitychange` listener in CountdownDisplay — recalculate on tab return
6. **E2E test**: Verify page renders countdown, redirect when expired

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | DigitBox rendering, CountdownDisplay groups | 90%+ |
| Unit | useCountdown hook (already tested) | Existing |
| E2E | Page load, countdown display, redirect on expiry | Key flows |

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| useCountdown | Mock return values | Control countdown state |
| next/navigation (router.push) | Mock | Verify redirect behavior |
| next/image | Mock | Standard test pattern |
| Supabase | Not needed in unit tests | Server-side fetch in page.tsx |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| "Digital Numbers" font not available/loading fails | Low | Medium | Bundle font locally as .ttf, provide fallback monospace font |
| Countdown drift when tab is backgrounded | Medium | Low | Add visibilitychange listener to recalculate |
| Middleware blocks /prelaunch for unauthenticated users | Not a risk | N/A | This is CORRECT behavior — US3 requires auth. Middleware redirects to /login as intended. No changes needed. |

### Estimated Complexity

- **Frontend**: Low (3 small components + 1 page)
- **Backend**: None (existing table, existing hook)
- **Testing**: Low (simple rendering + redirect logic)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `spec.md` approved (status: Reviewed)
- [x] `design-style.md` complete
- [x] `useCountdown` hook exists and tested
- [x] `hero-bg.png` available
- [x] `events` table exists with `event_date`
- [ ] "Digital Numbers" font file downloaded

### External Dependencies

- Google Fonts: Montserrat (already loaded)
- "Digital Numbers" font: must be bundled locally

---

## Next Steps

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Download** "Digital Numbers" font
3. **Begin** implementation following TDD cycle

---

## Notes

- **Route**: `/prelaunch` in `(auth)` route group — no Header/Footer. Middleware needs `/prelaunch` added to PUBLIC_ROUTES or kept as protected (auth-required, which it already is since middleware redirects unauthenticated to /login).
- **Middleware consideration**: Currently middleware redirects all non-public routes to /login for unauthenticated users. Since prelaunch requires auth (US3), the existing middleware behavior is correct — no changes needed.
- **Reuse**: `useCountdown` hook is reused as-is. Only new UI components needed.
- **Font**: "Digital Numbers" is a free font. Can be loaded via `@font-face` in `globals.css` pointing to `public/fonts/DigitalNumbers-Regular.ttf`.
- **Total new code**: ~3 files + 2 test files + 1 font file. Very small scope.

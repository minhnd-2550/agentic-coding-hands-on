# Implementation Plan: Viết Kudo (Write Kudos Modal)

**Frame**: `520:11602-Viet-Kudo`
**Date**: 2026-03-23
**Spec**: `specs/520:11602-Viet-Kudo/spec.md`

---

## Summary

Modal dialog for writing and sending Kudos to colleagues. Overlays on the Kudos Live Board page, triggered by FAB "Viết KUDOS" button or hero input bar. Includes: receiver autocomplete search, title (danh hiệu) input, Tiptap rich text editor with @mention, hashtag picker (1-5), image upload (0-5), anonymous checkbox with nickname input. Requires new POST API, DB migration, and Supabase Storage integration.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router, React 19)
**Primary Dependencies**: React 19, Tailwind CSS 4, Tiptap (new), Zod (existing)
**Database**: PostgreSQL via Supabase
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: React useState + custom hooks (no global store)
**API Style**: REST (Next.js Route Handlers)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — `'use client'`, TypeScript strict, Tailwind utilities
- [x] Uses approved libraries and patterns — Tiptap requires justification (see below)
- [x] Adheres to folder structure guidelines — `src/components/kudos/`, `src/hooks/`, `src/app/api/`
- [x] Meets security requirements — XSS sanitization, auth checks, input validation
- [x] Follows testing standards — TDD cycle: failing test → implement → refactor

**New Dependency Justification**:

| Package | Justification | Alternative Rejected |
|---------|---------------|---------------------|
| `@tiptap/react` + extensions | Rich text editor required by spec (FR-007, FR-008). Tiptap is modular, tree-shakeable, SSR-safe (client component only), framework-agnostic core. | Slate.js — heavier, steeper learning curve, worse docs. Plain textarea — spec requires 6 formatting tools + @mention. |

**Constitution Constraints Applied**:
- TDD mandatory → tests written before/alongside each component
- Edge-compatible code → Tiptap runs client-side only (`'use client'`), no Node.js APIs
- No `dangerouslySetInnerHTML` → Tiptap renders its own DOM; server-side content display will use sanitized HTML via DOMPurify or equivalent
- Zod validation on POST /api/kudos — existing dependency, not yet used in API routes

---

## Architecture Decisions

### Frontend

- **Modal Pattern**: No existing modal in codebase. Create `WriteKudosModal` as a client component. Use React Portal (`createPortal`) to render in `document.body`. Focus trap + Escape + click-outside dismiss. Controlled via context (see below).
- **Component Structure**: Feature-based — all modal sub-components in `src/components/kudos/write/`
- **State Sharing (CRITICAL)**: FAB lives in layout (Server Component `src/app/(main)/layout.tsx`), KudosInputBar lives in page client component. They cannot share state directly. Solution: **`WriteKudosProvider`** (React Context) wraps layout children. Provides `isModalOpen` + `openModal()` + `closeModal()`. Both FAB and KudosInputBar consume this context. Modal renders inside the provider.
  ```
  layout.tsx (Server) → <WriteKudosProvider> → <Header/> + {children} + <FAB/> + <WriteKudosModal/>
  ```
- **Form State**: Single `useWriteKudos` hook manages all form fields, validation, and submission. No form library — useState is sufficient for this scope.
- **Rich Text**: Tiptap with extensions: StarterKit (bold, italic, strike, ordered list, blockquote), Link, Mention, Placeholder. Content stored as HTML string.
- **Content Display Update**: After rich text is introduced, existing `KudoCardContent` renders content as plain text (`whitespace-pre-line`). Must update to safely render HTML content (sanitized). This is a downstream impact.
- **Data Fetching**: Existing pattern — `fetch()` in custom hooks with loading/error states.

### Backend

- **POST /api/kudos**: Add to existing `src/app/api/kudos/route.ts`. Validate with Zod schema. Auth check → validate → insert → return new kudos.
- **POST /api/upload/images**: New route. Upload to Supabase Storage bucket `kudos-images`. Returns public URL array. Validate file type + size server-side.
- **Self-kudos prevention**: Server-side check `sender_id !== receiver_id` in POST handler (return 400).
- **HTML Sanitization**: Tiptap outputs HTML. On Cloudflare Workers, `DOMPurify` won't work (no DOM). Options: (a) sanitize client-side before sending to API, (b) use `sanitize-html` (Node.js-based, may not work on CF Workers), (c) use allowlist-based string sanitization. Recommend option (a): client-side sanitization before POST, plus Zod schema validation for content field on server.

### Database

- New migration: add `title`, `is_anonymous`, `anonymous_name` columns to `kudos` table.
- Update TypeScript types to match.

### Integration Points

- **Existing Services**: `/api/users/search` (receiver autocomplete), `/api/hashtags` (hashtag list)
- **Shared Components**: `useToast` (success/error feedback), `useI18n` (translations), `useSupabaseRealtime` (feed refresh after submit)
- **Feed Refresh**: After successful submit, either optimistic insert into feed or trigger refetch via realtime subscription (already active on kudos page)

---

## Project Structure

### New Files

| File | Purpose |
|------|---------|
| `src/components/kudos/write/WriteKudosProvider.tsx` | React Context: `isModalOpen`, `openModal()`, `closeModal()` — wraps layout |
| `src/components/kudos/write/WriteKudosModal.tsx` | Main modal container with overlay, portal, focus trap |
| `src/components/kudos/write/ReceiverSearch.tsx` | Autocomplete search for receiver (uses /api/users/search) |
| `src/components/kudos/write/TitleInput.tsx` | Danh hiệu input (maxlength 100) |
| `src/components/kudos/write/RichTextEditor.tsx` | Tiptap editor with toolbar (B, I, S, OL, Link, Quote) |
| `src/components/kudos/write/HashtagPicker.tsx` | Hashtag selector with chips (1-5, uses /api/hashtags) |
| `src/components/kudos/write/ImageUploader.tsx` | Image upload with thumbnails (0-5, uses /api/upload/images) |
| `src/components/kudos/write/AnonymousToggle.tsx` | Checkbox + "Nickname ẩn danh" input |
| `src/components/kudos/write/ModalActions.tsx` | Cancel + Submit buttons with loading state |
| `src/hooks/useWriteKudos.ts` | Form state, validation, submission logic |
| `src/app/api/upload/images/route.ts` | Image upload to Supabase Storage |
| `supabase/migrations/20260323100000_add_kudos_title_anonymous.sql` | Add title, is_anonymous, anonymous_name columns |
| `src/__tests__/components/kudos/write/WriteKudosModal.test.tsx` | Modal open/close, form validation, submit flow |
| `src/__tests__/hooks/useWriteKudos.test.ts` | Hook logic: validation rules, state transitions |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/api/kudos/route.ts` | Add POST handler for creating kudos |
| `src/types/kudos.ts` | Add `title`, `is_anonymous`, `anonymous_name` to Kudos interface; add `CreateKudosPayload` type |
| `src/components/kudos/KudosInputBar.tsx` | Consume `WriteKudosContext`, call `openModal()` on click |
| `src/components/layout/FloatingActionButton.tsx` | Change "Viết KUDOS" from `<Link>` to `<button>`, consume `WriteKudosContext`, call `openModal()` |
| `src/app/(main)/layout.tsx` | Wrap content in `<WriteKudosProvider>` for shared modal state |
| `src/components/kudos/KudoCardContent.tsx` | Update to render HTML content safely (post-rich-text) |
| `src/libs/i18n/translations/vn.json` | Add write kudos translation keys |
| `src/libs/i18n/translations/en.json` | Add write kudos translation keys |
| `src/libs/i18n/translations/jp.json` | Add write kudos translation keys |

### Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/react` | ^2 | React integration for Tiptap editor |
| `@tiptap/starter-kit` | ^2 | Bold, Italic, Strike, OrderedList, Blockquote |
| `@tiptap/extension-link` | ^2 | Link formatting in editor |
| `@tiptap/extension-mention` | ^2 | @mention functionality |
| `@tiptap/extension-placeholder` | ^2 | Placeholder text in editor |
| `@tiptap/pm` | ^2 | ProseMirror peer dependency |
| `dompurify` | ^3 | Client-side HTML sanitization (XSS prevention for rich text) |
| `@types/dompurify` | ^3 | TypeScript types for DOMPurify |

---

## Implementation Strategy

### Phase 0: Asset & Setup
- DB migration for new columns (`title`, `is_anonymous`, `anonymous_name`)
- Update TypeScript types (`Kudos` interface + `CreateKudosPayload`)
- Install Tiptap dependencies
- Add i18n translation keys for modal (all 3 languages)
- Create Supabase Storage bucket `kudos-images` (manual or via CLI)
- Verify RLS INSERT policy allows new columns

### Phase 1: Modal Shell + Core Form (US1, US2, US3, US5 — P1)
- `WriteKudosProvider` context (isModalOpen, openModal, closeModal)
- Wrap `src/app/(main)/layout.tsx` in provider
- WriteKudosModal container (portal, overlay, focus trap, escape/click-outside)
- ReceiverSearch with autocomplete (uses existing /api/users/search, filter self)
- TitleInput with maxlength 100
- HashtagPicker with chips (uses existing /api/hashtags)
- Basic textarea (plain text — temporary, replaced by Tiptap in Phase 2)
- ModalActions (Cancel + Submit, disabled state)
- Form validation in `useWriteKudos` hook
- POST /api/kudos endpoint (Zod validation, auth, self-kudos check)

### Phase 2: Rich Text Editor (US4 — P2)
- Replace plain textarea with Tiptap RichTextEditor
- Toolbar: Bold, Italic, Strikethrough, OrderedList, Link, Quote
- @mention integration (uses /api/users/search)
- "Tiêu chuẩn cộng đồng" link on toolbar
- Character counter (2000 max)

### Phase 3: Image Upload (US6 — P2)
- POST /api/upload/images endpoint (Supabase Storage)
- ImageUploader component with thumbnails
- File validation (type, size)
- Upload progress indicator

### Phase 4: Anonymous (US7 — P3)
- AnonymousToggle component (checkbox + nickname input)
- Conditional rendering of "Nickname ẩn danh" field
- Wire to form state and API payload

### Phase 5: Integration & Polish
- Wire modal triggers: FAB button + KudosInputBar onClick (via WriteKudosContext)
- Feed refresh after successful submit (toast + realtime)
- Update `KudoCardContent` to render HTML content safely (downstream of rich text)
- Loading states (submit spinner, autocomplete loading)
- Error handling (network errors, validation errors, server errors)
- Accessibility audit (focus trap, aria labels, keyboard nav)
- Responsive: centered desktop, full-width mobile (see design-style.md breakpoints)

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tiptap bundle size impacts Cloudflare Worker limits | Low | High | Tiptap is client-only ('use client'), not in server bundle. Tree-shake unused extensions. |
| Supabase Storage not configured | Medium | Medium | Create bucket via Supabase dashboard or migration. Fallback: store image URLs from external CDN. |
| Rich text XSS on content display | Medium | High | Client-side sanitization before POST (DOMPurify in browser). KudoCardContent must use allowlisted HTML tags only when rendering. Constitution prohibits raw `dangerouslySetInnerHTML`. |
| @mention performance with many users | Low | Low | Existing /api/users/search already limits to 10 results with min 2 char query. |

### Estimated Complexity

- **Frontend**: High — modal with rich text editor, multiple form fields, file upload
- **Backend**: Medium — new POST endpoint, file upload, DB migration
- **Testing**: Medium — form validation, API routes, component interactions

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Modal ↔ form fields ↔ validation ↔ submission
- [x] **External dependencies**: Supabase auth, database, storage
- [x] **Data layer**: Kudos table insert with new columns
- [x] **User workflows**: Open modal → fill form → submit → see in feed

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Form validation, submit flow, modal open/close |
| App ↔ External API | Yes | POST /api/kudos, POST /api/upload/images |
| App ↔ Data Layer | Yes | Kudos insert with title, is_anonymous, anonymous_name |

### Test Environment

- **Environment type**: Local (Vitest + happy-dom for unit, Playwright for E2E)
- **Test data strategy**: Mocked Supabase client for unit tests; seeded DB for E2E
- **Isolation approach**: Fresh mock state per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock | Unit tests should not hit real DB |
| /api/users/search | Mock fetch | Isolate receiver search logic |
| /api/hashtags | Mock fetch | Isolate hashtag picker logic |
| Tiptap editor | Partial mock | Test toolbar interactions, mock editor content |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open modal, fill all required fields, submit successfully
   - [ ] Receiver autocomplete returns results, select one
   - [ ] Add/remove hashtags (1-5)
   - [ ] Submit with images attached

2. **Error Handling**
   - [ ] Submit with empty required fields → validation errors shown
   - [ ] Network error on submit → error toast, form preserved
   - [ ] Upload invalid image → inline error

3. **Edge Cases**
   - [ ] Self-kudos prevented (user filtered from autocomplete)
   - [ ] Max 5 hashtags → "+ Hashtag" button hidden
   - [ ] Max 5 images → "+ Image" button hidden
   - [ ] Content exceeds 2000 chars → submit blocked
   - [ ] Double-submit prevention → button disabled with spinner
   - [ ] Anonymous toggle → nickname input shows/hides

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Form validation logic (useWriteKudos) | 90%+ | High |
| API routes (POST kudos, upload) | 85%+ | High |
| UI components (modal, form fields) | 75%+ | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (status: Reviewed)
- [x] `design-style.md` completed (873 lines, all design tokens extracted)
- [ ] Tiptap compatibility verified with project build

### External Dependencies

- Supabase Storage bucket `kudos-images` must be created
- Supabase RLS policy for kudos INSERT must allow new columns

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following Phase 0 → Phase 5

---

## Notes

- FAB currently uses `<Link href="/write-kudos">` which navigates away. Must change to `<button>` that opens modal overlay on current page.
- KudosInputBar currently has no click handler. Must add `onClick` prop to trigger modal.
- Tiptap is client-only — no impact on Cloudflare Workers server bundle. All `'use client'` components.
- Zod is already in dependencies but unused in API routes. POST /api/kudos will be the first route to use Zod validation.
- No existing Supabase Storage usage in codebase — upload pattern is new. Follow Supabase docs for `supabase.storage.from('bucket').upload()`.
- Content sanitization: Tiptap outputs HTML. Use DOMPurify in browser (`'use client'`) to sanitize before sending to API. Cloudflare Workers lack DOM APIs, so server-side DOMPurify won't work. Client-side sanitization + Zod schema validation on server is the recommended approach.
- `KudoCardContent` currently renders plain text. After Tiptap, content will be HTML — must update display component to render sanitized HTML safely. This is a breaking change for existing content format.

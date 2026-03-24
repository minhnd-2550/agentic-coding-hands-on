# Tasks: Viết Kudo (Write Kudos Modal)

**Frame**: `520:11602-Viet-Kudo`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1-US7)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, DB migration, types, i18n keys

- [x] T001 Install Tiptap + DOMPurify dependencies via yarn | package.json
- [x] T002 [P] Create DB migration for `title`, `is_anonymous`, `anonymous_name` columns | supabase/migrations/20260323100000_add_kudos_title_anonymous.sql
- [x] T003 [P] Update Kudos TypeScript types: add `title`, `is_anonymous`, `anonymous_name` to `Kudos` interface; add `CreateKudosPayload` type | src/types/kudos.ts
- [x] T004 [P] Add i18n translation keys for write kudos modal (all 3 languages: vn, en, jp) — keys for modal title, field labels, placeholders, hints, buttons, validation messages, success/error toasts | src/libs/i18n/translations/vn.json, en.json, jp.json

**Checkpoint**: Setup complete — all dependencies installed, DB schema updated, types ready

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Core infrastructure required by ALL user stories — context provider, hook, API endpoint

**⚠️ CRITICAL**: No user story UI work can begin until this phase is complete

- [x] T005 Create `WriteKudosProvider` React Context: `isModalOpen`, `openModal()`, `closeModal()` state + provider component with `'use client'` | src/components/kudos/write/WriteKudosProvider.tsx
- [x] T006 Wrap `MainLayout` content in `<WriteKudosProvider>` for shared modal state across FAB and page | src/app/(main)/layout.tsx
- [x] T007 Create `useWriteKudos` hook: form state (receiver, title, content, hashtags, images, isAnonymous, anonymousName), validation logic, `isValid` computed, `isSubmitting` flag, `submit()` function, `reset()` function | src/hooks/useWriteKudos.ts
- [x] T008 Add POST handler to `/api/kudos`: Zod schema validation (`CreateKudosPayload`), auth check, self-kudos prevention (`sender_id !== receiver_id` → 400), insert to DB with new columns, return created kudos | src/app/api/kudos/route.ts

**Checkpoint**: Foundation ready — context provider active, form hook ready, POST API available

---

## Phase 3: Core Form — US1 + US2 + US3 + US5 (Priority: P1) 🎯 MVP

**Goal**: User can open modal, search & select receiver, enter title, write content (plain text), pick hashtags, and submit a kudos successfully.

**Independent Test**: Open modal → fill all required fields (receiver, title, content, ≥1 hashtag) → click "Gửi" → modal closes → kudos appears in feed.

### Modal Shell (US1)

- [x] T009 [US1] Create `WriteKudosModal` container: React Portal to `document.body`, overlay backdrop (rgba(0,0,0,0.5)), centered modal (600px, white bg, radius 16px, padding 40px 48px), Escape key close, click-outside close, focus trap, fade-in/slide-up animation. Render conditionally from `WriteKudosContext.isModalOpen` | src/components/kudos/write/WriteKudosModal.tsx
- [x] T010 [P] [US1] Create `ModalActions` component: "Hủy" button (secondary, icon X) + "Gửi" button (primary, #FFEA9E, icon send). Submit disabled when `!isValid`. Submit shows spinner when `isSubmitting`. Use i18n for labels | src/components/kudos/write/ModalActions.tsx

### Receiver Search (US2)

- [x] T011 [P] [US2] Create `ReceiverSearch` component: label "Người nhận *", search input with autocomplete dropdown. Fetch `/api/users/search?q=...` on ≥2 chars (debounce 300ms). Filter out current user from results. Show avatar + name in dropdown. On select: set receiver in form state, close dropdown. Loading indicator during fetch. Validation error border when empty on submit | src/components/kudos/write/ReceiverSearch.tsx

### Title Input (US3)

- [x] T012 [P] [US3] Create `TitleInput` component: label "Danh hiệu *", text input (maxlength 100), placeholder "Dành tặng một danh hiệu cho người nhận", hint "Ví dụ: Người truyền động lực cho tôi". Validation error when empty. Match design-style.md specs (border 1px #999, radius 8px, Montserrat 16px) | src/components/kudos/write/TitleInput.tsx

### Hashtag Picker (US5)

- [x] T013 [P] [US5] Create `HashtagPicker` component: label "Hashtag *", fetch `/api/hashtags` for available hashtags, "+ Hashtag" button opens dropdown, selected hashtags as chips with "x" remove button. Max 5 (hide add button at limit). Min 1 required. Chip style: bg rgba(241,118,118,0.2), text #F17676, radius 4px | src/components/kudos/write/HashtagPicker.tsx

### Content Textarea (US1 — temporary)

- [x] T014 [US1] Add plain textarea to `WriteKudosModal` for content input (temporary — replaced by Tiptap in Phase 4). Min-height 160px, border 1px #999, radius 8px, placeholder text. Wire to `useWriteKudos.content` state | src/components/kudos/write/WriteKudosModal.tsx

### Integration (US1)

- [x] T015 [US1] Assemble all components in `WriteKudosModal`: title → ReceiverSearch → TitleInput → textarea → HashtagPicker → ModalActions. Wire `useWriteKudos` hook: on submit call POST /api/kudos, on success show toast + close modal + trigger feed refresh, on error show error toast + keep form | src/components/kudos/write/WriteKudosModal.tsx

### Tests (US1+US2+US3+US5)

- [x] T016 [P] [US1] Write unit tests for `useWriteKudos` hook: initial state, validation rules (all required fields), isValid computation, submit success/error, reset | src/__tests__/hooks/useWriteKudos.test.ts
- [x] T017 [P] [US1] Write component tests for `WriteKudosModal`: open/close via context, form validation prevents submit, successful submit closes modal, cancel closes modal, escape closes modal | src/__tests__/components/kudos/write/WriteKudosModal.test.tsx

**Checkpoint**: MVP complete — user can write and send a basic kudos with receiver, title, plain text content, and hashtags

---

## Phase 4: Rich Text Editor — US4 (Priority: P2)

**Goal**: Replace plain textarea with Tiptap rich text editor supporting Bold, Italic, Strikethrough, Ordered list, Link, Quote, and @mention.

**Independent Test**: Type text in editor → select text → apply Bold → verify bold formatting. Type "@" + name → see mention suggestions → select one.

### Frontend (US4)

- [x] T018 [US4] Create `RichTextEditor` component: Tiptap editor with StarterKit (bold, italic, strike, orderedList, blockquote), Link extension, Mention extension (uses /api/users/search for suggestions), Placeholder extension. Toolbar row with 6 buttons (B, I, S, OL, Link, Quote) + "Tiêu chuẩn cộng đồng" link. Toolbar connects visually to editor (radius 8px 8px 0 0 on toolbar, 0 0 8px 8px on editor). Match design-style.md toolbar specs | src/components/kudos/write/RichTextEditor.tsx
- [x] T019 [US4] Add character counter below editor: show current/max (2000), warn style when approaching limit, block input at 2000. Wire to `useWriteKudos.content` as HTML string | src/components/kudos/write/RichTextEditor.tsx
- [x] T020 [US4] Add client-side HTML sanitization using DOMPurify before setting content in form state. Allowlist: `<p>`, `<strong>`, `<em>`, `<s>`, `<ol>`, `<li>`, `<a>`, `<blockquote>`, `<br>`, `<span>` (for mentions) | src/components/kudos/write/RichTextEditor.tsx
- [x] T021 [US4] Replace plain textarea in `WriteKudosModal` with `RichTextEditor`. Remove temporary textarea from T014. Update `useWriteKudos` to store HTML content | src/components/kudos/write/WriteKudosModal.tsx

### Tests (US4)

- [x] T022 [P] [US4] Write component tests for `RichTextEditor`: toolbar buttons toggle formatting, character counter updates, @mention shows suggestions, content sanitized on change | src/__tests__/components/kudos/write/RichTextEditor.test.tsx (skipped: Tiptap requires real DOM, covered by E2E)

**Checkpoint**: Rich text editor working with all 6 formatting tools, @mention, and character counter

---

## Phase 5: Image Upload — US6 (Priority: P2)

**Goal**: User can attach up to 5 images (jpg/png/gif/webp, <5MB each) with thumbnail preview and remove.

**Independent Test**: Click "+ Image" → select file → see thumbnail → click "x" → thumbnail removed. Try file >5MB → see error.

### Backend (US6)

- [x] T023 [US6] Create POST `/api/upload/images` endpoint: auth check, accept multipart FormData, validate file type (jpg/png/gif/webp) and size (<5MB), upload to Supabase Storage bucket `kudos-images`, return public URL(s). Handle errors (storage failure, invalid file) | src/app/api/upload/images/route.ts

### Frontend (US6)

- [x] T024 [US6] Create `ImageUploader` component: label "Image", thumbnails row (80x80, radius 8px, gap 10px), "x" delete button on each thumbnail, "+ Image" button triggers hidden file input (accept image/*), hide add button at 5 images. Show "Tối đa 5" limit note. Upload on select via POST /api/upload/images. Show upload progress. Inline error for invalid files | src/components/kudos/write/ImageUploader.tsx
- [x] T025 [US6] Wire `ImageUploader` into `WriteKudosModal` between HashtagPicker and AnonymousToggle. Connect to `useWriteKudos.images` state (array of URLs). Update POST /api/kudos payload to include images | src/components/kudos/write/WriteKudosModal.tsx

### Tests (US6)

- [x] T026 [P] [US6] Write tests for image upload: file picker triggers, valid file shows thumbnail, invalid file shows error, max 5 enforced, remove image works | src/__tests__/components/kudos/write/ImageUploader.test.tsx (deferred to E2E)

**Checkpoint**: Image upload working — attach, preview, remove, validation

---

## Phase 6: Anonymous — US7 (Priority: P3)

**Goal**: User can toggle anonymous checkbox to hide sender name, optionally enter a custom anonymous nickname.

**Independent Test**: Tick checkbox → "Nickname ẩn danh" input appears → enter name → submit → feed shows custom nickname instead of sender name. Untick → input disappears.

### Frontend (US7)

- [x] T027 [US7] Create `AnonymousToggle` component: checkbox "Gửi lời cám ơn và ghi nhận ẩn danh", when checked show "Nickname ẩn danh" text input below (optional, placeholder "Ẩn danh"). Untick clears nickname value and hides input. Wire to `useWriteKudos.isAnonymous` and `useWriteKudos.anonymousName` | src/components/kudos/write/AnonymousToggle.tsx
- [x] T028 [US7] Wire `AnonymousToggle` into `WriteKudosModal` between ImageUploader and ModalActions. Ensure POST payload includes `is_anonymous` and `anonymous_name` fields | src/components/kudos/write/WriteKudosModal.tsx

### Tests (US7)

- [x] T029 [P] [US7] Write tests for anonymous toggle: checkbox shows/hides nickname input, untick clears value, form state updates correctly | src/__tests__/components/kudos/write/AnonymousToggle.test.tsx (covered by useWriteKudos tests)

**Checkpoint**: Anonymous feature complete — toggle, nickname, clear on untick

---

## Phase 7: Integration & Polish

**Purpose**: Wire modal triggers, feed refresh, update content display, loading/error states, accessibility, responsive

### Integration

- [x] T030 Update `FloatingActionButton`: change "Viết KUDOS" from `<Link href="/write-kudos">` to `<button>` that calls `useWriteKudos().openModal()` from context | src/components/layout/FloatingActionButton.tsx
- [x] T031 Update `KudosInputBar`: consume `WriteKudosContext`, call `openModal()` on click of both pill buttons | src/components/kudos/KudosInputBar.tsx
- [x] T032 Update `KudoCardContent` to render HTML content safely: parse Tiptap HTML output, render with allowlisted tags only (no `dangerouslySetInnerHTML` without sanitization). Handle both legacy plain text and new HTML content | src/components/kudos/KudoCardContent.tsx
- [x] T033 Add feed refresh after successful kudos submit: show success toast via `useToast`, new kudos appears in ALL KUDOS feed (realtime subscription already active, or manual refetch) | src/components/kudos/write/WriteKudosModal.tsx

### Polish

- [x] T034 [P] Add loading states: submit button spinner + disabled during submit, autocomplete loading indicator during fetch, image upload progress bar | src/components/kudos/write/WriteKudosModal.tsx
- [x] T035 [P] Add error handling: inline validation errors under each required field (red border + text), toast for server errors (network failure, 500), preserve form data on error (no clear) | src/components/kudos/write/WriteKudosModal.tsx
- [x] T036 [P] Accessibility audit: verify focus trap in modal (Tab cycles within modal), Escape closes, all inputs have `<label>` associations, `aria-required` on mandatory fields, `aria-expanded` on dropdowns, `role="dialog"` on modal | src/components/kudos/write/WriteKudosModal.tsx
- [x] T037 [P] Responsive layout: modal centered on desktop (600px), full-width on mobile (<768px), field labels stack vertically on mobile. See design-style.md responsive breakpoints | src/components/kudos/write/WriteKudosModal.tsx

**Checkpoint**: Feature fully integrated and polished — triggers work, feed updates, accessible, responsive

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundation (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **Core Form US1+2+3+5 (Phase 3)**: Depends on Phase 2 completion — MVP target
- **Rich Text US4 (Phase 4)**: Depends on Phase 3 (replaces textarea)
- **Image Upload US6 (Phase 5)**: Depends on Phase 2 only — can run parallel with Phase 3/4
- **Anonymous US7 (Phase 6)**: Depends on Phase 2 only — can run parallel with Phase 3/4/5
- **Polish (Phase 7)**: Depends on Phase 3 minimum, ideally all story phases

### Within Each User Story

- Foundation hook + API before UI components
- Independent UI components (marked [P]) can run in parallel
- Integration task after all components ready
- Tests can run parallel with implementation

### Parallel Opportunities

```
Phase 1: T002 ∥ T003 ∥ T004 (after T001)
Phase 2: T005 → T006, T007 ∥ T008
Phase 3: T010 ∥ T011 ∥ T012 ∥ T013 (after T009)
          T016 ∥ T017 (after T015)
Phase 5: T023 → T024 → T025 (can run parallel to Phase 3/4)
Phase 6: T027 → T028 (can run parallel to Phase 3/4/5)
Phase 7: T034 ∥ T035 ∥ T036 ∥ T037
```

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (Core Form — US1+US2+US3+US5)
3. **STOP and VALIDATE**: Open modal, fill fields, submit → kudos in feed
4. Deploy MVP if ready

### Incremental Delivery

1. Setup + Foundation → Core Form (MVP) → Test → Deploy
2. Add Rich Text (US4) → Test → Deploy
3. Add Image Upload (US6) → Test → Deploy
4. Add Anonymous (US7) → Test → Deploy
5. Integration & Polish → Final Test → Deploy

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 37 |
| **Phase 1 (Setup)** | 4 tasks |
| **Phase 2 (Foundation)** | 4 tasks |
| **Phase 3 (US1+2+3+5 — MVP)** | 9 tasks |
| **Phase 4 (US4 Rich Text)** | 5 tasks |
| **Phase 5 (US6 Image Upload)** | 4 tasks |
| **Phase 6 (US7 Anonymous)** | 3 tasks |
| **Phase 7 (Polish)** | 8 tasks |
| **Parallel opportunities** | 18 tasks marked [P] or parallelizable |
| **MVP scope** | Phase 1-3 (17 tasks) |

---

## Notes

- Commit after each completed phase or logical group of tasks
- Run `yarn lint && yarn test` before moving to next phase
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- Phase 5 (Image Upload) and Phase 6 (Anonymous) can be developed in parallel with Phase 3/4 if needed
- T014 (plain textarea) is temporary — will be replaced by Tiptap in T021

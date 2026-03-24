# Feature Specification: Viết Kudo (Write Kudos Modal)

**Frame ID**: `520:11602`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/6398
**Created**: 2026-03-23
**Status**: Reviewed

---

## Overview

Modal dialog cho phép người dùng viết và gửi lời cảm ơn (Kudos) đến đồng đội trong hệ thống SAA 2025. Modal bao gồm form nhập liệu với các trường: người nhận, danh hiệu, nội dung có rich text editor, hashtag, ảnh đính kèm, và tùy chọn gửi ẩn danh.

---

## User Scenarios & Testing

### User Story 1 - Gửi Kudos cơ bản (Priority: P1)

Người dùng muốn gửi lời cảm ơn đến một đồng đội với nội dung text, hashtag và danh hiệu.

**Why this priority**: Đây là chức năng cốt lõi — không có nó thì toàn bộ hệ thống Kudos không hoạt động.

**Independent Test**: Mở modal, điền đủ các trường bắt buộc (Người nhận, Danh hiệu, Nội dung, Hashtag), nhấn Gửi, xác nhận kudos xuất hiện trong feed.

**Acceptance Scenarios**:

1. **Given** modal đang mở và form trống, **When** user điền đủ Người nhận + Danh hiệu + Nội dung + ít nhất 1 Hashtag rồi nhấn "Gửi", **Then** hệ thống lưu kudos vào DB, đóng modal, hiển thị kudos mới trong feed
2. **Given** modal đang mở, **When** user nhấn "Gửi" mà chưa điền đủ các trường bắt buộc, **Then** nút "Gửi" bị disabled, không gửi được
3. **Given** modal đang mở và đã điền dữ liệu, **When** user nhấn "Hủy", **Then** modal đóng, không lưu dữ liệu

---

### User Story 2 - Tìm và chọn người nhận (Priority: P1)

Người dùng cần tìm kiếm và chọn đồng đội từ danh sách nhân viên.

**Why this priority**: Trường bắt buộc, không thể gửi kudos nếu không chọn được người nhận.

**Independent Test**: Gõ tên vào ô "Tìm kiếm", xác nhận dropdown hiển thị kết quả phù hợp, chọn một người.

**Acceptance Scenarios**:

1. **Given** modal mở với trường Người nhận trống, **When** user gõ ít nhất 2 ký tự vào ô tìm kiếm, **Then** dropdown hiển thị danh sách gợi ý khớp với từ khóa (autocomplete, tối đa 10 kết quả). Nếu gõ < 2 ký tự thì không gọi API.
2. **Given** dropdown đang hiển thị kết quả, **When** user click vào một tên, **Then** tên đó được điền vào trường Người nhận (hiển thị avatar + name), dropdown đóng
3. **Given** trường Người nhận trống, **When** user cố gắng submit, **Then** trường hiển thị viền đỏ và thông báo lỗi
4. **Given** dropdown đang hiển thị kết quả, **When** danh sách chứa chính user hiện tại, **Then** tên user bị loại khỏi kết quả (không cho phép chọn chính mình). Nếu server trả về, client-side phải filter ra.

---

### User Story 3 - Nhập danh hiệu cho người nhận (Priority: P1)

Người dùng cần đặt một danh hiệu (tiêu đề) cho lời cảm ơn.

**Why this priority**: Trường bắt buộc, danh hiệu hiển thị làm tiêu đề Kudos.

**Independent Test**: Gõ danh hiệu vào ô, xác nhận nó hiển thị trong kudo đã gửi.

**Acceptance Scenarios**:

1. **Given** modal mở, **When** user nhập text vào trường Danh hiệu, **Then** text được lưu và sẽ hiển thị làm tiêu đề Kudos (ví dụ: "Người truyền động lực cho tôi")
2. **Given** trường Danh hiệu trống, **When** user cố submit, **Then** hiển thị validation error
3. **Given** user đang nhập Danh hiệu, **When** nội dung vượt 100 ký tự, **Then** không cho phép nhập thêm (maxlength)

---

### User Story 4 - Soạn nội dung với rich text (Priority: P2)

Người dùng muốn viết lời cảm ơn với định dạng rich text (bold, italic, gạch ngang, list, link, quote).

**Why this priority**: Nâng cao trải nghiệm nhưng không chặn tính năng chính.

**Independent Test**: Bôi đen text, nhấn Bold/Italic/etc., xác nhận định dạng được áp dụng.

**Acceptance Scenarios**:

1. **Given** textarea có nội dung, **When** user chọn text và nhấn nút Bold (B), **Then** text được in đậm
2. **Given** textarea có nội dung, **When** user chọn text và nhấn nút Italic (I), **Then** text được in nghiêng
3. **Given** textarea có nội dung, **When** user chọn text và nhấn nút Strikethrough (S), **Then** text được gạch ngang
4. **Given** textarea, **When** user nhấn nút Numbered list, **Then** tạo danh sách đánh số
5. **Given** textarea, **When** user nhấn nút Link, **Then** mở dialog nhập URL
6. **Given** textarea, **When** user nhấn nút Quote, **Then** tạo khối trích dẫn
7. **Given** textarea, **When** user gõ "@" + tên, **Then** hiển thị gợi ý tên đồng nghiệp (mention)

---

### User Story 5 - Chọn Hashtag (Priority: P1)

Người dùng cần gắn ít nhất 1 hashtag cho Kudos (bắt buộc, tối đa 5).

**Why this priority**: Trường bắt buộc, hashtag dùng để phân loại và filter Kudos.

**Independent Test**: Click "+ Hashtag", chọn từ dropdown, xác nhận chip hiển thị, xóa chip.

**Acceptance Scenarios**:

1. **Given** modal mở, **When** user click "+ Hashtag", **Then** dropdown danh sách hashtag mở ra
2. **Given** dropdown mở, **When** user chọn một hashtag, **Then** chip mới hiển thị bên cạnh, dropdown đóng
3. **Given** đã có 5 hashtag, **When** user cố thêm, **Then** nút "+ Hashtag" bị ẩn
4. **Given** có hashtag chip, **When** user click "x" trên chip, **Then** hashtag bị xóa
5. **Given** không có hashtag nào, **When** user cố submit, **Then** hiển thị validation error

---

### User Story 6 - Đính kèm ảnh (Priority: P2)

Người dùng muốn đính kèm ảnh cho lời cảm ơn (tùy chọn, tối đa 5 ảnh).

**Why this priority**: Tính năng bổ sung, không bắt buộc.

**Independent Test**: Click "+ Image", chọn file, xác nhận thumbnail hiển thị, xóa ảnh.

**Acceptance Scenarios**:

1. **Given** modal mở, **When** user click "+ Image", **Then** mở file picker
2. **Given** file picker mở, **When** user chọn ảnh hợp lệ, **Then** thumbnail ảnh hiển thị kèm nút "x"
3. **Given** đã có 5 ảnh, **When** quan sát, **Then** nút "+ Image" bị ẩn
4. **Given** có thumbnail ảnh, **When** user click "x", **Then** ảnh bị xóa khỏi danh sách

---

### User Story 7 - Gửi ẩn danh (Priority: P3)

Người dùng muốn gửi lời cảm ơn ẩn danh.

**Why this priority**: Tính năng phụ, ít người dùng.

**Independent Test**: Tick checkbox ẩn danh, gửi kudos, xác nhận kudos không hiển thị tên người gửi.

**Acceptance Scenarios**:

1. **Given** modal mở, **When** user tick checkbox "Gửi lời cám ơn và ghi nhận ẩn danh", **Then** hiển thị thêm input field bên dưới checkbox, kudos sẽ được gửi với `is_anonymous = true`
2. **Given** checkbox ẩn danh được tick, **When** user nhìn form, **Then** hiển thị input field với label "Nickname ẩn danh" và ô input (tùy chọn, không bắt buộc). Nếu user nhập nickname, feed hiển thị nickname đó thay cho tên người gửi. Nếu để trống, feed hiển thị "Ẩn danh"
3. **Given** checkbox ẩn danh đã tick, **When** user bỏ tick, **Then** input "Nickname ẩn danh" bị ẩn, giá trị đã nhập bị clear

---

### Edge Cases

- Gửi kudos cho chính mình → Hệ thống PHẢI chặn hoàn toàn: client-side filter user ra khỏi kết quả autocomplete + server-side reject nếu sender_id === receiver_id (return 400)
- Mất kết nối khi đang gửi → Hiển thị thông báo lỗi, cho phép thử lại, KHÔNG clear form
- File ảnh quá lớn (> 5MB) hoặc sai định dạng → Hiển thị lỗi validation inline
- Nội dung chứa XSS/script injection → Sanitize trước khi lưu (server-side DOMPurify hoặc tương đương)
- Session hết hạn khi đang soạn → Redirect về login hoặc hiển thị thông báo
- Double-submit → Disable nút "Gửi" ngay khi nhấn, hiển thị loading spinner
- Nội dung vượt 2000 ký tự (DB constraint) → Hiển thị character counter, chặn submit khi vượt

---

## UI/UX Requirements

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Modal Overlay | - | Nền mờ phía sau modal | Click: đóng modal |
| Modal Container | 520:11647 | Container chính của form | - |
| Title (A) | I520:11647;520:9870 | "Gửi lời cám ơn và ghi nhận đến đồng đội" | Readonly |
| Người nhận (B) | I520:11647;520:9871 | Search dropdown chọn người nhận | Type: autocomplete, Click: chọn |
| Danh hiệu | - | Input text cho danh hiệu | Type: nhập text |
| Rich Text Toolbar (C) | I520:11647;520:9877 | 6 nút: B, I, S, List, Link, Quote | Click: toggle format |
| Community Standards Link (C.1) | - | Link "Tiêu chuẩn cộng đồng" trên toolbar | Click: mở trang rules/guidelines |
| Textarea (D) | I520:11647;520:9886 | Ô nhập lời cảm ơn | Type: nhập text, @mention |
| Hint (D.1) | I520:11647;520:9887 | "Bạn có thể '@+tên'..." | Readonly |
| Hashtag (E) | I520:11647;520:9890 | Label + chips + nút thêm | Click: thêm/xóa hashtag |
| Image Upload (F) | I520:11647;520:9896 | Thumbnails + nút thêm | Click: upload/xóa ảnh |
| Anonymous Checkbox (G) | I520:11647;520:14099 | Checkbox "Gửi lời cám ơn và ghi nhận ẩn danh" | Click: toggle, hiển thị/ẩn G.1 |
| Anonymous Nickname (G.1) | - | Label "Nickname ẩn danh" + text input (ẩn khi checkbox G chưa tick) | Type: nhập nickname (optional) |
| Cancel (H.1) | I520:11647;520:9906 | Nút "Hủy" + icon X | Click: đóng modal |
| Submit (H.2) | I520:11647;520:9907 | Nút "Gửi" + icon send | Click: submit form |

### Navigation Flow

- **From**: Kudos Live Board page → Click nút "Viết KUDOS" (FAB) hoặc click vào input bar hero
- **To**: Modal overlay mở trên trang hiện tại
- **Close**: Click "Hủy", click overlay, hoặc nhấn Escape
- **After Submit**: Modal đóng, feed refresh hiển thị kudos mới

### Visual Requirements

- **Responsive**: Modal centered trên desktop, full-width trên mobile
- **Animation**: Fade-in overlay + slide-up modal khi mở, reverse khi đóng
- **Accessibility**: Focus trap trong modal, Escape đóng modal, labels gắn với inputs, aria-required cho trường bắt buộc
- **Loading States**: Nút "Gửi" hiển thị spinner + disabled khi đang submit; autocomplete hiển thị loading indicator khi đang fetch; image upload hiển thị progress
- **Error States**: Inline validation errors dưới mỗi trường bắt buộc; toast notification cho server errors

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST hiển thị modal với đầy đủ các trường: Người nhận, Danh hiệu, Nội dung, Hashtag, Image, Ẩn danh
- **FR-002**: System MUST validate các trường bắt buộc (Người nhận, Danh hiệu, Nội dung ≤ 2000 chars, Hashtag ≥ 1) trước khi cho phép gửi
- **FR-003**: Users MUST be able to tìm kiếm người nhận bằng autocomplete
- **FR-004**: System MUST giới hạn tối đa 5 hashtag và tối đa 5 ảnh
- **FR-005**: System MUST lưu kudos vào database với đầy đủ metadata (sender, receiver, content, hashtags, images, is_anonymous, created_at)
- **FR-006**: System MUST disable nút "Gửi" khi form chưa hợp lệ
- **FR-007**: System MUST hiển thị rich text toolbar với 6 công cụ: Bold, Italic, Strikethrough, Numbered list, Link, Quote
- **FR-008**: System MUST hỗ trợ @mention trong nội dung
- **FR-009**: System MUST hiển thị "Tiêu chuẩn cộng đồng" link trên toolbar
- **FR-010**: System MUST chặn user gửi kudos cho chính mình (cả client-side và server-side)
- **FR-011**: System MUST hiển thị loading state (spinner trên nút Gửi) khi đang submit và prevent double-submit
- **FR-012**: System MUST hiển thị character counter cho nội dung (tối đa 2000 ký tự)

### Technical Requirements

- **TR-001**: Modal MUST render trong < 100ms sau khi trigger
- **TR-002**: Tất cả input MUST được sanitize trên cả client và server (XSS prevention)
- **TR-003**: Image upload MUST validate file type (jpg, png, gif, webp) và kích thước (< 5MB per file)
- **TR-004**: API MUST verify authentication trước khi xử lý
- **TR-005**: All user-facing text MUST sử dụng i18n translation system (`useI18n` / `t()`) — không hardcode text
- **TR-006**: Rich text editor MUST compatible với Next.js 15 App Router (client component) — recommend Tiptap

### Key Entities

- **Kudos**: id, sender_id, receiver_id, content (HTML, max 2000 chars), hashtags[], images[] (max 5), media_type, hearts_count, created_at
  - **⚠️ MIGRATION REQUIRED**: Current DB schema (`20260321100000_create_kudos.sql`) is missing:
    - `title text not null` — danh hiệu/tiêu đề kudos
    - `is_anonymous boolean not null default false` — flag gửi ẩn danh
    - `anonymous_name text` — tên hiển thị ẩn danh (optional)
  - **⚠️ TYPE UPDATE REQUIRED**: `src/types/kudos.ts` Kudos interface needs `title`, `is_anonymous`, `anonymous_name` fields
- **Profile**: id, name, email, avatar_url, department_id
- **Hashtag**: id, name

---

## API Dependencies

| Endpoint | Method | Purpose | Status | Notes |
|----------|--------|---------|--------|-------|
| /api/users/search | GET | Autocomplete tìm kiếm người nhận | Exists | `?q=keyword`, min 2 chars, max 10 results |
| /api/hashtags | GET | Lấy danh sách hashtag | Exists | Returns all hashtags ordered by name |
| /api/kudos | POST | Gửi kudos mới | **New** | ⚠️ Only GET exists — POST must be created |
| /api/upload/images | POST | Upload ảnh đính kèm | **New** | Supabase Storage, max 5MB per file |

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: User có thể gửi kudos thành công trong < 3 interactions (mở modal → điền form → gửi)
- **SC-002**: Form validation phải chặn 100% submission thiếu trường bắt buộc
- **SC-003**: Kudos mới xuất hiện trong feed ngay sau khi gửi (realtime hoặc refresh)

---

## Out of Scope

- Chỉnh sửa/xóa kudos đã gửi (future feature)
- Draft/auto-save nội dung đang soạn
- Media types khác ngoài image (video, GIF animation)
- @mention notification push

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Design style document (`.momorph/specs/520:11602-Viet-Kudo/design-style.md`) — pending generation
- [x] Related screen: Sun* Kudos Live Board (`.momorph/specs/2940:13431-Sun-Kudos-Live-board/`)
- [x] API endpoints: `/api/users/search` (GET), `/api/hashtags` (GET) exist
- [ ] API endpoint: `POST /api/kudos` — needs to be created (only GET exists)
- [ ] API endpoint: `POST /api/upload/images` — needs to be created
- [ ] DB migration: `title`, `is_anonymous`, `anonymous_name` columns need to be added to `kudos` table
- [ ] TypeScript type: `Kudos` interface needs `title`, `is_anonymous`, `anonymous_name` fields

---

## Notes

- Modal mở từ 2 entry points: FAB "Viết KUDOS" và input bar trong Hero section
- "Danh hiệu" field trong Figma nằm giữa Người nhận và rich text editor — đây là tiêu đề custom cho Kudos (ví dụ: "Người truyền động lực cho tôi")
- Rich text editor cần thư viện hỗ trợ (e.g., Tiptap, Slate) — cần đánh giá compatibility với Cloudflare Workers
- "Tiêu chuẩn cộng đồng" link trên toolbar dẫn đến trang rules/guidelines
- Checkbox ẩn danh khi bật sẽ hiển thị thêm input field với label "Nickname ẩn danh" — giá trị optional, lưu vào DB column `anonymous_name`

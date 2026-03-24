# Feature Specification: Hệ thống giải thưởng SAA 2025

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-19
**Status**: Reviewed

---

## Overview

Trang "Hệ thống giải thưởng SAA 2025" hiển thị thông tin chi tiết về toàn bộ hệ thống giải thưởng Sun* Annual Awards 2025. Trang bao gồm:
- **Keyvisual** (banner chính) với artwork và tiêu đề chiến dịch "ROOT FURTHER"
- **Tiêu đề hệ thống giải** với phụ đề "Sun* Annual Awards 2025"
- **Menu điều hướng bên trái** (sticky) liệt kê 6 hạng mục giải
- **6 thẻ giải thưởng** hiển thị thông tin chi tiết từng giải: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP
- **Phần Sun* Kudos** giới thiệu phong trào ghi nhận với nút CTA
- **Footer** với navigation links và copyright

Người dùng mục tiêu: Nhân viên Sun* (đã đăng nhập) muốn tìm hiểu về các hạng mục giải thưởng SAA 2025.

**Layout đặc biệt**: Các thẻ giải thưởng có layout **xen kẽ** (alternating) — thẻ lẻ (1, 3, 5) có ảnh bên trái, thẻ chẵn (2, 4, 6) có ảnh bên phải.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem thông tin hệ thống giải thưởng (Priority: P1)

Người dùng truy cập trang "Hệ thống giải thưởng" để xem tổng quan tất cả hạng mục giải SAA 2025, bao gồm tên giải, mô tả, số lượng giải thưởng và giá trị giải thưởng.

**Why this priority**: Đây là mục đích chính của trang - cung cấp thông tin giải thưởng cho nhân viên.

**Independent Test**: Truy cập trang, xác nhận hiển thị đầy đủ 6 thẻ giải thưởng với thông tin chính xác.

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập, **When** truy cập trang "Award Information", **Then** hiển thị Keyvisual banner, tiêu đề "Hệ thống giải thưởng SAA 2025", và danh sách 6 thẻ giải thưởng.
2. **Given** trang đã tải xong, **When** người dùng cuộn xuống, **Then** từng thẻ giải thưởng hiển thị đầy đủ: ảnh biểu tượng, tiêu đề, mô tả, số lượng giải thưởng (số + đơn vị), giá trị giải thưởng (VNĐ + ghi chú).
3. **Given** trang hiển thị, **When** kiểm tra dữ liệu từng giải, **Then** thông tin khớp:
   - Top Talent: 10 giải (Đơn vị), 7.000.000 VNĐ/giải
   - Top Project: 02 giải (Tập thể), 15.000.000 VNĐ/giải
   - Top Project Leader: 03 giải (Cá nhân), 7.000.000 VNĐ/giải
   - Best Manager: 01 giải (Cá nhân), 10.000.000 VNĐ
   - Signature 2025 - Creator: 01 giải, 5.000.000 VNĐ (cá nhân) / 8.000.000 VNĐ (tập thể)
   - MVP: 01 giải, 15.000.000 VNĐ

---

### User Story 2 - Điều hướng nhanh qua menu bên trái (Priority: P1)

Người dùng sử dụng menu điều hướng bên trái để nhảy nhanh tới từng hạng mục giải thưởng thay vì cuộn toàn bộ trang.

**Why this priority**: Menu điều hướng là tính năng tương tác chính, giúp người dùng truy cập nhanh thông tin cần thiết trên trang dài.

**Independent Test**: Click từng mục trong menu, xác nhận trang cuộn tới thẻ giải tương ứng.

**Acceptance Scenarios**:

1. **Given** trang đã hiển thị với menu bên trái có 6 mục, **When** người dùng click vào "Top Project", **Then** trang cuộn mượt tới phần thẻ "Top Project" và mục "Top Project" trong menu chuyển sang trạng thái active (màu vàng + underline).
2. **Given** mục "Top Talent" đang active, **When** người dùng click "MVP", **Then** mục "Top Talent" mất active, "MVP" trở thành active, và trang cuộn tới phần MVP.
3. **Given** người dùng hover vào một mục menu, **When** chưa click, **Then** mục được highlight.
4. **Given** người dùng đang ở phần Top Talent, **When** cuộn xuống qua phần Top Project, **Then** menu tự động cập nhật active state sang "Top Project" (scroll spy).
5. **Given** trên desktop, **When** người dùng cuộn trang, **Then** menu bên trái giữ vị trí sticky, luôn hiển thị trong viewport.

---

### User Story 3 - Xem và truy cập Sun* Kudos (Priority: P2)

Người dùng xem phần giới thiệu "Sun* Kudos" (phong trào ghi nhận) ở cuối trang và có thể truy cập trang chi tiết.

**Why this priority**: Đây là tính năng phụ liên kết tới trang khác, không phải nội dung chính của trang giải thưởng.

**Independent Test**: Cuộn tới cuối trang, xác nhận hiển thị phần Sun* Kudos và nút "Chi tiết" hoạt động.

**Acceptance Scenarios**:

1. **Given** người dùng cuộn tới cuối danh sách giải thưởng, **When** phần Sun* Kudos hiển thị, **Then** thấy tiêu đề "Phong trào ghi nhận", tên "Sun* Kudos", mô tả ngắn, logo, và nút "Chi tiết".
2. **Given** phần Sun* Kudos hiển thị, **When** người dùng click nút "Chi tiết", **Then** điều hướng tới trang chi tiết Sun* Kudos.
3. **Given** người dùng hover nút "Chi tiết", **When** hover, **Then** nút có hiệu ứng nổi nhẹ.

---

### User Story 4 - Responsive trên các thiết bị (Priority: P2)

Trang hiển thị chính xác trên mobile, tablet và desktop.

**Why this priority**: Đảm bảo trải nghiệm nhất quán trên mọi thiết bị, theo constitution responsive-first.

**Independent Test**: Kiểm tra trang ở 3 breakpoint (320px, 768px, 1024px+).

**Acceptance Scenarios**:

1. **Given** truy cập trên desktop (>= 1024px), **When** trang tải, **Then** hiển thị layout 2 cột: menu bên trái + thẻ giải bên phải, mỗi thẻ có ảnh bên trái + nội dung bên phải.
2. **Given** truy cập trên mobile (< 768px), **When** trang tải, **Then** menu điều hướng ẩn hoặc chuyển thành horizontal scroll, thẻ giải chuyển sang layout 1 cột (ảnh trên, nội dung dưới).
3. **Given** truy cập trên tablet (768px - 1023px), **When** trang tải, **Then** layout điều chỉnh phù hợp, nội dung không bị tràn hoặc cắt.

---

### User Story 5 - Keyboard Navigation & Accessibility (Priority: P3)

Người dùng sử dụng bàn phím hoặc screen reader để điều hướng trang.

**Why this priority**: Đảm bảo WCAG AA compliance theo constitution.

**Independent Test**: Dùng Tab/Enter để navigate menu và CTA button.

**Acceptance Scenarios**:

1. **Given** focus đang ở menu, **When** nhấn Tab, **Then** focus di chuyển qua từng mục menu theo thứ tự.
2. **Given** focus đang ở một mục menu, **When** nhấn Enter, **Then** trang cuộn tới section tương ứng.
3. **Given** screen reader đang đọc trang, **When** gặp ảnh giải thưởng, **Then** đọc alt text mô tả giải (VD: "Biểu tượng giải Top Talent").

---

### Edge Cases

- Khi trang tải lâu, cần hiển thị loading state cho keyvisual và thẻ giải.
- Nếu ảnh giải thưởng không tải được, hiển thị placeholder phù hợp với alt text.
- Khi cuộn nhanh giữa các mục menu, animation cuộn không bị conflict (debounce scroll spy).
- Menu bên trái cần sticky khi cuộn trang (chỉ trên desktop).
- Khi URL có hash fragment (VD: `/awards#mvp`), trang phải cuộn tới section tương ứng khi load.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Keyvisual | 313:8437 | Banner chính 1440x547px với artwork "ROOT FURTHER" | Tĩnh, không interactive |
| Title Section | 313:8453 | Tiêu đề "Hệ thống giải thưởng SAA 2025" + phụ đề | Tĩnh |
| Menu List | 313:8459 | Menu điều hướng dọc bên trái, 6 mục | Click → scroll to section, Hover → highlight |
| Award Card - Top Talent | 313:8467 | Thẻ giải: ảnh 336x336 + nội dung (tiêu đề, mô tả, số lượng, giá trị) | Tĩnh |
| Award Card - Top Project | 313:8468 | Tương tự Top Talent | Tĩnh |
| Award Card - Top Project Leader | 313:8469 | Tương tự Top Talent | Tĩnh |
| Award Card - Best Manager | 313:8470 | Tương tự Top Talent | Tĩnh |
| Award Card - Signature 2025 | 313:8471 | Tương tự nhưng cao hơn (~1047px): có **2 dòng giá trị** — cá nhân (5M) và tập thể (8M). Xem design-style.md "Signature 2025 Variant" | Tĩnh |
| Award Card - MVP | 313:8510 | Tương tự Top Talent | Tĩnh |
| Sun* Kudos Section | 335:12023 | Khối quảng bá Sun* Kudos với nút CTA | Click nút "Chi tiết" → mở trang Kudos |
| Footer | 354:4323 | Footer bar với logo, nav links (About SAA 2025, Award Information, Sun* Kudos, Tiêu chuẩn chung), copyright | Click nav link → navigate |

### Navigation Flow

- From: Homepage hoặc Header "Award Information" tab (active state với underline vàng), direct URL `/awards`
- To: Sun* Kudos page (qua nút "Chi tiết" hoặc footer link), Tiêu chuẩn chung (qua footer link)
- Deep link: Hỗ trợ hash fragment `/awards#top-talent`, `/awards#mvp`, v.v.
- Triggers:
  - Click menu item bên trái → cuộn tới section tương ứng
  - Click nút "Chi tiết" → điều hướng tới trang Sun* Kudos
  - Click footer nav links → navigate tới trang tương ứng

### Visual Requirements

- **Xem chi tiết tại**: `design-style.md`
- Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
- Animations/Transitions: Smooth scroll khi click menu, hover effects trên menu items và nút CTA
- Accessibility: Alt text cho tất cả ảnh giải thưởng, keyboard navigation cho menu, WCAG AA contrast

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST hiển thị đầy đủ 6 thẻ giải thưởng với thông tin chính xác (tên, mô tả, số lượng, giá trị).
- **FR-002**: System MUST cung cấp menu điều hướng bên trái với 6 mục tương ứng 6 giải.
- **FR-003**: Users MUST be able to click menu item để cuộn mượt tới thẻ giải tương ứng.
- **FR-004**: System MUST hiển thị trạng thái active (vàng + underline) cho menu item đang được chọn.
- **FR-005**: System MUST cập nhật menu active state khi người dùng cuộn qua các section (scroll spy).
- **FR-006**: System MUST hiển thị phần Sun* Kudos với nút CTA "Chi tiết" điều hướng tới trang Kudos.
- **FR-007**: System MUST hiển thị Keyvisual banner ở đầu trang.
- **FR-008**: System MUST hiển thị thẻ giải với layout xen kẽ (alternating) — thẻ lẻ: ảnh trái + nội dung phải; thẻ chẵn: nội dung trái + ảnh phải.
- **FR-009**: System MUST hiển thị Footer với logo, navigation links, và copyright.
- **FR-010**: System MUST yêu cầu authentication — redirect về `/login` nếu chưa đăng nhập.
- **FR-011**: System MUST hỗ trợ deep link qua URL hash fragment (VD: `/awards#mvp`).

### Technical Requirements

- **TR-001**: Trang phải tải trong < 3 giây (LCP) trên kết nối 4G.
- **TR-002**: Ảnh giải thưởng cần lazy loading để tối ưu performance.
- **TR-003**: Menu sticky cần sử dụng CSS `position: sticky` thay vì JS.
- **TR-004**: Smooth scroll sử dụng `scroll-behavior: smooth` hoặc `scrollIntoView({ behavior: 'smooth' })`.
- **TR-005**: Phải tương thích Cloudflare Workers (edge-compatible, no Node.js APIs).
- **TR-006**: Scroll spy MUST sử dụng Intersection Observer API (không dùng scroll event listener).
- **TR-007**: Authentication check via Supabase middleware — redirect unauthenticated users to `/login`.
- **TR-008**: Ảnh giải thưởng MUST có alt text descriptive (WCAG AA).
- **TR-009**: Trang SHOULD là Server Component (RSC) vì nội dung chủ yếu static. Menu scroll spy có thể dùng Client Component con.

### Key Entities *(if feature involves data)*

- **AwardCategory**: Hạng mục giải thưởng — tên (`name`), slug (`slug` cho hash fragment), mô tả (`description`), số lượng (`quantity`: number), đơn vị (`unit`: "Cá nhân" | "Tập thể" | "Đơn vị"), giá trị (`prizeValue`: string VNĐ), ghi chú giá trị (`prizeNote`: string), ảnh (`image`: URL), thứ tự (`order`: number, dùng cho alternating layout).
- **KudosInfo**: Thông tin Sun* Kudos — tiêu đề, mô tả, link chi tiết.

### State Management

- **Local state**: `activeAwardId` — ID của giải thưởng đang active trong menu (cập nhật qua scroll spy hoặc click).
- **No global state needed** — trang hiển thị static content, không cần shared state.
- **Loading state**: Skeleton loading cho ảnh giải thưởng (lazy loaded).
- **Error state**: Placeholder image nếu ảnh không tải được.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/award-categories | GET | Lấy danh sách hạng mục giải thưởng (nếu dynamic) | Predicted |
| /api/kudos/info | GET | Lấy thông tin Sun* Kudos section | Predicted |

> **Note**: Dữ liệu giải thưởng có thể là static content (hardcoded) vì ít thay đổi. Nếu static, không cần API.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% thẻ giải thưởng hiển thị đầy đủ thông tin đúng theo design.
- **SC-002**: Menu điều hướng hoạt động chính xác cho tất cả 6 mục (click + scroll spy).
- **SC-003**: Trang responsive hoàn chỉnh ở cả 3 breakpoint (mobile/tablet/desktop).
- **SC-004**: LCP < 3s trên kết nối 4G.

---

## Out of Scope

- Chỉnh sửa thông tin giải thưởng (admin panel)
- Đề cử / bình chọn giải thưởng
- Hiển thị danh sách người được đề cử / người thắng giải
- Nội dung chi tiết trang Sun* Kudos (chỉ hiển thị preview + link)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — có thể không cần nếu dùng static data
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- Dữ liệu giải thưởng SAA 2025 là nội dung ít thay đổi, có thể hardcode hoặc lưu trong config file thay vì database.
- Thẻ giải "Signature 2025 - Creator" có cấu trúc đặc biệt với 2 mức giá trị (cá nhân: 5.000.000 VNĐ, tập thể: 8.000.000 VNĐ).
- Menu bên trái cần sticky behavior và scroll spy - cân nhắc sử dụng Intersection Observer API.
- Header đang ở trạng thái "Award Information" active (underline vàng) - cần đồng bộ với navigation state.

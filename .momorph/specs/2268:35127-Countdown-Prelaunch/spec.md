# Feature Specification: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-19
**Status**: Reviewed

---

## Overview

Trang Prelaunch hiển thị bộ đếm ngược (countdown timer) đến thời điểm sự kiện SAA 2025 bắt đầu. Trang full-screen với background artwork và countdown timer ở trung tâm. Đây là trang hiển thị TRƯỚC khi sự kiện chính thức mở — người dùng đã đăng nhập nhưng sự kiện chưa bắt đầu.

Người dùng mục tiêu: Nhân viên Sun* (đã đăng nhập) truy cập trước thời điểm sự kiện.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem countdown đến sự kiện (Priority: P1)

Người dùng đã đăng nhập truy cập trang và thấy bộ đếm ngược real-time hiển thị số ngày, giờ, phút còn lại đến sự kiện SAA 2025.

**Why this priority**: Đây là mục đích duy nhất của trang — thông báo thời gian còn lại trước sự kiện.

**Independent Test**: Truy cập trang, xác nhận countdown hiển thị đúng với 3 đơn vị (Days, Hours, Minutes) và cập nhật mỗi phút.

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập và sự kiện chưa bắt đầu, **When** truy cập trang prelaunch, **Then** hiển thị full-screen với text "Sự kiện sẽ bắt đầu sau", countdown timer (DAYS, HOURS, MINUTES), và background artwork.
2. **Given** countdown đang hiển thị, **When** 1 phút trôi qua, **Then** giá trị MINUTES giảm 1 (hoặc reset 59 nếu đang ở 00 và HOURS giảm 1).
3. **Given** countdown đang hiển thị "00 DAYS, 00 HOURS, 00 MINUTES", **When** sự kiện bắt đầu, **Then** redirect người dùng đến trang chính (Homepage).

---

### User Story 2 - Redirect khi sự kiện đã bắt đầu (Priority: P1)

Nếu sự kiện đã bắt đầu (countdown hết), người dùng được tự động chuyển đến trang Homepage.

**Why this priority**: Trang prelaunch chỉ có ý nghĩa trước sự kiện — cần redirect khi hết hạn.

**Independent Test**: Set event_date trong quá khứ, truy cập prelaunch → redirect về Homepage.

**Acceptance Scenarios**:

1. **Given** sự kiện đã bắt đầu (event_date < now), **When** người dùng truy cập /prelaunch, **Then** redirect về `/` (Homepage).
2. **Given** người dùng đang ở trang prelaunch, **When** countdown reaches 0, **Then** tự động redirect về `/`.

---

### User Story 3 - Authentication required (Priority: P1)

Trang prelaunch yêu cầu đăng nhập — redirect về /login nếu chưa đăng nhập.

**Why this priority**: Bảo mật — chỉ nhân viên Sun* mới xem được.

**Independent Test**: Truy cập /prelaunch khi chưa đăng nhập → redirect về /login.

**Acceptance Scenarios**:

1. **Given** người dùng chưa đăng nhập, **When** truy cập /prelaunch, **Then** redirect về `/login`.

---

### Edge Cases

- Khi timezone của user khác timezone sự kiện → countdown phải tính theo UTC hoặc timezone sự kiện.
- Khi network mất → countdown vẫn chạy (client-side timer).
- Khi tab bị ẩn (background) → cập nhật lại countdown khi quay lại tab.
- Countdown hiển thị "00" cho mỗi đơn vị khi giá trị là 0.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Background Image | 2268:35129 | Full-screen artwork (hero-bg), cover | Tĩnh |
| Gradient Overlay | 2268:35130 | Dark gradient overlay 18deg | Tĩnh |
| Title Text | 2268:35137 | "Sự kiện sẽ bắt đầu sau" (36px, white, center, **italic**) | Tĩnh |
| Countdown Timer | 2268:35138 | 3 nhóm: DAYS, HOURS, MINUTES | Real-time update mỗi phút |
| Digit Box | 186:2619 (component) | Ô số LED-style: 77x123px, glass morphism | Tĩnh |

### Navigation Flow

- From: Redirect từ middleware khi sự kiện chưa bắt đầu
- To: Homepage `/` khi countdown hết
- No header, no footer — full-screen standalone page

### Visual Requirements

- **Xem chi tiết tại**: `design-style.md`
- Responsive: Countdown phải hiển thị tốt trên mobile/tablet/desktop
- No animations on countdown digits (static LED font, update per minute)
- Accessibility: aria-live region cho countdown, aria-label cho digit boxes

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST hiển thị countdown timer với 3 đơn vị: Days (00-99), Hours (00-23), Minutes (00-59).
- **FR-002**: Countdown MUST cập nhật mỗi 60 giây (hoặc mỗi giây nếu muốn mượt hơn).
- **FR-003**: Mỗi đơn vị MUST hiển thị 2 chữ số (pad leading zero).
- **FR-004**: Mỗi chữ số MUST hiển thị trong ô riêng biệt (digit box) kiểu LED.
- **FR-005**: System MUST redirect về `/` khi countdown reaches 0.
- **FR-006**: System MUST redirect về `/login` nếu chưa đăng nhập.
- **FR-007**: System MUST hiển thị full-screen background artwork với gradient overlay.
- **FR-008**: Trang MUST KHÔNG có header, footer, hoặc navigation — chỉ countdown.

### Technical Requirements

- **TR-001**: Countdown MUST tính dựa trên `event_date` từ Supabase `events` table.
- **TR-002**: Client Component (`"use client"`) cho countdown timer logic.
- **TR-003**: Sử dụng `useCountdown` hook đã có sẵn hoặc tạo variant mới.
- **TR-004**: Tương thích Cloudflare Workers (edge-compatible).
- **TR-005**: Cần font "Digital Numbers" cho hiển thị số LED-style.

### Key Entities

- **Event**: `event_date` (ISO string) — thời điểm sự kiện bắt đầu, lấy từ bảng `events`.

### State Management

- **Local state**: `{ days, hours, minutes, isExpired }` từ useCountdown hook.
- **No global state** — trang standalone, không share state.
- **Loading state**: Có thể hiển thị "00 00 00" trong khi fetch event_date.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase `events` table | SELECT | Lấy event_date cho countdown | Exists |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Countdown hiển thị chính xác so với event_date (sai lệch < 1 phút).
- **SC-002**: Redirect xảy ra trong < 3 giây sau khi countdown hết.
- **SC-003**: Trang responsive ở cả 3 breakpoint.

---

## Out of Scope

- Header / footer / navigation
- Nội dung khác ngoài countdown
- Seconds (giây) trong countdown — chỉ hiện Days, Hours, Minutes
- Sound effects hoặc animation khi countdown hết

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] `events` table exists in Supabase with `event_date` column
- [x] `useCountdown` hook exists (`src/hooks/useCountdown.ts`)

---

## Notes

- Trang này NẰM NGOÀI layout `(main)` — không có Header/Footer. Route: `src/app/(auth)/prelaunch/page.tsx` (reuse `(auth)` group vì không cần shared layout).
- Font "Digital Numbers" cần được load — kiểm tra xem đã có trong project chưa, nếu chưa cần thêm.
- Có thể reuse pattern từ existing `CountdownTimer` component (`src/components/home/CountdownTimer.tsx`) nhưng cần style khác (digit boxes lớn hơn, LED font).
- Background image reuse `hero-bg.png` nhưng với gradient overlay khác (18deg thay vì vertical).

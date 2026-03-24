# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-21
**Status**: Final

---

## Overview

The **Sun* Kudos - Live Board** is the main interactive page of the Sun* Annual Awards 2025 (SAA) Kudos system. It allows Sunners (Sun* employees) to send, view, and interact with kudos (appreciation messages) in real-time. The page features a hero banner, highlighted kudos carousel, a spotlight word-cloud board, a full kudos feed, personal statistics sidebar, and a footer.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Kudos Feed (Priority: P1)

A logged-in Sunner visits the Kudos Live Board to browse all kudos sent during the Sun* Annual Awards 2025 event. They scroll through the feed to read appreciation messages, see attached images, and interact with posts.

**Why this priority**: The kudos feed is the core content of the page. Without it, there is no live board.

**Independent Test**: Load the page and verify the "ALL KUDOS" section renders with kudo cards showing sender, receiver, message, hashtags, hearts, and copy link.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they navigate to the Kudos Live Board, **Then** the "ALL KUDOS" section displays a list of kudo cards with sender info, receiver info, timestamp, hashtag label (e.g., "IDOL GIOI TRE"), message content (max 5 lines with "..." truncation), attached images/videos (max 5), hashtag tags, heart count, and copy link button.
2. **Given** a kudo with more than 5 lines of content, **When** it is displayed, **Then** the content is truncated at 5 lines with "..." at the end. Clicking the card navigates to the full kudo detail page.
3. **Given** a kudo card, **When** the user clicks the sender/receiver avatar or name, **Then** they are navigated to that person's profile page.
4. **Given** a kudo card, **When** the user hovers on the sender/receiver avatar or name, **Then** a profile preview popup is shown.
5. **Given** the ALL KUDOS feed, **When** the user scrolls to the bottom, **Then** the next page of kudos is loaded (infinite scroll pagination — continues until all kudos in the database are loaded).
6. **Given** a kudo card with a video attachment, **When** the user clicks the play button overlay, **Then** the video plays inline or opens a video player.
7. **Given** a hashtag tag on a kudo card (e.g., "#Dedicated"), **When** the user clicks it, **Then** the feed is filtered to show only kudos with that hashtag.

---

### User Story 2 - Highlight Kudos Carousel (Priority: P1)

A Sunner views the top 5 most-hearted kudos in a carousel format, with filtering by hashtag and department.

**Why this priority**: Highlight kudos showcase the most appreciated messages, driving engagement and recognition.

**Independent Test**: Verify the carousel displays 5 highlighted kudo cards with navigation arrows and pagination indicator (e.g., "2/5").

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** the page loads, **Then** the "HIGHLIGHT KUDOS" section shows a carousel of the top 5 kudos with the most hearts.
2. **Given** the carousel is on page 1, **When** the user clicks the "back" button, **Then** the button is disabled.
3. **Given** the carousel is on page 5, **When** the user clicks the "forward" button, **Then** the button is disabled.
4. **Given** the carousel, **When** the user clicks the forward/back arrows, **Then** the carousel slides to the next/previous card and the page indicator updates (e.g., "2/5" -> "3/5").
5. **Given** the Hashtag filter dropdown, **When** the user selects a hashtag, **Then** the highlighted kudos are filtered to only show kudos with that hashtag.
6. **Given** the "Phong ban" (Department) filter dropdown, **When** the user selects a department, **Then** the highlighted kudos are filtered by that department.
7. **Given** a highlight kudo card, **When** the user clicks "Xem chi tiet" (View detail), **Then** they navigate to the full kudo detail page.
8. **Given** a highlight kudo card, **When** the user clicks "Copy Link", **Then** the kudo URL is copied to clipboard with a toast confirmation.

---

### User Story 3 - Send a Kudos (Priority: P1)

A Sunner wants to send a kudo (appreciation message) to a colleague. They click the input bar in the hero section to open the kudos creation dialog.

**Why this priority**: Sending kudos is the primary action that drives the entire system.

**Independent Test**: Click the "Ghi nhan" input bar and verify it opens the kudos creation dialog/form.

**Acceptance Scenarios**:

1. **Given** a logged-in user on the Kudos Live Board, **When** they click the pill-shaped input bar (left side, with pen icon and placeholder "Hom nay, ban muon gui loi cam on va ghi nhan den ai?"), **Then** the kudos creation dialog opens.
2. **Given** the kudos creation dialog, **When** the user submits a valid kudos, **Then** the kudos is saved to the database and appears in the feed.
3. **Given** a logged-in user, **When** they click the search area (right side, with magnifying glass icon and "Tim kiem profile Sunner" text), **Then** a profile search interface opens.

---

### User Story 4 - Heart/Like a Kudos (Priority: P2)

A Sunner wants to show appreciation for a kudos by clicking the heart button on a card.

**Why this priority**: Hearts are the engagement metric that determines highlight ranking and drives user interaction.

**Independent Test**: Click the heart button on a kudo card and verify the count increments and icon changes color.

**Acceptance Scenarios**:

1. **Given** a kudo card the user has NOT hearted, **When** the user clicks the heart icon, **Then** the heart icon turns red, the count increments by 1.
2. **Given** a kudo card the user HAS already hearted, **When** the user clicks the heart icon, **Then** the heart icon turns gray, the count decrements by 1.
3. **Given** a kudo card sent by the current user, **When** they click the heart icon, **Then** the heart is toggled normally (users CAN heart their own kudos).

---

### User Story 5 - View Personal Statistics (Priority: P2)

A Sunner views their personal kudos statistics in the right sidebar.

**Why this priority**: Personal stats gamify the experience and encourage participation.

**Independent Test**: Verify the sidebar shows 5 stat rows with correct labels and values fetched from the user's data, plus the "Mo Secret Box" button.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** the page loads, **Then** the right sidebar displays these stats:
   - So Kudos ban nhan duoc: [number]
   - So Kudos ban da gui: [number]
   - So tim ban nhan duoc: [number] (with heart icon)
   - --- divider ---
   - So Secret Box ban da mo: [number]
   - So Secret Box chua mo: [number]
2. **Given** the sidebar, **When** the user clicks "Mo Secret Box" button (with gift icon), **Then** the Secret Box dialog opens (navigates to "Open secret box" screen).
3. **Given** the sidebar stats, **When** new kudos/hearts are received, **Then** the stats update in real-time.

---

### User Story 6 - Spotlight Board (Priority: P2)

A Sunner views the interactive Spotlight Board showing a word-cloud/diagram of kudos recipients.

**Why this priority**: The spotlight board provides a visual, engaging overview of kudos activity.

**Independent Test**: Verify the Spotlight section renders with a total kudos count (e.g., "388 KUDOS"), a search bar, pan/zoom controls, and the word-cloud visualization.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** the page loads, **Then** the "SPOTLIGHT BOARD" section displays the total kudos count and an interactive word-cloud of recipient names.
2. **Given** the Spotlight search bar, **When** the user types a Sunner name, **Then** the board highlights/filters to that person.
3. **Given** the pan/zoom control, **When** the user clicks it, **Then** the board toggles between pan and zoom modes.

---

### User Story 7 - Copy Kudos Link (Priority: P3)

A Sunner wants to share a specific kudos by copying its URL.

**Why this priority**: Nice-to-have sharing feature.

**Independent Test**: Click "Copy Link" on a kudo card and verify the URL is copied to clipboard with a toast notification.

**Acceptance Scenarios**:

1. **Given** a kudo card, **When** the user clicks "Copy Link", **Then** the URL is copied to clipboard and a toast shows "Link copied - ready to share!".

---

### User Story 8 - View 10 Sunners Who Recently Received Gifts (Priority: P3)

A Sunner views the "10 SUNNER NHAN QUA MOI NHAT" list on the sidebar.

**Why this priority**: Secondary informational feature to boost excitement around gifts.

**Independent Test**: Verify the sidebar shows a list of 10 sunners with avatar, name, and gift description.

**Acceptance Scenarios**:

1. **Given** the sidebar, **When** the page loads, **Then** the "10 SUNNER NHAN QUA MOI NHAT" section displays up to 10 entries with avatar, name, and gift description.
2. **Given** a sunner entry, **When** the user clicks on the name/avatar, **Then** they navigate to that sunner's profile.
3. **Given** a new gift is received by a Sunner, **When** the event occurs, **Then** the list updates in real-time via Supabase Realtime.

---

### Edge Cases

- What happens when there are fewer than 5 highlight kudos? The carousel adjusts pagination accordingly (e.g., "1/3").
- What happens when there are 0 highlight kudos? Show an empty state message in place of the carousel.
- What happens when a kudo has no hashtags? The hashtag area is hidden.
- What happens when a kudo has no attached images/videos? The media gallery area is hidden.
- What happens when a video fails to load? Show a placeholder thumbnail with "Video khong the tai" and retry icon.
- What happens when a user rapidly hearts/unhearts? Debounce the API call (300ms), use the latest optimistic state.
- How does the system handle real-time updates? New kudos should appear at the top of the feed (real-time via Supabase).
- What happens when the user has 0 Secret Boxes? The "Mo Secret Box" button should be disabled with reduced opacity.
- What happens when Spotlight has no data? Show an empty state with "No kudos yet" message.
- What happens when filters return no results? Show "Khong co ket qua" (No results) message.
- What happens when the user is not authenticated? Redirect to login page (middleware handles this).
- What happens when the API fails to load? Show a retry-able error state per section (not full-page crash).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| KV Kudos (Hero Banner) | Hero section with title "He thong ghi nhan va cam on", KUDOS logo, decorative background | Read-only display |
| Button ghi nhan | Pill-shaped input bar with placeholder text and pen icon | Click: opens kudos creation dialog |
| Search Bar (Hero) | "Tim kiem profile Sunner" search field (right side of hero input area) | Type: search for Sunner profiles |
| Highlight Kudos Section | Carousel of top 5 most-hearted kudos | Navigate with arrows, filter by hashtag/department |
| Hashtag Filter Dropdown | Dropdown to filter by hashtag | Click: opens dropdown, select: filters content |
| Phong ban Filter Dropdown | Dropdown to filter by department | Click: opens dropdown, select: filters content |
| Carousel Navigation | Left/right arrows + page indicator (e.g., "2/5") | Click: navigate carousel |
| KUDO Highlight Card | Card with sender/receiver info, content, hashtags, hearts, actions | Click avatar: open profile, hover: preview |
| Spotlight Board | Interactive word-cloud/diagram of kudos recipients | Pan/zoom, search |
| ALL KUDOS Feed | Vertical list of kudo post cards | Scroll, interact with individual cards |
| KUDO Post Card | Full kudo card with sender, receiver, timestamp, content, images, hashtags, hearts, copy link | Click heart, click copy link, click avatar |
| Statistics Sidebar | Personal stats (kudos sent/received, hearts, secret boxes) | Click "Mo Secret Box" button |
| 10 Sunner Nhan Qua | List of 10 recent gift recipients | Click name/avatar: navigate to profile |
| Footer | Copyright and navigation links | Click links: navigate |

### Navigation Flow

- From: Login page / Homepage (SAA)
- To: Profile page (click avatar/name), Kudos creation dialog (click input bar), Secret Box dialog (click "Mo Secret Box"), Dropdown Hashtag filter, Dropdown Phong ban
- Triggers: User clicks on interactive elements listed above

### Visual Requirements

- Responsive breakpoints: Desktop (1440px design), Tablet (768px+), Mobile (320px+)
- Dark theme: Primary background `rgba(0, 16, 26, 1)` (#00101A)
- Gold accent theme: Primary text `#FFEA9E`, borders `#998C5F`
- Animations/Transitions: Carousel slide transition, hover states on cards, tooltip on avatar hover

> **See [design-style.md](./design-style.md) for complete visual specifications.**

### Accessibility Requirements

- Color contrast: Gold text (#FFEA9E) on dark background (#00101A) meets WCAG AA (contrast ratio ~14:1)
- Keyboard navigation: All interactive elements (buttons, cards, carousel arrows, dropdowns) MUST be reachable via Tab key
- Carousel: Arrow keys SHOULD navigate between cards when carousel is focused
- Screen reader: Section headings MUST use semantic HTML (h2/h3). Kudo cards MUST have `aria-label` describing sender/receiver. Heart button MUST announce state ("Liked"/"Not liked")
- Focus indicators: All focusable elements MUST show visible focus ring (gold outline)
- Skip link: Provide "Skip to main content" link for keyboard users
- Images: All avatars MUST have `alt` text with the person's name
- Live region: New real-time kudos SHOULD use `aria-live="polite"` to announce to screen readers

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a paginated carousel of the top 5 kudos with the most hearts in the HIGHLIGHT KUDOS section.
- **FR-002**: System MUST allow users to filter highlighted kudos by hashtag and department.
- **FR-003**: System MUST display a feed of all kudos in reverse chronological order in the ALL KUDOS section.
- **FR-004**: Users MUST be able to heart/unheart a kudos (toggle).
- **FR-005**: Users MUST be able to copy a kudos link to clipboard.
- **FR-006**: System MUST display personal statistics (kudos sent/received, hearts received, secret boxes opened/unopened) in the sidebar.
- **FR-007**: System MUST display the Spotlight Board with a word-cloud visualization of kudos recipients.
- **FR-008**: Users MUST be able to search for Sunner profiles in the Spotlight Board.
- **FR-009**: System MUST display the "10 SUNNER NHAN QUA MOI NHAT" list in the sidebar.
- **FR-010**: Clicking the "Ghi nhan" input bar MUST open the kudos creation dialog.
- **FR-011**: Clicking "Mo Secret Box" MUST open the Secret Box dialog.
- **FR-012**: Kudo content MUST truncate at 5 lines (feed) or 3 lines (highlight) with "..." overflow.
- **FR-013**: Hashtags MUST display max 5 per line with "..." overflow.
- **FR-014**: Attached images/videos MUST display max 5 thumbnails per kudo. Videos show a play button overlay.
- **FR-015**: ALL KUDOS feed MUST support infinite scroll pagination (cursor-based) with no maximum limit — loads until all kudos are exhausted.
- **FR-016**: Clicking a hashtag tag on a kudo card MUST filter the feed to that hashtag.
- **FR-017**: Highlight kudo cards MUST provide a "Xem chi tiet" (View detail) link navigating to the full kudo detail page.
- **FR-018**: Each section MUST independently handle loading and error states without crashing the full page.

### Technical Requirements

- **TR-001**: Page must load within 3 seconds on standard connection (lazy-load images and Spotlight).
- **TR-002**: Kudos feed, sidebar stats, and "10 Sunner" list MUST support real-time updates via Supabase Realtime subscriptions (not polling). Subscribe to `kudos`, `hearts`, and `secret_box` table changes.
- **TR-003**: Heart toggle must be optimistic (update UI immediately, sync with server).
- **TR-004**: Spotlight word-cloud must support pan/zoom interaction with smooth rendering.
- **TR-005**: All user interactions require authentication; redirect to login if session expired.
- **TR-006**: All runtime code MUST be edge-compatible (Cloudflare Workers) — no Node.js-only APIs (fs, path, child_process).
- **TR-007**: Spotlight word-cloud SHOULD use **@visx/wordcloud** (~15-20KB gzipped) for the layout engine + **d3-zoom** (~5KB gzipped) for pan/zoom interactions. Total estimated bundle: ~25KB gzipped. Both libraries are edge-compatible (no Node.js APIs), tree-shakeable, and TypeScript-native. Search/highlight will be implemented via React state. If bundle size is too large for Cloudflare Workers limits, fallback to a custom Canvas implementation (~10-15KB).

### Key Entities *(data)*

- **Kudos**: id (uuid, PK), sender_id (uuid, FK→User, required), receiver_id (uuid, FK→User, required), content (text, required, max 2000 chars), hashtags (text[], optional), images (text[], optional, max 5 URLs), media_type (enum: image|video, per attachment), hearts_count (integer, default 0), created_at (timestamptz, auto)
- **User (Sunner)**: id (uuid, PK), name (text, required), email (text, unique, required, format: *@sun-asterisk.com), avatar_url (text, nullable), department_id (uuid, FK→Department), star_count (integer, default 0), badge (text, nullable — e.g., "Legend Hero", "New Hero")
- **Hashtag**: id (uuid, PK), name (text, unique, required, max 50 chars)
- **Department**: id (uuid, PK), name (text, unique, required)
- **SecretBox**: id (uuid, PK), user_id (uuid, FK→User, required), is_opened (boolean, default false), gift_description (text, nullable), opened_at (timestamptz, nullable)
- **Heart**: id (uuid, PK), user_id (uuid, FK→User, required), kudos_id (uuid, FK→Kudos, required), created_at (timestamptz, auto) — unique constraint on (user_id, kudos_id). Note: users CAN heart their own kudos (no sender_id != user_id constraint)

---

## State Management

### Local Component State
- **Carousel**: Current slide index (0-4), animation direction
- **Heart toggle**: Optimistic liked/unliked state per kudo card
- **Filter dropdowns**: Open/closed state, selected value for Hashtag and Phong ban
- **Copy link**: Toast visibility state
- **Spotlight**: Pan/zoom mode toggle, current transform (position, scale)

### Server/Global State (via Supabase)
- **Kudos feed**: Paginated list of all kudos (cursor-based infinite scroll, no max limit) — **Realtime**: subscribe to `kudos` INSERT for new posts
- **Highlight kudos**: Top 5 kudos, refreshed on filter change — **Realtime**: subscribe to `hearts` changes to update ranking
- **User stats**: Personal statistics (kudos sent/received, hearts, secret boxes) — **Realtime**: subscribe to `kudos`, `hearts`, `secret_box` changes for current user
- **Spotlight data**: Word-cloud data (recipient names + kudos counts) — **Realtime**: subscribe to `kudos` INSERT to update counts
- **Recent gifts**: 10 most recent gift recipients — **Realtime**: subscribe to `secret_box` UPDATE (is_opened = true) for new gifts
- **Hashtags list**: All available hashtags for filter dropdown (static, fetched once)
- **Departments list**: All available departments for filter dropdown (static, fetched once)

### Loading States
| Section | Loading Behavior |
|---------|-----------------|
| Highlight Kudos | Skeleton cards (5 placeholders) in carousel |
| Spotlight Board | Pulsing placeholder within the bordered container |
| ALL KUDOS Feed | Skeleton cards (3 placeholders) |
| Sidebar Stats | Skeleton rows for each stat line |
| 10 Sunner List | Skeleton list items |
| Infinite Scroll | Spinner at bottom of feed while loading next page |

### Error States
| Section | Error Behavior |
|---------|---------------|
| Highlight Kudos | "Khong the tai du lieu. Thu lai." with retry button |
| Spotlight Board | "Khong the tai Spotlight." with retry button |
| ALL KUDOS Feed | Error banner above feed with retry, previously loaded cards remain |
| Sidebar Stats | "---" placeholder values with subtle retry icon |
| Heart toggle | Revert optimistic update, show toast "Loi. Vui long thu lai." |
| Copy link | Toast "Khong the sao chep link." on clipboard API failure |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | GET | Fetch all kudos (cursor-based pagination, filter by hashtag/department) | Predicted |
| /api/kudos/highlights | GET | Fetch top 5 highlighted kudos | Predicted |
| /api/kudos/:id/heart | POST | Heart a kudos | Predicted |
| /api/kudos/:id/heart | DELETE | Unheart a kudos | Predicted |
| /api/users/me/stats | GET | Fetch personal statistics | Predicted |
| /api/users/search | GET | Search Sunner profiles | Predicted |
| /api/spotlight | GET | Fetch spotlight word-cloud data | Predicted |
| /api/hashtags | GET | Fetch all hashtags for filter | Predicted |
| /api/departments | GET | Fetch all departments for filter | Predicted |
| /api/gifts/recent | GET | Fetch 10 most recent gift recipients | Predicted |
| /api/secret-box/open | POST | Open a secret box | Predicted |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All kudo cards render correctly with sender, receiver, content, hashtags, images, hearts, and copy link.
- **SC-002**: Carousel navigation works with proper enable/disable of arrows at boundaries.
- **SC-003**: Heart toggle updates count optimistically and persists to database.
- **SC-004**: Filters (hashtag, department) correctly narrow the displayed kudos.
- **SC-005**: Sidebar statistics reflect accurate personal data.
- **SC-006**: Page is fully responsive at mobile (320px+), tablet (768px+), and desktop (1440px).

---

## Out of Scope

- Kudos creation form/dialog (separate screen: "Viet Kudo" - frame 520:11602)
- Secret Box opening dialog (separate screen: "Open secret box" - frame 1466:7676)
- Profile page
- Admin features (admin dropdown)
- Notification panel
- Real-time WebSocket implementation details (handled by Supabase Realtime at infra level)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [ ] Related screens specified: "Viet Kudo" (520:11602), "Open secret box" (1466:7676)

---

## Notes

- The page uses a dark theme with gold accent colors consistent with the SAA 2025 branding.
- The Spotlight Board will use **@visx/wordcloud** + **d3-zoom** for the word-cloud visualization with pan/zoom support (see TR-007 for details and fallback strategy).
- Kudos support both image and video attachments. Videos display with a play button overlay and play inline when clicked.
- All text content is in Vietnamese; i18n support should follow the existing project i18n setup.
- The "hoa thi" (star count) and "danh hieu" (badge/title) shown on user info cards are SAA-specific gamification elements.
- Kudo content display differs between highlight cards (max 3 lines) and feed cards (max 5 lines).
- Users CAN heart their own kudos — there is no restriction on self-hearting.
- All real-time features use Supabase Realtime subscriptions (not polling): kudos feed, stats, highlights, spotlight, and recent gifts.

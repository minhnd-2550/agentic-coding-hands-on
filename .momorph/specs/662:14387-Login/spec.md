# Feature Specification: Login Screen

**Frame**: `662:14387-Login`
**File**: `9ypp4enmFmdK3YAFJLIu6C`
**Date**: 2026-03-18
**Status**: spec

---

## Overview

The Login screen is the entry point for SAA 2025 (Sun Annual Awards 2025). It displays a full-page hero section with artistic key visual background, a "ROOT FURTHER" title, introductory text, and a single "LOGIN With Google" button. Authentication is restricted to `@sun-asterisk.com` Google accounts via Supabase Auth (PKCE flow). The screen includes a header with the SAA logo and a language selector (VN/EN/JP), and a footer with copyright information.

---

## User Stories

### US-1: Login with Google

**As a** Sun* employee,
**I want to** log in using my Google account,
**So that** I can access the SAA 2025 platform.

#### Acceptance Scenarios

**Scenario 1: Successful login**
- **Given** I am on the Login screen and not authenticated
- **When** I click the "LOGIN With Google" button
- **Then** the browser redirects to Google OAuth with domain restriction `hd=sun-asterisk.com` (redirect mode, not popup)
- **And** after successful Google authentication, the callback redirects me to the Homepage SAA

**Scenario 2: Non-Sun* domain rejection**
- **Given** I am on the Login screen
- **When** I attempt to log in with a Google account not from `@sun-asterisk.com`
- **Then** a toast notification appears: "Chi tai khoan @sun-asterisk.com duoc phep dang nhap." (translated per active locale)
- **And** the login button is re-enabled

**Scenario 3: User cancels OAuth**
- **Given** I am on the Login screen
- **When** I cancel the Google OAuth flow
- **Then** a toast notification appears: "Dang nhap da bi huy. Vui long thu lai." (translated per active locale)
- **And** the login button is re-enabled

**Scenario 4: Network/server error**
- **Given** I am on the Login screen
- **When** a network or server error occurs during login
- **Then** a toast notification appears: "Da co loi xay ra. Vui long thu lai sau." (translated per active locale)
- **And** the login button is re-enabled

**Scenario 5: Rate limit exceeded**
- **Given** I have failed login a configurable number of times (default: 5) within a configurable window (default: 15 minutes)
- **When** I attempt the next login beyond the threshold
- **Then** a toast notification appears: "Tai khoan tam thoi bi khoa. Vui long thu lai sau." (translated per active locale)
- **And** the login button is re-enabled after the toast

**Scenario 6: Already authenticated**
- **Given** I am already logged in (valid session)
- **When** I navigate to `/login`
- **Then** I am automatically redirected to the Homepage SAA

### US-2: Switch Language

**As a** user,
**I want to** switch the display language between Vietnamese, English, and Japanese,
**So that** I can use the app in my preferred language.

#### Acceptance Scenarios

**Scenario 1: Change language**
- **Given** I am on the Login screen with language set to VN
- **When** I click the language selector and choose "EN"
- **Then** all UI text on the page updates to English without page reload
- **And** the language selector shows the UK flag + "EN"

**Scenario 2: Language persistence**
- **Given** I changed the language to JP
- **When** I close and reopen the browser/tab
- **Then** the page loads with JP as the active language (read from localStorage)

**Scenario 3: Default language**
- **Given** I visit the Login screen for the first time (no localStorage)
- **When** the page loads
- **Then** the default language is VN (Vietnamese)

---

## UI Components

### A. Header

| Property | Value |
|----------|-------|
| **ID** | `662:14391` |
| **Type** | Navigation bar |
| **Position** | Fixed top, full-width |
| **Layout** | Flex row, space-between, vertically centered |
| **Background** | `rgba(11, 15, 18, 0.8)` (semi-transparent dark) |
| **Padding** | `12px 144px` |
| **Height** | `80px` |
| **Z-index** | Above hero content |

#### A.1 Logo

| Property | Value |
|----------|-------|
| **ID** | `I662:14391;186:2166` |
| **Type** | Image (SVG) |
| **Content** | Sun Annual Awards 2025 logo |
| **Size** | `52px x 48px` |
| **Position** | Left side of header |
| **Interaction** | Non-interactive on Login page; clickable (links to Homepage) on other pages |
| **Alt text** | "Sun Annual Awards 2025" |

#### A.2 Language Selector

| Property | Value |
|----------|-------|
| **ID** | `I662:14391;186:1601` |
| **Type** | Dropdown toggle button |
| **Position** | Right side of header |
| **Size** | `108px x 56px` |
| **Default** | VN (Vietnamese) |
| **Options** | VN (Vietnam flag), EN (UK/US flag), JP (Japan flag) |

**Button display**: Flag icon (24x24) + locale code text + chevron down icon (24x24)
**Button padding**: `16px`, gap between items: `4px`, border-radius: `4px`

**States**:
- **Default**: Flag + "VN" + chevron, cursor pointer
- **Hover**: Highlight background effect, pointer cursor
- **Open**: Dropdown visible below button, chevron rotates up
- **Focused**: Visible focus ring for keyboard navigation

**Behavior**:
- Click toggles dropdown with 3 language options
- Selecting a language: updates all UI text (i18n, no page reload), saves to localStorage
- Keyboard: Enter/Space to toggle, Arrow keys to navigate, Escape to close
- ARIA: `aria-expanded`, `aria-haspopup="listbox"`, `role="option"` for items

#### A.2.1 Language Dropdown (linked frame: 721:4942)

| Property | Value |
|----------|-------|
| **Type** | Dropdown list |
| **Position** | Below language selector button, right-aligned |
| **Background** | `#00070C` (dark navy, almost black) |
| **Border** | `1px solid #998C5F` (gold/brown) |
| **Border radius** | `8px` |
| **Padding** | `6px` |
| **Layout** | Flex column |
| **Items** | 2-3 options (VN, EN, JP) — each `108px x 56px` |

**Dropdown item states**:
- **Default**: Flag (24x24) + locale code text (Montserrat Bold 16px, white), transparent background, `border-radius: 4px`
- **Selected/Active**: Background `rgba(255, 234, 158, 0.2)` (warm yellow 20% opacity), `border-radius: 2px`
- **Hover (non-selected)**: Background `rgba(255, 255, 255, 0.1)`, pointer cursor

**Note**: The Figma dropdown frame shows VN (selected) and EN (non-selected). JP option follows the same pattern but is not visible in the current frame — it should be included as the third option.

### B. Hero Section (Bia)

| Property | Value |
|----------|-------|
| **ID** | `662:14393` |
| **Type** | Content section |
| **Position** | Below header |
| **Layout** | Flex column, `gap: 120px`, `padding: 96px 144px` |
| **Height** | `845px` (desktop) |

#### B.1 Key Visual (ROOT FURTHER Title)

| Property | Value |
|----------|-------|
| **ID** | `662:14395` |
| **Content** | "ROOT FURTHER" rendered as image/logo |
| **Size** | `451px x 200px` |
| **Type** | Image asset (not live text) |
| **Responsive** | Scales proportionally on smaller screens |

#### B.2 Content Text

| Property | Value |
|----------|-------|
| **ID** | `662:14753` |
| **Type** | Static text block |
| **Content (VN)** | Line 1: "Bat dau hanh trinh cua ban cung SAA 2025." / Line 2: "Dang nhap de kham pha!" |
| **Font** | Montserrat, 700 (Bold), 20px, line-height 40px |
| **Letter spacing** | 0.5px |
| **Color** | `rgba(255, 255, 255, 1)` (white) |
| **Width** | `480px` |
| **i18n** | Both lines translated per active locale |

#### B.3 Login Button

| Property | Value |
|----------|-------|
| **ID** | `662:14425` |
| **Type** | Primary action button |
| **Text** | "LOGIN With Google" |
| **Icon** | Google logo (24x24), right of text |
| **Size** | `305px x 60px` (desktop), full-width (mobile) |
| **Background** | `rgba(255, 234, 158, 1)` (#FFEA9E — warm yellow) |
| **Text color** | `rgba(0, 16, 26, 1)` (#00101A — dark navy) |
| **Font** | Montserrat, 700 (Bold), 22px, line-height 28px |
| **Border radius** | `8px` |
| **Padding** | `16px 24px` |

**States**:
- **Default/Idle**: Yellow background, dark text, pointer cursor
- **Hover**: Darkened yellow background (`brightness(0.92)`), subtle `box-shadow: 0 2px 8px rgba(0,0,0,0.15)`
- **Loading**: Button disabled, text replaced with or accompanied by spinner/loading indicator
- **Disabled (processing)**: Reduced opacity, cursor not-allowed
- **Error recovery**: Button re-enabled after error toast appears

**Behavior**:
- Click: Initiates Google OAuth via `supabase.auth.signInWithOAuth()` with PKCE flow using **redirect mode** (not popup)
- Double-click prevention: Button disabled immediately on first click
- OAuth params: `provider: 'google'`, `options: { redirectTo: '/auth/callback', queryParams: { hd: 'sun-asterisk.com' } }`
- On success: Redirect to Homepage SAA (`/`)
- On failure: Show toast with translated error message, re-enable button
- ARIA: `aria-label="Login with Google"`, `role="button"`

### C. Key Visual Background (Full Page)

| Property | Value |
|----------|-------|
| **ID** | `662:14388` |
| **Type** | Decorative background |
| **Size** | Full viewport (1441px x 1022px at desktop) |
| **Content** | Artistic wave/organic pattern with multiple colors (orange, green, teal, dark navy) |
| **Rendering** | `object-fit: cover`, no white gaps on any screen size |
| **Z-index** | Bottom layer (behind all content) |

**Overlay gradient** (Rectangle 57 — `662:14392`):
- `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0.00) 100%)`
- Creates dark-to-transparent gradient from left, ensuring text readability

**Bottom gradient** (Cover — `662:14390`):
- `linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0.00) 51.74%)`
- Darkens bottom area for footer readability

### D. Footer

| Property | Value |
|----------|-------|
| **ID** | `662:14447` |
| **Type** | Footer bar |
| **Position** | Sticky bottom of viewport |
| **Layout** | Flex row, space-between, center-aligned |
| **Padding** | `40px 90px` |
| **Border top** | `1px solid #2E3940` |
| **Text** | "Ban quyen thuoc ve Sun* (c) 2025" |
| **Font** | Montserrat Alternates, 700 (Bold), 16px, line-height 24px |
| **Text color** | `rgba(255, 255, 255, 1)` (white) |
| **Text align** | Center |
| **i18n** | Copyright text translated per active locale |

---

## Data Requirements

### Input Fields

This screen has **no form input fields**. Authentication is handled entirely via Google OAuth redirect.

### Display Fields

| Field | Source | Format | i18n |
|-------|--------|--------|------|
| Hero title ("ROOT FURTHER") | Static image asset | Image | No (image) |
| Intro line 1 | Translation file | Text | Yes |
| Intro line 2 | Translation file | Text | Yes |
| Login button text | Translation file | Text | Yes |
| Copyright text | Translation file | Text | Yes |
| Language selector label | Active locale code | "VN" / "EN" / "JP" | N/A |

### Validation Rules

| Rule | Description | Error Message |
|------|-------------|---------------|
| Domain restriction | Only `@sun-asterisk.com` Google accounts | "Chi tai khoan @sun-asterisk.com duoc phep dang nhap." |
| Rate limiting | Max failed attempts per IP in configurable window (defaults: 5 attempts / 15 minutes). Thresholds stored as environment variables: `RATE_LIMIT_MAX_ATTEMPTS=5`, `RATE_LIMIT_WINDOW_MINUTES=15` | "Tai khoan tam thoi bi khoa. Vui long thu lai sau." |
| OAuth cancellation | User closes/cancels Google auth | "Dang nhap da bi huy. Vui long thu lai." |
| Server error | Network/Supabase/Google service error | "Da co loi xay ra. Vui long thu lai sau." |

All error messages are displayed as **toast notifications** (auto-dismiss after 5 seconds, `role="alert"`, `aria-live="assertive"`).

---

## API Requirements

### Auth Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| Supabase Auth (Google OAuth) | Client SDK | Initiate OAuth PKCE flow | No |
| `/auth/callback` | GET | Exchange OAuth code for session, validate domain | No (callback) |

### `/auth/callback` Route Handler

**Request**: `GET /auth/callback?code=<auth_code>`

**Flow**:
1. Extract `code` from query params
2. Call `supabase.auth.exchangeCodeForSession(code)`
3. Validate user email domain is `@sun-asterisk.com`
4. Check rate limit: query `login_attempts` table for IP (< `RATE_LIMIT_MAX_ATTEMPTS` in `RATE_LIMIT_WINDOW_MINUTES`)
5. **Success**: Session cookie set by `@supabase/ssr`, redirect to `/`
6. **Failure**: Insert into `login_attempts`, redirect to `/login?error=<error_type>`

**Error types**: `domain_restricted`, `auth_cancelled`, `auth_failed`, `rate_limited`

### Database

| Table | Purpose |
|-------|---------|
| `login_attempts` | Rate limiting — tracks failed login attempts per IP |

**Schema**:
```sql
CREATE TABLE login_attempts (
  id BIGSERIAL PRIMARY KEY,
  ip TEXT NOT NULL,
  error_type TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_login_attempts_ip_time ON login_attempts (ip, attempted_at);
```

---

## State Management

### Local State (Component-level)

| State | Component | Type | Default |
|-------|-----------|------|---------|
| `isLoading` | LoginButton | `boolean` | `false` |
| `isDropdownOpen` | LanguageSelector | `boolean` | `false` |

### Global State (Context)

| State | Provider | Type | Default | Persistence |
|-------|----------|------|---------|-------------|
| `locale` | I18nProvider | `'vn' \| 'en' \| 'jp'` | `'vn'` | localStorage |
| `t(key)` | I18nProvider | `(key: TranslationKey) => string` | — | — |

### Loading States

| Scenario | Behavior |
|----------|----------|
| Page loading (SSR) | Show `loading.tsx` skeleton/spinner |
| OAuth in progress | Login button disabled + loading spinner |
| Language switching | Instant (client-side re-render, no loading state needed) |

### Error States

| Scenario | Behavior |
|----------|----------|
| OAuth callback error | Redirect to `/login?error=<type>`, page reads param → shows toast |
| Toast display | Top-right (desktop) / top-center (mobile), auto-dismiss 5s |
| Error recovery | Login button re-enabled after toast appears |

---

## Navigation

### Entry Points

| From | Trigger | Condition |
|------|---------|-----------|
| Any protected page | Middleware redirect | Unauthenticated user |
| Direct URL `/login` | Browser navigation | — |
| Root `/` | Server redirect | Unauthenticated user |

### Exit Points

| To | Trigger | Condition |
|----|---------|-----------|
| Homepage SAA (`/`) | Successful login | Valid `@sun-asterisk.com` session |
| Google OAuth screen | Click login button | — |
| Homepage SAA (`/`) | Middleware redirect | Already authenticated |

### Deep Links

- `/login` — Direct access to login screen
- `/login?error=domain_restricted` — Login with domain error toast
- `/login?error=auth_cancelled` — Login with cancellation toast
- `/login?error=auth_failed` — Login with auth failure toast
- `/login?error=rate_limited` — Login with rate limit toast

---

## Edge Cases

| Case | Behavior |
|------|----------|
| Empty state | N/A — Login screen is the initial state, no "empty" scenario |
| No localStorage | Default to VN language |
| Corrupted localStorage locale value | Fallback to VN |
| Double-click login button | Only one OAuth call triggered (button disabled on first click) |
| Concurrent language changes (rapid clicks) | Last selection wins; localStorage updated synchronously |
| OAuth redirect fails (browser blocks redirect) | Show generic error toast; user retries. Redirect mode is used (not popup), so popup blockers are not an issue. |
| Session expired during login flow | OAuth callback handles fresh session creation |
| Multiple tabs | Language change in one tab does not propagate to other tabs (localStorage only, no `storage` event listener). Acceptable for MVP. |
| JavaScript disabled | Page renders server-side but login button non-functional (progressive enhancement not in scope for MVP) |

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | Tab order: Language selector → Login button. Enter/Space activates buttons. |
| Screen reader | All interactive elements have descriptive `aria-label`. Logo has `alt` text. |
| Toast announcements | `role="alert"`, `aria-live="assertive"` on toast container |
| Language selector | `aria-expanded`, `aria-haspopup="listbox"`, options have `role="option"` |
| Focus management | Visible focus ring on all interactive elements. Focus returns to trigger after dropdown closes. |
| Color contrast | White text on dark background (>= 7:1 ratio). Dark text on yellow button (>= 4.5:1 ratio). |
| Reduced motion | Respect `prefers-reduced-motion` for animations/transitions |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| **Mobile (320px+)** | Header: full-width, logo scales smaller. Hero: content stacked vertically, centered. Login button: `width: 100%`. Footer: text centered, padding reduced. "ROOT FURTHER" image scales down proportionally. |
| **Tablet (768px+)** | Similar to mobile but with more horizontal space. Content may start left-aligning. Button width auto. |
| **Desktop (1024px+)** | Full layout as designed: 1440px max-width, content left-aligned, button `305px` wide, header padding `144px` horizontal. |

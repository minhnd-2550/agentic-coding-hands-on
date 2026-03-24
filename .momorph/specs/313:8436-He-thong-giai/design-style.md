# Design Style: Hệ thống giải thưởng SAA 2025

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/313:8436
**Extracted At**: 2026-03-19

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-bg-header | #101417 | 80% | Header bar background |
| --color-text-gold | #FFEA9E | 100% | Primary gold text (tiêu đề giải, menu active, labels) |
| --color-text-white | #FFFFFF | 100% | Body text, descriptions, nav links |
| --color-text-gold-dark | #998C5F | 100% | Subdued gold accents |
| --color-gold-glow | #FAE287 | — | Text shadow glow effect |
| --color-divider | #2E3940 | 100% | Horizontal dividers between sections |
| --color-gold-bg-subtle | #FFEA9E | 10% | Subtle gold background tint |
| --color-red-accent | #D4271D | 100% | Accent (limited use) |
| --color-dark-surface | #0F0F0F | 100% | Dark surface elements |
| --color-kudos-text | #DBD1C1 | 100% | "KUDOS" logo text |
| --color-cta-bg | #FFEA9E | 100% | CTA button background (solid gold) |
| --color-cta-text | #00101A | 100% | CTA button text (dark on gold) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hero-title | SVN-Gotham | 96px | 400 | auto | 0 |
| --text-page-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0 |
| --text-card-title | Montserrat | 24px | 700 | 32px | 0 |
| --text-card-label | Montserrat | 24px | 700 | 32px | 0 |
| --text-value-large | Montserrat | 36px | 700 | 44px | 0 |
| --text-nav-active | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-nav-default | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-body | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-caption | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-kudos-title | Montserrat | 57px | 700 | 64px | 0 |
| --text-kudos-label | Montserrat Alternates | 24px | 700 | 32px | 0 |
| --text-kudos-logo | SVN-Gotham | 96px | 400 | auto | 0 |
| --text-footer-link | Montserrat | 16px | 700 | 24px | 0 |
| --text-footer-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (from header) |
| --spacing-section-gap | 80px | Gap between award card image and content separator |
| --spacing-card-content-gap | 32px | Gap within card content blocks |
| --spacing-card-inner-gap | 24px | Gap between content sub-sections |
| --spacing-menu-gap | 16px | Gap between menu items |
| --spacing-title-gap | 16px | Gap between subtitle and main title |
| --spacing-label-icon-gap | 16px | Gap between icon and label text |
| --spacing-value-gap | 8px | Gap between value number and unit |
| --spacing-nav-padding | 16px | Navigation item padding |
| --spacing-header-y | 12px | Header vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-none | 0px | Page, sections, cards |
| --radius-sm | 4px | Navigation buttons (header) |
| --radius-card-content | 16px | Card content frame (backdrop blur) |
| --border-divider | 1px solid #2E3940 | Section dividers |
| --border-menu-active | 1px solid #FFEA9E | Active menu item bottom border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-glow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav text glow |
| --shadow-none | none | Most elements (dark theme, no elevation) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Full page width |
| height | 6410px | Full page height |
| background | #00101A | Dark blue-black background |
| padding-x | 144px | Content area: 1152px (1440 - 2*144) |

### Page Structure

| Property | Value | Notes |
|----------|-------|-------|
| Content width | 1152px | Centered within 1440px container |
| Award section layout | flex, row | Menu (178px) + Cards (856px) |
| Menu-to-cards gap | ~118px | Derived from positions |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────── 1440px ─────────────────────────────────────────────────┐
│ Header Bar (h: 80px, bg: #101417/80%, px: 144px)                                                                │
│ ┌─ Logo ─┐  ┌─ About SAA 2025 ─┐  ┌─ Award Information (active) ─┐  ┌─ Sun* Kudos ─┐   ┌─ Icons ─┐           │
│ └────────┘  └──────────────────┘  └────────────────────────────────┘  └──────────────┘   └─────────┘           │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                 │
│ Keyvisual Banner (w: 1440px, h: 547px)                                                                          │
│ ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│ │  Background image + gradient overlay                                                                       │  │
│ │  "ROOT FURTHER" (SVN-Gotham, 96px)                                                                         │  │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                                 │
│ ┌──────────────────────────── 1152px (px: 144px) ─────────────────────────────┐                                 │
│ │ Title Section (h: 129px)                                                     │                                 │
│ │  "Sun* Annual Awards 2025" (24px, white, center)                             │                                 │
│ │  ─────────────────────── divider (1px, #2E3940) ─────────────                │                                 │
│ │  "Hệ thống giải thưởng SAA 2025" (57px, gold, center)                       │                                 │
│ ├──────────────────────────────────────────────────────────────────────────────┤                                 │
│ │                                                                              │                                 │
│ │ ┌─ Menu (178px) ─┐  ┌──────────── Award Cards (856px) ──────────────┐       │                                 │
│ │ │ ● Top Talent   │  │ ┌── Image (336x336) ──┐  ┌── Content ──────┐ │       │                                 │
│ │ │   Top Project  │  │ │                      │  │ ● Title (24px)  │ │       │                                 │
│ │ │   Top PL       │  │ │   Award Artwork      │  │ ● Description   │ │       │                                 │
│ │ │   Best Manager │  │ │                      │  │ ── divider ──   │ │       │                                 │
│ │ │   Signature    │  │ └──────────────────────┘  │ ● Qty: XX      │ │       │                                 │
│ │ │   MVP          │  │                           │ ── divider ──   │ │       │                                 │
│ │ └────────────────┘  │                           │ ● Value: VNĐ   │ │       │                                 │
│ │    (sticky)         │                           └─────────────────┘ │       │                                 │
│ │                      │  ... repeat for 6 awards ...                  │       │                                 │
│ │                      └───────────────────────────────────────────────┘       │                                 │
│ ├──────────────────────────────────────────────────────────────────────────────┤                                 │
│ │ Sun* Kudos Section (w: 1152px, h: 500px)                                    │                                 │
│ │ ┌─────────── Content ──────────┐  ┌────── Logo/Image ──────┐                │                                 │
│ │ │ "Phong trào ghi nhận"        │  │    Kudos Logo           │                │                                 │
│ │ │ "Sun* Kudos" (57px, gold)    │  │                         │                │                                 │
│ │ │  Description text            │  │                         │                │                                 │
│ │ │  [Chi tiết →] button         │  │                         │                │                                 │
│ │ └──────────────────────────────┘  └─────────────────────────┘                │                                 │
│ └──────────────────────────────────────────────────────────────────────────────┘                                 │
│                                                                                                                 │
│ Footer Bar                                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header Bar

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8440 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16,20,23,0.8) | `background-color: rgba(16,20,23,0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| gap | 238px | `gap: 238px` |
| position | fixed (top) | `position: fixed; top: 0; z-index: 50` |
| backdrop-filter | — | `backdrop-filter: blur(8px)` (predicted, semi-transparent bg) |

> **Note**: Header is shared component (`<Header />`), already implemented. On this page, "Award Information" nav link should be in active state.

---

### Nav Link - Default

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8440;186:1579 | - |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: #FFFFFF` |

**States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, no border |
| Active | color: #FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Hover | color: #FFEA9E (predicted) |

---

### Keyvisual Banner

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8437 | - |
| width | 1440px | `width: 100%` |
| height | 547px | `height: 547px` |
| background | url(image) cover | `background: url(...) center/cover no-repeat` |
| gradient overlay | linear-gradient(0deg, #00101A, transparent 52.79%) | Gradient overlay from bottom |

---

### Title Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8453 | - |
| width | 1152px | `max-width: 1152px` |
| height | 129px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

#### Subtitle Text ("Sun* Annual Awards 2025")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8454 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

#### Main Title ("Hệ thống giải thưởng SAA 2025")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8457 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | #FFEA9E | `color: var(--color-text-gold)` |
| text-align | left | `text-align: left` |

#### Divider
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8455 | - |
| width | 1152px | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: var(--color-divider)` |

---

### Menu List (Left Navigation)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8459 | - |
| width | 178px | `width: 178px` |
| height | 448px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |
| position | sticky | `position: sticky` (predicted) |

#### Menu Item - Active
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8460 (Top Talent - active example) | - |
| padding | 16px | `padding: 16px` |
| border-bottom | 1px solid #FFEA9E | `border-bottom: 1px solid var(--color-text-gold)` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFEA9E | `color: var(--color-text-gold)` |

#### Menu Item - Default
| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px | `padding: 16px` |
| border-bottom | none | `border-bottom: none` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: #FFFFFF` |

**States:**
| State | Changes |
|-------|---------|
| Default | color: #FFFFFF, no bottom border |
| Active | color: #FFEA9E, border-bottom: 1px solid #FFEA9E |
| Hover | color: #FFEA9E (predicted) |

---

### Award Card (Template - e.g. Top Talent)

> **IMPORTANT — Alternating Layout Pattern:**
> - **Odd cards** (Top Talent #1, Top Project Leader #3, Signature #5): Image LEFT, Content RIGHT (Frame 506)
> - **Even cards** (Top Project #2, Best Manager #4, MVP #6): Content LEFT, Image RIGHT (Frame 507)
> - Implementation: Use CSS `flex-direction: row` for odd, `flex-direction: row-reverse` for even. Or use `nth-child(even)` with `flex-direction: row-reverse`.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:8467 | - |
| width | 856px | `width: 100%` |
| height | auto (~631px) | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 80px | `gap: 80px` |

#### Card Content Row (Odd — Image Left)
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2803 (Frame 506) | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 40px | `gap: 40px` |
| width | 856px | `width: 100%` |
| height | auto (~550px) | `height: auto` |
| children order | [AwardImage, ContentBlock] | Image first, then content |

#### Card Content Row (Even — Image Right)
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | Frame 507 | - |
| display | flex | `display: flex` |
| flex-direction | row-reverse | `flex-direction: row-reverse` (or `row` with reversed children) |
| gap | 40px | `gap: 40px` |
| width | 856px | `width: 100%` |
| height | auto (~550px) | `height: auto` |
| children order | [ContentBlock, AwardImage] | Content first, then image |

#### Award Image
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2525 | - |
| width | 336px | `width: 336px` |
| height | 336px | `height: 336px` |

#### Card Content Block
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2526 | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 32px | `gap: 32px` |
| border-radius | 16px | `border-radius: 16px` |
| backdrop-filter | blur(32px) | `backdrop-filter: blur(32px)` |

#### Card Title (e.g. "Top Talent")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2530 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: var(--color-text-gold)` |

#### Card Description
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2531 | - |
| width | 480px | `width: 480px` / `max-width: 480px` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | justified | `text-align: justify` |

#### Section Label (e.g. "Số lượng giải thưởng:")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2536 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: var(--color-text-gold)` |

#### Value Number (e.g. "10", "7.000.000 VNĐ")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2538 / I313:8467;214:2546 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 44px | `line-height: 44px` |
| color | #FFFFFF | `color: #FFFFFF` |

#### Value Caption (e.g. "cho mỗi giải thưởng", "Cá nhân")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2547 / I313:8467;214:3532 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| color | #FFFFFF | `color: #FFFFFF` |

#### Card Divider
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2532 / I313:8467;214:2539 | - |
| width | 480px | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: var(--color-divider)` |

#### Card Bottom Divider (between cards)
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:8467;214:2771 | - |
| width | 853px | `width: 100%` |
| height | 1px | `height: 1px` |
| background | #2E3940 | `background-color: var(--color-divider)` |

#### Signature 2025 Variant (Node 313:8471)

> The "Signature 2025 - Creator" card is taller (~1047px vs ~631px) because it has **two prize value rows** instead of one:
> - Row 1: "Giá trị giải thưởng:" → "5.000.000 VNĐ" + "cho giải cá nhân"
> - Row 2: "Giá trị giải thưởng:" → "8.000.000 VNĐ" + "cho giải tập thể"
>
> Implementation: Render the ValueRow component twice within this card. Same styles apply to each row.

---

### Sun* Kudos Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 335:12023 | - |
| width | 1152px | `width: 100%` |
| height | 500px | `height: 500px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

#### Kudos Title ("Sun* Kudos")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;313:8422 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| color | #FFEA9E | `color: var(--color-text-gold)` |

#### CTA Button ("Chi tiết")
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;313:8426 | - |
| width | 127px | `width: auto` |
| height | 56px | `height: 56px` |
| background | #FFEA9E | `background-color: var(--color-cta-bg)` |
| color | #00101A | `color: var(--color-cta-text)` |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| padding | 16px | `padding: 16px` |
| display | flex | `display: flex; align-items: center; gap: 4px` |
| icon | arrow/chevron (24x24) | Right-side icon |

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E, color: #00101A |
| Hover | opacity: 0.9, subtle lift (predicted) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

#### "KUDOS" Logo Text
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I335:12023;329:2949 | - |
| font-family | SVN-Gotham | `font-family: 'SVN-Gotham'` |
| font-size | 96px | `font-size: 96px` |
| color | #DBD1C1 | `color: var(--color-kudos-text)` |

---

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 354:4323 | - |
| width | 1440px | `width: 100%` |
| height | 144px | `height: auto` |
| padding | 40px 90px | `padding: 40px 90px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |

#### Footer Left (Logo + Nav Links)
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I354:4323;342:1407 | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 80px | `gap: 80px` |

- **Logo**: 69x64px
- **Nav Links**: flex row, gap: 48px
  - "About SAA 2025" (Montserrat 16px/700, white)
  - "Award Information" (Montserrat 16px/700, white, bg: rgba(255,234,158,0.1))
  - "Sun* Kudos" (Montserrat 16px/700, white)
  - "Tiêu chuẩn chung" (Montserrat 16px/700, white)

#### Footer Right (Copyright)
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I354:4323;342:1413 | - |
| font-family | Montserrat Alternates | `font-family: 'Montserrat Alternates'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: #FFFFFF` |
| text | "Bản quyền thuộc về Sun* © 2025" | Static text |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 1440px)
├── Header (h: 80px, bg: rgba(16,20,23,0.8), px: 144px, flex, center, space-between)
│   ├── Logo (52x48px)
│   ├── NavLinks (flex, gap: 24px)
│   │   ├── "About SAA 2025" (Montserrat 16px/700, white)
│   │   ├── "Award Information" (Montserrat 16px/700, #FFEA9E, border-bottom: 1px #FFEA9E, text-shadow glow)
│   │   └── "Sun* Kudos" (Montserrat 14px/700, white)
│   └── RightIcons (bell, language, profile)
│
├── Keyvisual (w: 1440px, h: 547px, bg-image cover)
│   ├── Gradient Overlay (linear-gradient bottom #00101A to transparent)
│   └── "ROOT FURTHER" (SVN-Gotham 96px)
│
├── TitleSection (w: 1152px, mx: 144px, flex-col, gap: 16px)
│   ├── Subtitle "Sun* Annual Awards 2025" (Montserrat 24px/700, white, center)
│   ├── Divider (1px, #2E3940)
│   └── Title "Hệ thống giải thưởng SAA 2025" (Montserrat 57px/700, #FFEA9E)
│
├── AwardSection (w: 1152px, flex-row)
│   ├── MenuList (w: 178px, sticky, flex-col, gap: 16px)
│   │   ├── MenuItem "Top Talent" (active: #FFEA9E, border-bottom)
│   │   ├── MenuItem "Top Project" (default: white)
│   │   ├── MenuItem "Top Project Leader"
│   │   ├── MenuItem "Best Manager"
│   │   ├── MenuItem "Signature 2025 - Creator"
│   │   └── MenuItem "MVP"
│   │
│   └── AwardCards (w: 856px, flex-col, gap: 80px)
│       ├── AwardCard "Top Talent" (flex-row, gap: 40px) ← ODD: Image LEFT
│       │   ├── AwardImage (336x336px)
│       │   └── ContentBlock (flex-col, gap: 32px, radius: 16px, backdrop-blur: 32px)
│       │       ├── TitleRow (icon 24px + title 24px/700 #FFEA9E)
│       │       ├── Description (16px/700, white, 480px, justify)
│       │       ├── Divider (1px, #2E3940)
│       │       ├── QuantityRow (icon + label 24px #FFEA9E + value 36px white + unit 14px)
│       │       ├── Divider
│       │       └── ValueRow (icon + label 24px #FFEA9E + value 36px white + caption 14px)
│       │
│       ├── CardDivider (853px, 1px, #2E3940)
│       ├── AwardCard "Top Project" (flex-row-reverse, gap: 40px) ← EVEN: Image RIGHT
│       ├── CardDivider
│       ├── AwardCard "Top Project Leader" ← ODD: Image LEFT
│       ├── CardDivider
│       ├── AwardCard "Best Manager" ← EVEN: Image RIGHT
│       ├── CardDivider
│       ├── AwardCard "Signature 2025" ← ODD: Image LEFT
│       ├── CardDivider
│       └── AwardCard "MVP" ← EVEN: Image RIGHT
│
├── KudosSection (w: 1152px, h: 500px, flex, center)
│   ├── Content (flex-col)
│   │   ├── Label "Phong trào ghi nhận" (Montserrat Alternates 24px)
│   │   ├── Title "Sun* Kudos" (Montserrat 57px/700, #FFEA9E)
│   │   ├── Description (body text, white)
│   │   └── CTAButton "Chi tiết" (solid gold bg, dark text + arrow icon)
│   └── KudosLogo/Image
│       └── "KUDOS" text (SVN-Gotham 96px, #DBD1C1)
│
└── Footer (w: 1440px, h: 144px, px: 90px, py: 40px, border-top: 1px #2E3940)
    ├── Left (flex-row, gap: 80px)
    │   ├── Logo (69x64px)
    │   └── NavLinks (flex-row, gap: 48px)
    │       ├── "About SAA 2025" (Montserrat 16px/700, white)
    │       ├── "Award Information" (Montserrat 16px/700, white, bg: gold/10%)
    │       ├── "Sun* Kudos" (Montserrat 16px/700, white)
    │       └── "Tiêu chuẩn chung" (Montserrat 16px/700, white)
    └── "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates 16px/700, white)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Container | padding-x: 16px |
| Header | padding-x: 16px, hamburger menu |
| Keyvisual | height: auto, maintain aspect ratio |
| Title | font-size: 32px, line-height: 40px |
| Menu List | Hidden or horizontal scroll bar |
| Award Card | flex-direction: column, image stacked above content (alternating layout disabled — all cards same) |
| Award Image | width: 100%, max-width: 280px, centered |
| Card Content | width: 100% |
| Value text | font-size: 28px |
| Kudos Section | flex-direction: column, height: auto |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Container | padding-x: 32px |
| Menu List | width: 150px, font-size: 14px |
| Award Card | gap: 24px |
| Award Image | width: 260px, height: 260px |
| Card Content | width: auto, flex: 1 |
| Kudos Section | height: auto, padding: 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Container | max-width: 1440px, padding-x: 144px |
| All components | As designed (1440px base) |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| Target icon | I313:8467;214:2529 | 24x24 | #FFEA9E (gold) | Before award card title |
| Diamond icon | I313:8467;214:2535 | 24x24 | #FFEA9E (gold) | Before "Số lượng giải thưởng" label |
| License icon | I313:8467;214:2543 | 24x24 | #FFEA9E (gold) | Before "Giá trị giải thưởng" label |
| Arrow/Chevron icon | I335:12023;313:8426;186:1766 | 24x24 | #00101A (dark) | Inside CTA button "Chi tiết" |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Menu Item | color, border-bottom | 200ms | ease-in-out | Click/Scroll spy |
| Menu Item | color | 150ms | ease-in-out | Hover |
| Page scroll | scroll-position | 500ms | ease-in-out | Menu click |
| CTA Button | transform, opacity | 150ms | ease-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page container | 313:8436 | `bg-[#00101A] min-h-screen` | `<AwardSystemPage />` |
| Header | 313:8440 | `bg-[#101417]/80 h-20 px-36 flex items-center` | `<Header />` (existing) |
| Keyvisual | 313:8437 | `w-full h-[547px] bg-cover bg-center relative` | `<HeroSection />` (existing) |
| Title Section | 313:8453 | `max-w-[1152px] mx-auto flex flex-col gap-4` | `<AwardsSectionHeader />` (existing) |
| Menu List | 313:8459 | `w-[178px] flex flex-col gap-4 sticky top-20` | `<AwardMenu />` |
| Menu Item (active) | 313:8460 | `p-4 border-b border-[#FFEA9E] text-[#FFEA9E]` | `<AwardMenuItem active />` |
| Menu Item (default) | — | `p-4 text-white hover:text-[#FFEA9E]` | `<AwardMenuItem />` |
| Award Card (odd) | 313:8467 | `flex flex-row gap-10` | `<AwardDetailCard />` |
| Award Card (even) | 313:8468 | `flex flex-row-reverse gap-10` | `<AwardDetailCard reversed />` |
| Award Image | I313:8467;214:2525 | `w-[336px] h-[336px]` | `<AwardImage />` |
| Card Content | I313:8467;214:2526 | `flex flex-col gap-8 rounded-2xl backdrop-blur-[32px]` | Part of `<AwardDetailCard />` |
| Card Title | I313:8467;214:2530 | `text-2xl font-bold text-[#FFEA9E]` | Part of `<AwardDetailCard />` |
| Card Description | I313:8467;214:2531 | `text-base font-bold text-white max-w-[480px] text-justify` | Part of `<AwardDetailCard />` |
| Value Number | I313:8467;214:2538 | `text-4xl font-bold text-white` | Part of `<AwardDetailCard />` |
| Section Label | I313:8467;214:2536 | `text-2xl font-bold text-[#FFEA9E]` | Part of `<AwardDetailCard />` |
| Divider | — | `w-full h-px bg-[#2E3940]` | `<Divider />` or inline |
| Kudos Section | 335:12023 | `w-full h-[500px] flex items-center justify-center` | `<KudosSection />` (existing) |
| CTA Button | I335:12023;313:8426 | `bg-[#FFEA9E] text-[#00101A] h-14 px-4 font-bold flex items-center gap-1` | `<Button variant="cta" />` |
| KUDOS Logo | I335:12023;329:2949 | `text-[96px] font-[SVN-Gotham] text-[#DBD1C1]` | Part of `<KudosSection />` |
| Footer | 354:4323 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex items-center justify-between` | `<Footer />` (existing) |
| Footer Copyright | I354:4323;342:1413 | `font-[Montserrat_Alternates] text-base font-bold text-white` | Part of `<Footer />` |

---

## Notes

- All colors should use CSS variables for theming support
- Font "Montserrat" is used throughout - ensure loaded via Google Fonts
- Font "SVN-Gotham" is used in Keyvisual hero title and "KUDOS" logo text
- Font "Montserrat Alternates" is used for Kudos label
- Dark theme with gold (#FFEA9E) as primary accent
- Backdrop blur (32px) on card content creates frosted glass effect
- No box shadows used (dark theme relies on color contrast and dividers)
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags
- Ensure color contrast meets WCAG AA (gold #FFEA9E on dark #00101A passes)

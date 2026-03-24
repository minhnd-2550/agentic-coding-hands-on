# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/6384
**Extracted At**: 2026-03-21

---

## Design Tokens

### Colors

| Token Name | Value | Opacity | Usage |
|------------|-------|---------|-------|
| --color-background | rgba(0, 16, 26, 1) / #00101A | 100% | Page background |
| --color-container-2 | #00070C | 100% | Sidebar card backgrounds |
| --color-header-bg | rgba(16, 20, 23, 0.8) | 80% | Header background (semi-transparent) |
| --color-primary-gold | #FFEA9E | 100% | Primary text, headings, accents |
| --color-gold-light | #FFF8E1 | 100% | Highlight card background |
| --color-gold-warm | #FFF3C6 | 100% | Secondary warm gold |
| --color-border-gold | #998C5F | 100% | Borders, dividers |
| --color-divider | #2E3940 | 100% | Footer top border, subtle dividers |
| --color-text-white | #FFFFFF / rgba(255, 255, 255, 1) | 100% | Body text, labels |
| --color-text-secondary | rgba(153, 153, 153, 1) / #999999 | 100% | Secondary text, muted labels |
| --color-text-gold-muted | rgba(219, 209, 193, 1) / #DBD1C1 | 100% | Muted gold text |
| --color-card-cream | rgba(255, 248, 225, 1) / #FFF8E1 | 100% | Kudo Post card background |
| --color-heart-active | rgba(212, 39, 29, 1) / #D4271D | 100% | Active heart icon |
| --color-heart-inactive | rgba(153, 153, 153, 1) | 100% | Inactive heart icon |
| --color-button-gold-bg | rgba(255, 234, 158, 1) / #FFEA9E | 100% | "Mo Secret Box" button background |
| --color-input-bg | rgba(255, 234, 158, 0.1) | 10% | Input/button ghi nhan background |
| --color-gradient-cover | linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0.00) 47.8%) | - | Hero gradient overlay |
| --color-gradient-fade-left | linear-gradient(90deg, #00101A 50%, rgba(255, 255, 255, 0.00) 100%) | - | Carousel left fade |
| --color-gradient-fade-right | linear-gradient(270deg, #00101A 50%, rgba(255, 255, 255, 0.00) 100%) | - | Carousel right fade |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|-------|
| --text-hero-title | Montserrat | 36px | 700 | 44px | 0 | #FFF | Hero title "He thong ghi nhan va cam on" |
| --text-kudos-logo | SVN-Gotham | ~140px* | 400 | ~35px | 0 | #FFEA9E | Large "KUDOS" decorative text |
| --text-section-title | Montserrat | 57px | 700 | 64px | 0 | #FFEA9E | "HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS" |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0 | #FFEA9E | "Sun* Annual Awards 2025" |
| --text-spotlight-count | Montserrat | 32px | 700 | 40px | 0 | #FFF | "388 KUDOS" in Spotlight |
| --text-stat-label | Montserrat | 22px | 700 | 28px | 0 | #FFF | Sidebar stat labels |
| --text-stat-value | Montserrat | 22px | 700 | 28px | 0 | #FFEA9E | Sidebar stat values (numbers) |
| --text-body-kudo | Montserrat | 20px | 700 | 32px | 0 | #2E3940 | Kudo content text (dark on cream card) |
| --text-nav | Montserrat | 16px | 700 | 24px | 0 | #FFF | Header navigation links |
| --text-nav-active | Montserrat | 16px | 700 | 24px | 0 | #FFEA9E | Active header nav link |
| --text-body | Montserrat | 16px | 700 | 24px | 0 | #FFF | General body text |
| --text-placeholder | Montserrat | 16px | 500 | 24px | 0 | #999 | Input placeholder text |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0 | #999 | Footer copyright text |
| --text-footer-link | Montserrat | 16px | 700 | 24px | 0 | #FFF | Footer navigation links |
| --text-body-sm | Montserrat | 14px | 700 | 20px | 0 | #999 | Sub-navigation, timestamps, small text |
| --text-hashtag | Montserrat | 14px | 700 | 20px | 0 | #F17676 | Hashtag tags (coral/red) |
| --text-kudo-sender | Montserrat | 14px | 700 | 20px | 0 | #2E3940 | Sender/receiver name on cards |
| --text-spotlight-name-lg | Montserrat | ~11px* | 700 | ~6px | 0 | #FFEA9E | Spotlight large names |
| --text-spotlight-name-md | Montserrat | ~10px* | 700 | ~6px | 0 | #DBD1C1 | Spotlight medium names |
| --text-spotlight-name-sm | Montserrat | ~8px* | 700 | ~6px | 0 | #999 | Spotlight small names |

> \* Approximate values — these are decorative/dynamic sizes that scale based on content.

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-section-gap | 120px | Gap between major sections |
| --spacing-inner-gap-xl | 80px | Large inner section gaps |
| --spacing-inner-gap-lg | 64px | Section header to content |
| --spacing-inner-gap-md | 40px | Between sub-sections, carousel gap |
| --spacing-inner-gap-sm | 32px | Pagination gap, medium spacing |
| --spacing-card-padding | 24px | Card internal padding |
| --spacing-card-padding-lg | 40px | Kudo Post card padding |
| --spacing-gap-md | 16px | Default component gap |
| --spacing-gap-sm | 10px | Small component gap |
| --spacing-gap-xs | 8px | Tight gaps (button icon gap) |
| --spacing-gap-xxs | 4px | Minimal gaps |
| --spacing-gap-2 | 2px | Micro gaps |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-pill | 100px | Pill-shaped elements (nav tabs) |
| --radius-input | 68px | Input bar "Ghi nhan" |
| --radius-spotlight | 47.14px | Spotlight board container |
| --radius-card | 24px | Kudo Post card |
| --radius-sidebar-card | 17px | Sidebar stat/gift cards |
| --radius-highlight-card | 16px | Highlight kudo card |
| --radius-button | 8px | Buttons (Mo Secret Box, etc.) |
| --radius-sm | 4px | Small elements, nav buttons |
| --border-gold | 1px solid #998C5F | Standard gold border |
| --border-highlight | 4px solid #FFEA9E | Highlight kudo card border |
| --border-divider | 1px solid #2E3940 | Footer top border |

### Shadows

No box-shadows are used in this design. The visual depth is achieved through color contrast (dark background with light cards) and borders.

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 5862px | Full page height |
| padding-x | 144px | Horizontal content padding |
| background | #00101A | Dark navy background |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| gap | 120px | Between major sections |
| align-items | center | Centered content |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────┐
│  Page (w: 1440px, bg: #00101A)                                       │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Header (w: 1440, h: 80, px: 144, bg: rgba(16,20,23,0.8))      ││
│  │  ┌─────────┐  ┌─────────────────────┐  ┌──────────────────────┐││
│  │  │  Logo   │  │  Nav Links (gap:64) │  │  Actions (gap:16)    │││
│  │  │  52x48  │  │  About|Award|Kudos  │  │  Bell|Lang|Profile   │││
│  │  └─────────┘  └─────────────────────┘  └──────────────────────┘││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  KV Kudos - Hero Banner (w: 1440, h: 512)                       ││
│  │  ┌────────────────────────────────────────────────────┐         ││
│  │  │  Background Image + Gradient Overlay               │         ││
│  │  │  ┌──────────────────────────────────────────┐      │         ││
│  │  │  │  Title: "He thong ghi nhan va cam on"    │      │         ││
│  │  │  │  (36px/700, Montserrat)                  │      │         ││
│  │  │  │  KUDOS Logo (SVN-Gotham, ~140px)         │      │         ││
│  │  │  └──────────────────────────────────────────┘      │         ││
│  │  │  ┌──────────────────────────────────────────┐      │         ││
│  │  │  │  Button Ghi Nhan (738x72, radius:68px)   │      │         ││
│  │  │  │  bg: rgba(255,234,158,0.1), border:gold  │      │         ││
│  │  │  └──────────────────────────────────────────┘      │         ││
│  │  └────────────────────────────────────────────────────┘         ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  B: HIGHLIGHT KUDOS (w: 1440, h: 786, gap: 40)                  ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Header (px: 144)                                        │   ││
│  │  │  "Sun* Annual Awards 2025" (24px) + "HIGHLIGHT KUDOS"   │   ││
│  │  │  (57px) + [Hashtag v] [Phong ban v] filters              │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Carousel (w: 1440, h: 525)                              │   ││
│  │  │  [<] [Card][  ACTIVE CARD (528px)  ][Card] [>]           │   ││
│  │  │       bg: #FFF8E1, border: 4px #FFEA9E, radius: 16px    │   ││
│  │  │       padding: 24px 24px 16px 24px, gap: 16px            │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  │  ┌──────────────────────────────────────────────────────────┐   ││
│  │  │  Pagination: [<]  2/5  [>]  (gap: 32px, centered)       │   ││
│  │  └──────────────────────────────────────────────────────────┘   ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  SPOTLIGHT BOARD (w: 1440, h: 791)                               ││
│  │  "Sun* Annual Awards 2025" + "SPOTLIGHT BOARD" (header)          ││
│  │  ┌────────────────────────────────────────────────────────┐     ││
│  │  │  Spotlight Container (1157x548, radius: 47px)          │     ││
│  │  │  border: 1px solid #998C5F                             │     ││
│  │  │  ┌──────────────────────────────────┐                  │     ││
│  │  │  │  "388 KUDOS" | [Search] | [Pan]  │                  │     ││
│  │  │  │  Word Cloud Visualization        │                  │     ││
│  │  │  └──────────────────────────────────┘                  │     ││
│  │  └────────────────────────────────────────────────────────┘     ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  C: ALL KUDOS (w: 1440, gap: 40)                                 ││
│  │  "Sun* Annual Awards 2025" + "ALL KUDOS" (header, px: 144)       ││
│  │  ┌──────────────────────────┐  ┌──────────────────────────┐     ││
│  │  │  Kudo Feed (w: 680)      │  │  D: Sidebar (w: 422)    │     ││
│  │  │  ┌──────────────────┐    │  │  ┌──────────────────┐   │     ││
│  │  │  │ KUDO Post Card   │    │  │  │ Stats Card       │   │     ││
│  │  │  │ bg: #FFF8E1      │    │  │  │ bg: #00070C      │   │     ││
│  │  │  │ radius: 24px     │    │  │  │ border: gold     │   │     ││
│  │  │  │ p: 40px          │    │  │  │ radius: 17px     │   │     ││
│  │  │  │ gap: 16px        │    │  │  │ p: 24px          │   │     ││
│  │  │  │ ┌──────────────┐ │    │  │  │ [Stats rows]     │   │     ││
│  │  │  │ │Sender→Recvr  │ │    │  │  │ [Mo SecretBox btn]│   │     ││
│  │  │  │ │Time|Hashtag  │ │    │  │  │ bg:#FFEA9E,r:8px │   │     ││
│  │  │  │ │Content(5ln)  │ │    │  │  └──────────────────┘   │     ││
│  │  │  │ │Images(max 5) │ │    │  │  ┌──────────────────┐   │     ││
│  │  │  │ │Tags|Heart|Lnk│ │    │  │  │ 10 Sunner List   │   │     ││
│  │  │  │ └──────────────┘ │    │  │  │ bg: #00070C      │   │     ││
│  │  │  └──────────────────┘    │  │  │ border: gold     │   │     ││
│  │  │  [More cards...]         │  │  │ radius: 17px     │   │     ││
│  │  └──────────────────────────┘  │  └──────────────────┘   │     ││
│  │                                 └──────────────────────────┘     ││
│  └──────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Footer (w: 1440, px: 90, py: 40)                                ││
│  │  border-top: 1px solid #2E3940                                   ││
│  │  [Nav links]                    [Copyright © 2025]               ││
│  └──────────────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A.1 - Button Ghi Nhan (Input Bar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13449 | - |
| width | 738px | `width: 738px` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.1) | `background: var(--Details-SecondaryButton-Normal)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 68px | `border-radius: 68px` |
| gap | 8px | `gap: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | background: rgba(255, 234, 158, 0.2), border-color: #FFEA9E |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### B.3 - KUDO Highlight Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | - |
| width | 528px | `width: 528px` |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| background | #FFF8E1 | `background: var(--Details-PrimaryButton-Hover)` |
| border | 4px solid #FFEA9E | `border: 4px solid var(--Details-Text-Primary-1)` |
| border-radius | 16px | `border-radius: 16px` |
| gap | 16px | `gap: 16px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |

**Note:** This is the ACTIVE/CENTER card style. Side cards in the carousel appear smaller, slightly transparent, and without the thick border — they use `opacity: 0.7`, `scale: 0.9`, `border: 1px solid #998C5F`.

---

### C.3 - KUDO Post Card (Feed)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3127:21871 | - |
| width | 680px | `width: 680px` |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| background | rgba(255, 248, 225, 1) / #FFF8E1 | `background-color: #FFF8E1` |
| border-radius | 24px | `border-radius: 24px` |
| gap | 16px | `gap: 16px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| transition | transform 150ms ease | `transition: transform 150ms ease` |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | transform: translateY(-2px) (subtle lift) |
| Focus-within | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### D.1 - Statistics Card (Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13489 | - |
| width | 422px (fill) | `width: 100%` |
| padding | 24px | `padding: 24px` |
| background | #00070C | `background: var(--Details-Container-2)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 17px | `border-radius: 17px` |
| gap | 10px | `gap: 10px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |

---

### D.1.8 - Button Mo Secret Box (Open Gift)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13497 | - |
| width | 374px (fill) | `width: 100%` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| gap | 8px | `gap: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E, color: dark text |
| Hover | background: #FFE082 (slightly darker gold) |
| Active | background: #FFD54F |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

### D.3 - 10 Sunner Gift List Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13510 | - |
| width | 422px (fill) | `width: 100%` |
| padding | 24px 16px 24px 24px | `padding: 24px 16px 24px 24px` |
| background | #00070C | `background: var(--Details-Container-2)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 17px | `border-radius: 17px` |
| gap | 10px | `gap: 10px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |

---

### B.1.1 / B.1.2 - Filter Dropdown Buttons (Hashtag / Phong ban)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13459 (Hashtag), 2940:13460 (Phong ban) | - |
| padding | 16px | `padding: 16px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background: transparent` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |
| color | #FFF | `color: #FFF` |
| font | 14px/700 Montserrat | `font: 700 14px/20px Montserrat` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | border-color: #FFEA9E, color: #FFEA9E |
| Open | border-color: #FFEA9E, background: rgba(255, 234, 158, 0.1) |

---

### B.2.1 / B.2.2 - Carousel Arrow Buttons

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13470 (back), 2940:13468 (forward) | - |
| width | 48px | `width: 48px` |
| height | 48px | `height: 48px` |
| border-radius | 50% | `border-radius: 50%` |
| background | rgba(0, 0, 0, 0.5) | `background: rgba(0, 0, 0, 0.5)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | background: rgba(0, 0, 0, 0.7) |
| Disabled | opacity: 0.3, cursor: not-allowed, pointer-events: none |

---

### C.3 Internal - Kudo Post Card Elements

**Sender/Receiver Row:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| Avatar | 40px circle | `width: 40px; height: 40px; border-radius: 50%` |
| Name | 14px/700 Montserrat, #2E3940 | - |
| Star count | 10px/500 Montserrat, #999 | - |

**Hashtag Label (e.g., "IDOL GIOI TRE"):**
| Property | Value | CSS |
|----------|-------|-----|
| background | rgba(241, 118, 118, 0.2) | `background: rgba(241, 118, 118, 0.2)` |
| color | #F17676 | `color: #F17676` |
| padding | 4px 8px | `padding: 4px 8px` |
| border-radius | 4px | `border-radius: 4px` |
| font | 14px/700 Montserrat | - |

**Image Gallery:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| gap | 8px | `gap: 8px` |
| Thumbnail | ~100px square, border-radius: 8px, object-fit: cover | - |
| Max items | 5 | Remaining count overlay on 5th image if more |

**Action Bar (Hearts + Copy Link):**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| Heart icon | 20px, #999 (inactive) / #D4271D (active) | - |
| Heart count | 16px/700 Montserrat, #999 | - |
| Copy Link | 14px/500 Montserrat, #999, with link icon | - |

---

### B.7 - Spotlight Board Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14174 | - |
| width | 1157px | `width: 1157px` |
| height | 548px | `height: 548px` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border)` |
| border-radius | 47.14px | `border-radius: 47px` |
| overflow | hidden | `overflow: hidden` |

---

### Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13433 | - |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.8) | `background-color: rgba(16, 20, 23, 0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | fixed | `position: fixed` (sticky header) |
| z-index | 10 | `z-index: 10` |

---

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13522 | - |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--Details-Divider)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 1440px)
├── Header (h: 80px, px: 144px, bg: rgba(16,20,23,0.8), fixed)
│   ├── Left Nav (flex, gap: 64px)
│   │   ├── Logo (52x48px)
│   │   └── Nav Links (flex, gap: 64px, font: 16px/700 Montserrat)
│   │       └── Active Link (border-bottom: 1px solid #FFEA9E)
│   └── Right Actions (flex, gap: 16px)
│       ├── Bell Icon Button (40x40, radius: 4px)
│       ├── Language Selector (border: 1px solid #998C5F, radius: 4px)
│       └── Profile Button (108x56, radius: 4px)
│
├── KV Kudos Hero (w: 1440, h: 512px)
│   ├── Background Image (full-bleed)
│   ├── Gradient Overlay (linear-gradient 25deg)
│   ├── Title Block (w: 1152px, px: 144px, gap: 10px)
│   │   ├── "He thong ghi nhan va cam on" (36px/700, Montserrat)
│   │   └── "KUDOS" logo (SVN-Gotham, ~140px)
│   └── Button Ghi Nhan (738x72, radius: 68px, bg: gold 10%)
│       ├── Pen Icon (left)
│       ├── Placeholder Text
│       └── Search Icon + "Tim kiem profile Sunner" (right area)
│
├── Bìa Content Wrapper (w: 1440px, py: 96px 120px, gap: 120px)
│   │
│   ├── Highlight Section (w: 1440px, gap: 40px)
│   │   ├── Section Header (px: 144px, gap: 16px)
│   │   │   ├── "Sun* Annual Awards 2025" (24px/700, color: #FFEA9E)
│   │   │   ├── "HIGHLIGHT KUDOS" (57px/700, color: #FFEA9E)
│   │   │   └── Filter Row (flex, gap)
│   │   │       ├── Hashtag Dropdown Button
│   │   │       └── Phong ban Dropdown Button
│   │   ├── Carousel Container (w: 1440px, h: 525px)
│   │   │   ├── Left Arrow Button (circular)
│   │   │   ├── Left Fade Gradient
│   │   │   ├── Kudo Highlight Cards (528px each)
│   │   │   │   ├── Sender Info (avatar + name + stars + badge)
│   │   │   │   ├── Arrow Icon
│   │   │   │   ├── Receiver Info (avatar + name + stars + badge)
│   │   │   │   ├── Time + Hashtag label
│   │   │   │   ├── Content (max 3 lines, 20px/700)
│   │   │   │   ├── Hashtag tags
│   │   │   │   └── Actions (hearts count + copy link + expand)
│   │   │   ├── Right Fade Gradient
│   │   │   └── Right Arrow Button (circular)
│   │   └── Pagination (flex, center, gap: 32px)
│   │       ├── Left Arrow
│   │       ├── "2/5" (text, 32px)
│   │       └── Right Arrow
│   │
│   ├── Spotlight Section (w: 1440px, h: 791px)
│   │   ├── Section Header (px: 144px, gap: 16px)
│   │   │   ├── "Sun* Annual Awards 2025" (24px/700)
│   │   │   └── "SPOTLIGHT BOARD" (57px/700)
│   │   └── Spotlight Container (1157x548, radius: 47px, border: gold)
│   │       ├── Header Bar
│   │       │   ├── "388 KUDOS" (32px/700)
│   │       │   ├── Search Input
│   │       │   └── Pan/Zoom Toggle
│   │       └── Word Cloud Canvas (interactive)
│   │
│   └── All Kudos Section (w: 1440px, gap: 40px)
│       ├── Section Header (px: 144px, gap: 16px)
│       │   ├── "Sun* Annual Awards 2025" (24px/700)
│       │   └── "ALL KUDOS" (57px/700)
│       └── Content Row (flex, gap: 40px)
│           ├── Kudo Feed Column (w: 680px)
│           │   └── Kudo Post Cards (gap: 40px)
│           │       ├── Sender Row (avatar + name + stars + badge)
│           │       ├── Arrow → Receiver Row
│           │       ├── Hashtag Label (e.g., "IDOL GIOI TRE")
│           │       ├── Time Label ("10:00 - 10/30/2025")
│           │       ├── Content (max 5 lines, 20px/700)
│           │       ├── Image Gallery (max 5 thumbnails)
│           │       ├── Hashtag Tags (#Dedicated #Inspiring...)
│           │       └── Action Bar (hearts + copy link)
│           │
│           └── Sidebar (w: 422px, gap: 24px)
│               ├── Stats Card (bg: #00070C, radius: 17px, p: 24px)
│               │   ├── Stat Rows (label: value pairs, 22px/700)
│               │   │   ├── "So Kudos ban nhan duoc: 25"
│               │   │   ├── "So Kudos ban da gui: 25"
│               │   │   ├── "So tim ban nhan duoc: 25" (heart icon)
│               │   │   ├── ── divider ──
│               │   │   ├── "So Secret Box ban da mo: 25"
│               │   │   └── "So Secret Box chua mo: 25"
│               │   └── Mo Secret Box Button (bg: #FFEA9E, radius: 8px, h: 60px)
│               │
│               └── 10 Sunner Card (bg: #00070C, radius: 17px, p: 24px)
│                   ├── Title "10 SUNNER NHAN QUA MOI NHAT"
│                   └── List Items (avatar + name + description)
│
└── Footer (px: 90px, py: 40px, border-top: 1px solid #2E3940)
    ├── Nav Links (About SAA 2025 | Award Information | Sun* Kudos | Tieu chuan chung)
    └── Copyright "Ban quyen thuoc ve Sun* (c) 2025"
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
| Container | padding: 16px |
| Header | height: auto, hamburger menu, px: 16px |
| Hero Title | font-size: 24px |
| KUDOS Logo | font-size: 60px |
| Button Ghi Nhan | width: 100%, height: 56px |
| Section Titles | font-size: 32px |
| Highlight Carousel | Single card view, width: 100% |
| Spotlight Board | width: 100%, height: 300px, radius: 24px |
| ALL KUDOS Layout | Single column (feed only), sidebar below |
| Kudo Post Card | width: 100%, padding: 24px |
| Sidebar | width: 100%, below feed |
| Footer | flex-direction: column, gap: 16px, text-align: center |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Container | padding: 24px |
| Header | px: 24px |
| Section Titles | font-size: 40px |
| Highlight Carousel | Card width: 400px |
| Spotlight Board | width: 100%, height: 400px |
| ALL KUDOS Layout | Single column, sidebar below feed |
| Kudo Post Card | width: 100% |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Container | max-width: 1440px, margin: 0 auto, px: 144px |
| ALL KUDOS Layout | Two columns: feed (680px) + sidebar (422px) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| icon-pen | ~20px | #FFEA9E | Button Ghi Nhan left icon |
| icon-search | ~20px | #999 | Search input, Spotlight search |
| icon-chevron-left | ~24px | #FFEA9E | Carousel back button |
| icon-chevron-right | ~24px | #FFEA9E | Carousel forward button |
| icon-heart (outline) | ~20px | #999 | Inactive heart |
| icon-heart (filled) | ~20px | #D4271D | Active heart |
| icon-link | ~16px | #999 | Copy link button |
| icon-arrow-right | ~16px | #FFEA9E | Sender → Receiver arrow |
| icon-pan-zoom | ~20px | #FFEA9E | Spotlight pan/zoom toggle |
| icon-bell | ~20px | #FFF | Header notification bell |
| icon-chevron-down | ~12px | #FFF | Dropdown arrows |
| icon-gift | ~20px | #FFEA9E | Secret Box button icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel | transform (translateX) | 300ms | ease-in-out | Arrow click |
| Heart Icon | transform (scale) | 150ms | ease-out | Click |
| Heart Icon | color | 150ms | ease-in-out | Click |
| Button | background-color | 150ms | ease-in-out | Hover |
| Input Bar | border-color, background | 150ms | ease-in-out | Hover/Focus |
| Profile Preview | opacity, transform | 200ms | ease-out | Hover |
| Toast | opacity, translateY | 200ms | ease-out | Appear/Disappear |
| Spotlight | transform | continuous | linear | Pan/Zoom |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page Container | 2940:13431 | `bg-[#00101A] min-h-screen` | `<KudosLiveBoard />` |
| Header | 2940:13433 | `fixed top-0 w-full h-20 px-36 bg-[rgba(16,20,23,0.8)] flex items-center justify-between z-10` | `<Header />` (existing) |
| KV Hero Banner | 2940:13437 | `relative w-full h-[512px]` | `<KudosHero />` |
| Button Ghi Nhan | 2940:13449 | `w-[738px] h-[72px] rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] flex items-center gap-2 px-4 py-6 cursor-pointer` | `<KudosInputBar />` |
| Highlight Section | 2940:13451 | `w-full flex flex-col gap-10` | `<HighlightKudos />` |
| Section Header | 2940:13452 | `px-36 flex flex-col gap-4` | `<SectionHeader />` |
| Filter Dropdown | 2940:13459 | `border border-[#998C5F] rounded px-4 py-4 flex items-center gap-1 text-white text-sm font-bold` | `<FilterDropdown />` |
| Carousel Arrow | 2940:13470 | `w-12 h-12 rounded-full bg-black/50 flex items-center justify-center` | `<CarouselArrow />` |
| Highlight Card | 2940:13465 | `w-[528px] rounded-2xl border-4 border-[#FFEA9E] bg-[#FFF8E1] p-6 flex flex-col gap-4` | `<KudoHighlightCard />` |
| Carousel Pagination | 2940:13471 | `flex items-center justify-center gap-8` | `<CarouselPagination />` |
| Spotlight Container | 2940:14174 | `w-[1157px] h-[548px] rounded-[47px] border border-[#998C5F] overflow-hidden` | `<SpotlightBoard />` |
| All Kudos Section | 2940:13475 | `w-full flex flex-col gap-10` | `<AllKudos />` |
| Kudo Post Card | 3127:21871 | `w-[680px] rounded-3xl bg-[#FFF8E1] p-10 flex flex-col gap-4` | `<KudoPostCard />` |
| Stats Sidebar | 2940:13489 | `bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-2.5` | `<KudosStatsCard />` |
| Mo Secret Box Button | 2940:13497 | `w-full h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 px-4` | `<OpenGiftButton />` |
| 10 Sunner List | 2940:13510 | `bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-2.5` | `<RecentGiftsList />` |
| Footer | 2940:13522 | `w-full px-[90px] py-10 border-t border-[#2E3940] flex items-center justify-between` | `<Footer />` (existing) |

---

## Notes

- All colors should use CSS variables for theming support (design uses CSS variables like `--Details-Text-Primary-1`).
- Three font families are used: **Montserrat** (primary), **SVN-Gotham** (decorative KUDOS logo), **Montserrat Alternates** (footer).
- Icons MUST be implemented as Icon Components, not as raw SVG files or img tags (per constitution).
- The Spotlight word-cloud uses variable font sizes (6-12px) for different name prominence levels. Implementation uses **@visx/wordcloud** for layout + **d3-zoom** for pan/zoom.
- Carousel fade gradients on left/right edges use the page background color (#00101A) to create a smooth fade effect.
- The design uses Figma CSS variables (e.g., `var(--Details-Border, #998C5F)`) — map these to Tailwind config or CSS custom properties.

# Design Style: Viet Kudo (Write Kudos Modal)

**Frame ID**: `520:11602`
**Frame Name**: `Viet Kudo`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/6398
**Extracted At**: 2026-03-23

---

## Design Tokens

### Colors

| Token Name | Value | Opacity | Usage |
|------------|-------|---------|-------|
| --color-modal-bg | #FFFFFF | 100% | Modal container background |
| --color-overlay | rgba(0, 0, 0, 0.5) | 50% | Modal backdrop overlay |
| --color-page-bg | rgba(0, 16, 26, 1) / #00101A | 100% | Page background behind modal |
| --color-text-primary | #2E3940 | 100% | Modal title, labels, body text |
| --color-text-placeholder | rgba(153, 153, 153, 1) / #999999 | 100% | Input placeholders, hint text |
| --color-text-required | #FF0000 / red | 100% | Required field asterisk (*) |
| --color-input-border | rgba(153, 153, 153, 1) / #999999 | 100% | Input/textarea borders |
| --color-input-bg | #FFFFFF | 100% | Input field background |
| --color-toolbar-border | rgba(153, 153, 153, 1) / #999999 | 100% | Rich text toolbar border |
| --color-toolbar-divider | rgba(153, 153, 153, 0.3) | 30% | Divider between toolbar buttons |
| --color-button-primary-bg | rgba(255, 234, 158, 1) / #FFEA9E | 100% | "Gui" (Submit) button background |
| --color-button-primary-text | #2E3940 | 100% | "Gui" button text |
| --color-button-secondary-bg | transparent | 0% | "Huy" (Cancel) button background |
| --color-button-secondary-border | rgba(153, 153, 153, 1) / #999999 | 100% | "Huy" button border |
| --color-button-secondary-text | #2E3940 | 100% | "Huy" button text |
| --color-link-blue | #3B82F6 | 100% | "Tieu chuan cong dong" link |
| --color-checkbox-border | rgba(153, 153, 153, 1) / #999999 | 100% | Checkbox border |
| --color-checkbox-checked | #FFEA9E | 100% | Checkbox checked state |
| --color-error | #EF4444 | 100% | Validation error text and borders |
| --color-thumbnail-delete | #EF4444 | 100% | Image thumbnail delete button (red circle) |
| --color-hashtag-chip-bg | rgba(241, 118, 118, 0.2) | 20% | Hashtag chip background |
| --color-hashtag-chip-text | #F17676 | 100% | Hashtag chip text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Color | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|-------|
| --text-modal-title | Montserrat | 24px | 700 | 32px | 0 | #2E3940 | Modal title "Gui loi cam on va ghi nhan den dong doi" |
| --text-field-label | Montserrat | 16px | 700 | 24px | 0 | #2E3940 | Field labels (Nguoi nhan, Danh hieu, Hashtag, Image) |
| --text-required-asterisk | Montserrat | 16px | 700 | 24px | 0 | #FF0000 | Required marker (*) |
| --text-input | Montserrat | 16px | 400 | 24px | 0 | #2E3940 | Input field value text |
| --text-placeholder | Montserrat | 16px | 400 | 24px | 0 | #999 | Input placeholder text |
| --text-hint | Montserrat | 14px | 400 | 20px | 0 | #999 | Hint text below fields (e.g., "Vi du: Nguoi truyen dong luc cho toi") |
| --text-mention-hint | Montserrat | 14px | 500 | 20px | 0 | #2E3940 | Mention hint 'Ban co the "@ + ten"...' |
| --text-toolbar-icon | Montserrat | 16px | 700 | 24px | 0 | #2E3940 | Toolbar icons (B, I, S) |
| --text-link | Montserrat | 14px | 500 | 20px | 0 | #3B82F6 | "Tieu chuan cong dong" link |
| --text-button-primary | Montserrat | 16px | 700 | 24px | 0 | #2E3940 | "Gui" button text |
| --text-button-secondary | Montserrat | 16px | 700 | 24px | 0 | #2E3940 | "Huy" button text |
| --text-checkbox-label | Montserrat | 16px | 400 | 24px | 0 | #999 | Anonymous checkbox label |
| --text-add-button | Montserrat | 14px | 500 | 20px | 0 | #2E3940 | "+ Hashtag", "+ Image" text |
| --text-limit-note | Montserrat | 12px | 400 | 16px | 0 | #999 | "Toi da 5" limit note |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding | 40px | Modal container internal padding |
| --spacing-modal-padding-x | 48px | Modal horizontal padding |
| --spacing-section-gap | 24px | Gap between form sections (fields) |
| --spacing-field-gap | 8px | Gap between label and input within a field |
| --spacing-hint-gap | 4px | Gap between input and hint text |
| --spacing-toolbar-gap | 0px | Toolbar buttons flush (divided by borders) |
| --spacing-thumbnail-gap | 10px | Gap between image thumbnails |
| --spacing-button-gap | 16px | Gap between Cancel and Submit buttons |
| --spacing-chip-gap | 8px | Gap between hashtag chips |
| --spacing-inner-sm | 8px | Small inner gaps |
| --spacing-inner-md | 16px | Medium inner gaps |
| --spacing-inner-lg | 24px | Large inner gaps |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 16px | Modal container corners |
| --radius-input | 8px | Input fields and textarea |
| --radius-toolbar | 8px 8px 0 0 | Toolbar top corners (attached to textarea) |
| --radius-button-primary | 8px | "Gui" submit button |
| --radius-button-secondary | 8px | "Huy" cancel button |
| --radius-checkbox | 4px | Checkbox border radius |
| --radius-thumbnail | 8px | Image thumbnail corners |
| --radius-chip | 4px | Hashtag chip corners |
| --radius-delete-btn | 50% | Image delete button (circle) |
| --border-input | 1px solid #999 | Input and textarea border |
| --border-toolbar | 1px solid #999 | Toolbar outer border |
| --border-toolbar-divider | 1px solid rgba(153,153,153,0.3) | Between toolbar buttons |
| --border-button-secondary | 1px solid #999 | "Huy" button border |
| --border-checkbox | 1px solid #999 | Unchecked checkbox |
| --border-error | 1px solid #EF4444 | Validation error border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-modal | 0 20px 60px rgba(0, 0, 0, 0.3) | Modal container shadow |
| --shadow-dropdown | 0 4px 12px rgba(0, 0, 0, 0.15) | Autocomplete/hashtag dropdown shadow |
| --shadow-thumbnail-delete | 0 1px 3px rgba(0, 0, 0, 0.2) | Image delete button shadow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| Overlay | 1440 x 1024px | Full viewport overlay |
| Modal width | 600px | Fixed width modal |
| Modal max-height | 90vh | Scrollable if content overflows |
| Modal padding | 40px 48px | Internal padding |
| Horizontal centering | margin: 0 auto | Centered in viewport |
| Vertical centering | centered | Vertically centered |

### Grid/Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| Modal display | flex | Main modal layout |
| flex-direction | column | Vertical form stack |
| gap | 24px | Between form sections |
| align-items | stretch | Full-width children |

### Layout Structure (ASCII)

```
+====================================================================+
|  Overlay (w: 100vw, h: 100vh, bg: rgba(0,0,0,0.5))               |
|                                                                     |
|   +--------------------------------------------------------------+  |
|   | Modal Container (w: 600px, p: 40px 48px, bg: #FFF,          |  |
|   | radius: 16px, shadow: modal, flex col, gap: 24px)            |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (A) Title                                                | |  |
|   | | "Gui loi cam on va ghi nhan den dong doi"                | |  |
|   | | (24px/700, Montserrat, center-aligned)                   | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (B) Nguoi nhan - Recipient field                         | |  |
|   | | +----------+  +--------------------------------------+  | |  |
|   | | | Label    |  | Search input (514x56)               |  | |  |
|   | | | "*"      |  | [Tim kiem            v]             |  | |  |
|   | | | "Nguoi   |  | border: 1px #999, radius: 8px       |  | |  |
|   | | |  nhan"   |  +--------------------------------------+  | |  |
|   | | +----------+                                             | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | Danh hieu - Title field                                  | |  |
|   | | +----------+  +--------------------------------------+  | |  |
|   | | | Label    |  | Input (514x56)                       |  | |  |
|   | | | "*"      |  | [Danh tang mot danh hieu...]         |  | |  |
|   | | | "Danh    |  | border: 1px #999, radius: 8px        |  | |  |
|   | | |  hieu"   |  +--------------------------------------+  | |  |
|   | | +----------+  Hint: "Vi du: Nguoi truyen dong luc..."    | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (C) Rich Text Toolbar                                    | |  |
|   | | +----+----+----+----+----+----+  "Tieu chuan cong dong" | |  |
|   | | | B  | I  | S  | 1. | Lk | "" |  (link, blue)          | |  |
|   | | +----+----+----+----+----+----+                          | |  |
|   | |  border: 1px #999, radius: 8px 8px 0 0                  | |  |
|   | +----------------------------------------------------------+ |  |
|   | +----------------------------------------------------------+ |  |
|   | | (D) Textarea                                             | |  |
|   | | "Hay gui gam loi cam on va ghi nhan den dong doi..."     | |  |
|   | | (min-h: 160px, border: 1px #999, radius: 0 0 8px 8px)   | |  |
|   | +----------------------------------------------------------+ |  |
|   | | (D.1) Hint: 'Ban co the "@ + ten" de nhac toi...'        | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (E) Hashtag                                              | |  |
|   | | +----------+  [+ Hashtag] "Toi da 5"                    | |  |
|   | | | "*"      |  [chip1 x] [chip2 x] ...                  | |  |
|   | | | "Hashtag"|                                             | |  |
|   | | +----------+                                             | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (F) Image                                                | |  |
|   | | +---------+  [img1][img2][img3][img4][img5] [+ Image]   | |  |
|   | | | "Image" |   x    x    x    x    x     "Toi da 5"     | |  |
|   | | +---------+  (80x80 thumbnails, radius: 8px, gap: 10px) | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (G) Anonymous checkbox                                   | |  |
|   | | [_] "Gui loi cam on va ghi nhan an danh"                 | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   | +----------------------------------------------------------+ |  |
|   | | (H) Action buttons                                       | |  |
|   | | +------------+  +----------------------------------+    | |  |
|   | | | Huy    X  |  |         Gui  >                   |    | |  |
|   | | | (secondary)|  |  (primary, bg: #FFEA9E)          |    | |  |
|   | | +------------+  +----------------------------------+    | |  |
|   | +----------------------------------------------------------+ |  |
|   |                                                              |  |
|   +--------------------------------------------------------------+  |
|                                                                     |
+====================================================================+
```

---

## Component Style Details

### Modal Overlay (Mask)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 520:11646 | - |
| position | fixed | `position: fixed` |
| inset | 0 | `inset: 0` |
| width | 100vw | `width: 100vw` |
| height | 100vh | `height: 100vh` |
| background | rgba(0, 0, 0, 0.5) | `background: rgba(0, 0, 0, 0.5)` |
| z-index | 50 | `z-index: 50` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

---

### Modal Container (Viet KUDO)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 520:11647 | - |
| width | 600px | `width: 600px` |
| max-height | 90vh | `max-height: 90vh` |
| padding | 40px 48px | `padding: 40px 48px` |
| background | #FFFFFF | `background-color: #FFFFFF` |
| border-radius | 16px | `border-radius: 16px` |
| box-shadow | 0 20px 60px rgba(0,0,0,0.3) | `box-shadow: 0 20px 60px rgba(0,0,0,0.3)` |
| overflow-y | auto | `overflow-y: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |
| z-index | 51 | `z-index: 51` |

---

### A - Modal Title

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9870 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #2E3940 | `color: #2E3940` |
| text-align | center | `text-align: center` |

---

### B - Recipient Field (Nguoi nhan)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9871 | - |
| display | flex | `display: flex` |
| align-items | flex-start | `align-items: flex-start` |
| gap | 16px | `gap: 16px` |

#### B.1 - Field Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9872 | - |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` |
| white-space | nowrap | `white-space: nowrap` |
| min-width | fit-content | `min-width: fit-content` |
| padding-top | 16px | `padding-top: 16px` |

Label text: `font: 700 16px/24px Montserrat; color: #2E3940`
Asterisk: `font: 700 16px/24px Montserrat; color: #FF0000`

#### B.2 - Search Input

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9873 | - |
| width | 514px (fill) | `width: 100%; flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | #FFFFFF | `background-color: #FFFFFF` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #999 |
| Focus | border-color: #3B82F6, box-shadow: 0 0 0 3px rgba(59,130,246,0.1) |
| Error | border-color: #EF4444, box-shadow: 0 0 0 3px rgba(239,68,68,0.1) |
| Filled | Shows avatar + name chip instead of placeholder |

---

### Danh hieu Field (Title/Honor)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;1688:10448 | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 8px | `gap: 8px` |

#### Input (Danh hieu)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;1688:10437 | - |
| width | 514px (fill) | `width: 100%; flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | #FFFFFF | `background-color: #FFFFFF` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 8px | `border-radius: 8px` |
| font | 400 16px/24px Montserrat | `font: 400 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| max-length | 100 | HTML attribute `maxlength="100"` |

Hint text below: `font: 400 14px/20px Montserrat; color: #999`
Content: "Vi du: Nguoi truyen dong luc cho toi. / Danh hieu se hien thi lam tieu de Kudos cua ban."

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #999 |
| Focus | border-color: #3B82F6, box-shadow: 0 0 0 3px rgba(59,130,246,0.1) |
| Error | border-color: #EF4444 |
| Placeholder | color: #999 |

---

### C - Rich Text Toolbar (Chuc nang)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9877 | - |
| width | 100% (fill) | `width: 100%` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-bottom | none | `border-bottom: none` |
| border-radius | 8px 8px 0 0 | `border-radius: 8px 8px 0 0` |
| background | #FFFFFF | `background: #FFFFFF` |

#### C.1-C.6 - Toolbar Buttons (B, I, S, 1., Link, Quote)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | C.1: I520:11647;520:9881, C.2: I520:11647;662:11119, C.3: I520:11647;662:11213, C.4: I520:11647;662:10376, C.5: I520:11647;662:10507, C.6: I520:11647;662:10647 | - |
| width | 48px | `width: 48px` |
| height | 48px | `height: 48px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| border-right | 1px solid rgba(153,153,153,0.3) | `border-right: 1px solid rgba(153,153,153,0.3)` |
| cursor | pointer | `cursor: pointer` |
| color | #2E3940 | `color: #2E3940` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: transparent |
| Hover | background: rgba(0,0,0,0.05) |
| Active (toggled) | background: rgba(255,234,158,0.3), color: #2E3940 |

#### C - Community Standards Link ("Tieu chuan cong dong")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;3053:11619 | - |
| font | 500 14px/20px Montserrat | `font: 500 14px/20px 'Montserrat'` |
| color | #3B82F6 | `color: #3B82F6` |
| text-decoration | underline | `text-decoration: underline` |
| margin-left | auto | `margin-left: auto` |
| padding | 0 16px | `padding: 0 16px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | color: #2563EB |

---

### D - Textarea (text filed)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9886 | - |
| width | 100% (fill) | `width: 100%` |
| min-height | 160px | `min-height: 160px` |
| padding | 16px | `padding: 16px` |
| background | #FFFFFF | `background-color: #FFFFFF` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-top | none | `border-top: none` |
| border-radius | 0 0 8px 8px | `border-radius: 0 0 8px 8px` |
| font | 400 16px/24px Montserrat | `font: 400 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| resize | vertical | `resize: vertical` |

**Placeholder:** "Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe!"
**Max characters:** 2000

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #999 (no top border) |
| Focus | border-color: #3B82F6, box-shadow: 0 0 0 3px rgba(59,130,246,0.1) |
| Error | border-color: #EF4444 |
| Placeholder | color: #999 |

---

### D.1 - Hint / Mention Guide

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9887 | - |
| font | 500 14px/20px Montserrat | `font: 500 14px/20px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| text-align | center | `text-align: center` |
| margin-top | 4px | `margin-top: 4px` |

Content: `Ban co the "@ + ten" de nhac toi dong nghiep khac`

---

### E - Hashtag Field

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9890 | - |
| display | flex | `display: flex` |
| align-items | flex-start | `align-items: flex-start` |
| gap | 16px | `gap: 16px` |

#### E.1 - Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9891 | - |
| font | 700 16px/24px Montserrat | `font: 700 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |

Asterisk: `color: #FF0000`

#### E.2 - Tag Group (Hashtag Chips + Add Button)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:8595 | - |
| display | flex | `display: flex` |
| flex-wrap | wrap | `flex-wrap: wrap` |
| gap | 8px | `gap: 8px` |
| align-items | center | `align-items: center` |

#### "+ Hashtag" Add Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:8911 | - |
| padding | 8px 16px | `padding: 8px 16px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 8px | `border-radius: 8px` |
| background | transparent | `background: transparent` |
| font | 500 14px/20px Montserrat | `font: 500 14px/20px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | border-color: #FFEA9E, background: rgba(255,234,158,0.1) |
| Hidden | display: none (when 5 hashtags selected) |

#### Hashtag Chip

| Property | Value | CSS |
|----------|-------|-----|
| padding | 4px 8px | `padding: 4px 8px` |
| background | rgba(241, 118, 118, 0.2) | `background: rgba(241, 118, 118, 0.2)` |
| border-radius | 4px | `border-radius: 4px` |
| font | 700 14px/20px Montserrat | `font: 700 14px/20px 'Montserrat'` |
| color | #F17676 | `color: #F17676` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |

Close icon (x): `width: 12px; height: 12px; cursor: pointer; color: #F17676`

---

### F - Image Upload Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9896 | - |
| display | flex | `display: flex` |
| align-items | flex-start | `align-items: flex-start` |
| gap | 16px | `gap: 16px` |

#### F.1 - Label

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9897 | - |
| font | 700 16px/24px Montserrat | `font: 700 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |

#### F.2-F.4 - Image Thumbnail

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | I520:11647;662:9197, I520:11647;662:9393, I520:11647;662:9439 | - |
| width | 80px | `width: 80px` |
| height | 80px | `height: 80px` |
| border-radius | 8px | `border-radius: 8px` |
| object-fit | cover | `object-fit: cover` |
| position | relative | `position: relative` |
| overflow | visible | `overflow: visible` |

Delete button (red circle "x" at top-right):
| Property | Value | CSS |
|----------|-------|-----|
| position | absolute | `position: absolute` |
| top | -6px | `top: -6px` |
| right | -6px | `right: -6px` |
| width | 20px | `width: 20px` |
| height | 20px | `height: 20px` |
| border-radius | 50% | `border-radius: 50%` |
| background | #EF4444 | `background: #EF4444` |
| color | #FFF | `color: #FFF` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |
| font-size | 12px | `font-size: 12px` |

#### F.5 - "+ Image" Add Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:9132 | - |
| padding | 8px 16px | `padding: 8px 16px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 8px | `border-radius: 8px` |
| background | transparent | `background: transparent` |
| font | 500 14px/20px Montserrat | `font: 500 14px/20px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| gap | 2px | `gap: 2px` |
| cursor | pointer | `cursor: pointer` |

Limit note ("Toi da 5"): `font: 400 12px/16px Montserrat; color: #999`

**States:**
| State | Changes |
|-------|---------|
| Hover | border-color: #FFEA9E, background: rgba(255,234,158,0.1) |
| Hidden | display: none (when 5 images attached) |

---

### G - Anonymous Checkbox (Gui an danh)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:14099 | - |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 12px | `gap: 12px` |
| cursor | pointer | `cursor: pointer` |

Checkbox box:
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:14099;520:14097 | - |
| width | 20px | `width: 20px` |
| height | 20px | `height: 20px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 4px | `border-radius: 4px` |
| background | transparent | `background: transparent` |

Label: `font: 400 16px/24px Montserrat; color: #999`

**States:**
| State | Changes |
|-------|---------|
| Unchecked | border: 1px solid #999, background: transparent |
| Checked | border: 1px solid #FFEA9E, background: #FFEA9E, checkmark: #2E3940 |
| Hover | border-color: #FFEA9E |

---

### H - Action Buttons (Footer)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9905 | - |
| display | flex | `display: flex` |
| gap | 16px | `gap: 16px` |
| width | 100% | `width: 100%` |
| align-items | center | `align-items: center` |

#### H.1 - Cancel Button (Huy)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9906 | - |
| width | auto | `width: auto` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | transparent | `background: transparent` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 8px | `border-radius: 8px` |
| font | 700 16px/24px Montserrat | `font: 700 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | As above |
| Hover | background: rgba(0,0,0,0.05), border-color: #2E3940 |
| Active | background: rgba(0,0,0,0.1) |
| Focus | outline: 2px solid #3B82F6, outline-offset: 2px |

#### H.2 - Submit Button (Gui)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9907 | - |
| width | 100% (fill) | `flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| font | 700 16px/24px Montserrat | `font: 700 16px/24px 'Montserrat'` |
| color | #2E3940 | `color: #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | background: #FFE082 (slightly darker gold) |
| Active | background: #FFD54F |
| Disabled | opacity: 0.5, cursor: not-allowed, pointer-events: none |
| Loading | Show spinner icon, text: "Dang gui...", pointer-events: none |
| Focus | outline: 2px solid #3B82F6, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
Overlay (fixed, inset: 0, bg: rgba(0,0,0,0.5), z-index: 50)
|
+-- Modal Container (520:11647) (w: 600px, max-h: 90vh, p: 40px 48px, bg: #FFF, radius: 16px, flex col, gap: 24px)
    |
    +-- (A) Title (text: 24px/700 Montserrat, color: #2E3940, text-align: center)
    |       "Gui loi cam on va ghi nhan den dong doi"
    |
    +-- (B) Recipient Field (flex row, gap: 16px)
    |   +-- B.1 Label ("*" red + "Nguoi nhan" bold, nowrap, pt: 16px)
    |   +-- B.2 Search Input (h: 56px, border: 1px #999, radius: 8px, flex: 1)
    |       +-- Placeholder text ("Tim kiem")
    |       +-- Dropdown chevron icon (right)
    |
    +-- Danh hieu Field (flex col, gap: 8px)
    |   +-- Row (flex row, gap: 16px)
    |   |   +-- Label ("*" red + "Danh hieu" bold, nowrap, pt: 16px)
    |   |   +-- Input (h: 56px, border: 1px #999, radius: 8px, flex: 1)
    |   +-- Hint Text (14px/400, #999, two lines)
    |
    +-- Content Section (flex col, gap: 0)
    |   +-- (C) Rich Text Toolbar (flex row, border: 1px #999, radius: 8px 8px 0 0)
    |   |   +-- C.1 Bold "B" (48x48, toggle)
    |   |   +-- C.2 Italic "I" (48x48, toggle)
    |   |   +-- C.3 Strikethrough "S" (48x48, toggle)
    |   |   +-- C.4 Numbered List (48x48, toggle)
    |   |   +-- C.5 Link (48x48, action)
    |   |   +-- C.6 Quote (48x48, toggle)
    |   |   +-- Spacer (flex: 1)
    |   |   +-- "Tieu chuan cong dong" link (14px/500, blue, underline)
    |   |
    |   +-- (D) Textarea (min-h: 160px, border: 1px #999, no top border, radius: 0 0 8px 8px)
    |   +-- (D.1) Mention Hint (14px/500, #2E3940, center, mt: 4px)
    |
    +-- (E) Hashtag Field (flex row, gap: 16px)
    |   +-- E.1 Label ("*" red + "Hashtag" bold)
    |   +-- E.2 Tag Group (flex wrap, gap: 8px)
    |       +-- [+ Hashtag] button (border: 1px #999, radius: 8px, p: 8px 16px)
    |       +-- "Toi da 5" note (12px/400, #999)
    |       +-- Hashtag Chip (bg: rgba(241,118,118,0.2), radius: 4px, p: 4px 8px) [repeated]
    |
    +-- (F) Image Section (flex row, gap: 16px)
    |   +-- F.1 Label ("Image" bold)
    |   +-- Thumbnails Row (flex wrap, gap: 10px)
    |       +-- F.2-F.4 Image Thumbnail (80x80, radius: 8px, cover) [up to 5]
    |       |   +-- Delete Button (abs, top-right, 20px circle, bg: red)
    |       +-- F.5 [+ Image] button (border: 1px #999, radius: 8px)
    |            +-- "Toi da 5" note (12px/400, #999)
    |
    +-- (G) Anonymous Checkbox (flex row, gap: 12px)
    |   +-- Checkbox (20x20, border: 1px #999, radius: 4px)
    |   +-- Label (16px/400, #999)
    |
    +-- (H) Action Buttons (flex row, gap: 16px, w: 100%)
        +-- H.1 Cancel "Huy" (h: 56px, border: 1px #999, radius: 8px, auto width)
        |   +-- Text "Huy" + Close icon
        +-- H.2 Submit "Gui" (h: 56px, bg: #FFEA9E, radius: 8px, flex: 1)
            +-- Text "Gui" + Send icon
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | --- |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Modal Container | width: 100%, max-width: 100vw, border-radius: 16px 16px 0 0, position: fixed, bottom: 0 |
| Modal padding | padding: 24px 16px |
| Field layout | flex-direction: column (label above input) |
| Image thumbnails | width: 64px, height: 64px |
| Action buttons | flex-direction: column-reverse, gap: 8px |
| Submit button | width: 100% |
| Cancel button | width: 100% |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal Container | width: 560px, margin: 0 auto |
| Modal padding | padding: 32px 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Modal Container | width: 600px, centered vertically and horizontally |
| All | Default design as specified above |

---

## Icon Specifications

| Icon Name | Node Reference | Size | Color | Usage |
|-----------|---------------|------|-------|-------|
| MM_MEDIA_Down | I520:11647;520:9873;186:2761 | 20x20 | #999 | Search dropdown chevron |
| MM_MEDIA_Bold | I520:11647;520:9881;186:1420 | 20x20 | #2E3940 | Toolbar Bold (B) |
| MM_MEDIA_Italic | I520:11647;662:11119;186:1420 | 20x20 | #2E3940 | Toolbar Italic (I) |
| MM_MEDIA_Strikethrough | I520:11647;662:11213;186:1420 | 20x20 | #2E3940 | Toolbar Strikethrough (S) |
| MM_MEDIA_Number List | I520:11647;662:10376;186:1420 | 20x20 | #2E3940 | Toolbar Numbered list |
| MM_MEDIA_Link | I520:11647;662:10507;186:1420 | 20x20 | #2E3940 | Toolbar Link |
| MM_MEDIA_Quote | I520:11647;662:10647;186:1420 | 20x20 | #2E3940 | Toolbar Quote |
| MM_MEDIA_Plus | I520:11647;662:8911;186:2759 | 16x16 | #2E3940 | "+ Hashtag" / "+ Image" icon |
| MM_MEDIA_Close | I520:11647;520:9906;186:2761 | 20x20 | #2E3940 | Cancel button close icon |
| MM_MEDIA_Send | I520:11647;520:9907;186:1766 | 20x20 | #2E3940 | Submit button send icon |
| MM_MEDIA_Close Tiny | (thumbnail delete) | 12x12 | #FFF | Image thumbnail delete (x) |

All icons MUST be implemented as **Icon Components**, not as `<img>` tags or inline SVGs.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Overlay | opacity | 200ms | ease-out | Modal open/close |
| Modal Container | opacity, transform (translateY) | 250ms | ease-out | Modal open: translateY(20px) -> 0; close: reverse |
| Input / Textarea | border-color, box-shadow | 150ms | ease-in-out | Focus |
| Toolbar Button | background-color | 100ms | ease-in-out | Hover / Toggle |
| Cancel Button | background-color, border-color | 150ms | ease-in-out | Hover |
| Submit Button | background-color | 150ms | ease-in-out | Hover |
| Hashtag Chip | opacity, transform (scale) | 150ms | ease-out | Add/Remove |
| Image Thumbnail | opacity, transform (scale) | 200ms | ease-out | Add/Remove |
| Checkbox | background-color, border-color | 150ms | ease-in-out | Check/Uncheck |
| Submit Loading | spinner rotation | 1000ms | linear | Infinite during loading |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Modal Overlay | 520:11646 | `fixed inset-0 bg-black/50 z-50 flex items-center justify-center` | `<WriteKudoModal>` (overlay) |
| Modal Container | 520:11647 | `w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-10 px-12 flex flex-col gap-6 shadow-xl z-[51]` | `<WriteKudoModal>` (content) |
| Title (A) | I520:11647;520:9870 | `text-2xl font-bold text-center text-[#2E3940] font-montserrat` | `<h2>` inside modal |
| Recipient Field (B) | I520:11647;520:9871 | `flex items-start gap-4` | `<RecipientField>` |
| Search Input (B.2) | I520:11647;520:9873 | `h-14 flex-1 border border-[#999] rounded-lg px-4 flex items-center justify-between` | `<SearchDropdown>` |
| Danh hieu Field | I520:11647;1688:10448 | `flex flex-col gap-2` | `<TitleField>` |
| Danh hieu Input | I520:11647;1688:10437 | `h-14 flex-1 border border-[#999] rounded-lg px-4 font-montserrat` | `<input>` |
| Rich Text Toolbar (C) | I520:11647;520:9877 | `flex items-center border border-[#999] border-b-0 rounded-t-lg bg-white` | `<RichTextToolbar>` |
| Toolbar Button (C.1-C.6) | various | `w-12 h-12 flex items-center justify-center border-r border-[#999]/30 cursor-pointer hover:bg-black/5` | `<ToolbarButton>` |
| Community Standards Link | I520:11647;3053:11619 | `ml-auto px-4 text-sm font-medium text-blue-500 underline hover:text-blue-600` | `<a>` |
| Textarea (D) | I520:11647;520:9886 | `w-full min-h-[160px] border border-[#999] border-t-0 rounded-b-lg p-4 font-montserrat resize-y` | Tiptap `<EditorContent>` |
| Mention Hint (D.1) | I520:11647;520:9887 | `text-sm font-medium text-[#2E3940] text-center mt-1` | `<p>` |
| Hashtag Section (E) | I520:11647;520:9890 | `flex items-start gap-4` | `<HashtagField>` |
| Tag Group (E.2) | I520:11647;662:8595 | `flex flex-wrap gap-2 items-center` | `<TagGroup>` |
| "+ Hashtag" Button | I520:11647;662:8911 | `px-4 py-2 border border-[#999] rounded-lg text-sm font-medium flex items-center gap-1 hover:border-[#FFEA9E] hover:bg-[#FFEA9E]/10` | `<button>` |
| Hashtag Chip | - | `px-2 py-1 bg-[#F17676]/20 text-[#F17676] rounded text-sm font-bold flex items-center gap-1` | `<HashtagChip>` |
| Image Section (F) | I520:11647;520:9896 | `flex items-start gap-4` | `<ImageUploadField>` |
| Image Thumbnail (F.2-F.4) | various | `w-20 h-20 rounded-lg object-cover relative` | `<ImageThumbnail>` |
| Thumbnail Delete | - | `absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer` | `<button>` |
| "+ Image" Button (F.5) | I520:11647;662:9132 | `px-4 py-2 border border-[#999] rounded-lg text-sm font-medium flex flex-col items-center gap-0.5 hover:border-[#FFEA9E] hover:bg-[#FFEA9E]/10` | `<button>` |
| Anonymous Checkbox (G) | I520:11647;520:14099 | `flex items-center gap-3 cursor-pointer` | `<AnonymousCheckbox>` |
| Checkbox Box | I520:11647;520:14099;520:14097 | `w-5 h-5 border border-[#999] rounded checked:bg-[#FFEA9E] checked:border-[#FFEA9E]` | `<input type="checkbox">` |
| Action Row (H) | I520:11647;520:9905 | `flex gap-4 w-full items-center` | `<div>` |
| Cancel Button (H.1) | I520:11647;520:9906 | `h-14 px-6 border border-[#999] rounded-lg font-bold text-[#2E3940] flex items-center gap-2 hover:bg-black/5` | `<button>` |
| Submit Button (H.2) | I520:11647;520:9907 | `h-14 flex-1 bg-[#FFEA9E] rounded-lg font-bold text-[#2E3940] flex items-center justify-center gap-2 hover:bg-[#FFE082] disabled:opacity-50 disabled:cursor-not-allowed` | `<button>` |
| Field Label | various | `font-bold text-base text-[#2E3940] whitespace-nowrap flex items-center gap-0.5` | `<label>` |
| Required Asterisk | various | `text-red-500 font-bold` | `<span>` |

---

## Notes

- All colors should use CSS variables for theming support and consistency with the Kudos Live Board dark theme
- Prefer Tailwind utility classes since the project uses Tailwind CSS
- Font: Montserrat must be loaded (already available in the project via Google Fonts / local files)
- All icons MUST be implemented as **Icon Components** (not SVG files or `<img>` tags)
- The toolbar + textarea form a single visual unit (toolbar has bottom border removed, textarea has top border removed, creating a connected editor block)
- Rich text editor should use Tiptap (recommended in spec TR-006) for Next.js 15 App Router compatibility
- Ensure color contrast meets WCAG AA (4.5:1 for normal text) -- dark text on white modal satisfies this
- Modal must implement focus trap (tab cycling within modal) and close on Escape key
- The "Danh hieu" field is a new field not present in the original Kudos Live Board design -- it sits between the Recipient field and the Rich Text editor
- Form field labels are laid out horizontally (label left, input right) on desktop, stacking vertically on mobile

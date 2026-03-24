# Design Style: Countdown - Prelaunch Page

**Frame ID**: `2268:35127`
**Frame Name**: `Countdown - Prelaunch page`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/frames/2268:35127
**Extracted At**: 2026-03-19

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-primary | #00101A | 100% | Page background |
| --color-text-white | #FFFFFF | 100% | Title text, digit text, labels |
| --color-gold-border | #FFEA9E | 100% | Digit box border |
| --color-digit-bg-start | #FFFFFF | 100% | Digit box gradient start |
| --color-digit-bg-end | #FFFFFF | 10% | Digit box gradient end |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-title | Montserrat | 36px | 700 (italic) | 48px | 0 |
| --text-digit | Digital Numbers | 73.7px | 400 | auto | 0 |
| --text-label | Montserrat | 36px | 700 | 48px | 0 |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-padding | 144px | Horizontal padding (desktop) |
| --spacing-page-padding-y | 96px | Vertical padding |
| --spacing-title-to-timer | 24px | Gap between title and timer row |
| --spacing-digit-group-gap | 60px | Gap between DAYS, HOURS, MINUTES groups |
| --spacing-digit-gap | 21px | Gap between 2 digit boxes within a group |
| --spacing-digit-to-label | 21px | Gap between digit boxes and label text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-digit-box | 12px | Digit box border radius |
| --border-digit-box | 0.75px solid #FFEA9E | Digit box border (gold) |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px (design) | Full viewport width |
| height | 1077px (design) | Full viewport height |
| background | #00101A | Dark background under image |

### Layout Structure (ASCII)

```
┌────────────────────────────────────── 100vw ──────────────────────────────────────┐
│                                                                                    │
│  Background Image (hero-bg.png, cover, full-screen)                                │
│  + Gradient Overlay (18deg, #00101A 15.48% → transparent 63.41%)                   │
│                                                                                    │
│                                                                                    │
│                     ┌─────────────────────────────────┐                             │
│                     │  "Sự kiện sẽ bắt đầu sau"       │                             │
│                     │  (Montserrat 36px/700, white,    │                             │
│                     │   text-align: center)            │                             │
│                     └─────────────────────────────────┘                             │
│                              gap: 24px                                              │
│              ┌──────────┐  gap:60  ┌──────────┐  gap:60  ┌──────────┐              │
│              │ ┌──┐ ┌──┐│          │ ┌──┐ ┌──┐│          │ ┌──┐ ┌──┐│              │
│              │ │00│ │00││          │ │05│ │  ││          │ │20│ │  ││              │
│              │ └──┘ └──┘│          │ └──┘ └──┘│          │ └──┘ └──┘│              │
│              │  77x123  │          │  77x123  │          │  77x123  │              │
│              │  gap:21  │          │  gap:21  │          │  gap:21  │              │
│              │          │          │          │          │          │              │
│              │  DAYS    │          │  HOURS   │          │  MINUTES │              │
│              └──────────┘          └──────────┘          └──────────┘              │
│                 175px                 175px                 175px                    │
│              ├─────────── total timer width: 644px ───────────┤                    │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Background Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35129 | - |
| width | 100vw | `width: 100vw` |
| height | 100vh | `height: 100vh` |
| background | hero-bg.png | `background: url(/images/hero-bg.png) center/cover no-repeat` |
| position | absolute | `position: absolute; inset: 0` |

### Gradient Overlay

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35130 | - |
| background | linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%) | `background: linear-gradient(18deg, ...)` |
| position | absolute | `position: absolute; inset: 0` |

### Title Text ("Sự kiện sẽ bắt đầu sau")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35137 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| font-style | italic | `font-style: italic` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

### Countdown Timer Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35138 | - |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 60px | `gap: 60px` |
| align-items | center | `align-items: center` |
| width | 644px | `width: auto` |

### Digit Group (e.g. DAYS)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2268:35139 (Days), 2268:35144 (Hours), 2268:35149 (Minutes) | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 21px | `gap: 21px` |
| align-items | flex-start | `align-items: flex-start` |
| width | 175px | `width: 175px` |

### Digit Boxes Row (2 digits)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 21px | `gap: 21px` |

### Single Digit Box

| Property | Value | CSS |
|----------|-------|-----|
| **Component ID** | 186:2619 | - |
| width | 77px | `width: 77px` |
| height | 123px | `height: 123px` |
| border | 0.75px solid #FFEA9E | `border: 0.75px solid var(--color-gold-border)` |
| border-radius | 12px | `border-radius: 12px` |
| background | linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%) | Glass morphism gradient (opacity baked into gradient, NOT on the element — digit text inside stays full opacity) |
| backdrop-filter | blur(25px) | `backdrop-filter: blur(25px)` |

### Digit Text (inside box)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Digital Numbers | `font-family: 'Digital Numbers'` |
| font-size | 73.7px | `font-size: 73.7px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

### Unit Label (DAYS, HOURS, MINUTES)

| Property | Value | CSS |
|----------|-------|-----|
| **Node IDs** | 2268:35143 (DAYS), 2268:35148 (HOURS), 2268:35153 (MINUTES) | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 36px | `font-size: 36px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 48px | `line-height: 48px` |
| color | #FFFFFF | `color: white` |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, w: 100vw, h: 100vh, relative, overflow-hidden)
├── BackgroundImage (absolute, inset-0, hero-bg.png, cover)
├── GradientOverlay (absolute, inset-0, linear-gradient 18deg)
└── Content (relative, z-10, flex-col, items-center, justify-center, h-full)
    ├── Title "Sự kiện sẽ bắt đầu sau" (Montserrat 36px/700 italic, white, center)
    │   gap: 24px
    └── TimerRow (flex-row, gap: 60px, items-center)
        ├── DaysGroup (flex-col, gap: 21px, w: 175px)
        │   ├── DigitsRow (flex-row, gap: 21px)
        │   │   ├── DigitBox (77x123, glass, border gold, radius 12px)
        │   │   │   └── "0" (Digital Numbers 73.7px, white)
        │   │   └── DigitBox
        │   │       └── "0"
        │   └── "DAYS" (Montserrat 36px/700, white)
        │
        ├── HoursGroup (same structure)
        │   ├── DigitsRow → "0" "5"
        │   └── "HOURS"
        │
        └── MinutesGroup (same structure)
            ├── DigitsRow → "2" "0"
            └── "MINUTES"
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
| Title | font-size: 20px, line-height: 28px |
| Digit Box | width: 48px, height: 76px |
| Digit Text | font-size: 44px |
| Timer Gap | gap: 24px between groups |
| Digit Gap | gap: 8px between digits |
| Label | font-size: 16px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Title | font-size: 28px |
| Digit Box | width: 60px, height: 96px |
| Digit Text | font-size: 56px |
| Timer Gap | gap: 40px |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| All | As designed |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page | 2268:35127 | `relative w-screen h-screen overflow-hidden bg-[#00101A]` | `<PrelaunchPage />` |
| BG Image | 2268:35129 | `absolute inset-0 object-cover` | `<Image fill priority />` |
| Gradient | 2268:35130 | `absolute inset-0` + custom gradient | inline div |
| Content | 2268:35131 | `relative z-10 flex flex-col items-center justify-center h-full` | wrapper div |
| Title | 2268:35137 | `text-[36px] font-bold italic text-white text-center` | `<p>` |
| Timer Row | 2268:35138 | `flex flex-row gap-[60px] items-center` | `<CountdownDisplay />` |
| Digit Group | 2268:35139 | `flex flex-col gap-[21px]` | `<DigitGroup />` |
| Digit Box | 186:2619 | `w-[77px] h-[123px] rounded-xl border border-[#FFEA9E]/50 backdrop-blur-[25px]` | `<DigitBox />` |
| Digit Text | — | `font-[Digital_Numbers] text-[73.7px] text-white` | inside `<DigitBox />` |
| Label | 2268:35143 | `text-[36px] font-bold text-white` | `<span>` |

---

## Notes

- No header, no footer — this is a standalone full-screen page
- Font "Digital Numbers" is a special LED-style font — must be loaded
- Digit boxes use glass morphism (backdrop-blur + gradient + gold border at 50% opacity)
- Background image is same as homepage hero (`hero-bg.png`) but with different gradient angle (18deg vs vertical)
- Countdown logic can reuse existing `useCountdown` hook pattern

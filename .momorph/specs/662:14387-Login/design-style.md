# Design Style Guide: Login Screen

**Frame**: `662:14387-Login`
**Date**: 2026-03-18

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#00101A` / `rgba(0, 16, 26, 1)` | Page background, text on button |
| `--color-bg-header` | `rgba(11, 15, 18, 0.8)` | Header background (semi-transparent) |
| `--color-bg-button` | `#FFEA9E` / `rgba(255, 234, 158, 1)` | Login button background |
| `--color-text-primary` | `#FFFFFF` / `rgba(255, 255, 255, 1)` | Body text, footer text, language selector text |
| `--color-text-button` | `#00101A` / `rgba(0, 16, 26, 1)` | Login button text |
| `--color-border-footer` | `#2E3940` | Footer top border |
| `--color-bg-dropdown` | `#00070C` / `var(--Details-Container-2)` | Language dropdown background |
| `--color-border-dropdown` | `#998C5F` / `var(--Details-Border)` | Language dropdown border (gold/brown) |
| `--color-bg-dropdown-selected` | `rgba(255, 234, 158, 0.2)` | Selected language item background |
| `--gradient-left-overlay` | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0, 16, 26, 0) 100%)` | Left-to-right dark overlay for text readability |
| `--gradient-bottom-overlay` | `linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0) 51.74%)` | Bottom dark overlay for footer readability |

### Typography

| Element | Font Family | Weight | Size | Line Height | Letter Spacing | Color |
|---------|-------------|--------|------|-------------|----------------|-------|
| Language selector text | Montserrat | 700 (Bold) | 16px | 24px | 0.15px | `#FFFFFF` |
| Intro content (B.2) | Montserrat | 700 (Bold) | 20px | 40px | 0.5px | `#FFFFFF` |
| Login button text | Montserrat | 700 (Bold) | 22px | 28px | 0px | `#00101A` |
| Footer copyright | Montserrat Alternates | 700 (Bold) | 16px | 24px | 0% | `#FFFFFF` |

### Spacing

| Context | Value |
|---------|-------|
| Header padding | `12px 144px` (vertical / horizontal) |
| Header height | `80px` |
| Hero section padding | `96px 144px` |
| Hero internal gap (between key visual and content) | `80px` |
| Content text to button gap | `24px` |
| Content left padding | `16px` |
| Login button padding | `16px 24px` |
| Login button internal gap | `8px` (between text frame and icon) |
| Footer padding | `40px 90px` |
| Language selector button padding | `16px` |
| Language selector internal gap | `2px` (between text frame and chevron), `4px` (between flag and text) |

### Border Radius

| Element | Value |
|---------|-------|
| Login button | `8px` |
| Language selector button | `4px` |
| Language dropdown container | `8px` |
| Language dropdown item (selected) | `2px` |
| Language dropdown item (default) | `4px` |
| Page frame | `0px` |

### Sizing

| Element | Width | Height |
|---------|-------|--------|
| Page (desktop) | `1440px` | `1024px` |
| Header | `1440px` (full-width) | `80px` |
| Logo | `52px` | `48px` |
| Language selector | `108px` | `56px` |
| Flag icon | `24px` | `24px` |
| Chevron icon | `24px` | `24px` |
| Hero section | `1440px` | `845px` |
| ROOT FURTHER image | `451px` | `200px` |
| Content text block | `480px` | `80px` |
| Login button | `305px` | `60px` |
| Google icon | `24px` | `24px` |
| Footer copyright text | `275px` | auto |

---

## Component States

### Login Button (B.3)

| State | Background | Text Color | Opacity | Cursor | Additional |
|-------|-----------|------------|---------|--------|------------|
| Default | `#FFEA9E` | `#00101A` | 1.0 | pointer | — |
| Hover | `#FFEA9E` with `filter: brightness(0.92)` | `#00101A` | 1.0 | pointer | `box-shadow: 0 2px 8px rgba(0,0,0,0.15)`, `transition: filter 150ms ease, box-shadow 150ms ease` |
| Focus | `#FFEA9E` | `#00101A` | 1.0 | pointer | Visible focus ring (`2px solid #FFFFFF`, offset `2px`) |
| Active/Pressed | `#FFEA9E` with `filter: brightness(0.88)` | `#00101A` | 1.0 | pointer | `box-shadow: 0 1px 4px rgba(0,0,0,0.2)`, `transform: scale(0.98)` |
| Loading | `#FFEA9E` | `#00101A` | 0.7 | not-allowed | Spinner replaces/accompanies Google icon |
| Disabled | `#FFEA9E` | `#00101A` | 0.5 | not-allowed | During OAuth processing |

### Language Selector (A.2)

| State | Background | Text Color | Cursor | Additional |
|-------|-----------|------------|--------|------------|
| Default | transparent | `#FFFFFF` | pointer | Flag + "VN" + chevron-down |
| Hover | `rgba(255, 255, 255, 0.1)` | `#FFFFFF` | pointer | Background highlight |
| Focus | transparent | `#FFFFFF` | pointer | Visible focus ring |
| Open/Expanded | `rgba(255, 255, 255, 0.1)` | `#FFFFFF` | pointer | Dropdown visible, chevron rotates 180deg |

### Language Dropdown (linked frame: 721:4942)

**Container**:
| Property | Value |
|----------|-------|
| Background | `var(--Details-Container-2, #00070C)` |
| Border | `1px solid var(--Details-Border, #998C5F)` |
| Border radius | `8px` |
| Padding | `6px` |
| Layout | Flex column |
| Position | Below trigger button, right-aligned with header edge |

**Dropdown Items** (each `108px x 56px`):

| State | Background | Border Radius | Text Color | Cursor |
|-------|-----------|---------------|------------|--------|
| Default (non-selected) | transparent | `4px` | `#FFFFFF` (Montserrat Bold 16px) | pointer |
| Selected/Active | `rgba(255, 234, 158, 0.2)` | `2px` | `#FFFFFF` (Montserrat Bold 16px) | default |
| Hover (non-selected) | `rgba(255, 255, 255, 0.1)` | `4px` | `#FFFFFF` | pointer |

**Item layout**: Flex row, `padding: 16px`, `gap: 4px` between flag icon (24x24) and locale text.

**Design tokens from Figma**:
- `--Details-Container-2`: `#00070C` (dropdown background)
- `--Details-Border`: `#998C5F` (dropdown border — gold/brown tone)

---

## Responsive Breakpoints

### Mobile (320px - 767px)

| Element | Changes |
|---------|---------|
| Header | Padding: `12px 16px`. Logo scales to ~40px width. Language selector stays at right. |
| Hero section | Padding: `48px 16px`. Content centered. |
| ROOT FURTHER | Scales to fit screen width (~280px wide) |
| Content text | Font size may reduce to 18px. Text wraps naturally. |
| Login button | `width: 100%` (full-width) |
| Footer | Padding: `24px 16px`. Text centered. |

### Tablet (768px - 1023px)

| Element | Changes |
|---------|---------|
| Header | Padding: `12px 48px` |
| Hero section | Padding: `72px 48px` |
| ROOT FURTHER | ~380px wide |
| Login button | `width: auto` (305px or slightly smaller) |
| Footer | Padding: `32px 48px` |

### Desktop (1024px+)

| Element | Changes |
|---------|---------|
| All | As designed — max-width container at 1440px, centered |
| Header padding | `12px 144px` |
| Hero padding | `96px 144px` |
| Footer padding | `40px 90px` |

---

## Implementation Mapping

| Figma Node | CSS/Tailwind | React Component |
|------------|--------------|-----------------|
| `662:14387` Login (Frame) | `min-h-screen bg-[#00101A] relative overflow-hidden` | `src/app/login/page.tsx` |
| `662:14388` C_Keyvisual (Group) | `absolute inset-0 z-0` + `<Image fill object-cover>` | `src/components/login/LoginBackground.tsx` |
| `662:14392` Rectangle 57 (Gradient overlay) | `absolute inset-0 z-[1]` + `bg-gradient-to-r from-[#00101A] via-[#00101A] to-transparent` (via stop at 25.41%) | Part of `LoginBackground.tsx` |
| `662:14390` Cover (Bottom gradient) | `absolute inset-0 z-[2]` + `bg-gradient-to-t from-[#00101A] from-[22.48%] to-transparent to-[51.74%]` | Part of `LoginBackground.tsx` |
| `662:14391` A_Header (Instance) | `fixed top-0 w-full h-20 z-50 flex items-center justify-between px-36 bg-[rgba(11,15,18,0.8)]` | `src/components/layout/Header.tsx` |
| `I662:14391;186:2166` A.1_Logo | `w-[52px] h-12` + `<Image>` | `src/components/layout/Logo.tsx` |
| `I662:14391;186:1601` A.2_Language | `relative` + button + dropdown | `src/components/ui/LanguageSelector.tsx` |
| `525:11713` A_Dropdown-List (Instance) | `absolute top-full right-0 mt-1 p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg flex flex-col` | Part of `LanguageSelector.tsx` |
| Dropdown item (selected) | `flex items-center gap-1 px-4 py-4 rounded-sm bg-[rgba(255,234,158,0.2)]` | Part of `LanguageSelector.tsx` |
| Dropdown item (default) | `flex items-center gap-1 px-4 py-4 rounded hover:bg-white/10 cursor-pointer` | Part of `LanguageSelector.tsx` |
| `662:14393` B_Bia (Hero) | `relative z-10 flex flex-col gap-[120px] px-36 py-24 h-[845px]` | `src/components/login/LoginHero.tsx` |
| `662:14395` B.1_Key Visual | `w-[451px] h-[200px]` + `<Image>` | Part of `LoginHero.tsx` |
| `662:14753` B.2_content | `font-montserrat font-bold text-xl leading-[40px] tracking-[0.5px] text-white w-[480px]` | Part of `LoginHero.tsx` |
| `662:14425` B.3_Login | `w-full h-[60px] lg:w-[305px]` (mobile-first: base=full-width, desktop=fixed) | `src/components/login/LoginButton.tsx` |
| `662:14426` Button-IC About (Instance) | `flex items-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat font-bold text-[22px] leading-7 text-[#00101A]` | Part of `LoginButton.tsx` |
| `662:14447` D_Footer (Instance) | `fixed bottom-0 w-full flex items-center justify-between px-[90px] py-10 border-t border-[#2E3940]` | `src/components/layout/Footer.tsx` |
| `I662:14447;342:1413` Copyright text | `font-['Montserrat_Alternates'] font-bold text-base leading-6 text-white text-center` | Part of `Footer.tsx` |

---

## Assets Required

| Asset | Figma Node | Export Format | File Path |
|-------|------------|---------------|-----------|
| Key visual background | `662:14389` (image 1) | WebP (optimized) | `public/images/login-bg.webp` |
| ROOT FURTHER logo | `2939:9548` (MM_MEDIA_Root Further Logo) | SVG or WebP | `public/images/root-further.webp` |
| SAA 2025 Logo | `I662:14391;178:1033;178:1030` (MM_MEDIA_Logo) | SVG | `public/icons/logo-saa.svg` |
| Google icon | `I662:14426;186:1766` (MM_MEDIA_Google) | SVG | `public/icons/google.svg` |
| Vietnam flag | `I662:14391;186:1696;186:1821;186:1709` (MM_MEDIA_VN) | SVG | `public/icons/flag-vn.svg` |
| UK/US flag | (from component set `178:1020`) | SVG | `public/icons/flag-en.svg` |
| Japan flag | (from component set `178:1020`) | SVG | `public/icons/flag-jp.svg` |
| Chevron down | `I662:14391;186:1696;186:1821;186:1441` (MM_MEDIA_Down) | SVG | `public/icons/chevron-down.svg` |

---

## Z-Index Stacking Order

| Layer | Z-Index | Element |
|-------|---------|---------|
| 0 | z-0 | Key visual background image |
| 1 | z-[1] | Left gradient overlay (Rectangle 57) |
| 2 | z-[2] | Bottom gradient overlay (Cover) |
| 3 | z-10 | Hero section content (B_Bia) |
| 4 | z-50 | Header (fixed) |
| 5 | z-50 | Footer (fixed/sticky) |
| 6 | z-[100] | Toast notifications |
| 7 | z-[60] | Language dropdown (above header content) |

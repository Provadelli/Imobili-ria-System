---
name: Luxury Real Estate Design System
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#4e4541'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#807571'
  outline-variant: '#d2c4bf'
  surface-tint: '#695c57'
  primary: '#150d0a'
  on-primary: '#ffffff'
  primary-container: '#2c221e'
  on-primary-container: '#978883'
  inverse-primary: '#d4c3bd'
  secondary: '#725b38'
  on-secondary: '#ffffff'
  secondary-container: '#fedeb2'
  on-secondary-container: '#78603e'
  tertiary: '#0a1011'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f2526'
  on-tertiary-container: '#868c8d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f1dfd8'
  primary-fixed-dim: '#d4c3bd'
  on-primary-fixed: '#231916'
  on-primary-fixed-variant: '#504440'
  secondary-fixed: '#fedeb2'
  secondary-fixed-dim: '#e0c298'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#584323'
  tertiary-fixed: '#dee3e4'
  tertiary-fixed-dim: '#c2c7c8'
  on-tertiary-fixed: '#171d1e'
  on-tertiary-fixed-variant: '#424849'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 2rem
  margin: 3rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 2rem
  space-lg: 4rem
  space-xl: 6rem
---

## Brand & Style

This design system embodies high-end luxury, understated elegance, and absolute exclusivity. The aesthetic bridges classic architectural heritage with modern digital refinement, drawing from editorial minimalism and tactile luxury. The visual language evokes a sense of calm authority, meticulous craftsmanship, and timeless value, tailored for high-net-worth buyers and premier real estate portfolios.

## Colors

The color palette is anchored by a warm, enveloping neutral background (`#F5F2EC`), which provides a soft, organic canvas reminiscent of limestone and natural plaster. Rich dark brown (`#2C221E`) replaces stark black for high-legibility typography and grounded structural elements, offering a warmer, more sophisticated contrast. Metallic gold accents (`#C5A880`) are applied sparingly to focal points, interactive states, and key dividers to convey understated prestige without feeling ostentatious.

## Typography

Typography pairs the high-contrast, editorial elegance of Playfair Display for headlines with the immaculate neutrality of Inter for body copy and metadata. Letter spacing on uppercase labels is intentionally widened to evoke luxury print collateral and architectural blueprints. Large headlines above 32px scale down gracefully on mobile viewports to maintain proportional balance and readability.

## Layout & Spacing

A generous, airy layout philosophy defines this design system, mirroring the expansive floor plans of premier properties. Utilizing a 12-column fluid grid with wide gutters and margins, content is granted ample breathing room to let high-resolution architectural photography take center stage. On mobile devices, outer margins scale down proportionally while maintaining a comfortable whitespace minimum to preserve the premium feel.

## Elevation & Depth

Depth is communicated through sophisticated tonal layering and ultra-diffused, ambient shadows rather than harsh drop shadows. Surfaces gently lift from the warm neutral background using low-opacity, tinted brown-black shadows (`rgba(44, 34, 30, 0.06)`), complemented by razor-thin, refined borders in metallic gold or muted stone tones. This creates a tactile, gallery-like dimensionality where cards and overlays float effortlessly.

## Shapes

A restrained, soft geometry defines the shape language. UI elements utilize subtle corner radii (0.25rem for base elements, scaling up to 0.5rem and 0.75rem for larger containers) to avoid industrial sharpness while strictly steering clear of playful pill shapes. This balance delivers crisp, architectural precision that honors classical design proportions.

## Components

- **Buttons:** Primary buttons feature rich dark brown backgrounds with crisp typography, transitioning to metallic gold on hover. Secondary buttons utilize ghost borders with generous padding and tracking.
- **Chips:** Minimalist filter tags with soft neutral fills, subtle borders, and uppercase tracking for property attributes (e.g., "Waterfront", "Penthouse").
- **Input Fields:** Understated text inputs featuring a bottom border only, or subtle full-box borders with generous interior padding and gold focus states.
- **Cards:** Elevated architectural photo cards with edge-to-edge imagery, subtle hover zooms, and restrained metadata typography floating cleanly below.
- **Checkboxes & Radios:** Custom geometric squares and circles with thin structural borders and filled metallic gold selection indicators.
- **Lists:** Clean typographic property detail lists separated by hairline dividers in muted stone.
- **Property Galleries:** Immersive masonry and full-width carousel modules designed to showcase high-end architectural photography with minimal chrome interference.
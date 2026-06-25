---
name: ui-frontend
description: "Vanilla HTML, CSS, client-side JS, responsive layouts, micro-animations, and CSS design systems. ALWAYS use this skill when editing styles, index.html, template styles, or adding CSS variables."
---

# UI Frontend — Development Guidelines

Use this skill when implementing, refactoring, or auditing HTML structure, CSS styling, or interactive client-side JavaScript.

## Guidelines & Principles

### 1. Premium Visual Aesthetics
- **Color Palettes**: Avoid generic colors. Use curated HSL palettes (e.g. sleek dark modes with neon accents, soft neutral card interfaces).
- **Typography**: Import Google Fonts (e.g., *Inter*, *Outfit*, *Roboto*) instead of relying on default browser sans-serif styles.
- **Glassmorphism & Gradients**: Use subtle backdrop-filters and smooth gradients for overlays, buttons, and headers:
  ```css
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  ```

### 2. Layout Structure & Responsive Design
- **Grid/Flexbox**: Never use fixed widths (`px`) for primary layouts. Use percentage, `rem`, `vw/vh`, or grid definitions:
  ```css
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  ```
- **Media Queries**: Organize media queries logically (e.g. mobile-first or desktop-down) to guarantee beautiful scaling.

### 3. Interactivity & Micro-Animations
- **Hover Transitions**: Add smooth transition rules to all buttons, links, and cards:
  ```css
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ```
- **DOM Stability**: Ensure all interactive elements have unique, descriptive `id` attributes. This enables QA tools to query elements reliably.

## Typical Workflows
1. **Layout Blueprint**: Define structural HTML elements with semantic markup (`<header>`, `<main>`, `<section>`).
2. **Style Application**: Configure global variables under `:root` for consistency.
3. **Responsive Verification**: Resize browser views to check content layout under standard screen widths (375px, 768px, 1024px, 1440px).

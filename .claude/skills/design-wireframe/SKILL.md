---
name: design-wireframe
description: "UI/UX wireframing, component grid planning, typography scale definition, and visual spacing guidelines. ALWAYS use this skill when structuring user interface wireframes, layouts, CSS variables, or visual design tokens."
---

# Design & Wireframing Guidelines

Use this skill when drafting user interface wireframes, component layouts, visual design tokens, or defining spacing rules.

## Design Tokens

### 1. Typography Hierarchy
- **Primary Font**: Prefer clean sans-serif families like *Inter*, *Outfit*, or *Roboto*.
- **Font Scale**: Standardize typography sizes:
  - Heading 1 (`h1`): `2.5rem` to `3.5rem` (bold, spacious line heights).
  - Heading 2 (`h2`): `1.75rem` to `2.25rem`.
  - Body Text: `1rem` (line-height: `1.6` to avoid wrapping compression).
- **Paragraph Length**: Ban long, contiguous paragraphs. Break ideas down into bullet points or concise sections of 2-3 sentences max.

### 2. Layout & Bento Grids
- **Bento Grids**: Structure layouts into distinct boxes with rounded corners, subtle shadows, and varying proportions:
  - Use `gap: 1.5rem` or `2rem` for layout spacing.
  - Border Radius: Standardize card corners at `12px` to `16px`.
- **Spacing Guidelines**: Avoid cramped sections. Use margins like `py-16` or `py-20` (equivalent to `4rem` to `5rem` spacing) between primary page sections to give elements room to breathe.

## Typical Workflows
1. **Define Visual Palette**: Formulate HSL color tokens (e.g. background, surface, text-primary, text-secondary, accent).
2. **Draft Wireframe**: Write out the page structure in markdown, identifying content sections, layout grids, and interactive states.
3. **Save Asset Requirements**: Specify SVG icon lists or image layout requirements under `_workspace/`.

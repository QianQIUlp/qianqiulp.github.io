# Local Web Interface Guidelines

Adapted from Vercel Web Interface Guidelines for local repo use. Do not fetch remote guideline content at runtime.

## Accessibility

- Icon-only buttons need `aria-label`.
- Form controls need `<label>` or `aria-label`.
- Interactive elements need keyboard support.
- Use `<button>` for actions and `<a>` for navigation.
- Images need `alt`, or `alt=""` when decorative.
- Decorative icons need `aria-hidden="true"`.
- Async updates need `aria-live="polite"` when they affect user state.
- Use semantic HTML before ARIA.
- Headings should be hierarchical.
- Include a skip link for main content when page-level navigation can otherwise slow keyboard users.
- Heading anchors need `scroll-margin-top` when sticky headers can cover targets.

## Focus States

- Interactive elements need visible focus.
- Do not remove outlines without a visible replacement.
- Prefer `:focus-visible` over `:focus`.
- Use `:focus-within` for compound interactive groups when useful.

## Animation

- Honor `prefers-reduced-motion`.
- Prefer animating `transform` and `opacity`.
- Avoid `transition: all`; list transitioned properties explicitly.
- Animations should be interruptible and should not block interaction.

## Typography

- Use `…` rather than `...`.
- Loading states should end with `…`.
- Use `font-variant-numeric: tabular-nums` where aligned numeric comparison matters.
- Consider `text-wrap: balance` or `text-wrap: pretty` on headings.

## Content Handling

- Text containers must handle long content with wrapping, truncation, or stable constraints.
- Flex/grid children that contain text often need `min-width: 0`.
- Handle empty arrays or absent optional fields without broken layout.
- Anticipate short, average, and very long titles/descriptions.

## Images

- Images should have explicit dimensions or framework-generated dimensions to reduce layout shift.
- Below-fold images should use lazy loading.
- Above-fold critical images should be prioritized when the framework supports it.
- Image aspect ratios should be stable across card grids and article layouts.

## Performance

- Avoid layout reads in render or hot paths.
- Prefer CSS layout over JavaScript measurement.
- Avoid unnecessary client-side JavaScript for static content.
- Add preconnect/preload only when it is clearly beneficial and stable.

## Navigation & State

- Links should use `<a>` so browser navigation affordances work.
- Active navigation state should be visible and programmatically indicated when appropriate.
- Stateful UI should be reflected in the URL when it changes shareable page state.
- Destructive actions require confirmation or undo; this site should generally avoid destructive UI.

## Touch & Interaction

- Tap targets should be comfortably sized.
- Hover, active, and focus states should be visually distinct.
- Avoid interactions that depend on hover only.
- Set tap highlight behavior intentionally if overriding defaults.

## Safe Areas & Layout

- Avoid horizontal scrolling on normal mobile widths.
- Use CSS grid/flex with responsive constraints rather than JS measurement.
- Fixed or sticky elements should not obscure anchors or content.

## Dark Mode & Theming

- `color-scheme` should match active theme.
- Theme colors should preserve contrast in both modes.
- Native controls should remain legible in dark mode.
- Theme toggles should have accessible names and states.

## Locale & i18n

- Prefer `Intl.DateTimeFormat` for user-facing localized dates when localization matters.
- Use `translate="no"` for brand names, code tokens, or identifiers when auto-translation could corrupt them.
- Chinese long-form text needs comfortable line height and measure.

## Hydration Safety

- Avoid client-rendered date/time mismatches.
- Use client scripts only where needed for interaction.
- Do not suppress hydration warnings unless the mismatch is intentional and understood.

## Content & Copy

- Use specific action labels.
- Avoid vague error or empty-state text.
- Keep UI copy direct and user-facing.
- Prefer consistent vocabulary across navigation and actions.

## Anti-Patterns To Flag

- Disabling zoom with `user-scalable=no` or `maximum-scale=1`.
- `transition: all`.
- `outline: none` without a visible replacement.
- Click handlers on non-interactive elements.
- Images without alt text or dimensions.
- Icon buttons without accessible names.
- Hardcoded date/number formatting where localization matters.
- Mobile horizontal overflow.

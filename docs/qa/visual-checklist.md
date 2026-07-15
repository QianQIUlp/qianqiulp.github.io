# Visual QA Checklist

Use this checklist before merging visible site changes. Test the built site when possible:

```sh
npm run build
npm run preview
```

Core viewports:

- Desktop: 1440px or wider
- Tablet: 768px
- Mobile: 375px

Always check light and dark mode for changed routes.

## Homepage

- Header brand, nav, and theme toggle fit without wrapping awkwardly.
- The first viewport reads as Qiu's personal rehearsal room rather than a product landing page or metrics dashboard.
- The room, title, three hotspots, and full guitar silhouette remain legible without overlap at desktop and tablet widths.
- The guitar keeps the approved headstock, relic body, pickup layout, stand, fret-marker sequence, and the 11–13 fret `m` marker.
- Article and project hotspots perform one camera move before opening `/blog/` and `/projects/`; modified clicks keep native link behavior.
- Guitar & Life focuses the guitar and reveals the life note in place; Escape and “回到房间” restore the overview.
- At 375px the hotspots form a usable bottom dock, the title stays readable, and no page-level horizontal scroll appears.
- With JavaScript disabled, article and project links still navigate and `#life-note` still reveals the life copy.

## Blog Index

- Archive heading and summary counts align cleanly at each viewport.
- Post cards keep date, cover, title, description, tags, and cue readable.
- Covers and fallback media use a consistent aspect ratio.
- Long titles and descriptions wrap without overlapping neighboring columns.
- Card hover, active, and focus states are visible but do not shift layout.

## Article Pages

- Test several posts, including long titles, TOC pages, image-heavy posts, and any post without a cover image.
- Editorial masthead keeps title, description, date, tags, and the un-tinted real cover readable in both themes.
- Fallback article masthead looks intentional when no cover image exists.
- Body measure, font size, line height, headings, blockquotes, lists, tables, and code blocks are comfortable to read.
- TOC links scroll to the correct headings and headings are not hidden behind the sticky header.
- On wide screens, TOC remains usable as a sticky left rail; at tablet/mobile widths it returns to normal document flow after the intro.
- Inline images have useful alt text, preserve aspect ratio, and do not cause visible layout jumps.
- Long code blocks and tables scroll inside their own containers instead of causing page-level horizontal scroll.
- License and source links are present and readable when configured.

## Projects Page

- Hero copy and note remain balanced at desktop, 768px, and 375px.
- Featured project dossiers keep ordinal, title, repo slug, links, summary, case study, boundaries, and tags readable.
- External project links are clearly focusable and tappable.
- Secondary traces and playbook items wrap long titles without overlap.
- Project names, URLs, and positioning match `src/data/projects.ts` and project briefs.

## Dark Mode

- Toggle updates the visible state and persists across reloads.
- Page background, surfaces, borders, text, links, tags, and code blocks keep adequate contrast.
- Images and cover scrims do not make white text unreadable.
- Native browser color scheme follows the active theme.
- Directional paper and note shadows remain visible without turning into bright halos or crushed black blocks.

## Motion And Progressive Enhancement

- Homepage camera transitions complete once, do not trap scrolling, and do not delay navigation longer than the intended transition.
- With `prefers-reduced-motion: reduce`, homepage route links navigate immediately and the life note appears without camera movement.
- Below-the-fold reveal items enter once with no more than 8px movement and no more than three stagger steps.
- Hero copy and article body are readable immediately and never wait for scroll animation.
- With `prefers-reduced-motion: reduce`, reveal transitions and hover translation are disabled.
- With JavaScript disabled, every `data-reveal` element remains visible and usable.

## Mobile Widths

- No page-level horizontal scrolling at 768px or 375px.
- Sticky header does not cover content or anchor targets.
- Tap targets are comfortable, especially nav, theme toggle, cards, project links, and contact links.
- Text stays inside buttons, pills, cards, and article containers.
- Multi-column layouts collapse without awkward gaps or clipped content.

## Keyboard And Focus

- First Tab reveals the skip link and Enter moves focus to main content.
- Tab order follows the visual reading order through nav, theme toggle, content links, and footer links.
- Every interactive element has a visible `:focus-visible` state.
- Theme toggle works with Enter and Space and updates `aria-pressed`.
- Links use anchors for navigation; buttons are used only for actions.

## External Links

- External links open the intended destination.
- Links using `target="_blank"` include `rel="noopener noreferrer"`.
- Source, license, contact, GitHub, Bilibili, and project links are not broken.
- Internal route links return 200 and keep trailing slash conventions.

## Image And Layout Stability

- Above-the-fold images have stable dimensions and do not visibly shift text after load.
- Below-the-fold images lazy-load without changing reserved layout space.
- Article images, post cards, and featured media keep consistent aspect ratios.
- Font loading does not create noticeable title, TOC, or hero shifts.
- Run one slow-refresh pass on mobile width to catch late shifts after fonts and images load.

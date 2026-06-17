# PR #52 UI/UX Skill Audit

Date: 2026-06-17

Branch: `codex/astro-uiux-warm-study`

Local skills used:

- `.agents/skills/qiu-site-frontend-design/SKILL.md`
- `.agents/skills/qiu-site-web-design-guidelines/SKILL.md`

Audit scope:

- `/`
- `/blog/`
- `/projects/`
- `/blog/posts/2026-05-26-llm-metacog-blindspot/`
- Shared layout, navigation, theme behavior, cards, article reading layout, mobile behavior, focus states, dark mode, and content handling.

## Summary

PR #52 is directionally aligned with the warm study-room brief: it reduces emoji dependence, adds a shared navigation system, improves article reading structure, and keeps content routes/schema stable. No high-severity blockers were found.

The remaining actionable findings are medium-severity accessibility, motion, theming, locale, and font-loading issues. They are all small targeted fixes and do not require redesign, new frameworks, package changes, route changes, or schema changes.

## Findings

| Severity | Route / Area | File | Finding | Rationale | Recommendation |
| --- | --- | --- | --- | --- | --- |
| medium | All routes / keyboard navigation | `src/layouts/BaseLayout.astro:56`, `src/components/SiteHeader.astro:10`, route `<main>` elements | No skip link to main content. | The header is sticky and appears on every route. Keyboard users must tab through brand/nav/theme controls before reaching page content on every load. Local guidelines call for a skip link when page-level navigation can slow keyboard users. | Add a visible-on-focus skip link before the header and give each page's main region a stable `id="main-content"`. |
| medium | All routes / motion preferences | `src/styles/global.css:107`, `src/styles/global.css:337`, `src/components/PostCard.astro:55`, `src/components/InfoCard.astro:26` | Motion and smooth scrolling do not honor `prefers-reduced-motion`. | The site uses smooth scroll, transitions, and hover transforms. These are subtle, but the local guideline requires a reduced-motion variant or disable path. | Add a global `@media (prefers-reduced-motion: reduce)` rule to disable smooth scroll, transitions, animations, and hover translate transforms. |
| medium | All routes / dark mode browser chrome | `src/layouts/BaseLayout.astro:31` | Missing `meta name="theme-color"` for light/dark themes. | The document correctly sets `color-scheme`, but browser UI color can still mismatch the warm light/dark backgrounds, especially on mobile. | Add light and dark `theme-color` meta tags matching the site background tokens. |
| medium | Archive/cards/articles / locale display | `src/pages/index.astro:14`, `src/components/PostCard.astro:20`, `src/pages/blog/posts/[...slug].astro:22` | Visible dates use hardcoded ISO strings. | The site is `zh-CN`; local guidelines prefer localized date formatting for user-facing dates while retaining machine-readable `datetime`. | Keep ISO `datetime` attributes, but render labels via `Intl.DateTimeFormat('zh-CN', ...)`. |
| low | Cards / non-interactive hover | `src/components/InfoCard.astro:29` | Informational cards move on hover even though they are not interactive. | This is not a blocker, but hover motion on static cards can imply clickability. | Optional: remove hover transform from non-clickable info cards, or keep as visual polish if the site owner prefers the current feel. |
| low | Touch interaction | `src/styles/global.css` | No explicit `touch-action: manipulation`. | Mobile tap behavior is likely fine, but the local checklist recommends intentional touch behavior. | Optional: add `touch-action: manipulation` to links/buttons if later mobile testing shows tap delay or inconsistent behavior. |

## Non-Findings

- Post and cover images have alt text and Astro-generated dimensions.
- Navigation uses semantic anchors and active `aria-current` states.
- Theme toggle is a real button and sets `aria-pressed` after hydration.
- Article heading anchors have `scroll-margin-top`.
- Google Fonts import already includes `display=swap`.
- Long titles/descriptions generally use wrapping constraints.
- No route, schema, package, framework, or runtime dependency change is required for the medium findings.

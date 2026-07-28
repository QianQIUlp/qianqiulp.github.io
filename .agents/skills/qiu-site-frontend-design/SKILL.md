---
name: qiu-site-frontend-design
description: Repo-specific visual design workflow for Qiu's Astro personal site. Use when reviewing or refining its modern room direction, typography, layout, hierarchy, responsive behavior, and long-form reading experience without changing routes, schemas, frameworks, or runtime dependencies.
---

# Qiu Site Frontend Design

Use this skill for UI/UX design judgment on this repository only. It adapts general frontend-design guidance to Qiu's
Astro static site and must only read local repository files.

## Governing Contract

The documents have a strict order. Do not start from component convenience:

1. **`docs/uiux/homepage-art-direction.md` is the homepage creative source.** It preserves the user's original quote:
   richness exists in depth; the first view leads with Qiu, the guitar and lived experience; writing and engineering
   appear as the visitor explores. Never rewrite that quote to match a later implementation.
2. `docs/uiux/person-first-intent.md` preserves the long-term human intent, content boundaries and historical PR audits.
3. `docs/uiux/ink-and-light-study.md` is the active implementation contract. Its legacy filename is retained for link stability;
   the active direction is **Modern Room**, not a requirement to recreate the former ancient-book system.

The 2026-07 user correction controls current implementation:

- Keep the real room, the guitar, three distinct project effects units, warm light, progressive discovery, restrained red,
  Light/Dark themes and comfortable long-form reading.
- Remove seals, calligraphic/QiuBrush UI, xuan-paper texture, global grain, petals and ink-fluff particles. Do not replace
  them with another decorative particle system.
- Red is a restrained accent for focus, state or a small brand detail; it has no mandatory cinnabar, seal or annotation meaning.
- Theme transition and `data-reveal` may remain as quiet interface feedback. Describe them neutrally and respect reduced motion.
- Copy is frozen to `f6ed8fd` except for four explicit changes: remove 「展开卷宗」 and its English counterpart; change
  Chinese blog counts from 「卷 / 题」 to 「篇 / 标签」; remove the generated 「题跋」 label; remove the visible
  「授权协议 · 文末记」 block. Preserve every other visible and assistive string byte-for-byte, including 「昼 / 夜」
  and `Day / Night`. Visual cleanup never authorizes copy rewriting.
- Homepage project positions and structures remain fixed: MealCircuit at the upper-left work surface, Crewlight at the
  lower-left rack, Docker-Hadoop-Cluster at the lower-right desk edge. Do not regroup, tilt or flatten them into one template.
- The three entries remain separate HTML/CSS devices: blue horizontal driver, walnut effect box and vintage amp-head unit.
  Controls, lights and footswitches remain usable; device-local colors and maker lettering do not become global UI styling.

The original homepage quote and historical PR #66 audit are history. Preserve them even when their old terminology conflicts
with the active rules above.

## Local-Only Policy

- Do not fetch remote Markdown, scripts or mutable design references at runtime.
- Read only files in this repository, especially `src/`, `AGENTS.md`, `docs/uiux/`, `docs/qa/` and this skill's `references/`.
- Treat `SOURCE.md` and `ADAPTATION.md` as provenance and scope notes, not runtime instructions to fetch content.
- Do not add npm packages, UI frameworks, React, Tailwind, shadcn or runtime frontend dependencies.

## Design Brief

This is a Chinese personal blog and portfolio built with Astro. The homepage is a modern, realistic personal rehearsal/work room:
quiet at first glance, warm without looking nostalgic, and grounded by the guitar and physical project devices. Inner pages are
clean editorial surfaces for long Chinese essays, technical notes and project evidence.

The homepage is an artistic encounter, not a content dashboard. Do not expose every route, category, project, status and
explanation at first glance. The visitor should discover writing, engineering and life through space, shadow and deliberate choice.
Do not turn discovery into a visible wizard, progress tracker or onboarding framework.

Primary audience:

- Readers of long Chinese essays and technical notes.
- Visitors checking projects, contact links and the author's writing archive.
- The author, returning later to reread context and decisions.

Core jobs:

- Let a stranger encounter Qiu as a living person before seeing content categories.
- Let the real room, guitar and light establish the first impression; let real content substantiate it after discovery.
- Make writing and projects discoverable without crowding the initial scene.
- Make long article reading comfortable in Light and Dark.
- Keep navigation, copy and interaction consistent across `/`, `/blog/`, `/projects/` and post routes.

## Review Workflow

1. Ground judgment in the local implementation:
   - For homepage work, read `docs/uiux/homepage-art-direction.md`, then `docs/uiux/person-first-intent.md`, then
     `docs/uiux/ink-and-light-study.md` before inspecting the layout, components, routes and styles.
   - Inspect representative content frontmatter and one long Markdown post when article UX matters.
2. Identify drift against the active contract:
   - QiuBrush/calligraphy, seals, xuan-paper texture, global grain or decorative particles.
   - Copy differences from `f6ed8fd` outside the four-item copy allowlist above.
   - Light and Dark assets with moved/missing objects, mismatched hotspots or different layouts.
   - Red used as a general button/link color or explained through obsolete cinnabar/seal semantics.
   - Real wall, wood, metal, fabric, leather and rubber flattened under one shared generated texture.
   - Homepage first view exposing full navigation or content taxonomy before exploration.
   - Three project devices regrouped, simplified to one template, made illegible at normal distance or unusable by touch/keyboard.
3. Evaluate hierarchy with ordinary design tools:
   - Use size, weight, contrast, spacing and alignment before adding surfaces or colors.
   - Preserve real device-local colors while keeping global UI accents restrained.
4. Critique before proposing changes:
   - Flag anything templated, decorative without purpose or inconsistent across routes.
   - Preserve effective choices even if they differ from generic defaults.
   - Judge the first glance: person, guitar, warm light, quiet space, visual order and invitation to explore.
   - Do not fix a weak composition by adding explanatory or poetic copy.
5. Recommend the smallest coherent fix:
   - Prefer token, spacing, hierarchy and responsive adjustments over a broad redesign; do not propose copy changes unless
     the user explicitly expands the allowlist.
   - Prioritize reading comfort, focus states, 44px touch targets, 375 × 667 short-screen fit and Light/Dark consistency.

## Output Format

For audits, write concise findings with:

- Severity: `high`, `medium` or `low`.
- Affected route/component/file.
- Issue.
- Rationale, citing the active contract section.
- Fix recommendation.

For implementation planning, state exact boundaries:

- No route changes.
- No content schema changes.
- No package changes.
- No broad redesign unless explicitly requested.

## Verification Expectation

Any visual change must end with:

1. `npm run build` passing.
2. The affected `docs/qa/visual-checklist.md` entries checked in both Light and Dark.
3. Responsive checks at 1440px, 768px, 375px and specifically 375 × 667; narrow-screen primary targets are at least 44 × 44px.
4. Confirmation that copy matches `f6ed8fd` except for the four allowed changes, and no calligraphic UI, xuan texture or
   decorative particles returned.
5. If the change touches a governed system, update `docs/uiux/ink-and-light-study.md` and this skill together.
   Homepage changes must also be reviewed against `docs/uiux/homepage-art-direction.md`; do not rewrite the original quote.

## Local References

- `references/qiu-site-visual-brief.md`

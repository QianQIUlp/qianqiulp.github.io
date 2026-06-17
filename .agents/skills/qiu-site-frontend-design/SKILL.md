---
name: qiu-site-frontend-design
description: Repo-specific visual design workflow for Qiu's Astro personal site. Use when reviewing or refining this site's UI direction, typography, layout, visual hierarchy, and warm-study reading experience without changing routes, schemas, frameworks, or runtime dependencies.
---

# Qiu Site Frontend Design

Use this skill for UI/UX design judgment on this repository only. It adapts upstream frontend-design guidance to Qiu's Astro static site and must only read local repository files.

## Local-Only Policy

- Do not fetch remote Markdown, remote scripts, or mutable upstream design references at runtime.
- Read only files in this repository, especially `src/`, `AGENTS.md`, and this skill's local `references/`.
- Treat `SOURCE.md` and `ADAPTATION.md` as provenance and scope notes, not runtime instructions to fetch remote content.
- Do not add npm packages, UI frameworks, React, Tailwind, shadcn, or runtime frontend dependencies.

## Design Brief

The site is a Chinese personal blog and portfolio built with Astro. The desired identity is a warm study room: quiet, readable, personal, and slow-reading oriented. It should avoid generic AI SaaS style, excessive card stacks, decorative emoji dependency, and landing-page marketing composition.

Primary audience:

- Readers of long Chinese essays and technical notes.
- Visitors checking projects, contact links, and the author's writing archive.
- The author, returning later to reread context and decisions.

Core jobs:

- Make the latest writing easy to discover.
- Make long article reading comfortable.
- Keep navigation and visual language consistent across `/`, `/blog/`, `/projects/`, and post routes.

## Review Workflow

1. Ground in the local implementation before judging aesthetics:
   - Inspect `src/layouts/BaseLayout.astro`, shared components, page routes, `src/styles/global.css`, and `src/styles/blog.css`.
   - Inspect representative content frontmatter and one long Markdown post when article UX matters.
2. Identify the current visual thesis:
   - What does the first viewport say this site is?
   - Does the visual language support a personal reading room, or does it drift into generic dashboard/card UI?
3. Evaluate the design system:
   - Palette: warm, readable, and not one-note.
   - Typography: clear hierarchy, good Chinese body reading, restrained display type.
   - Layout: stable widths, predictable rhythm, no nested-card clutter.
   - Signature: one memorable site-specific detail, not many decorations.
4. Critique before proposing changes:
   - Flag anything that feels templated, decorative without purpose, or inconsistent across routes.
   - Preserve effective choices even if they differ from upstream defaults.
5. Recommend small, scoped fixes:
   - Prefer token, spacing, hierarchy, or component adjustments over redesign.
   - Prioritize reading comfort, focus states, mobile fit, and dark-mode consistency.

## Output Format

For audits, write concise findings with:

- Severity: `high`, `medium`, or `low`.
- Affected route/component/file.
- Issue.
- Rationale.
- Fix recommendation.

For implementation planning, specify exact boundaries:

- No route changes.
- No content schema changes.
- No package changes.
- No broad redesign unless explicitly requested.

## Local References

- `references/qiu-site-visual-brief.md`

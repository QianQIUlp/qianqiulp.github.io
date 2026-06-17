---
name: qiu-site-web-design-guidelines
description: Repo-specific local UI/UX audit checklist for Qiu's Astro personal site. Use when auditing PR #52 or future site UI for accessibility, focus states, responsive layout, dark mode, navigation, content handling, and image behavior without fetching remote guidelines.
metadata:
  adapted-from: vercel web-design-guidelines
---

# Qiu Site Web Design Guidelines

Use this skill to audit this repository's UI against a local, vendored guideline checklist. It is adapted from Vercel's web-design-guidelines skill and local Web Interface Guidelines reference.

## Local-Only Policy

- Do not fetch remote Markdown, remote scripts, or mutable upstream guideline URLs at runtime.
- Read only local repository files and this skill's local references.
- Use `references/web-interface-guidelines.md` as the complete local checklist.
- Do not add packages, frameworks, or runtime dependencies as part of audit recommendations.

## Audit Scope For This Site

Review these areas when relevant:

- Shared layout, navigation, and theme toggle.
- Home page hierarchy and calls to action.
- Blog archive and post cards.
- Article page reading layout, TOC, headings, code, tables, and images.
- Projects page list behavior.
- Light/dark theme consistency.
- Mobile layout at narrow widths.
- Focus states and keyboard-visible interaction feedback.

## Workflow

1. Read `references/web-interface-guidelines.md`.
2. Inspect the local files or rendered routes named by the task.
3. Classify findings:
   - `high`: blocks access, navigation, reading, or core interaction.
   - `medium`: likely UX/a11y issue or responsive/readability defect.
   - `low`: polish, copy, convention, or preference-level issue.
4. Recommend fixes that fit this Astro site:
   - Prefer semantic HTML and CSS fixes.
   - Do not suggest React/Next patterns unless the repository adopts them later.
   - Do not suggest package changes for issues solvable in current Astro/CSS.

## Output Format

For documentation audits, use a Markdown table with:

- Severity
- Route / Area
- File
- Finding
- Rationale
- Recommendation

For terse code reviews, group by file and use clickable `file:line` references when exact lines are known.

## Local References

- `references/web-interface-guidelines.md`

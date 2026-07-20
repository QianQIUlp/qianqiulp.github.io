---
name: qiu-site-frontend-design
description: Repo-specific visual design workflow for Qiu's Astro personal site. Use when reviewing or refining this site's UI direction, typography, layout, visual hierarchy, and warm-study reading experience without changing routes, schemas, frameworks, or runtime dependencies.
---

# Qiu Site Frontend Design

Use this skill for UI/UX design judgment on this repository only. It adapts upstream frontend-design guidance to Qiu's Astro static site and must only read local repository files.

## Governing Contract

**`docs/uiux/ink-and-light-study.md`（墨光书房）是全站唯一现行视觉契约。**
评审或改动任何视觉内容前必须先读它。核心要点（细节以契约全文为准）：

- 界画四原则：统一纸底（无第二底板色）、统一光源（左上，投影右下）、边缘墨化（无硬边贴画）、墨分五色（焦浓重淡清承担层级，不引新灰色）。
- 昼宣 / 夜墨双主题为同一构图，只许明暗浓淡变化；主题切换为晕染收拢转场。
- 朱砂（#a2402c）是唯一彩色，只用于落款语义位（印章、卷题、题跋侧签、朱批），不做品牌主色。
- 书体 QiuBrush 只出现在契约允许的四处文字；正文/UI 一律 Noto Serif SC。
- 「显影」（data-reveal）是唯一入场动效；氛围层是"空气"，不得遮挡内容。
- 旧契约 `docs/uiux/person-first-editorial-system.md` 已废止，仅页面职责与内容边界部分留作背景。

## Local-Only Policy

- Do not fetch remote Markdown, remote scripts, or mutable upstream design references at runtime.
- Read only files in this repository, especially `src/`, `AGENTS.md`, `docs/uiux/`, and this skill's local `references/`.
- Treat `SOURCE.md` and `ADAPTATION.md` as provenance and scope notes, not runtime instructions to fetch remote content.
- Do not add npm packages, UI frameworks, React, Tailwind, shadcn, or runtime frontend dependencies.

## Design Brief

The site is a Chinese personal blog and portfolio built with Astro. The identity is 墨光书房:
a study room that is ink-dark at night with one lamp, and xuan-paper bright by day. Quiet,
readable, personal, slow-reading oriented. It must avoid generic AI SaaS style, excessive
card stacks, decorative emoji dependency, and landing-page marketing composition.

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
   - Read `docs/uiux/ink-and-light-study.md` first, then inspect `src/layouts/BaseLayout.astro`,
     shared components, page routes, `src/styles/global.css`, `src/styles/home-room.css`, and `src/styles/blog.css`.
   - Inspect representative content frontmatter and one long Markdown post when article UX matters.
2. Identify drift against the contract (these are the most common AI-agent mistakes here):
   - New background/surface colors that create a "second paper".
   - Cinnabar used as a general accent/brand color on buttons or links.
   - QiuBrush brush type used for component titles or body text.
   - A second entrance animation besides 显影; hard-edged images instead of 边缘墨化.
   - Elements visible in one theme but missing/moved in the other.
   - Shadows falling any direction other than lower-right.
3. Evaluate hierarchy with ink grades, not new hues:
   - 焦浓重淡清 covers 标题/正文/次要/辅助/装饰; if a level feels missing, remap to an existing grade.
4. Critique before proposing changes:
   - Flag anything that feels templated, decorative without purpose, or inconsistent across routes.
   - Preserve effective choices even if they differ from upstream defaults.
5. Recommend small, scoped fixes:
   - Prefer token, spacing, hierarchy, or component adjustments over redesign.
   - Prioritize reading comfort, focus states, mobile fit, and 昼宣/夜墨 consistency.

## Output Format

For audits, write concise findings with:

- Severity: `high`, `medium`, or `low`.
- Affected route/component/file.
- Issue.
- Rationale (cite the contract section it violates, e.g. "墨分五色", "朱砂边界").
- Fix recommendation.

For implementation planning, specify exact boundaries:

- No route changes.
- No content schema changes.
- No package changes.
- No broad redesign unless explicitly requested.

## Verification Expectation

Any visual change must end with:

1. `npm run build` passing.
2. The affected entries of `docs/qa/visual-checklist.md` checked in both 昼宣 and 夜墨.
3. If the change touches a system described by the contract, update `docs/uiux/ink-and-light-study.md`
   and this skill in the same change.

## Local References

- `references/qiu-site-visual-brief.md`

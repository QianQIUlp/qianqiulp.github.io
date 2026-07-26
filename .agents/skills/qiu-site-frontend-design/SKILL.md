---
name: qiu-site-frontend-design
description: Repo-specific visual design workflow for Qiu's Astro personal site. Use when reviewing or refining this site's UI direction, typography, layout, visual hierarchy, and warm-study reading experience without changing routes, schemas, frameworks, or runtime dependencies.
---

# Qiu Site Frontend Design

Use this skill for UI/UX design judgment on this repository only. It adapts upstream frontend-design guidance to Qiu's Astro static site and must only read local repository files.

## Governing Contract

本项目有明确的上下位关系，不能只读视觉规则就开始机械执行：

1. **`docs/uiux/homepage-art-direction.md` 是首页创作原点。** 它保存用户原话：东西很多，初见很少；
   先见千秋、吉他与生活，再由光影和墨让其他侧面被读者发现。艺术方向高于实现便利。
2. `docs/uiux/person-first-intent.md` 保存长期人本意图、内容边界与审计基线。
3. `docs/uiux/ink-and-light-study.md` 是当前视觉实现契约，用于保持材料和交互一致，不取代感性构图。

核心要点（细节以三份文件全文为准）：

- 界画四原则：统一纸底（无第二底板色）、统一光源（左上，投影右下）、边缘墨化（无硬边贴画）、墨分五色（焦浓重淡清承担层级，不引新灰色）。
- 昼宣 / 夜墨双主题为同一构图与物理空间；首页使用严格配准的昼夜摄影资产，只许时间、灯态、
  曝光和对应阴影变化，物件位置与接触关系不变；主题切换为晕染收拢转场。
- 朱砂（#a2402c）是唯一彩色，只用于落款语义位（印章、卷题、题跋侧签、朱批），不做品牌主色。
- 书体 QiuBrush 只用于空文章封面落款和目录题字；首页「我是千秋。」必须复用项目页
  「作品与探索」的宋体系标题字（`var(--font-serif)`、700），正文与 UI 使用正常字体。
- 「显影」（data-reveal）是唯一入场动效；氛围层是"空气"，不得遮挡内容。
- 首页工程近景严格遵循作者标注位置：MealCircuit 左上桌面、Crewlight 左下机架、
  Docker-Hadoop-Cluster 右下桌沿；禁止再自行重组为三角群组、倾斜、伪透视或通栏 HUD。
- 三张项目入口使用三套独立 HTML/CSS 设备并保留作者标注位置，禁止再次简化成同模板换色：Docker-Hadoop
  是横置 Blue Driver（蓝色双层机箱、信号栏、纵向金色旋钮、大黑踏板）；MealCircuit 是 Halfman OD
  式深色木盒（三角实木旋钮、涂鸦标签、红灯、金属彩钉）；Crewlight 是复古箱头式单块（皮革包边、
  奶油六旋钮面板、青色电源灯、蜂窝网罩、独立彩钉）。旋钮、灯和脚踏均可交互，不使用品牌摄影图或 blur 玻璃；
  昼夜按钮、返回按钮与分区标题保持普通界面材质。窄屏背景应把 Supro 箱头作为主要视觉锚点。
- 首页昼/夜共用近乎全黑的舞台与前景材质，只切换严格配准的白天/夜晚摄影图；仅文章与作品
  使用左右两块黑幕覆盖完整背景，生活/吉他没有第三块状态且吉他固定在其上；悬停时缓慢整块退去，访问后在当前
  会话累计保留，两块访问后黑幕完全消失；
  移动端三个入口的底部 dock 首次加载即完整可用。
- 全站界面不再显示 Seal；页眉使用正常文字品牌。
- 所有文章共用左中悬浮目录抽屉：原生 `details` 一键展开/收起，不挤压正文；无章节标题时仍显示
  「文章开头」，不得恢复为依赖单篇 `toc` frontmatter 的可选功能。
- 旧契约 `docs/uiux/person-first-editorial-system.md` 只作历史记录。

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

The homepage is an artistic encounter, not a content dashboard. Do not expose every route,
category, project, status, and explanation at first glance. Keep richness in depth: the initial
composition leads with Qiu and the guitar; writing and engineering emerge only as the visitor
approaches shadowed areas or makes a choice. Do not turn that discovery into a visible wizard,
progress tracker, or onboarding framework.

Primary audience:

- Readers of long Chinese essays and technical notes.
- Visitors checking projects, contact links, and the author's writing archive.
- The author, returning later to reread context and decisions.

Core jobs:

- Let a stranger encounter Qiu as a living person before seeing content categories.
- Let visual metaphor carry the first impression, then let real content substantiate it after discovery.
- Make the latest writing easy to discover.
- Make long article reading comfortable.
- Keep navigation and visual language consistent across `/`, `/blog/`, `/projects/`, and post routes.

## Review Workflow

1. Ground in the local implementation before judging aesthetics:
   - For homepage work, read `docs/uiux/homepage-art-direction.md` first. Then read
     `docs/uiux/person-first-intent.md` and `docs/uiux/ink-and-light-study.md` before inspecting `src/layouts/BaseLayout.astro`,
     shared components, page routes, `src/styles/global.css`, `src/styles/home-room.css`, and `src/styles/blog.css`.
   - Inspect representative content frontmatter and one long Markdown post when article UX matters.
2. Identify drift against the contract (these are the most common AI-agent mistakes here):
   - New background/surface colors that create a "second paper".
   - Cinnabar used as a general accent/brand color on buttons or links.
   - QiuBrush brush type used for component titles or body text.
   - A second entrance animation besides 显影; hard-edged images instead of 边缘墨化.
   - Elements visible in one theme but missing/moved in the other，或配对摄影图中的物件、接触面、线材位置漂移；
     或首页浅色主题重新出现纸光池、浅色悬浮控件与独立前景滤镜。
   - 用 sepia/纸纹/全局噪点把写实房间重新压成假材质，或让同一种生成纹理跨越墙、木、金属与织物。
   - Shadows falling any direction other than lower-right.
   - Homepage first view exposing full navigation/content taxonomy before the reader explores.
3. Evaluate hierarchy with ink grades, not new hues:
   - 焦浓重淡清 covers 标题/正文/次要/辅助/装饰; if a level feels missing, remap to an existing grade.
4. Critique before proposing changes:
   - Flag anything that feels templated, decorative without purpose, or inconsistent across routes.
   - Preserve effective choices even if they differ from upstream defaults.
   - Step away from rule compliance and judge the first glance: focal light, quiet space, visual order,
     and whether the dark areas invite discovery. Do not fix a weak composition by adding explanatory copy.
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
   and this skill in the same change. Homepage changes must also be reviewed against
   `docs/uiux/homepage-art-direction.md`; never rewrite the user's art direction into a narrower component rule.

## Local References

- `references/qiu-site-visual-brief.md`

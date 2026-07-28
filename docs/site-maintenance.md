# 站点维护说明

这份文档用于后续维护千秋的个人站。目标是降低改文章、改项目页、做 UI 调整时的上下文成本。

## 本地启动

首次进入仓库后安装依赖：

```sh
npm install
```

日常开发：

```sh
npm run dev
```

提交前至少跑一次生产构建：

```sh
npm run build
```

需要检查构建产物时：

```sh
npm run preview
```

`dist/`、`.astro/`、`node_modules/` 是生成目录或依赖目录，不要提交。

## 新增文章

文章放在 `src/content/posts/`，文件名使用日期开头的 URL-safe slug：

```text
YYYY-MM-DD-topic.md
```

frontmatter 必须匹配 `src/content.config.ts`：

```yaml
---
title: "文章标题"
date: 2026-06-17
tags: [Tech, Reflection]
description: "用于列表页、SEO 和文章头部的简短摘要。"
ogImage: ../../assets/posts/topic/cover.webp
ogImageAlt: "文章封面说明"
toc: true
license: "CC BY-NC 4.0"
---
```

必填字段：

- `title`
- `date`
- `tags`
- `description`

可选字段：

- `ogImage`
- `ogImageAlt`
- `toc`
- `license`

文章图片建议放在 `src/assets/posts/<post-slug>/`。封面图和正文图都要有明确用途；正文 Markdown 图片需要写有意义的 alt 文本。改完文章后跑 `npm run build`，确认内容集合、图片路径和静态路由都能通过。

长随笔、长教程、长技术文默认建议在正文开头放一个导读 `<aside>`。常用结构固定为：

- `关于这篇文章`
- `适合谁读`
- `怎么读这篇文章`
- `版权与声明`
- `首发与转载`

写导读时注意：

- `关于这篇文章` 只写主题、张力和写作意图，不写营销腔。
- `适合谁读` 和 `怎么读这篇文章` 用简短清单即可。
- 如果没有外部首发链接，`首发与转载` 默认写“首发于：千秋的个人站（本站）”。

多章节技术指南、操作手册、长参考文默认加 `toc: true`。目录由 `src/pages/blog/posts/[...slug].astro` 统一生成，不要手写目录导航。

如果文章启用了 `toc: true`，并且希望“关于这篇文章”显示在目录前，导读 `<aside>` 必须是正文里的第一个顶层块；它前面不要放额外段落、图片、H1 或其他 HTML 块。

## 新增项目

项目页数据集中在 `src/data/projects.ts`。新增或修改 `/projects/` 前，先读：

- `src/data/projects.ts`
- 相关 `docs/project-briefs/*.md`

新增真实项目时，优先补一份 project brief，再把页面展示文案沉淀到 `src/data/projects.ts`。项目文案只写有证据支撑的事实，不补写用户规模、性能指标、成熟度、生产可用性等未经确认的信息。

字段维护要点：

- `featuredProjects` 用于真实项目展示。
- `secondaryProjects` 用于站点基础设施、归档入口、学习线索等次级内容。
- `selectedGuidePostIds` 必须对应 `src/content/posts/` 中存在的文章 slug。
- 外部链接设置 `external: true`，渲染时会使用新标签页和安全 `rel`。
- `docker-hadoop-cluster` 是当前项目的真实仓库 slug；旧的 `dockder-hadoop-cluster` 链接均为错误拼写。

## UI 检查

UI 改动后先跑：

```sh
npm run build
npm run preview
```

再按 `docs/qa/visual-checklist.md` 做手动检查。至少覆盖：

- `/`
- `/blog/`
- `/projects/`
- 受影响的文章页
- desktop、768px、375px
- light 和 dark mode

重点看：

- 没有页面级横向滚动。
- 图片、字体、TOC、文章头部没有明显加载后位移。
- 文章正文可读，代码块和表格在窄屏内自己横向滚动。
- focus 状态清楚，Tab 顺序符合视觉阅读顺序。
- 外链目标正确，`target="_blank"` 链接带 `rel="noopener noreferrer"`。

## 不能随意改的字段和边界

不要随手改这些内容，除非这次任务明确要求：

- `src/content.config.ts` 的文章 schema。
- 现有路由结构：`/`、`/blog/`、`/blog/posts/[...slug]/`、`/projects/`。
- 文章 frontmatter 字段名。
- 项目数据字段结构和已确认项目事实。
- `astro.config.mjs` 中的站点级配置。
- `BaseLayout.astro` 里的 canonical、OG、favicon、theme-color 等全站元信息。
- `public/` 下 favicon、apple touch icon、robots 等站点资源。

样式改动优先放在：

- `src/styles/global.css`
- `src/styles/blog.css`

不要为了局部效果大量添加 inline CSS。不要引入新的 UI 框架、React、Tailwind、shadcn 或运行时前端依赖来解决静态 CSS 可以解决的问题。

## Codex 做 UI 改动前要读什么

Codex 或其他维护者在做 UI 改动前，至少先读这些文件：

- `AGENTS.md`
- `.agents/skills/qiu-site-frontend-design/SKILL.md`
- `.agents/skills/qiu-site-frontend-design/references/qiu-site-visual-brief.md`
- `.agents/skills/qiu-site-web-design-guidelines/SKILL.md`
- `.agents/skills/qiu-site-web-design-guidelines/references/web-interface-guidelines.md`
- `docs/qa/visual-checklist.md`
- `src/layouts/BaseLayout.astro`
- `src/components/SiteHeader.astro`
- `src/styles/global.css`
- `src/styles/blog.css`
- 相关页面文件：`src/pages/index.astro`、`src/pages/blog/index.astro`、`src/pages/blog/posts/[...slug].astro`、`src/pages/projects/index.astro`

如果改文章体验，还要读：

- `src/content.config.ts`
- 至少一篇长文章和一篇图片较多的文章

如果改项目页，还要读：

- `src/data/projects.ts`
- `docs/project-briefs/docker-hadoop-cluster.md`

UI 方向保持“温暖书房”：安静、可读、个人化、适合中文长文。不要把站点改成泛 AI SaaS、营销落地页或堆叠卡片式仪表盘。

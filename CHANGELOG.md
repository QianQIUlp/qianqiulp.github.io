# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-07-20

### Added
- 新视觉契约「墨光书房」落地：界画四原则（统一纸底、左上光源、边缘墨化、墨分五色）全站实施，详见 `docs/uiux/ink-and-light-study.md`。
- 昼宣 / 夜墨双主题：首页房间昼态以宣纸罩与场景滤镜洗亮，主题切换改为墨晕收拢转场（`.theme-wipe`），支持 `prefers-reduced-motion` 即时切换。
- 朱砂印章组件 `Seal.astro`（白文「千秋」），应用于页眉、页脚与文章授权协议落款。
- 书体 QiuBrush（Long Cang 子集，11.4KB woff2）：首页题字、空封面落款、印章旁落款与目录题字；附 `scripts/subset-signature-font.py` 再生成脚本。
- 全站氛围层（夜墨墨絮 / 昼宣花瓣）与「显影」入场动效（`data-reveal` 上移 + 虚化收敛）。
- 首页房间：呼吸微光热点、花瓣层、题字纸光池；近景图 lazy 加载与质量调优。
- 内页界画化：博客乌丝栏双墨线与「卷/题」朱砂标签、文章页题跋侧签与落款印章、目录书体题字、项目页朱批侧注；正文开启 `text-spacing-trim` 等中文排印优化。
- 场景资产再生成提示词 `docs/asset-prompts/`（全景/书桌/工作区/幕布四份 + 过审清单）。

### Changed
- 全局 tokens 重构：墨色五级（焦浓重淡清）、朱砂、灯光、纸纹与阴影减负；`.page-kicker` 取代原 eyebrow 体系。
- 字体加载改为 `<link>` + preconnect，修复 `body` 误入 `font: inherit` 选择器导致正文回退默认衬线的问题。
- `docs/uiux/person-first-editorial-system.md` 标记为已废止（留档），视觉语法以新契约为准。
- 更新 `docs/qa/visual-checklist.md`（新增设计系统检查节）、`README.md`、`AGENTS.md` 与 `.agents/skills/qiu-site-frontend-design/`。

---

## [0.4.0] - 2026-05-27

### Added
- 新增博客文章：`2026-05-26-llm-metacog-blindspot` (LLM 元认知盲区)。
- 新增 Notion 风格的动态目录 (Table of Contents) 组件，应用在 Linux 与 SSH 博客文章中。
- 配置 JSON-LD `BlogPosting` 结构化数据模式，提升搜索引擎对博文的解析。

### Changed
- 重构主页卡片，将其组件化（`ColoredCards`），并动态渲染最新博客文章。
- 重构博客文章格式，将博文中内联的 HTML 块转换为标准的 Markdown 块以获得更好的兼容性。
- 迁移静态图片资产至 `src` 目录，利用 Astro 内置的图像优化系统（`astro:assets`）提升加载性能。

### Fixed
- 修复博客卡片在某些分辨率下图片被拉伸的布局问题，强制维持 16:9 比例与 cover 裁切。
- 修复 `aspect-ratio` 在被 HTML 的 `height` 属性覆盖时失效的问题，添加 `height: auto`。
- 修复部分博客文章内的错别字以及指向 Notion 首发链接的错误。

---

## [0.3.0] - 2026-05-18

### Added
- **项目重大升级**：全站从纯 HTML 静态页面重构迁移为 **Astro 静态站点生成器**（Astro v6）。
- 配置 GitHub Actions 自动化 CI 部署工作流。
- 配置自动化 sitemap 生成插件，生成站点地图。

### Changed
- 重构样式系统：将原本的内联与页面样式移入 `src`，并接入 Astro/Vite 样式处理管道。
- 为 GitHub Pages 配置 `.nojekyll` 文件，避开默认的 Jekyll 构建行为。

### Fixed
- 锁定 CI 的 Node-version 为 22，以满足 Astro 最新引擎的要求。
- 修复暗黑模式闪屏 (FOUC) 问题：将主题初始化脚本移至 `<head>` 中，并加入系统偏好自动检测。

---

## [0.2.0] - 2026-05-10

### Added
- **全站 Notion 风格重构**：全站重塑为“Qiu 的小屋”温润文案与暖炭黑极简 Notion 风格。
- 增加全站暗黑模式/深色模式支持，并支持自动记录用户的偏好状态。
- 新增三篇技术博客文章：`启喻鸟之章`、`SSH 秘钥管理`、`Linux 安全加固配置`。

### Changed
- 重构样式结构：剥离 `index.html` 和 `projects.html` 的所有内联样式，统一抽离到 `style.css`。

### Fixed
- 修复浏览器缓存导致的样式错乱：为全局 CSS 引用引入版本号参数。
- 修复《启喻鸟之章》博客中的图片资源加载路径错误。

---

## [0.1.0] - 2026-04-20

### Added
- 主页（自我介绍、技能展示）以及联系方式组件搭建。
- 新增作品展示页 `projects.html` 并在首页增加相应入口。
- 初始化 GitHub 仓库，并添加基本的 `.gitignore` 与 `README.md`。

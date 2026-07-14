# 🏡 qianqiulp.github.io

这是千秋的个人主页与写作空间，使用 **Astro** 构建。网站以暖纸、编辑排版和克制光影组织项目、技术实践、阅读随笔、游戏观察与仍在成形的想法，并支持响应式布局和深浅色模式。

[![Astro](https://img.shields.io/badge/Astro-v6.0-FF5D01.svg?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deploy to GitHub Pages](https://github.com/qianqiulp/qianqiulp.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/qianqiulp/qianqiulp.github.io/actions/workflows/deploy.yml)

---

## 🌟 核心特性

- **人本编辑工作台**：以个人而非单一项目为主体，在同一套暖纸视觉语言中容纳写作、工程、学习与生活痕迹。
- **动态博客系统**：基于 Astro 6.0 Content Collections 构建，支持 Markdown 编写并自动生成 SEO Meta 头和站点地图。
- **长文动态目录**：博客文章页支持滚动联动目录，并针对中文长文、代码块、表格和图片优化阅读体验。
- **智能深色模式**：自动识别系统级别深色偏好，且记住用户手动调整的深色/浅色状态，消除加载闪烁（FOUC）。
- **组件化设计**：主页信息卡片自适应布局，并动态拉取展示最新的 3 篇博客文章。
- **性能优化**：使用 Astro 原生图像优化（`astro:assets`）和极低的 CSS 与 JS 体积，秒级加载。

## 🛠️ 本地开发与预览

本项目使用 Astro 构建，本地运行非常简单：

### 1. 准备工作

确保你的本地开发环境已安装 [Node.js](https://nodejs.org/) (推荐安装 LTS 版本，如 v22+)。

### 2. 安装步骤

1. 克隆本仓库到本地：
   ```bash
   git clone https://github.com/qianqiulp/qianqiulp.github.io.git
   cd qianqiulp.github.io
   ```
2. 安装项目依赖：
   ```bash
   npm install
   ```

### 3. 开发命令

- **本地预览开发服务器**：
  ```bash
  npm run dev
  ```
  启动后，在浏览器访问 `http://localhost:4321` 即可预览站点，修改文件后浏览器将实时热更新（HMR）。

- **项目打包构建**：
  ```bash
  npm run build
  ```
  该命令会验证 TypeScript 和编译所有 Astro 页面，在本地生成打包后的静态文件，存放在 `dist` 目录中。

- **预览打包后站点**：
  ```bash
  npm run preview
  ```

---

## 🧭 维护文档

- [站点维护说明](./docs/site-maintenance.md)：本地启动、新增文章、新增项目、字段边界和 Codex UI 改动前置阅读清单。
- [Visual QA Checklist](./docs/qa/visual-checklist.md)：UI 改动后的手动检查项，覆盖首页、博客、文章页、项目页、暗色模式、移动端、键盘焦点和图片稳定性。

---

## 📂 仓库结构说明

```text
qianqiulp.github.io/
├── .github/
│   ├── ISSUE_TEMPLATE/       # GitHub 反馈模板 (Bug, Feature)
│   ├── PULL_REQUEST_TEMPLATE.md # GitHub PR 预填模板
│   └── workflows/            # GitHub Actions CI 自动化部署工作流
├── src/
│   ├── assets/               # 博客封面及插图等静态媒体资产
│   ├── components/           # 公共 Astro 页面组件
│   ├── content/              # Markdown 技术博客文章源文件
│   │   └── posts/            # 博客 markdown 文件
│   ├── layouts/              # 站点整体页面布局架构
│   ├── pages/                # 站点路由页面 (index.astro, projects.astro)
│   └── styles/               # 站点全局及局部公共样式
├── public/                   # 存放在站点的全局非编译资产 (favicon 等)
├── astro.config.mjs          # Astro 项目配置文件
├── CONTRIBUTING.md           # 贡献者协作指引手册
├── CHANGELOG.md              # Keep a Changelog 标准更新历史
├── LICENSE                   # MIT 开源许可证协议
└── package.json              # 项目依赖及运行指令配置
```

---

## 🤝 参与贡献

如果你想为我提供建议、发现 Bug 或者想提交代码：
- 请先阅读我们的 [CONTRIBUTING.md](./CONTRIBUTING.md) 以了解我们的开发准则和提交流程。
- 欢迎通过 [Issue](../../issues) 与我沟通！

## 📄 开源许可证

本项目基于 [MIT](./LICENSE) 许可证开源，任何人均可自由地获取、修改和使用本仓库的代码，但须保留版权声明与免责声明。

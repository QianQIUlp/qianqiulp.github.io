# Qiu's Room + Developer Profile

一个仓库中的两套独立 Astro 静态站：`qiu.works` 是英文优先的开发者主页，`room.qiu.works` 是保留人物叙事与房间探索的 Qiu's Room。VeriSilo 产品官网继续由自己的仓库维护。

[![Astro](https://img.shields.io/badge/Astro-7.1-FF5D01.svg?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Build both Astro sites](https://github.com/qianqiulp/qianqiulp.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/qianqiulp/qianqiulp.github.io/actions/workflows/deploy.yml)

## 站点边界

| 入口 | 作用 | 应用目录 |
|---|---|---|
| `https://qiu.works` | 开发者身份、代表作品、工程原则、精选写作与联系入口 | `developer/` |
| `https://room.qiu.works` | 房间、吉他、文章、项目档案与生活近景 | 仓库根目录 |
| `https://verisilo.qiu.works` | VeriSilo 产品说明与转化 | VeriSilo 独立仓库 |

两套个人站互相链接，但不复制彼此的职责：开发者主页负责快速建立职业认知，Room 负责呈现一个更完整的人。

## 本地开发

项目要求 Node.js `>=22.12.0 <23`，仓库通过 `mise.toml` 固定为 `22.23.1`。

```bash
# 安装两套应用的依赖
npm install
npm --prefix developer install

# Qiu's Room
npm run dev

# Developer Profile
npm run dev:developer

# 一次构建两套应用
npm run build:all
```

也可以分别使用 `npm run build`、`npm run build:developer`、`npm run preview` 和 `npm run preview:developer`。构建产物位于 `dist/` 与 `developer/dist/`，均不提交。

## Cloudflare Pages

同一 GitHub 仓库连接两个 Pages 项目，生产分支均为 `main`，环境变量均设置 `NODE_VERSION=22.23.1`。

| Pages 项目 | Root directory | Build command | Output directory | Custom domain |
|---|---|---|---|---|
| Developer | `developer` | `npm run build` | `dist` | `qiu.works` |
| Room | 留空（仓库根目录） | `npm run build` | `dist` | `room.qiu.works` |

`.github/workflows/deploy.yml` 只执行两套静态构建检查，不再发布 GitHub Pages。邮箱相关的 MX、SPF、DKIM 与 DMARC 不属于网站部署配置。

## 仓库结构

```text
qianqiulp.github.io/
├── developer/               # qiu.works 独立 Astro 应用
│   ├── public/              # 产品实图、Room 裁图、分享卡与 favicon
│   └── src/                 # 双语单页、布局、内容与样式
├── src/                     # room.qiu.works Astro 源码
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── public/                  # Room 静态资源与分享卡
├── docs/                    # 内容维护、设计契约与 QA
└── .github/workflows/       # 双站构建检查
```

## 设计与维护文档

- [Room 首页艺术方向](./docs/uiux/homepage-art-direction.md)
- [Room 人物优先意图](./docs/uiux/person-first-intent.md)
- [Room 现行视觉契约](./docs/uiux/ink-and-light-study.md)
- [Developer 编辑工作台契约](./docs/uiux/developer-workbench.md)
- [Visual QA Checklist](./docs/qa/visual-checklist.md)
- [站点维护说明](./docs/site-maintenance.md)

## License

[MIT](./LICENSE)

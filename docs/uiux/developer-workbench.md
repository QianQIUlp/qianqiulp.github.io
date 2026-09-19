# Developer Profile · Editorial Workbench

`developer/` 是部署到 `https://qiu.works` 的独立 Astro 静态应用，也是独立、自筹软件工作室 Q Studio 的官网，由 Qian Qiu 创建和运营。本契约只约束开发者主页；
Qiu's Room 继续由 [`homepage-art-direction.md`](./homepage-art-direction.md)、
[`person-first-intent.md`](./person-first-intent.md) 与 [`ink-and-light-study.md`](./ink-and-light-study.md) 管理。

## 职责边界

开发者主页在十秒内回答：Q Studio 是什么、谁在运营、正在构建什么、做过什么、怎样工作、如何联系。它是 GitHub、Discord、
X、LinkedIn、合作方与未来客户的职业入口，不承担完整人物叙事，也不替 VeriSilo 做产品转化。

品牌关系是 Q Studio by Qian Qiu：工作室身份优先，创始人身份保留。Qiu 的小屋是创始人的个人空间，不是工作室产品。

- `/` 默认英文，`/zh/` 提供完整中文对应；
- Room 负责人物、房间、写作档案、生活与完整项目档案；
- VeriSilo 官网负责用户问题、产品能力、下载与反馈；
- 开发者主页只做可信摘要和导流，不复制两边的全部内容。

## 视觉方向

名称是**编辑工作台**：像一张被认真整理、仍在工作的桌面，而不是简历模板或营销落地页。

- 暖米白与炭黑构成 Light/Dark 基础，左上有轻微暖光，暗红只用于线、状态与小型强调；
- 系统无衬线承担正文与主信息，serif 只用于姓名和少量编辑性标题，mono 只用于状态、编号与项目元信息；
- 留白、细线、对齐和明确网格承担分组，不堆通用圆角卡片；
- 使用真实 VeriSilo 页面/应用图与真实 Room 裁图，不生成虚构产品 UI；VeriSilo 证据图和 Room 裁图都按语言分别取自对应页面，前者保留完整、自洽的画面构图，后者展示已完整照亮的概览；- 不使用房间场景作全页背景，不使用技术 Logo 墙、终端皮肤、SaaS 渐变、仪表盘或同模板卡片矩阵；
- 动效只允许短淡入与必要反馈，`prefers-reduced-motion` 下信息立即呈现。

## 固定信息架构

1. **Hero** — Q Studio 身份、创始人 Qian Qiu、local-first / explicit boundaries 主轴、当前重点 VeriSilo、Selected Work / GitHub / Room。
2. **Now Building** — VeriSilo 的真实状态、Windows-first、开源、Chrome/Edge 环境隔离与隐私审计边界。
3. **Selected Software** — Primary/current product VeriSilo；其他公开软件 Crewlight、MealCircuit；教学实验 Hadoop Lab（明确不是产品）。分别只保留受众、问题、关键设计、状态和链接。
4. **Studio** — Q Studio、创始人、独立自筹模式、方向、当前重点、联系邮箱、公开源码的可见事实表。
5. **How I Build** — Local-first、Inspectable systems、Explicit boundaries、Reproducible infrastructure、User-controlled data。
6. **Selected Writing** — LLM 元认知、Linux 服务器加固、资源使用规则的对应语言 Room 文章。
7. **Beyond Work** — 一张对应语言、完整亮屏的真实 Room 图片和匹配语言的入口，明确是创始人的个人空间；图片只负责预览，点击后仍进入 Room 正常的遮光探索状态。
8. **Contact** — `qstudio@qiu.works`、GitHub，以及经批准的产品反馈/技术合作 focused software work 文案。

不得写价格，不得承诺解决“任何软件问题”，不得虚构用户、指标、经历、界面或产品成熟度。不得添加注册公司、融资、员工、收入、客户、地址、合作伙伴等无法验证的信息；结构化数据只使用真实存在的 Organization 字段。

## 响应式与交互

- 1440px 使用非对称编辑网格；768px 收敛列宽；375px 与 375 × 667px 变成清楚的单列；
- 页面不得水平滚动，主要触控目标至少 44 × 44px；
- 跳转链接、导航、语言、主题、项目与联系入口均可键盘操作并有可见焦点；
- Light/Dark 的内容、顺序和证据相同；可见按钮保持 `Day / Night` 与「昼 / 夜」；
- 图片预留稳定比例，文字和链接不得依赖动画才能出现。
- VeriSilo 证据图与 Room 裁图必须取自对应语言的**当前**线上页面。产品站或 Room 视觉改版后，这两组图需重新截取，不能沿用旧版表面。
- 证据图当前取自 `verisilo.qiu.works` 的 `.evidence-section`（`Confidence, with a trace.` / 「安心，有迹可循。」），两种语言均为 1440 × 710。换图时必须同步 `developer/src/content.ts` 的 `work.imageHeight` 与 `developer/src/styles/global.css` 的 `.featured-project__visual` `aspect-ratio`，三者保持一致以免变形。

## 元数据与部署

- canonical、hreflang、Sitemap、robots 与 OG URL 均使用 `https://qiu.works`；
- title/description/OG 明确关联 Q Studio 与创始人 Qian Qiu；`og:site_name` 使用 `Q Studio`；
- 页面包含最小 Organization JSON-LD：name `Q Studio`、url、email、founder `Qian Qiu`、sameAs GitHub 与 VeriSilo；不写 founding date、地址、电话、员工与法律实体；
- 中英文分别使用 1200 × 630 分享卡；
- Cloudflare Pages 根目录为 `developer`，构建命令 `npm run build`，输出目录 `dist`；
- 纯静态输出，不引入 SSR、Cloudflare adapter、表单后端或额外前端框架。

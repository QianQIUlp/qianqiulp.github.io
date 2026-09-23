# Developer Profile · Editorial Workbench

## 2026-09-23 · Look inside（当前方向）

`prototypes/qstudio-look-inside.html` 的最终交互稿已进入 `developer/`。本节取代下文旧版编辑工作台的视觉、章节与交互规定；旧版内容仅保留决策记录。工作室的真实身份、产品边界、双语路由、链接与元数据要求继续有效。

- 首屏以深绿底、编辑式排印和真实 VeriSilo 官网截图表达「Look inside / 看见内部」。圆形镜片可以直接拖动，也可以通过原生滑条与键盘移动；镜片内显示对应语言的真实证据截图，并随位置平移。滑到最左侧时，证据标题完整可见，不用固定文案替代截图。
- 下方按作品、工作方式、创始人、写作、联系方式形成简洁信息流。四个作品以原生 `details` 展开，包含真实截图、受众、边界与来源链接。`Me` 跳到创始人段落，个人站预览保持矩形全图，链接进入对应语言的 `me.qiu.works`。
- `/` 英文、`/zh/` 中文都在构建时输出完整正文。语言切换保留当前锚点；截图资源使用正式站点路径。截图放大有原生图片链接作为无 JavaScript 回退。
- 页面使用原型的固定色彩与布局，不再提供旧版的昼夜主题按钮、滚动章节指示、复制邮箱或额外说明面板。对应语言的 1200 × 630 OG 图跟随新首屏。
- 检查 1440、768、375 和 320 宽度的阅读与无水平滚动；检查镜片左右端点、直接拖动、滑条键盘操作、项目展开、图像对话框、语言与锚点。

`developer/` 是部署到 `https://qiu.works` 的独立 Astro 静态应用，也是独立、自筹软件工作室 Q Studio 的官网，由 Qian Qiu 创建和运营。本契约只约束开发者主页；
千秋的个人站 `me.qiu.works` 继续由 [`homepage-art-direction.md`](./homepage-art-direction.md)、
[`person-first-intent.md`](./person-first-intent.md) 与 [`ink-and-light-study.md`](./ink-and-light-study.md) 管理。

## 职责边界

开发者主页在十秒内回答：Q Studio 是什么、谁在运营、正在构建什么、做过什么、怎样工作、如何联系。它是 GitHub、Discord、
X、LinkedIn、合作方与未来客户的职业入口，不承担完整人物叙事，也不替 VeriSilo 做产品转化。

品牌关系是 Q Studio by Qian Qiu：工作室身份优先，创始人身份保留。千秋的个人站是创始人的个人空间，不是工作室产品。

- `/` 默认英文，`/zh/` 提供完整中文对应；
- `me.qiu.works` 负责人物、吉他、音乐、写作档案与完整项目档案；
- VeriSilo 官网负责用户问题、产品能力、下载与反馈；
- 开发者主页只做可信摘要和导流，不复制两边的全部内容。

## 视觉方向

名称是**编辑工作台**：像一张被认真整理、仍在工作的桌面，而不是简历模板或营销落地页。

- 暖米白与炭黑构成 Light/Dark 基础，左上有轻微暖光，暗红只用于线、状态与小型强调；
- 系统无衬线承担正文与主信息，serif 只用于姓名和少量编辑性标题，mono 只用于状态、编号与项目元信息；
- 留白、细线、对齐和明确网格承担分组，不堆通用圆角卡片；Hero 品牌名保持干净的排印、不加计量刻度装饰；当前焦点卡片以 FILE 编号与状态点接入列表编号体系；产品层级用红色描边 chip（Primary / Public / Teaching）表达；Studio 事实表用 01–07 索引与当前焦点方点标记；
- 使用真实 VeriSilo 页面/应用图与真实个人站预览，不生成虚构产品 UI；VeriSilo 证据图和个人站预览都按语言分别取自对应页面，前者保留完整、自洽的画面构图，后者展示「千秋」与酒红色吉他的当前首屏；- 不使用房间场景作全页背景，不使用技术 Logo 墙、终端皮肤、SaaS 渐变、仪表盘或同模板卡片矩阵；
- 动效只允许短淡入与必要反馈，`prefers-reduced-motion` 下信息立即呈现；导航通过短红尺条与 `aria-current` 指出正在阅读的章节（JS 滚动感知 + `:target` 兜底），主题切换在支持 View Transitions 的环境中从按钮位置圆形揭示新主题，其余环境保持即时切换。

## 固定信息架构

1. **Hero** — Q Studio 身份、创始人 Qian Qiu、local-first / explicit boundaries 主轴、当前重点 VeriSilo、Selected Work / GitHub / Meet 千秋。
2. **Now Building** — VeriSilo 的真实状态、Windows-first、开源、Chrome/Edge 环境隔离与隐私审计边界。
3. **Selected Software** — Primary/current product VeriSilo；其他公开软件 Crewlight、MealCircuit；教学实验 Hadoop Lab（明确不是产品）。分别只保留受众、问题、关键设计、状态和链接。
4. **Studio** — Q Studio、创始人、独立自筹模式、方向、当前重点、联系邮箱、公开源码的可见事实表。
5. **How I Build** — Local-first、Inspectable systems、Explicit boundaries、Reproducible infrastructure、User-controlled data。
6. **Selected Writing** — LLM 元认知、Linux 服务器加固、资源使用规则的对应语言 `me.qiu.works` 文章。
7. **Beyond Work** — 对应语言的「千秋」与吉他首屏预览和 `me.qiu.works` 入口。文案为「工作之外，是千秋 / 千秋, beyond the studio」，介绍拿起吉他、玩音乐、翻散页和留下线条。图片只负责预览，点击进入个人站真实首页。
8. **Contact** — `qstudio@qiu.works`、GitHub，以及经批准的产品反馈/技术合作 focused software work 文案。

个人站的中英文首页、项目记录和文章统一链接到 `https://me.qiu.works`；英文保留姓名「千秋」，不得继续显示旧域名或旧的 Qiu's Room 入口文案。

不得写价格，不得承诺解决“任何软件问题”，不得虚构用户、指标、经历、界面或产品成熟度。不得添加注册公司、融资、员工、收入、客户、地址、合作伙伴等无法验证的信息；结构化数据只使用真实存在的 Organization 字段。

## 响应式与交互

- 1440px 使用非对称编辑网格；768px 收敛列宽；375px 与 375 × 667px 变成清楚的单列；
- 页面不得水平滚动，主要触控目标至少 44 × 44px；
- 跳转链接、导航、语言、主题、项目与联系入口均可键盘操作并有可见焦点；
- Light/Dark 的内容、顺序和证据相同；可见按钮保持 `Day / Night` 与「昼 / 夜」；
- 图片预留稳定比例，文字和链接不得依赖动画才能出现。
- VeriSilo 证据图必须来自对应语言的当前产品页面；个人站预览复用已合并的 `public/assets/og/me-{en,zh}.jpg`（1200 × 630），完整显示，不裁去中文姓名或吉他。个人站改版时同步更新副本，不能保留旧房间照片。
- 证据图当前取自 `verisilo.qiu.works` 的 `.evidence-section`（`Confidence, with a trace.` / 「安心，有迹可循。」），两种语言均为 1440 × 710。换图时必须同步 `developer/src/content.ts` 的 `work.imageHeight` 与 `developer/src/styles/global.css` 的 `.evidence-trigger img` `aspect-ratio`，三者保持一致以免变形。

## 2026-09-22 · 可翻阅的工作室档案

在本地已有的编辑式细节、锚点修正、章节导航和灯光式主题切换提交上继续演进。工作室的辨识度来自排印与真实软件，参与感来自查看证据与理解取舍。

- Hero 使用横跨网格的 Q Studio 大字刊头，创始人署名靠右；下方左侧是精简的工作室立场与行动入口，右侧是 FILE 01、真实产品预览及状态。手机端按阅读顺序堆叠。
- 底部四项项目索引与 Selected Software 使用相同编号。点击直接到达项目；三个次级项目用原生 `details/summary` 展开状态、受众、设计取舍与已有链接。项目层级、摘要与教学性质始终可见，键盘和无 JavaScript 环境仍可阅读。
- 两处 VeriSilo 证据入口复用同一张对应语言截图。原生 `dialog` 提供适应视窗与原尺寸查看，超出尺寸只在图像区域滚动。关闭或 Escape 返回触发链接；无 JavaScript 时直接打开图片。明确标注截图来源，不冒充可操作的产品审计。
- 桌面端证据图在对应产品说明旁保持可见；手机端恢复普通文档流。图片完整呈现，不以裁切或悬停放大丢失证据。
- 导航根据真实章节位置更新，回到 Hero 时清除标记。只在无 JavaScript 时使用 `:target` 样式；锚点仅保留一层偏移，按实际页头高度适配。切换语言保留明确选中的章节或项目锚点。
- 联系区保留邮件链接，增加复制邮箱及可被辅助技术读取的成功/失败反馈。剪贴板不可用时仍可通过地址联系。
- 延续暖中性色、克制的红色、昼夜主题与减少动态效果偏好。所有增强使用原生 HTML/CSS/JavaScript，不增加运行依赖。

## 元数据与部署

- canonical、hreflang、Sitemap、robots 与 OG URL 均使用 `https://qiu.works`；
- title/description/OG 明确关联 Q Studio 与创始人 Qian Qiu；`og:site_name` 使用 `Q Studio`；
- 页面包含最小 Organization JSON-LD：name `Q Studio`、url、email、founder `Qian Qiu`、sameAs GitHub 与 VeriSilo；不写 founding date、地址、电话、员工与法律实体；
- 中英文分别使用 1200 × 630 分享卡；
- Cloudflare Pages 根目录为 `developer`，构建命令 `npm run build`，输出目录 `dist`；
- 纯静态输出，不引入 SSR、Cloudflare adapter、表单后端或额外前端框架。

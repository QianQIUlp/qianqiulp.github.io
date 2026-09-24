# 千秋 · me.qiu.works

2026-09-22：将用户确认的中英文空间原型接入根站 Astro。`qiu.works` 仍由 `developer/` 中的 QStudio 负责；本次不修改该应用。

## 源码

- `src/pages/index.astro` 与 `src/pages/en/index.astro`：正式首页入口。
- `src/layouts/PersonalHome.astro`：首页独立布局、双语 SEO、分享图和无 JavaScript 阅读入口。
- `src/components/me/Room.astro`、`Pedalboard.astro`：共享的双语页面与踏板标记，文案在构建时输出，无运行时翻译依赖。
- `src/styles/me/`：已确认的空间、吉他、音乐及英文排版；`site.css` 是站点导航接入细节。
- `src/scripts/me/scene.js`：空间、纸张、画线、音色控制与循环录音。
- `src/scripts/me/guitar-model.js`：照片投射与几何共同构成的 Three.js 吉他。
- `src/scripts/me/audio-engine.js`：原生 Web Audio 拨弦合成、过载、滤波与反馈回声。
- `src/assets/me/`：四张本地贴图；Vite 输出带内容指纹的静态 URL，无原型目录依赖。
- `src/vendor/three/`：沿用原型的 Three.js 0.180.0，保留 MIT LICENSE。未增加 npm 依赖。

运行 `npm ci`、`npm run dev`。发布前运行 `npm run build`、`npm run preview`，检查实际构建产物。首页代码仅在首页加载，阅读页继续使用原有布局与主题。

## 路由与交互

中文 `/`、英文 `/en/`，两种语言都保留姓名「千秋」。空间位置使用 `#home`、`#papers`、`#music`、`#trace`、`#overview`。语言切换保留位置，但整页导航清空临时录音、纸张位置及线条。散页提供中文原文；「所有文章 / 项目档案」进入对应语言的现有列表。

入口吉他随鼠标轻转，点击打开近看。近看支持拖动、缩放、方向键、细节位置、空格复位和 Esc 返回。闲置时不持续渲染；减少动态偏好减弱跟随并关闭缓动，手动关闭动态停止跟随。WebGL 无法初始化时保留参考照片。

音乐区支持六根弦、A S D F G H、空格扫弦及 Open / Em / G / C / D。九个旋钮支持竖直拖动、滚轮、方向键、Shift 精调及双击复位。三个踏板均可旁通，四个预设提供起点。

初始静音，主动弹奏或打开声音后才启动音频，不请求麦克风。6 秒循环记录音高与力度，可叠录；所有层共用当前效果器，并非独立音轨。后台暂停录音和循环、静音输出，返回后不会自动恢复循环。刷新后不保留录音。

## 素材与表达边界

琴型为用户确认的 **BanG Dream! POTBELLY FM Rāna**，琴头是 BanG Dream! 标识。琴颈拾音器 SH-1n 带银色罩；琴桥 SH-16 开放式反斑马，奶油色线圈朝琴颈、黑色朝琴桥。

| 资产 | 来源与用途 |
| --- | --- |
| `qiu-potbelly-stringless.png` → `.webp` | 用户实拍的去弦派生图，1064 × 1478，运行时用于拾音器及五金细节 |
| `qiu-potbelly-bare-body.png` → `.webp` | 同一实拍移除弦和五金的派生图，1064 × 1478，运行时用作琴身底材 |
| `bangdream-potbelly-stringless.png` → `.webp` | 官方正面参考的去弦派生图，1254 × 1254，运行时用于指板及琴头弦路径 |
| `bangdream-potbelly-fm-rana.png` → `.webp` | ESP 官方正面参考，2400 × 2400，运行时用于琴头标记、加载回退和 WebGL 回退 |

PNG 保留为贴图源文件；首页和 Three.js 运行时加载同尺寸的高质量 WebP（quality 95）。四张贴图总量从 4.95 MB 降至 1.05 MB，约减少 79%。

官方来源：[型号页](https://espguitars.co.jp/collaborate/33185/)、[正面图片](https://espguitars.co.jp/wp-content/uploads/2023/11/BanGDream_POTBELLY_FM_Rana_front.png)。官方图片与品牌标识属于各自权利人，不适用仓库代码的 MIT 授权。

原型阶段使用 imagegen 去除实拍中的弦和五金，再以独立几何重建，避免把弦和开关烙在漆面上。本次直接复用已确认贴图。被遮挡木纹是补绘，背面与侧面材质是近似重建，模型不是实物扫描；未找到可核实的匹配官方背面图片，因此没有开放完整 360° 旋转。

音色是拨弦合成与经典踏板灵感，并非实琴采样或原机电路仿真。BD-2 的外观参考 [BOSS 产品页](https://www.boss.info/us/products/bd-2/)。原型音频检查已覆盖输出、旁通、静音、最大增益、回声尾音和九个旋钮；接入时沿用音频算法，仅调整模块路径。

## 发布边界

Astro `site`、canonical、语言 alternate、robots 与 sitemap 指向 `https://me.qiu.works`。这次只是源码接入，**未发布、未绑定 Cloudflare 域名**。

发布时将 `me.qiu.works` 绑定到根站 Pages 项目，确认 TLS 与中英文路径；保留旧 `room.qiu.works` 可访问或配置保留路径/查询参数的跳转，避免 QStudio 和外部旧链接失效。主站 QStudio 当前分支的未推送修改不包含在本次个人站分支中。

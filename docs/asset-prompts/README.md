# Asset Prompts · 场景资产再生成提示词

本目录保存首页房间场景图的**再生成提示词**。当前首页使用低噪点写实摄影资产
（`src/assets/home/practice-room-*-{day,night}.png`）；界画语言由页面的留白、墨阶、显影与
边缘融合承担，不再把纸纹或全局噪点烘焙进房间材质。

## 使用方式

1. 用支持图像生成的模型（如 Gemini image / GPT-image）以对应 md 文件中的 Prompt 生成。
2. 每个视角必须生成严格配准的 day/night 对；画幅必须与现网一致，否则热点和代码 UI 会错位。
3. 生成后按「Checklist」逐项过审，以版本化文件写入 `src/assets/`，再更新引用并 `npm run build`。
4. 替换后跑 `docs/qa/visual-checklist.md` 的首页双主题条目。

## 通用约束（所有提示词共享）

- 同一房间：overview / writing / projects 必须像同一真实空间里的推镜头。
- 每组 day/night 为同一机位、同一构图、同一物件与接触关系，只改时间、灯态、曝光和对应阴影。
- 墙面为雪白哑光漆；木、金属、织物、皮革、橡胶分别呈现真实材质。
- 禁止颗粒、纸纹、浮雕虫纹或同一种生成纹理跨越不同材质；按低 ISO 实拍质量验收。
- 全景右工作台的 Supro、金色与蓝色单块、线材位置为构图锁；单块必须平放并服从桌面支撑平面。
- 图片不内嵌题字、UI、装饰印章或水印；视觉文字由代码叠加。

## 文件

- `home-room-ink-overview.md` — 昼夜全景
- `home-room-ink-writing.md` — 书桌近景（点击"写作"热点）
- `home-room-ink-projects.md` — 工作区近景（点击"作品"热点）
- `home-room-ink-curtain.md` — 幕布近景（点击"生活"热点）

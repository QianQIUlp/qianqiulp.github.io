# Asset Prompts · 场景资产再生成提示词

本目录保存首页房间场景图的**再生成提示词**。当前线上资产为写实渲染图
（`src/assets/`），视觉契约 `docs/uiux/ink-and-light-study.md` 要求未来重绘时
统一到「界画四原则」：统一纸底、统一光源（左上）、边缘墨化、墨分五色 + 朱砂唯一彩色。

## 使用方式

1. 用支持图像生成的模型（如 Gemini image / GPT-image）以对应 md 文件中的 Prompt 生成。
2. 画幅必须与现网一致（见各文件「Canvas」），否则热点坐标与构图锁会错位。
3. 生成后按「Checklist」逐项过审，再替换 `src/assets/` 同名文件并 `npm run build` 验证。
4. 替换后跑 `docs/qa/visual-checklist.md` 的首页双主题条目。

## 通用约束（所有提示词共享）

- 同一房间、同一机位、同一构图：overview / writing / projects / curtain 四张必须像
  同一空间里推镜头，而不是四个房间。
- 光源唯一，来自画面左上（窗 + 台灯），所有投影向右下。
- 墨色五色层次（焦浓重淡清），唯一彩色为朱砂（#a2402c），只允许出现在极小面积
  （一枚印章、一件红色物件）。
- 边缘不做硬切割：画面四边以晕影/渐隐融入底色，便于 CSS 叠加纸底与晕影。
- 人物始终是背影或侧影，不出现正脸；吉他（樱桃红电吉他）是朱砂在场景中
  唯一被允许的大面积例外，但饱和度需压暗。

## 文件

- `home-room-ink-overview.md` — 全景（开场：人 + 吉他 + 房间全貌）
- `home-room-ink-writing.md` — 书桌近景（点击"写作"热点）
- `home-room-ink-projects.md` — 工作区近景（点击"作品"热点）
- `home-room-ink-curtain.md` — 幕布近景（点击"生活"热点）

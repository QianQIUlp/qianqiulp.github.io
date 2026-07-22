# Visual QA Checklist

Use this checklist before merging visible site changes. Test the built site when possible:

```sh
npm run build
npm run preview
```

Core viewports:

- Desktop: 1440px or wider
- Tablet: 768px
- Mobile: 375px

Always check light (昼宣) and dark (夜墨) mode for changed routes.

## 墨光书房设计系统

改动触及色彩/字体/印章/动效/房间场景时，除下方路由条目外逐项过本节
（首页创作原点见 `docs/uiux/homepage-art-direction.md`，实现契约见 `docs/uiux/ink-and-light-study.md`）：

- 双主题为同一构图：昼宣与夜墨摄影资产之间没有元素消失、移位、悬浮、穿插或换布局，
  只有时间、灯态、曝光和对应阴影变化；切换时不露出另一主题或底色。
- 墨色五色承担层级：标题/正文/次要/辅助/装饰分别落在焦浓重淡清，未出现新的"第六级灰"。
- 朱砂只出现在落款语义位：卷题标签、题跋侧签、朱批侧注；界面不再显示印章；
  普通按钮、链接、报错均未使用朱砂。
- 全站只有一个左上光源：新增投影向右下，悬停反馈为"灯亮"（夜墨 glow）或"墨淡"（昼宣纸光池）。
- 书体 QiuBrush 仅出现在空文章封面落款和目录题字；首页「我是千秋。」与项目页「作品与探索」
  使用同一 `var(--font-serif)`、700 标题字，组件标题、导航和正文均为正常字体。
- 全站界面不显示印章；页眉保留正常文字品牌，文章卡片空封面落款可用笔字但不伪装成章。
- `data-reveal` 显影为唯一入场动效：轻上移 + 虚化收敛，无第二种入场方式。
- 主题晕染转场：从按钮位置圆形收拢 + 雾化，连点不残留遮罩；
  `prefers-reduced-motion` 下即时切换。
- 氛围层（墨絮/花瓣）不挡内容、数量少、`prefers-reduced-motion` 下静止。
- 场景图边缘墨化融入纸底，无硬边矩形"贴画感"。
- 房间墙面保持雪白哑光漆的物理质感；墙、木、金属、织物、皮革与橡胶没有共享的颗粒、
  浮雕虫纹、纸纹或重复生成噪点。

## Homepage

- 第一眼只有千秋题字、吉他和极少的生活气息承担视觉焦点；完整导航、书桌、工作台和内容数量没有同时抢出来。
- 暗处仍让人想靠近：桌面端停留/聚焦会让对应区域松开墨影，选择任一物件后其余房间入口才逐渐交出。
- 移动端初见只显吉他/生活入口；从近景回到房间后才出现文章与作品入口。
- 渐进发现没有被做成步骤条、进度状态、说明面板或显眼的 onboarding 按钮。
- 首页文案没有替构图解释人格；视觉隐喻先形成感受，真实文章与项目只在近景中出现。
- Header brand, nav, and theme toggle fit without wrapping awkwardly.
- The first viewport reads as Qiu's personal rehearsal room rather than a product landing page or metrics dashboard.
- The room, title, three hotspots, and guitar identity remain legible without layout-breaking overlap at desktop, tablet, and mobile widths.
- The guitar keeps the approved headstock, relic body, pickup layout, stand, fret-marker sequence, and the 11–13 fret `m` marker.
- Initial load keeps the room and guitar at one stable matrix; there is no large-to-small entrance animation or late proportion shift.
- Article and project hotspots keep the visitor on `/`, update only the hash, and finish with real article/project data aligned to the physical monitor or drafting mat.
- At an early, middle, and late transition sample, the room, curtain, guitar, focus plate, and exposure move at different rates without a hard cut or a frozen loading interval.
- Scene rows and “all” links still navigate to the existing article and project routes normally.
- Guitar & Life focuses the guitar and reveals the life note in place; Escape and “回到房间” restore the overview.
- At 375px the hotspots form a usable bottom dock after discovery, the title stays readable, and no page-level horizontal scroll appears.
- At 768px portrait, focus content stays fully inside the viewport rather than being cropped with the 16:9 scene.
- 全景与近景均从当前 1672 × 941 母图生成响应式衍生图；宽屏无放大造成的明显糊化、噪点或接缝。
- 昼夜全景、电脑近景和工作台近景均使用对应主题资产；电脑 UI 落在显示器内；三个项目严格落在
  作者标注的左上桌面、左下机架、右下桌沿三个区域，没有擅自重组、倾斜或通栏 HUD。
- 液态玻璃只出现在三张项目卡；昼夜按钮、返回按钮和分区标题是清晰的普通控件。窄屏工程近景以
  Supro 箱头为主要背景，三卡轻微错宽，文字不截断且仍能辨认木桌和箱头；卡后背景保持清晰，
  没有高半径模糊造成的毛玻璃观感。
- With JavaScript disabled, `#writing-desk`, `#project-workbench`, and `#life-corner` expose their content and the return link works without script.

## Blog Index

- Archive heading and summary counts align cleanly at each viewport.
- Post cards keep date, cover, title, description, tags, and cue readable.
- Covers and fallback media use a consistent aspect ratio.
- Long titles and descriptions wrap without overlapping neighboring columns.
- Card hover, active, and focus states are visible but do not shift layout.

## Article Pages

- Test every post at least once, including long titles, image-heavy posts, posts without a cover image, and a post without section headings.
- Editorial masthead keeps title, description, date, tags, and the un-tinted real cover readable in both themes.
- Fallback article masthead looks intentional when no cover image exists.
- Body measure, font size, line height, headings, blockquotes, lists, tables, and code blocks are comfortable to read.
- Every article exposes the same TOC control at the viewport's left-middle; one click opens it and the next click closes it.
- The drawer overlays without reflowing the article or causing page-level horizontal scroll, and remains usable at 375px.
- TOC links scroll to the correct headings, headings are not hidden behind the sticky header, and the active entry follows reading position.
- A post without section headings still has the fallback entry 「文章开头」 and that link returns to the article masthead.
- Inline images have useful alt text, preserve aspect ratio, and do not cause visible layout jumps.
- Long code blocks and tables scroll inside their own containers instead of causing page-level horizontal scroll.
- License and source links are present and readable when configured.

## Projects Page

- Hero copy and note remain balanced at desktop, 768px, and 375px.
- Featured project dossiers keep ordinal, title, repo slug, links, summary, case study, boundaries, and tags readable.
- External project links are clearly focusable and tappable.
- Secondary traces and playbook items wrap long titles without overlap.
- Project names, URLs, and positioning match `src/data/projects.ts` and project briefs.

## Dark Mode (夜墨 / 昼宣)

- Toggle updates the visible state and persists across reloads.
- 转场为晕染收拢而非硬切；切换后 header、热点、题字在两态下均可读。
- Page background, surfaces, borders, text, links, tags, and code blocks keep adequate contrast.
- 昼宣态场景被宣纸罩与滤镜洗亮，题字与热点坐在纸光池内，无"直接反色"感。
- Images and cover scrims do not make white text unreadable.
- Native browser color scheme follows the active theme.
- Directional paper and note shadows remain visible without turning into bright halos or crushed black blocks.

## Motion And Progressive Enhancement

- Homepage camera transitions complete once, do not trap focus, and settle into the selected in-room state in about 2.4 seconds.
- With `prefers-reduced-motion: reduce`, the selected in-room state and its content appear immediately without camera displacement, fading, progress motion, or smooth scrolling.
- Below-the-fold reveal items enter once as 显影 (slight rise + blur settling), with no more than three stagger steps.
- Hero copy and article body are readable immediately and never wait for scroll animation.
- With `prefers-reduced-motion: reduce`, reveal transitions, hover translation, 氛围层, and 主题晕染 are disabled or instant.
- With JavaScript disabled, every `data-reveal` element remains visible and usable.

## Mobile Widths

- No page-level horizontal scrolling at 768px or 375px.
- Sticky header does not cover content or anchor targets.
- Tap targets are comfortable, especially nav, theme toggle, cards, project links, and contact links.
- Main navigation and theme controls provide at least a 44 × 44px interaction area on narrow screens.
- Text stays inside buttons, pills, cards, and article containers.
- Multi-column layouts collapse without awkward gaps or clipped content.

## Keyboard And Focus

- First Tab reveals the skip link and Enter moves focus to main content.
- Tab order follows the visual reading order through nav, theme toggle, content links, and footer links.
- Every interactive element has a visible `:focus-visible` state.
- Theme toggle works with Enter and Space and updates `aria-pressed`.
- Links use anchors for navigation; buttons are used only for actions.

## External Links

- External links open the intended destination.
- Links using `target="_blank"` include `rel="noopener noreferrer"`.
- Source, license, contact, GitHub, Bilibili, and project links are not broken.
- Internal route links return 200 and keep trailing slash conventions.

## Image And Layout Stability

- Above-the-fold images have stable dimensions and do not visibly shift text after load.
- Below-the-fold images lazy-load without changing reserved layout space.
- Article images, post cards, and featured media keep consistent aspect ratios.
- Font loading does not create noticeable title, TOC, or hero shifts.
- Run one slow-refresh pass on mobile width to catch late shifts after fonts and images load.

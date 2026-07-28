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
- Short mobile: 375 × 667px

Always check **Light** and **Dark** mode for changed routes.

## Modern Room Design System

改动触及色彩、字体、动效或房间场景时，除下方路由条目外逐项过本节
（首页创作原点见 `docs/uiux/homepage-art-direction.md`，实现契约见 `docs/uiux/ink-and-light-study.md`）：

- 双主题为同一构图：Light 与 Dark 摄影资产之间没有元素消失、移位、悬浮、穿插或换布局，
  只有时间、灯态、曝光和对应阴影变化；切换时不露出另一主题或底色。
- 标题、正文、次要信息和分隔通过字号、字重、对比与留白形成清楚层级，没有靠新增底板或装饰标签堆叠。
- 红色只作少量 accent；普通按钮、链接与大段文字没有整体染红，也没有附加朱砂、印章或批注语义。
- 房间主光、物件接触阴影和 UI 阴影方向一致，没有互相矛盾的漂浮效果。
- 首页姓名、组件标题、导航、目录和正文均使用正常可读字体；可见界面没有 QiuBrush、书法字或印章。
- 文案与 `f6ed8fd` 一致，唯一例外是：删除「展开卷宗」及英文对应项；博客计数改为「篇 / 标签」；
  删除生成的「题跋」；删除可见的「授权协议 · 文末记」区块。主题按钮仍是「昼 / 夜」与 `Day / Night`。
- `data-reveal` 若保留，只做轻微、短暂的淡入/位移，首屏和正文不等待动画才可读。
- 主题转场短而稳定，连点不残留遮罩；文案和实现说明不把它包装成传统媒介效果；
  `prefers-reduced-motion` 下即时切换。
- DOM 和截图中没有花瓣、墨絮、漂浮尘点或替代性的纯装饰粒子。
- 场景图使用普通渐变/遮罩自然融入布局，没有宣纸、泼墨或古画边缘效果。
- 房间墙面保持雪白哑光漆的物理质感；墙、木、金属、织物、皮革与橡胶没有共享的颗粒、
  浮雕虫纹、纸纹或重复生成噪点。

## Homepage

- 第一眼只有千秋的姓名/简短介绍、吉他和极少的生活气息承担视觉焦点；完整导航、书桌、工作台和内容数量没有同时抢出来。
- 初始背景在 Light/Dark 两态下由文章与作品左右两块遮光区域完整覆盖，只留下人物介绍、位于遮光层上方的吉他与必要控件；
  桌面端停留/聚焦会让文章或作品所属的整块黑幕缓慢淡去，互不串光，没有圆形聚光灯或瞬时跳亮。
- 从近景或具体文章返回后，所有已访问区域累计保持明亮；依次访问文章与作品后黑幕完全消失，
  刷新或跨文章返回仍在当前会话内保留累计状态。
- 移动端首次进入时底部 dock 已完整、稳定显示文章/作品/生活三个入口，无需先进入生活再返回。
- 渐进发现没有被做成步骤条、进度状态、说明面板或显眼的 onboarding 按钮。
- 首页文案逐字保持 `f6ed8fd` 基线，仅删除「展开卷宗」及英文对应项；真实文章与项目只在近景中出现。
- 首页没有书法字、印章、宣纸噪点、花瓣、墨絮或其他装饰粒子；文字只按上方四项白名单变化。
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
- At exactly 375 × 667px, the three project devices retain natural vertical breathing room; no title, status, control,
  footswitch, return control, or bottom dock is clipped or overlapped.
- At 768px portrait, focus content stays fully inside the viewport rather than being cropped with the 16:9 scene.
- 全景与近景均从当前 1672 × 941 母图生成响应式衍生图；宽屏无放大造成的明显糊化、噪点或接缝。
- Light/Dark 全景、电脑近景和工作台近景均使用对应主题资产；电脑 UI 落在显示器内；三个项目严格落在
  作者标注的左上桌面、左下机架、右下桌沿三个区域，没有擅自重组、倾斜或通栏 HUD。
- 三张项目入口仍位于作者标注的左上、左下、右下位置，并且结构一眼可区分：MealCircuit 是深色木盒、
  左侧三枚纵列实木旋钮、中部放大的现代 maker-style 设备铭牌和金属彩钉；Crewlight 是放大的皮革箱头、奶油六旋钮面板、
  青灯、蜂窝网罩和彩钉；其奶油面板约止于机身上方三分之一，网罩占至少六成。项目名、旋钮标签、状态和入口
  必须在 1440px 全场截图的正常观看距离下直接辨认，不得用局部放大图验收；项目名约不低于 24px、控制标签
  约不低于 11px、次要状态约不低于 9px；
  Docker-Hadoop 是蓝色双层机箱、顶部信号栏、纵向金色旋钮和大黑踏板，未退化成同模板换色。
  所有旋钮可由拖动/点击/方向键调节，灯可切换，脚踏按下有位移并进入正确项目；窄屏标题/状态/入口
  不截断、每个主要触控区至少 44 × 44px 且无水平滚动。
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
- Article `license` frontmatter remains intact, while the visible 「授权协议 · 文末记」 block is not rendered.

## Projects Page

- Hero copy and note remain balanced at desktop, 768px, and 375px.
- Featured project dossiers keep ordinal, title, repo slug, links, summary, case study, boundaries, and tags readable.
- External project links are clearly focusable and tappable.
- Secondary traces and playbook items wrap long titles without overlap.
- Project names, URLs, and positioning match `src/data/projects.ts` and project briefs.

## Light / Dark Themes

- Toggle updates the visible state and persists across reloads.
- 转场平稳且不残留遮罩；切换后 header、热点、人物介绍在两态下均可读。
- Page background, surfaces, borders, text, links, tags, and code blocks keep adequate contrast.
- 首页 Light 与 Dark 共用舞台、人物介绍、热点和控件材质，只切换严格配准的白天/夜晚背景图；
  Light 首页没有宣纸纹理、独立浅色浮层或另一套前景滤镜。
- Images and cover scrims do not make white text unreadable.
- Native browser color scheme follows the active theme.
- Directional surface and note shadows remain visible without turning into bright halos or crushed black blocks.

## Motion And Progressive Enhancement

- Homepage camera transitions complete once, do not trap focus, and settle into the selected in-room state in about 2.4 seconds.
- With `prefers-reduced-motion: reduce`, the selected in-room state and its content appear immediately without camera displacement, fading, progress motion, or smooth scrolling.
- Below-the-fold reveal items may use one restrained slight rise/fade, with no more than three stagger steps.
- Hero copy and article body are readable immediately and never wait for scroll animation.
- With `prefers-reduced-motion: reduce`, reveal transitions, hover translation, and theme transitions are disabled or instant.
- With JavaScript disabled, every `data-reveal` element remains visible and usable.

## Mobile Widths

- No page-level horizontal scrolling at 768px, 375px, or 375 × 667px.
- Sticky header does not cover content or anchor targets.
- Tap targets are comfortable, especially nav, theme toggle, cards, project links, and contact links.
- Main navigation, theme controls, return controls, project controls and footswitch links provide at least a 44 × 44px interaction area on narrow screens.
- Text stays inside buttons, pills, cards, and article containers.
- Multi-column layouts collapse without awkward gaps or clipped content.
- At 375 × 667px, content remains reachable without relying on overflow hidden or overlap beneath fixed controls.

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

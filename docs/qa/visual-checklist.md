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
（契约全文见 `docs/uiux/ink-and-light-study.md`）：

- 双主题为同一构图：昼宣与夜墨之间没有元素消失、移位或换布局，只有明暗浓淡变化。
- 墨色五色承担层级：标题/正文/次要/辅助/装饰分别落在焦浓重淡清，未出现新的"第六级灰"。
- 朱砂只出现在落款语义位：页眉/页脚印章、文章落款、卷题标签、题跋侧签、朱批侧注；
  普通按钮、链接、报错均未使用朱砂。
- 全站只有一个左上光源：新增投影向右下，悬停反馈为"灯亮"（夜墨 glow）或"墨淡"（昼宣纸光池）。
- 书体 QiuBrush 仅出现在契约允许的四处文字；组件标题、导航、正文均未误用。
- 每屏至多一枚印章；文章卡片空封面落款用笔字而非印章。
- `data-reveal` 显影为唯一入场动效：轻上移 + 虚化收敛，无第二种入场方式。
- 主题晕染转场：从按钮位置圆形收拢 + 雾化，连点不残留遮罩；
  `prefers-reduced-motion` 下即时切换。
- 氛围层（墨絮/花瓣）不挡内容、数量少、`prefers-reduced-motion` 下静止。
- 场景图边缘墨化融入纸底，无硬边矩形"贴画感"。

## Homepage

- Header brand, nav, and theme toggle fit without wrapping awkwardly.
- The first viewport reads as Qiu's personal rehearsal room rather than a product landing page or metrics dashboard.
- The room, title, three hotspots, and guitar identity remain legible without layout-breaking overlap at desktop, tablet, and mobile widths.
- The guitar keeps the approved headstock, relic body, pickup layout, stand, fret-marker sequence, and the 11–13 fret `m` marker.
- Initial load keeps the room and guitar at one stable matrix; there is no large-to-small entrance animation or late proportion shift.
- Article and project hotspots keep the visitor on `/`, update only the hash, and finish with real article/project data aligned to the physical monitor or drafting mat.
- At an early, middle, and late transition sample, the room, curtain, guitar, focus plate, and exposure move at different rates without a hard cut or a frozen loading interval.
- Scene rows and “all” links still navigate to the existing article and project routes normally.
- Guitar & Life focuses the guitar and reveals the life note in place; Escape and “回到房间” restore the overview.
- At 375px the hotspots form a usable bottom dock, the title stays readable, and no page-level horizontal scroll appears.
- At 768px portrait, focus content stays fully inside the viewport rather than being cropped with the 16:9 scene.
- At a 3840 × 2160 viewport, the overview plate resolves to a 3840 × 2160 source; smaller viewports receive responsive derivatives.
- With JavaScript disabled, `#writing-desk`, `#project-workbench`, and `#life-corner` expose their content and the return link works without script.

## Blog Index

- Archive heading and summary counts align cleanly at each viewport.
- Post cards keep date, cover, title, description, tags, and cue readable.
- Covers and fallback media use a consistent aspect ratio.
- Long titles and descriptions wrap without overlapping neighboring columns.
- Card hover, active, and focus states are visible but do not shift layout.

## Article Pages

- Test several posts, including long titles, TOC pages, image-heavy posts, and any post without a cover image.
- Editorial masthead keeps title, description, date, tags, and the un-tinted real cover readable in both themes.
- Fallback article masthead looks intentional when no cover image exists.
- Body measure, font size, line height, headings, blockquotes, lists, tables, and code blocks are comfortable to read.
- TOC links scroll to the correct headings and headings are not hidden behind the sticky header.
- On wide screens, TOC remains usable as a sticky left rail; at tablet/mobile widths it returns to normal document flow after the intro.
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

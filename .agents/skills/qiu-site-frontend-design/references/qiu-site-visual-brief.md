# Qiu Site Visual Brief

## Identity

Qiu's site is 墨光书房 — a warm Chinese study room for slow reading: ink-dark at night with
one lamp, xuan-paper bright by day. Personal, calm, literate, and practical. It supports long
Chinese text, technical notes, reflective essays, project browsing, and contact discovery.

The governing contract is `docs/uiux/ink-and-light-study.md`; this brief is the quick
orientation summary.

## Design Intent

- 界画四原则：统一纸底、统一左上光源、边缘墨化、墨分五色（焦浓重淡清）。
- 昼宣 / 夜墨双主题，同一构图，只变明暗浓淡；切换为晕染收拢转场。
- 朱砂 #a2402c 是唯一彩色，只盖在"落款"语义位：印章、卷题、题跋侧签、朱批。
- 书体 QiuBrush 是签名，只出现在：首页题字、空封面落款「千秋」、印章旁落款、目录题字。
- 「显影」（data-reveal）是唯一入场动效；氛围层（墨絮/花瓣）是空气。
- 首页是一间可探索的房间：全景开场 → 热点 → 近景 → 回到房间；
  内页是乌丝栏卷轴（双墨线）、题跋、落款。
- Lead with writing and reading, not marketing; the interface stays quiet so content carries the page.

## Avoid

- Generic AI SaaS gradients; second "paper"/surface colors; second accent hues.
- Cinnabar on ordinary buttons/links/errors; brush type on component titles or body text.
- Decorative cards inside cards; hard-edged "sticker" images; second entrance animations.
- Elements that exist in only one theme; shadows from any direction but upper-left light.
- Excessive emoji decoration; landing-page hero patterns that hide actual content.
- Adding frontend dependencies to solve static CSS problems.

## Preferred Review Bias

- Prefer small improvements to tokens, spacing, type scale, focus states, and responsive behavior.
- Judge hierarchy by ink grades (焦浓重淡清) before suggesting any new color.
- Preserve existing content schema and routes.
- Document low-severity aesthetic preferences instead of turning them into mandatory fixes.
- When changing anything the contract governs, update the contract and the skill together.

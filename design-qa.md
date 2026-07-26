# Homepage Project Pedals · Design QA

Earlier homepage, workbench and article QA reports are preserved in
[`docs/qa/design-qa-history.md`](./docs/qa/design-qa-history.md).

## Comparison target

- Source visual truth:
  - `/home/qiu/.codex/attachments/2ec32756-5b5e-49be-8281-281cbcaef7a4/codex-clipboard-fd52c99d-1944-437c-bbb8-13d38d382226.png` — 1400 × 850 horizontal Blue Driver project prototype.
  - `/home/qiu/.codex/attachments/74603505-2536-4d6f-a796-268b3672f74b/codex-clipboard-668377f5-b891-4935-993f-86c6d752e258.png` — 183 × 331 Halfman OD wood/marker/stomp reference.
  - `/home/qiu/.codex/attachments/ac3d3d63-ea53-4673-a985-0106d2d42725/codex-clipboard-6f109f32-2670-4cc2-99e3-05b1ab334955.png` — 790 × 373 leather amplifier-head reference.
- Implementation evidence:
  - `/tmp/qiu-pedal-final-desktop-light.png` — 1440 × 900, DPR 1, light theme, `/#project-workbench`.
  - `/tmp/qiu-pedal-final-desktop-dark.png` — 1440 × 900, DPR 1, dark theme, `/#project-workbench`.
  - `/tmp/qiu-pedal-final-tablet-light.png` — 768 × 1024, DPR 1, light theme.
  - `/tmp/qiu-pedal-final-mobile-light.png` — 390 × 844, DPR 1, light theme.
  - `/tmp/qiu-pedal-design-qa-comparison-final.png` — reference/implementation focused comparisons in one 1585 × 1119 image.
- State: JavaScript enabled; project focus view settled; reduced motion enabled to compare stable frames; MealCircuit and Crewlight lamps powered in desktop captures.
- Density normalization: all browser captures use `deviceScaleFactor: 1`. The three source images have different native densities and aspect ratios, so the full scene was judged at native viewport size and each device was separately normalized inside the combined comparison board.

## Findings

No actionable P0/P1/P2 mismatch remains.

- Typography: Docker-Hadoop keeps the large condensed orange hierarchy from the target. MealCircuit uses the loaded `Permanent Marker` face for its control labels and nameplate, while Crewlight uses compact amplifier-panel labels. No title clips at 1440, 768, or 390 px.
- Spacing and layout: all three devices remain at the authored left-top, left-bottom, and right-bottom scene positions. Their internal layouts are structurally distinct. Mobile stacks all three inside the available workbench surface with no vertical or horizontal overflow.
- Colors and tokens: the wood/purple, leather/cream/copper, and BD-2 blue/orange palettes follow the supplied references and remain confined to physical scene objects. Light/dark themes keep the same device geometry.
- Image and material fidelity: brand photography is used only as reference, per the explicit request to reconstruct the visible elements in HTML/CSS. Wood rings, marker lettering, leather seams, cream panel, circular grille, brushed blue metal, jacks, screws and three different stomp mechanisms are all represented.
- Copy and content: control labels map to confirmed project facts (`CONTEXT`, `SCHEMA`, `HISTORY`; `AGENTS`, `DOCTOR`, `HOOKS`, `INGEST`, `DESKTOP`, `CLI`; `NODES`, `HDFS`, `YARN`). Status and project links come from the repository project data.
- Interaction and accessibility: pointer drag changed a wood control from 76 to 96; ArrowUp changed an amplifier control from 42 to 47; all three lamp buttons update `aria-pressed`; metal/black stomps enter the correct project anchors and expose a pressed displacement. Mobile lamp and knob targets are at least 44 × 44 px; stomp targets are larger. Browser console reported no errors.

## Intentional adaptations

- The Halfman source is portrait, while the requested homepage object is horizontal. Its triangular knob relationship, wood caps, dark ridged face, marker lettering, red lamp and metal stomp were preserved while the nameplate/stomp moved to the right.
- The amplifier source has seven audio controls. Crewlight uses six truthful project controls so the UI does not invent a seventh project fact; the leather frame, cream panel, cyan power lamp and grille remain faithful.
- The project devices sit on the authored room photograph rather than the standalone dark prototype stage.

## Comparison history

1. Earlier implementation finding — P1: all three devices shared one Blue Driver-shaped DOM and differed mainly by color. Fix: introduced separate wood, amplifier-head and BD-2 component structures with independent control/stomp systems.
2. Earlier implementation finding — P2: serials wrapped vertically and Docker-Hadoop clipped against the footswitch. Fix: reset inherited legacy card rules, gave serials dedicated no-wrap layout, and restored the target's three-line Docker/Hadoop/Cluster title rhythm.
3. Earlier implementation finding — P2: small mobile amplifier controls were narrower than the required target. Fix: widened the amplifier control rail and set every interactive knob/lamp target to at least 44 px in both dimensions.
4. Post-fix evidence — `/tmp/qiu-pedal-design-qa-comparison-final.png`, desktop light/dark, tablet, and 390 px mobile captures show no remaining P0/P1/P2 mismatch.

## Follow-up polish

- P3: the exact handwritten glyph outline depends on Google Fonts availability; the fallback stack remains legible but is not pixel-identical to Permanent Marker.

## Implementation checklist

- [x] Three distinct structures, not palette variants.
- [x] Knob drag/click/keyboard interaction.
- [x] Independent lamp toggles and visible stomp feedback.
- [x] Correct internal project links.
- [x] Light/dark, 1440 px, 768 px and 390 px screenshots.
- [x] No console errors or page-level overflow.
- [x] Production build passes.

final result: passed

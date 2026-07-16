# Interactive Room Design QA

## Evidence

- Source design: `docs/uiux/references/interactive-room-option-2.png`
- Implementation overview: `docs/qa/screenshots/interactive-room/home-overview-1440.webp`
- Comparison viewport and state: 1440 × 1024, homepage overview
- Full-view combined comparison: `docs/qa/screenshots/interactive-room/reference-vs-home-1440.webp`
- Guitar focus state: `docs/qa/screenshots/interactive-room/home-life-focus-1440.webp`
- Focused headstock and fretboard evidence: `docs/qa/screenshots/interactive-room/guitar-headstock-fretboard-detail.webp`
- Mobile evidence: `docs/qa/screenshots/interactive-room/home-mobile-375.webp`

## Comparison history

1. The first browser pass exposed a P1 image-layout mismatch: the guitar retained its intrinsic pixel height after its CSS width changed, stretching the asset and cropping the headstock. Added `height: auto`, recalibrated the width and bottom position, and repeated the 1440 × 1024 comparison.
2. The second pass matched the overview composition, but the Guitar & Life camera state cropped the headstock. Reduced that state's world scale and moved its transform origin so the full instrument remains visible while the room still shifts toward it.
3. The final comparison confirmed that the selected room composition, desk/workbench hotspots, warm low-key palette, full relic guitar silhouette, and title hierarchy remain aligned. The shared site header and the small `Personal room / Qiu` line are intentional product-system additions.

## Final findings

- Fidelity: no unresolved P0, P1, or P2 mismatch. The production guitar intentionally supersedes the guitar in the original option image because the later user reference is authoritative.
- Guitar accuracy: the approved headstock and relic body are visible; ordinary position dots appear only at 3/5/7/9/15/17/19/21, while the 12th-fret position uses the independent `m` mark spanning frets 11–13.
- Image quality: the guitar uses a transparent raster asset with no visible green-screen halo at overview or focus scale. Astro emits responsive WebP variants with stable intrinsic dimensions.
- Layout: the scene has no page-level overflow at 1440, 768, or 375 pixels. The mobile hotspot dock remains inside the viewport with 42-pixel targets.
- Behavior: Article and Projects complete the camera transition and reach `/blog/` and `/projects/`; Guitar & Life opens in place; Escape and “回到房间” restore the overview.
- Progressive enhancement: with JavaScript disabled, route links remain native and `#life-note` reveals the life copy. With reduced motion, transitions are disabled and route navigation is immediate.
- Accessibility: the skip link moves focus to `main`, the life note receives focus when opened, the landmarks and links are semantic, focus rings remain visible, and decorative room imagery is excluded from the accessibility tree.
- Theme: the shared theme control updates `data-theme` and `aria-pressed`; the immersive homepage deliberately retains the same dark room art in both theme modes.
- Runtime: browser checks reported no console or page errors.

final result: passed

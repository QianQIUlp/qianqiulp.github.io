# QStudio fonts

Independent WOFF2 subsets for QStudio's `/` and `/zh/` pages. All families are
licensed under SIL OFL 1.1. Each generated WOFF2 embeds the full corresponding
copyright and license in its name table; complete licenses also accompany these
source assets. Internal family names use QStudio names, including the modified
Source Sans subset whose upstream license reserves the name "Source".

Official sources are pinned to Google Fonts commit
[`23e54b51ddffbc7713c583748e3bd86f62b1fa4a`](https://github.com/google/fonts/tree/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl).

| Family | Source under `ofl/` | Local source filename | Generated face |
| --- | --- | --- | --- |
| Source Sans 3 | `sourcesans3/SourceSans3[wght].ttf` | `source-sans-3.ttf` | Normal, variable 400–900 |
| Source Serif 4 | `sourceserif4/SourceSerif4[opsz,wght].ttf` | `source-serif-4.ttf` | Normal, 400, fixed optical size 20 |
| Source Serif 4 Italic | `sourceserif4/SourceSerif4-Italic[opsz,wght].ttf` | `source-serif-4-italic.ttf` | Italic, 400, fixed optical size 20 |
| Cousine Bold | `cousine/Cousine-Bold.ttf` | `cousine-bold.ttf` | Normal, 700 |
| Noto Sans SC | `notosanssc/NotoSansSC[wght].ttf` | `noto-sans-sc.ttf` | Normal, variable 400–900 |
| Noto Serif SC | `notoserifsc/NotoSerifSC[wght].ttf` | `noto-serif-sc.ttf` | Normal, 400 |

The sans family supplies the page's 600/700/750/800/850 weights without synthetic
bolding. Serif titles and italic accents retain their editorial role, with fixed
optical sizing across browsers. Cousine's bold face supplies the 700-weight micro
labels. Chinese coverage is derived from QStudio's own content, independent of the
personal site's subsets.

To regenerate after editing QStudio text, download the pinned TTFs above and each
family's `OFL.txt` into a temporary directory. Rename the licenses to
`source-sans-3-OFL.txt`, `source-serif-4-OFL.txt`, `cousine-OFL.txt`,
`noto-sans-sc-OFL.txt`, and `noto-serif-sc-OFL.txt`. Run
`python scripts/subset-qstudio-fonts.py <source-directory>` with `fonttools` and
`brotli` available. The script scans QStudio's Astro, HTML, TypeScript and JavaScript
sources, decodes HTML entities, and preserves ASCII for live labels. It verifies
ASCII and CJK coverage and reports sizes. No font tooling is needed to build or
serve either site.

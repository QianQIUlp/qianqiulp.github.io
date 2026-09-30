"""Regenerate QStudio WOFF2 assets with fonttools + brotli.

Pass the source directory described in developer/src/assets/fonts/README.md.
This manual asset task is independent of the website build.
"""
from html import unescape
from pathlib import Path
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1]
sources = Path(sys.argv[1])
output = root / "developer/src/assets/fonts"
output.mkdir(parents=True, exist_ok=True)
files = [path for path in (root / "developer/src").rglob("*")
         if path.suffix in {".astro", ".html", ".ts", ".js"}]
characters = set(unescape("".join(path.read_text(encoding="utf-8") for path in files)))
cjk = {c for c in characters if 0x3000 <= ord(c) <= 0x9FFF or 0xFF00 <= ord(c) <= 0xFFEF}
latin = {c for c in characters if 0x20 <= ord(c) < 0x3000}
latin.update(chr(n) for n in range(0x20, 0x7F))  # Live percentages and capture labels.


def save(source, target, text, license_family, family, axes=None, style="Regular"):
    font = TTFont(sources / source)
    options = subset.Options()
    options.flavor = "woff2"
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text="".join(sorted(text)))
    subsetter.subset(font)
    if axes is not None:
        font = instantiateVariableFont(font, axes, inplace=True)
    # Source Sans reserves "Source"; subsets use independent internal names.
    for name_id, value in {
        1: family, 2: style, 3: f"QStudio;{family};{style}",
        4: f"{family} {style}", 6: f"{family.replace(' ', '')}-{style}",
        16: family, 17: style, 25: family.replace(" ", ""),
    }.items():
        font["name"].setName(value, name_id, 3, 1, 0x409)
    license_text = (sources / f"{license_family}-OFL.txt").read_text(encoding="utf-8")
    font["name"].setName(license_text, 13, 3, 1, 0x409)
    font["name"].setName("https://openfontlicense.org", 14, 3, 1, 0x409)
    font.flavor = "woff2"
    font.save(output / target)
    return font


sans = save("source-sans-3.ttf", "source-sans-3-latin.woff2", latin,
            "source-sans-3", "QStudio Sans", {"wght": (400, 900)})
save("source-serif-4.ttf", "source-serif-4-latin.woff2", latin,
     "source-serif-4", "QStudio Serif", {"wght": 400, "opsz": 20})
save("source-serif-4-italic.ttf", "source-serif-4-italic-latin.woff2", latin,
     "source-serif-4", "QStudio Serif", {"wght": 400, "opsz": 20}, "Italic")
save("cousine-bold.ttf", "cousine-bold-latin.woff2", latin,
     "cousine", "QStudio Mono", style="Bold")
sans_cjk = save("noto-sans-sc.ttf", "noto-sans-sc-ui.woff2", cjk,
                "noto-sans-sc", "QStudio CJK", {"wght": (400, 900)})
serif_cjk = save("noto-serif-sc.ttf", "noto-serif-sc-ui.woff2", cjk,
                 "noto-serif-sc", "QStudio CJK Serif", {"wght": 400})
assert set(range(0x20, 0x7F)) <= sans.getBestCmap().keys(), "Missing ASCII UI glyphs"
for font in (sans_cjk, serif_cjk):
    assert {ord(c) for c in cjk} <= font.getBestCmap().keys(), "Missing QStudio CJK glyphs"
for family in ("source-sans-3", "source-serif-4", "cousine", "noto-sans-sc", "noto-serif-sc"):
    (output / f"{family}-OFL.txt").write_bytes((sources / f"{family}-OFL.txt").read_bytes())
for path in output.glob("*.woff2"):
    print(f"{path.name}: {path.stat().st_size:,} bytes")
print(f"Coverage: {len(latin)} Latin characters; {len(cjk)} CJK characters")

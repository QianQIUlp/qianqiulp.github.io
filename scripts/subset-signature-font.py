#!/usr/bin/env python3
"""Regenerate the self-hosted signature (brush) font subset.

The site uses a calligraphic face (Long Cang, SIL OFL) for a handful of
signature moments only: the seal, the home title, section kickers and the
colophon label. Shipping the full CJK font would cost megabytes, so we ship a
tiny subset containing just the characters listed in
`scripts/signature-font-chars.txt`.

Usage:
    pip install fonttools brotli
    python3 scripts/subset-signature-font.py

Output:
    public/fonts/qiu-brush.woff2

When new calligraphic copy is added to the site, append the new characters to
`scripts/signature-font-chars.txt` and rerun this script.
"""

from __future__ import annotations

import sys
import urllib.request
from pathlib import Path

from fontTools.subset import main as pyftsubset

REPO_ROOT = Path(__file__).resolve().parent.parent
CHARS_FILE = REPO_ROOT / "scripts" / "signature-font-chars.txt"
OUTPUT_FILE = REPO_ROOT / "public" / "fonts" / "qiu-brush.woff2"
SOURCE_CACHE = REPO_ROOT / "scripts" / ".signature-font-source.ttf"

# Long Cang (SIL Open Font License 1.1) — pinned upstream artifact.
SOURCE_URL = "https://fonts.gstatic.com/s/longcang/v21/LYjAdGP8kkgoTec8zkRgrQ.ttf"


def main() -> None:
    chars = CHARS_FILE.read_text(encoding="utf-8").strip()
    if not chars:
        raise SystemExit("signature-font-chars.txt is empty")

    if not SOURCE_CACHE.exists():
        print(f"Downloading source font: {SOURCE_URL}")
        with urllib.request.urlopen(SOURCE_URL, timeout=60) as response:
            SOURCE_CACHE.write_bytes(response.read())

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    pyftsubset(
        [
            str(SOURCE_CACHE),
            f"--text={chars}",
            "--flavor=woff2",
            f"--output-file={OUTPUT_FILE}",
            "--no-hinting",
            "--desubroutinize",
            "--layout-features=*",
        ]
    )
    size_kb = OUTPUT_FILE.stat().st_size / 1024
    print(f"Wrote {OUTPUT_FILE} ({size_kb:.1f} KiB, {len(set(chars))} unique chars)")


if __name__ == "__main__":
    sys.exit(main())

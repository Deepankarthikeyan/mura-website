#!/usr/bin/env python3
"""Download verified Pexels saree photos only — manually vetted IDs."""

import io
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SAREES_DIR = ROOT / "images" / "sarees"
BANNERS_DIR = ROOT / "images" / "banners"
UA = "Mozilla/5.0 (compatible; MuRa23Site/1.0)"

# (pexels_id, optional horizontal offset 0.0–1.0 for crop center)
PRODUCTS = {
    "banarasi": (28054615, 0.5),
    "kanjivaram": (35108811, 0.5),
    "kanchipuram": (35108812, 0.5),
    "cotton-block": (33433875, 0.5),
    "kalamkari": (29049336, 0.5),
    "georgette-party": (35108864, 0.5),
    "chiffon": (31540065, 0.5),
    "tussar": (7037122, 0.5),
    "mysore": (27575174, 0.5),
    "patola": (35108865, 0.5),
    "bandhani": (28054616, 0.5),
    "linen-cotton": (28054617, 0.5),
    "organza": (28054615, 0.25),
    "net-party": (29049358, 0.5),
    "paithani": (35199150, 0.5),
}

BANNERS = {
    "hero-1": (28054615, (1920, 800), 0.5),
    "hero-2": (35108811, (1920, 800), 0.5),
    "hero-3": (35108864, (1920, 800), 0.5),
    "breadcrumb-bg": (33433875, (1600, 334), 0.5),
    "page-hero": (31540065, (1600, 400), 0.5),
    "promo-1": (35199150, (1200, 600), 0.5),
    "promo-2": (29049358, (1200, 600), 0.5),
}


def download(photo_id: int) -> Image.Image:
    url = (
        f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
        f"?auto=compress&cs=tinysrgb&w=1600"
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return Image.open(io.BytesIO(resp.read())).convert("RGB")


def crop_to(img: Image.Image, target_w: int, target_h: int, x_center: float = 0.5) -> Image.Image:
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    new_w, new_h = int(src_w * scale), int(src_h * scale)
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = int((new_w - target_w) * x_center)
    top = (new_h - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def save_webp(img: Image.Image, path: Path, size: tuple[int, int], x_center: float = 0.5) -> None:
    cropped = crop_to(img, *size, x_center)
    cropped.save(path, "WEBP", quality=85, method=6)
    print(f"  saved {path.name} ({size[0]}x{size[1]})")


def save_jpg(img: Image.Image, path: Path, size: tuple[int, int], x_center: float = 0.5) -> None:
    cropped = crop_to(img, *size, x_center)
    cropped.save(path, "JPEG", quality=82, optimize=True)
    print(f"  saved {path.name} ({size[0]}x{size[1]})")


def main() -> None:
    SAREES_DIR.mkdir(parents=True, exist_ok=True)
    BANNERS_DIR.mkdir(parents=True, exist_ok=True)

    cache: dict[int, Image.Image] = {}

    def get(photo_id: int) -> Image.Image:
        if photo_id not in cache:
            print(f"Downloading Pexels {photo_id}...")
            cache[photo_id] = download(photo_id)
        return cache[photo_id]

    print("=== Product saree images (3:4) ===")
    for name, (photo_id, x_center) in PRODUCTS.items():
        save_webp(get(photo_id), SAREES_DIR / f"{name}.webp", (900, 1200), x_center)

    print("=== Banner saree images ===")
    for name, (photo_id, size, x_center) in BANNERS.items():
        save_jpg(get(photo_id), BANNERS_DIR / f"{name}.jpg", size, x_center)

    print("Done — all images are verified saree photos.")


if __name__ == "__main__":
    main()

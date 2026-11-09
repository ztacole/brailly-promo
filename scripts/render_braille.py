"""Render Unicode braille text as embossed dots on a sheet of paper.

Physical layout follows standard braille metrics (mm):
  dot pitch within a cell   2.5
  cell advance (horizontal) 6.0
  line advance (vertical)  10.0
  dot base diameter         1.5
"""

import numpy as np
from PIL import Image, ImageFilter

TEXT = "\u2820\u280e\u2811\u281e\u280a\u2801\u280f \u2805\u2801\u2817\u283d\u2801 \u2803\u2811\u2817\u2813\u2801\u2805 \u281e\u2811\u2817\u2803\u2801\u2809\u2801"

PX_PER_MM = 14
DOT_PITCH = 2.5
CELL_ADV = 6.0
LINE_ADV = 10.5
DOT_R = 0.78          # base radius of a dot, mm
DOT_H = 0.52          # dome height, mm
MARGIN_X, MARGIN_Y = 18.0, 22.0
MAX_CELLS = 16        # wrap width, in cells

# bit order of the Unicode braille block -> (col, row) in the 2x3 cell
DOT_POS = {0: (0, 0), 1: (0, 1), 2: (0, 2), 3: (1, 0), 4: (1, 1), 5: (1, 2)}


def blur(a, sigma):
    """Separable Gaussian blur for float arrays (PIL cannot filter mode F)."""
    if sigma <= 0:
        return a
    radius = max(1, int(sigma * 3))
    k = np.exp(-0.5 * (np.arange(-radius, radius + 1) / sigma) ** 2)
    k = (k / k.sum()).astype(np.float32)
    out = np.apply_along_axis(lambda m: np.convolve(m, k, mode="same"), 1, a)
    return np.apply_along_axis(lambda m: np.convolve(m, k, mode="same"), 0, out)


def wrap(text, max_cells):
    lines, cur = [], ""
    for word in text.split(" "):
        cand = word if not cur else cur + " " + word
        if len(cand) > max_cells and cur:
            lines.append(cur)
            cur = word
        else:
            cur = cand
    if cur:
        lines.append(cur)
    return lines


def dot_centers(lines):
    """Yield (x_mm, y_mm) for every raised dot."""
    for row, line in enumerate(lines):
        for col, ch in enumerate(line):
            code = ord(ch) - 0x2800
            if ch == " " or code < 0:
                continue
            cx = MARGIN_X + col * CELL_ADV
            cy = MARGIN_Y + row * LINE_ADV
            for bit in range(6):
                if code >> bit & 1:
                    dc, dr = DOT_POS[bit]
                    yield cx + dc * DOT_PITCH, cy + dr * DOT_PITCH


def main():
    lines = wrap(TEXT, MAX_CELLS)
    cols = max(len(l) for l in lines)

    sheet_w = MARGIN_X * 2 + (cols - 1) * CELL_ADV + DOT_PITCH
    sheet_h = MARGIN_Y * 2 + (len(lines) - 1) * LINE_ADV + 2 * DOT_PITCH
    W, H = int(sheet_w * PX_PER_MM), int(sheet_h * PX_PER_MM)

    rng = np.random.default_rng(7)

    # ---- height field: paper relief + embossed domes -------------------
    height = np.zeros((H, W), np.float32)

    # paper is never perfectly flat: very low frequency waviness
    coarse = rng.normal(0, 1, (H // 40 + 2, W // 40 + 2)).astype(np.float32)
    coarse = np.array(
        Image.fromarray(coarse).resize((W, H), Image.BICUBIC), np.float32
    )
    height += coarse * 0.045

    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    r_px = DOT_R * PX_PER_MM
    for x_mm, y_mm in dot_centers(lines):
        px, py = x_mm * PX_PER_MM, y_mm * PX_PER_MM
        pad = int(r_px * 2.6)
        x0, x1 = max(0, int(px - pad)), min(W, int(px + pad))
        y0, y1 = max(0, int(py - pad)), min(H, int(py + pad))
        dx = xx[y0:y1, x0:x1] - px
        dy = yy[y0:y1, x0:x1] - py
        d = np.sqrt(dx * dx + dy * dy) / r_px
        # spherical cap for the dot, plus a shallow ring where the paper
        # is pulled down around the punched dome
        cap = DOT_H * np.sqrt(np.clip(1.0 - d * d, 0, 1))
        ring = -0.09 * DOT_H * np.exp(-((d - 1.35) ** 2) / 0.22)
        height[y0:y1, x0:x1] += cap + ring

    # paper fibres (high frequency) and a touch of blur: the sheet bends,
    # it does not fold, so the dome edges are soft
    height += rng.normal(0, 0.012, (H, W)).astype(np.float32)
    height = blur(height, PX_PER_MM * 0.09)

    # ---- shading: lambert + specular, light from upper left ------------
    gy, gx = np.gradient(height * PX_PER_MM)
    nz = np.ones_like(gx)
    norm = np.sqrt(gx * gx + gy * gy + 1.0)
    nx, ny, nz = -gx / norm, -gy / norm, nz / norm

    L = np.array([-0.42, -0.60, 0.68], np.float32)
    L /= np.linalg.norm(L)
    diffuse = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)

    V = np.array([0.0, 0.0, 1.0], np.float32)
    Hv = L + V
    Hv /= np.linalg.norm(Hv)
    spec = np.clip(nx * Hv[0] + ny * Hv[1] + nz * Hv[2], 0, 1) ** 28 * 0.10

    albedo = np.array([246.0, 242.0, 231.0], np.float32)   # warm off-white
    grain = rng.normal(0, 2.6, (H, W)).astype(np.float32)
    grain = blur(grain, 0.7)

    shade = 0.68 + 0.40 * diffuse
    rgb = albedo[None, None, :] * shade[..., None] + grain[..., None] + spec[..., None] * 255

    # soft lighting falloff towards the lower right of the sheet
    vx = np.linspace(-1, 1, W, dtype=np.float32)
    vy = np.linspace(-1, 1, H, dtype=np.float32)
    vign = 1.0 - 0.10 * (0.55 * vx[None, :] + 0.45 * vy[:, None] + 1.0) / 2.0
    rgb *= vign[..., None]

    sheet = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))

    # ---- drop the sheet onto a neutral surface -------------------------
    pad = int(9 * PX_PER_MM)
    canvas = Image.new("RGB", (W + pad * 2, H + pad * 2), (176, 172, 166))
    shadow = Image.new("L", canvas.size, 0)
    sa = np.array(shadow)
    sa[pad + 6 : pad + H + 14, pad + 4 : pad + W + 12] = 150
    shadow = Image.fromarray(sa).filter(ImageFilter.GaussianBlur(pad * 0.42))
    canvas = Image.composite(Image.new("RGB", canvas.size, (120, 117, 112)), canvas, shadow)
    canvas.paste(sheet, (pad, pad))

    out = "/projects/sandbox/braille-setiap-karya-berhak-terbaca.png"
    canvas.save(out)
    print(f"{out}  {canvas.size[0]}x{canvas.size[1]}")
    print("lines:", lines)


if __name__ == "__main__":
    main()

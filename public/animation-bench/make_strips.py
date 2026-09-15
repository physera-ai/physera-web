"""Blog figures for animation-bench: comparison strips, single strips and GIFs.

Run from the animation-bench checkout:
    uv run --extra visual python <this file> capture  <task> <model>   # drive page, cache frames
    uv run --extra visual python <this file> compare  <task>           # reference + opus/deepseek/kimi rows
    uv run --extra visual python <this file> single   <task> <model>   # reference + one model
    uv run --extra visual python <this file> gif      <task>           # reference + per-model GIFs
    uv run --extra visual python <this file> all

Candidate pages are driven with the task's own interaction.json through
modules.scoring.capture.capture_scripted (same drive variant that produced the
score), so the frames line up with the reference frames the scorer used.
manifest.json (next to this file) maps task -> model -> {run, hash, score}.
"""
import json
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

BENCH = Path(os.environ.get("BENCH", "/Users/timcvetko/Documents/code/physera/animation-bench"))
sys.path.insert(0, str(BENCH))
OUT = Path(__file__).resolve().parent
CACHE = Path(os.environ.get("STRIP_CACHE", Path.home() / ".cache" / "animation-bench-strips"))
MANIFEST = json.loads((OUT / "manifest.json").read_text())
LABELS = {"opus": "Claude Opus 5", "deepseek": "DeepSeek v4.1 flash", "kimi": "Kimi K3"}
MODELS = ["opus", "deepseek", "kimi"]
COMPARE_TASKS = [
    "berd-window-morphs-into-app", "benxrun-skyline-chapter-scroll", "maxima-splash-curtain-whale-part2",
    "kavieng-cards-fly-to-grid-drag", "cipher-loader-stills-ring", "ciaoenergy-cans-fan-scroll-spin",
]
GIF_TASKS = COMPARE_TASKS[:3]
PICKS = 5
FONT = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 15) if Path("/System/Library/Fonts/Helvetica.ttc").exists() else ImageFont.load_default()


def reference_frames(task: str) -> list[np.ndarray]:
    from modules.scoring.task import load_task
    return load_task(task, BENCH / "harbor_tasks").reference_frames


def candidate_frames(task: str, model: str) -> list[np.ndarray]:
    entry = MANIFEST[task][model]
    cache = CACHE / f"{task}__{model}__{entry['hash']}.npz"
    if cache.exists():
        data = np.load(cache)
        return [data[k] for k in sorted(data.files, key=int)]
    from modules.scoring.capture import capture_scripted
    from modules.scoring.score import _candidate_script_variants
    from modules.scoring.task import load_task

    bundle = load_task(task, BENCH / "harbor_tasks")
    drive = json.loads(Path(BENCH / entry["score_file"]).read_text()).get("candidate_drive") or "full-page"
    script = dict(_candidate_script_variants(bundle.script))[drive]
    html = BENCH / entry["run"] / "artifacts" / "output" / "index.html"
    frames, _ = capture_scripted(html, script, frames=len(bundle.reference_frames), times_ms=bundle.reference_times_ms)
    if not frames:
        raise RuntimeError(f"{task}/{model}: capture produced no frames ({html})")
    CACHE.mkdir(parents=True, exist_ok=True)
    np.savez_compressed(cache, **{str(i): f for i, f in enumerate(frames)})
    return frames


def pick(frames: list[np.ndarray], n: int = PICKS) -> list[tuple[int, np.ndarray]]:
    idx = sorted({round(i * (len(frames) - 1) / (n - 1)) for i in range(n)})
    return [(i, frames[i]) for i in idx]


def strip(rows: list[tuple[str, list[np.ndarray]]], out: Path, cell_w: int = 360, label_h: int = 26, gap: int = 4) -> None:
    cell_h = round(cell_w * 9 / 16)
    row_h = label_h + cell_h + gap
    img = Image.new("RGB", (PICKS * (cell_w + gap) - gap, len(rows) * row_h - gap), "white")
    draw = ImageDraw.Draw(img)
    for r, (label, frames) in enumerate(rows):
        y = r * row_h
        draw.text((2, y + 5), label, fill="black", font=FONT)
        for c, (i, frame) in enumerate(pick(frames)):
            x = c * (cell_w + gap)
            img.paste(Image.fromarray(frame).resize((cell_w, cell_h), Image.LANCZOS), (x, y + label_h))
            if r == 0:
                draw.text((x + cell_w - 60, y + 5), f"frame {i}", fill="gray", font=FONT)
    img.save(out, optimize=True)
    print(out.name, f"{out.stat().st_size / 1e6:.2f} MB")


def model_label(task: str, model: str) -> str:
    return f"{LABELS[model]}  ·  score {MANIFEST[task][model]['score']:.3f}"


def compare(task: str) -> None:
    rows = [("Reference", reference_frames(task))]
    for m in MODELS:
        try:
            rows.append((model_label(task, m), candidate_frames(task, m)))
        except Exception as e:
            print(f"RENDER FAILED {task}/{m}: {e}")
    strip(rows, OUT / f"{task}-compare.png")


def single(task: str, model: str) -> None:
    strip([("Reference", reference_frames(task)), (model_label(task, model), candidate_frames(task, model))],
          OUT / f"{task}-{model}-strip.png", cell_w=300)


def gif(frames: list[np.ndarray], out: Path, width: int = 480, max_frames: int = 16, ms: int = 250) -> None:
    step = max(1, -(-len(frames) // max_frames))
    ims = [Image.fromarray(f).resize((width, round(width * 9 / 16)), Image.LANCZOS).quantize(colors=128, method=Image.Quantize.MEDIANCUT)
           for f in frames[::step]]
    ims[0].save(out, save_all=True, append_images=ims[1:], duration=[ms] * (len(ims) - 1) + [ms * 4], loop=0, optimize=True)
    print(out.name, f"{len(ims)} frames {out.stat().st_size / 1e6:.2f} MB")


def gifs(task: str) -> None:
    gif(reference_frames(task), OUT / f"{task}-reference.gif")
    for m in MODELS:
        try:
            gif(candidate_frames(task, m), OUT / f"{task}-{m}.gif")
        except Exception as e:
            print(f"RENDER FAILED {task}/{m}: {e}")


if __name__ == "__main__":
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "capture":
        candidate_frames(*args)
    elif cmd == "compare":
        compare(args[0])
    elif cmd == "single":
        single(args[0], args[1] if len(args) > 1 else "opus")
    elif cmd == "gif":
        gifs(args[0])
    elif cmd == "all":
        for t in MANIFEST:
            single(t, "opus")
        for t in COMPARE_TASKS:
            compare(t)
        for t in GIF_TASKS:
            gifs(t)

# Optional sprite-gen workflow

Solo Studio can use [aldegad/sprite-gen](https://github.com/aldegad/sprite-gen) to turn generated character animation strips into transparent frames, a PNG atlas, and a runtime manifest. It is an asset tool; gameplay remains in your engine.

Run `/sprite-pipeline` for an animated asset task. The [Skybreak example](../examples/skybreak/README.md) demonstrates the output in an offline browser combat scene. Open its `index.html` directly; no image provider or Python installation is needed to play.

## Install locally when producing new assets

The revision exercised by the example is **78a74f48fec02dff107e1df68f644ff91674794e** (sprite-gen 2.1.1). Inspect the dependency before executing it. This integration does not vendor its source or auto-install anything.

PowerShell, from a project-local tools directory:

```powershell
git clone https://github.com/aldegad/sprite-gen.git sprite-gen
git -C sprite-gen checkout 78a74f48fec02dff107e1df68f644ff91674794e
python -m venv sprite-gen/.venv
& ./sprite-gen/.venv/Scripts/python.exe -m pip install -e ./sprite-gen
$sg = (Resolve-Path ./sprite-gen/.venv/Scripts/sprite-gen.exe).Path
& $sg --help
```

On macOS/Linux use `.venv/bin/python` and `.venv/bin/sprite-gen`. Keep the checkout and environment outside tracked game assets. Python 3.10+ is required upstream; this example used Python 3.11 on Windows. The optional video path has separate dependencies and was not exercised.

## Produce and consume an atlas

```powershell
& $sg prepare --out-dir ./art/hero --character-id hero --base-image ./hero-base.png --request ./hero-request.json --cell-size 256 --chroma-key '#FF00FF' --no-fit-pixel-unfake --fit-resample lanczos --fit-align-x bbox-center --fit-align-y bottom
# Generate each raw/<state>.png using prompts/<state>.txt and its identity/layout references.
# The example used the host's built-in image tool here, not gen-set.
& $sg extract --run-dir ./art/hero
& $sg compose-atlas --run-dir ./art/hero
& $sg inspect --run-dir ./art/hero
& $sg compose-gif --run-dir ./art/hero --out-dir ./art/hero/previews
```

For sprite-gen's own generation transport, select and verify the provider before `gen-set --provider codex` or another supported route. This example proves the extraction/composition path with host-generated rows; it does not prove the provider adapter or video path. Do not silently substitute API billing when an in-app route fails.

See `examples/skybreak/assets/hero/sprite-request.json` for a concrete request. Read coordinates from `manifest.frame_layout.rows[state]`, timing from `manifest.animation.rows[state].durations_ms`, and stop non-looping actions at their last frame. Collider dimensions should remain independent of the art rectangle.

- Canvas: the example's `frameRect` and `drawSprite` functions read this contract directly.
- Phaser/Flame: upstream `export-aseprite` produces the JSON expected by their loaders; follow upstream's [engine export guide](https://github.com/aldegad/sprite-gen/blob/78a74f48fec02dff107e1df68f644ff91674794e/docs/engine-export.md), including its loop-policy limitations.
- Godot: create atlas regions and SpriteFrames from the manifest. An automatic Godot importer is not included in this change.
- Unity: map atlas regions and timings into sprites/clips. An automatic Unity importer is not included in this change.

## Evidence and limits

Keep raw strips, prompts, request settings, revision and reports while iterating. Check source clipping even when extraction says `ok`. Watch a loop in motion; similar stills can pass structural checks and still look stiff. The example rejected a clipped running take, changed horizontal alignment after edge warnings, and ended with no extractor or inspector warnings. Idle motion remains visually subtle.

The source tool is Apache-2.0. If you redistribute its source, retain the applicable license and notices. This repository links to the tool and includes generated outputs, rather than incorporating its implementation. Generated art provenance is recorded with the example; review the chosen provider's terms for a commercial release.

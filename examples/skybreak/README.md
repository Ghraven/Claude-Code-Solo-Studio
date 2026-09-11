# Skybreak: The Azure Gate

A small original side-scrolling sword-combat demo, inspired by the general feel of anime action brawlers. It uses original generated artwork, not Grand Chase characters or extracted game assets.

**Play:** open `index.html` in a modern browser. It is self-contained and works offline.

Move with A/D or arrow keys, double jump with Space, hold J to slash, press K for a sky burst, and Shift to dash. Defeat six echo knights, then enter the gate at the right edge. P pauses; the page also pauses when focus is lost. Touch buttons appear on touch devices. Sound starts muted.

Open **Sprite lab** to compare the same idle, run and attack frames used by the runtime, including a light background and slower preview. The enemies are crimson palette variants of the hero, produced by sprite-gen's recolor command.

## What this proves

- Real AI-generated state strips processed by sprite-gen's component extractor.
- A transparent runtime atlas and manifest consumed by a playable game.
- Deterministic palette variants, frame timing and non-looping attack playback.
- A complete small loop: combat, damage, defeat, victory and restart.

This is a short prototype. The four-frame gait has visible pose/scale variation; idle motion is subtle. Jump and damage reuse existing poses with procedural motion. There are no separately generated jump/hurt states, multi-stage combos, inventory, network features or saved progress.

## Files

- `index.template.html`, `game.js`: readable source.
- `assets/hero` and `assets/enemy`: actual sprite-gen atlases and runtime manifests.
- `assets/hero/sprite-request.json`: numerical production recipe.
- `provenance.json`: tool revision, generation route, outputs and hashes.
- `build.py`: packages the assets and source into `index.html`, using only Python's standard library.

Rebuild with `python build.py`. The checked-in HTML is the playable artifact; rebuild after changing source or atlases. The image-generation step is intentionally separate, so playing or rebuilding cannot spend generation credits.

Code follows the repository's MIT license. The upstream sprite-gen tool is Apache-2.0 and is not vendored here. Artwork was generated for this demo using the host's built-in image generation tool; generation provenance is not a guarantee about third-party rights or commercial release requirements.

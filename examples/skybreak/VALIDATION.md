# Validation — 2026-09-12

## Asset pipeline

Executed sprite-gen 2.1.1 at revision `78a74f48fec02dff107e1df68f644ff91674794e` in a project-local Python 3.11 environment on Windows.

- Prepared and generated three four-frame state rows using the host image tool.
- Ran canonical extraction, atlas composition, inspection, GIF export and palette recoloring.
- Final extraction and inspection: zero errors and zero warnings.
- Both runtime atlases: 1024 × 768, twelve nonempty frames each; every rectangle stays within its sheet.
- Both have 636,079 fully transparent pixels. No visible pure-magenta key pixels detected.
- Crimson variant: 135,757 palette substitutions, zero unmatched opaque pixels, alpha byte-identical to the hero atlas.
- The first running take was rejected for a clipped sword. Changing the extractor's horizontal alignment resolved edge warnings on the replacement.

## Runtime

`node test_game.cjs` passes deterministic checks against the real game source for movement, double-jump limits, landing, one hit per swing, enemy damage, invulnerability, burst energy, pause, defeat/restart, victory, and loop versus one-shot frame selection. These tests set up scenarios directly; they are not a claim of a complete human playthrough.

`node --check game.js` passes. `python build.py` produces the offline HTML using only the standard library. The runtime reads the atlas manifest's coordinates and durations.

Browser smoke test in the Codex in-app browser: start screen, live scene, sky burst input, pause/resume control, sprite-lab switching, and the light-background attack preview render successfully. Browser log inspection returned no warnings or errors. Screenshots are saved in `screenshots/`.

The browser test caught quick slash input being missed and the lab holding the final frame of a non-looping attack. Both were corrected. Sprite lab deliberately replays a one-shot for inspection; combat still clamps the one-shot frame and then exits its attack state.

## Remaining limits

The run cycle and attack poses still show some scale/pivot variation. This is a four-frame asset proof, not production animation. Jump/hurt use existing poses, echo knights reuse the hero as palette variants, and mobile touch play was not device-tested. The standalone sprite-gen provider adapter, Grok/video route, and Godot/Unity importers were not exercised.

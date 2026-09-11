---
name: sprite-pipeline
description: Generate and integrate 2D character animations using the optional sprite-gen component-row pipeline. Use for animated game sprites, transparent atlases, palette variants, or a playable sprite proof. Does not change the project's game engine.
---

# Sprite pipeline

Read `CLAUDE.md` and the current feature's asset requirements. Follow [the integration guide](../../../docs/sprite-gen.md) for the pinned dependency, commands, and example. Resolve this reference from the repository root as `docs/sprite-gen.md` when relative skill links are unavailable.

Start with one character and the minimum states needed to prove the feature. Reuse the user's chosen style, provider, engine, and authorization; ask only for choices that materially change the result. Generation requires an available image tool or an explicitly selected authenticated provider. Never substitute hand-drawn placeholders while claiming sprite-gen produced them.

1. Generate or obtain a full-body identity reference. Save the original and prompts in the project.
2. Use sprite-gen `prepare` with an explicit request: cell geometry, chroma color, states, frame counts, fps, loop flags and fit settings.
3. Generate one strip per state from its prepared prompt, identity reference, and layout guide. Use the host's image tool when available; otherwise the selected sprite-gen provider. Record which route actually ran.
4. Run the canonical `extract` and `compose-atlas` commands. Keep failed takes as evidence. Fix clipping or identity defects at the source; do not replace extraction with equal-width crops.
5. Import the final PNG and `manifest.json.frame_layout`. Respect per-frame durations and each state's loop policy. If curation was used, compose again before copying runtime assets.
6. Check the animation in the actual game: light/dark backgrounds, feet alignment, facing, timing, collision position and action completion. A successful extraction alone does not prove good motion.

Optional palette variants use sprite-gen `recolor`. Preserve the upstream license if redistributing its source. Keep provider credentials, logs containing credentials, environments and third-party checkouts out of Git. Do not install global skills, change accounts, or invoke paid providers as an incidental setup step.

Finish with the playable proof, output paths, actual commands/provider, source revision, validation results, and any remaining animation limitations.

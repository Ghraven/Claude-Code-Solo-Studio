"""Build an offline HTML demo from the actual sprite-gen atlases."""
import base64
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def build():
    bundle = {}
    for name, key in [('hero', 'manifest'), ('enemy', 'enemyManifest')]:
        folder = ROOT / 'assets' / name
        manifest = json.loads((folder / 'manifest.json').read_text(encoding='utf-8'))
        assert manifest['frame_layout']['rows'], 'Empty atlas'
        bundle[key] = manifest
        bundle[name] = 'data:image/png;base64,' + base64.b64encode(
            (folder / 'sprite-sheet-alpha.png').read_bytes()).decode('ascii')
    page = (ROOT / 'index.template.html').read_text(encoding='utf-8')
    page = page.replace('/*__ASSETS__*/', 'const SPRITES=' + json.dumps(bundle) + ';')
    page = page.replace('/*__GAME__*/', (ROOT / 'game.js').read_text(encoding='utf-8'))
    (ROOT / 'index.html').write_text(page, encoding='utf-8')
    print(f'Built {ROOT / "index.html"} ({len(page.encode("utf-8")):,} bytes)')


if __name__ == '__main__':
    build()

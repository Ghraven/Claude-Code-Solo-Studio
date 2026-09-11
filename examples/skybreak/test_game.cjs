// Deterministic gameplay checks against the real runtime, without a graphics dependency.
const fs = require("node:fs"),
  vm = require("node:vm"),
  assert = require("node:assert/strict");
const listeners = {},
  els = {};
const ctx = new Proxy(
  {},
  {
    get: (o, k) =>
      k === "createLinearGradient" ? () => ({ addColorStop() {} }) : () => {},
  },
);
const element = (id) =>
  (els[id] ??= {
    id,
    style: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
    getContext: () => ctx,
    focus() {},
    disabled: false,
  });
const manifest = JSON.parse(
  fs.readFileSync(__dirname + "/assets/hero/manifest.json"),
);
const sandbox = {
  console,
  Math,
  Set,
  Image: class {
    decode() {
      return new Promise(() => {});
    }
  },
  performance: { now: () => 0 },
  requestAnimationFrame() {},
  document: {
    getElementById: element,
    querySelectorAll: () => [],
    addEventListener() {},
  },
  window: { addEventListener: (n, f) => (listeners[n] = f) },
  SPRITES: { hero: "", enemy: "", manifest, enemyManifest: manifest },
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(__dirname + "/game.js", "utf8"), sandbox);
const run = (s) => vm.runInContext(s, sandbox);
const tick = (n = 1) => {
  for (let i = 0; i < n; i++) run("update(1/60)");
};
run("start()");
assert.equal(run("mode"), "play");
run("keys.add('KeyD')");
tick(60);
assert(run("hero.x") > 400);
run("keys.clear()");
run("pressed.add('Space')");
tick();
assert(run("hero.y") < 535);
const first = run("hero.vy");
tick(12);
run("pressed.add('Space')");
tick();
assert.equal(run("hero.jumps"), 2);
assert(run("hero.vy") < first + 1);
run("pressed.add('Space')");
tick();
assert.equal(run("hero.jumps"), 2);
tick(100);
assert.equal(run("hero.y"), 535);
run("start();hero.x=500;enemies[0].x=580");
run("keys.add('KeyJ')");
tick(20);
assert.equal(run("enemies[0].hp"), 50, "one slash hits once");
run("keys.clear()");
tick(30);
run("start();hero.x=500;enemies[0].x=580;enemies[0].cool=0");
tick(48);
assert.equal(run("hero.hp"), 88, "telegraphed enemy hit damages player");
run("start();hero.x=500;enemies[0].x=580;enemies[0].cool=0;hero.inv=2");
tick(48);
assert.equal(run("hero.hp"), 100, "invulnerability prevents damage");
run("start();hero.mp=44");
run("pressed.add('KeyK')");
tick();
assert.equal(run("hero.burst"), 0, "cannot burst without energy");
run("hero.mp=100");
run("pressed.add('KeyK')");
tick();
assert(run("hero.mp") < 60);
assert(run("hero.burst") > 0);
run("start();pause()");
const x = run("hero.x");
run("keys.add('KeyD')");
tick(20);
assert.equal(run("hero.x"), x);
run("pause()");
assert.equal(run("mode"), "play");
run("start();hero.hp=0");
tick();
assert.equal(run("mode"), "lost");
run("start()");
assert.equal(run("hero.hp"), 100);
assert.equal(run("kills"), 0);
run("kills=6;hero.x=WORLD-180");
tick();
assert.equal(run("mode"), "won");
run("start()");
assert.equal(run("enemies.length"), 6);
assert.equal(
  run("frameRect(SPRITES.manifest,'attack',5).idx"),
  3,
  "one-shot animation clamps",
);
assert(
  run("frameRect(SPRITES.manifest,'run',5).idx") < 4,
  "loop frame stays in bounds",
);
console.log(
  "PASS: movement, double-jump limit, landing, one-hit-per-swing, enemy damage, invulnerability, energy cost, pause, defeat/restart, victory and animation timing.",
);

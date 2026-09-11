"use strict";
const canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  W = 1152,
  H = 648,
  GROUND = 535,
  WORLD = 3100;
const $ = (id) => document.getElementById(id),
  keys = new Set(),
  pressed = new Set();
let mode = "title",
  time = 0,
  cam = 0,
  shake = 0,
  freeze = 0,
  muted = true,
  audioCtx,
  labState = "idle",
  labSlow = false,
  labLight = false;
let hero,
  enemies,
  particles = [],
  texts = [],
  kills = 0,
  combo = 0,
  comboTimer = 0,
  attackId = 0;
const atlas = new Image();
atlas.src = SPRITES.hero;
const enemyAtlas = new Image();
enemyAtlas.src = SPRITES.enemy;
function reset() {
  hero = {
    x: 170,
    y: GROUND,
    vx: 0,
    vy: 0,
    face: 1,
    hp: 100,
    mp: 100,
    state: "idle",
    anim: 0,
    attack: 0,
    burst: 0,
    inv: 0,
    dash: 0,
    dashCd: 0,
    jumps: 0,
  };
  enemies = [650, 960, 1390, 1820, 2250, 2640].map((x, i) => ({
    x,
    y: GROUND,
    hp: i === 5 ? 135 : 75,
    max: i === 5 ? 135 : 75,
    vx: 0,
    vy: 0,
    face: -1,
    anim: 0,
    cool: 1 + i * 0.13,
    wind: 0,
    stun: 0,
    hit: -1,
    big: i === 5,
  }));
  particles = [];
  texts = [];
  kills = 0;
  combo = 0;
  comboTimer = 0;
  cam = 0;
  freeze = 0;
  attackId = 0;
}
reset();
function beep(freq, dur = 0.1, type = "sine", vol = 0.025) {
  if (muted) return;
  audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator(),
    g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(
    freq * 0.35,
    audioCtx.currentTime + dur,
  );
  g.gain.setValueAtTime(vol, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}
function spark(x, y, color, n = 12) {
  for (let i = 0; i < n; i++)
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 390,
      vy: (Math.random() - 0.65) * 370,
      life: 0.25 + Math.random() * 0.35,
      max: 0.6,
      color,
    });
}
function popup(x, y, t, color = "#fff") {
  texts.push({ x, y, t, color, life: 0.75 });
}
function state(s) {
  if (hero.state !== s) {
    hero.state = s;
    hero.anim = 0;
  }
}
function start() {
  reset();
  mode = "play";
  $("overlay").classList.add("hidden");
  $("pause").textContent = "Pause";
  canvas.focus({ preventScroll: true });
  beep(520, 0.3);
}
function end(win) {
  mode = win ? "won" : "lost";
  $("overline").textContent = win
    ? "THE SKY IS YOURS AGAIN"
    : "EVERY KNIGHT FALLS";
  $("title").textContent = win ? "Gate reclaimed." : "Rise once more.";
  $("message").textContent = win
    ? "All six sentinels defeated. A short journey, complete. Open Sprite lab to inspect the artwork behind it."
    : "Try jumping over the red attack warning. Dash through danger and use K when surrounded.";
  $("start").textContent = "Play again →";
  $("overlay").classList.remove("hidden");
  beep(win ? 880 : 170, 0.5);
}
function pause() {
  if (mode === "play") {
    mode = "paused";
    $("pause").textContent = "Resume";
  } else if (mode === "paused") {
    mode = "play";
    $("pause").textContent = "Pause";
  }
  keys.clear();
  pressed.clear();
}
$("start").onclick = start;
$("pause").onclick = pause;
$("mute").onclick = () => {
  muted = !muted;
  $("mute").textContent = muted ? "Sound off" : "Sound on";
  if (!muted) beep(600);
};
$("labToggle").onclick = () => {
  $("lab").classList.toggle("show");
  $("labToggle").classList.toggle("active");
};
document.querySelectorAll("[data-state]").forEach(
  (b) =>
    (b.onclick = () => {
      labState = b.dataset.state;
      document
        .querySelectorAll("[data-state]")
        .forEach((x) => x.classList.toggle("active", x === b));
    }),
);
$("slow").onclick = () => {
  labSlow = !labSlow;
  $("slow").classList.toggle("active", labSlow);
};
$("labBg").onclick = () => {
  labLight = !labLight;
  $("labBg").textContent = labLight ? "Dark background" : "Light background";
};
const controls = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "Space",
  "KeyA",
  "KeyD",
  "KeyW",
  "KeyJ",
  "KeyK",
  "ShiftLeft",
  "ShiftRight",
  "KeyP",
  "Escape",
];
window.addEventListener("keydown", (e) => {
  if (!controls.includes(e.code) || e.target.tagName === "BUTTON") return;
  e.preventDefault();
  if (!keys.has(e.code)) pressed.add(e.code);
  keys.add(e.code);
  if (!e.repeat && (e.code === "KeyP" || e.code === "Escape")) pause();
});
window.addEventListener("keyup", (e) => keys.delete(e.code));
window.addEventListener("blur", () => {
  keys.clear();
  pressed.clear();
  if (mode === "play") pause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && mode === "play") pause();
});
document.querySelectorAll("[data-key]").forEach((b) => {
  b.onpointerdown = (e) => {
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    keys.add(b.dataset.key);
    pressed.add(b.dataset.key);
  };
  b.onpointerup = b.onpointercancel = () => keys.delete(b.dataset.key);
});
function down(...codes) {
  return codes.some((c) => keys.has(c));
}
function tap(...codes) {
  return codes.some((c) => pressed.has(c));
}
function hurtEnemy(e, damage, power) {
  e.hp -= damage;
  e.stun = 0.32;
  e.wind = 0;
  e.vx = hero.face * power;
  e.vy = -120;
  e.y -= 2;
  combo++;
  comboTimer = 2.2;
  popup(e.x, e.y - 140, String(damage), "#c9fff2");
  spark(e.x, e.y - 65, "#95ffe6", 16);
  shake = 7;
  freeze = 0.045;
  beep(220 + combo * 35, 0.1, "triangle");
  if (e.hp <= 0) {
    kills++;
    spark(e.x, e.y - 75, "#e8c783", 25);
    hero.mp = Math.min(100, hero.mp + 12);
  }
}
function update(dt) {
  if (mode !== "play") {
    pressed.clear();
    return;
  }
  if (freeze > 0) {
    freeze -= dt;
    return;
  }
  hero.anim += dt;
  hero.inv = Math.max(0, hero.inv - dt);
  hero.dashCd = Math.max(0, hero.dashCd - dt);
  hero.mp = Math.min(100, hero.mp + dt * 9);
  hero.attack = Math.max(0, hero.attack - dt);
  hero.burst = Math.max(0, hero.burst - dt);
  hero.dash = Math.max(0, hero.dash - dt);
  comboTimer -= dt;
  if (comboTimer <= 0) combo = 0;
  let move =
    (down("KeyD", "ArrowRight") ? 1 : 0) - (down("KeyA", "ArrowLeft") ? 1 : 0);
  if (move && hero.attack === 0) hero.face = move;
  if (tap("Space", "KeyW", "ArrowUp") && hero.jumps < 2) {
    hero.vy = -570;
    hero.jumps++;
    spark(hero.x, hero.y, "#acdfe5", 6);
    beep(420, 0.15);
  }
  if (tap("ShiftLeft", "ShiftRight") && hero.dashCd === 0) {
    hero.dash = 0.18;
    hero.dashCd = 0.75;
    hero.inv = 0.25;
    beep(350, 0.18, "sawtooth", 0.012);
  }
  if ((down("KeyJ") || tap("KeyJ")) && hero.attack === 0 && hero.dash === 0) {
    hero.attack = 0.4;
    hero.anim = 0;
    attackId++;
    state("attack");
    beep(650, 0.12, "triangle");
  }
  if (tap("KeyK") && hero.mp >= 45) {
    hero.mp -= 45;
    hero.burst = 0.5;
    hero.inv = 0.55;
    hero.attack = 0.4;
    hero.anim = 0;
    attackId++;
    state("attack");
    for (const e of enemies)
      if (
        e.hp > 0 &&
        Math.abs(e.x - hero.x) < 255 &&
        Math.abs(e.y - hero.y) < 160
      )
        hurtEnemy(e, 55, 420);
    spark(hero.x, hero.y - 70, "#73caff", 35);
    beep(140, 0.45, "sawtooth");
  }
  hero.vx =
    hero.dash > 0 ? hero.face * 760 : move * (hero.attack > 0 ? 105 : 285);
  hero.x = Math.max(65, Math.min(WORLD - 65, hero.x + hero.vx * dt));
  hero.vy += 1550 * dt;
  hero.y += hero.vy * dt;
  if (hero.y >= GROUND) {
    hero.y = GROUND;
    hero.vy = 0;
    hero.jumps = 0;
  }
  if (hero.attack > 0) {
    state("attack");
    const phase = 0.4 - hero.attack;
    if (phase > 0.095 && phase < 0.3) {
      for (const e of enemies) {
        const dx = (e.x - hero.x) * hero.face;
        if (
          e.hp > 0 &&
          e.hit !== attackId &&
          dx > -20 &&
          dx < 155 &&
          Math.abs(e.y - hero.y) < 125
        ) {
          e.hit = attackId;
          hurtEnemy(e, 25, 240);
        }
      }
    }
  } else state(move ? "run" : "idle");
  for (const e of enemies) {
    if (e.hp <= 0) continue;
    e.anim += dt;
    e.cool -= dt;
    e.stun = Math.max(0, e.stun - dt);
    const dx = hero.x - e.x;
    e.face = dx >= 0 ? 1 : -1;
    e.vy += 1550 * dt;
    e.y += e.vy * dt;
    if (e.y >= GROUND) {
      e.y = GROUND;
      e.vy = 0;
    }
    if (e.stun > 0) {
      e.x += e.vx * dt;
      e.vx *= Math.exp(-8 * dt);
      continue;
    }
    if (e.wind > 0) {
      e.wind -= dt;
      if (e.wind <= 0) {
        if (
          Math.abs(dx) < 110 &&
          Math.abs(hero.y - e.y) < 100 &&
          hero.inv === 0
        ) {
          hero.hp = Math.max(0, hero.hp - (e.big ? 18 : 12));
          hero.inv = 0.85;
          hero.x = Math.max(65, Math.min(WORLD - 65, hero.x + e.face * 35));
          spark(hero.x, hero.y - 70, "#ffc0a2");
          popup(hero.x, hero.y - 150, "-" + (e.big ? 18 : 12), "#ffb0a5");
          shake = 9;
          beep(100, 0.16, "square");
        }
        e.cool = 1.5;
      }
    } else if (Math.abs(dx) < 88 && e.cool <= 0) {
      e.wind = 0.6;
    } else if (Math.abs(dx) < 570 && Math.abs(dx) > 77) {
      e.x += e.face * (e.big ? 80 : 105) * dt;
    }
  }
  cam +=
    (Math.max(0, Math.min(WORLD - W, hero.x - W * 0.35)) - cam) *
    Math.min(1, dt * 5);
  if (hero.hp <= 0) end(false);
  else if (kills === 6 && hero.x > WORLD - 230) end(true);
  for (const p of particles) {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 500 * dt;
  }
  particles = particles.filter((p) => p.life > 0);
  for (const t of texts) {
    t.life -= dt;
    t.y -= dt * 55;
  }
  texts = texts.filter((t) => t.life > 0);
  shake *= Math.exp(-14 * dt);
  pressed.clear();
  $("health").style.width = hero.hp + "%";
  $("mana").style.width = hero.mp + "%";
  $("kills").textContent = kills + " / 6";
  $("status").textContent =
    kills === 6
      ? "The gate is open. Continue right →"
      : hero.mp >= 45
        ? "Sky burst ready · K"
        : "Sky energy recovering…";
}
function poly(points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
}
function background() {
  let g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#122b45");
  g.addColorStop(0.6, "#769aa5");
  g.addColorStop(1, "#193949");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#e7e2c4";
  ctx.beginPath();
  ctx.arc(867 - cam * 0.08, 122, 49, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a6c0bc55";
  for (let i = 0; i < 7; i++) {
    const x = i * 260 - cam * 0.12;
    ctx.beginPath();
    ctx.ellipse(x, 270 + Math.sin(i * 4) * 55, 210, 25, 0, 0, 7);
    ctx.fill();
  }
  for (let i = 0; i < 13; i++) {
    const x = i * 250 - cam * 0.22 - 100;
    const y = 315 + Math.sin(i * 2) * 35;
    poly(
      [
        [x, y],
        [x + 75, y - 155],
        [x + 160, y - 60],
        [x + 240, y],
        [x + 130, y + 125],
      ],
      "#34536b",
    );
    poly(
      [
        [x + 75, y - 155],
        [x + 115, y - 84],
        [x + 90, y - 101],
        [x + 52, y - 91],
      ],
      "#7b9cac",
    );
  }
  for (let i = 0; i < 15; i++) {
    let x = i * 280 - cam * 0.5 - 80,
      y = 360 + Math.sin(i * 3) * 30;
    poly(
      [
        [x, y],
        [x + 150, y],
        [x + 102, y + 95],
        [x + 30, y + 55],
      ],
      "#254454",
    );
    ctx.fillStyle = "#678d8b";
    ctx.fillRect(x, y, 150, 8);
    ctx.fillStyle = "#365d6b";
    ctx.fillRect(x + 48, y - 130, 23, 130);
    ctx.fillRect(x + 111, y - 115, 21, 115);
    ctx.fillRect(x + 38, y - 134, 46, 12);
  }
  g = ctx.createLinearGradient(0, 430, 0, 620);
  g.addColorStop(0, "#b8d5ce33");
  g.addColorStop(1, "#d2e7df99");
  ctx.fillStyle = g;
  ctx.fillRect(0, 430, W, 200);
  ctx.save();
  ctx.translate(-cam, 0);
  for (let i = 0; i < 12; i++) {
    let x = i * 290 + 25;
    ctx.fillStyle = "#183642";
    ctx.fillRect(x, GROUND + 22, 72, 120);
    poly(
      [
        [x - 12, GROUND + 25],
        [x + 84, GROUND + 25],
        [x + 72, GROUND + 51],
        [x, GROUND + 51],
      ],
      "#234956",
    );
  }
  ctx.fillStyle = "#274653";
  ctx.fillRect(0, GROUND, WORLD, 125);
  ctx.fillStyle = "#66827c";
  ctx.fillRect(0, GROUND, WORLD, 13);
  ctx.fillStyle = "#a9bfa7";
  ctx.fillRect(0, GROUND, WORLD, 3);
  ctx.strokeStyle = "#193643";
  ctx.lineWidth = 2;
  for (let i = 0; i < 50; i++) {
    let x = i * 75;
    ctx.strokeRect(x, GROUND + 14, 73, 28);
    ctx.strokeRect(x + 35, GROUND + 45, 73, 42);
  }
  for (let i = 0; i < 35; i++) {
    let x = i * 97 + 10;
    ctx.strokeStyle = "#72a98c";
    ctx.beginPath();
    ctx.moveTo(x, GROUND);
    ctx.lineTo(x - 5, GROUND - 12);
    ctx.moveTo(x, GROUND);
    ctx.lineTo(x + 6, GROUND - 17);
    ctx.stroke();
  }
  for (let x of [400, 1230, 2040]) {
    ctx.fillStyle = "#2b4b55";
    ctx.fillRect(x, GROUND - 155, 35, 155);
    ctx.fillStyle = "#537880";
    ctx.fillRect(x - 7, GROUND - 163, 48, 14);
    ctx.fillStyle = "#93d2ca";
    ctx.fillRect(x + 7, GROUND - 151, 4, 127);
    poly(
      [
        [x + 33, GROUND - 140],
        [x + 104, GROUND - 125],
        [x + 87, GROUND - 87],
        [x + 33, GROUND - 94],
      ],
      "#327985",
    );
  }
  let gx = WORLD - 160;
  ctx.strokeStyle = "#547b87";
  ctx.lineWidth = 23;
  ctx.beginPath();
  ctx.moveTo(gx - 69, GROUND);
  ctx.lineTo(gx - 69, GROUND - 159);
  ctx.quadraticCurveTo(gx, GROUND - 258, gx + 69, GROUND - 159);
  ctx.lineTo(gx + 69, GROUND);
  ctx.stroke();
  ctx.save();
  ctx.globalAlpha = kills === 6 ? 0.6 + 0.15 * Math.sin(time * 3) : 0.18;
  ctx.fillStyle = "#78f2e3";
  ctx.beginPath();
  ctx.ellipse(gx, GROUND - 100, 53, 98, 0, 0, 7);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#c4deda";
  ctx.textAlign = "center";
  ctx.font = "10px system-ui";
  ctx.fillText(kills === 6 ? "ENTER THE GATE" : "SEALED", gx, GROUND - 249);
  ctx.restore();
}
function frameRect(manifest, s, t) {
  const row = manifest.frame_layout.rows[s];
  const conf = manifest.animation.rows[s];
  const dur = conf.durations_ms;
  let idx;
  if (dur) {
    const total = dur.reduce((a, b) => a + b, 0);
    let ms =
      conf.loop === false ? Math.min(total - 1, t * 1000) : (t * 1000) % total;
    idx = 0;
    while (idx < dur.length - 1 && ms >= dur[idx]) {
      ms -= dur[idx++];
    }
  } else idx = Math.floor(t * (conf.fps || 8));
  idx = conf.loop === false ? Math.min(row.length - 1, idx) : idx % row.length;
  return { rect: row[idx], idx };
}
function drawSprite(c, img, m, s, t, x, y, size, face = 1, alpha = 1) {
  if (!img.complete || !img.naturalWidth) return;
  const { rect: r } = frameRect(m, s, t);
  c.save();
  c.translate(x, y);
  c.scale(face, 1);
  c.globalAlpha = alpha;
  c.drawImage(
    img,
    r.x,
    r.y,
    r.w ?? r.width,
    r.h ?? r.height,
    -size / 2,
    -size + (size * 22) / 256,
    size,
    size,
  );
  c.restore();
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  if (shake > 1)
    ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  background();
  ctx.save();
  ctx.translate(-cam, 0);
  for (const e of enemies) {
    if (e.hp <= 0) continue;
    ctx.fillStyle = "#0a202877";
    ctx.beginPath();
    ctx.ellipse(e.x, GROUND + 3, e.big ? 42 : 30, 8, 0, 0, 7);
    ctx.fill();
    if (e.wind > 0) {
      ctx.strokeStyle = "#ff8f6f";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(e.x + e.face * 42, GROUND, 65, 13, 0, 0, 7);
      ctx.stroke();
      ctx.fillStyle = "#ffd3a6";
      ctx.font = "bold 24px system-ui";
      ctx.fillText("!", e.x, e.y - 160);
    }
    drawSprite(
      ctx,
      enemyAtlas,
      SPRITES.enemyManifest,
      e.wind > 0
        ? "attack"
        : Math.abs(e.x - hero.x) > 77 && Math.abs(e.x - hero.x) < 570
          ? "run"
          : "idle",
      e.wind > 0 ? 0.6 - e.wind : e.anim,
      e.x,
      e.y,
      e.big ? 190 : 148,
      e.face,
    );
    ctx.fillStyle = "#102632";
    ctx.fillRect(e.x - 28, e.y - (e.big ? 187 : 148), 56, 4);
    ctx.fillStyle = e.big ? "#f4bc76" : "#d58f88";
    ctx.fillRect(
      e.x - 28,
      e.y - (e.big ? 187 : 148),
      56 * Math.max(0, e.hp / e.max),
      4,
    );
  }
  ctx.fillStyle = "#0a202877";
  ctx.beginPath();
  ctx.ellipse(hero.x, GROUND + 3, 27, 7, 0, 0, 7);
  ctx.fill();
  if (hero.dash > 0)
    for (let i = 1; i <= 3; i++)
      drawSprite(
        ctx,
        atlas,
        SPRITES.manifest,
        hero.state,
        hero.anim,
        hero.x - hero.face * i * 28,
        hero.y,
        184,
        hero.face,
        0.2 / i,
      );
  drawSprite(
    ctx,
    atlas,
    SPRITES.manifest,
    hero.state,
    hero.anim,
    hero.x,
    hero.y,
    184,
    hero.face,
    hero.inv > 0 && Math.sin(time * 45) > 0 ? 0.5 : 1,
  );
  if (hero.attack > 0.09 && hero.attack < 0.31) {
    ctx.save();
    ctx.translate(hero.x, hero.y - 76);
    ctx.scale(hero.face, 1);
    ctx.strokeStyle = "#d1fff2";
    ctx.shadowColor = "#6affe6";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(25, 0, 112, 76, -0.45, -1.15, 1.25);
    ctx.stroke();
    ctx.restore();
  }
  if (hero.burst > 0) {
    ctx.strokeStyle = "#89dbff";
    ctx.lineWidth = 5 * hero.burst;
    ctx.beginPath();
    ctx.arc(hero.x, hero.y - 65, (0.5 - hero.burst) * 540, 0, 7);
    ctx.stroke();
  }
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 4, 4);
  }
  ctx.globalAlpha = 1;
  for (const t of texts) {
    ctx.fillStyle = t.color;
    ctx.font = "bold 22px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(t.t, t.x, t.y);
  }
  ctx.restore();
  for (let i = 0; i < 20; i++) {
    const x = (i * 137 + time * 10) % W,
      y = 95 + ((i * 79) % 390) + Math.sin(time + i) * 18;
    ctx.fillStyle = "#ccfce777";
    ctx.fillRect(x, y, 2, 2);
  }
  if (combo > 1) {
    ctx.textAlign = "right";
    ctx.fillStyle = "#f3d8a0";
    ctx.font = "italic 42px Georgia";
    ctx.fillText(combo + " hits", W - 32, 134);
  }
  if (mode === "paused") {
    ctx.fillStyle = "#081523aa";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#e0f1f3";
    ctx.textAlign = "center";
    ctx.font = "36px Georgia";
    ctx.fillText("Paused", W / 2, H / 2);
    ctx.font = "14px system-ui";
    ctx.fillText("Press P or Resume to continue", W / 2, H / 2 + 36);
  }
  ctx.restore();
  if ($("lab").classList.contains("show")) drawLab();
}
function drawLab() {
  const c = $("preview").getContext("2d");
  c.fillStyle = labLight ? "#e7e6dc" : "#1b3042";
  c.fillRect(0, 0, 1152, 190);
  const duration =
    SPRITES.manifest.animation.rows[labState].durations_ms.reduce(
      (a, b) => a + b,
      0,
    ) / 1000;
  const t = (time * (labSlow ? 0.25 : 1)) % (duration + 0.2);
  drawSprite(c, atlas, SPRITES.manifest, labState, t, 110, 175, 178);
  c.fillStyle = labLight ? "#213c49" : "#b5d2dc";
  c.font = "11px system-ui";
  c.fillText("LIVE LOOP", 74, 18);
  const rows = SPRITES.manifest.frame_layout.rows[labState];
  rows.forEach((r, i) => {
    const x = 350 + i * 210;
    c.drawImage(
      atlas,
      r.x,
      r.y,
      r.w ?? r.width,
      r.h ?? r.height,
      x - 78,
      20,
      156,
      156,
    );
    c.fillText("FRAME " + (i + 1), x - 27, 183);
  });
  $("frameInfo").textContent =
    "State: " +
    labState +
    " · " +
    rows.length +
    " frames · " +
    (SPRITES.manifest.animation.rows[labState].fps || 10) +
    " fps · PNG atlas + manifest rectangles";
}
let last = performance.now();
function loop(now) {
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;
  time += dt;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}
Promise.all([atlas.decode(), enemyAtlas.decode()])
  .then(() => requestAnimationFrame(loop))
  .catch(() => {
    $("message").textContent =
      "Sprite files could not be loaded. Rebuild the demo using build.py.";
    $("start").disabled = true;
  });
window.SKYBREAK = {
  getState: () => ({
    mode,
    x: hero.x,
    y: hero.y,
    hp: hero.hp,
    mp: hero.mp,
    kills,
    combo,
    enemyCount: enemies.filter((e) => e.hp > 0).length,
    state: hero.state,
  }),
  frameRect,
};

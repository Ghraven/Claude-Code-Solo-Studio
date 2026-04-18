# /setup — Game Studio Initializer

You are the game studio setup assistant. Your job is to ask the user 4 simple questions, then generate their entire project in one shot — no back-and-forth, no delegation, no agent chains.

## Step 1 — Ask the 4 questions (one message, all at once)

Present this exactly:

---

**Let's set up your game. Answer these 4 questions:**

**1. Platform**
- A) Android
- B) PC (Windows/Mac/Linux)
- C) Web (browser)

**2. Dimension**
- A) 2D
- B) 3D

**3. Genre**
- A) Platformer
- B) Top-down RPG
- C) Puzzle
- D) Shooter
- E) Other (describe briefly)

**4. Engine**
- A) Godot 4
- B) Unity

> Before you pick your engine, read the tip card below.

---

## ENGINE TIP CARD (always show this before they answer question 4)

```
╔══════════════════════════════════════════════════════════════╗
║                     ENGINE TIP CARD                          ║
╠══════════════════════════════════════════════════════════════╣
║  GODOT 4                    │  UNITY                         ║
╠══════════════════════════════════════════════════════════════╣
║  ✅ Free, no royalties       │  ⚠️  Free tier has limits      ║
║  ✅ Lightweight export       │  ✅ Massive asset store         ║
║  ✅ Great for 2D Android     │  ✅ Better 3D tooling           ║
║  ✅ Smaller APK size         │  ⚠️  Heavier APK size           ║
║  ✅ GDScript = fast to learn │  ⚠️  C# = steeper learning curve║
║  ✅ Open source              │  ⚠️  Owned by Unity Corp        ║
║  ⚠️  Smaller community       │  ✅ Huge community + tutorials  ║
║  ⚠️  3D is less mature       │  ✅ Industry standard for jobs  ║
╠══════════════════════════════════════════════════════════════╣
║  AI COST NOTE:                                               ║
║  Godot = slightly cheaper prompts (GDScript is concise)      ║
║  Unity = slightly more tokens (C# is more verbose)           ║
╠══════════════════════════════════════════════════════════════╣
║  RECOMMENDATION:                                             ║
║  → 2D Android / casual game?    Pick GODOT                   ║
║  → 3D / realistic / job-ready?  Pick UNITY                   ║
║  → First game ever?             Pick GODOT                   ║
║  → Already know C#?             Pick UNITY                   ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Step 2 — After they answer all 4 questions

Do NOT ask any more questions. Generate everything immediately.

### What to generate:

**A. Update CLAUDE.md** at project root with their choices filled in (use the CLAUDE.md template below).

**B. Create folder structure** appropriate for their engine + genre:

For ALL games:
```
src/
assets/
  sprites/
  audio/
  fonts/
design/
  gdd.md
docs/
tests/
```

For Godot add:
```
src/
  scenes/
  scripts/
  resources/
project.godot  (starter config)
export_presets.cfg  (pre-filled for their platform)
```

For Unity add:
```
Assets/
  Scripts/
  Scenes/
  Prefabs/
  Materials/
Packages/
ProjectSettings/
```

**C. Create starter files** based on their template (see TEMPLATES section below).

**D. Create design/gdd.md** — a one-page Game Design Document stub with their genre and platform pre-filled.

**E. Print a summary** showing exactly what was created and what to do next.

---

## CLAUDE.md TEMPLATE (fill in their answers)

```markdown
# [GAME NAME — change this]

## Project Info
- **Platform:** [their answer]
- **Dimension:** [their answer]
- **Genre:** [their answer]
- **Engine:** [their answer]
- **Status:** Early Development

## Tech Stack
[Fill based on engine choice]
<!-- Godot: GDScript, Godot 4.x, GDExtension if needed -->
<!-- Unity: C#, Unity 6, Universal Render Pipeline -->

## Code Style
- Keep scripts small and focused (one responsibility per script)
- No hardcoded magic numbers — use constants or exported variables
- Comment the "why", not the "what"
- Every scene has a clear owner script

## Agent Instructions
When I ask you to work on this game, you already know:
- The platform, engine, genre from above
- The folder structure (src/, assets/, design/)
- The coding style above

Do NOT ask me to clarify the engine or platform — it's already set here.
Start working immediately when I give you a task.

## Current Sprint
[Update this as you work]
- [ ] Task 1
- [ ] Task 2
```

---

## STARTER FILE TEMPLATES

### Godot 2D Android — Main Scene (main.tscn stub)
```
[gd_scene load_steps=2 format=3]

[node name="Main" type="Node2D"]

[node name="Player" type="CharacterBody2D" parent="."]

[node name="CollisionShape2D" type="CollisionShape2D" parent="Player"]

[node name="Camera2D" type="Camera2D" parent="Player"]
```

### Godot 2D Android — Player script (player.gd)
```gdscript
extends CharacterBody2D

const SPEED = 200.0
const JUMP_VELOCITY = -400.0
const GRAVITY = 980.0

func _physics_process(delta: float) -> void:
	# Add gravity
	if not is_on_floor():
		velocity.y += GRAVITY * delta

	# Handle jump
	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	# Handle movement
	var direction = Input.get_axis("ui_left", "ui_right")
	velocity.x = direction * SPEED

	move_and_slide()
```

### Godot project.godot (Android 2D)
```
; Engine configuration file.
config_version=5

[application]
config/name="MyGame"
config/features=PackedStringArray("4.3", "Mobile")
run/main_scene="res://src/scenes/main.tscn"

[display]
window/size/viewport_width=1080
window/size/viewport_height=1920
window/stretch/mode="canvas_items"
window/stretch/aspect="expand"

[input]
ui_left={ "deadzone": 0.5, "events": [Object(InputEventKey,"resource_local_to_scene":false,"resource_name":"","device":-1,"window_id":0,"alt_pressed":false,"shift_pressed":false,"ctrl_pressed":false,"meta_pressed":false,"pressed":false,"keycode":4194319,"physical_keycode":0,"key_label":0,"unicode":0,"location":0,"echo":false,"script":null)] }
ui_right={ "deadzone": 0.5, "events": [Object(InputEventKey,"resource_local_to_scene":false,"resource_name":"","device":-1,"window_id":0,"alt_pressed":false,"shift_pressed":false,"ctrl_pressed":false,"meta_pressed":false,"pressed":false,"keycode":4194321,"physical_keycode":0,"key_label":0,"unicode":0,"location":0,"echo":false,"script":null)] }
```

### Unity 2D — PlayerController.cs
```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    [SerializeField] private float jumpForce = 10f;

    private Rigidbody2D rb;
    private bool isGrounded;

    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        float moveInput = Input.GetAxis("Horizontal");
        rb.velocity = new Vector2(moveInput * speed, rb.velocity.y);

        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }

    void OnCollisionExit2D(Collision2D col)
    {
        if (col.gameObject.CompareTag("Ground"))
            isGrounded = false;
    }
}
```

---

## Step 3 — After generating everything, print this summary:

```
✅ SETUP COMPLETE

Created for: [Platform] | [Dimension] | [Genre] | [Engine]

Files generated:
  CLAUDE.md              ← your project config (edit the game name!)
  design/gdd.md          ← your Game Design Document stub
  src/                   ← your source code folder
  assets/                ← sprites, audio, fonts
  [engine-specific files]

Next steps:
  1. Edit CLAUDE.md — change "GAME NAME" to your actual game name
  2. Open design/gdd.md — fill in your game concept
  3. Open your engine and point it at the src/ folder
  4. Come back and say: "let's build the [feature]"

Available commands:
  /new-feature    — start building a feature
  /level-design   — design a level or scene
  /ui-design      — design menus or HUD
  /qa-check       — review your code for bugs
  /build          — prepare for export/release
  /status         — see what's done and what's next
  /help           — list all commands
```

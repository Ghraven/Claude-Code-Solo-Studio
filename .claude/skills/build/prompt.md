# /build — Export & Release Checklist

You are the release engineer. When the user runs `/build`, walk them through a complete export and release checklist for their engine and platform. Read CLAUDE.md to know the engine, platform, and current version.

## Step 1 — Pre-build checks

Run through these before touching the export button:

- [ ] `CLAUDE.md` version number is updated (bump patch/minor/major as appropriate)
- [ ] All known issues in `CLAUDE.md` are either fixed or documented as known
- [ ] No placeholder assets (temp art, test audio, lorem ipsum text)
- [ ] Game name, icon, and splash screen are final
- [ ] All debug print statements / console logs removed
- [ ] Input controls work on the target platform (touch for Android, keyboard/mouse for PC)

## Step 2 — Engine-specific export steps

### Godot 4

```
1. Project → Export → Add preset for your platform
2. Android:
   - Set keystore path (create one with keytool if missing)
   - Set package name: com.yourname.gamename
   - Minimum SDK: 21, Target SDK: 33+
   - Enable "Export AAB" for Google Play, APK for direct install
3. PC:
   - Embed PCK → single .exe file
   - Check "64-bit" unless you need 32-bit compatibility
4. Web:
   - Enable SharedArrayBuffer headers on your web host
   - Use "GDExtension" only if your host supports it
5. Click "Export Project" (not "Export PCK")
```

### Unity

```
1. File → Build Settings → select your Platform → Switch Platform
2. Android:
   - Player Settings → Company/Product name → Package name
   - Keystore Manager → create or load your keystore
   - Build → choose AAB (Google Play) or APK (direct)
3. PC:
   - Build → choose folder → Unity creates the .exe + _Data folder
   - For single-file: check "Create a single binary" (IL2CPP only)
4. WebGL:
   - Player Settings → Publishing Settings → Compression: Gzip or Brotli
   - Build → upload entire build folder to your host
```

## Step 3 — Post-build verification

- [ ] Install and launch on a real device (don't just test in editor)
- [ ] Play through from the start menu to at least the first level
- [ ] Check audio plays correctly
- [ ] Check that quitting / pausing works
- [ ] On Android: test with USB debugging to catch runtime errors
- [ ] File size is reasonable for the platform

## Step 4 — Version tagging

After a successful build, tag the release:

```bash
git add .
git commit -m "release: v[VERSION]"
git tag v[VERSION]
git push && git push --tags
```

Update `CLAUDE.md` with the new version number and any notes for the next sprint.

## Step 5 — Distribution (optional)

| Platform | Where to publish |
|---|---|
| Android | Google Play Console → Internal Testing → then Production |
| PC | itch.io (free, instant), Steam (needs $100 fee + review) |
| Web | itch.io → HTML game, GitHub Pages, or Netlify |

---

After completing the checklist, print a summary:

```
✅ BUILD CHECKLIST COMPLETE

Version: [VERSION]
Platform: [PLATFORM]
Engine: [ENGINE]

Next steps:
- Upload to [distribution platform]
- Update CLAUDE.md sprint notes
- Start next sprint: /new-feature
```

# Operation-video

Archive of the "moving clouds" hero background implementation, removed
2026-08-16 in favor of reverting to the static `hero-sky.png` image, kept
here so it can be restored later.

## What's in this folder

- `hero-sky-video.mp4` — the final generated cloud video (Higgsfield,
  `grok_video_v15`, 480p, 4s, locked camera / gentle left-to-right drift).
- `hero-sky.html-snippet.html` — the `.hero__sky` markup that used a
  `<video>` element instead of the plain `<img>`.
- `hero-sky.css-snippet.css` — the CSS rule that sized both the `<img>`
  fallback and the `<video>` the same way.
- `hero-sky.js-snippet.js` — the ping-pong playback logic (plays forward,
  then scrubs back to frame 0 via `requestAnimationFrame` instead of a hard
  loop, so there's no visible jump-cut at the seam).

## How to restore

1. Copy `hero-sky-video.mp4` back into `assets/`.
2. In `index.html`, inside `<section class="hero">`, replace the
   `<div class="hero__sky"><img src="assets/hero-sky.png" alt="" /></div>`
   block with the contents of `hero-sky.html-snippet.html`.
3. In `css/styles.css`, replace the `.hero__sky img { ... }` rule with the
   contents of `hero-sky.css-snippet.css`.
4. In `js/main.js`, paste the contents of `hero-sky.js-snippet.js` back in
   (it was placed between the header-backdrop block and the email-capture
   form-submit block).

## History / iteration notes

- v1: `cinematic_studio_3_0` was the intended model (720p, locked camera)
  but cost 30 credits against a 10-credit balance — dropped to
  `grok_video_v15` at 480p/4s instead.
- v2: added "remove the bigger clouds drifting fast" to the prompt after
  the first result had a large fast-moving cloud crossing the frame.
- v3: added explicit left-to-right pacing + "not obvious that it loops"
  instructions — this regression reintroduced the big fast clouds.
- v4 (final, archived here): reverted to the v2 prompt, dropping the v3
  addition. Combined with the ping-pong JS to solve the loop-seam
  ("blinking") issue without needing ffmpeg (not available in this
  environment) to build a proper reversed+concatenated video file.
- Removed entirely per user request — reverted to the static
  `hero-sky.png` image as the hero background.

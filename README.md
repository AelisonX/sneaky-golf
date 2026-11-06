# Sneaky Golf

AELIS’ØN Lab · playable prototype v0.3

A portrait-first golf game about perfect calculations and terrible sportsmanship. Original geometric characters: a muscular human golfer and a tall, polite robot with limited patience.

## Play

- Your turn: adjust AIM and POWER, follow the gold line and stopping ring, then tap HIT THE BALL. The white ball is yours; the gold ball belongs to the bot.
- Bot's turn: move with the touch pad or WASD/arrow keys. Select a tool, then tap the yellow POUR/DIG button or press Space.
- Water: three puddles per match. Place near the robot's feet to spoil its next shot.
- Dig: three pits per match. Pits slow either ball; digging prompts the bot to investigate.
- Beer: one can per match. Get within pouring distance behind the robot. It disrupts its next shot's power calibration.
- Only a witnessed action counts as a catch. Three catches increase vigilance; five make the robot throw down its club and leave.
- Tools persist on the shared course. Lowest strokes wins. Twelve-stroke limit per player.
- ? pauses; sound is off by default.

## Run locally

Serve `docs/` with any static HTTP server, e.g. `python -m http.server 8000 --directory docs`. Open http://localhost:8000. No build or install required. ES modules require HTTP rather than double-clicking the HTML file.

## GitHub Pages

In Settings → Pages choose Deploy from a branch, main, /docs. Existing deployments using these settings need no changes.

## Verification

Run `node tests/game.test.mjs`. Tests cover visible aim, slider direction, duplicate-shot protection, vision direction, distinct catch counting, fifth-catch rage, beer range and single-use behavior, persistent puddles, robot hole completion and pit friction.

Browser interaction verified: start screen, aim controls, one-tap shooting, turn progression, water count 3 → 2, beer count 1 → 0. The available cloud browser has WebGL disabled, so visual QA used the software fallback. Actual iPhone Safari gesture suppression, GPU rendering and device performance still require device testing.

## Scope and limitations

This is a mechanics prototype, not a pixel-perfect realization of the concept art. Characters use simple original meshes; there is one course, local play only, no telemetry and no accounts. Digging uses discrete circular friction pits rather than continuous terrain deformation. Water destabilizes the bot's stance and slows rolling balls; human slip animation, cinematic replay and evidence photos are not implemented. Robot turns currently use a readable scripted scan cycle. The software renderer is a compatibility fallback with simpler lighting.

## Credits

Game concept and creative direction: Eleanor / AELIS’ØN Lab. Implementation: ChatGPT. Design review: Claude. Three.js r170 is vendored under MIT; see `docs/vendor/THREE-LICENSE.txt`. All characters and course geometry are original; no celebrity likenesses or manufacturer branding are used.

## v0.2 mobile controls

Bounded portrait layout, fixed camera, single-tap tools, range feedback, persistent aim line, explicit power control and hit button. Gesture guards prevent game touches from becoming page scroll, text selection or double-tap zoom. Low-frame-rate ball physics uses substeps.

## v0.3 match completion

Scores count strokes. Evaluate results after a shot stops, preserving the opponent’s chance to tie on that shot. Once one ball is holed and the other player cannot tie or win, settle immediately. A 12-stroke unholed player forfeits; this never counts as holing out. Result cards explicitly label IN THE CUP / NOT HOLED / STROKE LIMIT. Regression tests include a holed human at 2 versus a bot trapped at 6, last-shot ties and exhausted turns.

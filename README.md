# Sneaky Golf

AELIS’ØN Lab · playable prototype v0.1

A portrait-first golf game about perfect calculations and terrible sportsmanship. Original geometric characters: a muscular human golfer and a tall, polite robot with limited patience.

## Play

- Your turn: drag backwards on the course and release to shoot. Short drag = gentle putt. The white ball is yours; the gold ball belongs to the bot.
- Bot's turn: move with the touch pad or WASD/arrow keys. Select a tool, then hold the yellow button or Space.
- Water: three puddles per match. Place near the robot's feet to spoil its next shot.
- Dig: three pits per match. Pits slow either ball; digging prompts the bot to investigate.
- Beer: one can per match. Get within pouring distance behind the robot. It disrupts its next shot's power calibration.
- Only a witnessed action counts as a catch. Three catches increase vigilance; five make the robot throw down its club and leave.
- Tools persist on the shared course. Lowest strokes wins. Twelve-stroke limit per player.
- ? pauses; sound is off by default.

## Run locally

Serve `docs/` with any static HTTP server, e.g. `python -m http.server 8000 --directory docs`. Open http://localhost:8000. No build or install required. ES modules require HTTP rather than double-clicking the HTML file.

## GitHub Pages

In Settings → Pages, select Deploy from a branch, branch main, folder /docs, then Save. No API keys or paid services required.

## Verification

Run `node tests/game.test.mjs`. Tests cover vision direction, distinct catch counting, fifth-catch rage, beer range and single-use behavior, persistent puddles, robot hole completion and pit friction.

Browser interaction verified: start screen, drag-to-shoot and turn progression. The available cloud browser has WebGL disabled, so visual QA used the software fallback. Real iPhone Safari touch/multitouch, GPU rendering and device performance still need user testing.

## Scope and limitations

This is a mechanics prototype, not a pixel-perfect realization of the concept art. Characters use simple original meshes; there is one course, local play only, no telemetry and no accounts. Digging uses discrete circular friction pits rather than continuous terrain deformation. Water destabilizes the bot's stance and slows rolling balls; human slip animation, cinematic replay and evidence photos are not implemented. Robot turns currently use a readable scripted scan cycle. The software renderer is a compatibility fallback with simpler lighting.

## Credits

Game concept and creative direction: Eleanor / AELIS’ØN Lab. Implementation: ChatGPT. Design review: Claude. Three.js r170 is vendored under MIT; see `dist/vendor/THREE-LICENSE.txt`. All characters and course geometry are original; no celebrity likenesses or manufacturer branding are used.

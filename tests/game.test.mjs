import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import * as Three from '../docs/vendor/three.module.js';
const nodes=new Map();function node(s){if(!nodes.has(s))nodes.set(s,{value:0,getBoundingClientRect:()=>({width:390,height:844}),textContent:'',innerHTML:'',style:{},dataset:{tool:'water'},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setPointerCapture(){}});return nodes.get(s)}
class Renderer{constructor(){this.shadowMap={}}setPixelRatio(){}setClearColor(){}setSize(){}render(){}}
let source=fs.readFileSync(new URL('../docs/game.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
const context={T:{...Three,WebGLRenderer:Renderer},SoftwareRenderer:Renderer,document:{querySelector:node,querySelectorAll:()=>[],addEventListener(){},hidden:false},devicePixelRatio:1,innerWidth:390,innerHeight:844,window:{addEventListener(){}},addEventListener(){},performance:{now:()=>0},requestAnimationFrame(){},location:{reload(){}},console,assert};vm.createContext(context);
vm.runInContext(source+`\n
// Five distinct witnessed actions, never five frames of one action.
state.mode='bot';human.g.position.set(0,0,1);robot.g.position.set(0,0,0);scanAngle=0;assert.equal(isSeen(),true);human.g.position.z=-1;assert.equal(isSeen(),false);
for(let i=1;i<=5;i++){catchCooldown=0;actionLock=false;catchPlayer();assert.equal(state.caught,i);catchPlayer();assert.equal(state.caught,i)}assert.equal(state.mode,'rage');
// Tap-only tools: valid range consumes one can, repeat tap cannot consume twice.
state.caught=0;state.mode='bot';state.tool='beer';state.beer=1;actionAnim=0;scanAngle=Math.PI;human.g.position.set(0,0,4);useTool();assert.equal(state.beer,1);human.g.position.set(0,0,1);useTool();assert.equal(state.beer,0);assert.equal(beerHit,true);useTool();assert.equal(state.beer,0);
state.tool='water';state.water=3;actionAnim=0;useTool();assert.equal(state.water,2);assert.equal(state.traps.length,1);useTool();assert.equal(state.water,2);assert.ok(Math.hypot(state.traps[0].x-robot.g.position.x,state.traps[0].z-robot.g.position.z)<1.2);
// Player aim is visible immediately, slider changes alter shot, canvas does not shoot.
state.p=0;state.pDone=false;enterPlayer();assert.equal(line.visible,true);assert.equal(aimTarget.visible,true);assert.equal(state.p,0);$('#aimAngle').value=20;refreshAim();const expected=Math.sin(shotAngle)*shotSpeed;hitBall();assert.equal(state.p,1);assert.ok(Math.abs(moving.vx-expected)<1e-8);hitBall();assert.equal(state.p,1);
// A pit slows a rolling ball, and clean robot shots can finish a hole.
state.traps=[];state.pDone=false;state.bDone=false;state.p=1;state.b=0;ballB.position.set(.9,.14,7);robot.g.position.set(1.55,0,7);beerHit=false;
for(let shot=0;shot<5&&!state.bDone;shot++){botShot();for(let i=0;i<900&&moving;i++)physics(1/60)}assert.equal(state.bDone,true);assert.ok(state.b<=4,'clean robot finishes within par');
state.traps=[];addTrap('dig',0,0);ballP.position.set(0,.14,.7);shoot('p',0,-1,2);for(let i=0;i<15&&moving;i++)physics(1/60);assert.ok(!moving||Math.hypot(moving.vx,moving.vz)<.5,'pit slows ball');
// Exact reported softlock: human holed in two, robot still stuck at six.
moving=null;Object.assign(state,{p:2,b:6,pDone:true,bDone:false,mode:'bot'});assert.equal(matchResult().winner,'player');enterBot();assert.equal(state.mode,'end');assert.ok($('.card').innerHTML.includes('NOT HOLED'));
// Equal strokes only draw when both actually hole out.
Object.assign(state,{p:2,b:2,pDone:true,bDone:false});assert.equal(matchResult().winner,'player');state.bDone=true;assert.equal(matchResult().winner,'draw');
Object.assign(state,{p:2,b:1,pDone:true,bDone:false});assert.equal(matchResult(),null);
// In-flight second shot is allowed to finish and tie, never cut off mid-roll.
ballB.position.set(0,.14,-12.7);shoot('b',0,-1,.7);assert.equal(matchResult(),null);for(let i=0;i<400&&moving;i++)physics(1/60);assert.equal(state.bDone,true);assert.equal(state.mode,'end');assert.ok($('.card').innerHTML.includes('DRAW'));
// Mirrored loss and caps never fabricate a hole-out or recurse between turns.
moving=null;Object.assign(state,{p:3,b:2,pDone:false,bDone:true});assert.equal(matchResult().winner,'bot');
Object.assign(state,{p:12,b:4,pDone:false,bDone:false});enterPlayer();assert.equal(state.mode,'end');assert.equal(state.pDone,false);
Object.assign(state,{p:4,b:12,pDone:false,bDone:false});enterBot();assert.equal(state.mode,'end');assert.equal(state.bDone,false);
// Reproduce a pit-stopped bot shot at equal score: ends as a player win.
Object.assign(state,{p:2,b:1,pDone:true,bDone:false});state.traps=[];addTrap('dig',0,-11);ballB.position.set(0,.14,-11);shoot('b',0,-1,2);for(let i=0;i<400&&moving;i++)physics(1/60);assert.equal(state.mode,'end');assert.ok($('.card').innerHTML.includes('WIN.'));assert.equal(state.bDone,false);
console.log('PASS: reported 2-vs-6 softlock, tie opportunity, settled missed tie shot, mirrored loss, stroke caps, trapped bot end-to-end');
console.log('PASS: vision direction, five catches, catch debounce, beer range/single-use, water persistence/single-use, visible aim/sliders/shot debounce, bot completion, pit physics');
`,context);

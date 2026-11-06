import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import * as Three from '../docs/vendor/three.module.js';
const nodes=new Map();function node(s){if(!nodes.has(s))nodes.set(s,{textContent:'',innerHTML:'',style:{},dataset:{tool:'water'},classList:{add(){},remove(){},toggle(){}},addEventListener(){},setPointerCapture(){}});return nodes.get(s)}
class Renderer{constructor(){this.shadowMap={}}setPixelRatio(){}setClearColor(){}setSize(){}render(){}}
let source=fs.readFileSync(new URL('../docs/game.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
const context={T:{...Three,WebGLRenderer:Renderer},SoftwareRenderer:Renderer,document:{querySelector:node,querySelectorAll:()=>[],addEventListener(){},hidden:false},devicePixelRatio:1,innerWidth:390,innerHeight:844,window:{addEventListener(){}},addEventListener(){},performance:{now:()=>0},requestAnimationFrame(){},location:{reload(){}},console,assert};vm.createContext(context);
vm.runInContext(source+`\n
// Five distinct witnessed actions, never five frames of one action.
state.mode='bot';human.g.position.set(0,0,1);robot.g.position.set(0,0,0);scanAngle=0;assert.equal(isSeen(),true);human.g.position.z=-1;assert.equal(isSeen(),false);
for(let i=1;i<=5;i++){catchCooldown=0;actionLock=false;catchPlayer();assert.equal(state.caught,i);catchPlayer();assert.equal(state.caught,i)}assert.equal(state.mode,'rage');
// Successful beer consumes the only can; out-of-range attempt does not.
state.caught=0;state.mode='bot';state.tool='beer';state.beer=1;actionLock=false;holding=true;scanAngle=Math.PI;human.g.position.set(0,0,4);act(.8);assert.equal(state.beer,1);human.g.position.set(0,0,1);holding=true;actionLock=false;act(.8);assert.equal(state.beer,0);assert.equal(beerHit,true);
// A single hold places only one persistent puddle.
state.tool='water';state.water=3;holding=true;actionLock=false;act(.8);assert.equal(state.water,2);assert.equal(state.traps.length,1);act(.8);assert.equal(state.water,2);
// A pit slows a rolling ball, and clean robot shots can finish a hole.
state.traps=[];state.pDone=false;state.bDone=false;state.p=1;state.b=0;ballB.position.set(.9,.14,7);robot.g.position.set(1.55,0,7);beerHit=false;
for(let shot=0;shot<5&&!state.bDone;shot++){botShot();for(let i=0;i<900&&moving;i++)physics(1/60)}assert.equal(state.bDone,true);assert.ok(state.b<=4,'clean robot finishes within par');
state.traps=[];addTrap('dig',0,0);ballP.position.set(0,.14,.7);shoot('p',0,-1,2);for(let i=0;i<15&&moving;i++)physics(1/60);assert.ok(!moving||Math.hypot(moving.vx,moving.vz)<.5,'pit slows ball');
console.log('PASS: vision direction, five catches, catch debounce, beer range/single-use, water persistence/single-use, bot completion, pit physics');
`,context);

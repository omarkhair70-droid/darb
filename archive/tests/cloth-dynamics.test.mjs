import test from "node:test";
import assert from "node:assert/strict";
import {stepCloth,clothWarpOffset} from "../src/cloth-dynamics.mjs";

test("heavy cloth resists a pull, settles without oscillation and reaches full extension",()=>{
 let state={position:0,velocity:0};
 const positions=[];
 for(let i=0;i<100;i++){
   state=stepCloth(state,1,16.67);
   positions.push(state.position);
 }
 assert.ok(positions[0]>.005&&positions[0]<.04);
 assert.ok(positions.every((v,i)=>i===0||v>=positions[i-1]),"no overshoot and rebound");
 assert.ok(state.position>.999);
 assert.ok(Math.abs(state.velocity)<.000025);
 assert.deepEqual(stepCloth(state,1,16.67),{position:1,velocity:0});
});
test("pull direction can reverse without overshoot and low-motion route is immediate",()=>{
 let state={position:0,velocity:0};
 for(let i=0;i<15;i++)state=stepCloth(state,.8,16.67);
 assert.ok(state.position>0&&state.position<.8);
 const before=state.position;
 for(let i=0;i<120;i++)state=stepCloth(state,.12,16.67);
 assert.ok(state.position<before);
 assert.ok(Math.abs(state.position-.12)<.001);
 assert.deepEqual(stepCloth(state,.67,16.67,{reducedMotion:true}),{position:.67,velocity:0});
});
test("warp displacement is finite at every edge and roll drag is tied to moving yarn",()=>{
 for(const p of [0,.05,.4,.7,1]){
   for(const u of [0,.03,.2,.5,.75,1]){
     assert.ok(Number.isFinite(clothWarpOffset(u,p,.001,.5)));
   }
 }
 const stationary=clothWarpOffset(.7,.7,0,.8);
 const pulling=clothWarpOffset(.7,.7,.001,.8);
 assert.ok(pulling>stationary,"moving roll carries the leading edge");
 assert.ok(Math.abs(clothWarpOffset(0,.7,.001,.8)-clothWarpOffset(0,.7,0,.8))<.001);
});

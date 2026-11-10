import test from "node:test";
import assert from "node:assert/strict";
import {EYES,ritualVisual,chooseSource,availableSources,eyeLocalPosition} from "../src/ritual-material.mjs";

test("three source-backed eyes emerge at different stages with different materials",()=>{
 assert.deepEqual(EYES.map(x=>x.sourceId),[39,41,42]);
 assert.equal(new Set(EYES.map(x=>x.material)).size,3);
 assert.deepEqual(EYES.map(x=>x.from).slice().sort((a,b)=>a-b),EYES.map(x=>x.from));
 assert.deepEqual(availableSources(.1),[]);
 assert.ok(availableSources(.70).includes(39));
 assert.ok(!availableSources(.70).includes(42));
 assert.deepEqual(availableSources(.94),[39,41,42]);
});

test("a D emerges only through a late aligned point of view, never at start",()=>{
 assert.equal(ritualVisual(0).recognition,0);
 assert.equal(ritualVisual(.72).recognition,0);
 const view=ritualVisual(.99,{gaze:.5});
 assert.ok(view.recognition>.99);
 assert.ok(view.openings.every(x=>x.amount>.8));
 const edge=ritualVisual(.99,{gaze:0});
 assert.ok(edge.recognition<view.recognition);
 assert.equal(ritualVisual(.99,{reducedMotion:true,gaze:0}).recognition,view.recognition);
});

test("every accessible source has a stable image position and invalid names cannot enter",()=>{
 for(const eye of EYES){
   const point=eyeLocalPosition(eye,960,550);
   assert.ok(point.x>100&&point.x<860);
   assert.ok(point.y>100&&point.y<470);
   assert.equal(chooseSource(eye.key),eye.sourceId);
 }
 assert.throws(()=>chooseSource("decorative"),/Unknown woven aperture/);
});

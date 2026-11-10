import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {initialRitual,transitionRitual,RITUAL_PHASES} from "../src/entrance-ritual-v2.mjs";

const score=JSON.parse(await readFile(fileURLToPath(new URL("../data/entrance-ritual-v2.score.json",import.meta.url)),"utf8"));

test("score describes one continuous passage without fixed timed slides",()=>{
  assert.deepEqual(score.phases.map(p=>p.id),RITUAL_PHASES);
  assert.ok(score.phases.every(p=>!Object.hasOwn(p,"durationMs")));
  assert.deepEqual(score.sourceContext.objectIds,[39,40,41,42]);
  assert.equal(score.sourceContext.textileIsArchiveObject,false);
  assert.equal(score.factsAndInterpretation.audio.includes("No autoplay"),true);
});

test("every narrative transition needs a physical event, not a timer",()=>{
  let s=initialRitual();
  for(const event of ["START","CLOTH_EXTENDED","APERTURES_REVEALED","VIEW_ALIGNED"]){
    s=transitionRitual(s,event);
  }
  assert.equal(s.phase,"passage");
  assert.throws(()=>transitionRitual(s,"SOURCE_SELECTED",{sourceId:0}),/real source/);
  s=transitionRitual(s,"SOURCE_SELECTED",{sourceId:41});
  assert.equal(s.phase,"arrived");
  assert.equal(s.chosenSourceId,41);
  assert.equal(s.completed,true);
  assert.deepEqual(s.history,RITUAL_PHASES);
});

test("the visitor may bypass the ritual at any point and deliberately replay it",()=>{
  let s=transitionRitual(initialRitual(),"START");
  s=transitionRitual(s,"ENTER_ARCHIVE",{sourceId:39});
  assert.equal(s.phase,"arrived");
  assert.equal(s.chosenSourceId,39);
  assert.throws(()=>transitionRitual(s,"VIEW_ALIGNED"),/already arrived/);
  s=transitionRitual(s,"REPLAY");
  assert.equal(s.phase,"unlit");
  assert.equal(s.completed,false);
});

test("sound cannot start automatically, and reduced motion preserves choices",()=>{
  let s=initialRitual({reducedMotion:true});
  assert.equal(s.quiet,true);
  assert.equal(s.reducedMotion,true);
  s=transitionRitual(s,"START");
  s=transitionRitual(s,"ENABLE_SOUND"); // explicitly invoked interaction
  assert.equal(s.quiet,false);
  s=transitionRitual(s,"SET_QUIET");
  assert.equal(s.quiet,true);
  s=transitionRitual(s,"ENTER_ARCHIVE");
  assert.equal(s.completed,true);
});

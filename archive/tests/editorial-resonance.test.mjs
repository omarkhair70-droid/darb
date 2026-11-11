import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {layoutCatalog} from "../src/world-layout.mjs";
import {writingVoiceResonance,WRITING_VOICE_DRAMATURGY} from "../src/editorial-resonance.mjs";

const catalog=JSON.parse(readFileSync(new URL("../data/media-catalog.json",import.meta.url)));
const threads=JSON.parse(readFileSync(new URL("../data/curatorial-threads.json",import.meta.url)));
const sources=layoutCatalog(catalog);

test("writing ↔ voice passage uses both actual source positions and documented editorial type",()=>{
 const passage=writingVoiceResonance(44,47,sources,threads);
 assert.ok(passage);
 const from=sources.find(r=>r.id===44),to=sources.find(r=>r.id===47);
 assert.equal(passage.from.x,from.x+from.w/2);
 assert.equal(passage.from.y,from.y+from.h/2);
 assert.equal(passage.to.x,to.x+to.w/2);
 assert.equal(passage.to.y,to.y+to.h/2);
 assert.equal(passage.type,"editorial-comparison");
 assert.deepEqual(passage.sourcePages,[12,13]);
 assert.equal(passage.title.en,"Collective expression");
 assert.equal(passage.strands.length,8);
 for(const strand of passage.strands){
  assert.ok(strand.d.startsWith(`M ${passage.from.x} ${passage.from.y} C `));
  assert.ok(strand.d.endsWith(`${passage.to.x} ${passage.to.y}`));
 }
 const reversed=writingVoiceResonance(47,44,sources,threads);
 assert.deepEqual(reversed.from,passage.to);
 assert.deepEqual(reversed.to,passage.from);
});

test("no transition for merely adjacent artworks or unsupported invented source relations",()=>{
 assert.equal(writingVoiceResonance(44,48,sources,threads),null);
 assert.equal(writingVoiceResonance(43,47,sources,threads),null);
 assert.equal(writingVoiceResonance(44,47,sources,{connections:[]}),null);
 const falseThread={connections:[{...threads.connections.find(x=>x.id==="voice"),type:"documented-collaboration"}]};
 assert.equal(writingVoiceResonance(44,47,sources,falseThread),null);
 assert.equal(writingVoiceResonance(44,47,sources.filter(x=>x.id!==47),threads),null);
});

test("curatorial release has three contiguous acts without turning an invented metaphor into provenance",()=>{
 const score=WRITING_VOICE_DRAMATURGY;
 assert.equal(score.direction,"voice-held-inside-writing");
 assert.equal(score.durationMs,3000);
 assert.equal(score.holdMs,score.acts[2].fromMs);
 assert.deepEqual(score.acts.map(act=>act.id),["held","strain","release"]);
 assert.equal(score.acts[0].fromMs,0);
 assert.equal(score.acts[2].toMs,score.durationMs);
 for(let i=1;i<score.acts.length;i++)
  assert.equal(score.acts[i-1].toMs,score.acts[i].fromMs);
 const passage=writingVoiceResonance(44,47,sources,threads);
 assert.equal(passage.type,"editorial-comparison");
 assert.deepEqual(passage.sourcePages,[12,13]);
});

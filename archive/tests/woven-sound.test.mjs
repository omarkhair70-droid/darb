import test from "node:test";
import assert from "node:assert/strict";
import {WovenSound} from "../src/woven-sound.mjs";

test("the original tactile audio never creates a context or plays without consent",async()=>{
 const original=globalThis.window;
 let constructed=0,createdBuffers=0,closed=0;
 const peakGainValues=[];
 class FakeAudioContext{
  constructor(){constructed++;this.state="running";this.currentTime=.5;this.sampleRate=24000;this.destination={};}
  async resume(){this.state="running";}
  createBuffer(channels,frames){createdBuffers++;return {getChannelData:()=>new Float32Array(frames)};}
  createBufferSource(){return {buffer:null,connect(){},start(){},stop(){},disconnect(){},onended:null};}
  createBiquadFilter(){return {type:"",frequency:{setValueAtTime(){}},Q:{value:0},connect(){},disconnect(){}};}
  createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(value){peakGainValues.push(value)}},connect(){},disconnect(){}};}
  async close(){this.state="closed";closed++;}
 }
 try{
  globalThis.window={AudioContext:FakeAudioContext};
  const sound=new WovenSound();
  assert.equal(constructed,0);
  assert.equal(sound.enabled,false);
  sound.rustle(.6);
  assert.equal(createdBuffers,0);
  assert.equal(await sound.enable(),true);
  assert.equal(constructed,1);
  sound.rustle(.5);
  assert.equal(createdBuffers,1);
  // The deliberately louder texture remains short and below a safe digital peak.
  assert.ok(peakGainValues.some(v=>v>=.17&&v<=.32));
  assert.ok(peakGainValues.every(v=>v<=.32));
  sound.disable();
  sound.rustle(.8);
  assert.equal(createdBuffers,1);
  await sound.dispose();
  assert.equal(closed,1);
 }finally{
  if(original===undefined)delete globalThis.window;
  else globalThis.window=original;
 }
});

test("noise is generated locally and remains bounded without samples or music",()=>{
 const sound=new WovenSound();
 const values=Array.from({length:500},()=>sound.nextNoise());
 assert.ok(values.every(v=>v>=-1&&v<=1));
 assert.ok(new Set(values.map(x=>x.toFixed(3))).size>100);
});

/**
 * An original tactile sound study for Darb Entrance Ritual V2.
 * Not a sample, recorded human voice, existing music or auto-playing ambience.
 * Web Audio resources are created ONLY after a deliberate visitor click.
 */
export class WovenSound {
 constructor(){
  this.context=null;this.enabled=false;this.lastSoundAt=-Infinity;this.seed=70121;
 }
 async enable(){
  if(this.enabled)return true;
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return false;
  if(!this.context)this.context=new Audio({latencyHint:"interactive"});
  await this.context.resume();
  this.enabled=this.context.state==="running";
  return this.enabled;
 }
 disable(){
  this.enabled=false;
 }
 nextNoise(){
  this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;
  return this.seed/4294967296*2-1;
 }
 rustle(intensity=.25){
  const ctx=this.context;
  if(!this.enabled||!ctx||ctx.state!=="running")return;
  const now=ctx.currentTime;
  // Low-intensity fiber friction cannot become a machine-gun click on dragging.
  if(now-this.lastSoundAt<.058)return;
  this.lastSoundAt=now;
  const level=Math.max(.09,Math.min(.9,intensity));
  const dur=.13+.13*level, frames=Math.max(1,Math.floor(ctx.sampleRate*dur));
  const buffer=ctx.createBuffer(1,frames,ctx.sampleRate);
  const channel=buffer.getChannelData(0);
  let previous=0;
  for(let i=0;i<frames;i++){
   const noise=this.nextNoise();
   previous=previous*.58+noise*.42;
   // Fibers rub in clusters rather than a single isolated electronic click.
   const fray=.76+.24*Math.sin(i*.011+level*3);
   channel[i]=previous*fray;
  }
  const source=ctx.createBufferSource();source.buffer=buffer;
  const filter=ctx.createBiquadFilter();filter.type="lowpass";
  filter.frequency.setValueAtTime(2200+level*1500,now);
  filter.Q.value=.58;
  const gain=ctx.createGain();
  gain.gain.setValueAtTime(.00001,now);
  // Noticeably louder than the first study (~5x at normal pull strength),
  // but limited to a short non-clipping acoustic gesture.
  const peak=Math.min(.32,.135+level*.18);
  gain.gain.exponentialRampToValueAtTime(peak,now+.017);
  gain.gain.exponentialRampToValueAtTime(peak*.72,now+dur*.43);
  gain.gain.exponentialRampToValueAtTime(.00001,now+dur);
  source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);
  source.start(now);source.stop(now+dur+.008);
  source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
 }
 async dispose(){
  this.enabled=false;
  if(this.context&&this.context.state!=="closed"){
   const ctx=this.context;
   this.context=null;
   try{await ctx.close();}catch(e){/* device already released */}
  }
 }
}

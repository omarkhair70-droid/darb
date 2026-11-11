/**
 * A material encounter between documented *separate* programmes.
 * This is a curatorial comparison, not evidence of collaboration or a
 * chronological relationship. Every strand starts/ends at real atlas items.
 */
// Curatorial interpretation chosen for the #44 → #47 study:
// A voice was already inside the writing, under pressure, and is released.
// This is an emotional metaphor, NEVER a documented claim about participants.
export const WRITING_VOICE_DRAMATURGY=Object.freeze({
 direction:"voice-held-inside-writing",
 durationMs:3000,
 holdMs:950,
 acts:Object.freeze([
  Object.freeze({id:"held",fromMs:0,toMs:650}),
  Object.freeze({id:"strain",fromMs:650,toMs:1100}),
  Object.freeze({id:"release",fromMs:1100,toMs:3000})
 ])
});

export function writingVoiceResonance(fromId,toId,records,threads){
 const order=(fromId===44&&toId===47)||(fromId===47&&toId===44);
 if(!order||!Array.isArray(records)||!Array.isArray(threads?.connections))return null;
 const evidence=threads.connections.find(t=>t.id==="voice"&&t.type==="editorial-comparison"&&
  t.fromId===44&&t.toId===47&&Array.isArray(t.sourcePages)&&
  t.sourcePages.includes(12)&&t.sourcePages.includes(13));
 if(!evidence)return null;
 const from=records.find(r=>r.id===fromId),to=records.find(r=>r.id===toId);
 if(!from||!to||!from.display||!to.display||from.cluster===to.cluster)return null;
 const center=item=>({x:item.x+item.w*.5,y:item.y+item.h*.5});
 const a=center(from),b=center(to),dx=b.x-a.x,dy=b.y-a.y;
 const length=Math.hypot(dx,dy);
 if(!Number.isFinite(length)||length<10)return null;
 const normal={x:-dy/length,y:dx/length};
 const curve=(offset,spread)=>{
  const bend=Math.min(250,length*.13),sign=fromId===44?1:-1;
  const cx1=a.x+dx*.32+normal.x*(bend*sign+offset);
  const cy1=a.y+dy*.32+normal.y*(bend*sign+offset);
  const cx2=b.x-dx*.26-normal.x*(bend*.48*sign-spread);
  const cy2=b.y-dy*.26-normal.y*(bend*.48*sign-spread);
  return `M ${a.x} ${a.y} C ${cx1.toFixed(2)} ${cy1.toFixed(2)} ${cx2.toFixed(2)} ${cy2.toFixed(2)} ${b.x} ${b.y}`;
 };
 // Hairlines leave the source like ink and arrive as a different density
 // of repeated waves. This is new authored visual language, not archive fact.
 const strands=[
  {kind:"axis",d:curve(0,0)},
  ...Array.from({length:7},(_,i)=>{
   const k=i-3;
   return {kind:i%2?"paper":"voice",d:curve(k*24,k*9)};
  })
 ];
 return {
  id:"writing-voice",threadId:evidence.id,type:evidence.type,
  fromId,toId,from:a,to:b,strands,
  title:evidence.title,description:evidence.description,
  sourcePages:[...evidence.sourcePages]
 };
}

// Entrance Ritual 06B — authored material rhythm and three source-linked gaze positions.
// Pure functions so rendering, pointer hit testing and QA use the exact same score.
// These are contemporary artistic apertures, NOT historical religious eye symbols.
export const EYES=Object.freeze([
  Object.freeze({key:"witness",sourceId:39,x:.27,y:.25,from:.58,to:.76,material:"unstitched-seam"}),
  Object.freeze({key:"retained",sourceId:41,x:.27,y:.75,from:.69,to:.88,material:"worn-layer"}),
  Object.freeze({key:"visitor",sourceId:42,x:.80,y:.50,from:.78,to:.98,material:"parallax-gap"})
]);
export const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
export function smooth(a,b,v){
  const t=clamp((v-a)/(b-a));
  return t*t*(3-2*t);
}
export function ritualVisual(p,{gaze=.5,reducedMotion=false}={}){
  const progress=clamp(p);
  const alignment=reducedMotion?1:1-Math.abs(clamp(gaze)*2-1)*.3;
  return {
    progress,unfurled:smooth(.03,.61,progress),
    openings:EYES.map(eye=>({key:eye.key,sourceId:eye.sourceId,
      amount:smooth(eye.from,eye.to,progress)*(eye.key==="visitor"?alignment:1)})),
    recognition:smooth(.86,.985,progress)*alignment,
    paths:smooth(.87,1,progress)
  };
}
export function eyeLocalPosition(eye,w,h){
  return {x:eye.x*w,y:eye.y*h};
}
export function chooseSource(key){
 const target=EYES.find(e=>e.key===key);
 if(!target)throw new Error("Unknown woven aperture "+key);
 return target.sourceId;
}
// A selection is only offered after the actual material aperture has emerged.
export function availableSources(progress){
 const state=ritualVisual(progress);
 return state.openings.filter(e=>e.amount>.54).map(e=>e.sourceId);
}

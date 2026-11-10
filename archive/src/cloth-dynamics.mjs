/**
 * A critically damped textile pull rather than a progress-driven reveal.
 * Pure mathematics: mouse, touch, keyboard and reduced motion share it.
 * position and target are normalized [0,1]; velocity is per millisecond.
 */
export const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));

export function stepCloth(state,target,elapsedMs,{reducedMotion=false}={}){
  const destination=clamp(target);
  if(reducedMotion)return {position:destination,velocity:0};
  const dt=clamp(Number.isFinite(elapsedMs)?elapsedMs:16.67,0,80);
  const omega=.0125; // critical damping: immediate resistance, no oscillation
  const displacement=clamp(state.position)-destination;
  const velocity=Number.isFinite(state.velocity)?state.velocity:0;
  const basis=velocity+omega*displacement;
  const attenuation=Math.exp(-omega*dt);
  const remaining=(displacement+basis*dt)*attenuation;
  const nextVelocity=(velocity-omega*basis*dt)*attenuation;
  if(Math.abs(remaining)<.0006&&Math.abs(nextVelocity)<.000025)
    return {position:destination,velocity:0};
  return {position:clamp(destination+remaining),velocity:nextVelocity};
}

/**
 * Displacement shared by every woven strip, the upper selvage and underside.
 * The cloth hangs while partially unfurled, then the roll pulls the free edge
 * slightly behind its target before settling. No fake free-floating warp.
 */
export function clothWarpOffset(u,progress,velocity,scale=1){
  const p=clamp(progress),reveal=.06+p*.94;
  const relative=clamp(u/reveal);
  const ripples=(Math.sin(u*17+p*5)*3.1+Math.sin(u*6)*5.5)*scale;
  const tension=Math.sin(u*Math.PI)*12*scale*(1-p*.35);
  const slope=(u-.3)*11*scale;
  const hanging=Math.sin(relative*Math.PI)**2*(1-p)*15*scale;
  const rollDrag=Math.pow(relative,3)*clamp(velocity*125,-.20,.20)*37*scale;
  return ripples-tension+slope+hanging+rollDrag;
}

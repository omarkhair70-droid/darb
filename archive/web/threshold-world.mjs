/**
 * Stage 09 — The Woven Threshold
 *
 * An authored spatial atmosphere around the SAME physical cloth. Every
 * photographic apparition is a real record reached from an actual aperture
 * (39 / 41 / 42); neither abstract scenery nor the textile is presented as
 * documentary evidence of a historical Darb location.
 *
 * Canvas-only: no extra hero DOM, no image cards, no forced chapter menu.
 */
import {EYES} from "/ritual-material.mjs";

const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const smooth=(a,b,v)=>{
 const t=clamp((v-a)/(b-a));
 return t*t*(3-2*t);
};

export function clothGeometry(w,h,progress=0){
 const scale=w<700?clamp(w/1100,.34,.58):Math.min(w/1300,h/860,.99);
 const width=960*scale,height=550*scale;
 const release=smooth(.02,.74,progress);
 return {
  scale,width,height,rotation:w<680?-.12:-.095,
  centerX:w*.5+(1-release)*width*.42,
  centerY:h*((w<700?.38:.43)+(1-release)*.10)
 };
}

export function projectWovenEye(eye,w,h,progress=1){
 const {width,height,centerX,centerY,rotation}=clothGeometry(w,h,progress);
 const x=width*(eye.x-.50),y=height*(eye.y-.48);
 return {
  x:centerX+x*Math.cos(rotation)-y*Math.sin(rotation),
  y:centerY+x*Math.sin(rotation)+y*Math.cos(rotation)
 };
}

export function thresholdEchoes(progress){
 return EYES.filter(e=>smooth(e.from-.06,e.to,progress)>.12).length;
}

function atmosphere(c,w,h,p,t,reduced){
 const breathing=reduced?0:Math.sin(t*.00027)*.055;
 const v=c.createRadialGradient(w*.52,h*.42,10,w*.52,h*.54,Math.max(w,h)*.78);
 v.addColorStop(0,"rgba(117,82,57,.12)");
 v.addColorStop(.40,"rgba(48,42,33,.07)");
 v.addColorStop(1,"rgba(1,7,7,.46)");
 c.fillStyle=v;c.fillRect(0,0,w,h);
 const origin={x:w*.50,y:h*(w<700?.40:.43)};
 // A shallow impression of room depth: surfaces inferred from grazing light,
 // not generic arches or a fake architectural model of Fustat.
 c.save();
 c.globalAlpha=.22+smooth(.06,.55,p)*.17;
 c.lineWidth=Math.max(1,w/1700);
 c.strokeStyle="rgba(189,146,104,.22)";
 for(const [x,y] of [[-.18,.24],[1.15,.23],[-.10,1.06],[1.12,1.06]]){
  c.beginPath();c.moveTo(origin.x,origin.y);
  c.quadraticCurveTo(w*(.5+x)*.5,h*(y+.25)*.5,w*x,h*y);
  c.stroke();
 }
 c.restore();
 c.save();
 c.globalCompositeOperation="screen";
 const shaft=c.createLinearGradient(w*.08,h*.1,w*.8,h*.97);
 shaft.addColorStop(0,"rgba(231,193,131,.00)");
 shaft.addColorStop(.31,"rgba(215,153,105,"+(.025+smooth(.12,.72,p)*.055+breathing*.1)+")");
 shaft.addColorStop(.7,"rgba(177,130,91,.009)");
 shaft.addColorStop(1,"rgba(173,131,103,0)");
 c.fillStyle=shaft;
 c.beginPath();c.moveTo(w*.12,-h*.1);c.lineTo(w*.35,-h*.1);
 c.lineTo(w*.90,h*1.07);c.lineTo(w*.54,h*1.07);c.closePath();c.fill();
 c.restore();
 // Finite tactile particles become legible only near the woven edge. There is
 // no perpetual particle system consuming CPU while visitors are reading.
 const density=smooth(.03,.74,p);
 c.save();c.globalAlpha=.08+.15*density;c.fillStyle="#d9bda0";
 const n=w<700?31:62;
 for(let i=0;i<n;i++){
  const seed=((i*7919+104729)%7919)/7919;
  const jitter=reduced?0:Math.sin(t*.00012+i*1.83)*1.8;
  const px=(seed*w*.93+w*.035),py=(((i*2161)%2081)/2081)*h;
  c.beginPath();c.arc(px+jitter,py+jitter*.3,(i%7===0?1.2:.43),0,Math.PI*2);c.fill();
 }
 c.restore();
}

function positionForEcho(index,w,h){
 if(w<700){
  return [
   {x:w*.22,y:h*.12,w:w*.30,h:h*.15,rotate:-.23},
   {x:w*.77,y:h*.17,w:w*.25,h:h*.16,rotate:.16},
   {x:w*.81,y:h*.59,w:w*.28,h:h*.17,rotate:-.20}
  ][index];
 }
 return [
  {x:w*.13,y:h*.35,w:w*.20,h:h*.32,rotate:-.14},
  {x:w*.83,y:h*.23,w:w*.22,h:h*.35,rotate:.11},
  {x:w*.84,y:h*.68,w:w*.19,h:h*.27,rotate:-.17}
 ][index];
}

function impression(c,photo,where,amount,parallax){
 if(amount<=0||!photo?.complete||!photo.naturalWidth)return;
 const {x,y,w,h,rotate}=where;
 c.save();
 c.translate(x+parallax.x,y+parallax.y);
 c.rotate(rotate);
 c.globalAlpha=amount*.35;
 c.filter="grayscale(.63) sepia(.25) contrast(.8) blur(1.8px)";
 // A projected, irregular photographic echo dissolving into the implied room
 // surface. Not a rectangular thumbnail or a UI card.
 c.beginPath();
 c.moveTo(-w*.49,-h*.45);
 c.bezierCurveTo(-w*.09,-h*.56,w*.43,-h*.41,w*.53,-h*.29);
 c.quadraticCurveTo(w*.47,h*.14,w*.42,h*.47);
 c.bezierCurveTo(w*.05,h*.43,-w*.39,h*.57,-w*.48,h*.32);
 c.closePath();c.clip();
 const imageRatio=photo.naturalWidth/photo.naturalHeight;
 const destRatio=w/h;
 let dw,dh;
 if(imageRatio>destRatio){dh=h*1.24;dw=dh*imageRatio;}
 else{dw=w*1.22;dh=dw/imageRatio;}
 c.drawImage(photo,-dw/2,-dh/2,dw,dh);
 c.filter="none";
 const tint=c.createLinearGradient(-w*.55,-h*.5,w*.55,h*.6);
 tint.addColorStop(0,"rgba(33,33,24,.56)");
 tint.addColorStop(.44,"rgba(73,50,34,.15)");
 tint.addColorStop(1,"rgba(10,23,19,.78)");
 c.fillStyle=tint;c.fillRect(-w/2,-h/2,w,h);
 c.restore();
}

function filament(c,point,where,power,index){
 if(power<=0)return;
 const x=where.x,y=where.y;
 c.save();c.lineCap="round";
 const offsets=[-6,-2,1.5,4.2];
 for(let j=0;j<offsets.length;j++){
  const offset=offsets[j];
  c.beginPath();c.moveTo(point.x+offset*.18,point.y+offset*.2);
  const sway=(index-1)*27+offset*1.4;
  c.bezierCurveTo(point.x+(x-point.x)*.40,point.y+sway,
   x-(x-point.x)*.27,y-sway*.4,x+offset*.2,y+offset*.3);
  c.globalAlpha=power*(j===0?.32:.23);
  c.strokeStyle=j%2?"#cfb39a":"#86a79a";
  c.lineWidth=j===0?1.1:.55;c.stroke();
 }
 c.restore();
}

/**
 * Draw after the base background, BEFORE rendering the textile. World surfaces,
 * trace evidence and light fall behind the physical rug.
 */
export function drawThresholdBehind(c,{w,h,progress,gaze,time=0,reducedMotion=false,photos=[]}){
 const p=clamp(progress),t=reducedMotion?0:time;
 atmosphere(c,w,h,p,t,reducedMotion);
 const look=reducedMotion?0:(gaze-.5);
 EYES.forEach((eye,i)=>{
  const amount=smooth(eye.from-.05,eye.to,p);
  if(amount<=0)return;
  const pos=positionForEcho(i,w,h);
  const parallax={x:look*(i===1?-19:26),y:look*(i===2?9:-7)};
  const anchor=projectWovenEye(eye,w,h,p);
  filament(c,anchor,{x:pos.x+parallax.x,y:pos.y+parallax.y},amount,i);
  impression(c,photos[i],pos,amount,parallax);
 });
}

/**
 * Draw after the rug. A few fiber reflections pass through the foreground,
 * demonstrating that the source-linked textile extends into the visitor's
 * entire frame rather than ending at the rectangular weave edge.
 */
export function drawThresholdInFront(c,{w,h,progress,gaze,time=0,reducedMotion=false}){
 const p=clamp(progress);
 const strength=smooth(.32,.90,p);
 if(strength<=0)return;
 const t=reducedMotion?0:time;
 const drift=reducedMotion?0:Math.sin(t*.00036)*8;
 c.save();
 c.globalAlpha=strength*.14;
 for(let i=0;i<11;i++){
  const y=h*(.22+i*.056);
  const flip=i%2?-1:1;
  c.beginPath();
  c.moveTo(-w*.03,y+drift*flip);
  c.bezierCurveTo(w*.16,y-11*flip,w*.19,y+27*flip,w*.28,y+18*flip);
  c.strokeStyle=i%3?"#bfa78c":"#7eaba1";
  c.lineWidth=i%5?0.65:1.2;c.stroke();
 }
 const glow=c.createRadialGradient(w*.52,h*.45,0,w*.52,h*.45,w*.72);
 glow.addColorStop(0,"rgba(0,0,0,0)");
 glow.addColorStop(.62,"rgba(0,0,0,0)");
 glow.addColorStop(1,"rgba(4,12,10,.27)");
 c.fillStyle=glow;c.fillRect(0,0,w,h);
 c.restore();
}

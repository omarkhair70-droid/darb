import {initialRitual,transitionRitual} from "/entrance-ritual-v2.mjs";

// Slice 06A: an original, contemporary procedural textile study. It does NOT
// represent a documented Darb carpet or reproduce a historical museum artifact.
const active=new URLSearchParams(location.search).get("entrance")==="v2";
if(active)mountEntranceLab();

function mountEntranceLab(){
 const root=document.querySelector("#entranceLab");
 if(!root)return;
 root.hidden=false;
 document.documentElement.classList.add("ritual-lab-active");
 const archive=document.querySelector("#experience");
 const reading=document.querySelector("#reading");
 if(archive)archive.inert=true;
 if(reading)reading.inert=true;
 const canvas=root.querySelector("canvas");
 const ctx=canvas.getContext("2d",{alpha:false,desynchronized:true});
 const pull=root.querySelector("#ritualPull");
 const skip=root.querySelector("#ritualSkip");
 const enter=root.querySelector("#ritualEnter");
 const locale=root.querySelector("#ritualLanguage");
 const accessibility=root.querySelector("#ritualReduced");
 const status=root.querySelector("#ritualStatus");
 const label=root.querySelector("#ritualInstruction");
 const el=(id)=>root.querySelector("#"+id);
 const fmt={
  en:{lab:"06A / MATERIAL STUDY",early:"A fragment of memory.",progress:"Pull the woven edge.",opened:"The first witness is revealed.",instruction:"DRAG THE FRINGE / SCROLL / PRESS SPACE",
    pulling:"CONTINUE THE UNFURLING",enter:"FOLLOW THIS TRACE ↗",skip:"ENTER ARCHIVE ↗",reduced:"STILL STUDY",
    audio:"SILENT BY DESIGN",language:"عربي",hint:"An original textile study—not a historic Darb object.",source:"SOURCE / TALES OF FUSTAT · P.11"},
  ar:{lab:"٠٦أ / دراسة الخامة",early:"طرف من الذاكرة.",progress:"اسحب حافة النسيج.",opened:"العين الأولى بدأت تشهد.",instruction:"اسحب الطرف / مرّر / اضغط مسافة",
    pulling:"كمّل فرد النسيج",enter:"اتبع الأثر ↗",skip:"ادخل الأرشيف ↗",reduced:"مشهد ثابت",
    audio:"الصمت جزء من التصميم",language:"EN",hint:"نسيج بصري جديد، مش قطعة تاريخية من مقتنيات درب.",source:"حكاوي الفسطاط · صفحة ١١"}
 };
 let lang="en",ritual=initialRitual({reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches});
 let progress=0,targetProgress=0,last=0,raf=0,drag=null,departed=false;
 const photo=new Image();
 photo.src="/media/39.jpeg";
 photo.decoding="async";
 photo.onload=()=>invalidate();
 const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
 const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
 const noise=(x,y)=>{let n=(x*374761393+y*668265263)|0;n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295};
 const texture=makeTextile(1152,800);
 function texLine(c,x1,y1,x2,y2,col,w){
  c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();
 }
 function makeTextile(w,h){
  const cv=document.createElement("canvas");cv.width=w;cv.height=h;
  const c=cv.getContext("2d");
  c.fillStyle="#783f36";c.fillRect(0,0,w,h);
  const grain=c.createImageData(w,h);const d=grain.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const n=noise(x,y),soft=noise(x>>3,y>>3),strand=((x%4)===0?11:-5)+((y%3)===0?6:-4);
   const a=clamp((soft-.5)*22+(n-.5)*22+strand,-30,30);
   const i=(y*w+x)*4;d[i]=clamp(119+a,0,255);d[i+1]=clamp(66+a*.77,0,255);
   d[i+2]=clamp(57+a*.58,0,255);d[i+3]=255;
  }
  c.putImageData(grain,0,0);
  // Entire design is original and intentionally irregular. Broad woven bands,
  // geometric repairs and open lattice are distinct from any museum specimen.
  const margin=64;
  c.strokeStyle="#c59d70";c.lineWidth=20;c.strokeRect(margin,margin,w-margin*2,h-margin*2);
  c.strokeStyle="#314c4b";c.lineWidth=9;c.strokeRect(margin+22,margin+22,w-2*(margin+22),h-2*(margin+22));
  c.strokeStyle="#d0ae76";c.lineWidth=2;c.strokeRect(margin+29,margin+29,w-2*(margin+29),h-2*(margin+29));
  for(let y=115;y<h-90;y+=106){
   for(let x=127;x<w-90;x+=116){
    const shift=((Math.floor(y/106)%2)*51);
    const cx=x+shift,cy=y;
    const r=21+noise(x,y)*6;
    c.save();c.translate(cx,cy);c.rotate(Math.PI/4);
    c.globalAlpha=.65+noise(y,x)*.18;c.fillStyle="#344e4b";c.fillRect(-r,-r,r*2,r*2);
    c.strokeStyle="#cfb786";c.lineWidth=4;c.strokeRect(-r+5,-r+5,2*r-10,2*r-10);
    c.fillStyle="#c07b64";c.beginPath();c.ellipse(0,0,r*.42,r*.42,0,0,Math.PI*2);c.fill();
    c.strokeStyle="#d7b489";c.lineWidth=2;
    for(let a=0;a<8;a++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(a*Math.PI/4)*r*.65,Math.cos(a*Math.PI/4)*r*.65);c.stroke()}
    c.restore();
   }
  }
  // Sparse human-scale repairs: no mirrored ornamental symmetry.
  for(let j=0;j<27;j++){
   const x=120+noise(j,16)*(w-240),y=90+noise(41,j)*(h-180);
   const len=12+noise(j,91)*48;
   texLine(c,x,y,x+len,y+(noise(91,j)-.5)*7,"#d8b29a88",.5+noise(j,71));
  }
  // Inset warp lines: visible when approaching the fabric.
  c.globalAlpha=.19;
  for(let x=0;x<w;x+=4){texLine(c,x,0,x,h,x%12===0?"#e2b992":"#2d3434",x%12===0?1:.55);}
  c.globalAlpha=.17;
  for(let y=0;y<h;y+=3){texLine(c,0,y,w,y,y%12===0?"#d8bca1":"#202d2a",y%12===0?1:.4);}
  c.globalAlpha=1;
  // Worn corner / natural scuff; not a flat noise overlay.
  c.globalCompositeOperation="screen";
  for(let j=0;j<1700;j++){
   const x=noise(j,76)*w,y=noise(j,121)*h;
   if(noise(j,15)>.18){c.fillStyle="rgba(219,197,155,.035)";c.fillRect(x,y,1+noise(j,17)*4,1+noise(j,18)*2)}
  }
  c.globalCompositeOperation="source-over";
  return cv;
 }
 function renderText(){
  const t=fmt[lang];
  el("ritualLabel").textContent=t.lab;
  el("ritualTitle").textContent=progress<.09?t.early:progress<.64?t.progress:t.opened;
  label.textContent=t.instruction;
  pull.textContent=t.pulling;
  enter.textContent=t.enter;
  skip.textContent=t.skip;
  locale.textContent=t.language;
  accessibility.textContent=t.reduced;
  el("ritualSound").textContent=t.audio;
  el("ritualFootnote").textContent=t.hint;
  el("ritualSource").textContent=t.source;
  root.dir=lang==="ar"?"rtl":"ltr";
  status.textContent=Math.round(progress*100)+"%";
  const shown=progress>.77;
  enter.hidden=!shown;
  pull.hidden=shown;
 }
 function setProgress(n){
  targetProgress=clamp(n,0,1);
  if(ritual.phase==="unlit"&&targetProgress>.02)ritual=transitionRitual(ritual,"START");
  if(ritual.phase==="unfurl"&&targetProgress>.59)ritual=transitionRitual(ritual,"CLOTH_EXTENDED");
  if(ritual.reducedMotion)progress=targetProgress;
  invalidate();
 }
 function resize(){
  const dpi=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.max(1,Math.round(innerWidth*dpi));
  canvas.height=Math.max(1,Math.round(innerHeight*dpi));
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  ctx.setTransform(dpi,0,0,dpi,0,0);
  invalidate();
 }
 function invalidate(){if(!raf&&!departed)raf=requestAnimationFrame(frame);}
 function frame(time){
  raf=0;
  const dt=last?Math.min(80,time-last):16.67;last=time;
  if(!ritual.reducedMotion)progress+=(targetProgress-progress)*(1-Math.exp(-dt/180));
  if(Math.abs(targetProgress-progress)<.001)progress=targetProgress;
  render();
  if(progress!==targetProgress)invalidate();
 }
 function eye(c,x,y,size,amount){
  if(amount<=0)return;
  const ew=size*(.42+.58*amount),eh=size*.26*amount;
  c.save();
  // The lens is created by a break in the cloth: upper/lower seam tension,
  // NOT an iris graphic. The source photo lives physically behind the slit.
  c.shadowColor="#000b";c.shadowBlur=20;
  c.beginPath();c.moveTo(x-ew,y);
  c.bezierCurveTo(x-ew*.44,y-eh*1.1,x+ew*.46,y-eh*.95,x+ew,y);
  c.bezierCurveTo(x+ew*.54,y+eh*.9,x-ew*.46,y+eh*1.07,x-ew,y);c.closePath();
  c.fillStyle="#071616";c.fill();
  c.shadowBlur=0;c.clip();
  if(photo.complete&&photo.naturalWidth){
   const iw=ew*2.25,ih=eh*4;
   c.globalAlpha=.9;
   c.drawImage(photo,x-iw/2,y-ih*.49,iw,ih);
   c.fillStyle="rgba(6,29,27,.34)";c.fillRect(x-ew,y-eh,ew*2,eh*2);
  }else{
   const g=c.createRadialGradient(x,y,2,x,y,ew);
   g.addColorStop(0,"#8dafa2");g.addColorStop(.4,"#254c48");g.addColorStop(1,"#031514");
   c.fillStyle=g;c.fillRect(x-ew,y-eh,ew*2,eh*2);
  }
  c.restore();
  // The pulled stitches radiate from the aperture. Their separation grows
  // as the physical slit opens, preserving a tied origin.
  c.save();c.lineCap="round";
  for(let i=0;i<15;i++){
   const k=(i-7)/7,xx=x+k*ew*.9;
   const upper=y-eh*Math.sqrt(Math.max(0,1-k*k))*.88;
   const lower=y+eh*Math.sqrt(Math.max(0,1-k*k))*.88;
   const anchorY=y+((i%2)?-1:1)*(size*.3+Math.abs(k)*6);
   c.beginPath();c.moveTo(xx,upper);
   c.quadraticCurveTo(xx+(i%2?-9:10),anchorY*.63+upper*.37,xx+k*9,anchorY);
   c.strokeStyle=(i%3)?"#d7b894d9":"#243b3bbd";c.lineWidth=i%3===0?1.5:.75;c.stroke();
   c.beginPath();c.moveTo(xx,lower);c.lineTo(xx+k*6,y+eh+8);c.strokeStyle="#d5b592a0";c.lineWidth=.8;c.stroke();
  }
  c.restore();
 }
 function render(){
  const w=innerWidth,h=innerHeight,c=ctx;
  const bg=c.createRadialGradient(w*.53,h*.42,1,w*.5,h*.5,Math.max(w,h)*.7);
  bg.addColorStop(0,"#28302a");bg.addColorStop(.42,"#151e1b");bg.addColorStop(1,"#080d0c");
  c.fillStyle=bg;c.fillRect(0,0,w,h);
  // Ground plane / raking light, no website gradient panel.
  c.save();
  const glow=c.createRadialGradient(w*.5,h*.55,20,w*.5,h*.55,w*.65);
  glow.addColorStop(0,"#a25b4436");glow.addColorStop(.5,"#7c492411");glow.addColorStop(1,"#0b131000");
  c.fillStyle=glow;c.fillRect(0,0,w,h);
  c.restore();
  const scale=w<700?clamp(w/690,.47,.73):Math.min(w/1260,h/780,1.12);
  const textileW=960*scale,textileH=550*scale;
  // A 2.5D tilted object with thickness. Mobile keeps its physical proportions
  // instead of stretching it to cover the viewport.
  c.save();
  c.translate(w*.49,h*.48);
  c.rotate(w<680?-.12:-.095);
  c.translate(-textileW*.47,-textileH*.48);
  const originX=-textileW*.03,originY=0;
  const reveal=.06+progress*.94;
  const shownW=textileW*reveal;
  const strip=Math.max(2.4,3.9*scale);
  c.shadowColor="#000b";c.shadowBlur=39;c.shadowOffsetY=33;
  c.fillStyle="#101510";
  c.beginPath();c.ellipse(originX+textileW*.52,textileH*.58,
    textileW*.55,textileH*.51,0,0,Math.PI*2);c.fill();
  c.shadowBlur=0;c.shadowOffsetY=0;
  // Draw textile using many individually offset woven warp strips. No rigid
  // rectangular mask: the row position and edge respond to unrolling.
  const visibleWidth=Math.max(1,shownW);
  const n=Math.ceil(visibleWidth/strip);
  for(let i=0;i<n;i++){
   const u=(i*strip)/textileW,dx=originX+i*strip;
   const sw=Math.min(strip,visibleWidth-i*strip);
   if(sw<=0)continue;
   const fold=Math.sin(u*17+progress*5)*3.1*scale+Math.sin(u*6)*5.5*scale;
   const tension=Math.sin(u*Math.PI)*12*scale*(1-progress*.35);
   const slope=(u-.3)*11*scale;
   const sourceX=u*texture.width,sourceW=sw/textileW*texture.width;
   c.drawImage(texture,sourceX,0,sourceW,texture.height,dx,originY+fold+slope-tension,
     sw+1,textileH+7*scale*Math.sin(u*9));
  }
  // Structural edges and tactile fringe — they pull and curve with the cloth.
  c.strokeStyle="#cf9e76bb";c.lineWidth=2.4*scale;
  c.beginPath();
  for(let i=0;i<=Math.max(2,n);i++){
   const u=(i/Math.max(2,n))*reveal;
   const x=originX+u*textileW;
   const y=originY+Math.sin(u*17+progress*5)*3.1*scale+Math.sin(u*6)*5.5*scale
      -(Math.sin(u*Math.PI)*12*scale*(1-progress*.35))+(u-.3)*11*scale;
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
  }
  c.stroke();
  if(progress>.01){
   for(let j=0;j<68;j++){
    const y=(j/67)*textileH;
    const length=(8+noise(j,41)*15)*scale;
    const x=originX-4*scale;
    texLine(c,x,y,x-length,y+(noise(j,43)-.5)*8*scale,
     j%4===0?"#d1b39288":"#9c866ba3",.55+scale*.6);
   }
  }
  // Actual rolled leading edge, not a generic "reveal" on a flat image.
  const rollX=originX+shownW,rollWidth=(23+23*(1-progress))*scale;
  const rollG=c.createLinearGradient(rollX-rollWidth,0,rollX+rollWidth,0);
  rollG.addColorStop(0,"#180e0bd9");rollG.addColorStop(.18,"#55352e");
  rollG.addColorStop(.47,"#b37d58");rollG.addColorStop(.70,"#5e3731");rollG.addColorStop(1,"#180e10");
  c.fillStyle=rollG;
  c.beginPath();c.moveTo(rollX-rollWidth*.38,originY-6*scale);
  c.quadraticCurveTo(rollX+rollWidth*.92,originY-18*scale,rollX+rollWidth*.76,originY+9*scale);
  c.lineTo(rollX+rollWidth*.82,originY+textileH+7*scale);
  c.quadraticCurveTo(rollX,originY+textileH+24*scale,rollX-rollWidth*.4,originY+textileH+3*scale);
  c.closePath();c.fill();
  const capY=originY-3*scale;
  c.save();c.translate(rollX+rollWidth*.16,capY);
  c.scale(1,.30);c.fillStyle="#7e5c49";c.beginPath();
  c.arc(0,0,rollWidth*.74,0,Math.PI*2);c.fill();
  c.lineWidth=2*scale;c.strokeStyle="#d6ad80";
  for(let j=0;j<4;j++){c.beginPath();c.arc(0,0,rollWidth*(.16+j*.16),0,Math.PI*1.8);c.stroke();}
  c.restore();
  // Single slit is the 06A material proof. Future eyes are NOT faked here.
  const threshold=smooth(.58,.90,progress);
  if(threshold>0){
   const ex=originX+textileW*.31,ey=originY+textileH*.5;
   eye(c,ex,ey,110*scale,threshold);
  }
  // A raking highlight that follows one fold; slow and deliberately subtle.
  const wash=c.createLinearGradient(0,0,textileW*.8,textileH);
  wash.addColorStop(0,"#ffffff0c");wash.addColorStop(.37,"#ffffff00");wash.addColorStop(.62,"#0d1c1740");wash.addColorStop(1,"#060d0f36");
  c.fillStyle=wash;c.fillRect(originX,originY,shownW,textileH);
  c.restore();
  // Finite readable cue: it does not turn into a conventional hero section.
  const t=fmt[lang];
  el("ritualTitle").textContent=progress<.10?t.early:progress<.64?t.progress:t.opened;
  status.textContent=Math.round(progress*100)+"%";
  enter.hidden=progress<.76;
  pull.hidden=progress>=.76;
 }
 function leave(){
  if(departed)return;
  departed=true;
  try{ritual=transitionRitual(ritual,"ENTER_ARCHIVE",{sourceId:39})}catch(e){console.error(e)}
  root.classList.add("is-departing");
  document.documentElement.classList.remove("ritual-lab-active");
  if(archive)archive.inert=false;
  if(reading)reading.inert=false;
  // The existing archive owns the destination and maintains all its records.
  dispatchEvent(new CustomEvent("darb:ritual-enter",{detail:{sourceId:39,lang}}));
  setTimeout(()=>{root.hidden=true;root.remove();},1000);
 }
 function onPull(){setProgress(targetProgress+.23)}
 let pointerId=null,starting=null;
 canvas.addEventListener("pointerdown",e=>{
  if(departed)return;
  pointerId=e.pointerId;starting={x:e.clientX,y:e.clientY,value:targetProgress};
  canvas.setPointerCapture(pointerId);
  if(targetProgress===0)setProgress(.08);
 });
 canvas.addEventListener("pointermove",e=>{
  if(!starting||e.pointerId!==pointerId)return;
  const xchange=(e.clientX-starting.x)/Math.max(innerWidth*.68,190);
  const ychange=(starting.y-e.clientY)/Math.max(innerHeight*.65,220);
  setProgress(starting.value+Math.max(xchange,ychange*.85));
 });
 function release(e){
  if(e.pointerId!==pointerId)return;pointerId=null;starting=null;
  if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
 }
 canvas.addEventListener("pointerup",release);canvas.addEventListener("pointercancel",release);
 canvas.addEventListener("wheel",e=>{e.preventDefault();setProgress(targetProgress+Math.sign(e.deltaY)*.075);},{passive:false});
 pull.addEventListener("click",onPull);
 enter.addEventListener("click",leave);
 skip.addEventListener("click",leave);
 locale.addEventListener("click",()=>{lang=lang==="en"?"ar":"en";renderText();invalidate()});
 accessibility.addEventListener("click",()=>{ritual=transitionRitual(ritual,"SET_REDUCED_MOTION");progress=targetProgress;renderText();invalidate()});
 addEventListener("keydown",e=>{
  if(departed)return;
  if(e.key==="Escape"){e.preventDefault();leave();return;}
  if(e.key==="Tab"){
   const buttons=[...root.querySelectorAll("button:not([hidden])")];
   const first=buttons[0],last=buttons.at(-1);
   if(!buttons.includes(document.activeElement)){
    e.preventDefault();(e.shiftKey?last:first)?.focus();return;
   }
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();return;}
   if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();return;}
  }
  // Buttons keep their native Space/Enter semantics to avoid double pull.
  if(e.target?.closest?.("button"))return;
  if(e.key===" "||e.key==="ArrowRight"||e.key==="ArrowDown"){
   e.preventDefault();onPull();
  }
 });
 addEventListener("resize",resize,{passive:true});
 renderText();resize();invalidate();
 pull.focus({preventScroll:true});
 // A trusted local browser test can inspect current state without any globals
 // carrying secret or user data.
 root.dataset.study="06a";
 root.dataset.material="original-procedural";
}

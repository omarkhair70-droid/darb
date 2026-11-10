import {initialRitual,transitionRitual} from "/entrance-ritual-v2.mjs";
import {EYES,ritualVisual,chooseSource,availableSources} from "/ritual-material.mjs";
import {WovenSound} from "/woven-sound.mjs";
import {stepCloth,clothWarpOffset} from "/cloth-dynamics.mjs";
import {drawThresholdBehind,drawThresholdInFront,projectWovenEye,thresholdEchoes} from "/threshold-world.mjs";

// Slice 06B: an original, contemporary procedural textile study. It does NOT
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
 const sound=new WovenSound();
 let audioStarting=false;
 const status=root.querySelector("#ritualStatus");
 const traceBar=root.querySelector("#ritualTraces");
 const traceButtons=[...traceBar.querySelectorAll("[data-ritual-trace]")];
 const eyeTargets=[...root.querySelectorAll("[data-eye-entry]")];
 const portal=root.querySelector("#ritualPortal");
 const label=root.querySelector("#ritualInstruction");
 const el=(id)=>root.querySelector("#"+id);
 const fmt={
  en:{lab:"06B / THE WOVEN GAZE",early:"A fragment of memory.",progress:"Pull the woven edge.",opened:"The weave remembers three ways of seeing.",instruction:"DRAG THE FRINGE / SCROLL / PRESS SPACE",
    pulling:"CONTINUE THE UNFURLING",enter:"FOLLOW THIS TRACE ↗",skip:"ENTER ARCHIVE ↗",reduced:"STILL STUDY",
    audio:"SILENT BY DESIGN",soundOff:"Enable woven sound",soundOn:"Mute woven sound",language:"عربي",hint:"Look again. The threads lead somewhere.",source:"A THREAD FROM FUSTAT",traces:["01 / WITNESS","02 / RETAINED","03 / VISITOR"],gesture:"PULL TO UNFOLD",choose:"SCROLL TO ENTER · OR TOUCH AN OPENING",skipShort:"SKIP ↗"},
  ar:{lab:"٠٦ب / النظرة المنسوجة",early:"طرف من الذاكرة.",progress:"اسحب حافة النسيج.",opened:"النسيج افتكر تلات طرق للرؤية.",instruction:"اسحب الطرف / مرّر / اضغط مسافة",
    pulling:"كمّل فرد النسيج",enter:"اتبع الأثر ↗",skip:"ادخل الأرشيف ↗",reduced:"مشهد ثابت",
    audio:"الصمت جزء من التصميم",soundOff:"تشغيل صوت النسيج",soundOn:"كتم صوت النسيج",language:"EN",hint:"بص تاني. الخيوط بتوصّل لحكايات.",source:"خيط من حكاوي الفسطاط",traces:["٠١ / الشاهد","٠٢ / الأثر","٠٣ / الزائر"],gesture:"اسحب النسيج",choose:"كمّل تمرير للدخول · أو المس فتحة",skipShort:"تخطّي ↗"}
 };
 let lang="en",ritual=initialRitual({reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches});
 let progress=0,targetProgress=0,clothVelocity=0,last=0,raf=0,drag=null,departed=false;
 let gaze=.5,selectedSourceId=39,departureAmount=0,departureStartedAt=0,returnFocus=null,hoveredEyeKey=null;
 const photo=new Image();
 photo.src="/media/39.jpeg";
 photo.decoding="async";
 photo.onload=()=>invalidate();
 const retainedPhoto=new Image();retainedPhoto.src="/media/41.jpeg";
 retainedPhoto.decoding="async";retainedPhoto.onload=()=>invalidate();
 const visitorPhoto=new Image();visitorPhoto.src="/media/42.jpeg";
 visitorPhoto.decoding="async";visitorPhoto.onload=()=>invalidate();
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
  label.textContent=progress>.80?t.choose:t.gesture;
  pull.textContent=t.pulling;
  enter.textContent=t.enter;
  skip.textContent=t.skipShort;
  locale.textContent=t.language;
  accessibility.textContent=t.reduced;
  el("ritualSound").textContent=sound.enabled?(lang==="ar"?"احتكاك النسيج":"FIBER FRICTION"):t.audio;

  root.dataset.audio=sound.enabled?"on":"off";
  el("ritualFootnote").textContent=t.hint;
  el("ritualSource").textContent=t.source;
  traceButtons.forEach((button,i)=>{
   const eye=EYES[i];
   button.textContent=t.traces[i];
   button.setAttribute("aria-pressed",String(selectedSourceId===eye.sourceId));
   button.disabled=!availableSources(Math.max(targetProgress,progress)).includes(eye.sourceId);
   button.title=lang==="ar"?"استكشف صورة من الأرشيف":"Explore an image in the archive";
  });
  root.dir=lang==="ar"?"rtl":"ltr";
  status.textContent=Math.round(progress*100)+"%";
  const shown=progress>.77;
  enter.hidden=!shown;
  pull.hidden=shown;
  traceBar.hidden=!shown;
  root.dataset.source=String(selectedSourceId);
  updateEyeTargets();
 }
 function selectTrace(key){
  const id=chooseSource(key);
  if(!availableSources(targetProgress).includes(id))return;
  selectedSourceId=id;
  renderText();invalidate();
 }

 // Project the REAL textile aperture positions onto the viewport, sharing the
 // exact oblique material geometry with render(). These are not side menu items.
 function eyeScreenPoint(eye){
  return projectWovenEye(eye,innerWidth,innerHeight,progress,clothVelocity);
 }
 function updateEyeTargets(){
  const available=availableSources(Math.max(progress,targetProgress));
  eyeTargets.forEach((button,i)=>{
   const eye=EYES[i],point=eyeScreenPoint(eye);
   button.style.left=point.x+"px";
   button.style.top=point.y+"px";
   button.disabled=departed||!available.includes(eye.sourceId)||progress<.76;
   button.setAttribute("aria-label",lang==="ar"
    ?"ادخل الأرشيف من الفتحة رقم "+(i+1)
    :"Enter the archive through woven opening "+(i+1));
   button.setAttribute("aria-pressed",String(selectedSourceId===eye.sourceId));
  });
 }
 function enterEye(key){
  if(departed)return;
  const id=chooseSource(key);
  if(!availableSources(Math.max(progress,targetProgress)).includes(id))return;
  selectedSourceId=id;
  root.dataset.source=String(id);
  leave();
 }
 function nearestEyeFromGaze(){
  // Continuing forward never forces the visitor to make a menu choice.
  // With no deliberate eye focus, the thread begins with the first witness.
  return hoveredEyeKey||EYES[0].key;
 }

 function setProgress(n){
  if(departed)return;
  const previous=targetProgress;
  targetProgress=clamp(n,0,1);
  if(sound.enabled&&Math.abs(previous-targetProgress)>.006)sound.rustle(Math.abs(previous-targetProgress)*2.1);
  if(ritual.phase==="unlit"&&targetProgress>.02)ritual=transitionRitual(ritual,"START");
  if(ritual.phase==="unfurl"&&targetProgress>.59)ritual=transitionRitual(ritual,"CLOTH_EXTENDED");
  if(ritual.phase==="tension"&&targetProgress>.78)ritual=transitionRitual(ritual,"APERTURES_REVEALED");
  if(ritual.phase==="recognition"&&targetProgress>.90)ritual=transitionRitual(ritual,"VIEW_ALIGNED");
  if(ritual.reducedMotion){progress=targetProgress;clothVelocity=0;}
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
 function invalidate(){if(!raf&&(!departed||departureStartedAt))raf=requestAnimationFrame(frame);}
 function frame(time){
  raf=0;
  const dt=last?Math.min(80,time-last):16.67;last=time;
  const cloth=stepCloth({position:progress,velocity:clothVelocity},targetProgress,dt,
    {reducedMotion:ritual.reducedMotion});
  progress=cloth.position;clothVelocity=cloth.velocity;
  if(departureStartedAt)departureAmount=clamp((time-departureStartedAt)/930);
  render();
  if(progress!==targetProgress||(departureStartedAt&&departureAmount<1))invalidate();
 }
 // Local pressure and oblique light around a torn textile opening. This
 // belongs to the surrounding yarn, so source photographs remain untouched.
 // Each opening supplies its own proportions, direction and pressure.
 function textilePressure(c,x,y,rx,ry,angle,amount,depth){
  if(amount<=0)return;
  c.save();
  c.translate(x,y);c.rotate(angle);c.scale(rx,ry);
  const shadow=c.createRadialGradient(.10,.16,.08,0,0,1.48);
  shadow.addColorStop(0,"rgba(10,15,14,"+(depth*.52*amount).toFixed(3)+")");
  shadow.addColorStop(.60,"rgba(28,27,22,"+(depth*.21*amount).toFixed(3)+")");
  shadow.addColorStop(1,"rgba(7,12,11,0)");
  c.fillStyle=shadow;c.fillRect(-1.5,-1.5,3,3);
  // Raking light catches the stretched upper fibers, while the lower edge
  // falls into the cloth. No drawn decorative outline or fake iris.
  const light=c.createLinearGradient(-.35,-1.3,.35,1.3);
  light.addColorStop(0,"rgba(243,204,155,"+(.12*amount).toFixed(3)+")");
  light.addColorStop(.34,"rgba(241,196,137,"+(.035*amount).toFixed(3)+")");
  light.addColorStop(.53,"rgba(0,0,0,0)");
  light.addColorStop(.84,"rgba(8,17,17,"+(.15*amount).toFixed(3)+")");
  light.addColorStop(1,"rgba(8,17,17,0)");
  c.fillStyle=light;c.fillRect(-1.15,-1.18,2.3,2.36);
  c.restore();
 }
 function eye(c,x,y,size,amount){
  if(amount<=0)return;
  const ew=size*(.42+.58*amount),eh=size*.26*amount;
  textilePressure(c,x,y,ew*1.35,size*.70,0,amount,.9);
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

 function retainedEye(c,x,y,size,amount){
  if(amount<=0)return;
  // Eye II is a worn secondary textile layer. The visible image is retained
  // beneath the yarn; it does not open as the first eye's symmetrical slit.
  const width=size*(.55+.55*amount),height=size*.46*amount;
  textilePressure(c,x,y,width*1.16,height*1.72,-.22,amount,1.2);
  c.save();c.translate(x,y);c.rotate(-.22);
  c.shadowColor="#020c0ba0";c.shadowBlur=15;
  c.beginPath();
  c.moveTo(-width*.95,-height*.25);
  c.quadraticCurveTo(-width*.45,-height*1.12,width*.72,-height*.55);
  c.lineTo(width,height*.35);
  c.quadraticCurveTo(width*.12,height*1.3,-width*.85,height*.35);
  c.closePath();
  // Fill the boundary once BEFORE clipping: clipping itself casts no shadow.
  c.fillStyle="#142526";c.fill();
  c.shadowBlur=0;c.clip();
  c.fillStyle="#172d2d";c.fillRect(-width,-height,width*2,height*2);
  if(retainedPhoto.complete&&retainedPhoto.naturalWidth){
   c.drawImage(retainedPhoto,-width,-height,width*2,height*2);
   c.fillStyle="#233e4566";c.fillRect(-width,-height,width*2,height*2);
  }
  c.restore();
  c.save();c.translate(x,y);c.rotate(-.22);c.lineCap="round";
  const folds=19;
  for(let i=0;i<folds;i++){
   const t=i/(folds-1),xx=(t-.5)*size*1.8;
   const upper=-height*(.28+.28*Math.sin(t*Math.PI));
   const lower=height*(.18+.33*Math.sin(t*Math.PI));
   c.beginPath();
   c.moveTo(xx,upper);
   c.quadraticCurveTo(xx+Math.sin(i*2.2)*8,-height*.88-8,xx+4,-height*1.5);
   c.strokeStyle=i%5?"#d1a47dcc":"#314a43cc";c.lineWidth=i%6?1.1:2.1;c.stroke();
   c.beginPath();c.moveTo(xx,lower);c.lineTo(xx+Math.sin(i)*5,height*.78);
   c.strokeStyle="#c3ad89b3";c.lineWidth=.8;c.stroke();
  }
  // A fraying flap partly covers what the previous layer reveals.
  c.beginPath();c.moveTo(-width*.9,-height*.29);
  c.quadraticCurveTo(0,-height*1.55,width*.84,-height*.62);
  c.lineTo(width*.63,-height*.9);
  c.quadraticCurveTo(-width*.24,-height*1.8,-width*.98,-height*.42);
  c.closePath();
  c.fillStyle="#68433bd9";c.fill();
  c.strokeStyle="#d6b78fa8";c.lineWidth=1.1;c.stroke();
  c.restore();
 }
 function visitorEye(c,x,y,size,amount,alignment){
  if(amount<=0)return;
  // Eye III is created by camera-dependent offset between two cloth seams.
  // It is neither a drawn pupil nor another copy of the unstitched lens.
  const opening=size*.62*amount*alignment;
  const radius=opening*.89;
  textilePressure(c,x,y,radius*1.55,radius*1.33,.17+(gaze-.5)*.22,amount,.78);
  c.save();c.translate(x,y);c.rotate(.17+(gaze-.5)*.22);
  c.shadowColor="#010a0ae0";c.shadowBlur=12;
  c.beginPath();
  c.moveTo(-radius*.88,0);
  c.bezierCurveTo(-radius*.47,-radius*.8,radius*.62,-radius*.6,radius*.97,-radius*.11);
  c.bezierCurveTo(radius*.12,radius*.93,-radius*.44,radius*.78,-radius*.88,0);
  c.closePath();
  c.fillStyle="#081e20";c.fill();
  c.shadowBlur=0;c.clip();
  c.fillStyle="#0a292b";c.fillRect(-radius,-radius,radius*2,radius*2);
  if(visitorPhoto.complete&&visitorPhoto.naturalWidth){
   c.save();c.translate((.5-gaze)*radius*.22,0);
   c.drawImage(visitorPhoto,-radius*1.3,-radius*.86,radius*2.6,radius*1.72);
   c.restore();
   c.fillStyle="#172e3766";c.fillRect(-radius,-radius,radius*2,radius*2);
  }
  c.restore();
  c.save();c.translate(x,y);c.rotate(.17+(gaze-.5)*.22);
  for(let i=0;i<26;i++){
   const t=i/25,xx=(t-.5)*radius*1.86;
   const edge=radius*.5*Math.sqrt(Math.max(0,1-Math.pow(t*2-1,2)));
   c.beginPath();
   c.moveTo(xx,-edge);
   c.quadraticCurveTo(xx+(gaze-.5)*16,-edge-6*amount,xx+(gaze-.5)*28,-edge-17*amount);
   c.strokeStyle=i%3?"#e1c39894":"#335753dd";c.lineWidth=i%4?1:1.9;c.stroke();
  }
  c.strokeStyle="#ead3ad81";c.lineWidth=1;
  c.beginPath();c.moveTo(-radius*.86,0);
  c.quadraticCurveTo(0,radius*.68,radius*.97,-radius*.11);c.stroke();
  c.restore();
 }
 function threadMemory(c,originX,originY,w,h,amount){
  if(amount<=0)return;
  // Not a decorative ellipse or an inserted D glyph. Three physical openings
  // hold a straight woven spine and a bowed line of tension. From the right
  // viewpoint the missing center can be perceived as a D.
  const points=EYES.map(eye=>({
   x:originX+w*eye.x,
   y:originY+h*eye.y+clothWarpOffset(eye.x,progress,clothVelocity,w/960)
  }));
  const [upper,lower,outer]=points;
  c.save();
  c.globalAlpha=.68*amount;
  c.lineCap="round";
  for(let k=0;k<9;k++){
   const offset=(k-4)*w*.0027;
   const sw=k%4===0?1.55:.70;
   const shade=k%3===0?"#e8c9a38d":k%2===0?"#294b49ae":"#a17e63a6";
   c.beginPath();
   c.moveTo(upper.x+offset,upper.y);
   c.bezierCurveTo(upper.x-w*.017+offset,originY+h*.43,
     lower.x-w*.011+offset,originY+h*.58,lower.x+offset,lower.y);
   c.strokeStyle=shade;c.lineWidth=sw;c.stroke();
   c.beginPath();
   c.moveTo(upper.x+offset,upper.y);
   c.bezierCurveTo(originX+w*(.63+offset/w),originY+h*.15,
     originX+w*(.88+offset/w),originY+h*.26,outer.x+offset,outer.y);
   c.bezierCurveTo(originX+w*(.87+offset/w),originY+h*.77,
     originX+w*(.59+offset/w),originY+h*.84,lower.x+offset,lower.y);
   c.strokeStyle=shade;c.lineWidth=sw;c.stroke();
  }
  // The fibers are attached to the real apertures; not floating control dots.
  for(const anchor of points){
   c.beginPath();c.arc(anchor.x,anchor.y,2.4,0,Math.PI*2);
   c.fillStyle="#e2bfa2b5";c.fill();
  }
  c.restore();
 }

 function paintPassage(c,w,h,amount){
  if(amount<=0||ritual.reducedMotion)return;
  const aperture=EYES.find(item=>item.sourceId===selectedSourceId)||EYES[0];
  // One physical origin is shared by the painted strands, the accessible eye
  // target, and the circular photographic portal. Never approximate it again.
  const {x:sx,y:sy}=eyeScreenPoint(aperture);
  // Each material gives the transition a distinct spatial gesture. These are
  // authored viewing treatments, not assertions about how a source was made.
  const scores={
   witness:{endX:w*.91,endY:h*.43,bend:.28,fan:19,colors:["#d8b18b","#92b4ab","#d6c5a4"]},
   retained:{endX:w*.80,endY:h*.24,bend:.46,fan:13,colors:["#b1d9e1","#d7c6a8","#6d99a9"]},
   visitor:{endX:w*.75,endY:h*.71,bend:.19,fan:25,colors:["#d7c9ad","#b49c77","#a9bcb0"]}
  };
  const score=scores[aperture.key];
  c.save();c.lineCap="round";c.globalAlpha=.60*amount;
  for(let i=0;i<23;i++){
   const k=(i-11)/11;
   const side=k*(9+amount*score.fan);
   const xEnd=score.endX+side*.75;
   const yEnd=score.endY+side*(aperture.key==="visitor"?1.25:1.5);
   c.beginPath();c.moveTo(sx+side*.18,sy+side*.18);
   c.bezierCurveTo(
    sx+(xEnd-sx)*score.bend,sy+side*(1.05+score.bend),
    xEnd-(xEnd-sx)*.18,yEnd-side*.43,
    xEnd,yEnd
   );
   c.strokeStyle=score.colors[i%score.colors.length];
   c.lineWidth=i%7===0?1.2:.55;c.stroke();
  }
  c.restore();
 }
 function render(){
  const w=innerWidth,h=innerHeight,c=ctx;
  const bg=c.createRadialGradient(w*.53,h*.42,1,w*.5,h*.5,Math.max(w,h)*.7);
  bg.addColorStop(0,"#302920");bg.addColorStop(.42,"#1b1c18");bg.addColorStop(1,"#090e0d");
  c.fillStyle=bg;c.fillRect(0,0,w,h);
  // Ground plane / raking light, no website gradient panel.
  c.save();
  const glow=c.createRadialGradient(w*.5,h*.55,20,w*.5,h*.55,w*.65);
  glow.addColorStop(0,"#a25b4436");glow.addColorStop(.5,"#7c492411");glow.addColorStop(1,"#0b131000");
  c.fillStyle=glow;c.fillRect(0,0,w,h);
  c.restore();
  // The surrounding world is born from the same three image-bearing weave
  // apertures. It is a lit depth field, not another gallery UI behind the rug.
  drawThresholdBehind(c,{w,h,progress,velocity:clothVelocity,gaze,time:last,
   reducedMotion:ritual.reducedMotion,photos:[photo,retainedPhoto,visitorPhoto]});
  const scale=w<700?clamp(w/1100,.34,.58):Math.min(w/1300,h/860,.99);
  const textileW=960*scale,textileH=550*scale;
  // A 2.5D tilted object with thickness. Mobile keeps its physical proportions
  // instead of stretching it to cover the viewport.
  c.save();
  // The first image is not an isolated roll in the left third of a hero.
  // The camera initially holds the rolled edge near the visitor's center,
  // then yields space to the actual fabric as it is physically pulled open.
  const cameraRelease=smooth(.02,.74,progress);
  const leadShift=(1-cameraRelease)*textileW*.42;
  c.translate(w*.50+leadShift,h*((w<700?.38:.43)+(1-cameraRelease)*.10));
  c.rotate(w<680?-.12:-.095);
  c.translate(-textileW*.47,-textileH*.48);
  const originX=-textileW*.03,originY=0;
  const reveal=.06+progress*.94;
  const shownW=textileW*reveal;
  const strip=Math.max(2.4,3.9*scale);
  c.shadowColor="#030908b0";c.shadowBlur=27*scale;c.shadowOffsetY=24*scale;
  c.fillStyle="#070d0b33";
  c.beginPath();c.ellipse(originX+shownW*.49,textileH*.64,
    Math.max(20*scale,shownW*.53),textileH*.37,0,0,Math.PI*2);c.fill();
  c.shadowBlur=0;c.shadowOffsetY=0;
  // Draw textile using many individually offset woven warp strips. No rigid
  // rectangular mask: the row position and edge respond to unrolling.
  const visibleWidth=Math.max(1,shownW);
  const n=Math.ceil(visibleWidth/strip);
  for(let i=0;i<n;i++){
   const u=(i*strip)/textileW,dx=originX+i*strip;
   const sw=Math.min(strip,visibleWidth-i*strip);
   if(sw<=0)continue;
   const sourceX=u*texture.width,sourceW=sw/textileW*texture.width;
   const weaveY=originY+clothWarpOffset(u,progress,clothVelocity,scale);
   const weaveHeight=textileH+7*scale*Math.sin(u*9);
   c.drawImage(texture,sourceX,0,sourceW,texture.height,dx,weaveY,sw+1,weaveHeight);
   // Local raking light and occlusion across the curved warp. A crease becomes
   // dark on one side and catches warm light on the other, rather than every
   // strip being the same flat photographic plane.
   const relief=Math.sin(u*13.7+progress*1.9)+.31*Math.sin(u*28.1-progress*2.7);
   const darkness=Math.max(0,relief)*.115;
   const lit=Math.max(0,-relief)*.063;
   if(darkness>.006){
    c.fillStyle="rgba(15,17,14,"+darkness.toFixed(3)+")";
    c.fillRect(dx,weaveY,sw+1,weaveHeight);
   }else if(lit>.006){
    c.fillStyle="rgba(240,195,145,"+lit.toFixed(3)+")";
    c.fillRect(dx,weaveY,sw+1,weaveHeight);
   }
  }
  // The lower selvage belongs to the same warped surface as the top edge.
  // Its curved underside produces a narrow occluded thickness and a second
  // raking highlight. This avoids a flat rectangular bottom silhouette.
  c.save();
  c.lineJoin="round";c.lineCap="round";
  const edgeSteps=Math.max(18,Math.ceil(visibleWidth/(9*scale)));
  const bottomEdge=(u)=>originY+clothWarpOffset(u,progress,clothVelocity,scale)+
    textileH+7*scale*Math.sin(u*9);
  // Contact shadow just outside the woven edge, below the physical fabric.
  c.beginPath();
  for(let i=0;i<=edgeSteps;i++){
   const u=reveal*i/edgeSteps,x=originX+u*textileW,y=bottomEdge(u);
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
  }
  c.strokeStyle="rgba(7,12,11,.42)";c.lineWidth=12*scale;c.stroke();
  // The lower binding is not a straight CSS border: it follows each fold.
  c.beginPath();
  for(let i=0;i<=edgeSteps;i++){
   const u=reveal*i/edgeSteps,x=originX+u*textileW,y=bottomEdge(u)-2.2*scale;
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
  }
  c.strokeStyle="rgba(224,188,145,.70)";c.lineWidth=2.1*scale;c.stroke();
  c.restore();
  // The rolling cylinder occludes the last woven strips and casts a local
  // shadow behind its leading edge, rather than a disconnected dark rectangle.
  const shadowEnd=originX+shownW;
  const shadowStart=Math.max(originX,shadowEnd-39*scale);
  const cylinderShadow=c.createLinearGradient(shadowStart,0,shadowEnd,0);
  cylinderShadow.addColorStop(0,"rgba(8,12,11,0)");
  cylinderShadow.addColorStop(.72,"rgba(8,12,11,.33)");
  cylinderShadow.addColorStop(1,"rgba(8,12,11,.09)");
  c.fillStyle=cylinderShadow;
  // Never paint a rectangular overhang outside the actually unfurled fabric.
  c.fillRect(shadowStart,originY,Math.max(0,shadowEnd-shadowStart),textileH+8*scale);
  // Structural edges and tactile fringe — they pull and curve with the cloth.
  c.strokeStyle="#cf9e76bb";c.lineWidth=2.4*scale;
  c.beginPath();
  for(let i=0;i<=Math.max(2,n);i++){
   const u=(i/Math.max(2,n))*reveal;
   const x=originX+u*textileW;
   const y=originY+clothWarpOffset(u,progress,clothVelocity,scale);
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
  const rollX=originX+shownW;
  const rollWidth=(23+23*(1-progress)+Math.min(9,Math.abs(clothVelocity)*5000))*scale;
  const rollG=c.createLinearGradient(rollX-rollWidth,0,rollX+rollWidth,0);
  rollG.addColorStop(0,"#221917");rollG.addColorStop(.18,"#69463b");
  rollG.addColorStop(.47,"#956c56");rollG.addColorStop(.70,"#623b32");rollG.addColorStop(1,"#211918");
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
  const material=ritualVisual(progress,{gaze,reducedMotion:ritual.reducedMotion});
  const [witness,retained,visitor]=material.openings;
  if(witness.amount>0){
   eye(c,originX+textileW*EYES[0].x,originY+textileH*EYES[0].y+
    clothWarpOffset(EYES[0].x,progress,clothVelocity,scale),
    110*scale,witness.amount);
  }
  if(retained.amount>0){
   retainedEye(c,originX+textileW*EYES[1].x,originY+textileH*EYES[1].y+
    clothWarpOffset(EYES[1].x,progress,clothVelocity,scale),
    104*scale,retained.amount);
  }
  if(visitor.amount>0){
   visitorEye(c,originX+textileW*EYES[2].x,originY+textileH*EYES[2].y+
    clothWarpOffset(EYES[2].x,progress,clothVelocity,scale),
    117*scale,visitor.amount,.84+material.recognition*.16);
  }
  if(material.recognition>0){
   threadMemory(c,originX,originY,textileW,textileH,material.recognition);
  }
  // A raking highlight that follows one fold; slow and deliberately subtle.
  const wash=c.createLinearGradient(0,0,textileW*.8,textileH);
  wash.addColorStop(0,"#ffffff0c");wash.addColorStop(.37,"#ffffff00");wash.addColorStop(.62,"#0d1c1740");wash.addColorStop(1,"#060d0f36");
  c.fillStyle=wash;c.fillRect(originX,originY,shownW,textileH);
  c.restore();
  // A connection grows only once the visitor actually enters an eye.
  // Loose threads must not hang into empty UI space at 100% unfold.
  paintPassage(c,w,h,departureAmount);
  drawThresholdInFront(c,{w,h,progress,gaze,time:last,reducedMotion:ritual.reducedMotion});
  root.dataset.memoryEchoes=String(thresholdEchoes(progress));
  // Finite readable cue: it does not turn into a conventional hero section.
  const t=fmt[lang];
  el("ritualTitle").textContent=progress<.10?t.early:progress<.64?t.progress:t.opened;
  status.textContent=Math.round(progress*100)+"%";
  label.textContent=progress>.80?fmt[lang].choose:fmt[lang].gesture;
  enter.hidden=progress<.76;
  pull.hidden=progress>=.76;
  traceBar.hidden=progress<.76;
  const accessible=availableSources(Math.max(targetProgress,progress));
  traceButtons.forEach((button,i)=>{
   button.disabled=!accessible.includes(EYES[i].sourceId);
   button.setAttribute("aria-pressed",String(selectedSourceId===EYES[i].sourceId));
  });
  root.dataset.phase=ritual.phase;
  // Material opening and hotspot accessibility update on every rendered frame,
  // not just on language changes or initial mount.
  updateEyeTargets();
 }
 function leave({skipRitual=false}={}){
  if(departed)return;
  departed=true;
  void sound.dispose();
  try{
   ritual=ritual.phase==="passage"
    ?transitionRitual(ritual,"SOURCE_SELECTED",{sourceId:selectedSourceId})
    :transitionRitual(ritual,"ENTER_ARCHIVE",{sourceId:selectedSourceId});
  }catch(e){console.error(e)}
  const eye=EYES.find(e=>e.sourceId===selectedSourceId)||EYES[0];
  const point=eyeScreenPoint(eye);
  root.style.setProperty("--portal-x",point.x+"px");
  root.style.setProperty("--portal-y",point.y+"px");
  portal.style.backgroundImage='url("/media/'+selectedSourceId+'.jpeg")';
  root.classList.toggle("is-skipping",skipRitual);
  departureStartedAt=performance.now();
  root.classList.add("is-departing");
  invalidate();
  document.documentElement.classList.remove("ritual-lab-active");
  if(archive)archive.inert=false;
  if(reading)reading.inert=false;
  // The existing archive owns the destination and maintains all its records.
  dispatchEvent(new CustomEvent("darb:ritual-enter",{detail:{sourceId:selectedSourceId,lang,skipRitual}}));
  setTimeout(()=>{root.hidden=true;root.remove();returnFocus?.focus?.({preventScroll:true});},skipRitual?220:1150);
 }
 function onPull(){
  if(targetProgress>=.985){enterEye(nearestEyeFromGaze());return;}
  setProgress(targetProgress+.23);
 }
 let pointerId=null,starting=null;
 canvas.addEventListener("pointerdown",e=>{
  if(departed)return;
  pointerId=e.pointerId;starting={x:e.clientX,y:e.clientY,value:targetProgress};
  canvas.setPointerCapture(pointerId);
  if(targetProgress===0)setProgress(.08);
 });
 canvas.addEventListener("pointermove",e=>{
  gaze=clamp(e.clientX/Math.max(innerWidth,1),0,1);
  if(progress>.76)invalidate();
  if(!starting||e.pointerId!==pointerId)return;
  gaze=clamp(e.clientX/Math.max(innerWidth,1),0,1);
  const xchange=(e.clientX-starting.x)/Math.max(innerWidth*.68,190);
  const ychange=(starting.y-e.clientY)/Math.max(innerHeight*.65,220);
  // Mobile visitors can make one more upward swipe after the weave is open,
  // with no mandatory tap on a label or on a particular eye.
  if(starting.value>=.985&&progress>.92&&ychange>.15){
   enterEye(nearestEyeFromGaze());return;
  }
  setProgress(starting.value+Math.max(xchange,ychange*.85));
 });
 function release(e){
  if(e.pointerId!==pointerId)return;pointerId=null;starting=null;
  if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
 }
 canvas.addEventListener("pointerup",release);canvas.addEventListener("pointercancel",release);
 root.addEventListener("wheel",e=>{
  e.preventDefault();
  if(e.deltaY>0&&targetProgress>=.985&&progress>.92){
   enterEye(nearestEyeFromGaze());return;
  }
  setProgress(targetProgress+Math.sign(e.deltaY)*.095);
 },{passive:false});
 pull.addEventListener("click",onPull);
 traceButtons.forEach(button=>button.addEventListener("click",()=>selectTrace(button.dataset.ritualTrace)));
 enter.addEventListener("click",()=>enterEye(nearestEyeFromGaze()));
 eyeTargets.forEach(button=>{
  button.addEventListener("click",()=>enterEye(button.dataset.eyeEntry));
  button.addEventListener("pointerenter",()=>{hoveredEyeKey=button.dataset.eyeEntry;invalidate();});
  button.addEventListener("pointerleave",()=>{if(hoveredEyeKey===button.dataset.eyeEntry)hoveredEyeKey=null;invalidate();});
  button.addEventListener("focus",()=>{hoveredEyeKey=button.dataset.eyeEntry;invalidate();});
 });
 skip.addEventListener("click",()=>leave({skipRitual:true}));
 locale.addEventListener("click",()=>{lang=lang==="en"?"ar":"en";renderText();invalidate()});
 accessibility.addEventListener("click",()=>{ritual=transitionRitual(ritual,"SET_REDUCED_MOTION");progress=targetProgress;clothVelocity=0;renderText();invalidate()});
 // Sound is part of the introductory material, not an extra UI mode.
 // Web Audio can begin only after a browser-permitted user activation. There is
 // no forced consent screen and the complete scene still works silently.
 function beginEntranceSound(e){
  if(departed||sound.enabled||audioStarting)return;
  if(e.type==="wheel"&&navigator.userActivation&&!navigator.userActivation.isActive)return;
  audioStarting=true;
  void sound.enable().then(ok=>{
   if(ok&& !departed){
    try{ritual=transitionRitual(ritual,"ENABLE_SOUND");}catch(_){}
    sound.rustle(.35);
    root.dataset.audio="on";
   }
  }).catch(()=>{}).finally(()=>{audioStarting=false;});
 }
 root.addEventListener("pointerdown",beginEntranceSound,{passive:true,capture:true});
 root.addEventListener("wheel",beginEntranceSound,{passive:true,capture:true});
 addEventListener("keydown",e=>{
  if(departed)return;
  if(e.key==="Escape"){e.preventDefault();leave({skipRitual:true});return;}
  if(e.key===" "||e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="Enter")beginEntranceSound(e);
  if(e.key==="Tab"){
   const buttons=[...root.querySelectorAll("button:not([hidden])")];
   const first=buttons[0],last=buttons.at(-1);
   if(!buttons.includes(document.activeElement)){
    e.preventDefault();(e.shiftKey?last:first)?.focus();return;
   }
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();return;}
   if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();return;}
  }
  // Buttons keep native Space/Enter; the main stage continues on Arrow/Space.
  if(e.target?.closest?.("button"))return;
  if(e.key===" "||e.key==="ArrowRight"||e.key==="ArrowDown"){
   e.preventDefault();onPull();
  }
 });
 addEventListener("resize",resize,{passive:true});
 renderText();resize();invalidate();
 root.setAttribute("tabindex","-1");root.focus({preventScroll:true});
 // A trusted local browser test can inspect current state without any globals
 // carrying secret or user data.
 root.dataset.study="06b";
 root.dataset.material="original-procedural";
}

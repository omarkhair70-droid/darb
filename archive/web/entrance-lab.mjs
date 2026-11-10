import {initialRitual,transitionRitual} from "/entrance-ritual-v2.mjs";
import {EYES,ritualVisual,chooseSource,availableSources} from "/ritual-material.mjs";
import {WovenSound} from "/woven-sound.mjs";

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
 const audioButton=root.querySelector("#ritualAudio");
 const sound=new WovenSound();
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
    audio:"SILENT BY DESIGN",soundOff:"Enable woven sound",soundOn:"Mute woven sound",language:"عربي",hint:"Look again. The threads lead somewhere.",source:"A THREAD FROM FUSTAT",traces:["01 / WITNESS","02 / RETAINED","03 / VISITOR"],gesture:"PULL TO UNFOLD",choose:"TOUCH AN OPENING · OR KEEP MOVING",skipShort:"SKIP ↗"},
  ar:{lab:"٠٦ب / النظرة المنسوجة",early:"طرف من الذاكرة.",progress:"اسحب حافة النسيج.",opened:"النسيج افتكر تلات طرق للرؤية.",instruction:"اسحب الطرف / مرّر / اضغط مسافة",
    pulling:"كمّل فرد النسيج",enter:"اتبع الأثر ↗",skip:"ادخل الأرشيف ↗",reduced:"مشهد ثابت",
    audio:"الصمت جزء من التصميم",soundOff:"تشغيل صوت النسيج",soundOn:"كتم صوت النسيج",language:"EN",hint:"بص تاني. الخيوط بتوصّل لحكايات.",source:"خيط من حكاوي الفسطاط",traces:["٠١ / الشاهد","٠٢ / الأثر","٠٣ / الزائر"],gesture:"اسحب النسيج",choose:"المس فتحة · أو كمّل الحركة",skipShort:"تخطّي ↗"}
 };
 let lang="en",ritual=initialRitual({reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches});
 let progress=0,targetProgress=0,last=0,raf=0,drag=null,departed=false;
 let gaze=.5,selectedSourceId=39,departureAmount=0,departureStartedAt=0,returnFocus=null;
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
  audioButton.querySelector('[aria-hidden="true"]').textContent=sound.enabled?"♫":"◖";
  audioButton.querySelector(".ritual-sr").textContent=sound.enabled?t.soundOn:t.soundOff;
  audioButton.setAttribute("aria-label",sound.enabled?t.soundOn:t.soundOff);
  audioButton.setAttribute("aria-pressed",String(sound.enabled));
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
  const w=innerWidth,h=innerHeight;
  const scale=w<700?clamp(w/860,.40,.60):Math.min(w/1300,h/860,.99);
  const tw=960*scale,th=550*scale,angle=w<680?-.12:-.095;
  const x=-tw*.03+tw*eye.x-tw*.47;
  const y=th*eye.y-th*.48;
  return {
   x:w*.5+x*Math.cos(angle)-y*Math.sin(angle),
   y:h*(w<700?.38:.43)+x*Math.sin(angle)+y*Math.cos(angle)
  };
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
  // Scroll continuation stays a natural gesture. It doesn't require a row of
  // three labels or an extra CTA at 100%; the visitor may also touch any eye.
  if(gaze>.66)return EYES[2].key;
  if(gaze>.33)return EYES[1].key;
  return EYES[0].key;
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
 function invalidate(){if(!raf&&(!departed||departureStartedAt))raf=requestAnimationFrame(frame);}
 function frame(time){
  raf=0;
  const dt=last?Math.min(80,time-last):16.67;last=time;
  if(!ritual.reducedMotion)progress+=(targetProgress-progress)*(1-Math.exp(-dt/180));
  if(Math.abs(targetProgress-progress)<.001)progress=targetProgress;
  if(departureStartedAt)departureAmount=clamp((time-departureStartedAt)/930);
  render();
  if(progress!==targetProgress||(departureStartedAt&&departureAmount<1))invalidate();
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

 function retainedEye(c,x,y,size,amount){
  if(amount<=0)return;
  // Eye II is a worn secondary textile layer. The visible image is retained
  // beneath the yarn; it does not open as the first eye's symmetrical slit.
  c.save();c.translate(x,y);c.rotate(-.22);
  const width=size*(.55+.55*amount),height=size*.46*amount;
  c.shadowColor="#020c0ba0";c.shadowBlur=15;
  c.beginPath();
  c.moveTo(-width*.95,-height*.25);
  c.quadraticCurveTo(-width*.45,-height*1.12,width*.72,-height*.55);
  c.lineTo(width,height*.35);
  c.quadraticCurveTo(width*.12,height*1.3,-width*.85,height*.35);
  c.closePath();c.clip();
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
  c.save();c.translate(x,y);c.rotate(.17+(gaze-.5)*.22);
  const radius=opening*.89;
  c.shadowColor="#010a0ae0";c.shadowBlur=12;
  c.beginPath();
  c.moveTo(-radius*.88,0);
  c.bezierCurveTo(-radius*.47,-radius*.8,radius*.62,-radius*.6,radius*.97,-radius*.11);
  c.bezierCurveTo(radius*.12,radius*.93,-radius*.44,radius*.78,-radius*.88,0);
  c.closePath();c.clip();
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
  // Thread endpoints are anchored at the three eyes and the woven border.
  // An emergent letter is perceived in their tensioned negative space; we
  // do not draw an alphabet glyph or place a D SVG over the textile.
  const P=(x,y)=>[originX+w*x,originY+h*y];
  const anchors=[P(.25,.17),P(.255,.50),P(.25,.82)];
  const witnesses=EYES.map(eye=>P(eye.x,eye.y));
  c.save();c.globalAlpha=.72*amount;
  c.lineCap="round";
  for(let k=0;k<10;k++){
   const v=(k-4.5)*.0042;
   c.beginPath();
   c.moveTo(anchors[0][0]+w*v,anchors[0][1]);
   c.bezierCurveTo(anchors[0][0]+w*(.02+v),originY+h*.36,
    anchors[2][0]+w*(.007+v),originY+h*.66,anchors[2][0]+w*v,anchors[2][1]);
   c.strokeStyle=k%3===0?"#e9d0aeac":"#1c3834b3";
   c.lineWidth=k%4===0?1.6:.7;c.stroke();
   c.beginPath();
   c.moveTo(anchors[0][0],anchors[0][1]+k*.4);
   c.bezierCurveTo(originX+w*.74,originY+h*(.05+k*.002),
    originX+w*(.94+v),originY+h*(.39+k*.003),
    witnesses[2][0],witnesses[2][1]);
   c.bezierCurveTo(originX+w*.77,originY+h*(.82-k*.002),
    originX+w*.49,originY+h*(.87-k*.002),
    anchors[2][0],anchors[2][1]);
   c.strokeStyle=k%2?"#dec29a91":"#2a504dbb";
   c.lineWidth=k%5===0?1.8:.85;c.stroke();
  }
  for(const [x,y] of witnesses){
   c.beginPath();c.arc(x,y,2.9,0,Math.PI*2);
   c.fillStyle="#dbc3a3";c.fill();
  }
  c.restore();
 }


 function paintPassage(c,w,h,textileW,textileH,originX,amount){
  if(amount<=0)return;
  const material=EYES.find(x=>x.sourceId===selectedSourceId)||EYES[0];
  const angle=w<680?-.12:-.095;
  const lx=originX+textileW*material.x-textileW*.47;
  const ly=textileH*material.y-textileH*.48;
  const sx=w*.5+lx*Math.cos(angle)-ly*Math.sin(angle);
  const sy=h*(w<700?.38:.43)+lx*Math.sin(angle)+ly*Math.cos(angle);
  const endX=w*(w<700?.98:.93),endY=h*(w<700?.25:.43);
  c.save();c.lineCap="round";c.globalAlpha=.60*amount;
  // Fibers don't dissolve to reveal a new website. They stay continuous
  // from the selected aperture until the underlying archival camera resolves.
  for(let i=0;i<23;i++){
   const k=(i-11)/11,side=k*(12+amount*15);
   c.beginPath();c.moveTo(sx+side*.35,sy+side*.44);
   c.bezierCurveTo(sx+(endX-sx)*.28,sy+side*2.1,
      endX-(endX-sx)*(.15+Math.abs(k)*.08),
      endY+side*1.6,endX+w*.07,endY+side*.5);
   c.strokeStyle=i%4===0?"#d8b18b":i%2===0?"#92b4ab":"#d6c5a4";
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
  const scale=w<700?clamp(w/860,.40,.60):Math.min(w/1300,h/860,.99);
  const textileW=960*scale,textileH=550*scale;
  // A 2.5D tilted object with thickness. Mobile keeps its physical proportions
  // instead of stretching it to cover the viewport.
  c.save();
  c.translate(w*.50,h*(w<700?.38:.43));
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
   eye(c,originX+textileW*EYES[0].x,originY+textileH*EYES[0].y,
    110*scale,witness.amount);
  }
  if(retained.amount>0){
   retainedEye(c,originX+textileW*EYES[1].x,originY+textileH*EYES[1].y,
    104*scale,retained.amount);
  }
  if(visitor.amount>0){
   visitorEye(c,originX+textileW*EYES[2].x,originY+textileH*EYES[2].y,
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
  paintPassage(c,w,h,textileW,textileH,originX,
   Math.max(material.paths,departureAmount));
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
  dispatchEvent(new CustomEvent("darb:ritual-enter",{detail:{sourceId:selectedSourceId,lang}}));
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
  setProgress(starting.value+Math.max(xchange,ychange*.85));
 });
 function release(e){
  if(e.pointerId!==pointerId)return;pointerId=null;starting=null;
  if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
 }
 canvas.addEventListener("pointerup",release);canvas.addEventListener("pointercancel",release);
 canvas.addEventListener("wheel",e=>{
  e.preventDefault();
  if(e.deltaY>0&&targetProgress>=.985){enterEye(nearestEyeFromGaze());return;}
  setProgress(targetProgress+Math.sign(e.deltaY)*.095);
 },{passive:false});
 pull.addEventListener("click",onPull);
 traceButtons.forEach(button=>button.addEventListener("click",()=>selectTrace(button.dataset.ritualTrace)));
 enter.addEventListener("click",()=>enterEye(nearestEyeFromGaze()));
 eyeTargets.forEach(button=>button.addEventListener("click",()=>enterEye(button.dataset.eyeEntry)));
 skip.addEventListener("click",()=>leave({skipRitual:true}));
 locale.addEventListener("click",()=>{lang=lang==="en"?"ar":"en";renderText();invalidate()});
 accessibility.addEventListener("click",()=>{ritual=transitionRitual(ritual,"SET_REDUCED_MOTION");progress=targetProgress;renderText();invalidate()});
 audioButton.addEventListener("click",async()=>{
  if(sound.enabled){
   sound.disable();ritual=transitionRitual(ritual,"SET_QUIET");
  }else{
   try{
    if(await sound.enable())ritual=transitionRitual(ritual,"ENABLE_SOUND");
   }catch(e){console.warn("Visitor audio unavailable",e);}
  }
  renderText();
 });
 addEventListener("keydown",e=>{
  if(departed)return;
  if(e.key==="Escape"){e.preventDefault();leave({skipRitual:true});return;}
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

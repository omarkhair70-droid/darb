import {validateArchive,getConnections,findEvidencePath} from "/graph.mjs";
import {layoutCatalog,validateAtlas,cameraForObject,WORLD_WIDTH,WORLD_HEIGHT,CLUSTERS} from "/world-layout.mjs";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const local=(v)=>v?.[lang]||v?.en||"";
const sourceBase="https://github.com/omarkhair70-droid/darb/blob/main/assets/visual-audit-77.csv#L";
const escaped=(v)=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const copy={
 en:{
  memory:"THE LIVING MEMORY",explore:"WANDER",journey:"FOLLOW STORY",
  spatialHint:"DRAG TO WANDER · SCROLL TO ZOOM · SELECT AN IMAGE",indexTitle:"There is no single beginning.",
  indexFoot:"ONE CONTINUOUS WORLD · SEVEN MOMENTS",returnScene:"RETURN TO THE EXPERIENCE",
  readingTitle:"Every image holds a way in.",readingIntro:"An uninterrupted, readable path through the same source material.",
  readingFoot:"Research experience built from the Darb 1718 institutional overview · not the official public website.",
  source:"SEE SOURCE RECORD ↗",follow:"FOLLOW THIS MOMENT ↗",
  direction:"SCROLL TO MOVE THROUGH THE ARCHIVE",wander:"DRAG · EXPLORE · OPEN OBJECTS",
  video:"REFERENCE: 2026 OVERVIEW / DARB 1718",
  index:["A place, in motion","The larger constellation","A conversation","The act of looking","Light becomes an image","A story you can hold","No final frame"]
 },
 ar:{
  memory:"الذاكرة الحية",explore:"تجوّل",journey:"اتبع الحكاية",
  spatialHint:"اسحب عشان تتجوّل · مرّر للتقريب · اختار صورة",indexTitle:"مفيش بداية واحدة للحكاية.",
  indexFoot:"مساحة واحدة مستمرة · سبع لحظات",returnScene:"ارجع للتجربة",
  readingTitle:"كل صورة ليها مدخل.",readingIntro:"مسار قراءة واضح لنفس المادة الأرشيفية، بدون حركة.",
  readingFoot:"تجربة بحثية من ملف درب 1718 · مش الموقع الرسمي للمؤسسة.",
  source:"افتح المصدر ↗",follow:"اتبع اللحظة دي ↗",
  direction:"مرّر عشان تتنقل جوّه الأرشيف",wander:"اسحب · اكتشف · افتح صورة",
  video:"المصدر: ملف درب 2026",
  index:["مكان بيتحرك","الأرشيف الأوسع","حوار","فعل النظر","الضوء والصورة","حكاية ملموسة","مفيش نهاية واحدة"]
 }
};
let moments=[],media=[],catalog=null,chapterBook=null;
let story=null,lang="en",mode="journey",reading=false,openItem=null,currentBeat=0;
let viewport={w:innerWidth,h:innerHeight},target={...moments[0].camera},current={...target};
let lastScroll=-1,rafId=0,dirty=true,drag=null,scrollEnd=1,hideFrame=0;
const imageOf=(id)=>mediaRecord(id)?.src ?? "";
const mediaRecord=(id)=>media.find(item=>item.id===id);
function makeWorld(){
 const root=$("#artifacts");
 root.replaceChildren();
 const frag=document.createDocumentFragment();
 media.forEach((item,i)=>{
  const figure=document.createElement("figure");
  figure.className="artifact";
  figure.dataset.id=String(item.id);
  figure.dataset.category=item.kind;
  figure.dataset.cluster=item.cluster;
  figure.style.left=item.x+"px";
  figure.style.top=item.y+"px";
  figure.style.width=item.w+"px";
  figure.style.height=item.h+"px";
  figure.style.transform="rotate("+item.r+"deg)";
  const button=document.createElement("button");
  button.type="button";
  button.className="artifact-inner";
  button.setAttribute("aria-label",local(item.title));
  const image=document.createElement("img");
  image.alt=local(item.title);
  // The atlas uses genuine embedded source art, with browser-native defer for distant objects.
  image.src=item.src;
  image.loading=i<18?"eager":"lazy";
  image.decoding="async";
  image.addEventListener("error",()=>{
   figure.classList.add("image-error");
   button.innerHTML="<span>ARCHIVE IMAGE "+item.id+"</span>";
  });
  button.append(image);
  button.addEventListener("click",()=>inspect(item.id));
  const caption=document.createElement("figcaption");
  caption.textContent=local(item.title)+" · "+local(item.project);
  figure.append(button,caption);
  frag.append(figure);
 });
 root.append(frag);
 // Archive program labels are part of the same scene, not conventional page headings.
 const annotations=document.createElement("div");
 annotations.className="world-annotations";
 for(const [key,cluster] of Object.entries(CLUSTERS)){
  const group=media.filter(x=>x.cluster===key);
  if(!group.length)continue;
  const div=document.createElement("div");
  div.className="zone-label";
  div.dataset.cluster=key;
  div.style.left=cluster.x+"px";
  div.style.top=(cluster.y+530)+"px";
  div.innerHTML="<span>ARCHIVE / "+String(group.length).padStart(2,"0")+"</span>"+
    "<strong>"+escaped(lang==="ar"?cluster.ar:cluster.en)+"</strong>";
  annotations.append(div);
 }
 root.append(annotations);
 // The thin links here denote shared programme records only; they do not assert person-to-person authorship.
 const link=$("#worldLinks");
 link.setAttribute("viewBox","0 0 "+WORLD_WIDTH+" "+WORLD_HEIGHT);
 let paths=[];
 for(const [key,cluster] of Object.entries(CLUSTERS)){
  const group=media.filter(x=>x.cluster===key);
  if(group.length<2)continue;
  const pts=group.map(x=>[x.x+x.w/2,x.y+x.h/2]);
  for(let j=1;j<pts.length;j++){
   const p=pts[j-1],q=pts[j];
   const mx=(p[0]+q[0])/2;
   paths.push('<path data-cluster="'+key+'" d="M '+p[0]+' '+p[1]+' Q '+mx+' '+(p[1]+q[1])/2+' '+q[0]+' '+q[1]+'"/>');
  }
 }
 link.innerHTML=paths.join("");
}

function renderNarrative(beat){
 const m=moments[beat];
 const count=String(moments.length).padStart(2,"0");
 $("#narrativeOverline").textContent=String(beat+1).padStart(2,"0")+" / "+count+
   " — "+(lang==="en"?"THE LIVING MEMORY":"الذاكرة الحية");
 $("#statementA").textContent=m[lang][0];
 $("#statementB").textContent=m[lang][1];
 $("#narrativeBody").textContent=local(m.body);
 $("#chapterSource").textContent=local(m.label);
 $("#axisNumber").textContent=String(beat+1).padStart(2,"0")+" / "+count;
 $("#axisFill").style.width=((beat+1)/moments.length*100)+"%";
 $("#nextBtn").textContent=beat===moments.length-1?"↺":"↓";
 $("#canvas").dataset.beat=String(beat);
 $("#experience").dataset.beat=String(beat);
 const focusId=m.focusId;
 $$(".artifact").forEach(fig=>fig.classList.toggle("is-focus",Number(fig.dataset.id)===focusId));
}

function setLanguage(next){
 lang=next;document.documentElement.lang=lang;
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $$("[data-i18n]").forEach(el=>el.textContent=copy[lang][el.dataset.i18n]);
 $("#localeBtn").textContent=lang==="en"?"عربي":"EN";
 $("#modeBtn").lastElementChild.textContent=mode==="journey"?copy[lang].explore:copy[lang].journey;
 $("#instructionText").textContent=copy[lang].direction;
 $$(".artifact").forEach(fig=>{
  const item=mediaRecord(Number(fig.dataset.id));
  fig.querySelector("figcaption").textContent=local(item.title)+" · "+item.project;
  fig.querySelector("button").setAttribute("aria-label",local(item.title));
  fig.querySelector("img").alt=local(item.title);
 });
 renderNarrative(currentBeat);renderIndex();renderReading();
 if(openItem!==null)fillDetail(openItem);
}
function cameraForProgress(progress){
 const a=Math.floor(progress),b=Math.min(moments.length-1,a+1);
 const f=progress-a;
 // A gentle cubic blend makes camera acceleration continuous at every waypoint.
 const t=f*f*(3-2*f);
 const ca=moments[a].camera,cb=moments[b].camera;
 return {x:lerp(ca.x,cb.x,t),y:lerp(ca.y,cb.y,t),z:lerp(ca.z,cb.z,t),r:lerp(ca.r,cb.r,t)};
}
function scrollProgress(){
 const root=$("#experience"), top=root.offsetTop;
 scrollEnd=Math.max(1,root.offsetHeight-innerHeight);
 return clamp((scrollY-top)/scrollEnd,0,1)*(moments.length-1);
}
function updateScroll(){
 if(mode!=="journey")return;
 const progress=scrollProgress();const beat=clamp(Math.round(progress),0,moments.length-1);
 target=cameraForProgress(progress);
 if(beat!==currentBeat){currentBeat=beat;renderNarrative(beat);}
 dirty=true;
}
function positionWorld(){
 const responsive=clamp(Math.min(viewport.w/1340,1),.43,1);
 const zoom=current.z*responsive;
 const rad=current.r*Math.PI/180;
 const cx=current.x*Math.cos(rad)-current.y*Math.sin(rad);
 const cy=current.x*Math.sin(rad)+current.y*Math.cos(rad);
 const focusY=viewport.h*(viewport.w<800?lerp(.38,.31,clamp((current.z-.6)/.7,0,1)):.50);
 const dx=viewport.w*.5-zoom*cx,dy=focusY-zoom*cy;
 $("#world").style.transform="translate3d("+dx.toFixed(2)+"px,"+dy.toFixed(2)+"px,0) scale("+zoom.toFixed(5)+") rotate("+current.r.toFixed(3)+"deg)";
}
function frame(){
 const speed=window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.32 : 0.085;
 for(const key of ["x","y","z","r"])current[key]=lerp(current[key],target[key],speed);
 positionWorld();
 rafId=requestAnimationFrame(frame);
}
function jumpTo(beat){
 const root=$("#experience");const limit=Math.max(1,root.offsetHeight-innerHeight);
 window.scrollTo({top:root.offsetTop+limit*beat/(moments.length-1),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
}
function enterMode(next){
 mode=next;$("#experience").dataset.mode=mode;
 $("#modeBtn").setAttribute("aria-pressed",String(mode==="explore"));
 $("#modeBtn").lastElementChild.textContent=mode==="journey"?copy[lang].explore:copy[lang].journey;
 $("#spatialHint").hidden=mode!=="explore";
 $("#instruction").hidden=mode==="explore";
 if(mode==="explore"){
  target={...moments[6].camera};
  // The exploratory field starts at a legible overview, with free pan and zoom.
  $("#canvas").dataset.beat="6";
 }else{
  updateScroll();
 }
 closeDetail();
 dirty=true;
}
function inspect(id){
 const item=mediaRecord(id);if(!item)return;
 openItem=id;fillDetail(id);$("#detail").hidden=false;
 if(mode==="explore"){
  target={x:item.x+item.w/2,y:item.y+item.h/2,z:Math.min(1.12,1200/item.w),r:0};
 }
}
function fillDetail(id){
 const item=mediaRecord(id);if(!item)return;
 $("#detailMarker").textContent="ARCHIVE IMAGE "+String(id).padStart(2,"0")+" / PDF "+item.page;
 $("#detailTitle").textContent=local(item.title);
 $("#detailText").textContent=local(item.desc);
 $("#detailMeta").textContent=item.project+" · DARB 1718 OVERVIEW 2026 · P."+item.page;
 $("#sourceBtn").textContent=copy[lang].source;
 $("#followBtn").textContent=copy[lang].follow;
 $("#followBtn").hidden=![39,40,41,42].includes(id);
}
function closeDetail(){$("#detail").hidden=true;openItem=null}
function renderIndex(){
 const wrap=$("#indexItems");wrap.innerHTML="";
 moments.forEach((m,i)=>{
  const btn=document.createElement("button");btn.type="button";btn.className="index-item";
  btn.innerHTML="<small>"+String(i+1).padStart(2,"0")+"</small><strong>"+escaped(copy[lang].index[i])+"</strong><em>↗</em>";
  btn.addEventListener("click",()=>{closeIndex();enterMode("journey");jumpTo(i);});
  wrap.append(btn);
 });
}
function openIndex(){
 $("#index").hidden=false;$("#indexBtn").setAttribute("aria-expanded","true");
 $("#closeIndex").focus();
}
function closeIndex(){
 $("#index").hidden=true;$("#indexBtn").setAttribute("aria-expanded","false");
 $("#indexBtn").focus({preventScroll:true});
}
function renderReading(){
 const ol=$("#readingList");ol.innerHTML="";
 moments.forEach((m,i)=>{
  const li=document.createElement("li");
  const heading=document.createElement("h3");heading.textContent=m[lang].join(" ");
  const p=document.createElement("p");p.textContent=local(m.body);
  const desc=document.createElement("div");desc.append(heading,p);
  const prefix=document.createElement("span");prefix.textContent=String(i+1).padStart(2,"0");
  li.append(prefix,desc);
  const focusId=keyFocus[i];
  if(focusId){
   const item=mediaRecord(focusId), fig=document.createElement("figure");
   const image=document.createElement("img");image.src=imageOf(focusId);image.alt=local(item.title);image.loading="lazy";
   const caption=document.createElement("figcaption");
   caption.textContent=local(item.title)+" · PDF p."+item.page;
   fig.append(image,caption);li.append(fig);
  }
  ol.append(li);
 });
}
function installInput(){
 $("#localeBtn").addEventListener("click",()=>setLanguage(lang==="en"?"ar":"en"));
 $("#modeBtn").addEventListener("click",()=>enterMode(mode==="journey"?"explore":"journey"));
 $("#homeBtn").addEventListener("click",()=>{enterMode("journey");jumpTo(0);});
 $("#nextBtn").addEventListener("click",()=>{
  if(currentBeat===moments.length-1){enterMode("explore");return;}
  jumpTo(currentBeat+1);
 });
 $("#indexBtn").addEventListener("click",()=>$("#index").hidden?openIndex():closeIndex());
 $("#closeIndex").addEventListener("click",closeIndex);
 $("#closeDetail").addEventListener("click",closeDetail);
 $("#followBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const next={39:2,40:3,41:4,42:5}[openItem];
  closeDetail();enterMode("journey");jumpTo(next);
 });
 $("#sourceBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const item=mediaRecord(openItem);
  window.open(sourceBase+item.page,"_blank","noopener,noreferrer");
 });
 $("#backToScene").addEventListener("click",()=>jumpTo(currentBeat));
 addEventListener("scroll",()=>{
  updateScroll();
  const threshold=$("#reading").getBoundingClientRect().top;
  const now=threshold<innerHeight*.64;
  if(reading!==now){reading=now;document.body.classList.toggle("is-reading",reading);}
 },{passive:true});
 addEventListener("resize",()=>{viewport={w:innerWidth,h:innerHeight};updateScroll();},{passive:true});
 addEventListener("keydown",event=>{
  if(event.key==="Escape"){if(!$("#index").hidden)closeIndex();else closeDetail();return;}
  if($("#index").hidden && mode==="journey" && event.target.tagName!=="BUTTON"){
   if(event.key==="ArrowDown"||event.key==="ArrowRight"){event.preventDefault();jumpTo(Math.min(6,currentBeat+1));}
   if(event.key==="ArrowUp"||event.key==="ArrowLeft"){event.preventDefault();jumpTo(Math.max(0,currentBeat-1));}
  }
 });
 const canvas=$("#canvas");
 canvas.addEventListener("pointerdown",event=>{
  if(mode!=="explore"||event.target.closest("button"))return;
  drag={startX:event.clientX,startY:event.clientY,x:target.x,y:target.y,zoom:target.z};
  canvas.setPointerCapture(event.pointerId);
 });
 canvas.addEventListener("pointermove",event=>{
  if(!drag||mode!=="explore")return;
  const ratio=clamp(Math.min(innerWidth/1340,1),.43,1);
  const z=Math.max(.1,drag.zoom*ratio);
  target.x=clamp(drag.x-(event.clientX-drag.startX)/z,0,5200);
  target.y=clamp(drag.y-(event.clientY-drag.startY)/z,0,3000);
 });
 const end=()=>drag=null;
 canvas.addEventListener("pointerup",end);canvas.addEventListener("pointercancel",end);
 canvas.addEventListener("wheel",event=>{
  if(mode!=="explore")return;
  event.preventDefault();
  target.z=clamp(target.z*Math.exp(-event.deltaY*.0008),.2,2.7);
 },{passive:false});
}
async function boot(){
 try{
  const response=await fetch("/story.json",{cache:"no-cache"});
  if(!response.ok)throw new Error("Archive source unavailable: "+response.status);
  story=await response.json();
  const issues=validateArchive(story);
  if(issues.length)throw new Error("Archive evidence invalid: "+issues.join("; "));
  makeWorld();renderIndex();renderReading();installInput();setLanguage("en");renderNarrative(0);
  updateScroll();rafId=requestAnimationFrame(frame);
 }catch(error){
  console.error(error);
  $("#narrativeBody").textContent="Archive material could not load. The readable experience is temporarily unavailable.";
 }
}
boot();

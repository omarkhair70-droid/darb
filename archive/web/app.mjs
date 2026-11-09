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
  indexFoot:"ONE CONTINUOUS WORLD · 77 SOURCE RECORDS",searchLabel:"SEARCH THE ARCHIVE",searchPlaceholder:"Search artworks, programmes, practices...",returnScene:"RETURN TO THE EXPERIENCE",
  readingTitle:"Every image holds a way in.",readingIntro:"An uninterrupted, readable path through the same source material.",
  readingFoot:"Research experience built from the Darb 1718 institutional overview · not the official public website.",
  source:"SEE SOURCE RECORD ↗",follow:"FOLLOW THIS MOMENT ↗",
  direction:"SCROLL TO MOVE THROUGH THE ARCHIVE",wander:"DRAG · EXPLORE · OPEN OBJECTS",
  video:"REFERENCE: 2026 OVERVIEW / DARB 1718",
  signatureWhisper:"NOT WRITTEN OVER THE ARCHIVE. WOVEN FROM IT.",
  index:["A place, in motion","The larger constellation","A conversation","The act of looking","Light becomes an image","A story you can hold","No final frame"]
 },
 ar:{
  memory:"الذاكرة الحية",explore:"تجوّل",journey:"اتبع الحكاية",
  spatialHint:"اسحب عشان تتجوّل · مرّر للتقريب · اختار صورة",indexTitle:"مفيش بداية واحدة للحكاية.",
  indexFoot:"عالم واحد مستمر · ٧٧ عنصرًا أرشيفيًا",searchLabel:"ابحث في الأرشيف",searchPlaceholder:"عمل، معرض، ورشة، برنامج...",returnScene:"ارجع للتجربة",
  readingTitle:"كل صورة ليها مدخل.",readingIntro:"مسار قراءة واضح لنفس المادة الأرشيفية، بدون حركة.",
  readingFoot:"تجربة بحثية من ملف درب 1718 · مش الموقع الرسمي للمؤسسة.",
  source:"افتح المصدر ↗",follow:"اتبع اللحظة دي ↗",
  direction:"مرّر عشان تتنقل جوّه الأرشيف",wander:"اسحب · اكتشف · افتح صورة",
  video:"المصدر: ملف درب 2026",
  signatureWhisper:"مش اسم فوق الأرشيف. ده اسم منسوج من حكاياته.",
  index:["مكان بيتحرك","الأرشيف الأوسع","حوار","فعل النظر","الضوء والصورة","حكاية ملموسة","مفيش نهاية واحدة"]
 }
};
let moments=[],media=[],catalog=null,chapterBook=null,threads=null;
let story=null,lang="en",mode="journey",reading=false,openItem=null,currentBeat=0,encounter=null;
let viewport={w:innerWidth,h:innerHeight},target={x:4600,y:3200,z:.2,r:0,fx:.5},current={...target};
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
 for(const thread of threads.connections){
  const from=mediaRecord(thread.fromId),to=mediaRecord(thread.toId);
  if(!from||!to)continue;
  const ax=from.x+from.w/2,ay=from.y+from.h/2;
  const bx=to.x+to.w/2,by=to.y+to.h/2;
  const dx=bx-ax,dy=by-ay;
  paths.push('<path class="curatorial-thread" data-thread="'+thread.id+
    '" d="M '+ax+' '+ay+' C '+(ax+dx*.37)+' '+(ay-210)+' '+(bx-dx*.27)+' '+(by+180)+' '+bx+' '+by+'"/>');
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
 lang=next;
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $$("[data-i18n]").forEach(el=>el.textContent=copy[lang][el.dataset.i18n]||"");
 $("#localeBtn").textContent=lang==="en"?"عربي":"EN";
 $("#modeBtn").lastElementChild.textContent=mode==="journey"?copy[lang].explore:copy[lang].journey;
 $("#instructionText").textContent=copy[lang].direction;
 $("#archiveSearch").placeholder=copy[lang].searchPlaceholder;
 $$(".artifact").forEach(fig=>{
  const item=mediaRecord(Number(fig.dataset.id));
  fig.querySelector("figcaption").textContent=local(item.title)+" · "+local(item.project);
  const button=fig.querySelector("button");
  button.setAttribute("aria-label",local(item.title));
  const image=fig.querySelector("img");
  if(image)image.alt=local(item.title);
 });
 $$(".zone-label").forEach(el=>{const zone=CLUSTERS[el.dataset.cluster];el.querySelector("strong").textContent=lang==="ar"?zone.ar:zone.en;});
 renderNarrative(currentBeat);
 renderIndex();
 renderReading();
 if(openItem!==null)fillDetail(openItem);
}

function cameraForProgress(progress){
 const a=Math.floor(progress),b=Math.min(moments.length-1,a+1);
 const f=progress-a;
 // A gentle cubic blend makes camera acceleration continuous at every waypoint.
 const t=f*f*(3-2*f);
 const ca=moments[a].camera,cb=moments[b].camera;
 return {x:lerp(ca.x,cb.x,t),y:lerp(ca.y,cb.y,t),z:lerp(ca.z,cb.z,t),r:lerp(ca.r,cb.r,t),fx:lerp(ca.fx??.5,cb.fx??.5,t)};
}
function scrollProgress(){
 const root=$("#experience"), top=root.offsetTop;
 scrollEnd=Math.max(1,root.offsetHeight-innerHeight);
 return clamp((scrollY-top)/scrollEnd,0,1)*(moments.length-1);
}
function updateScroll(){
 if(mode!=="journey"||encounter)return;
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
 const focusX=viewport.w*(viewport.w<800?.5:current.fx??.5);
 const dx=focusX-zoom*cx,dy=focusY-zoom*cy;
 $("#world").style.transform="translate3d("+dx.toFixed(2)+"px,"+dy.toFixed(2)+"px,0) scale("+zoom.toFixed(5)+") rotate("+current.r.toFixed(3)+"deg)";
 const zoneLabels=$(".world-annotations");
 if(zoneLabels)zoneLabels.style.opacity=String(clamp((.85-current.z)/.55,0,1));
}
function frame(){
 const speed=window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.32 : 0.085;
 for(const key of ["x","y","z","r","fx"])current[key]=lerp(current[key],target[key],speed);
 positionWorld();
 rafId=requestAnimationFrame(frame);
}
function jumpTo(beat){
 const root=$("#experience");const limit=Math.max(1,root.offsetHeight-innerHeight);
 window.scrollTo({top:root.offsetTop+limit*beat/(moments.length-1),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
}
function enterMode(next){
 if(encounter)closeDetail();
 mode=next;$("#experience").dataset.mode=mode;
 $("#modeBtn").setAttribute("aria-pressed",String(mode==="explore"));
 $("#modeBtn").lastElementChild.textContent=mode==="journey"?copy[lang].explore:copy[lang].journey;
 $("#spatialHint").hidden=mode!=="explore";
 $("#spatialControls").hidden=mode!=="explore";
 $("#instruction").hidden=mode==="explore";
 if(mode==="explore"){
  target={...current};
  // The exploratory field starts at a legible overview, with free pan and zoom.
  $("#canvas").dataset.beat="6";
 }else{
  updateScroll();
 }
 closeDetail();
 dirty=true;
}
function encounterCamera(item){
 const responsive=clamp(Math.min(viewport.w/1340,1),.43,1);
 const desiredWidth=viewport.w*(viewport.w<800?.78:.43);
 const desiredHeight=viewport.h*(viewport.w<800?.42:.68);
 const zoom=clamp(Math.min(desiredWidth/(item.w*responsive),desiredHeight/(item.h*responsive)),.72,2.45);
 return {...cameraForObject(item,{zoom,rotation:-item.r}),fx:viewport.w<800?.5:.69};
}
function inspect(id){
 const item=mediaRecord(id);if(!item)return;
 if(!encounter){
  encounter={originMode:mode,originCamera:{...current},originTarget:{...target},
   scroll:scrollY,history:[],focus:document.activeElement,bodyOverflow:document.body.style.overflow};
  document.body.style.overflow="hidden";
 }
 if(encounter.history.at(-1)!==id)encounter.history.push(id);
 openItem=id;
 mode="encounter";
 $("#experience").dataset.mode="encounter";
 $("#canvas").dataset.material=id===41||id===42?"cyanotype":
  item.kind.includes("photo")?"photography":
  item.kind.includes("installation")?"installation":"paper";
 $("#detail").hidden=false;
 target=encounterCamera(item);
 $$(".artifact").forEach(fig=>fig.classList.toggle("is-encounter",Number(fig.dataset.id)===id));
 emphasizeSourceThreads(item);
 fillDetail(id);
 $("#closeDetail").setAttribute("aria-label",lang==="ar"?"ارجع في الأرشيف":"Return through the archive");
}
function emphasizeSourceThreads(item){
 const relevant=new Set(threads.connections
   .filter(t=>t.fromCluster===item.cluster||t.toCluster===item.cluster)
   .map(t=>t.id));
 $$("#worldLinks path").forEach(path=>path.classList.toggle(
  "is-active-source-thread",
  path.dataset.cluster===item.cluster||relevant.has(path.dataset.thread)
 ));
}
function retraceEncounter(){
 if(!encounter)return;
 if(encounter.history.length>1){
  encounter.history.pop();
  const previous=mediaRecord(encounter.history.at(-1));
  if(!previous){closeDetail();return;}
  openItem=previous.id;
  target=encounterCamera(previous);
  $("#canvas").dataset.material=previous.id===41||previous.id===42?"cyanotype":
   previous.kind.includes("photo")?"photography":"paper";
  $$(".artifact").forEach(fig=>fig.classList.toggle("is-encounter",Number(fig.dataset.id)===previous.id));
  emphasizeSourceThreads(previous);
  fillDetail(previous.id);
 }else closeDetail();
}
function fillDetail(id){
 const item=mediaRecord(id);if(!item)return;
 $("#detailMarker").textContent="ARCHIVE / "+String(id).padStart(2,"0")+" · PDF "+item.page+" / XREF "+item.xref;
 $("#detailTitle").textContent=local(item.title);
 $("#detailText").textContent=item.id===41
  ? (lang==="ar"?"أثر الضوء على السطح. السيانوتايب هنا جزء من تجربة حكاوي الفسطاط.":"Light leaves a physical record. Cyanotype is one practice documented in Tales of Fustat.")
  : item.id===39
  ? (lang==="ar"?"المكان بيتحكي من خلال الناس. صورة للقاءات ضمن حكاوي الفسطاط.":"A neighbourhood is told through its encounters. A conversation documented in Tales of Fustat.")
  : (lang==="ar"?"عنصر من أرشيف "+item.project.ar+". افتح خيطًا من نفس البرنامج أو انتقل لعمل مرتبط.":"An object from "+item.project.en+". Follow a record from this programme or take a related path.");
 $("#detailMeta").textContent=local(item.project)+" · DARB 1718 OVERVIEW 2026 · P."+item.page;
 $("#sourceBtn").textContent=copy[lang].source;
 $("#followBtn").textContent=copy[lang].follow;
 const beat=nearestChapterFor(item);
 $("#followBtn").hidden=beat<0;
 const related=media.filter(other=>other.cluster===item.cluster&&other.id!==item.id).slice(0,8);
 const host=$("#relatedObjects");host.replaceChildren();
 const heading=document.createElement("div");heading.className="related-title";
 heading.textContent=lang==="ar"?"من نفس البرنامج · "+related.length:"FROM THE SAME PROGRAMME · "+related.length;
 host.append(heading);
 for(const record of related){
  const btn=document.createElement("button");btn.type="button";btn.className="related-item";
  btn.innerHTML='<img src="'+record.src+'" loading="lazy" alt=""/><span>'+escaped(local(record.title))+'</span><b>↗</b>';
  btn.addEventListener("click",()=>inspect(record.id));
  host.append(btn);
 }
 const thematic=threads.connections.filter(t=>
  t.fromCluster===item.cluster||t.toCluster===item.cluster);
 if(thematic.length){
  const name=document.createElement("div");name.className="related-title thread-title";
  name.textContent=lang==="ar"?"خيوط لممارسات تانية · مقارنة تحريرية":"OTHER PRACTICES · CURATED CONNECTIONS";
  host.append(name);
  for(const thread of thematic){
   const targetId=thread.fromCluster===item.cluster?thread.toId:thread.fromId;
   const target=mediaRecord(targetId);
   if(!target)continue;
   const btn=document.createElement("button");btn.type="button";btn.className="related-item thread-item";
   btn.innerHTML='<img src="'+target.src+'" loading="lazy" alt=""/><span><strong>'+
     escaped(local(thread.title))+'</strong><small>'+escaped(local(target.project))+
     '</small></span><b>↗</b>';
   btn.title=local(thread.description);
   btn.addEventListener("click",()=>{if(mode!=="explore")enterMode("explore");inspect(target.id);});
   host.append(btn);
  }
 }
}
function nearestChapterFor(item){
 let index=moments.findIndex(ch=>ch.focusId===item.id);
 if(index>=0)return index;
 return moments.findIndex(ch=>ch.focusId!==null&&mediaRecord(ch.focusId)?.cluster===item.cluster);
}
function closeDetail(){
 if(encounter){
  const previous=encounter;
  mode=previous.originMode;
  $("#experience").dataset.mode=mode;
  target={...previous.originTarget};
  $("#canvas").removeAttribute("data-material");
  $$(".artifact").forEach(fig=>fig.classList.remove("is-encounter"));
  $$("#worldLinks path").forEach(path=>path.classList.remove("is-active-source-thread"));
  document.body.style.overflow=previous.bodyOverflow;
  encounter=null;
  if(mode==="journey")updateScroll();
  if(previous.focus?.isConnected)previous.focus.focus({preventScroll:true});
 }
 $("#detail").hidden=true;
 openItem=null;
}

function renderIndex(){
 const wrap=$("#indexItems");wrap.replaceChildren();
 moments.forEach((m,i)=>{
  const btn=document.createElement("button");btn.type="button";btn.className="index-item";
  const title=escaped(m[lang].join(" "));
  btn.innerHTML="<small>"+String(i+1).padStart(2,"0")+"</small><strong>"+title+"</strong><em>↗</em>";
  btn.addEventListener("click",()=>{closeIndex();enterMode("journey");jumpTo(i);});
  wrap.append(btn);
 });
 renderSearch();
}
function renderSearch(){
 const query=$("#archiveSearch").value.trim().toLocaleLowerCase();
 const results=$("#searchResults");
 const index=$("#indexItems");
 results.replaceChildren();
 results.hidden=!query;
 index.hidden=Boolean(query);
 if(!query)return;
 const hits=media.filter(item=>
  [item.title.en,item.title.ar,item.project.en,item.project.ar,item.kind,String(item.id)]
    .some(field=>field?.toLocaleLowerCase().includes(query)));
 for(const item of hits.slice(0,30)){
  const btn=document.createElement("button");btn.className="search-hit";btn.type="button";
  btn.innerHTML='<img src="'+item.src+'" alt="" loading="lazy"/><span><strong>'+escaped(local(item.title))+
    '</strong><small>'+escaped(local(item.project))+" · PDF "+item.page+
    '</small></span><b>↗</b>';
  btn.addEventListener("click",()=>{closeIndex();enterMode("explore");inspect(item.id);});
  results.append(btn);
 }
 if(!hits.length){
  const p=document.createElement("p");p.textContent=lang==="ar"?"مفيش نتائج مطابقة.":"No matching archival records.";
  results.append(p);
 }
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
 const ol=$("#readingList");ol.replaceChildren();
 moments.forEach((m,i)=>{
  const li=document.createElement("li");
  const heading=document.createElement("h3");heading.textContent=m[lang].join(" ");
  const p=document.createElement("p");p.textContent=local(m.body);
  const desc=document.createElement("div");desc.append(heading,p);
  const prefix=document.createElement("span");prefix.textContent=String(i+1).padStart(2,"0");
  li.append(prefix,desc);
  if(m.focusId){
   const item=mediaRecord(m.focusId),fig=document.createElement("figure");
   const image=document.createElement("img");image.src=item.src;image.alt=local(item.title);image.loading="lazy";
   const caption=document.createElement("figcaption");
   caption.textContent=local(item.title)+" · "+local(item.project)+" · PDF p."+item.page;
   fig.append(image,caption);li.append(fig);
  }
  ol.append(li);
 });
}

function installInput(){
 $("#localeBtn").addEventListener("click",()=>setLanguage(lang==="en"?"ar":"en"));
 $("#modeBtn").addEventListener("click",()=>enterMode(mode==="journey"?"explore":mode==="encounter"&&encounter?.originMode==="journey"?"explore":"journey"));
 $("#homeBtn").addEventListener("click",()=>{enterMode("journey");jumpTo(0);});
 $$("[data-open-object]").forEach(button=>button.addEventListener("click",()=>inspect(Number(button.dataset.openObject))));
 $("#nextBtn").addEventListener("click",()=>{
  if(currentBeat===moments.length-1){enterMode("explore");return;}
  jumpTo(currentBeat+1);
 });
 $("#indexBtn").addEventListener("click",()=>$("#index").hidden?openIndex():closeIndex());
 $("#closeIndex").addEventListener("click",closeIndex);
 $("#archiveSearch").addEventListener("input",renderSearch);
 $("#closeDetail").addEventListener("click",retraceEncounter);
 $("#followBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const item=mediaRecord(openItem),next=item?nearestChapterFor(item):-1;
  if(next<0)return;
  closeDetail();enterMode("journey");jumpTo(next);
 });
 $("#sourceBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const item=mediaRecord(openItem);
  window.open(sourceBase+(item.id+1),"_blank","noopener,noreferrer");
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
  if(event.key==="Escape"){if(!$("#index").hidden)closeIndex();else if(encounter)retraceEncounter();else closeDetail();return;}
  if(mode==="explore"&&event.target.tagName!=="INPUT"){
   if(event.key==="+"||event.key==="="){target.z=clamp(target.z*1.2,.2,2.7);return;}
   if(event.key==="-"){target.z=clamp(target.z/1.2,.2,2.7);return;}
  }
  if($("#index").hidden && mode==="journey" && event.target.tagName!=="BUTTON"){
   if(event.key==="ArrowDown"||event.key==="ArrowRight"){event.preventDefault();jumpTo(Math.min(moments.length-1,currentBeat+1));}
   if(event.key==="ArrowUp"||event.key==="ArrowLeft"){event.preventDefault();jumpTo(Math.max(0,currentBeat-1));}
  }
 });
 $("#zoomIn").addEventListener("click",()=>{target.z=clamp(target.z*1.25,.2,2.7);});
 $("#zoomOut").addEventListener("click",()=>{target.z=clamp(target.z/1.25,.2,2.7);});
 $("#resetView").addEventListener("click",()=>{target={...moments[moments.length-1].camera};closeDetail();});
 const canvas=$("#canvas");
 const pointers=new Map();
 let gesture=null;
 const startGesture=()=>{
  const pts=[...pointers.values()];
  if(!pts.length)return null;
  const a=pts[0],b=pts[1]||a;
  return {count:Math.min(2,pts.length),cx:(a.x+b.x)/2,cy:(a.y+b.y)/2,
    distance:Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),x:target.x,y:target.y,z:target.z};
 };
 canvas.addEventListener("pointerdown",event=>{
  if(mode!=="explore"||event.target.closest("button"))return;
  pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  canvas.setPointerCapture(event.pointerId);
  gesture=startGesture();
 });
 canvas.addEventListener("pointermove",event=>{
  if(mode!=="explore"||!pointers.has(event.pointerId))return;
  pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
  const pts=[...pointers.values()];
  if(!gesture||gesture.count!==Math.min(2,pts.length)){gesture=startGesture();return;}
  const a=pts[0],b=pts[1]||a;
  const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
  if(pts.length>1){
   const distance=Math.max(1,Math.hypot(b.x-a.x,b.y-a.y));
   target.z=clamp(gesture.z*distance/gesture.distance,.2,2.7);
  }
  const responsive=clamp(Math.min(innerWidth/1340,1),.43,1);
  const scale=Math.max(.08,target.z*responsive);
  target.x=clamp(gesture.x-(mx-gesture.cx)/scale,0,WORLD_WIDTH);
  target.y=clamp(gesture.y-(my-gesture.cy)/scale,0,WORLD_HEIGHT);
 },{passive:true});
 const release=event=>{
  pointers.delete(event.pointerId);
  gesture=startGesture();
  if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
 };
 canvas.addEventListener("pointerup",release);
 canvas.addEventListener("pointercancel",release);
 canvas.addEventListener("wheel",event=>{
  if(mode!=="explore")return;
  event.preventDefault();
  target.z=clamp(target.z*Math.exp(-event.deltaY*.0008),.2,2.7);
 },{passive:false});
}
async function boot(){
 try{
  const endpoints=["/story.json","/catalog.json","/chapters.json","/threads.json"];
  const responses=await Promise.all(endpoints.map(path=>fetch(path,{cache:"no-cache"})));
  for(let i=0;i<responses.length;i++) if(!responses[i].ok)throw new Error("Archive source unavailable: "+endpoints[i]);
  const records=await Promise.all(responses.map(response=>response.json()));
  [story,catalog,chapterBook,threads]=records;
  const issues=validateArchive(story);
  if(issues.length)throw new Error("Story evidence invalid: "+issues.join("; "));
  media=layoutCatalog(catalog);
  for(const thread of threads.connections){
   const from=mediaRecord(thread.fromId),to=mediaRecord(thread.toId);
   if(!from||!to||from.cluster!==thread.fromCluster||to.cluster!==thread.toCluster)
    throw new Error("Invalid cross-programme thread "+thread.id);
   if(thread.type!=="editorial-comparison"||thread.sourcePages.length<2)
    throw new Error("Unlabelled thematic relationship "+thread.id);
  }
  const layoutIssues=validateAtlas(catalog,media);
  if(layoutIssues.length)throw new Error("Atlas invalid: "+layoutIssues.join("; "));
  moments=chapterBook.chapters.map(ch=>{
   const focus=ch.focusId===null?null:mediaRecord(ch.focusId);
   if(ch.focusId!==null&&!focus)throw new Error("Unresolved chapter focus "+ch.id);
   const camera=focus?cameraForObject(focus,{zoom:ch.zoom,rotation:ch.rotation}):
     {x:WORLD_WIDTH/2,y:WORLD_HEIGHT/2,z:ch.zoom,r:ch.rotation};
   camera.fx=ch.frameX??.5;
   return {...ch,en:ch.title.en,ar:ch.title.ar,camera};
  });
  // A camera waypoint is a viewpoint into one field, never a new page.
  target={...moments[0].camera};current={...target};
  makeWorld();installInput();setLanguage("en");renderNarrative(0);
  updateScroll();rafId=requestAnimationFrame(frame);
 }catch(error){
  console.error(error);
  $("#narrativeBody").textContent="Archive material could not load. The reading mode is temporarily unavailable.";
 }
}

boot();

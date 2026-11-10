import {validateArchive,getConnections,findEvidencePath} from "/graph.mjs";
import {layoutCatalog,validateAtlas,cameraForObject,WORLD_WIDTH,WORLD_HEIGHT,CLUSTERS} from "/world-layout.mjs";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const local=(v)=>v?.[lang]||v?.en||"";
const escaped=(v)=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const copy={
 en:{
  memory:"THE LIVING MEMORY",explore:"WANDER",journey:"FOLLOW STORY",
  spatialHint:"DRAG TO WANDER · SCROLL TO ZOOM · SELECT AN IMAGE",indexTitle:"Not one beginning. Follow a thread.",
  indexFoot:"ONE CONTINUOUS WORLD · 77 SOURCE RECORDS",atlasCoordinate:"ONE FIELD · 17 CONSTELLATIONS",atlasHint:"SELECT A CONSTELLATION · TRAVEL INSIDE THE ARCHIVE",atlasMobileHint:"DRAG SIDEWAYS TO WANDER",atlasEnter:"ENTER THIS THREAD",searchLabel:"FIND A TRACE",searchPlaceholder:"Search artworks, programmes, practices...",returnScene:"RETURN TO THE EXPERIENCE",
  readingTitle:"Every image holds a way in.",readingIntro:"An uninterrupted, readable path through the same source material.",
  readingFoot:"An independent digital exploration of Darb 1718’s visual memory.",
  source:"ABOUT THIS IMAGE",sourceClose:"CLOSE IMAGE NOTE",sourceLabel:"IMAGE CONTEXT",follow:"FOLLOW THIS MOMENT ↗",
  direction:"SCROLL TO MOVE THROUGH THE ARCHIVE",wander:"DRAG · EXPLORE · OPEN OBJECTS",
  video:"REFERENCE: 2026 OVERVIEW / DARB 1718",
  signatureWhisper:"NOT WRITTEN OVER THE ARCHIVE. WOVEN FROM IT.",
  knotOne:"01 / ENCOUNTER",knotTwo:"02 / PRACTICE",knotThree:"03 / TRACE",knotFour:"04 / MEMORY",
  index:["A place, in motion","The larger constellation","A conversation","The act of looking","Light becomes an image","A story you can hold","No final frame"]
 },
 ar:{
  memory:"الذاكرة الحية",explore:"تجوّل",journey:"اتبع الحكاية",
  spatialHint:"اسحب عشان تتجوّل · مرّر للتقريب · اختار صورة",indexTitle:"مفيش بداية واحدة. اتبع خيط.",
  indexFoot:"عالم واحد مستمر · ٧٧ عنصرًا أرشيفيًا",atlasCoordinate:"مساحة واحدة · ١٧ مجموعة",atlasHint:"اختار مجموعة وادخل عالمها",atlasMobileHint:"اسحب يمين أو شمال للاستكشاف",atlasEnter:"ادخل الحكاية",searchLabel:"اتبع أثرًا",searchPlaceholder:"عمل، معرض، ورشة، برنامج...",returnScene:"ارجع للتجربة",
  readingTitle:"كل صورة ليها مدخل.",readingIntro:"مسار قراءة واضح لنفس المادة الأرشيفية، بدون حركة.",
  readingFoot:"تجربة رقمية مستقلة تستكشف الذاكرة البصرية لدرب ١٧١٨.",
  source:"عن الصورة",sourceClose:"اقفل معلومات الصورة",sourceLabel:"عن الصورة",follow:"اتبع اللحظة دي ↗",
  direction:"مرّر عشان تتنقل جوّه الأرشيف",wander:"اسحب · اكتشف · افتح صورة",
  video:"المصدر: ملف درب 2026",
  signatureWhisper:"مش اسم فوق الأرشيف. ده اسم منسوج من حكاياته.",
  knotOne:"٠١ / لقاء",knotTwo:"٠٢ / ممارسة",knotThree:"٠٣ / أثر",knotFour:"٠٤ / ذاكرة",
  index:["مكان بيتحرك","الأرشيف الأوسع","حوار","فعل النظر","الضوء والصورة","حكاية ملموسة","مفيش نهاية واحدة"]
 }
};
let moments=[],media=[],catalog=null,chapterBook=null,threads=null;
let story=null,lang="en",mode="journey",reading=false,openItem=null,currentBeat=0,encounter=null;
let atlasState=null,atlasSelected="fustat",atlasClosing=0;
const visitedRoute=[];
function rememberSource(id){
 if(!id||!mediaRecord(id)||visitedRoute.at(-1)===id)return;
 visitedRoute.push(id);
 if(visitedRoute.length>64)visitedRoute.shift();
 drawMemoryTrail();
}
function drawMemoryTrail(){
 const svg=$("#memoryTrail");
 if(!svg)return;
 const items=visitedRoute.map(mediaRecord).filter(Boolean);
 const paths=[];
 for(let i=1;i<items.length;i++){
  const a=items[i-1],b=items[i];
  const ax=a.x+a.w/2,ay=a.y+a.h/2,bx=b.x+b.w/2,by=b.y+b.h/2;
  const bend=Math.min(450,Math.hypot(bx-ax,by-ay)*.18);
  paths.push('<path d="M '+ax+' '+ay+' C '+(ax+(bx-ax)*.29)+' '+(ay-bend)+
   ' '+(bx-(bx-ax)*.27)+' '+(by+bend)+' '+bx+' '+by+'" />');
 }
 svg.innerHTML=paths.join("");
 const seen=new Set(visitedRoute);
 $$(".artifact").forEach(fig=>fig.classList.toggle("has-been-visited",seen.has(Number(fig.dataset.id))));
 svg.setAttribute("aria-label",lang==="ar"
  ?"خيوط الرحلة التي نسجها الزائر عبر الأعمال الأرشيفية"
  :"The path this visitor has woven through archival works");
}
const atlasPositions={
 place:[103,268],practices:[249,198],fustat:[434,117],residency:[629,140],
 room:[803,90],voice:[988,183],jusoor:[1033,339],inbetween:[846,313],
 young:[668,281],unspoken:[463,334],garden:[287,402],citadel:[156,547],
 symposium:[368,554],something:[558,480],music:[756,541],sector:[955,527],
 plans:[1105,621]
};
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
 $("#chapterSource").textContent=m.focusId&&mediaRecord(m.focusId)
  ?local(mediaRecord(m.focusId).project)
  :(lang==="ar"?"درب ١٧١٨ · الذاكرة الحية":"DARB 1718 · THE LIVING MEMORY");
 $("#axisNumber").textContent=String(beat+1).padStart(2,"0")+" / "+count;
 $("#axisFill").style.width=((beat+1)/moments.length*100)+"%";
 $("#nextBtn").textContent=beat===moments.length-1?"↺":"↓";
 $("#canvas").dataset.beat=String(beat);
 $("#experience").dataset.beat=String(beat);
 const focusId=m.focusId;
 if(focusId)rememberSource(focusId);
 $("#experience").classList.toggle("is-final-memory",beat===moments.length-1&&visitedRoute.length>=2);
 $$(".artifact").forEach(fig=>fig.classList.toggle("is-focus",Number(fig.dataset.id)===focusId));
}

function setLanguage(next){
 lang=next;
 document.documentElement.lang=lang;
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $$("[data-i18n]").forEach(el=>el.textContent=copy[lang][el.dataset.i18n]||"");
 $("#localeBtn").textContent=lang==="en"?"عربي":"EN";
 $$("[data-open-object]").forEach(button=>{
  const object=mediaRecord(Number(button.dataset.openObject));
  button.setAttribute("aria-label",local(object?.title)||"Archive object");
 });
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
 if(mode!=="journey"||encounter||atlasState)return;
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
let lastFrameAt=0;
function frame(now=0){
 const elapsed=lastFrameAt?Math.min(250,Math.max(1,now-lastFrameAt)):16.67;
 lastFrameAt=now;
 // Time-dependent easing: slow/mobile browsers cannot stretch a camera move indefinitely.
 const speed=window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ? 1 : 1-Math.exp(-elapsed/280);
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
 $("#experience").classList.toggle("is-final-memory",mode==="journey"&&currentBeat===moments.length-1&&visitedRoute.length>=2);
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
 rememberSource(id);
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
 // The source catalog retains PDF/XREF, filenames and audit data. Those are
 // indexing coordinates, not wall labels or artwork titles for visitors.
 $("#detailMarker").textContent=lang==="ar"?"درب ١٧١٨ · من الأرشيف":"DARB 1718 · THE ARCHIVE";
 $("#detailTitle").textContent=local(item.project);
 // Preserve the full authored image description, but treat it as a caption,
 // never a huge exhibition headline. It also remains the image alt text.
 $("#detailText").textContent=local(item.title);
 $("#detailMeta").textContent=lang==="ar"?"صورة من أرشيف البرنامج":"FROM THE PROGRAMME";
 $("#detailSourceLabel").textContent=copy[lang].sourceLabel;
 $("#detailSourceBody").textContent=lang==="ar"
  ?"الصورة دي جزء من مواد برنامج «"+local(item.project)+"» في أرشيف درب ١٧١٨. تقدر تتابع الأعمال المرتبطة بيها من هنا."
  :"This image belongs to the "+local(item.project)+" programme in the Darb 1718 archive. Continue through the related works without leaving this space.";
 $("#detailSourceNote").hidden=true;
 $("#sourceBtn").setAttribute("aria-expanded","false");
 $("#sourceBtn").textContent=copy[lang].source;
 $("#followBtn").textContent=copy[lang].follow;
 const beat=nearestChapterFor(item);
 $("#followBtn").hidden=beat<0;
 const related=media.filter(other=>other.cluster===item.cluster&&other.id!==item.id).slice(0,8);
 const host=$("#relatedObjects");host.replaceChildren();
 const heading=document.createElement("div");heading.className="related-title";
 heading.textContent=lang==="ar"?"من نفس الحكاية":"IN THE SAME STORY";
 host.append(heading);
 for(const record of related){
  const btn=document.createElement("button");btn.type="button";btn.className="related-item";
  btn.setAttribute("aria-label",local(record.title)+" · "+local(record.project));
  btn.innerHTML='<img src="'+record.src+'" loading="lazy" alt=""/><span>'+
   escaped(local(record.title))+'</span><b>↗</b>';
  btn.addEventListener("click",()=>inspect(record.id));
  host.append(btn);
 }
 const thematic=threads.connections.filter(t=>
  t.fromCluster===item.cluster||t.toCluster===item.cluster);
 if(thematic.length){
  const name=document.createElement("div");name.className="related-title thread-title";
  name.textContent=lang==="ar"?"علاقات مع حكايات تانية":"OTHER THREADS";
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
   btn.addEventListener("click",()=>inspect(target.id));
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

function atlasClusterRecords(key){
 return media.filter(item=>item.cluster===key);
}
function focusAtlasCluster(key){
 if(!CLUSTERS[key])return;
 atlasSelected=key;
 $$(".atlas-node").forEach(node=>{
  const active=node.dataset.cluster===key;
  node.classList.toggle("is-selected",active);
  node.setAttribute("aria-pressed",String(active));
 });
 $$("#atlasLines path").forEach(path=>path.classList.toggle("is-selected",
  path.dataset.from===key||path.dataset.to===key));
 const records=atlasClusterRecords(key);
 const representative=records.find(r=>r.role==="image")||records[0];
 const zone=CLUSTERS[key];
 $("#atlasFocusTitle").textContent=lang==="ar"?zone.ar:zone.en;
 $("#atlasFocusType").textContent=(lang==="ar"?"منطقة أرشيفية":"ARCHIVE CONSTELLATION")
  +" / "+String(records.length).padStart(2,"0");
 $("#atlasFocusInfo").textContent=(lang==="ar"?"اكتشف الأعمال والقصص المرتبطة بالمجموعة":"Discover the works and stories in this constellation");
 if(representative){
  $("#atlasFocusImage").src=representative.src;
  $("#atlasFocusImage").alt=local(representative.title);
 }
 $("#atlasEnter").textContent=copy[lang].atlasEnter+" ↗";
}
function renderAtlasLines(){
 const svg=$("#atlasLines");
 const curves=threads.connections.map(link=>{
  const a=atlasPositions[link.fromCluster],b=atlasPositions[link.toCluster];
  if(!a||!b)return "";
  const bend=Math.min(100,Math.abs(a[0]-b[0])*.12+25);
  const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-bend;
  return '<path data-from="'+escaped(link.fromCluster)+'" data-to="'+escaped(link.toCluster)+
   '" d="M '+a[0]+' '+a[1]+' Q '+mx+' '+my+' '+b[0]+' '+b[1]+'" />';
 });
 svg.innerHTML=curves.join("");
}
function renderIndex(){
 const root=$("#indexItems");root.replaceChildren();
 let n=0;
 for(const [key,zone] of Object.entries(CLUSTERS)){
  const records=atlasClusterRecords(key);
  if(!records.length)continue;
  const pos=atlasPositions[key];
  if(!pos)continue;
  const number=String(++n).padStart(2,"0");
  const button=document.createElement("button");
  button.type="button";button.className="index-item atlas-node";
  button.dataset.cluster=key;
  button.style.setProperty("--x",pos[0]/12+"%");
  button.style.setProperty("--y",pos[1]/7+"%");
  button.setAttribute("aria-label",(lang==="ar"?zone.ar:zone.en)+", "+records.length);
  button.innerHTML='<span class="atlas-node-spot" aria-hidden="true"><i></i></span>'+
    '<span class="atlas-node-copy"><small>'+number+' / '+String(records.length).padStart(2,"0")+
    '</small><strong>'+escaped(lang==="ar"?zone.ar:zone.en)+'</strong></span>';
  button.addEventListener("pointerenter",()=>focusAtlasCluster(key));
  button.addEventListener("focus",()=>focusAtlasCluster(key));
  button.addEventListener("click",()=>travelAtlasCluster(key));
  root.append(button);
 }
 renderAtlasLines();focusAtlasCluster(atlasSelected);
 renderSearch();
}
function renderSearch(){
 const query=$("#archiveSearch").value.trim().toLocaleLowerCase();
 const results=$("#searchResults");
 const index=$("#index");
 results.replaceChildren();
 results.hidden=!query;
 index.classList.toggle("has-query",Boolean(query));
 if(!query)return;
 const hits=media.filter(item=>
  [item.title.en,item.title.ar,item.project.en,item.project.ar,item.kind,String(item.id)]
    .some(field=>field?.toLocaleLowerCase().includes(query)));
 for(const item of hits.slice(0,30)){
  const btn=document.createElement("button");btn.className="search-hit";btn.type="button";
  btn.innerHTML='<img src="'+item.src+'" alt="" loading="lazy"/><span><strong>'+
   escaped(local(item.title))+'</strong><small>'+escaped(local(item.project))+
   '</small></span><b>↗</b>';
  btn.addEventListener("click",()=>{
   closeIndex({restore:false,focus:false});
   enterMode("explore");
   inspect(item.id);
  });
  results.append(btn);
 }
 if(!hits.length){
  const p=document.createElement("p");p.textContent=lang==="ar"?"مفيش نتائج مطابقة.":"No matching archival records.";
  results.append(p);
 }
}
function openIndex(){
 if(atlasState)return;
 const index=$("#index");
 atlasState={mode,target:{...target},bodyOverflow:document.body.style.overflow,
  detailHidden:$("#detail").hidden,wasReading:document.body.classList.contains("is-reading")};
 ++atlasClosing;
 document.body.style.overflow="hidden";
 document.body.classList.remove("is-reading");
 $("#detail").hidden=true;
 $("#experience").dataset.atlas="open";
 index.hidden=false;
 $("#indexBtn").setAttribute("aria-expanded","true");
 $("#indexBtn").setAttribute("aria-label",lang==="ar"?"اقفل خريطة الأرشيف":"Close archive compass");
 $("#indexBtn").classList.add("is-open");
 const focus=mediaRecord(moments[currentBeat]?.focusId);
 if(focus?.cluster&&CLUSTERS[focus.cluster])atlasSelected=focus.cluster;
 target={x:WORLD_WIDTH/2,y:WORLD_HEIGHT/2,z:innerWidth<800?.17:.126,r:0,fx:.5};
 renderIndex();
 if(innerWidth<800){
  const viewport=$("#atlasViewport");
  const p=atlasPositions[atlasSelected];
  viewport.scrollLeft=Math.max(0,(p[0]/1200)*viewport.scrollWidth-viewport.clientWidth*.42);
 }
 requestAnimationFrame(()=>{
  index.classList.add("is-open");
  const button=$('.atlas-node.is-selected');
  (button||$("#archiveSearch")).focus({preventScroll:true});
 });
}
function closeIndex({restore=true,focus=true}={}){
 if(!atlasState)return;
 const state=atlasState;
 atlasState=null;
 const index=$("#index");
 const serial=++atlasClosing;
 index.classList.remove("is-open","has-query");
 $("#experience").removeAttribute("data-atlas");
 $("#indexBtn").setAttribute("aria-expanded","false");
 $("#indexBtn").setAttribute("aria-label",lang==="ar"?"افتح خريطة الأرشيف":"Open archive compass");
 $("#indexBtn").classList.remove("is-open");
 document.body.style.overflow=state.bodyOverflow;
 document.body.classList.toggle("is-reading",state.wasReading);
 if(restore){
  target={...state.target};
  $("#detail").hidden=state.detailHidden;
 }else if(encounter)closeDetail();
 if(focus)$("#indexBtn").focus({preventScroll:true});
 const delay=matchMedia("(prefers-reduced-motion: reduce)").matches?0:520;
 setTimeout(()=>{if(serial===atlasClosing&&!atlasState)index.hidden=true;},delay);
}
function travelAtlasCluster(key){
 const zone=CLUSTERS[key];
 if(!zone)return;
 closeIndex({restore:false,focus:false});
 enterMode("explore");
 target={x:zone.x,y:zone.y,z:innerWidth<800?.52:.73,r:0,fx:.5};
 $("#modeBtn").focus({preventScroll:true});
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
   caption.textContent=local(item.title)+" · "+local(item.project);
   fig.append(image,caption);li.append(fig);
  }
  ol.append(li);
 });
}

function installInput(){
 $("#localeBtn").addEventListener("click",()=>setLanguage(lang==="en"?"ar":"en"));
 // The opt-in textile passage hands off to the SAME archival world. It does not
 // navigate away or rebuild the content atlas.
 addEventListener("darb:ritual-enter",(event)=>{
  const source=Number(event.detail?.sourceId||39);
  if(!mediaRecord(source))return;
  if(event.detail?.lang==="ar"||event.detail?.lang==="en")setLanguage(event.detail.lang);
  if(atlasState)closeIndex({restore:false,focus:false});
  if(encounter)closeDetail();
  if(mode!=="explore")enterMode("explore");
  const experience=$("#experience");
  experience.dataset.arrival="woven";
  inspect(source);
  setTimeout(()=>{
   if(experience.dataset.arrival==="woven")delete experience.dataset.arrival;
  },matchMedia("(prefers-reduced-motion: reduce)").matches?0:1900);
 });
 $("#modeBtn").addEventListener("click",()=>enterMode(mode==="journey"?"explore":mode==="encounter"&&encounter?.originMode==="journey"?"explore":"journey"));
 $("#homeBtn").addEventListener("click",()=>{enterMode("journey");jumpTo(0);});
 $$("[data-open-object]").forEach(button=>button.addEventListener("click",()=>inspect(Number(button.dataset.openObject))));
 $("#nextBtn").addEventListener("click",()=>{
  if(currentBeat===moments.length-1){enterMode("explore");return;}
  jumpTo(currentBeat+1);
 });
 $("#indexBtn").addEventListener("click",()=>atlasState?closeIndex():openIndex());
 $("#closeIndex").addEventListener("click",()=>closeIndex());
 $("#archiveSearch").addEventListener("input",renderSearch);
 $("#atlasEnter").addEventListener("click",()=>travelAtlasCluster(atlasSelected));
 $("#closeDetail").addEventListener("click",retraceEncounter);
 $("#followBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const item=mediaRecord(openItem),next=item?nearestChapterFor(item):-1;
  if(next<0)return;
  closeDetail();enterMode("journey");jumpTo(next);
 });
 $("#sourceBtn").addEventListener("click",()=>{
  if(openItem===null)return;
  const note=$("#detailSourceNote");
  note.hidden=!note.hidden;
  const expanded=!note.hidden;
  $("#sourceBtn").setAttribute("aria-expanded",String(expanded));
  $("#sourceBtn").textContent=expanded?copy[lang].sourceClose:copy[lang].source;
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
  if(event.key==="Escape"){if(atlasState){closeIndex();event.preventDefault();}else if(encounter)retraceEncounter();else closeDetail();return;}
  if(atlasState&&event.key==="Tab"){
   const focusables=$('#index button:not([disabled]), #index input:not([disabled])');
   if(focusables.length){
    const first=focusables[0],last=focusables.at(-1);
    if(!$("#index").contains(document.activeElement)){
     event.preventDefault();(event.shiftKey?last:first).focus();
    }else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   }
  }
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

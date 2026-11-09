import {getConnections, startVisit, followEdge, retrace, validateArchive} from "/graph.mjs";

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
const labels = {
 en:{
 collection:"THE LIVING MEMORY / RESEARCH EDITION",introLabel:"A LIVING RECORD OF ART, PEOPLE & PLACE",
 eyebrow:"ONE PLACE. MANY TRACES.",heroOne:"Memory",heroTwo:"moves.",
 heroDesc:"Not a wall of images. An invitation to follow what connects a place, the people around it, and what they make.",
 begin:"ENTER THE STORY",heroFoot:"Tales of Fustat · Five encounters · Follow your own path",
 storyIntro:"A photograph is a beginning, not an ending. Follow the work backwards into the hands, places and conversations that give it meaning.",
 quiet:"QUIET",exitHeadline:"Nothing ends at <em>one image.</em>",
 exitBody:"The story is one path through the material. Step outside it to explore the source connections yourself.",
 explore:"TRACE THE CONNECTIONS",footer:"INDEPENDENT WORKING EXPERIENCE · NOT AN OFFICIAL PUBLIC LAUNCH",
 graphTitle:"Trace the connections.",graphHint:"SELECT A NODE · FOLLOW THE THREAD",
 backStory:"BACK TO STORY",source:"SOURCE / OVERVIEW 2026 · P.11",follow:"EXPLORE THIS CONNECTION",
 inspect:"OPEN THE RELATIONSHIP MAP",path:"YOUR PATH",evidence:"EVIDENCE",
 research:"RESEARCH RECORD",return:"RETRACE ONE STEP",
 noConnections:"No further documented links from this record.",
 rights:"IMAGE PUBLICATION CREDIT: EDITORIAL REVIEW",
 graphNote:"Links describe connections in the programme, not assumed relationships between photographed people.",
 story:"STORY",trace:"TRACE"
 },
 ar:{
 collection:"الذاكرة الحية / نسخة بحثية",introLabel:"أرشيف حي للفن والناس والمكان",
 eyebrow:"مكان واحد. آثار كتير.",heroOne:"الذاكرة",heroTwo:"بتتحرك.",
 heroDesc:"مش حائط صور. دي دعوة تكتشف العلاقة بين المكان والناس والحاجات اللي بيصنعوها.",
 begin:"ادخل الحكاية",heroFoot:"حكاوي الفسطاط · خمس محطات · اختار طريقك",
 storyIntro:"الصورة بداية، مش نهاية. كل صورة ممكن تفتح طريق للناس والأماكن والحكايات اللي حواليها.",
 quiet:"هادئ",exitHeadline:"الحكاية مش بتنتهي عند <em>صورة واحدة.</em>",
 exitBody:"ده طريق واحد وسط الأرشيف. اخرج منه واكتشف العلاقات الموثقة بنفسك.",
 explore:"تتبّع العلاقات",footer:"تجربة بحثية مستقلة · ليست إطلاقًا رسميًا",
 graphTitle:"اتبع الخيط.",graphHint:"اختار عنصر · واتبع العلاقة",
 backStory:"ارجع للحكاية",source:"المصدر / ملف درب 2026 · ص 11",
 follow:"اكتشف العلاقة دي",inspect:"افتح خريطة العلاقات",
 path:"المسار بتاعك",evidence:"الدليل",research:"سجل بحثي",
 return:"ارجع خطوة",noConnections:"مفيش علاقات تانية موثقة من العنصر ده.",
 rights:"بيانات الصورة للنشر قيد الاستكمال",
 graphNote:"العلاقات هنا بين عناصر البرنامج، مش افتراضات عن الأشخاص الظاهرين في الصور.",
 story:"الحكاية",trace:"العلاقات"
 }
};
const coordinates={
 "project:tales":[51,48],"place:fustat":[20,17],
 "practice:photowalk":[30,37],"practice:interviews":[17,66],
 "practice:cyanotype":[74,34],"object:notebooks":[79,69],
 "media:39":[6,37],"media:40":[30,82],"media:41":[83,14],"media:42":[57,84]
};
let archive, language="en", quiet=matchMedia("(prefers-reduced-motion: reduce)").matches;
let visit, graphOpen=false, currentStep=-1, scrollCallback;
const label=(value)=>value?.[language]||value?.en||"";
const t=(key)=>labels[language][key];
const escape=(s)=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const mediaSrc=(node)=>node.type==="media"?"/media/"+node.media.assetNo+".jpeg":null;

function renderCopy(){
 document.documentElement.lang=language;
 document.documentElement.dir=language==="ar"?"rtl":"ltr";
 $$("[data-i18n]").forEach(el=>{
   const key=el.dataset.i18n;
   if(key==="exitHeadline")el.innerHTML=t(key);
   else el.textContent=t(key);
 });
 $("#langToggle").textContent=language==="en"?"عربي":"EN";
 $("#storyToggle").textContent=t("story");
 $("#traceToggle").textContent=t("trace")+" ↗";
 document.title=language==="en"?"Darb Archive — The Living Memory":"أرشيف درب — الذاكرة الحية";
}
function renderChapters(){
 const container=$("#chapters");container.innerHTML="";
 archive.storySteps.forEach((step,i)=>{
   const article=document.createElement("article");article.className="chapter";
   article.id="chapter-"+i;article.dataset.index=String(i);
   const top=["THE PLACE","THE ENCOUNTER","THE LOOK","THE PRINT","THE RECORD"][i];
   article.innerHTML='<div class="chapter-top"><span>'+String(i+1).padStart(2,"0")+
    ' / 05</span><span class="line"></span><span>'+top+'</span></div>'+
    '<h2>'+escape(label(step.heading))+'</h2><p>'+escape(label(step.body))+'</p>'+
    '<div class="chapter-tag">'+escape(t("research"))+' / '+escape(t("source"))+'</div>'+
    '<div class="chapter-actions"><button class="chapter-action" type="button">'+escape(t("inspect"))+
    ' ↗</button><span class="chapter-source">PDF 11 · '+escape(step.media||"PROJECT")+'</span></div>'+
    '<span class="chapter-overline">DARB ARCHIVE / TALES OF FUSTAT / '+String(i+1).padStart(2,"0")+'</span>';
   $(".chapter-action",article).addEventListener("click",()=>openGraph(step.media||step.focus));
   container.append(article);
 });
 observeScroll();
}
function setStep(i){
 if(currentStep===i)return;
 currentStep=i;
 $("#visualStage").dataset.step=String(i);
 $("#stepLabel").textContent=String(i+1).padStart(2,"0")+" / 05";
 $("#progressBar").style.width=((i+1)/archive.storySteps.length*100)+"%";
}
function observeScroll(){
 if(scrollCallback)removeEventListener("scroll",scrollCallback);
 let pending=false;
 scrollCallback=()=>{
  if(pending||graphOpen)return;
  pending=true;
  requestAnimationFrame(()=>{
   pending=false;const middle=innerHeight*.56;
   const items=$$(".chapter");
   let result=0, distance=Infinity;
   items.forEach((el,i)=>{
    const r=el.getBoundingClientRect();
    const d=r.top<=middle&&r.bottom>=middle?0:Math.min(Math.abs(r.top-middle),Math.abs(r.bottom-middle));
    if(d<distance){distance=d;result=i;}
   });
   setStep(result);
  });
 };
 addEventListener("scroll",scrollCallback,{passive:true});scrollCallback();
}
function setQuiet(on){
 quiet=Boolean(on);document.documentElement.classList.toggle("is-quiet",quiet);
 $("#quietToggle").setAttribute("aria-pressed",String(quiet));
}
function setLanguage(next){
 language=next;renderCopy();renderChapters();
 if(graphOpen){renderNodes();renderInspector();}
}
function renderNodes(){
 const layer=$("#graphNodeLayer");layer.innerHTML="";
 archive.nodes.forEach(node=>{
  const button=document.createElement("button");button.type="button";button.className="graph-node";
  const active=visit.current===node.id;
  if(active)button.classList.add("is-selected");
  button.dataset.nodeId=node.id;button.dataset.type=node.type;button.setAttribute("aria-pressed",String(active));
  button.style.left=(coordinates[node.id]||[50,50])[0]+"%";
  button.style.top=(coordinates[node.id]||[50,50])[1]+"%";
  const src=mediaSrc(node);
  button.innerHTML=(src?'<img src="'+src+'" alt="" loading="lazy"/>':'<small>'+escape(node.type.toUpperCase())+'</small>')+
    '<strong>'+escape(label(node.title))+'</strong>';
  button.setAttribute("aria-label",label(node.title));
  button.addEventListener("click",()=>selectNode(node.id));
  layer.append(button);
 });
 requestAnimationFrame(drawLines);
}
function drawLines(){
 if(!graphOpen)return;
 const host=$("#graphCanvas"), bounds=host.getBoundingClientRect(),svg=$("#graphLines");
 if(!bounds.width||!bounds.height)return;
 svg.setAttribute("viewBox","0 0 "+bounds.width+" "+bounds.height);
 const elements=new Map($$(".graph-node").map(el=>[el.dataset.nodeId,el]));
 svg.innerHTML=archive.edges.map(edge=>{
  const a=elements.get(edge.from)?.getBoundingClientRect(),b=elements.get(edge.to)?.getBoundingClientRect();
  if(!a||!b)return "";
  const x1=a.left+a.width/2-bounds.left,y1=a.top+a.height/2-bounds.top;
  const x2=b.left+b.width/2-bounds.left,y2=b.top+b.height/2-bounds.top;
  const cx=(x1+x2)/2,cy=(y1+y2)/2-Math.min(Math.hypot(x2-x1,y2-y1)*.17,65);
  const selected=edge.from===visit.current||edge.to===visit.current;
  return '<path class="'+(selected?"is-selected":"")+'" d="M '+x1+' '+y1+' Q '+cx+' '+cy+' '+x2+' '+y2+'"/>';
 }).join("");
}
function selectNode(id){
 const relation=getConnections(archive,visit.current).find(edge=>edge.to===id);
 visit=relation?followEdge(archive,visit,relation.edgeId):startVisit(archive,id);
 renderNodes();renderInspector();
}
function renderInspector(){
 const node=archive.nodes.find(n=>n.id===visit.current),links=getConnections(archive,node.id);
 const inspector=$("#graphInspector"),src=mediaSrc(node);
 inspector.innerHTML='<div class="inspector-kicker">'+escape(t("research"))+" / "+escape(node.type.toUpperCase())+'</div>'+
   '<h3>'+escape(label(node.title))+'</h3>'+
   (src?'<img class="inspect-photo" src="'+src+'" alt="'+escape(label(node.title))+'"/>':"")+
   '<p>'+escape(t("graphNote"))+'</p>'+
   '<div class="inspect-evidence">'+escape(t("evidence"))+'<br/>'+node.evidence.map(escape).join(" · ")+
   (node.type==="media"?"<br/>"+escape(t("rights")):"")+'</div>'+
   '<div class="inspector-kicker">'+escape(t("follow"))+" / "+links.length+'</div>'+
   '<div id="inspectRelations"></div>'+
   '<button class="inspect-back" id="retraceButton" type="button">'+escape(t("return"))+' ↶</button>'+
   '<p class="inspector-empty">'+escape(t("path"))+" · "+visit.history.length+'</p>';
 const relationList=$("#inspectRelations");
 if(!links.length)relationList.innerHTML='<p class="inspector-empty">'+escape(t("noConnections"))+'</p>';
 links.forEach(link=>{
  const target=archive.nodes.find(n=>n.id===link.to);
  const button=document.createElement("button");button.className="inspect-link";button.type="button";
  button.innerHTML='<span>'+escape(link.relation.replaceAll("-"," ").toUpperCase())+'</span>'+escape(label(target.title))+' ↗';
  button.addEventListener("click",()=>{
   visit=followEdge(archive,visit,link.edgeId);renderNodes();renderInspector();
  });
  relationList.append(button);
 });
 $("#retraceButton").disabled=visit.history.length<2;
 $("#retraceButton").addEventListener("click",()=>{
  visit=retrace(visit);renderNodes();renderInspector();
 });
}
function openGraph(start="project:tales"){
 visit=startVisit(archive,archive.nodes.some(n=>n.id===start)?start:"project:tales");
 graphOpen=true;$("#graphView").hidden=false;document.body.style.overflow="hidden";
 $("#storyToggle").classList.remove("is-active");$("#traceToggle").classList.add("is-active");
 renderNodes();renderInspector();$("#closeGraph").focus({preventScroll:true});
}
function closeGraph(){
 graphOpen=false;$("#graphView").hidden=true;document.body.style.overflow="";
 $("#traceToggle").classList.remove("is-active");$("#storyToggle").classList.add("is-active");
 $("#traceToggle").focus({preventScroll:true});scrollCallback?.();
}
function installControls(){
 $("#langToggle").addEventListener("click",()=>setLanguage(language==="en"?"ar":"en"));
 $("#quietToggle").addEventListener("click",()=>setQuiet(!quiet));
 $("#traceToggle").addEventListener("click",()=>openGraph());
 $("#openGraph").addEventListener("click",()=>openGraph());
 $("#storyToggle").addEventListener("click",()=>{
  if(graphOpen)closeGraph();
  else $("#chapter-0")?.scrollIntoView({behavior:quiet?"instant":"smooth"});
 });
 $("#closeGraph").addEventListener("click",closeGraph);
 addEventListener("keydown",event=>{
  if(event.key==="Escape"&&graphOpen)closeGraph();
  if(graphOpen&&event.key==="Backspace"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
   event.preventDefault();visit=retrace(visit);renderNodes();renderInspector();
  }
 });
 addEventListener("resize",()=>requestAnimationFrame(drawLines),{passive:true});
 $$(".scene-image").forEach(el=>{
  const id="media:"+el.dataset.image,action=()=>openGraph(id);
  el.tabIndex=0;el.setAttribute("role","button");el.setAttribute("aria-label","Trace archive image "+el.dataset.image);
  el.addEventListener("click",action);
  el.addEventListener("keydown",event=>{
   if(event.key==="Enter"||event.key===" "){event.preventDefault();action();}
  });
 });
}
async function boot(){
 try{
  const response=await fetch("/story.json",{cache:"no-cache"});
  if(!response.ok)throw new Error("Could not load archive story: "+response.status);
  archive=await response.json();
  const errors=validateArchive(archive);
  if(errors.length)throw new Error(errors.join("; "));
  renderCopy();setQuiet(quiet);renderChapters();installControls();setStep(0);
 }catch(error){
  console.error(error);
  $("#chapters").innerHTML='<article class="chapter"><h2>Archive unavailable.</h2><p>Research material could not load.</p></article>';
 }
}
boot();

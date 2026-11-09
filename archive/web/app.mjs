import {validateArchive,getConnections,findEvidencePath} from "/graph.mjs";
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const lerp=(a,b,t)=>a+(b-a)*t;
const local=(v)=>v?.[lang]||v?.en||"";
const sourceBase="https://github.com/omarkhair70-droid/darb/blob/main/source-material/original/Darb_1718_Overview_2026.pdf#page=";
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
const moments=[
 {en:["A place","never stays still."],ar:["المكان","عمره ما بيثبت."],body:{en:"An archive is made from moments that continue to meet, even when the people and places change.",ar:"الأرشيف بيتكوّن من لحظات بتفضل تتقاطع، حتى لما الناس والأماكن بتتغير."},label:"DARB 1718 / AN INDEPENDENT ARCHIVE",camera:{x:2520,y:1450,z:.37,r:0}},
 {en:["Every image","belongs somewhere."],ar:["كل صورة","وراها مكان."],body:{en:"Across Darb's programmes, images lead to making, gatherings, performances and conversations.",ar:"صور درب بتفتح أبواب للورش واللقاءات والعروض والحكايات."},label:"MANY PRACTICES / ONE ARCHIVE",camera:{x:2590,y:1150,z:.57,r:-1.1}},
 {en:["Before the image,","a conversation."],ar:["قبل الصورة،","فيه حكاية."],body:{en:"Tales of Fustat documented neighbourhood conversations and interviews with craftspeople.",ar:"حكاوي الفسطاط جمعت حوارات ومقابلات مع حرفيين من الحي."},label:"TALES OF FUSTAT / IMAGE 39 / PDF P.11",camera:{x:2080,y:1040,z:1.34,r:.6}},
 {en:["Looking","becomes listening."],ar:["النظر","ممكن يبقى إنصات."],body:{en:"A photography walk and shared workshop turn observation into a collective practice.",ar:"جولة تصوير وورشة مشتركة بتحوّل النظر لممارسة جماعية."},label:"TALES OF FUSTAT / IMAGE 40 / PDF P.11",camera:{x:2825,y:675,z:1.32,r:-1}},
 {en:["Light","leaves a trace."],ar:["الضوء","بيسيب أثر."],body:{en:"Cyanotype gives photographic memory a different, blue material form.",ar:"السيانوتايب بيدي للذاكرة المصوّرة شكل مادي أزرق مختلف."},label:"TALES OF FUSTAT / IMAGE 41 / PDF P.11",camera:{x:3650,y:1340,z:1.30,r:.3}},
 {en:["A story","you can hold."],ar:["حكاية","تقدر تمسكها."],body:{en:"The programme also produced prints and photographic notebooks: images made into objects.",ar:"التجربة اتجمعت كمان في مطبوعات ودفاتر فوتوغرافية؛ صور بقت أشياء ملموسة."},label:"TALES OF FUSTAT / IMAGE 42 / PDF P.11",camera:{x:4370,y:970,z:1.30,r:1.2}},
 {en:["Nothing ends","at one image."],ar:["مفيش نهاية","عند صورة واحدة."],body:{en:"Pull back to the larger archive. Wander between programmes, or follow another documented thread.",ar:"ارجع للصورة الكبيرة. اتجوّل بين البرامج، أو اتبع خيط تاني من الأرشيف."},label:"DARB ARCHIVE / THE WIDER FIELD",camera:{x:2550,y:1430,z:.38,r:0}}
];
const media=[
 {id:1,xref:308,page:1,project:"Darb 1718",category:"place",x:290,y:220,w:640,h:380,r:-7,title:{en:"The Darb exterior",ar:"واجهة درب التاريخية"},desc:{en:"The historic exterior shown on the archive overview cover.",ar:"صورة الواجهة التاريخية الموجودة على غلاف ملف درب."}},
 {id:7,xref:323,page:3,project:"Darb workshops",category:"craft",x:1190,y:1850,w:485,h:355,r:5,title:{en:"Working with clay",ar:"العمل بالخزف"},desc:{en:"Craft practice shown in the Darb institutional overview.",ar:"ممارسة حرفية موثقة في الملف التعريفي لدرب."}},
 {id:21,xref:359,page:7,project:"INBETWEEN",category:"installation",x:3550,y:150,w:595,h:460,r:-4,title:{en:"INBETWEEN installation",ar:"تركيب فني من INBETWEEN"},desc:{en:"Suspended textiles in the 2025 INBETWEEN exhibition.",ar:"منسوجات معلّقة من معرض INBETWEEN سنة 2025."}},
 {id:22,xref:360,page:7,project:"INBETWEEN",category:"art",x:4370,y:290,w:390,h:300,r:8,title:{en:"Works in INBETWEEN",ar:"أعمال من INBETWEEN"},desc:{en:"Monochrome artwork documentation from the exhibition.",ar:"توثيق لأعمال أحادية اللون من المعرض."}},
 {id:29,xref:379,page:9,project:"Jusoor",category:"identity",x:360,y:1390,w:330,h:280,r:-6,title:{en:"Jusoor",ar:"جسور"},desc:{en:"Programme identity for the short-film screenings and conversations.",ar:"هوية برنامج عروض الأفلام القصيرة والنقاشات."}},
 {id:30,xref:380,page:9,project:"Jusoor",category:"cinema",x:810,y:960,w:510,h:355,r:4,title:{en:"Cinema as gathering",ar:"السينما كلقاء"},desc:{en:"Audience at a film screening in the Jusoor programme.",ar:"جمهور خلال عرض سينمائي في برنامج جسور."}},
 {id:34,xref:389,page:10,project:"Residency",category:"portrait",x:4200,y:1890,w:360,h:435,r:-3,title:{en:"Natalia Ossef residency",ar:"إقامة ناتاليا أوسيف"},desc:{en:"Documentary image from the artist residency.",ar:"صورة توثيقية من الإقامة الفنية."}},
 {id:35,xref:390,page:10,project:"Residency",category:"craft",x:4640,y:1510,w:380,h:370,r:7,title:{en:"Textile process",ar:"العمل على النسيج"},desc:{en:"Textile making during the residency research.",ar:"عملية صنع النسيج ضمن بحث الإقامة الفنية."}},
 {id:38,xref:393,page:10,project:"Residency",category:"craft",x:4740,y:2310,w:400,h:300,r:6,title:{en:"Collaborative textiles",ar:"تجربة نسيج مشتركة"},desc:{en:"Textile collaboration documented in the overview.",ar:"تعاون في النسيج موثق في الملف."}},
 {id:39,xref:400,page:11,project:"Tales of Fustat",category:"conversation",x:1780,y:830,w:630,h:390,r:-2,title:{en:"Listening in Fustat",ar:"الحوار في الفسطاط"},desc:{en:"Group interviews and conversation documented in Tales of Fustat.",ar:"مقابلات وحوار جماعي ضمن برنامج حكاوي الفسطاط."}},
 {id:40,xref:401,page:11,project:"Tales of Fustat",category:"workshop",x:2500,y:460,w:650,h:430,r:4,title:{en:"Learning to look",ar:"نتعلّم النظر"},desc:{en:"A shared photography workshop, documented as part of Tales of Fustat.",ar:"ورشة تصوير جماعية موثقة ضمن حكاوي الفسطاط."}},
 {id:41,xref:402,page:11,project:"Tales of Fustat",category:"cyanotype",x:3380,y:1120,w:590,h:490,r:-5,title:{en:"A blue impression",ar:"طبعة زرقاء"},desc:{en:"Cyanotype image of a craft form made during the programme.",ar:"طبعة سيانوتايب لشكل حرفي ضمن البرنامج."}},
 {id:42,xref:403,page:11,project:"Tales of Fustat",category:"cyanotype",x:4060,y:770,w:630,h:420,r:3,title:{en:"Printed memory",ar:"ذاكرة مطبوعة"},desc:{en:"Photographic prints, cyanotypes and notebooks documented in Tales of Fustat.",ar:"مطبوعات وصور ودفاتر موثقة في حكاوي الفسطاط."}},
 {id:53,xref:435,page:16,project:"Something Else",category:"exhibition",x:240,y:2280,w:575,h:370,r:3,title:{en:"Something Else symposium",ar:"ملتقى Something Else"},desc:{en:"Artworks in a historic interior at the 2025 symposium.",ar:"أعمال فنية داخل مكان تاريخي في ملتقى 2025."}},
 {id:56,xref:443,page:17,project:"Something Else",category:"art",x:2940,y:2180,w:440,h:400,r:8,title:{en:"Something Else artwork",ar:"عمل من Something Else"},desc:{en:"Artwork documented during Something Else at the Citadel.",ar:"عمل فني موثّق خلال Something Else بالقلعة."}},
 {id:61,xref:448,page:17,project:"Something Else",category:"installation",x:3650,y:2300,w:580,h:360,r:-6,title:{en:"Light in a historic space",ar:"ضوء في مكان تاريخي"},desc:{en:"A projection installation at Something Else, Citadel.",ar:"تركيب بالضوء ضمن Something Else بالقلعة."}},
 {id:70,xref:469,page:20,project:"Live performance",category:"performance",x:1910,y:2360,w:520,h:340,r:-4,title:{en:"Listening together",ar:"الإنصات مع بعض"},desc:{en:"Audience gathered for a live performance, documented in the archive.",ar:"جمهور خلال عرض حي موثّق في الأرشيف."}},
 {id:71,xref:470,page:20,project:"Live performance",category:"performance",x:1290,y:350,w:390,h:310,r:5,title:{en:"Musicians in performance",ar:"موسيقى حية"},desc:{en:"Performers and audience in a live music event.",ar:"عازفون وجمهور خلال عرض موسيقي."}}
];
const keyFocus=[null,null,39,40,41,42,null];
let story=null,lang="en",mode="journey",reading=false,openItem=null,currentBeat=0;
let viewport={w:innerWidth,h:innerHeight},target={...moments[0].camera},current={...target};
let lastScroll=-1,rafId=0,dirty=true,drag=null,scrollEnd=1,hideFrame=0;
const imageOf=(id)=>"/media/"+id+([29,53,56,61].includes(id)?".png":".jpeg");
const mediaRecord=(id)=>media.find(item=>item.id===id);
function makeWorld(){
 const root=$("#artifacts");
 media.forEach(item=>{
  const figure=document.createElement("figure");figure.className="artifact";
  figure.dataset.id=String(item.id);
  figure.dataset.category=item.category;
  figure.style.left=item.x+"px";figure.style.top=item.y+"px";
  figure.style.width=item.w+"px";figure.style.height=item.h+"px";
  figure.style.transform="rotate("+item.r+"deg)";
  const button=document.createElement("button");button.type="button";button.className="artifact-inner";
  button.setAttribute("aria-label","Open archive image "+item.id+": "+local(item.title));
  const image=document.createElement("img");image.alt=local(item.title);image.src=imageOf(item.id);
  image.loading=[39,40,41,42].includes(item.id)?"eager":"lazy";image.decoding="async";
  image.addEventListener("error",()=>{figure.classList.add("image-error");button.textContent="ARCHIVE / "+item.id;});
  button.append(image);button.addEventListener("click",()=>inspect(item.id));
  const caption=document.createElement("figcaption");
  caption.textContent=local(item.title)+" · "+item.project;
  figure.append(button,caption);root.append(figure);
 });
 const link=$("#worldLinks");
 link.innerHTML='<path d="M 2050 1020 C 2370 800, 2630 840, 2810 650 S 3220 1200, 3640 1310 S 4030 990, 4370 950"/>';
}
function renderNarrative(beat){
 const m=moments[beat];
 $("#narrativeOverline").textContent=String(beat+1).padStart(2,"0")+" / 07 — "+(lang==="en"?"THE LIVING MEMORY":"الذاكرة الحية");
 $("#statementA").textContent=m[lang][0];
 $("#statementB").textContent=m[lang][1];
 $("#narrativeBody").textContent=local(m.body);
 $("#chapterSource").textContent=m.label;
 $("#axisNumber").textContent=String(beat+1).padStart(2,"0")+" / 07";
 $("#axisFill").style.width=((beat+1)/moments.length*100)+"%";
 $("#nextBtn").textContent=beat===moments.length-1?"↺":"↓";
 $("#canvas").dataset.beat=String(beat);
 $("#experience").dataset.beat=String(beat);
 const focusId=keyFocus[beat];
 $$(".artifact").forEach(fig=>{
  fig.classList.toggle("is-focus",Number(fig.dataset.id)===focusId);
 });
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
 const focusY=viewport.h*(viewport.w<800?.38:.50);
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

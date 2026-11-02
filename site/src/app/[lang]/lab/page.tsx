import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {isLocale} from "@/lib/locale";
import "./lab-atlas.css";

type Props={params:Promise<{lang:string}>};
type Lang="ar"|"en";
const root="https://github.com/omarkhair70-droid/darb/blob/feature/darb-site-foundation-20261102/";
const experiments=[
 {id:"oculi-method",no:"01",ref:"OCULI MUNDI / FABRIQUE + Q42",
 title:{ar:"المكان كوسيلة للتنقّل",en:"Space as a way of navigating"},
 brief:{ar:"مجموعة وثائق في فضاء CSS ثلاثي الأبعاد. اختيار الكائن يحرك موضع النظر؛ ووضع Research يعرض نفس المصدر في فهرس.",en:"Source documents arranged in a CSS 3D field. Focus changes the shared scene, while Research retrieves the same objects as an index."},
 keep:{ar:"الكاميرا النسبية، التنقل بالكيبورد، روابط الحالة، وضع البحث",en:"Relative camera, keyboard/URL navigation, the research alternative"},
 reject:{ar:"الفضاء الداكن وصور الأرشيف الطافية كهوية نهائية",en:"The dark floating-photo layout as a final identity"},
 research:"research/26-visual-motion-typography-reference-labs.md"},
 {id:"getty-method",no:"02",ref:"GETTY / RESN — TRACING ART",
 title:{ar:"الحركة تكشف علاقة",en:"Movement reveals relationships"},
 brief:{ar:"مسار ScrollTrigger بين فيلم حقيقي ومخرجته وبرنامج جسور ومصدره. الأبعاد والأحجام تتغير حسب موضع القراءة.",en:"ScrollTrigger traces one verified film, filmmaker, Jusoor programme and institutional source, changing emphasis through scroll."},
 keep:{ar:"الحركة المرتبطة بالأدلة، التقدم السردي، الفصل بين قراءة العربي والتكوين",en:"Evidence-led motion, narrative position, independently composed RTL"},
 reject:{ar:"مسار متعرج وزخارف طباعية من غير سبب فني",en:"A decorative winding line or borrowed type treatment without a content reason"},
 research:"research/27-getty-resn-scroll-typography-motion-lab.md"},
 {id:"imaginarium-method",no:"03",ref:"NATIONAL GALLERY / Q42 + FABRIQUE",
 title:{ar:"الاقتراب والمشاهدة المتعمّقة",en:"Approach and slow looking"},
 brief:{ar:"مدخل تجريبي ومشاهدة حرّة أو بأسئلة ملاحظة، تكبير محدود للصورة الأصلية ثم سياق توثيقي من INBETWEEN.",en:"An experimental threshold, guided/free looking, limited native-image zoom and an INBETWEEN evidence comparison."},
 keep:{ar:"الاقتراب، حرية المشاهدة، حدود الدقة، أسئلة الملاحظة وسياق المصدر",en:"Proximity, free/guided attention, faithful resolution and provenance"},
 reject:{ar:"تكوين البداية بصورة بجوار عنوان كبير، والأسئلة العامة كصوت فنان",en:"The image-plus-headline opening or generic prompts posed as artist commentary"},
 research:"research/28-imaginarium-visual-slow-looking-lab.md"}
] as const;
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang}=await params;
 return {title:lang==="ar"?"أطلس تجارب درب — للمراجعة":"Darb research atlas — internal review",
 robots:{index:false,follow:false}};
}
export default async function ResearchAtlas({params}:Props){
 const {lang:l}=await params;if(!isLocale(l))notFound();
 const lang=l as Lang;const ar=lang==="ar";
 return <div className="research-atlas">
  <header className="atlas-top">
   <div className="atlas-top-line"><Link href={"/"+lang+"/archive"}>{ar?"← الأرشيف":"← Darb archive"}</Link><span>CREATIVE R&D / 2026 · PRIVATE PREVIEW</span></div>
   <div className="atlas-opening">
    <span className="atlas-eyebrow">{ar?"ملف تجميع تجارب درب":"RESEARCH / INTEGRATION INDEX"}</span>
    <h1>{ar?"كل اللي اتعمل. من غير ما نرمي حاجة.":"Keep the work. Question the form."}</h1>
    <p>{ar?"دي لوحة مراجعة داخلية للمختبرات والمصادر والقرارات. مش الصفحة الرئيسية الجديدة، ومش اعتمادًا لأي اتجاه بصري.":"An internal index of actual experiments, source evidence and decisions. This is neither the new public homepage nor an approved visual direction."}</p>
   </div>
  </header>
  <nav className="atlas-jump" aria-label={ar?"التنقل بين أقسام البحث":"Research sections"}>
   <a href="#experiments">{ar?"التجارب الثلاثة":"Three working labs"}</a>
   <a href="#materials">{ar?"المادة الأصلية":"Original sources"}</a>
   <a href="#integration">{ar?"قواعد الدمج":"Integration rules"}</a>
  </nav>
  <section className="atlas-sections" id="experiments" aria-labelledby="atlas-labs-h">
   <div className="atlas-section-head"><span>01 / LABORATORIES</span><h2 id="atlas-labs-h">{ar?"افتح كل تجربة واعرف اللي اتعلمناه":"Open, compare, keep the useful parts"}</h2></div>
   <ol className="atlas-experiments">
    {experiments.map(e=><li key={e.id} className="atlas-experiment">
     <div className="atlas-experiment-index">{e.no} <span> / 03</span></div>
     <div className="atlas-experiment-main">
      <span className="atlas-eyebrow">{e.ref}</span>
      <h3>{e.title[lang]}</h3>
      <p>{e.brief[lang]}</p>
      <div className="atlas-experiment-actions">
       <Link data-lab-id={e.id} href={"/"+lang+"/lab/"+e.id}>{ar?"افتح التجربة الحقيقية":"Open working lab"} ↗</Link>
       <a href={root+e.research} target="_blank" rel="noopener noreferrer">{ar?"افتح تفكيك المرجع":"See reference breakdown"} ↗</a>
      </div>
     </div>
     <div className="atlas-experiment-review">
      <p><b>{ar?"نحتفظ بـ":"KEEP"}</b>{e.keep[lang]}</p>
      <p><b>{ar?"لا ننقل كما هو":"DO NOT PORT AS-IS"}</b>{e.reject[lang]}</p>
     </div>
    </li>)}
   </ol>
  </section>
  <section className="atlas-bottom-sections" id="materials">
   <div className="atlas-section-head"><span>02 / SOURCE LIBRARY</span><h2>{ar?"المادة الحقيقية اللي عندنا":"What actually belongs to Darb"}</h2></div>
   <div className="atlas-stats">
    <div><strong>21</strong><span>{ar?"صفحة في ملف المؤسسة":"Institutional PDF pages"}</span></div>
    <div><strong>77</strong><span>{ar?"عنصرًا بصريًا مستخرجًا، مش ٧٧ عملًا موثّقًا":"Extracted image objects, not 77 catalogued artworks"}</span></div>
    <div><strong>04</strong><span>{ar?"أفلام جسور بأسماء صناعها":"Named Jusoor film records"}</span></div>
    <div><strong>01</strong><span>{ar?"فيلم متاح عبر ناشره الأصلي":"Film with an original-publisher viewing link"}</span></div>
   </div>
   <div className="atlas-links">
    <Link href={"/"+lang+"/works/braids-of-identity"}>{ar?"جدائل الهوية — فيلم/مخرجة/برنامج/مصادر":"Braids of Identity — film, maker, programme and evidence"} ↗</Link>
    <Link href={"/"+lang+"/archive"}>{ar?"الأرشيف القابل للبحث":"Searchable Darb archive"} ↗</Link>
    <a href={root+"research/visual-identity-archaeology-2022-2026.md"} target="_blank" rel="noopener noreferrer">{ar?"البحث في هويات درب والمعارض الأصلية":"Darb and exhibition identity archaeology"} ↗</a>
   </div>
  </section>
  <section className="atlas-bottom-sections" id="integration">
    <div className="atlas-section-head"><span>03 / INTEGRATION RULE</span><h2>{ar?"مش كولاج من ثلاث مواقع":"Not a mash-up of three reference sites"}</h2></div>
    <p className="atlas-argument">{ar?"لما العمل نفسه يحتاج مسافة وعمق، نستخدم الحركة المكانية. لما العلاقة بين شخص وعمل ومعرض مهمة، الحركة تتبع الدليل. ولما التفاصيل هي الفكرة، نسمح للمشاهد يقرّب ويلاحظ. بس كله لازم يعيش داخل مؤسسة واحدة لها لغتها وهويتها الحقيقية.":"Spatial movement only where a real work needs space. Scroll choreography only where a real relationship gives it meaning. Close looking only where actual media and interpretation support it. One institution, not three borrowed skins."}</p>
    <p>{ar?"اتجاه الواجهة الحالية لسه مرفوض. مفيش خط أو ألوان أو موشن عام معتمدين لدرب، والتصاريح والمادة الأصلية لبعض الفنانين ناقصة.":"The current homepage remains rejected. Darb's final typography, palette and motion system are not approved; artist media and rights gaps remain."}</p>
    <a className="atlas-master-link" href={root+"creative/29-CREATIVE-INTEGRATION-ATLAS.md"} target="_blank" rel="noopener noreferrer">{ar?"افتح ملف الدمج الكامل في GitHub":"Read full Creative Integration Atlas"} ↗</a>
  </section>
  <footer className="atlas-foot">{ar?"أطلس داخلي لمراجعة البحث — مش تصميم نهائي أو إطلاق عام":"INTERNAL RESEARCH MAP — NOT AN ART DIRECTION APPROVAL OR PUBLIC LAUNCH"}</footer>
 </div>;
}

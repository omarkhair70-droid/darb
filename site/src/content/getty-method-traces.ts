/**
 * Getty-method LAB, not Getty artwork/actual implementation.
 * Four separately evidenced entities in ONE Darb programme relation graph.
 * Data/copy are deliberately not invented to create a dramatic story.
 */
export const gettyTraces=[
 {
  id:"film",number:"01",kind:"FILM",
  label:{ar:"العمل",en:"The work"},
  title:{ar:"جدائل الهوية",en:"Braids of Identity"},
  intro:{ar:"فيلم وثائقي عن حرفة المشاط السوداني، وعن الذاكرة والهوية والمعيشة التي تحملها الحرفة.",en:"A documentary about Sudanese mashat hair braiding, and the memory, belonging and livelihood carried in a living craft."},
  link:"/works/braids-of-identity",
  linkLabel:{ar:"افتح الفيلم",en:"Open the film"},
  evidence:"SSLH MUSEUM · PUBLISHED FILM",
  relationship:{ar:"إخراج وبحث",en:"Directed & researched by"},
  kindHint:{ar:"مادة الفيلم: المصدر الرسمي فقط، من غير نسخ اللقطات",en:"Full video stays with its original publisher. No extracted frames."}
 },
 {
  id:"maker",number:"02",kind:"PERSON",
  label:{ar:"صاحبة العمل",en:"The maker"},
  title:{ar:"حفصة برعي",en:"Hafsa Borai"},
  intro:{ar:"المخرجة وصاحبة البحث. شرحها المنشور للفيلم بيصل الحرفة بالذاكرة والتهجير والاستمرار؛ ده مضمون بيانها، مش كلام من حوار الفيلم.",en:"Director and researcher. Her published artist statement connects braiding to memory, displacement and continuity; this is a paraphrase, not dialogue from the film."},
  link:"/people/hafsa-borai",
  linkLabel:{ar:"سجل المخرجة",en:"Director record"},
  evidence:"AFRICA FOTO FAIR · SSLH",
  relationship:{ar:"الفيلم مُدرج ضمن",en:"The film appears within"},
  kindHint:{ar:"مساهمة محددة وموثقة — مش سيرة مختلقة",en:"A documented contribution; no fabricated biography."}
 },
 {
  id:"programme",number:"03",kind:"PROGRAMME",
  label:{ar:"السياق",en:"The programme"},
  title:{ar:"جسور",en:"Jusoor"},
  intro:{ar:"ملف درب ٢٠٢٦، صفحة ٩، بيسجل «جدائل الهوية» ضمن برنامج لأفلام قصيرة سودانية. ده لا يثبت يوم عرض الفيلم أو حضور المخرجة.",en:"Darb's 2026 overview, page 9, lists Braids of Identity in a Sudanese short-film programme. It does not establish the individual screening date or the director's attendance."},
  link:"/projects/jusoor",
  linkLabel:{ar:"سجل البرنامج",en:"Programme record"},
  evidence:"DARB OVERVIEW 2026 · PAGE 09",
  relationship:{ar:"موثّق في",en:"Documented in"},
  kindHint:{ar:"هوية البرنامج الأصلية من ملف درب؛ تفاصيل الفنانين قيد المراجعة",en:"Original programme mark sourced from Darb; individual art credits under review."}
 },
 {
  id:"source",number:"04",kind:"SOURCE",
  label:{ar:"الدليل",en:"The evidence"},
  title:{ar:"صفحة ٠٩",en:"Page 09"},
  intro:{ar:"الرابط بين الفيلم ودرب مبني على سجل مؤسسة موجود فعلًا. ومكان وتاريخ العرض التفصيلي لسه غير متحققين؛ الفراغ ده جزء صريح من السجل.",en:"The film-to-Darb link rests on a genuine institutional document. Exact screening venue and date remain unverified, and that gap stays visible."},
  link:"/archive",
  linkLabel:{ar:"فهرس درب",en:"Darb research index"},
  evidence:"ORIGINAL DARB PDF · NOT A FILM LICENSE",
  relationship:{ar:"دي نهاية العلاقة الموثقة حاليًا",en:"The currently evidenced route ends here"},
  kindHint:{ar:"المصدر دليل على الارتباط، مش إذن لإعادة نشر الفيلم",en:"A programme reference is evidence, not a film redistribution license."}
 }
] as const;
export type GettyTrace=(typeof gettyTraces)[number];

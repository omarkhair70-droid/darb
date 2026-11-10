/**
 * Tales of Fustat: a restrained editorial viewing sequence.
 *
 * These are records co-present in the documented programme, not evidence that
 * any photographed individual created the print shown in the next step.
 * Credits and consent remain subject to approval for any PUBLIC release.
 *
 * No new invented project, person, location, historical date or artwork.
 */
export const FUSTAT_VIEWING_ROUTE=Object.freeze({
 39:Object.freeze({
  next:41,
  medium:"photography",
  label:Object.freeze({
   en:"From conversation toward light",
   ar:"من الحكاية لأثر الضوء"
  }),
  context:Object.freeze({
   en:"These images appear in the same Tales of Fustat programme. Cyanotype is one of its documented practices; this is an editorial viewing path, not an authorship claim.",
   ar:"الصور دي من نفس برنامج حكاوي الفسطاط، والسيانوتايب من ممارساته الموثقة. ده مسار مشاهدة تحريري، مش ادعاء إن الأشخاص في الصورة صنعوا الطبعة."
  }),
  source:"overview:p11"
 }),
 41:Object.freeze({
  next:42,
  medium:"cyanotype",
  label:Object.freeze({
   en:"When light becomes a record",
   ar:"لما الضوء يبقى أثر"
  }),
  context:Object.freeze({
   en:"The same programme documents cyanotype and photographs, prints and notebooks. Follow the material trace, not a guessed artist attribution.",
   ar:"البرنامج نفسه بيوثق السيانوتايب والمطبوعات والدفاتر. اتبع أثر الخامة من غير ما ننسب العمل لصانع مش مؤكد."
  }),
  source:"overview:p11"
 }),
 42:Object.freeze({
  next:39,
  medium:"print",
  label:Object.freeze({
   en:"Return to the voices",
   ar:"ارجع للحكايات"
  }),
  context:Object.freeze({
   en:"Return to the programme's conversations. This loop is an editorial reading of its materials, not a claim about the events' chronological order.",
   ar:"ارجع للمحادثات المرتبطة بالبرنامج. الدائرة دي ترتيب مشاهدة مننا، مش ادعاء إن الأحداث حصلت بالترتيب ده."
  }),
  source:"overview:p11"
 })
});

export function materialLanguage(record){
 if(!record)return "paper";
 if(record.id===41)return "cyanotype";
 if(record.id===42)return "print";
 if(record.id===39||record.id===40||record.kind?.includes("photo"))return "photography";
 if(record.kind?.includes("installation"))return "installation";
 return "paper";
}

/**
 * Only offer a route if both source and destination are actually in the
 * same fustat programme and in the canonical source catalog.
 */
export function nextMaterialTrace(id,records){
 const entry=FUSTAT_VIEWING_ROUTE[id];
 if(!entry)return null;
 const from=records.find(r=>r.id===id),next=records.find(r=>r.id===entry.next);
 if(!from||!next||from.cluster!=="fustat"||next.cluster!=="fustat")return null;
 return {...entry,from:id,to:next.id,kind:"editorial-viewing-sequence"};
}

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === "ar" || value === "en";
}

export const ui = {
  ar: {
    name: "درب ١٧١٨", tagline: "مساحة للفن، والناس، وما يحدث بينهما",
    nav: {home:"الرئيسية",explore:"اكتشف",archive:"الأرشيف",programmes:"البرنامج",participate:"شارك",about:"عن درب",visit:"التواصل"},
    introduction:"مساحة مستقلة للفن المعاصر في القاهرة، متصلة بحكايات الفسطاط والحِرف والتجارب الفنية الجديدة.",
    current:"من أرشيف درب", exploreTitle:"أكتر من طريقة لرؤية المكان", archives:"أرشيف التجارب",
    exploreIntro:"عروض، ورش، سينما، وأعمال فنية — تدخل من الحكاية، وتوصل للأشخاص والمكان.",
    more:"اكتشف الحكاية", details:"تفاصيل البرنامج", discover:"تصفّح الأرشيف",
    index:"فهرس", historical:"نشاط سابق — موثّق بالأرشيف", source:"المصدر: Darb 1718 Overview 2026",
    date:"التوقيت", location:"المكان", participants:"مساهمات موثقة", related:"حكايات مرتبطة",
    programmeTitle:"البرنامج والفعاليات", programmeText:"الفعاليات الواردة هنا تاريخية، وليست جدولًا مؤكدًا للمواعيد القادمة.",
    liveNote:"لا ننشر مواعيد أو حجوزات حالية قبل تأكيدها من فريق درب. تابع القنوات الرسمية لأحدث المعلومات.",
    official:"القنوات الرسمية", viewAll:"كل الأرشيف", all:"الكل", search:"ابحث في العنوان أو الوصف",
    searchSubmit:"بحث", results:"نتيجة", noResults:"لا توجد نتائج مطابقة", filters:"التصنيف",
    read:"اقرأ القصة", year:"السنة", page:"صفحة الملف", back:"العودة للأرشيف",
    participateTitle:"المشاركة ليست هامشًا", participateText:"درب مساحة للتجربة والتعلّم واللقاء. تأكد من أحدث الورش والإقامات والتقديمات من القنوات الرسمية؛ حالة النماذج الحالية تحتاج تحققًا.",
    aboutTitle:"عن درب", aboutText:"تأسس درب ١٧١٨ سنة ٢٠٠٨، وانطلق في الفسطاط بوصفه مساحة تربط الفنانين والحرفيين والجمهور. يستمر نشاطه عبر المعارض والعروض والورش والتعاون الفني.",
    aboutHistory:"المكان يتغير، والعمل يستمر", aboutHistoryText:"شهد المقر الرئيسي هدمًا في يناير ٢٠٢٤، لكن وثائق ٢٠٢٥ و٢٠٢٦ تسجل استمرار برامج ومعارض جديدة. لا نختزل الحكاية في هذه اللحظة وحدها.",
    visitTitle:"الزيارة والتواصل", visitText:"عنوان الزيارة وساعات العمل الحالية بحاجة لتأكيد بعد تغيّر المقر. لا نعرض هنا عنوانًا قديمًا على أنه مفتوح.",
    footer:"أرشيف بحثي قيد التطوير — محتوى المؤسسة الموثق، وليس جدولًا مباشرًا للحجوزات.",
    rights:"بيانات نسب الأعمال والصور إلى أصحابها قيد المراجعة التحريرية.",
    skip:"انتقل للمحتوى", working:"نسخة تطوير قيد المراجعة", copy:"قائمة القراءة",
    typeLabels:{exhibition:"معرض",programme:"برنامج",workshop:"ورشة",residency:"إقامة فنية",festival:"فعالية دولية"}
  },
  en: {
    name: "DARB 1718",tagline:"Art, people, and what happens between them",
    nav:{home:"Home",explore:"Explore",archive:"Archive",programmes:"Programme",participate:"Participate",about:"About",visit:"Contact"},
    introduction:"An independent contemporary arts space in Cairo, connected to Fustat's makers, communities and experimental practice.",
    current:"From the Darb archive",exploreTitle:"More than one way to encounter a place",archives:"Living records",
    exploreIntro:"Exhibitions, workshops, cinema and art — enter through a story and discover the people and place around it.",
    more:"Explore the story",details:"Programme details",discover:"Browse archive",
    index:"Index",historical:"Historical programme — archive record",source:"Source: Darb 1718 Overview 2026",
    date:"Dates",location:"Location",participants:"Documented contributors",related:"Related stories",
    programmeTitle:"Programme & events",programmeText:"These entries are archival records, not confirmed upcoming event dates.",
    liveNote:"Current schedules and registrations are not published here until verified by Darb. Check the institution's official channels.",
    official:"Official channels",viewAll:"Full archive",all:"All",search:"Search titles or descriptions",
    searchSubmit:"Search",results:"results",noResults:"No matching records",filters:"Discipline",
    read:"Read story",year:"Year",page:"PDF page",back:"Back to archive",
    participateTitle:"Participation is not a footnote",participateText:"Darb is a place for making, learning, and meeting. Consult official channels for workshop, residency, and open call details; current application status needs verification.",
    aboutTitle:"About Darb",aboutText:"Founded in 2008, Darb 1718 began in Fustat as a space connecting artists, craftspeople and audiences. Its activities span exhibitions, film, workshops, performances and collaboration.",
    aboutHistory:"A place can change. Practice continues.",aboutHistoryText:"Darb's main building was demolished in January 2024; the 2025–26 overview records continued exhibitions and programmes. The institution's story is larger than that event.",
    visitTitle:"Visit & contact",visitText:"The current visitor address and hours require confirmation after changes to the site. Historic addresses are not presented here as open.",
    footer:"Research-stage public-facing prototype using documented institutional material; not a live booking calendar.",
    rights:"Individual artwork and photographer attributions remain under editorial verification.",
    skip:"Skip to content",working:"Under editorial review",copy:"Reading index",
    typeLabels:{exhibition:"Exhibition",programme:"Programme",workshop:"Workshop",residency:"Residency",festival:"International event"}
  }
} as const;

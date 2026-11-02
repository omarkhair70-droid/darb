/**
 * Faithful documentary objects from the user-supplied Darb 1718 Overview 2026.
 * These are photographed events/works in their ORIGINAL contexts — NOT
 * newly invented works, named installations, or rights-cleared artist records.
 * Photo dimensions are verified in assets/manifest-original.json.
 */
export const encounters = [
  {
    id:"installation",
    image:"pdf_image_0360.jpeg",
    page:7,
    dimensions:"1920 × 1080",
    context:"INBETWEEN / 2025",
    title:{ar:"العمل داخل المساحة",en:"Work within the space"},
    medium:{ar:"توثيق معرض وتركيبات بصرية",en:"Exhibition and artwork documentation"},
    note:{ar:"من صور معرض INBETWEEN. هذه صورة توثيقية من الملف المؤسسي وليست عملًا فنيًا مستقلًا مُعرّفًا باسم الفنان.",en:"From the INBETWEEN exhibition documentation. This is an archival image, not a separately attributed artist work."},
    alt:{ar:"سلسلة مطبوعات أحادية اللون موثّقة داخل معرض INBETWEEN.",en:"Monochrome printed works documented inside the INBETWEEN exhibition."},
    slug:"inbetween-2025"
  },
  {
    id:"making",
    image:"pdf_image_0323.jpeg",
    page:3,
    dimensions:"1210 × 908",
    context:"FUSTAT / CRAFT",
    title:{ar:"العمل وهو بيتصنع",en:"Work in the making"},
    medium:{ar:"حِرفة وخزف — توثيق نشاط",en:"Ceramics and craft — practice documentation"},
    note:{ar:"صورة حرفيين بيشتغلوا بالخزف من صفحة ٣. ما عندناش دليل إن الأشخاص دول مشاركين في ورشة حكاوي الفسطاط اللاحقة.",en:"Craftspeople at work in the page-three overview. There is no evidence that these people attended the later Tales of Fustat workshop."},
    alt:{ar:"مجموعة من الحرفيين يعملون في الخزف داخل مساحة عمل.",en:"A group of craftspeople working with ceramics in a workshop."},
    slug:null
  },
  {
    id:"gathering",
    image:"pdf_image_0470.jpeg",
    page:20,
    dimensions:"1872 × 1052",
    context:"LIVE / PERFORMANCE",
    title:{ar:"لما الناس تتجمع",en:"When people gather"},
    medium:{ar:"أداء حي — توثيق فوتوغرافي",en:"Live performance — photographic documentation"},
    note:{ar:"توثيق أداء حي من صفحة ٢٠؛ اسم المؤدي وتاريخ العرض واعتماد المصوّر لسه محتاجين توثيق.",en:"Live performance documented on page 20. Performer, performance date and photographer credits still need verification."},
    alt:{ar:"توثيق فوتوغرافي لأداء موسيقي مباشر أمام جمهور.",en:"Documentary photograph of a live musical performance."},
    slug:null
  },
] as const;

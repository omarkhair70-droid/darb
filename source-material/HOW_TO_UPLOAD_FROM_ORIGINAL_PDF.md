# رفع ملف درب من الـPDF الأصلي مباشرة — بدون تحميل ZIP من ChatGPT

هذا المسار هو البديل الرسمي داخل ريبو البحث عن تحميل أرشيف 72MB من المحادثة. **لا حاجة لتحميل أرشيف الصور من ChatGPT إطلاقًا.** كل الملفات تُستخرج من **النسخة الأصلية لملف Darb 1718 Overview 2026.pdf** الموجودة عند صاحب المشروع.

## المتطلبات على Windows
- Git for Windows (النسخة التي تستخدمها مع مشاريعك).
- Python 3 (النسخة التي تستخدمها مع مشاريعك؛ السكربت يثبت PyMuPDF وPillow فقط عند الحاجة).
- نسخة الـPDF الأصلية، التي تم إرسالها في الشات. السكربت يتحقق من بصمتها SHA-256 قبل أي استخراج.
- صلاحية push إلى `omarkhair70-droid/darb`. المستودع **Public**، والصور المرفوعة ستكون ظاهرة للعامة.

## افتح PowerShell ونفذ هذه الأوامر

```powershell
git clone https://github.com/omarkhair70-droid/darb.git
cd darb
powershell -ExecutionPolicy Bypass -File .\source-material\upload_from_pdf.ps1
```

هيفتح مربع اختيار الملفات، اختار ملف Darb الأصلي (PDF) من جهازك. لا تحتاج تفك ضغط شيء أو تسمّي الملف اسمًا محددًا. إذا ظهر طلب GitHub Authentication من Git أو Git Credential Manager، سجل دخولك.

**إذا كان مجلد `darb` موجودًا بالفعل:** ادخل عليه (`cd darb`) ثم `git pull --ff-only` ثم شغّل الأمر الثالث فقط. ولو حصل تعارض في المجلد المحلي، افتح PowerShell بمجلد مختلف وأنشئ نسخة جديدة عن طريق `git clone` كي لا تغيّر شغلك.

## ماذا يحدث؟
1. يتحقق من SHA-256 للـPDF (`07c59412bfd9c9c85314d54069e8a0e2a9e5db5472247ca690505969085a9b74`).
2. يستخرج **77 ملف صورة/رسم** و**21 معاينة للصفحات**، ويجهز contact sheets وJSON/CSV manifest؛ يعيد نسخة PDF الأصلية.
3. ينشئ فرعًا باسم `research/overview-2026-media-YYYYMMDD-HHMMSS`.
4. يعمل commit ثم push للفرع نفسه إلى GitHub.
5. يظهر رابط الفرع ورابط مراجعته؛ **لا يدمج إلى main تلقائيًا** ولا ينشئ موقعًا أو ينشره.

المسارات التي يتم إضافتها:
- `source-material/original/Darb_1718_Overview_2026.pdf`
- `assets/original/pdf_image_XXXX.jpeg|png` (77)
- `assets/previews/page_XX.png` (21)
- `assets/contact-sheets/`
- `assets/manifest-original.csv`, `assets/manifest-original.json`

## بديل مباشر لتحديد مسار الملف
```powershell
powershell -ExecutionPolicy Bypass -File .\source-material\upload_from_pdf.ps1 -PdfPath "C:\Users\dell\Downloads\Darb 1718 Overview  2026 .pdf"
```
مسار المثال فقط — استبدله بمكان الملف عندك، أو استعمل نافذة اختيار الملفات المفضلة.

## حالة التنفيذ
تم اختبار استخراج الأصول محليًا من نفس الملف: **21 صفحة و77 صورة**. لم يتم تشغيل خطوة `git push` على جهاز صاحب المشروع بعد. إذا تعطل أمر ما، انسخ رسالة الخطأ الكاملة حتى يمكن إصلاح السبب بدل إعادة رفع الملفات يدويًا.

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locale";

export function LanguageSwitch({lang}:{lang:Locale}) {
  const current=usePathname()||"/ar";
  const next=lang==="ar"?"en":"ar";
  const path=current.replace(/^\/(ar|en)(?=\/|$)/,"/"+next);
  return <Link href={path} hrefLang={next} lang={next} className="language-switch" aria-label={lang==="ar"?"Switch to English":"التحويل إلى العربية"}>
    {lang==="ar"?"EN":"عربي"}
  </Link>;
}

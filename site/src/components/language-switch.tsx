"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import type { Locale } from "@/lib/locale";

export function LanguageSwitch({lang}:{lang:Locale}) {
  const current=usePathname()||"/ar";
  const next=lang==="ar"?"en":"ar";
  const path=current.replace(/^\/(ar|en)(?=\/|$)/,"/"+next);
  const [query,setQuery]=useState("");

  useEffect(()=>{
    const update=()=>setQuery(window.location.search);
    update();
    window.addEventListener("popstate",update);
    window.addEventListener("darb:route-change",update);
    return ()=>{
      window.removeEventListener("popstate",update);
      window.removeEventListener("darb:route-change",update);
    };
  },[current]);

  return <Link href={path+query} hrefLang={next} lang={next}
    className="language-switch"
    aria-label={lang==="ar"?"Switch to English":"التحويل إلى العربية"}>
    {lang==="ar"?"EN":"عربي"}
  </Link>;
}

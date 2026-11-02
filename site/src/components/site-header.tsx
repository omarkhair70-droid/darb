import Link from "next/link";
import type {Locale} from "@/lib/locale";
import {ui} from "@/lib/locale";
import {LanguageSwitch} from "./language-switch";

const secondary=["participate","about","visit"] as const;
export function SiteHeader({lang}:{lang:Locale}){
 const copy=ui[lang];
 return <header className="site-header">
  <div className="shell topbar darb-topbar">
   <Link href={"/"+lang} className="brand" aria-label={copy.name+" — "+copy.nav.home}>
      <span className="darb-wordmark">DARB <strong>1718</strong></span>
      <small className="darb-wordmark-sub">{lang==="ar"?"القاهرة · مساحة للفن":"CAIRO · ART SPACE"}</small>
   </Link>
   <nav className="desktop-navigation darb-direct-nav" aria-label={lang==="ar"?"التنقل الرئيسي":"Primary navigation"}>
     <Link href={"/"+lang+"/explore"}>{copy.nav.explore}</Link>
     <Link href={"/"+lang+"/archive"}>{copy.nav.archive}</Link>
     <Link href={"/"+lang+"/programmes"}>{copy.nav.programmes}</Link>
   </nav>
   <div className="header-actions">
      <LanguageSwitch lang={lang}/>
      <details className="mobile-menu darb-site-map">
         <summary aria-label={lang==="ar"?"فتح القائمة":"Open site map"}>{lang==="ar"?"المساحات":"Spaces"} <span aria-hidden="true">+</span></summary>
         <nav aria-label={lang==="ar"?"خريطة الموقع":"Site map"}>
           <Link href={"/"+lang}>{copy.nav.home}</Link>
           <Link href={"/"+lang+"/explore"}>{copy.nav.explore}</Link>
           <Link href={"/"+lang+"/archive"}>{copy.nav.archive}</Link>
           <Link href={"/"+lang+"/programmes"}>{copy.nav.programmes}</Link>
           {secondary.map(k=><Link key={k} href={"/"+lang+"/"+k}>{copy.nav[k]}</Link>)}
         </nav>
      </details>
   </div>
  </div>
 </header>;
}

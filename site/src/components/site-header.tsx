import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { ui } from "@/lib/locale";
import { LanguageSwitch } from "./language-switch";

export const links = [
  ["explore", "explore"],
  ["archive", "archive"],
  ["programmes", "programmes"],
  ["participate", "participate"],
  ["about", "about"],
  ["visit", "visit"],
] as const;

export function SiteHeader({lang}:{lang:Locale}) {
  const copy=ui[lang];
  return <header className="site-header">
    <div className="shell topbar">
      <Link href={"/"+lang} className="brand" aria-label={copy.name+" — "+copy.nav.home}>
        <span>{copy.name}</span>
      </Link>
      <nav className="desktop-navigation" aria-label={lang==="ar"?"التنقل الرئيسي":"Primary navigation"}>
        {links.map(([href,key])=><Link key={href} href={"/"+lang+"/"+href}>{copy.nav[key]}</Link>)}
      </nav>
      <div className="header-actions">
        <LanguageSwitch lang={lang}/>
        <details className="mobile-menu">
          <summary>{lang==="ar"?"القائمة":"Menu"}</summary>
          <nav aria-label={lang==="ar"?"قائمة الهاتف":"Mobile navigation"}>
            <Link href={"/"+lang}>{copy.nav.home}</Link>
            {links.map(([href,key])=><Link key={href} href={"/"+lang+"/"+href}>{copy.nav[key]}</Link>)}
          </nav>
        </details>
      </div>
    </div>
  </header>;
}

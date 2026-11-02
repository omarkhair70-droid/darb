import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, locales, ui } from "@/lib/locale";
import { SiteHeader } from "@/components/site-header";
import "../globals.css";

type Props = { children: ReactNode; params: Promise<{lang:string}> };

export function generateStaticParams(){return locales.map(lang=>({lang}));}

export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
  const {lang}=await params;
  const l=isLocale(lang)?lang:"ar";
  return {
    title: {default:ui[l].name+" — "+ui[l].tagline,template:"%s | "+ui[l].name},
    description:ui[l].introduction,
    alternates:{languages:{"ar":"/ar","en":"/en"}},
    robots:{index:false,follow:false},
  };
}

export default async function LocaleRoot({children,params}:Props){
  const {lang}=await params;
  if(!isLocale(lang))notFound();
  const copy=ui[lang];
  return <html lang={lang} dir={lang==="ar"?"rtl":"ltr"}>
    <body>
      <a className="skip-link" href="#content">{copy.skip}</a>
      <SiteHeader lang={lang}/>
      <main id="content">{children}</main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <div><strong>{copy.name}</strong><p>{copy.footer}</p></div>
          <div><a href="https://linktr.ee/darb1718" target="_blank" rel="noopener noreferrer">{copy.official} ↗</a><p>{copy.rights}</p></div>
        </div>
      </footer>
    </body>
  </html>;
}

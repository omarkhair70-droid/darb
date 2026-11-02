import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale} from "@/lib/locale";
import {ImaginariumMethodLab} from "@/components/imaginarium-method-lab";
import "./imaginarium-lab.css";
type Props={params:Promise<{lang:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang}=await params;return {
 title:lang==="ar"?"مختبر النظر البطيء — درب":"Slow-looking experiment — Darb",
 robots:{index:false,follow:false}
 };
}
export default async function ImaginariumPage({params}:Props){
 const {lang}=await params;
 if(!isLocale(lang))notFound();
 return <ImaginariumMethodLab lang={lang}/>;
}

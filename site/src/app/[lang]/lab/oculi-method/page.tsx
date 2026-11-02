import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {isLocale} from "@/lib/locale";
import { OculiMethodLab } from "@/components/oculi-method-lab";
import "./reference-lab.css";

type Props={params:Promise<{lang:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"مختبر التنقل المكاني | درب":"Spatial navigation laboratory | Darb",robots:{index:false,follow:false}};
}
export default async function ResearchLab({params}:Props){
 const {lang}=await params;if(!isLocale(lang))notFound();
 return <OculiMethodLab lang={lang}/>;
}

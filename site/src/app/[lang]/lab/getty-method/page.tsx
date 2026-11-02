import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale} from "@/lib/locale";
import {GettyMethodLab} from "@/components/getty-method-lab";
import "./getty-lab.css";
type Props={params:Promise<{lang:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang}=await params;
 return{title:lang==="ar"?"مختبر السرد المتحرك | درب":"Tracing Art — movement study | Darb",robots:{index:false,follow:false}};
}
export default async function GettyLabPage({params}:Props){
 const {lang}=await params;
 if(!isLocale(lang))notFound();
 return <GettyMethodLab lang={lang}/>;
}

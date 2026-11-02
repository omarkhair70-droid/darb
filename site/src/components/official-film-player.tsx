"use client";
import {useState} from "react";
import type {Locale} from "@/lib/locale";
import type {WorkRecord} from "@/lib/work-graph";
import {officialYouTubeEmbed} from "@/lib/work-graph";

export function OfficialFilmPlayer({work,lang}:{work:WorkRecord;lang:Locale}){
  const [play,setPlay]=useState(false);
  const ar=lang==="ar";
  const embed=officialYouTubeEmbed(work);
  return <section className="film-screening" aria-label={ar?"مشاهدة الفيلم من المصدر الرسمي":"Film from original publisher"}>
    <div className="film-stage">
      {play && embed ?
        <iframe title={work.title[lang]} src={embed} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="eager"/>:
        <div className="film-before-play">
          <div className="film-publisher"><span>{ar?"عرض من الناشر الأصلي":"ORIGINAL PUBLISHER"}</span><strong>{work.media.publishedBy||""}</strong></div>
          <div className="film-watch-action">
            {embed?<button type="button" onClick={()=>setPlay(true)} aria-label={ar?"تشغيل الفيلم من يوتيوب":"Play the publisher's YouTube film"}>
              <span aria-hidden="true">▶</span>{ar?"شاهد الفيلم":"Watch the film"}
            </button>:<p>{ar?"الفيلم غير متاح للمشاهدة هنا حاليًا.":"Film playback is not available here."}</p>}
            <p>{ar?"لن يتم تحميل مشغّل يوتيوب قبل اختيار المشاهدة.":"YouTube is loaded only after you choose to watch."}</p>
          </div>
        </div>}
    </div>
    <div className="film-player-meta">
      <span>{ar?"فيلم وثائقي · نسخة الناشر":"DOCUMENTARY · PUBLISHER'S PLAYER"}</span>
      {work.media.videoUrl && <a target="_blank" rel="noopener noreferrer" href={work.media.videoUrl}>{ar?"شاهد على يوتيوب مباشرة":"Open on YouTube"} ↗</a>}
    </div>
  </section>;
}

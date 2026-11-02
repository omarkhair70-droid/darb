"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
export default function StudioPage(){
  if(!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return <div style={{fontFamily:"system-ui",padding:48,maxWidth:720}}>
      <h1>Editorial Studio not configured</h1>
      <p>Provide a verified Sanity project ID and dataset in the deployment environment. The public website can still display the approved archive records in development.</p>
      <a href="/en">Return to Darb</a>
    </div>;
  }
  return <NextStudio config={config}/>;
}

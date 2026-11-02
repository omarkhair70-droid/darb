"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema-types";

// Demo-shaped ID is a non-working placeholder, used ONLY for static compilation.
// The /studio page clearly requires a real NEXT_PUBLIC_SANITY_PROJECT_ID.
export default defineConfig({
  name:"darb",
  title:"Darb 1718 — editorial workspace",
  basePath:"/studio",
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "configureme",
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins:[structureTool()],
  schema:{types:schemaTypes}
});

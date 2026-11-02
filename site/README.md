# Darb 1718 — first real website foundation

This is the **real Next.js application**, intentionally separate from the source-research folders. It is an implementation in progress, not a released or officially approved Darb public website.

## Getting started
From repository root: cd site && npm install && npm run dev

Node >=22.12. The media predev/prebuild step copies a small, selected set from ../assets/original into public/media; do not commit derivatives twice. If you deploy through Vercel, set Root Directory = site and keep the full repository checked out.

## Content truth
The bundled bilingual JSON records contain **historical, source-labelled programmes only**, extracted from the user-supplied 21-page 2026 Darb overview. They do not invent any current opening hours, open calls, ticketing or staff profiles. The client has confirmed permission to use this supplied PDF/media for the commissioned website; individual artist/photographer attributions remain under editorial review.

The eventual Sanity publication process is represented by schema definitions and server-side client integration. When NEXT_PUBLIC_SANITY_PROJECT_ID is unset, this site renders grounded archival seed data for development; it never describes it as "live programme". Do not enable an editor or publish new records without editorial owner verification.

## Initial routes
/ar and /en with symmetric root / archive / explore / projects/[slug] / programmes / participate / about / visit. Project and archive routes use the same data. No mandatory cinematic intro, no generated illustrations, no undisclosed fake events.

## Production gates
- Verify roles, current venue and current forms
- Original hi-res photography and all artist/photographer credits
- Editorial approval for bilingual content and author contributions
- Configure genuine Sanity project, permissions, workflows, Preview and webhooks
- Build and cross-browser QA, accessibility, reduced motion and page speed
- Client approval before connecting production domain

The app will be worked on as a Draft PR; do not call it production-ready from file creation alone.

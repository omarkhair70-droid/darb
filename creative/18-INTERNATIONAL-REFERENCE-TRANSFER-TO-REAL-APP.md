# Stage 09 — International reference mechanisms applied, not copied

Date 2026-11-02. This is a real experimental code pass in Draft PR #2, automatically Preview deployed by Vercel once CI succeeds. **No client-approved final visual identity, curatorial selection or public launch.**

## Research-to-build transfer

| Reference | Original maker's problem & technique | Darb's actual implementation | What was explicitly NOT copied |
|---|---|---|---|
| Fabrique/Q42 Oculi Mundi | questioned the very need for a homepage; offers a gallery of spaces, expressive Explore plus conventional accessible Research | Entrance is a **source-led encounter stage** with three actual PDF materials; archive remains a queryable **research index** | No 3D globe, celestial effects, map cluster, copied navigation or unusual cursor |
| Getty × Resn Tracing Art | authored paths between images, historical relationships, people, provenance; an index remains available | Each source stage gives real PDF page, original pixel size and linked verified programme; project detail keeps context and explicitly editorial related records | No borrowed art-sphere, scroll hijacking or pretend causal relations |
| National Gallery Imaginarium | slow looking with actual curator-authored questions, original art at high detail | Stage puts authentic image **first, fully contained**; source and caption available, selection of different mediums reversible. We did NOT invent curator questions or zoom beyond resolution. | No fake museum, fantasy room or AI movement of actual artworks |
| KW Berlin new artist-involved identity (2025) | systematic communication and space for invited artists' contributions | Separate institution orientation/data and individual **project presentation**; preserve original artwork visibility and reserve rights-aware artist identity fields. Full staff/artist editorial integration still missing. | No generic hand-drawn marks, no copied typeface or pretend artist collaboration |

Primary sources:
- https://www.fabrique.com/cases/museums-and-heritage/oculi-mundi-the-eyes-of-the-world/
- https://engineering.q42.nl/oculi-mundi/
- https://www.commarts.com/webpicks/tracing-art
- https://www.q42.nl/en/work/imaginarium-national-gallery
- https://www.kw-berlin.de/en/info/scribbles

## Concrete changes to actual Darb application
- Front page is no longer "giant assistant-written slogan + side-by-side rectangular picture". It is an **interactive encounter viewer** plus grounded ways to find projects/visit programme status, with a smaller contextual orientation header.
- Three original PDF fragments explicitly sourced by **PDF page and image pixel dimensions**:
  1. p7 INBETWEEN print-series documentation: pdf_image_0360.jpeg (1920x1080), route to archived exhibition
  2. p3 ceramics workers: pdf_image_0323.jpeg (1210x908), **not falsely labelled as participants in Tales of Fustat**
  3. p20 live performance: pdf_image_0470.jpeg (1872x1052), performer and photograph credits **not invented**
- All images use object-fit **contain** and the full artwork/documentation remains visible; no enlarged 694px Something Else first-screen hero.
- Gallery scene selection uses GSAP for a short, optional transition; reduced-motion users and first-load see all content immediately. Controls are real buttons with aria-pressed, not an inaccessible Canvas UI.
- Archive rewritten as a reference **list with search, filter, PDF provenance and thumbs**, not repeated marketing cards.
- Project detail rewritten as a **media-context view**: large uncropped document, source notes and date/status, with a separate independent p7 photo for INBETWEEN. Related events are marked editorial, not factually shared authorship.
- Navigation consolidated into essential Explore, Archive, Programme and an accessible full site map in the header. AR/EN kept symmetric.

## What is not yet solved by this code
- Darb's actual institutional approved visual identity and artist-authored 2026 exhibition graphics.
- Fully identified *individual* artworks, original photos, credits/crop rights and high-res image packets (the code is expressly documentary).
- A full spatial work, serious slow-looking curation or rich event video/audio — cannot fabricate it from PDF.
- Fully integrated Sanity publishing workflow/roles, real open current event date/address, actual public production site.
- Whole-site conceptual signoff. Experimental stage/index/workroom are **not client-approved final designs**.
- Gallery source selection remains a small curated hardcoded slice, should migrate to editorial source and rights system.

## Acceptance tests
The existing Next.js build and Playwright desktop/mobile AR/EN suite now tests scene change, source page, real file name, archive row count, search, project image visibility, language, reduced-motion and no old tagline. New Vercel builds are automatic on feature-branch pushes. Do not call it ready until the CI run and protected deployment both succeed.

## Why this is progress not a second template
The tangible change is visitor agency: choose source artifacts, see them in original frames, enter their independent verified program and switch to research index. The remaining creative work is to extend this grammar with genuine credited artworks/artist voices, not to freeze the present palette.

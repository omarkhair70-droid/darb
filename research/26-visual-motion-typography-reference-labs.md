# STAGE 12 — Typography / Composition / Motion Anatomy & Reference Lab

**Date 2026-11-02. Both earlier Darb visual iterations rejected.** This is a traceable visual engineering investigation, not an approved brand or a new homepage. Its purpose is to stop delivering content-only pages while claiming creative experience.

## Evidence status
- **Maker-confirmed:** a developer/design studio publicly describes a technique.
- **Visible reference:** the studio's published screenshot demonstrates a composition; this is not computed CSS inspection.
- **Reconstruction:** our experimental code, timing and typography choices; NEVER pass them off as the site's exact font/easing/measurements.
- **Blocked:** original media, rights/credits, author-approved concepts or live browser capture missing.
- We attempted an interactive Oculi Mundi browser visit, but the browser provider refused because the connected wallet is out of funds. This dossier relies on public studio documentation and screenshots, NOT a fictional live click-through.

## Oculi Mundi — FABRIQUE × Q42 / 2023
Maker sources: https://www.q42.nl/en/work/oculimundi ; https://engineering.q42.nl/oculi-mundi/ ; https://www.fabrique.com/cases/museums-and-heritage/oculi-mundi-the-eyes-of-the-world/ .

**Composition (visible):** images of maps and atlases occupy multiple depth planes, large foreground objects and smaller distant objects. Environmental field and spatial relationships supply the hierarchy; text labels float closer to the object. Navigation is a gallery of spaces, not a standard agency homepage. Research mode uses clearer dense grid/filter structure. The typeface and CSS pixel metrics have not been verified.

**Real motion architecture (maker-confirmed):** DOM + CSS perspective/3D transform instead of a default WebGL canvas because high-fidelity image display and semantic accessibility mattered. Spatial objects transform as the viewpoint changes. Custom cursor feedback was introduced after usability tests. Explore and Research share a source collection and URL-visible state. Q42 reported CPU/performance challenges with a large cluster and optimized recalculations.

**Lab #01 design tokens — OUR VALUES, NOT THE ORIGINAL SITE:** parent perspective 1150px; 7 individually positioned archival documentary nodes in a coordinate field, native 3D transform. Camera selection repositions the entire group relative to the chosen source; pointer parallax about ±1.2 degrees, rather than scrolling images through a carousel. CSS motion 920ms with cubic-bezier(0.22,1,0.36,1); pointer drift 180ms; wheel throttle 750ms. GSAP contextual labels 450ms. All values explicitly measured only in our own reconstruction.

**Typography roles in the lab:** short monospaced provenance/mode labels; medium-weight context titles anchored to active spatial object; no gigantic brand slogan in the first screen. In Research mode the catalogue's headings can grow because the viewer has explicitly chosen to read rather than explore. Arabic and English require separate line-wrapping and RTL testing. Current font choices are provisional neutral test type, not a Darb identity.

**Our functionality:** Explore spatial field, focus changing depth arrangement, pointer navigation, keyboard arrows, selected object's source panel, Research listing of the SAME seven objects, shared URL and browser back/forward, reduced-motion fallback. Real Darb 2026 PDF images from p3, p7, p10, p11, p17, p20 are used only as historical research media; no individual artist/work authorship inferred. Route: /ar/lab/oculi-method or /en/lab/oculi-method. Site navigation and page design do not change. Lab is isolated in protected Vercel Preview.

## Getty / Resn — Tracing Art / 2025
Sources: https://www.getty.edu/tracingart/ ; https://www.commarts.com/project/38649/tracing-art ; https://www.awwwards.com/tracing-art.html .

**Visible composition:** Artwork thumbnails trace a sinuous visual spine through broad white space; mobile view keeps the path, shifting artwork scale and type. Getty institutional wordmark and story titles anchor the composition. This is **not** a generic image grid. Serif/larger literary headings and restrained smaller source text play different roles. Exact font name, scale and easing have NOT been measured.

**Reported choreography:** Three authored historical chapters of Getty Provenance Index relationships; ScrollTrigger and Lenis for some transitions and selective Three.js objects. Progress/chapters navigation responds to story position. Movement expresses a documented relationship between object, owner/place/time, not decorative reveal.

**Lab #02 later:** Build a semantically true path across FILM → DIRECTOR → JUSOOR PROGRAMME → DOCUMENTARY SOURCE for Braids of Identity, with source evidence and an indexed alternative. Only use film imagery/video if the publisher/filmmaker explicitly permits that use. No random circular photo cloud.

## National Gallery / Q42 + Fabrique — Imaginarium / 2025
Sources: https://www.q42.nl/en/work/imaginarium-national-gallery ; https://www.fabrique.com/cases/museums-and-heritage/imaginarium/ ; https://www.nationalgallery.org.uk/visiting/virtual-gallery/national-gallery-imaginarium .

**Visible composition:** Ambient architectural/dreamlike perspective with framed paintings at varying depths and small, quiet controls. An image-detail view has numbered stages/questions over a genuine painting. Typography remains subordinate to seeing; prompts interrupt art only when they have an author/curator purpose.

**Maker-confirmed:** entrance via virtual Room 36; guided or self-directed mode; high-resolution Micrio images; questions written by National Gallery curators; selective AI/art animation and sound reviewed for integrity. Stack Three.js/R3F, Sanity and Firebase. This is not merely three pictures floating on a dark page.

**Lab #03 later:** A director-approved slow-looking/slow-listening flow for Braids of Identity with actual film timecodes, author-approved questions, captions and genuine content. The publicly available full YouTube film is not permission to extract or transform its frames. Do not fake individual scenes or prompts.

## KW Berlin / Correspondence + Dinamo + Systemantics / 2025
Sources: https://www.kw-berlin.de/en/info/scribbles ; https://correspondence.works/kw-redesign ; https://www.systemantics.net/projects/2025-kw-institute-for-contemporary-art/ .

**Visible composition:** KW logotype and wayfinding have a legible institutional voice, while artist/contributor-made visual marks can interact over commissioned images. Another real screenshot shows large linked filters for years/themes/types, then images/results below. Neither is the same editorial card repeated for every project.

**Maker-confirmed typography:** custom KW Grotesk was made by Dinamo; alternate glyphs nod to KW's local typographic history. A systematic informational layer coexists with an intuitive artist/archival marks layer from almost 1,000 authentic contributions. Its identity spans signage, publications and digital work.

**Lab #04 later:** Original Darb logo/poster identity archaeology with verified creators, separate Arabic/Latin type-testing, visual system that allows original exhibition authorship without flattening it to site-wide graphic presets. Do not use KW's proprietary font, copy its institutional marks or invent scribbles.

## Acceptance criteria for a reference reconstruction
1. Link exact reference screen/video and mark maker-confirmed vs screenshot-observed vs our assumptions.
2. Show what moves: spatial coordinates, parallax, time, image scale, content, opacity, ease, and why each responds to user action.
3. Document typography role by role (navigation, object, captions, research, source), Arabic/English specimens and actual OWN measured values.
4. Test interaction on desktop and mobile; keyboard, URL history/deep linking, reduced-motion mode, and escape/back navigation.
5. Judge impact with the user: can someone discover or understand something the previous image viewer didn't allow? If not, the prototype fails.
6. Only after testing, decide what (if anything) should migrate from the isolated lab to a wholly conceived Darb site.

**No artistic sign-off inferred from GitHub/CI/Vercel.** The previous Darb homepage and image viewer are still rejected. This prototype must not become the new homepage via copy-paste.

# DARB ARCHIVE — The Living Memory
### Stage 04 — The Woven D / Object Encounter (iterating in the **same** archive)

- One **D-shaped spatial filament** formed from real source images #39–42 from Tales of Fustat; it is a first working letter, not the completed D-A-R-B identity.
- The very first camera viewpoint is a deep moss-colored living network, not a hero section. Its source-image knots can be selected with mouse, touch or keyboard.
- Selecting an object enters an **encounter camera state** inside the existing archive world: the chosen source work stays in place; contextual narrative and source information appear around it rather than in the old boxed right drawer.
- Documentary photography and cyanotype use different environment tones; nonselected works recede, while relevant programme and curated cross-programme paths remain visible.
- Visitors can travel to a connected source and **retrace their precise relationship history**, eventually restoring the originating journey or free-wander state. Scrolling is locked during inspection and restored afterwards.
- The camera now interpolates based on elapsed time, not per-frame assumptions, so slow-frame-rate devices don't cause indefinitely prolonged moves.
- Source names, filament knots and encounter labels support AR/EN. A text-first reading alternative and reduced-motion controls remain.
- Playwright tests require an actual selected source image to occupy the viewport and test first D entry → cyanotype → curated relationship → retrace → archive on desktop and mobile.

This is an iterative high-end creative slice, not an assertion of Getty/Oculi final quality, award acceptance, or a finished audio installation. Complete visual review and browser QA on each new slice before adding further letters and the sound layer.

## Stage 03 / Source Atlas, 9 thematic threads, 16 spatial narrative moments

A standalone cultural exploration built from Darb 1718's supplied 2026 institutional overview. Not the older rejected Darb corporate-site experiment. **This is an iterative creative build, not an announcement of final Getty-level quality.**

## What changed since the Getty screen-recording review

- One permanent 9,200 × 6,400 source-led world, composed from genuine archival media rather than a conventional header/hero/sections workflow.
- **77 original PDF source records** indexed in \`data/media-catalog.json\`, with exact PDF page, XREF, source filename, editorial kind, programme and Arabic/English labels.
- **72 positioned archive objects** in \`src/world-layout.mjs\`, spanning **17 programme/context clusters**. Five non-editorial layout fragments / repeated logos stay in the source index but do not clutter the stage.
- **16 authored camera viewpoints** in \`data/world-chapters.json\`: move continuously between exhibitions, crafts, residencies, Jusoor, INBETWEEN, workshops, performances, and Tales of Fustat.
- **Nine explicitly editorial thematic connections** between different programme clusters in \`data/curatorial-threads.json\`; these never masquerade as factual person-to-person historical connections.
- Wander: free drag, wheel/pinch zoom and visible scale controls, touch/keyboard affordances, object focus and related-image navigation.
- Index: jump between moments, bilingual archive search, deep entry into source objects.
- Reading route: the chapter text and source images remain accessible without camera movement.
- Source/media build uses exact original extensions; cannot accidentally reinterpret PNGs as JPEGs.

## Run

\`\`\`sh
cd archive
npm run check
npm run dev
# http://localhost:4173
\`\`\`

Node >=22.12. Browser QA:

\`\`\`sh
cd archive
npm install --no-package-lock
npx playwright install chromium
npm run build
npm run test:browser
\`\`\`

Vercel: project \`darb-living-memory\`, root \`archive\`, framework Other, build \`npm run build\`, output \`dist\`, deployment protection enabled. Work proceeds in Draft PR #4. Do **not** merge into the institutional site or change its official domain.

## Source foundation

- \`data/media-catalog.json\` lists 77 records grounded in \`assets/visual-audit-77.csv\` and \`assets/manifest.csv\`.
- \`data/tales-of-fustat-001.json\` and \`src/graph.mjs\` preserve an evidence-linked Fustat micrograph and rights/publication guardrails.
- \`data/curatorial-threads.json\` is separate from source-level relationships; it provides **labelled comparisons** across projects.
- \`data/world-chapters.json\` is an editorial camera/story sequence, not proof of chronological event or collaboration.

## Creative quality still to be earned

This stage covers the breadth of the supplied PDF but **not a complete art historical archive** of Darb since 2008. More independently sourced work records and richer participant/creator context must be added as material becomes available. The spatial renderer is still DOM/CSS 2.5D; stronger purpose-built cinematography, artwork-level slow-looking interactions, material-specific motion, sound/video where recorded, device performance tuning, spatial accessibility, editorial QA, and curator review remain creative and engineering work.

Getty/Resn *Tracing Art* is a **standard for integration and craft**, never a visual interface to replicate. The user-provided Getty screen capture informed the move away from page sections into a continuous visual world. See \`VIDEO_REFERENCE_CREATIVE_REVIEW.md\` and \`QUALITY_GATE.md\`.

## Acceptance

- All 77 records and source file locations survive CI.
- 72 substantive objects render in the interactive field and 16 guided moments are internally consistent.
- Real pointer/camera, search, cross-programme links, bilingual state, media loading and mobile interaction pass browser QA.
- Aesthetic review and published-release requirements are **not** implied by passing automated checks.

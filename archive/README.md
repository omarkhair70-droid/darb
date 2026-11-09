# Darb Archive — The Living Memory

An **independent creative archive experience** for Darb 1718, not the institutional Darb website.

## Stage 02 — A continuous spatial experience

**The previous Stage 01 scroll-sections + sticky image panel + separate graph UI have been replaced**, after reviewing the user-supplied screen recording of Getty/Resn's *Tracing Art*. That recording shows meaningful differences in interaction: a continuous visual field, scale changes from a constellation of works to single artworks and back, type as part of scene choreography, and an optional chapter index that does not turn the site into conventional page navigation.

What is working in Stage 02:

- One **spatial world** populated with 18 image objects from the supplied Darb 1718 Overview 2026 (cover, craft, INBETWEEN, Jusoor, residency, Tales of Fustat, Something Else, performance).
- A guided journey with seven camera waypoints; scrolling interpolates the **camera through one coherent arrangement**, never showing ordinary stacked sections.
- An independently usable **Wander** mode: drag to pan the field, wheel to zoom, click individual authentic objects to inspect context and return to a narrative moment.
- Source-linked object labels and page-level references; original PDF media files only.
- AR/EN language switching, keyboard navigation, small-screen camera adaptation, and a fully readable no-spatial-motion route.
- An optional full-screen, seven-moment index.
- Build and automated evidence + source-media integrity tests.

## Run

```sh
cd archive
npm run check
npm run dev
# http://localhost:4173
```

Node >=22.12, no npm install necessary. Vercel project: `darb-living-memory`, root `archive`, build `npm run build`, output `dist`. Research previews stay protected with Vercel Authentication.

## Creative direction / what is still open

Stage 02 is a **genuine replacement of the interaction architecture**, not Getty-level final polish. Its camera is currently composed with browser DOM/CSS 2.5D, so it is a deliberately testable spatial foundation; not a claimed custom 3D WebGL production. Further work: inspect the actual result visually on desktop and phones, refactor source data into richer interconnected chapters and spatial relationships, improve timeline easings/scene typography, test real interactions and accessibility in browsers, and conduct performance and editorial review.

Getty is a standard for **integrated creative craft**, not copied choreography, image-sphere composition or visual assets. The supplied video is a reference for behavior and transitions; it has not been committed or reproduced.

## Important distinctions

The first five Tales of Fustat images/stories derive from page 11 of the institutional source. The wider 18-image archive constellation holds **different** Darb projects and doesn't assert that the displayed people and makers were collaborating on one project. Those other images are contextual doorways, not automatically historical cross-project links.

Code remains on Draft PR #4 until substantive visual and functional evaluation. The previously rejected institutional site is unchanged.

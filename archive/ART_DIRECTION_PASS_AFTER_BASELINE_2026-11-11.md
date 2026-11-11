# Darb Archive — Creative production pass after the protected baseline
**11 November 2026 · Branch:** `feature/darb-archive-next-art-direction-20261111`

## Decision and scope
This document is an execution plan for the **same Darb Archive / The Living Memory**, under `archive/`, following the merged PR #4 baseline (merge `9a5dd7c`, 64/64 browser checks passing). The currently published production archive is the technical rollback point, **not a finished artistic work**. This pass must not modify `site/`, the separate Next.js foundation, or the main branch. Neither a second archive nor a different concept is authorized.

**One artistic principle:** The content shapes the experience. Photographs, textiles, prints, bodies, voices, installation spaces and truthful relationships create the visual and temporal grammar; section cards, decorative hover effects, preset letter typography and scene resets are not an acceptable substitute.

## Sequence — polish before breadth
### Pass 01 · The opening is material, not a splash page
**Files:** `web/entrance-lab.mjs`, `web/threshold-world.mjs`, `src/cloth-dynamics.mjs`.
- Give the roll convincing *mass* and *contact*: edge thickness, fiber strands under raking light, believable tension, local wrinkle propagation, hanging weight and underside.
- The three eyes must come from different causes: stitch release, print/exposure, and camera-dependent absence. Match eye hit areas exactly with their projected visual centers.
- The “D” glimpsed in the three openings must emerge as a genuine transient composition, never a logo/path pasted above the canvas. Respect still-frame readability and reduced-motion.
- Preserve scroll, pull, pointer, touch, keyboard, skip and quiet paths; preserve the existing 3 anchored source IDs 39/41/42.
**Acceptance:** video evidence shows no painted-on holes, flat cloth, duplicated eye mechanics, unwanted overlay UI, mandatory menu, or unexplained green/empty transitional frame.

### Pass 02 · The continuous threshold into a source image
**Files:** `web/entrance-lab.mjs`, `web/threshold-world.mjs`, `web/app.mjs`.
- Frame-by-frame continuity: fiber pull → opening grows → image's actual light/detail becomes legible → same spatial world camera settles on the original media.
- Each aperture should lead to its corresponding existing real object, not a new page, forced detail drawer, or generic fade.
- Reversing and skipping must restore correct camera, input state and focus without a hard cut or stale hover state.
**Acceptance:** capture three transition frames for each of the three source entrances at wide desktop and narrow mobile, plus a reverse/skip clip.

### Pass 03 · Object encounters are authored around the material
**Files:** `web/app.mjs`, `web/styles.css`, `src/material-score.mjs`.
- **#39 documentary photograph:** preserve genuine photographic crop/proportions, orient visitors with group/space context, hold camera long enough to read image; text does not obscure faces or evidence.
- **#41 cyanotype:** optical/print treatment should feel unlike #39 without falsely changing the source image. Edges, pigment and substrate should be suggestions around the original print, not a blue Photoshop filter.
- **#42 notebooks/printed traces:** paper depth, paper stacking and readable object scale, with a distinct pause and return.
- Preserve the already-working `39 → 41 → 42 → back` relation; don't invent chronology or assert workshop participants created the works.
**Acceptance:** a viewer who has not read the code can tell material modes apart through the camera and physical framing, and can retreat without losing their place.

### Pass 04 · Camera choreography across all 16 guided moments
**Files:** `data/world-chapters.json`, `web/app.mjs`, `web/styles.css`.
- Audit every waypoint for framing, travel speed, breathing room, collision with captions, focal hierarchy, misleading overlaps, point-of-view and mobile crop.
- Test free explore ↔ Follow Story switching in the same world, no camera teleportation, no stale chapter state, correct memory of prior object and RTL/EN.
- Reduce repetitive transitions. Source and narrative meaning decide whether to pan, tilt, pull, pause or reveal.
**Acceptance:** contact sheet of all 16 settled desktop/mobile frames, motion clips across at least the opening → fustat, fustat → residency, voice → citadel and citadel → ending transitions.

### Pass 05 · D–A–R–B are discovered, not rendered text
**Files:** `src/identity-score.mjs`, `src/identity-relations.mjs`, `web/app.mjs`, `web/styles.css`.
- Preserve the genuine source graph and source distinctions: editorial comparison edges are never historical collaborations.
- Existing D/A/R/B graph lenses are *technical studies*, not recognized finished letterforms. Make each form legible from a carefully chosen viewpoint and then let it dissolve with camera motion. Do not rearrange archival photographs to fit an invented claim.
- Test independent visitor discovery order and an unobtrusive way back to the archive when a letter appears; no four compulsory chapter screens.
**Acceptance:** four unlabelled screenshots and short approach/retreat clips reviewed for recognition; if a form cannot be recognized without text, it stays IN DESIGN.

### Pass 06 · No Final Frame
**Files:** `web/app.mjs`, `web/styles.css`.
- The ending emerges from the *actual* visited route and source links; it's not a generic closing slate.
- Camera, ambient silence/sound, distance, color, decay and breathing space must feel earned after the preceding sequence. Backtrack and continue exploring must remain possible.
**Acceptance:** verify two visitors with different source routes see meaningfully different woven memory trails, with no forced restart.

### Pass 07 · Precision, device craft and performance
- Treat Arabic and English as deliberately typeset artworks, not just translated strings; fix alignment, pace, line breaks and semantic labels.
- Audit 320/375/390/430/768/1024/1440px and touch + mouse + keyboard, reduced motion; evaluate real iPhone Safari, Android and Firefox when available.
- Measure LCP, INP, CLS, image-decode budget and long-session memory; don't claim performance numbers without measured traces.
- Verify accessibility, touch target alignment, reading route, screen-reader content, deep-link/source recovery, and fail-soft behavior for missing media.
- Document image attribution and client editorial sign-off without treating current in-repo rights labels as a substitute for any missing individual credit.

## Build/review protocol for every pass
1. Change only the agreed slice on the post-merge feature branch.
2. Record **before vs after** desktop/mobile screenshots AND motion video for the actual visitor action; capture mid-transition, not just a settled still.
3. Review the result as an artwork. Explicitly name what still looks fake, generic, too static, too fast or too much like a conventional website.
4. Run `npm run check` and `npm run test:browser` from `archive/`; both must pass before requesting promotion.
5. Only after visual and functional approval is a small PR proposed. Merge to `main` and update the archive project only when that slice is acceptable.

## The first active slice
**Start with Pass 01 + 02 as one continuous encounter:** visitor pulls the actual cloth, chooses eye #39, the cloth and aperture transform into image-space, #39 settles without a hard jump, and the user can reverse/skip. The resulting composition — not a test assertion — determines the next iteration. Hold D–A–R–B and the ending until this sequence is visually convincing.

## Current truth
- **Working technical baseline:** the original 72 placed works, 17 clusters, 16 guided beats, AR/EN, archive compass, search, #39→#41→#42 route, reversible journey and route-sensitive memory ending; 64/64 desktop/mobile browser checks passed before merge.
- **Not aesthetically accepted:** fabric realism, eye→world continuity, individual material craftsmanship, identity legibility, ending direction and multi-device polish.
- **No rewrite from scratch, no merge with the other Vercel project, no replacement of the archived public baseline while experiments are underway.**

## Execution record — first material/source passage study
- **Branch PR:** [#5](https://github.com/omarkhair70-droid/darb/pull/5) remains Draft, separate from the published production baseline.
- `src/passage-geometry.mjs` and unit tests project a genuine photograph's on-screen rectangle relative to the selected textile eye. Cases include narrow phone, portrait phone and desktop, and fail-soft incomplete measurements.
- `web/entrance-lab.mjs` now carries the **original #39/#41/#42 source image** from the actual rendered aperture point toward its projected atlas frame. It also draws departure threads toward the same target instead of made-up screen coordinates.
- `web/styles.css` replaces the cropped/sepia full-viewport circle wipe with the source's native aspect and transform; the source photographs themselves are not recolored.
- `e2e/entrance-lab.spec.mjs` checks the selected source, eye/portal center and exact target frame. `e2e/entrance-capture.spec.mjs` requests intermediate arrival frames for visual critique.
- **User navigation note:** the `/` URL currently intentionally displays the earlier entrance on **all devices**. The new textile is at `/?entrance=v2`. This is not a mobile-specific failure; no default-route switch is authorized before visual acceptance.
- **Visual acceptance remains OPEN.** Even correct spatial registration does not establish physical cloth quality, motion pacing, letter recognition, or mobile art direction. Do not conflate passing CI with finishing this shot. The screenshots/videos need review, and any discovered aesthetic defect should be improved in this same branch before promoting.

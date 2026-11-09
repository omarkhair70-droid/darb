# Darb Archive — Creative Direction Review 04
## The object encounter must stop behaving like a website panel

**Date:** 2026-11-09  
**Scope of this review:** Interaction quality, not a new release or all-at-once rebuild.  
**Input:** User-provided Getty Tracing Art screen recording (64.53s, 3840×1778, inspected at 4-second intervals) and screenshot showing the current large floating black menu against a quiet field.

### The problem to fix first
Stage 03 established a continuous world with 72 visible source objects, 16 camera moments, thematic paths and search. However, selecting a source image still opens `aside#detail` with a conventional panel while the stage camera zooms. Opening the index still shows `div#index` with a conventional list. These are functioning shortcuts but **not the final interaction design**.

Do **not** redesign all sixteen chapters again. The next creative-development experiment is one **source-object encounter**, with a clear beginning, transformation, deep-inspection state and reversible exit.

### Getty video deconstruction — what matters
- **00–08:** A continuous visual environment. Typography does not read as an independent homepage section. Artworks exist around and behind the statement.
- **08–16:** Changing scale and visual context (a world of images becoming more specific). The story governs camera behavior, not an arbitrary scroll effect.
- **20–30:** Multiple artworks present in the same field, with one object acquiring attention while others remain as context.
- **32–48:** The composition becomes *artwork-specific*: different paintings get distinct background color, type placement and pacing. Not one reusable card template for every object.
- **48–54:** A single painting temporarily occupies nearly the entire scene; text and visual attention align around it.
- **56–60:** The archive resolves into a larger, dispersed constellation rather than a list of thumbnails.

Important: This is an analysis of visible **video behavior**. It is not proof of user-click transitions that the screen capture does not show. We must observe those separately in the live references.

### High-end live reference set
1. **Getty × Resn — Tracing Art:** https://www.getty.edu/tracingart/ — choreographed content, artwork-specific image scale and reading rhythm; see https://www.commarts.com/webpicks/tracing-art for implementation (GSAP/Lenis, custom three.js particles/spritesheets).
2. **Fabrique × Q42 — Oculi Mundi:** https://oculi-mundi.com/ — objects, immersive spatial collections, 3D globe-based navigation and actual maps/atlases. Independent dev study: https://www.q42.nl/en/work/oculimundi.
3. **British Museum × Google Arts & Culture — Museum of the World:** https://artsandculture.google.com/experiment/the-museum-of-the-world/zgGAGPpSNAynjg?hl=en — mapped relations through time/culture, with curator audio. Reference for data relationships, not for copying aesthetic.
4. **The Met × Atopia — Met in VR:** https://www.metmuseum.org/de/hubs/the-met-in-vr — archives, immersive 3D, video, sound and story. Reference for integrated, optional audio rather than decorative ambient loop.

### Next interaction: Archive Object Encounter 001
**Test asset:** Tales of Fustat cyanotype (#41), source PDF page 11; deliberately a material art object distinct from the people photograph (#39).

**A. Approach**
- The visitor picks an actual cyanotype image while orbiting the same archive.
- The current image does **not** open a drawer or take over a generic modal.
- Its existing world coordinates remain a stable anchor; the camera begins approaching it with an authored curve.

**B. Open / unbind**
- Nearby objects drift/blur/dim selectively, preserving a sense of where the chosen object came from.
- The cyanotype print unfolds into a carefully sized artwork plane with a surrounding field of material-blue light/color, not an artificially stretched image.
- Captions move with the object; typography waits until the composition has space to read.
- A click must become a *spatial transformation*, not "new page appears over old scene."

**C. Hold / inspect**
- The motion eases to a quiet, stable inspection mode. At no point should continuous decorative rotation prevent looking at the art.
- Actual texture and details are inspected only within the original file's effective resolution.
- The "source / practice / nearby threads" is offered as small connected anchors, not a full-height dark info panel.
- The selected object has a coherent AR/EN layout, not mirrored leftovers.

**D. Follow a thread**
- Select a connected, substantiated project/practice record or an explicitly labelled editorial comparison.
- If visitor follows another work, the first object recedes and the new object's composition assembles; do not close one modal just to open a second.
- Source context is inspectable, but never competes with the artwork.

**E. Retreat**
- Back/escape reverses the specific route, returning the camera to the *exact previous world position, scale and orientation*.
- Re-entry from another archival object must feel intentional, not a snap or loading screen.

### Rule: demonstrate two different artifacts before generalizing
After #41, prototype #39 (documentary group photograph). **The photograph should not use the cyanotype choreography**. It may favor faces/space/context, a different scale and a different sound material. If the same presets are used everywhere, the system is still a generic gallery with fancier transitions.

### A possible future opening — not approved
Investigate a **Memory Core**: a real spatial assembly of 72 original archival object-images. Rather than copying Getty's art sphere or claiming a world map, material emerges as loose concentric strata, and an observed connection turns the core into a followable spatial route. Test only after the object-encounter interaction is successful.

### Sound design hypothesis
- Sound responds to **attention and proximity**, not a constant decorative beat.
- Consider quiet paper/print tactile sounds for print detail, spatial sound for an installation, or location field recordings *when actually sourced*. Do not invent recorded voices or imply participants made noises captured outside the archive.
- Audio must be opt-in, easily muted and not block reading. Treat silence as an authored sound state.
- Sound should be prototyped with an explicitly identified source, not pasted onto all chapters.

### Current black circular menu screenshot
The shape itself is not automatically wrong; the video/reference also uses restrained floating controls. The issue is its **visual weight relative to the sparse surrounding field**, and what opening it does. The menu should eventually become a way to orient/reposition in the archive's world; it should not be a disruptive list overlay hiding the experience.

### Acceptance / sign-off for the next slice
- [ ] Clicking image #41 produces a source-anchored spatial transformation with **no standard card or right-hand detail drawer**.
- [ ] The work remains readable and can be inspected at its native aspect ratio.
- [ ] The full return is reversible with preserved camera state.
- [ ] One evidence-linked next object can be reached without route reset.
- [ ] AR/EN, desktop/mobile, keyboard, reduced-motion mode all work.
- [ ] At least one real recorded screen capture of the click/open/follow/back path is reviewed, with corrections to visual pacing and details.
- [ ] #39 has its own motion treatment; no generic global preset masquerading as art direction.

**Sequence rule:** perfect the encounter → design the archive entrance → design the chapter-specific motion/sound system → scale across 72 records. No batch-renovation masquerading as polish.

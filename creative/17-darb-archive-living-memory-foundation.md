# DAR​​B ARCHIVE — The Living Memory
## Independent interactive archive / Experience foundation 01
**Date:** 2026-11-09  
**Status:** Research hypothesis — not approved art direction or production frontend  
**Relationship:** A distinct cultural experience associated with the Darb institutional website; shared evidence/content infrastructure is possible, but public journeys and creative systems remain separate.

### Decision
Build Darb Archive first as an independent, deeply authored cultural experience inspired by the **craft standard**, not the visual surfaces, of Getty/Resn's Tracing Art. The institutional website remains a separate future product. The existing Darb website Stage 08/09 visual prototypes were rejected; neither their visual language nor their scene-based image viewer is the foundation of this work.

### Original narrative thesis
**A cultural place is made of relationships, not only walls or dates.**  
The archive follows evidence-backed connections among works, projects, artists, other contributors, communities, locations, and moments. It should reveal unexpected but documented paths, never fabricate a connection for motion.

Distinguish three kinds of connection:
1. **Documented**: directly supported by a supplied institutional record, public programme or source.
2. **Curated**: a clearly labeled interpretation with editorial attribution.
3. **Unknown**: an explicit gap, not an inferred story.

### Experience mechanic: The Thread / الخيط
An exploratory, nonlinear **thread** of real archival material. One image or work opens a documented project; the project opens its makers and collaborators; contributors and venues connect to further events. The visitor may follow, branch, retrace, and inspect original sources. This thread is not a literal copy of Getty's ribbon or a mandatory animated timeline.

**A representative journey (pending record confirmation):**
- Enter via one accurately captioned, credited archive object.
- Reveal its project and known date/place.
- Choose a **person / practice / place** connection backed by a source record.
- See two or more archival objects in their correct individual contexts, not as a fabricated photographic sequence.
- Open **evidence** for a claim or return to the object.
- End anywhere; make the discovery linkable and sharable.

A journey only becomes public when all essential nodes and edges can be substantiated and media cleared.

### Four distinct experience modes
- **Wander / تجوّل** — visually driven, low-instruction exploration of related objects.
- **Follow a Story / اتبع حكاية** — editorially authored sequences with citations.
- **Trace Connections / تتبّع العلاقات** — graph navigation with visible types and confidence.
- **Find / ابحث** — straightforward search by person/project/medium/year/place, still usable without animation.

These modes should feel like one cohesive system, not four disconnected websites.

### Source-material starting inventory
Existing repo: 21-page Darb 1718 Overview 2026, 77 extracted media objects, original media manifest and detailed first-pass visual audit. Use exact media IDs from `assets/visual-audit-77.csv` and `assets/manifest.csv`. Existing story studies: `creative/10-story-prototypes-on-paper.md` and `creative/11-visual-direction-test-lab.md`.

Initial candidate material threads, **not published claims**:
- *Between*: Fustat making, contemporary practice, encounters.
- *Made by Many*: credited collaboration and invisible labour.
- *What Then?*: curatorial questions, different artworks, continuity and change.
None is the final homepage, and no photograph's original project/date/participants may be assumed from visual resemblance alone.

### Data model / editorial accountability
Objects: `ArchiveObject`, `Artwork`, `Person`, `Project`, `Event`, `Place`, `MediaAsset`, `Source`, `Claim`, `Connection`, `StoryPath`.

Each `Connection`: from/to IDs, typed relationship, citation/source reference, exact claim, confidence, provenance notes, editorial status.
Each `MediaAsset`: exact file ID, creator/photographer, caption AR/EN, artwork credit, date/context, original resolution, rights scope, consent, sensitive visibility, editorial approval.
Each `StoryPath`: node order or branching map, authored transitions, source evidence, AR/EN copy, transcript/static equivalent.
Never make factual edges merely from image proximity, names, or visual similarity.

### Visual and motion principles (not a selected style)
- Real documentary material owns the composition, scale, sequence and texture.
- Preserve original artwork reproduction, legible credits and authentic colors.
- Motion explains a verified relation (reveal, follow, diverge, return), not a decorative screenshot effect.
- A dramatic opening must not become a compulsory splash screen.
- Study an interactive spatial scene **only** where it adds meaning compared with DOM/SVG/2D composition.
- Arabic and English receive equivalent authored typography/interaction, not mirrored afterthoughts.
- Keyboard, touch, screen readers, reduced motion, image loading and slow devices are first-class designs.
- On mobile, followable relationships and captions matter more than an identical desktop camera motion.

### Reference: mechanism, not replication
Getty Tracing Art combines researched artwork histories with legible interactive chapters and provenance connections, using approximately 400 images. The public Communication Arts case reports a 16-person team and 13-week production. This is a quality benchmark and capacity warning, **not** a schedule or image quota for Darb.

Sources:
- https://www.getty.edu/tracingart/
- https://www.commarts.com/project/38649/tracing-art
- https://www.khtt.net/en/page/14055/darb-1718
- https://english.ahram.org.eg/NewsContentP/50/506648/AlAhram-Weekly/A-fairy-tale-for-our-times.aspx

### Next proof: one complete documented relationship
Before frontend design, curate one **three-to-six node** path using exact existing source objects:
1. Find a named artwork or documented project in 2026 material.
2. Extract approved names, event, date, place and archival object IDs.
3. Confirm every connecting edge with citations; separate open questions.
4. Record minimum 2 original/high-resolution approved media assets.
5. Write a bilingual 60–90 second story and non-motion reading variant.
6. Storyboard transitions only after the relationship graph works without effects.
7. Review with Darb for curatorial truth and media permission.

**Acceptance:** A visitor can accurately recount the relationship among the selected artwork/project, person/practice and place, inspect evidence, and explore another substantiated connection. It must function on mobile and with motion disabled. A functioning image viewer, high Lighthouse scores alone, or flashy motion are not proof of success.

### Boundaries
No launch claim, no impersonation of Darb's official site, no public presentation of uncleared images, no assumption that the historical Fustat address is the current venue. Preserve existing frontend testbed and prior research unchanged. Any build must be on an isolated feature branch after the documented path meets editorial gates.

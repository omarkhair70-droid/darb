# DAR​​B ARCHIVE — Creative Production Quality Contract 001
**Benchmark:** Getty × Resn, *Tracing Art* — standard of content/interaction craft, not a design to clone.  
**Darb implementation status:** data+traversal research kernel; **no accepted visual direction or public experience**.

## What “Getty level” means, operationally
Getty's public case describes (1) three continuous curated chapters, (2) a persistent chapter-progress navigation, (3) ScrollTrigger choreography linked to scroll position + Lenis, (4) custom three.js scenes including a spritesheet-powered sphere, and (5) hundreds of individually sourced images. The achievement is that dense evidence becomes a meaningful, navigable story, not that those libraries were used.

Sources:
- https://www.commarts.com/webpicks/tracing-art
- https://www.commarts.com/project/38649/tracing-art
- https://www.getty.edu/tracingart/

**Do not:** reproduce Getty's sphere, ribbon, chapter structure, artwork placement, fonts or motion timings. Darb's interaction system must be authored around its own evidence.

## Six non-negotiable release gates
### 1. Cultural truth + authorship
- 100% of published people/works/projects/locations have citeable source IDs and attribution appropriate to their role.
- Every published media asset has rights status, original maker/photographer credit, context and consent status; missing information blocks publication.
- Never infer an artistic credit from a photo or claim the historic building is the current venue.
- Client/curatorial approval of AR and EN script. No copied reference-site writing or visual assets.

### 2. A visitor can actually follow a relationship
- From a source image, visitor can inspect project → practice/person/work/place via *verified* edges; reverse, branch and inspect provenance.
- The experience explains why each connection exists. A visual juxtaposition alone is not an historical claim.
- The visitor can enter from a deep link, keep context, backtrack, and share a specific authenticated-to-source discovery path.
- At least one authored journey and one free-exploration mode work against the **same** data graph.
- Explicit fail: click-to-fade image sequence, rotating gallery, or a set of effects unattached to content.

### 3. Motion is a language with editorial purpose
For **each major beat**, submit: source object → narrative purpose → visitor action → spatial/temporal transition → evidence reveal → mobile/reduced-motion equivalent.
- Scrolling and interaction are reversible and interruptible, never a compulsory movie.
- Avoid pinned scroll traps, involuntary horizontal wheel hijacks, no unrequested autoplay sound.
- Use GSAP/ScrollTrigger only after a motion storyboard. Use WebGL/Three.js only where its unique spatial contribution is demonstrated.
- Long sessions, rapid input, page restore and route changes must not leave animations or scene states desynchronized.
- Fail if a static screenshot explains everything the animated experience claims to do.

### 4. Real device craft and inclusive interaction
- Target WCAG 2.2 AA; keyboard navigation, visible focus, semantic reading route, meaningful image captions, usable zoom, screen reader and RTL/LTR.
- Prefers-reduced-motion disables spatial choreography but keeps all content and relationships available.
- Test at 320/375/390/430/768/1024/1440 px, touch + mouse + keyboard; mobile is intentionally composed, not a squashed desktop camera.
- Check low-memory Android, iPhone Safari, Chromium desktop, Firefox; resilience to WebGL missing/context loss.

### 5. Measured performance, not just attractive video
- Field CWV targets p75: LCP ≤2.5s; INP ≤200ms; CLS ≤0.1. Measure **actual** archive routes separately for mobile/desktop.
- Dev performance traces: no sustained catastrophic dropped frames, visible image flash, route memory leak or synchronous giant texture decode.
- Responsive images, prefetch within safe budget, defer offstage media, cap texture memory, remove idle WebGL resources.
- A media request failure yields a caption/source fallback. Progress state survives errors.
- QA must report real measurement methodology; do not assert numbers before running.

### 6. Maintainability and long-term archive life
- One canonical evidence graph and attribution model, with stable archival IDs, cross-linked sources and editorial status.
- Media can be replaced with better scans without breaking a story URL. Revisions preserve credit/provenance history.
- Real team workflow eventually required: add → cite → translate → rights review → preview → approve → publish/unpublish.
- Automated validation of sources, edge references, locale coverage, restricted media and routing; no public direct access to blocked assets.

## First experience proof / Tales of Fustat
**Input**: source PDF page 11, assets #39/40/41/42, documented photo walk/interviews/cyanotype/notebook outputs.

**Scene A — Arrive through evidence**: one sourced artefact anchors a scene. Context of *which project* remains visible. Visitors choose branch into activity, object, place or evidence; not an automatic slideshow.

**Scene B — A relationship becomes motion**: following a documented link transforms the spatial composition so the previous object has a legible relationship to the newly opened node. Motion direction maps to graph traversal and can reverse.

**Scene C — Inspect a material outcome**: correctly sourced print/notebook has enough breathing space for slow looking, zoom only at authentic resolution, and a substantive link back to the underlying practice.

**Scene D — Trace / free mode**: visitor branches into other verified nodes, with relationship names and source panel. Cannot infer one participant made the photographed object.

**Scene E — Quiet mode**: a complete, keyboard and no-motion document of exactly the same sources, context and choices.

Before building these visually, secure the missing specific artist/photographer credits, originals, participant consent and curatorial approval. Private technical experiments may use supplied in-repo assets with access controls but must remain visibly unapproved.

## Definition of “ready to show”
All: (a) content and rights reviewed, (b) at least one fully functioning 5-scene narrative with meaningful branches and source inspection, (c) independently designed art direction, (d) source-accurate AR/EN, (e) measured QA, and (f) actual curator/user feedback. A ready GitHub commit or deployed URL alone does not pass.

## Implementation order, from here
1. **Data kernel & schema tests** (started): first graph, traversal, rights/citation guardrails.
2. **Source/credit closure**: project team confirms assets and people; map 3–6 reliable object/maker/place relations.
3. **Behavioral interaction storyboard**: user inputs/states, visual causality, motion/fallbacks; commissioned review.
4. **Isolated creative-tech lab**: experiment with transition, spatial depth, text and image with real approved material.
5. **Integrated chapter build**: authored visual choreography *plus* interactive branching and reading route.
6. **Regression, performance, curatorial evaluation and iterative polish**, then larger archive migration.

**No fixed completion date or claim that one developer can match a 16-person Getty/Resn project in a weekend.**

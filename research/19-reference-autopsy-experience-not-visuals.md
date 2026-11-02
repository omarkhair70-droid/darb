# Stage 10 — Reference autopsy: what the great cultural websites actually do

**2 Nov 2026. Source-verified maker research; recommendations are hypotheses, not an approved Darb visual direction.** Stage 07 and Stage 09 interfaces are both explicitly rejected. We are not evaluating colors, hero layouts or screenshots.

## A. National Gallery × Q42 × Fabrique — Imaginarium (2025)

**Cultural task:** Browsing a painting is not the same as really looking. The National Gallery commissioned an experience inspired by *curator-led questions* on physical tours.

**Journey anatomy:** virtual Room 36 as threshold → a short orientation tutorial → free exploration OR guided path → approach a real digitised painting → inspect a genuine high-resolution image via Micrio → follow a curator-authored question flow → optionally watch a restrained animated interpretation, accepted only if it serves the art. Makers report 50+ digitised paintings, 30+ animated; published stack Three.js, R3F, React, Micrio, Sanity and Firebase.

**What's structurally essential:** trained curators' words, selected works, quality images and permission. The visitor is asked to interpret, not simply tap through pictures.

**Transfer to Darb:** optional authored looking prompts and scale/context exploration on a named, approved work. **Not transferable now:** dream room, AI movement, fake prompts or full zoom from small extracted PDF images.

**Maker evidence:** https://www.q42.nl/en/work/imaginarium-national-gallery ; https://imaginarium.nationalgallery.org.uk/imaginarium

## B. Getty × Resn — Tracing Art (2025)

**Cultural task:** provenance research is nuanced, incomplete and nonlinear; a database alone is not a meaningful encounter.

**Journey anatomy:** curator-written invitation → one of three substantive authored chapters → time/place/ownership/document evidence changes → continuous transitions grounded in content → vertical position indicator with expandable chapter list → deeper access to the provenance index. The maker reports about 400 source images, 16 production team members, 13 weeks from concept to launch. GSAP ScrollTrigger + Lenis support some scroll choreography; Three.js exists for particular artwork-sphere moments, not the entire website.

**What's structurally essential:** real documents, explicit relationship types and transitions corresponding to specific scholarly claims.

**Transfer to Darb:** links between real artists, events, works and places must be source-qualified. A motion moment ought to reveal a real change of context. **Not transferable:** generic scrollytelling where adjacent unrelated archive photos imply one continuous story.

**Maker evidence:** https://www.commarts.com/project/38649/tracing-art ; https://www.commarts.com/webpicks/tracing-art ; https://www.getty.edu/tracingart/

## C. Sunderland Collection × Fabrique × Q42 — Oculi Mundi (2022–23)

**Cultural task:** astonishing atlas/map artifacts should inspire wonder, while serious researchers must be able to find and compare precise records. Studio questioned the need for a conventional homepage or menu.

**Journey anatomy:** navigation as *gallery of spaces*, not default six-link marketing menu → exploratory spatial collection vs information-rich sortable Research representation → object and its related tours, glossary, biographies. Both modes use the same collection records.

**What the engineering postmortem teaches:** Q42 added Research late and encountered route/state inconsistency. The viewing mode ultimately lives in both React and a shareable URL. The team chose CSS transforms/perspective instead of baseline WebGL for native DOM accessibility and image quality, while noting expensive transforms and unusual UI still required careful performance and user testing.

**Transfer to Darb:** a connected expressive artwork encounter + exact searchable/operational index, designed together from day one; mode/deep-link/back retained. **Not transferable:** spatial cluster, weird cursor or CSS 3D merely because it looks award-winning.

**Maker evidence:** https://www.fabrique.com/cases/museums-and-heritage/oculi-mundi-the-eyes-of-the-world/ ; https://engineering.q42.nl/oculi-mundi/ ; https://oculi-mundi.com/

## D. KW Berlin × Correspondence × Systemantics (launched Oct 2025)

**Cultural task:** an institution needs continuity while its artists change and make new work.

**Journey/identity anatomy:** a *systematic* layer communicates venue/event/identity information; an *intuitive* layer is genuine, contributed notes and drawings by archives, public, staff and invited exhibition artists. KW reports nearly 1,000 such accumulated source marks, plus institution-specific custom KW Grotesk typeface created with Dinamo. The resulting visual identity extends across posters, signs, web and archive.

**What's structurally essential:** a real editorial/artist participation process and a historical source pool. Its “scribbles” are not a surface pattern generator.

**Transfer to Darb:** stable honest access, citations and identity orientation paired with artist-/exhibition-authored content and presentation controls. **Not transferable:** scribbles, custom font aesthetics or claiming artists contributed when they have not.

**Official source:** https://www.kw-berlin.de/en/info/scribbles ; live programming https://www.kw-berlin.de/en/exhibitions and archive https://www.kw-berlin.de/en/archive

## E. Clyfford Still Museum archive — Cooper's overlooked process lesson

The designer describes a three-day *content/IA/visual strategy workshop with museum staff* before translating approximately 95% of one artist's lifetime output into an archive. Darb's present code has just nine programme-level records, not a comparable artworks collection. An expressive archive cannot be invented without an actual corpus.

**Maker evidence:** https://cooper.digital/archive.html

---

## Comparison of transferable mechanisms — not libraries

| Mechanism | Required Darb source | Visitor behavior | Implementation option | Critical condition |
|---|---|---|---|---|
| Curator-guided looking | Named work, hi-res master, approved questions | Inspect, respond and re-see the same artwork | DOM + native transform, tiled viewer for genuine resolution | Artist/curator consent, no fake prompts |
| Evidence choreography | Work/person/exhibition/place/source relationships | Move with a reason and inspect provenance | Typed graph + optional GSAP per meaningful beat | Every public link grounded or explicitly editorial |
| Explore ↔ Research | Same vetted entity records | Switch approach without losing place, filter/share | Next.js URLs, state, server index | Never two disconnected websites |
| Artist-owned expression | Original show identity and authorized artist materials | Experience distinct media without losing access | Per-project templates and CMS permissions | Real contributor/credit and fallback |
| Staff editorial workflow | Authorized editor and source/rights fields | Publish/modify/open/close without developer | Sanity or selected institutional CMS | Real team workflow, not unconfigured Studio |

## Hypothesis about the Darb-specific *unit*
The commissioner-supplied 2026 Overview repeatedly joins **making, showing, listening, collaborating and gathering**. Darb need not make the artwork an isolated digital picture. A possible digital unit is a **verified encounter**: real work/process ↔ named contributor ↔ programme ↔ place/time ↔ evidence ↔ an optional live invitation. But this is an *experience grammar*, not a universal homepage element or a mandatory narrative.

## Explicitly unresolved before new UI
- Who at Darb curates individual work journeys and approves language/rights?
- Which original (not PDF-compressed) media, named works, texts or videos are available?
- Which live opportunities and venues are valid on 2 November 2026?
- What is the agreed institutional visual signature and the role of original exhibition identities?
- Which expressive interactions can be justified by content, and which need only ordinary HTML?

These questions are bounded production requirements, not an excuse to continue making generic moodboards. Next document: a whole-site navigation/encounter contract grounded in the available 2026 source.

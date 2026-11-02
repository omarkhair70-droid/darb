# STAGE 06 — Experience Systems Benchmark: From References to Architectural Decisions

**2 Nov 2026 | Research synthesis, not website implementation.** This dossier responds to the commissioner's correction: DO NOT design isolated exhibition pages or moodboard variants; establish the **whole editorial experience, content relations, information architecture, motion language, tool selection and delivery gates** before coding.

## Evidence types
- **Observed on live page:** accessible public copy/routes, not full browser instrumentation.
- **Maker-stated:** engineering/design studio's disclosed stack, process and decisions.
- **Proposal for Darb:** our inference, not a verified existing Darb feature.
- **Unknown:** unobserved internal source code, benchmark performance, CMS configuration or licensing agreements. Never pretend to have reverse-engineered sites that expose little HTML.

## Deep reference A — National Gallery Imaginarium (2025)
- Experience: https://imaginarium.nationalgallery.org.uk/imaginarium
- Independent project context: https://www.nationalgallery.org.uk/visiting/virtual-gallery/national-gallery-imaginarium
- Engineering: https://www.q42.nl/en/work/imaginarium-national-gallery
- Strategy: https://www.fabrique.com/cases/museums-and-heritage/imaginarium/
- **Goal:** slow looking; form an individual relationship with painting via guided questions devised by curators. **Not a normal museum site clone**.
- **Experience anatomy:** special-purpose entry → orientation / mini tutorial → unreal 3D museum-like room → select floating art → artwork detail and questions → guided viewing and optional AI-animated conclusion.
- **Published stack:** React, React Three Fiber, Three.js, Micrio, Sanity, Firebase; Q42 claims 50+ digitised works and 30+ animated ones, team includes Fabrique and 3D artist Malou Sandig.
- **Important decision:** 3D because a virtual museum-like experience *was itself the brief*; high-res zoom via Micrio; Sanity provides authored conversational experience. The team said AI animation was rejected when it did not enhance artwork story/integrity.
- **Transfer to Darb:** curated ways of noticing real source photographs/artwork, optional questions, image-examination modules; authoring schema for curator questions and annotated artworks.
- **Do NOT transfer:** constant floating virtual rooms, AI animation of artists' work without approval, full site as guided conversation, expensive 3D infrastructure simply because it's award winning.
- **Feasibility gate:** real artist-curator interpretation + high-resolution files + approved use rights + clear audience intent, otherwise ordinary artwork detail with editorial captions.

## Deep reference B — Getty / Tracing Art (2025)
- Live: https://www.getty.edu/tracingart/
- Maker interview with engineering details: https://www.commarts.com/project/38649/tracing-art
- **Goal:** translate incomplete/multistranded artwork provenance research into public understanding, not simplify historical gaps away.
- **Content:** Getty Provenance Index spans millions of records, but the narrative experience is *three authored chapters*: Tracing a Painting Through Time → Artists as Collectors → Collectors, Museums and the Market. Credits and artwork rights are prominent.
- **Experience anatomy:** editorial introduction → source object → timeline, entities, relationships → authored chapter sequence → direct route to provenance research index. Site is a **storytelling front door to a deeper database**, not a replacement for it.
- **Maker-reported stack:** GSAP ScrollTrigger; Lenis smooth scroll; three.js **only some sections** (artwork sphere using custom particles/spritesheets); 400 images; team of sixteen; thirteen weeks concept-to-launch.
- **Transfer to Darb:** authored story layers over a structured project/person/place/media graph; chapter index; direct archive/research view; meaningful media attribution; explicit source gaps.
- **Do NOT transfer:** an artwork sphere or “scroll = impact”; user's ability to find an event or artist must never depend on finishing a long scrollytelling journey.
- **Key new lesson:** at Getty content and story choreography were co-designed, with researcher involvement. We need a **single content/relationship spine before motion tooling**.

## Deep reference C — Oculi Mundi (2023)
- Live: https://oculi-mundi.com/
- Q42 case: https://www.q42.nl/en/work/oculimundi
- Engineering deep dive: https://engineering.q42.nl/oculi-mundi/
- **Goal:** explore historical maps, atlases, globes and people in a uniquely spatial way.
- **Maker-reported public stack:** Next.js, TypeScript, Tailwind, Sanity.
- **SURPRISING engineering decision:** despite 3D-like site, Q42 chose **CSS transforms/perspective instead of WebGL** for important interfaces: accessible real DOM and better images / low-end device performance.
- **Two modes:** Explore = spatial wandering; Research = conventional sortable data-rich collection. Q42 retrospectively warns that adding Research mode late caused routing/state inconsistency; solution made view-mode URL-visible alongside React context.
- **Published performance caution:** complex 3D/CSS collection “cluster” reportedly had an LCP of ~4 seconds in testing from too many eager images; even award-level sites pay perf costs.
- **Transfer to Darb:** design **Explore + Index/Research** simultaneously from a shared content model, deep-link both modes and persist in URL, not two disconnected websites; CSS 3D for artifacts if appropriate.
- **Do NOT transfer:** fake globe/cosmos, unusual cursors without usability testing, visual complexity with insufficient image resolution.

## Deep reference D — Rijksmuseum / Q42 + Fabrique (2020)
- Maker: https://www.q42.nl/en/work/rijks-website1
- **Strategy:** huge imagery + curated stories + audience journeys; searchable collection and event filtering; high-res Micrio zoom for supported works; accessible content and user testing with assistive technology.
- **Transfer:** quality of art viewing and utilitarian filtering are **co-equal systems**, not a product site plus a separate award microsite. Artworks must get captions and credit, AR/EN accessibility, not merely impressive crop.
- **Do NOT transfer:** visual styling and continuous collection scroll without Darb's own curated data.

## Reference E — Darb's real workflows
- Institution source material: supplied Darb 1718 Overview 2026, 21 pages, 77 PDF embedded objects (some are logos/graphics/plan fragments), now versioned in `source-material/original/` and `assets/original/`.
- First-party Linktree: https://linktr.ee/darb1718 displays pottery workshops, filmmaking submissions, internship open call, artist residency and hall rental application, as of this research snapshot. **A listing does not confirm a form is still accepting submissions.**
- **Key distinction:** Darb is an operating cultural organization with requests/actions, **not a museum image collection only**. Design system must carry live programmes, artists, practical services and living archive.

## The six principles supported by all comparisons
1. **Start with a cultural proposition, not a desired effect.** A technology solves a specific attention/navigation problem.
2. **Archive and edited stories are separate but linked**: structured source records drive artist/project history, curated sequences drive public imagination.
3. **Explore vs Index are first-class from day one**, share URLs/content/identity, avoid split-state surprises.
4. **Real cultural works retain authorship and integrity**: credits, rights, captions, full media, artist control; avoid decorative anonymization.
5. **Motion is semantic**: guide attention, expose relationship, change context, convey an actual making process, create a pause. No motion merely to show capability.
6. **Performance/accessible alternatives are core architecture**, not late polishing. CSS/HTML can be more immersive than default WebGL for many photo-led stories.

## Decision boundary
**Research now supports selecting a conditional architecture and baseline stack.** It does **not** support selecting a particular homepage animation, full 3D environment, exact approved visual identity, or verifying current visit hours and names. Those remain per-feature/artifact gates, not an excuse to avoid technical planning.

## Evidence/limitations
No developer access to either reference production source. Imaginarium's JavaScript-heavy experience offers limited text to crawlers; detailed interaction claims above come from the official National Gallery, Q42 and Fabrique accounts rather than an instrumented user test. No claim of a hands-on performance audit of all sites has been made. Commsarts and Q42 reports are published maker descriptions, not independent benchmarks.

# Stage 10 — DARB DIGITAL EXPERIENCE KERNEL
## Whole-site interaction & visitor journey contract — v0.3 / BEFORE UI DESIGN

**2026-11-02 — proposed for actual curatorial review, NOT approved visual art direction.** Direct response to complete rejection of the beige marketing homepage AND dark three-image viewer. The objective is to make original Darb activity a **native digital experience**, while preserving access to factual history and real participation.

### The one experience proposition to validate
**A Darb encounter is not just an image. It is an authored relation between practice, a work, people, time, place and participation.** The site should make this relation visible, navigable and felt through the medium of each actual work.

No mandatory homepage, three arbitrary buttons, virtual art gallery, scrolling template, universal visual theme or technology has been chosen. These are functional behaviors and validation rules.

## 1 / System topology — continuous, reversible, non-linear

A first-time visitor may arrive through the institution domain, an artist's shared work, an event or Google search. Each is a valid entry point, not a required sequence.

- **Threshold / orientation**: “Where have I arrived? What is real and happening? Where is the index?” Institutional mark, language, status and rights. If a *current* featured work is editorially approved, it can become the threshold itself. If not, present only verified institutional context and truthful public activity links. No generic giant slogan as filler.
- **Encounter / artwork or practice**: present the *actual medium*. One installation needs scale and position; a film needs timeline/credited director; a workshop process needs real source stages; writing needs author text and authorship. Do NOT create one rectangular photo for all.
- **Proximity / optional depth**: offer deeper inspection and genuine curator questions where available. Zoom only to known real resolution; audio never autoplay and always has transcript/captions. Visitor can return without losing place.
- **Context / claim and evidence**: what is this, by whom, when, why associated with Darb? Show title, roles, project, venue status and sources without swallowing the art.
- **Relation / connection**: move to confirmed artist / project / venue / another actual work. A separate “curatorial comparison” is labeled editorial, never masquerades as documented collaboration.
- **Invitation / action**: any **confirmed-open** workshop, event, residency or official contact relevant to this work, with deadline, live venue and actual link. If no current opportunity exists, don't invent one. Public programme and fast index remain available throughout.
- **Research mode**: an ordinary, keyboard-accessible search/filter index for all published entities. Same canonical record IDs and URLs as the exploratory experience, not a second database.

The structure is a **network**, not a slide deck. Moving from film → director → programme, or print → workshop → material research, is justified by the record. If a link is not supported, it doesn't appear as a fact.

## 2 / Mode and navigation behavior (acceptance contract)

| Situation | Must happen |
|---|---|
| Direct URL to an artwork, programme, person or event | Loads the source's own context immediately; no forced homepage animation |
| Visitor examines a work, then asks “who made it?” | A contextual relation opens, preserving the work and browser back path |
| Visitor changes from Experience to Index | Same source entity/selection remains available; mode/filters in URL |
| Visitor seeks a current film screening or workshop | One direct navigation route to verified date, venue, status and action |
| Visitor chooses Arabic or English | Same entity ID and relation, with independently authored RTL/LTR copy and caption layout |
| Visitor has reduced-motion, screen reader or low-end phone | Every fact, link, action and artwork caption remains reachable without animation or Canvas |
| Medium isn't cleared or high-res isn't available | Truthful text/citation and appropriately sized documentation; no fake work, generated zoom or invented artist |
| Event is historic or form is closed | Remains in archive with historical label, does not offer “book now” |
| Visitor wants to leave the experience | Predictable index, programme and identity contact remain available at all times |
| Artist withdraws permission / source is corrected | Editors can unpublish media, preserve source/audit and redirect or revise related links without a code deploy |

## 3 / Media-native experience grammar, not page templates

| Real material | Authored digital affordance | Necessary source packet | No-go |
|---|---|---|---|
| Spatial installation | Shift between real installation view, work detail and verified place/scale; meaningful camera movement only if actual spatial data exists | Work title/artist, installation images, camera/scale/venue facts, consent | Artificial 3D gallery or animation of unknown geometry |
| Ceramics, textiles, photography process | Explore *documented* making stages and material changes; put maker and context next to each operation | Sourced before/after/process originals, persons and timestamps, photographer | Invent a transformation from unrelated photos |
| Film and sound/performance | Work with real time: film title/director, optional licensed excerpt, mute/caption/transcript, screening history and conversation context | Clip/still license, film metadata, transcript and credits | Photo slideshow masquerading as a film |
| Artwork print / publication / poster | Keep the original entire artwork identity intact; optional high-res detail only with master and permission; accessible text outside image | Designer/artist, original files and rights, accompanying HTML data | Replacing the poster with house font/card |
| Writing/community workshop | Let approved texts and participant-curated excerpts drive the interface; privacy and consent own the reveal | Signed participant/author approval, text versions and translation | Generated quotes/participant personal details |
| History / venue shift | Link proven chronology and places; clearly indicate formerly operating spaces | Source date, old/current status, permission and fact-check | Ruins animation or implying 2024 images depict an unverified new venue |

## 4 / Typified content graph and source gate

Candidate entities:
institution; project/exhibition; artwork; person; contribution role; media/source object; venue; screening/event occurrence; opportunity; curatorial statement; encounter/story; evidence source.

Required relationship semantics, not generic “related”:
- PERSON — directed — FILM (role=director, with source)
- FILM — screened_in — PROGRAMME (if specifically documented)
- PERSON — curated — EXHIBITION (role must be sourced)
- ARTWORK — shown_at — EVENT/PLACE (needs proof)
- PROJECT — occurred_at — VENUE (time-bound, not current by default)
- MEDIA — documents — WORK/PROJECT (document doesn't automatically identify artist)
- STORY — compares_with — PROJECT (editorial relation, **not factual shared participant**)
- EVENT — registration_at — URL (only verified open state)

Each edge: canonical IDs, evidence citation/page, exact attributable role, confidence/state [documented / editorial hypothesis / unresolved], date, editorial owner and review status. Display ONLY documented factual edges as direct public relationships; editorial comparisons must be visibly marked. Unknowns stay gaps rather than becoming fictional people.

CMS publication gate: draft source → curate → rights/consent and credited people review → AR/EN authoring → editorial signoff → preview → publish → verified expiry/archiving → corrections. This is **not yet configured in production Sanity**.

## 5 / Design system at behavior-level (appearance intentionally open)

**Stable institution duty:** identity, provenance, date, current status, Arabic/English, orientation, search/index, consent, accessibility, usable actions.

**Variable artist/work authorship:** actual original exhibition graphic, installation layout/documentary sequencing, film timing, artist-curated annotations, audio/graphics where licensed. Not just one palette swapped on the same HTML component; the expressive instrument varies by medium.

**Graphic form study that MUST happen before CSS choice:** collect the real Darb circular mark/master, original 2022 Aouda poster, 2024 (A)Part graphics, Something Else 2026 graphics and current show identity masters; record designers, Arabic/Latin type behavior, composition and how they live on print/digital. One identity does not automatically become the institution-wide interface.

**Motion:** declare for every effect WHAT factual/curatorial event changes, WHY it must move, whether scroll/click/sound serves it, and HOW to read the same content without it. GSAP and Three.js remain legitimate, optional instruments. No default effect palette.

## 6 / Full visitor routes — test the entire site, not an individual frame

### Route F — film through a real programme

**Evidence:** 2026 overview p.9 identifies the Jusoor film programme, Sudanese shorts, including *Dukhan* (director Mohamed Subahi), *Braids of Identity* (Hafsa Baraei), *The Last Henna* (Mohannad Bilal) and *Motive* (Alargam Muzmail); also filmmaker discussions and an Iranian film collaboration with Left Bank Cinema Collective.

**Possible first authored encounter:** a *specific film* title + credited director + real publicly provided synopsis/frame when licensed, not a marketing photo of an audience. User can inspect the film's identity, move to the Jusoor programme/screening record, see *other separately credited films that participated*, and—only where documented—read an artist/curator's remarks. The visitor can then check **present film-related opportunities** through a verified call; the 2026 Linktree listing of short-film submission is not proof it remains open.

**Supported now:** project, named films/directors, general programme format, historical context and source page. **Missing:** film title translations sanctioned by director, licensed poster/still/trailer, screening occurrence dates, actual artist statements, live call status. Until acquired, serve an honest archival document and a complete research route, **not** an invented cinematic experience.

### Route P — real material/process inquiry

**Evidence:** PDF p.10 describes Natalia Ossef's textile residency research across Ramses Wissa Wassef Centre, khayameya around Bab Zuweila and Tunis Village in Fayoum, with open studio; PDF p.11 documents Tales of Fustat photo-walk, cyanotype printing and hand-made books.

**Possible authored encounters:** a residency/process segment showing verified textile craft documentation; another distinct cyanotype segment using the actual notebook/print files and properly credited makers. The two investigations can be linked by an explicitly **editorial thematic connection** about materials, NOT by claiming same people, workshops, artifacts or causal order.

**Supported now:** the two separate project formats, Natalia's artist name, described sites, image pointers and PDF page numbers. **Missing:** original photo sets, identities and permission of craft participants, exact process timings, hi-res cyanotypes and captions.

### Route Q — question in its historically correct context

**Evidence:** overview pp.17–18 records *Something Else* Nov–Dec 2023 at Cairo Citadel, 22 curators, 171 artists, 42 countries; chief curator Simon Njami, artistic director Moataz Nasr and curatorial prompt *What Then?*; pp.15–16 document 2025 symposium and other editions, with some published edition-number discrepancies.

**Possible authored encounter:** open the actual 2023 curatorial prompt, inspect a *properly credited selected work* once obtained, then its author, the 2023 event, the Citadel site and subsequently later independent Darb activities. The 2024 demolition appears only as a distinct, sourced institutional event if relevant, not a cinematic bridge inventing continuity.

**Supported now:** event metadata/curatorial theme, people in named roles, dates, location, institution-level photos. **Missing:** artwork-by-artwork artist titles, permissions, installation map, original hi-res photography and approved linking narration.

## 7 / Operational and public safety invariants

- 2024 main-building demolition is documented; the exact current public visitor venue/hour/status on 2 Nov 2026 is *not* established by old directory addresses or the p.21 architectural plan.
- The public Darb Linktree displays workshop, residency and submission forms; listing ≠ open registration. Only publish approved current status.
- UNSPOKEN p.5 and public notice identify curator Salma Hegazi and collaborator Shady Ghaly, with Sept 12–25, 2026 dates; artworks generated through art-therapy sessions demand special artist/participant consent, not inference about private health details.
- Original source object xrefs in the 2026 PDF are *documentation*, not proof of full work authorship. 77 embedded objects ≠ 77 catalogued artworks.
- Narratives must never mis-caption the p.17 Citadel installation images as the former Darb building or a 2024 demolition scene.

## 8 / Minimum acceptance before replacing rejected UI

1. A *complete* connected journey (artwork/process → credited person → project/event → context/source → optional valid current action) with explicit missing steps and no unsourced edges.
2. Genuine artwork master, not PDF preview, supporting the chosen interaction and full credit/rights packet.
3. Both expressive and research/fast-use modes use identical canonical IDs, save URLs/back and work in AR/EN.
4. Art can remain distinct between at least three media types; site isn't another three-step image carousel or recurring card grid.
5. Editor can publish or withdraw an artist's content; all claims provenance checked; no fake event/open venue.
6. Concept and motion review with Darb, then implement in **real Next.js branch**, test mobile and accessibility, use Git-linked Vercel Preview and request real creative review. CI green is not art-direction approval.

**Next:** Stage 10 evidence packets: select F/P/Q reference route, list exact public fields that can be used now, required artists' media/credits and conditions for upgrading it into a true encounter. Do not start another homepage or 3-image viewer.

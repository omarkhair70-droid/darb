# DAR B 1718 — Whole-site Experience & Content Architecture v1 (pre-build)

**2 November 2026 | DECISION PROPOSAL; NO UI BUILD.** This specifies the **whole website**, not a page-by-page design exercise. It translates benchmark research and the commissioner's source assets into one coherent system. No particular home hero, poster treatment, font, animation or 3D artwork is approved yet.

## Product thesis
**Darb is a living cultural practice whose artists, people, materials and spaces can be experienced as connected stories — while a visitor can always participate in its real programmes.**

Two concurrent promises:
- **Experience / اكتشف:** first-person editorial discovery; cross-link people, contemporary art, craft, place, memory, live performance, residencies and experimental work.
- **Access / اعرف وشارك:** frictionless What’s On, workshops, applications, residency, place/visit, contact, public credit/archive.

This is **not** an Explore website separate from the real institution: both are modes of reading the *same structured source*.

## Experience map: three layers, not two competing homepages
**A. Institutional shell — always there**
- Darb logo/identity anchor, AR/EN, primary nav, What's On access, search, contact/visit if location verified, accessibility support, image credits.
- A low-motion accessible page still communicates the full work.

**B. Curated experience layer — opt-in authored journeys**
- Editorial sequences that unfold from an actual image, event or artwork.
- Connections can be followed nonlinearly; show context (what piece, creator, date, why link).
- Semantic transitions: attention / relation / change of place / process / quiet.
- An authored 3–7 beat experience may be attached to a project, person or cross-theme; NOT global required onboarding.

**C. Indexed evidence layer — searchable archive**
- Filterable projects, artwork, people, events, date, practices, place.
- Research-grade citations/attributions, artist IDs, dates, full context, original images where allowed.
- Same entity URL in both modes; switch representation with shareable URL state when needed (e.g. `?view=explore` vs `?view=index`), based on Oculi Mundi engineering experience.

## Navigation hypothesis to validate against real Darb staff tasks
**Main identity/top navigation (AR equivalents editorially authored):**
1. **What's On** — current and upcoming public events/activities, calendar, event detail, verified date/time/venue/status/registration.
2. **Explore** — exhibitions, programmes, editorial stories and project collection; enter by question, art, people or place.
3. **Archive** — searchable/filtered past exhibitions, film, residencies, workshops, artists, works, chronology.
4. **Participate** — verified open calls, pottery, film submissions, residency, collaboration, venue rental (only services actually confirmed).
5. **About Darb** — institution identity, grounded history, timeline, people/workers and the Fustat context.
6. **Visit / Contact** — exact current address, venues and opening/registration rules **only after confirmed**; otherwise clear organisational contact and event-specific location.

**Utility/secondary:** search, AR/EN switch, accessibility/reduced motion, press/resources if approved. Do not add generic e-commerce, donations or ticketing without brief.

## First-screen requirement, without dictating visual design
- **Within first encounter** answer: What is Darb today? How to see current activity? How to enter an authored experience?
- Avoid mandatory loading video, 3D portal or global scroll lock.
- Distinct editorial image/title may act as an experience doorway, but the date/venue of genuine current event cannot be lost.
- If no real current event is verified, don't invent 'Now'; show openly that the programme calendar is awaiting publication and use verified opportunities/contact.

## Proposed page families and behaviors (information, not style)
| Family | Required data | Experience possibility | Must remain accessible |
|---|---|---|---|
| Home / index | institutional position, verified featured programmes, links to Explore/Now | authored editorial opening | navigation, event, contact immediately |
| What's On | event calendar, status, venue, CTA, filters | restrained previews | direct list/search/sort |
| Project / Exhibition | title, artists, curators, dates/locations, materials, media and credits | special visual identity & story chapter | facts, full images and captions, related archive |
| Story | authorship and evidence, scene list, linked entities | scroll/interaction choreography | full static readable version, skip |
| Archive | year/type/discipline/person/place fields and relationships | optional exploratory graphical pattern | complete index, URL state, sorting |
| Person / Contribution | verified public identity/role, participation edges and approved biography | relation navigation | credits; no fabricated personal backstory |
| Artwork / Media | provenance, artist/photographer, caption, dimensions when relevant | inspect/deep zoom IF hires | original image and accessible caption |
| Participate / Opportunity | eligibility, open/closed, deadline and working form | little/no movement | clarity of status and accessibility |
| About / History | sources, years, locations, institution roles | editorial timeline | citations, chronology, no romanticized fiction |
| Visit / Contact | approved current venue, access, hours and enquiry | map only if current verified | direct address and contact, never historic address as live |

## Content ontology (source of truth)
Structured types:
- `institution`: mark, verified identity, public channels, policy.
- `project`: exhibition, film series, symposium, residency and associated disciplines; title AR/EN; dates; source references; per-project visual identity.
- `event`: instance of live screening/workshop/opening, datetime with zone, venue, online URL, sold out/cancelled/completed status, RSVP.
- `person`: publicly approved artist/curator/craftsperson/organizer identity, credited contribution type; no implied role based on image.
- `artwork`: title, makers, year/media if known, linked project, source, display permissions.
- `media`: original asset, photographer, source_page/xref, crop policies, author/rights/consent, alt AR/EN, focal point, video/audio transcript.
- `place`: historical/current flag, venue access, geo/address, event-specific site, verified_at.
- `story`: authored theme and beats with links to entities, evidence, source dates, accepted images, editorial publication status.
- `opportunity`: call type, dates, eligibility, form URL, owner and status.
- `source`: URL/file, publication date, claim version, contributor and confidence.
- `relationship`: named types of contribution, project-person, work-artist, event-place, project-work; only verified edges.

**Publish rule:** No source or credit? Keep item in draft/internal archive until editorial policy decides what can safely be shown; do not create a made-up display caption. Some historical projects may have explicitly `unknown artist` metadata but require a real editorial decision.

## Artwork/provenance integrity
- Original is preserved separately. Cropping may be authored only for photographic framing; art must have full uncropped detail view.
- Album artwork/posters retain specific show identity as **guest visual skin**. The host navigation, information and caption language remains stable.
- Stories are not created from arbitrary adjacent photos: chronology and semantic links must be sourced, not suggested by montage.
- **UNSPOKEN** and other sensitive programmes: no patient diagnosis/identity inference, appropriate rights/consent workflow.
- 2024 demolition history is sourced independently; no supplied 77-image object automatically proves demolition.

## Content-to-interaction example: three separate story paths
**Making:** #7 craft scene → credited person/practice → #39/40 Tales of Fustat discussion → #41/42 cyanotype artifact → relevant project and future workshop if actually current.

**Gathering:** #31 Jusoor screening discussion → named films/directors → other film series / public opportunity → direct submission if confirmed open.

**What Then?:** #58 Something Else at Citadel → #62 installation and confirmed artist → curatorial 2023 story → related later Darb project → source/history; **do not** misidentify venue or imply the images show 2024 demolition.

The paths are **editorial experiments needing labels/credits**, not pre-approved final site sections, and not a permanent division into three branded versions.

## Bilingual design contract
- URL: `/[locale]/...`, AR and EN peer routes with canonical + hreflang when both published.
- `lang`, `dir`, fonts, line wrapping, mixed Arabic/Latin artist names and punctuation tested with actual 2026 text.
- Content translation is authored, not machine-traced line by line; dates/venues/status stored structurally once.
- No assumption Arabic and English headlines require identical line breaks or typographic treatment.
- If one language story isn't ready, implement explicit unavailable/preview policy rather than silently showing unmarked English.
- Accessibility: keyboard, focus, alt text, captions/transcripts and motion preferences from day one.

## Content operations
Create → identify event/artist and rights → AR/EN authoring → review source → preview → approve → publish → archive automatically when end date passes (without deleting historical content). Current programme state must be time-aware and externally verifiable.

**Editorial roles** (not staff appointments): admin, editor, curator reviewer, translator, rights reviewer. Team can combine roles; permissions and approval responsibility require actual owners.

## Architecture acceptance gate
A new visitor can understand Darb and find the next *verified* event or programme without traversing a cinematic story. An artist can trace one work to the proper curator and event. A researcher can find the same entity through index view. An editor can publish/correct a bilingual event and its credits without modifying code. No historic venue is represented as currently open.

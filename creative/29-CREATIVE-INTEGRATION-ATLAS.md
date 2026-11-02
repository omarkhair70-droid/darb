# Darb 1718 — CREATIVE INTEGRATION ATLAS
## Everything built so far, what it taught us, what we keep and how it becomes ONE site

**Date:** 2 November 2026. **Owner:** Darb 1718 Creative R&D. **State:** consolidated inventory and next-production contract, NOT a selected identity or artistic sign-off.

**Client decision:** "نجمع اللي اتعمل أيًّا كان" — keep all useful work, including rejected approaches and their lessons. Do not mistakenly merge three laboratory UIs into one page or treat “CI green” as visual approval.

## 0. Where we stand, without pretending a finished site exists

- Repository: [omarkhair70-droid/darb](https://github.com/omarkhair70-droid/darb), feature branch \`feature/darb-site-foundation-20261102\`, [Draft PR #2](https://github.com/omarkhair70-droid/darb/pull/2) openly marked **DESIGN REJECTED**.
- Existing site is a real bilingual Next.js application, with documented archive/project/film/person navigation and protected Git-linked Vercel Previews. **Homepage experience is client-rejected** (both marketing hero and later three-image viewer). Do NOT claim production launch or an approved site-wide visual identity.
- The three independent reference studies are **functioning research prototypes**, not a new Darb homepage.
- Last independently recorded full browser QA at this inventory: [52/52 passed](https://github.com/omarkhair70-droid/darb/actions/runs/41455145294) for Stage 14 code; the newest feature-branch docs-only commit had Vercel state READY at inspection. The QA result is a historical run, not a blanket guarantee for future commits.
- **Do not destroy or duplicate** previous work: this atlas references existing exact paths. Create one review index, and then integrate verified mechanics selectively into the same application, under editorial constraints.

## 1. Actual assets and evidence retained

| Asset | Source of truth | Established | Limitation |
|---|---|---|---|
| Institutional 2026 overview | \`source-material/original/Darb_1718_Overview_2026.pdf\`, 21 pages; parsed text \`source-material/overview-2026.md\` | Institution-level history, exhibitions, activity programmes, images | Not a licensed individual-artwork catalogue or approved current venue |
| Original media object set | \`assets/original/\` 77 extracted PDF objects; \`assets/manifest-original.json\`, \`assets/visual-audit-77.csv\` and QA | Real specific media fragments, original pixel sizes, page/source context | 77 images **do not mean 77 attributed artworks** or high-res art masters |
| Current legacy/prior-stage research | \`creative/00–16...\`, \`research/06...\`, \`research/19...\`, \`architecture/...\` | Research briefs, reference-site mechanisms, historical fact checking, source quality, identity archaeology | Hypotheses, not designer approval; old visual directions explicitly not brand standards |
| Film and makers graph | \`site/src/content/artworks.json\`, \`people.json\`, \`evidence.json\`, \`site/src/lib/work-graph.ts\` | 4 named Jusoor film records with credited makers and source links; one publisher-controlled full-film YouTube embed | Other films do not have verified playback; film reuse, thumbnail and director-curated prompts require rights |
| Programme archive | \`site/src/content/records.json\`, \`reading-paths.json\`, \`site/src/lib/sanity-source.ts\` | Nine historical programme seed records, AR/EN retrieval, editorial paths, source-level provenance | Not a complete current events calendar and not a work-by-work catalogue |
| CMS/engineering | \`site/src/sanity/schema-types.ts\`, \`site/package.json\`, \`.github/workflows/darb-site-checks.yml\` | Next.js 16, React/TS, Sanity schemas, GSAP, Playwright, Git→Vercel | Institutional CMS publishing/roles/rights approval **not activated**; tech passed != design accepted |

## 2. The three reference labs — inventory, strengths, failure modes, transfer

| Laboratory | Reconstructed mechanism (in our code) | What is reusable | NOT reusable as-is | URLs |
|---|---|---|---|---|
| **01 Oculi Mundi method** | CSS 3D space; seven real Darb PDF documents in perspective; pointer/wheel/keyboard selecting relative positions; same IDs/URL across Explore vs Research | Semantic DOM-based spatial navigation, camera-relative positioning, deep-link state, accessible research fallback, real source labels | Dark themed field, arbitrary 7-photo floating gallery and invented “Darb aesthetic”; no evidence original Q42 easing/size copied | \`/[lang]/lab/oculi-method\`; \`site/src/components/oculi-method-lab.tsx\`; \`research/26-visual-motion-typography-reference-labs.md\` |
| **02 Getty / Tracing Art method** | Source-evidence-linked SVG path; GSAP ScrollTrigger changes element hierarchy/focus; 4 semantic sections and fragment navigation | Relation-aware motion, source-linked progress, meaningful focus/scale, bounded navigation; AR-specific composition fix | Our paper/serif/palette, arbitrary “Getty look” or four typographic stand-ins as final art; no Getty source code or images | \`/[lang]/lab/getty-method\`; \`site/src/components/getty-method-lab.tsx\`; \`research/27-getty-resn-scroll-typography-motion-lab.md\` |
| **03 Imaginarium method** | Abstract approach threshold → guided/free observation → original 1920×1080 documentation image with max 160% user zoom → two-source context | Scene-to-inspection transition, visitor agency, bounded actual pixels, question/provenance layer, reduced motion and keyboard | **Threshold still resembles rejected image+headline split**, experimental generic observation prompts are NOT written by Darb curator; no true deep zoom or individual artwork provenance | \`/[lang]/lab/imaginarium-method\`; \`site/src/components/imaginarium-method-lab.tsx\`; \`research/28-imaginarium-visual-slow-looking-lab.md\` |

**Independent historical outcome:** Oculi lab passed 36/36 in run [41448282570](https://github.com/omarkhair70-droid/darb/actions/runs/41448282570); Getty lab passed 44/44 in [41452681098](https://github.com/omarkhair70-droid/darb/actions/runs/41452681098); Imaginarium passed 52/52 in [41455145294](https://github.com/omarkhair70-droid/darb/actions/runs/41455145294). These are cumulative suite counts, **not** artistic quality scores or independent live performance benchmarks.

## 3. Preserve rejected work *as evidence*, not as visual defaults

| Old code or proposal | Why rejected | Keep | Do NOT do |
|---|---|---|---|
| V1 marketing hero / two-column artwork | Looked like unrelated previous Fokhara/portfolio, oversized headline/rectangular image, same house palette and generic navigation | Working routes, 9 project records, responsive/test harness, source QA | Change beige to black and call it new Art Direction |
| Stage 09 dark “encounter stage” 3-image viewer | Three images with a short GSAP fade do not constitute an authored cultural website | Provenance handling, complete-image display, keyboard and source-link tests | Import it as the public hero or rename it a gallery |
| Explore reading-paths as sequential cards | Editorial connection exists but staged project photos can read as another slider/portfolio component | Typed paths, URLs, relation semantics and archive link | Present the same carousel across every project |
| Imaginarium lab threshold | Technically conveys approach but still image beside huge text | Free/guided close looking and source-context ideas | Promote threshold layout to homepage |
| Repeated stylistic instructions from any earlier project | Method is reusable; one project's typography/colors/shape is NOT universal preference | Research/QA/critical review/production workflow | Inherit design from portfolio, Tuscanini, Fokhara or prior Darb prototypes |

## 4. Integration is a grammar of **actions**, not a composite theme

One institutional system must support both **discovering/experiencing** AND **finding/publishing accurately**. The coherent design happens by composing **one meaningful visitor journey**, where different medium-specific mechanics have a reason:

\`\`\`text
Verified cultural object / work / practice
              ↓ encounter in its actual medium
(Optional authored attention: look, listen, examine)
              ↓ context appears at a meaningful action
Named maker / curator / contribution (source, credit)
              ↓ documented link with an accessible transition
Exhibition / programme / historical place and date
              ↓ cite, continue, cross-index or leave
Research index  ←→  experience in the same canonical entity
              ↓ only if Darb confirms a live opportunity
Confirmed activity / participation / valid venue
\`\`\`

### Example: the most sourced real vertical thread right now
**Braids of Identity / جدائل الهوية**:
- Full film is *publicly available through the original publisher's YouTube player*, not owned/rehosted by Darb.
- Directed/researched by Hafsa Borai; documentary subject/context from SSLH Museum and filmmaker-attributed Africa Foto Fair statement.
- Included in **Jusoor** according to Darb's 2026 PDF p.9. Exact Darb screening date/venue **unknown**, so do NOT present attendance details or live tickets.
- Film / person / programme / source routes are already working. The Getty lab links the **same actual entities**, demonstrating **verified relation and rhythm**.
- Imaginarium-style directed attention could be used **ONLY** after filmmaker-selected scenes/timecodes and permission, not by imposing generic text on the movie.
- Oculi-style spatial navigation is useful **only** for a verified spatial exhibition/corpus, not automatically in this film journey.
- Static/index paths and AR/EN must be equally good; the project is not one giant interactive object.

### Why integrating all labs literally would fail
Spatial floating pictures + curving scroll river + dream-room portal + giant serif + dark/blue/beige themes would be an incoherent visual theme park. Design decisions are made at **medium / purpose / data / permission** level, then unified by intentional institutional wayfinding, not by copying each benchmark's skin.

## 5. Actual prospective design system (questions and production work)

**Fixed institutional function, visuals intentionally unresolved:**
- Authenticated Darb logo/vector, actual institutional contact/venue, readable AR/EN structure, accessibility, credit/source line, search, event/live status.
- Purpose-built medium surfaces: film, spatial installation, craft/process, exhibition-original identity, artist statement, and archive.
- Type specimen work for Egyptian Arabic/Latin: font sourcing and license, glyph shapes, proportion, weight, title/credit/microdata at mobile and desktop; the temporary Georgia/Arial/monospace lab typography is *not* a Darb type system.
- Motion grammar to art-direct from actual content: threshold/proximity, trace/relationship, attention/quiet, scene transition, action/withdrawal. Each defines start/change/end/reduced-motion/source evidence, not decorative GSAP defaults.
- Original source images may be small; no fake hi-res, fake artists, old venue as current, forced history narrative, unlicensed clips or unapproved AI animation.

**Decisions blocked by genuine missing inputs:** official mark master and graphic files; one rights-cleared installation, one original process image series, and a filmmaker-approved audiovisual segment with accurate captions; Darb current public calendar/visit and owners of curatorial/CMS approval.

## 6. Execution cut: what we do *next*, in order

### Integration 01 — one reviewable source-of-truth atlas (DONE IN THIS DOCUMENT)
- Link all references/labs/creative decisions without copying or deleting original paths; store ownership/status + rejection reasons. Keep Git/Vercel automation.
- Internal review route \`/[lang]/lab\` is a convenient click-through **instrument panel**, not public Darb visual identity.

### Integration 02 — score and critique *the creative result*
- For each lab review screenshots and actual user actions: real cultural value, uniqueness vs reference vs derivative, typography/AR coherence, motion meaning, mobile readability, accessibility, content integrity.
- Classify **keep engine**, **redesign surface**, **reserve pending source** or **reject**. **Do not** let CI substitute for this critique.

### Integration 03 — design ONE continuous prototype across REAL public site responsibilities
- Select a rights-supported medium and a credible author. Map real work/person/exhibition/document/venue/action; fill sourcing gaps rather than interpolating imaginary content.
- Propose and test *one* institutional signature plus artist-owned surface in genuine AR/EN typography. Test interaction and static/index access simultaneously.
- Implement in actual \`site/\` route system, not a fourth lab. Use GSAP/CSS3D/Three only when that action and real media justify them.

### Integration 04 — build actual institutional publishing & operations
- Staff-verified live programme/venue, artist rights, named editor/curator reviewer, Sanity authoring, editorial approval, correct/withdraw, SEO/alt/accessibility/performance and bilingual copy.
- Actual user review of Vercel preview **before** main merge/public launch.

## 7. Source spine for the next agent/creative director

Read in order, not all 270 repo paths:
1. \`AGENTS.md\` + \`PROJECT_STATUS.md\` — explicit two creative rejections and working conditions.
2. **This file** — statuses and how everything integrates.
3. \`creative/20-whole-site-experience-kernel-v03.md\` — cross-site user journey, source graph, medium grammar.
4. \`research/26-visual-motion-typography-reference-labs.md\`, \`research/27-getty-resn-scroll-typography-motion-lab.md\`, \`research/28-imaginarium-visual-slow-looking-lab.md\` — design mechanism and live lab code.
5. \`creative/23-film-braids-of-identity-real-content-implementation.md\` + \`creative/24-braids-of-identity-artist-and-curator-rights-packet.md\` — genuinely attributed candidate.
6. \`research/visual-identity-archaeology-2022-2026.md\` + original 2026 PDF + image manifests — real graphic source and media limits.
7. \`architecture/ADR-001-conditional-tech-stack.md\` and \`site/\` — conditional technical choices and executable app.

**Acceptance:** a commissioner can navigate ALL research prototypes from a single internal entry; a collaborator can tell which mechanics are verified, which design choices were rejected, which assets are source-backed, what remains blocked and what the ONE next integrated project slice is. None of this claims a completed Darb visual design.



## POST-INVENTORY: Stage 16 original Darb art-direction V01 is in REAL website routes (2026-11-02)

The integration plan in this atlas was not abandoned or restarted as another Lab. Its first **actual website slice** has now been implemented, preserving all originals:
- Source-based **Open Field** of 5 programme fragments replaces rejected 3-image viewer at homepage; full source/project links, bilingual accessible typography, distinct media scale.
- Four programme/practice voices + film provenance + honest current-programme/participation routes, not only design prototypes.
- Shared functional institutional architecture on header/index/exhibition pages; separate film and work media retain their own visual integrity.
- Documentation of art-direction decisions/limitations: \`creative/30-DARB-OPEN-FIELD-ART-DIRECTION-V01.md\`.
- **Unapproved proposal**, NOT public release. Specific photography, poster masters, artists' permissions, official vector logo and venue/time approvals still to get. Must compare actual desktop/mobile screenshots with both prior rejected Darb versions and labs.

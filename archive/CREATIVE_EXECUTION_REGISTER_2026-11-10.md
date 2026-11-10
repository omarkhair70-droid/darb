# Darb Archive — One-world creative execution register
**Living plan · 10 Nov 2026 · Research/preview only · PR #4**

**North star:** The viewer enters a world through a woven object, then discovers that photographed work, practice, people, places and their source-grounded relationships are different faces of the *same* living archive. The experience, including its end, must feel authored as one work rather than a string of effects or webpage sections.

**Scope:** This document tracks one Darb Archive prototype at `archive/`. The separate institutional Darb site with public programme/events/contact functions is **not** being replaced. Do not branch into another demo app, swap the default `/` entrance by accident, or confuse a Vercel preview with cultural/rights approval.

## Acceptance language
- **WORKING** = verified code/interaction and CI, **not** visual sign-off.
- **IN DESIGN** = rendered initial interpretation, creative review not accepted.
- **NEXT** = scoped and ready to implement; only tackle when earlier slice has a working source → choice → return.
- **BLOCKED** = requires independently verifiable material/permissions or real device testing.
- Never call work "Getty/Oculi quality" just because a build passed, and don't assert an award outcome.

## The full inventory

| ID | Slice / what was agreed | Status | What must be true before marking art-direction accepted |
|---|---|---|---|
| A01 | One spatial world, not hero/sections | WORKING | Same camera and 72 source objects across free/guided movement |
| A02 | Source catalog, AR/EN and reading fallback | WORKING (data); IN DESIGN (typography) | Sources/translation remain intact while artwork, not audit labels, dominates |
| A03 | 17 clusters, source-aware Archive Compass and real search | WORKING | Orientation, search, selection, close/back preserve scene state on devices |
| A04 | 16 camera beats & Follow Story / Wander continuity | WORKING | Real semantic continuity, interruption, exact backtracking, consistent AR/EN |
| A05 | 9 editorial comparisons / verified relations kept distinct | WORKING for comparisons; NEXT for richer verified graph | Visual language distinguishes editorial parallel vs documented fact |
| A06 | Woven rug, fabric mass and three physically distinct eye openings | IN DESIGN | Raking light, depth, original craft; every eye's behavior is materially different |
| A07 | Three eye anchors briefly reveal D (not a pasted glyph) | IN DESIGN | Readable in genuine still-view without type; no arbitrary spiderweb decorations |
| A08 | Full-frame spatial threshold with visual/photo echoes | IN DESIGN | Entire view responds to the cloth, no drifting gallery thumbnails or unexplained green void |
| A09 | Scroll/touch from fabric into the same actual image world | WORKING; IN DESIGN for camera blend | No compulsory menu, hard cut or automatic detail pane; reverse and skip remain clear |
| A10 | Intro-only original tactile sound with browser-compliant activation | WORKING; IN DESIGN for sound score | Meaningful fiber tension/release/silence/entry beats; accessible quiet path |
| A11 | Photograph-specific encounter (#39) | WORKING (interaction); IN DESIGN (art direction) | Documentary image retains true framing, spatial group context, readable captions, back |
| A12 | Cyanotype-specific encounter (#41) | WORKING (interaction); IN DESIGN (art direction) | Print surface, optical/light exposure and precise original proportions; not a blue tint over all work |
| A13 | *One* actual programme path #39 → #41 → #42 | WORKING (logic and browser tests); IN DESIGN (visual pacing) | Relationship stated honestly: shared documented programme + editorial viewing route, **never invented maker/person** |
| A14 | A second cross-programme creative parallel (#41 ↔ #35) | NEXT | Editorial comparison explicitly labeled and reversible; photographic/provenance claims stay exact |
| A15 | D–A–R–B from source-connected filament viewpoint | FOUR SOURCE-ANCHORED LENS STUDIES IMPLEMENTED; ART-DIRECTION / BROWSER QA OPEN | Each form depends on existing artworks, camera, and discovered sources; no printed glyph or compulsory alphabet onboarding |
| A16 | No Final Frame: route actually woven by visitor | IN DESIGN | Path is true visited sequence, not a claim of real-world history; can return freely |
| A17 | Source-specific material language: photography/print/paper/installation/performance | NEXT | Two *contrasting* premium object treatments proven before scaling |
| A18 | Exhibition variant with orientation, screen-safe timings and authored sound | NEXT | Separate installation specification; no autoplay loop imposed on web visitors |
| A19 | Deep link, share and return to exact object/route | NEXT | Stable IDs and share URL; refresh/re-entry preserves context; no PII |
| A20 | Art/editorial crediting, media rights and curator sign-off | **BLOCKED** | Credited photographer/maker, license, relevant consents, publication and EN/AR script approval recorded |
| A21 | Low-end Android, real iPhone Safari, Firefox & accessibility | **BLOCKED** pending device review | WCAG 2.2 AA-oriented audit, keyboard, RTL, reduced motion, pinch and focus, no scroll traps |
| A22 | Field performance / stability | **BLOCKED** pending measurements | Actual LCP/INP/CLS and memory/frame measurements, lazy/priority image decode |
| A23 | Technical and editorial maintainability | NEXT | Source-approved publishing workflow, revision history, consistent up-to-date docs |

## 10 Nov verification — full visitor route
- The existing `src/material-score.mjs`, `web/app.mjs` and `e2e/material-journey.spec.mjs` already implement and test the #39 → #41 → #42 route, with object-specific camera/material treatment, related-work choices and reverse history. Do not reimplement this slice.
- `e2e/woven-fustat-full-journey.spec.mjs` now covers the previously untested *combined* textile → witness eye → archive → #39 → #41 → #42 → backward return to the same world on desktop and mobile, plus Arabic/reduced-motion access. Screenshot artifacts are for human review. This committed test has **not yet been executed or visually accepted** in this review; do not mark CI green without a run.
- The textile remains opt-in at `/?entrance=v2`, while `/` retains the older entrance. This is one product with two entrances, **not** two archive products. Default-entry replacement is an art-direction decision after filmed QA, not a refactor to sneak into a patch.
- Next visual acceptance: review five visitor-frame captures and footage on desktop and mobile, specifically source framing, arrival continuity, tactile realism, timing, captions and unfurling-to-camera blend. Fix evidenced failures before expanding the D–A–R–B identity language.

## Stage 09–12 continuation — aperture-to-photograph visual handoff
- The existing spatial archive and #39 → #41 → #42 material encounters remain untouched. No extra entry or parallel website was created.
- `web/entrance-lab.mjs` now paints departure fibers using the **same projected aperture center** as the on-screen eye target and the expanding photographic portal, and varies their direction and palette across documentary witness / cyanotype / printed trace. This is a compositional pass, **not** final material/camera art-direction approval.
- `e2e/entrance-lab.spec.mjs` has a desktop/mobile regression check for source #39/#41/#42: interactive eye center equals portal center and opens the matching archival photo. CI must complete before it counts as passing.
- Visual acceptance remains open: review real capture around departure (including a transitional frame), optical source registration, cloth weight, and whether the image takes over without a generic wipe. Assess on narrow phone and desktop before changing the default entrance.
 
## Stage 13 material craft — aperture pressure pass (10 Nov)
- `web/entrance-lab.mjs` now paints a local depth field on the **surrounding cloth** of each of the three existing apertures, with different lens proportions and material pressure. The photographs themselves are not recolored or edited by this pass.
- The retained and visitor apertures now **paint their cutout boundaries before clipping**. Earlier `shadowBlur` settings on an unpainted clipping path did not cast a visible edge shadow; this is a rendering correction, not a finished volumetric simulation.
- The existing route through source works #39 / #41 / #42, one-world camera, source identity, entry controls, and no-forced-detail handoff remain unchanged.
- `e2e/entrance-lab.spec.mjs` now captures a settled close crop of **each distinct material opening** on desktop and mobile. Passing screenshots establish evidence for review, not visual approval. Human evaluation of fiber-scale realism, weight, lighting, view-dependent aperture depth and performance remains open.

## Stage 14 — weighted cloth and the first identity bridge (10 Nov)
- `src/cloth-dynamics.mjs` adds a critically damped, non-oscillating pull. The cloth's upper edge, hanging surface, underside, rolling cylinder and all three eye positions use the same source of displacement; `src/ritual-material.mjs` source IDs remain unchanged. Motion is instantaneous for reduced-motion visitors. The event-driven ritual phase now follows visible progress rather than an ahead-of-time target.
- The six new aperture crops from the preceding commit were reviewed on desktop/mobile: the seams still read as abrupt photographic openings, and prominent strands look illustrated rather than truly torn fibers. **Keep A06/A08 in design**; added shadows do not equal artistic acceptance.
- The first source-grounded material-bridge identity study adds paths anchored at four **existing spatial works**: 7→39 is the editorial `makers` comparison, 39→41 is within Tales of Fustat, and 41→35 is the editorial `material` comparison. These are not historical collaborator relationships. `src/identity-relations.mjs` validates them against the existing evidence-linked threads. Only after a visitor encounters both 39 and 41 does the world reveal the paths, with dashed editorial and solid shared-programme lines.
- This is **not a completed letter A**, nor a printed D–A–R–B overlay. Source-bound geometry and a discovered route are foundations for the next viewpoint/design study. R/B remain unbuilt.
- New unit and browser tests cover textile inertia, reversal, geometrical identity anchoring and discovered reveal. The prior 549b CI had 59/60 browser tests passing, with only a 30-second full-mobile test timeout; its per-test timeout was adjusted. **Run the current commit's CI before declaring these additions working**; Vercel may still be blocked by build rate limits.

## Stage 15 — D–A–R–B inside one archive (11 Nov, in-progress visual acceptance)
- Created `src/identity-score.mjs` with four spatial lenses and a strict edge-validation contract. All line endpoints are actual positions derived from `world-layout.mjs`; existing editorial cross-programme links must match `curatorial-threads.json` and carry source pages. Shared-programme links can only join records from the same cluster.
- **D**: `Room of One's Own` works #46, #44, #43, #45, earned by encounters #44 and #46.
- **A**: reuses the pre-existing four-source material bridge #7 → #39 → #41 → #35, earned by encounters #39 and #41; #7 → #39 and #41 → #35 are **editorial comparisons**, not historical authorship.
- **R**: #44 → #47 documented editorial parallel between writing and voice/movement; within Voice in Motion, #47 → #48 → #49 → #50 → #47, earned by encounters #44 and #47.
- **B**: editorial #53 → #61 (Something Else across settings) and two connected sets of works within the Citadel programme #62 / #60 / #58 and #62 / #61 / #69, earned by encounters #53 and #61.
- `web/app.mjs` and `web/styles.css` place the strand networks underneath the **existing artworks** in the same transformed world (original archive has 72 spatial works). A new viewpoint score makes the lines appear or recede based on physical camera position, without opening four pages or putting four typography cards over the art. Visitors may discover any lens in any order; source-based controls remain unchanged.
- `tests/identity-score.test.mjs` and `e2e/spatial.spec.mjs` verify provenance, correct anchor coordinates, an unrestricted discovery order, and the 72 original works. A connector-side pure-code check passed against the complete live branch's catalogue of 72 exhibited objects and all known curatorial threads.
- **Do not mislabel this as four fully legible letters**: the constellation structure is working at a data/code level, but perspective, material thickness and actual typographic recognition require fresh browser captures and art-direction review. The prior static D opening signature is preserved pending approved replacement, not quietly removed.
- As of the last validation, new CI/browser test outcomes and a new Vercel preview had not been confirmed; do not merge or publish rights-blocked source media on the institutional domain. The material study `/?entrance=v2`, #39 → #41 → #42 journey and No Final Frame remain in this branch.

## Critical source truth
- `data/media-catalog.json` marks some inputs `rights: approved_by_project_owner`, but `data/tales-of-fustat-001.json` still has multiple `publication: blocked` media nodes and unverified credits/consent. **An approved prototype import does not establish public display rights.** Keep test preview protected, and reconcile rights record-by-record before promotion.
- 9 `curatorial-threads` are explicitly `editorial-comparison`, not documented maker/collaborator edges. The 5-stage Tales sequence is an *editorial traversal*, not a chronological or participant-authorship claim.
- Internal PDF/XREF IDs remain in data and QA, not forced onto artwork wall labels.

## Slice currently in execution — A11–A13
**Source:** page 11, genuine #39 courtyard documentary image, #41 cyanotype evidence image, #42 notebooks/prints.

A real visitor should be able to:
1. Enter the archive through the textile's first eye; pause on #39 *inside* the world, not a mandatory detail panel.
2. Open #39 deliberately; experience documentary framing and its actual programme context.
3. Follow a **labelled, honest shared-programme viewing path** (not "person in #39 made #41") to cyanotype #41 **through the same camera**, without a new page.
4. Observe that #41's optical/material treatment is different from #39's; follow another source #42 or retreat to the true prior camera/item.
5. Toggle Arabic, use keyboard/touch/quiet/reduced-motion; the readable alternative preserves the same factual material.
6. Return to exactly where the encounter began; don't lose the ability to freely Wander/Follow Story.
7. Record browser footage (desktop & mobile), adjust real composition from screenshots, run tests before any new preview deploy.

**First release gate:** web + code QA passes; no claim of final artistic quality. Do not merge or publish rights-blocked media onto the public institutional domain.

## Later order after this one high-quality path
A06/A07/A08 depth/lighting pass → A09 passage match → A10 sound dramaturgy → A15 identity network → A16 ending → A19 robust navigation/deep links → A17 scale material treatments → A20 source approval → A21/A22 acceptance → A18 exhibition adaptation. Re-evaluate priorities through filmed visitor behavior, not by adding effects indiscriminately.

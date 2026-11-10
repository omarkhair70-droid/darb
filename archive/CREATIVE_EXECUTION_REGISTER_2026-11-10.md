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
| A11 | Photograph-specific encounter (#39) | **NEXT / starting slice** | Documentary image retains true framing, spatial group context, readable captions, back |
| A12 | Cyanotype-specific encounter (#41) | **NEXT / starting slice** | Print surface, optical/light exposure and precise original proportions; not a blue tint over all work |
| A13 | *One* actual programme path #39 → #41 → #42 | NEXT | Relationship stated honestly: shared documented programme + editorial viewing route, **never invented maker/person** |
| A14 | A second cross-programme creative parallel (#41 ↔ #35) | NEXT | Editorial comparison explicitly labeled and reversible; photographic/provenance claims stay exact |
| A15 | D–A–R–B from source-connected filament viewpoint | IN DESIGN (D), NEXT (A/R/B) | Letter is discoverable, not a printed logo nor a compulsory 4-part onboarding |
| A16 | No Final Frame: route actually woven by visitor | IN DESIGN | Path is true visited sequence, not a claim of real-world history; can return freely |
| A17 | Source-specific material language: photography/print/paper/installation/performance | NEXT | Two *contrasting* premium object treatments proven before scaling |
| A18 | Exhibition variant with orientation, screen-safe timings and authored sound | NEXT | Separate installation specification; no autoplay loop imposed on web visitors |
| A19 | Deep link, share and return to exact object/route | NEXT | Stable IDs and share URL; refresh/re-entry preserves context; no PII |
| A20 | Art/editorial crediting, media rights and curator sign-off | **BLOCKED** | Credited photographer/maker, license, relevant consents, publication and EN/AR script approval recorded |
| A21 | Low-end Android, real iPhone Safari, Firefox & accessibility | **BLOCKED** pending device review | WCAG 2.2 AA-oriented audit, keyboard, RTL, reduced motion, pinch and focus, no scroll traps |
| A22 | Field performance / stability | **BLOCKED** pending measurements | Actual LCP/INP/CLS and memory/frame measurements, lazy/priority image decode |
| A23 | Technical and editorial maintainability | NEXT | Source-approved publishing workflow, revision history, consistent up-to-date docs |

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

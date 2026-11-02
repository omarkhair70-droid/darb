# EXECUTION HANDOFF — Darb 1718, Research -> Whole Site Delivery (pre-code)

**As of 2026-11-02 | Status: BUILD-READY ARCHITECTURE CANDIDATE, NOT APPROVED TO START APP CODE.**

## Commissioner's working correction (authoritative direction)
> "We do not make two page designs and choose. We research the whole system: sources, international sites, creative decisions, story architecture, tools and real stack, until the entire web concept is coherent; then we implement the **real website**, not a decorative mockup."

This overrides any prior plan that used standalone homepage/exhibition mockups as the next deliverable. The earlier three boards and 77-image analysis are *evidence/visual vocabulary*, **not competing full-site directions awaiting a beauty contest**.

## Decisions consolidated now (research recommendations)
1. **One coherent experience system** connects living programmes, people, projects, works, place and past-to-present stories.
2. **One structured content spine** used by **Explore** (authored narrative) and **Index/Archive** (filter, search) plus **What's On / Participate** (functional service). URL-visible view state.
3. **House & Guest** identity: stable Darb navigation and trust/information system; individual projects preserve their own credited poster/art direction.
4. **Motion as authored narrative grammar**, not a home-page template: Attention / Relationship / Process / Context shift / Stillness.
5. **Next.js + TypeScript + Sanity + authored CSS**, **GSAP for special chapters** as baseline candidate; native scroll; Lenis conditional; WebGL/R3F and Micrio/IIIF conditional features, not default dependencies.
6. **All Arabic/English structure and editorial pipeline** considered in schema, URL and typography from day one; no automatic art/author alterations.
7. **Project photos/source are integrated** (21-page original and 77 image objects in GitHub main); need precise work/photographer credit and higher-res subset before public show.
8. **No global “Darb museum” aesthetic**, no forced loading animation, no fake 2024 destruction/built-site render and no staged invented artist portraits.

## Proposed delivery sequence and artifacts — integrated, not page-by-page

### Phase G0 — Lock whole-site brief / reality (short final research sprint)
**Deliverable:** signed-off `Site Contract`: purpose, real users, functionality, editorial owner, current venues and live forms, public-source and consent strategy.
- Confirm Darb admin/contact, actual operation of listed Linktree services, and current physical address after 2024 changes.
- Select an editor/reviewer; agree public historical attribution and privacy constraints.
- Map what is known, unknown, unverifiable; never invent programmes to fill layout.
**Gate:** high-confidence public facts can drive production content.

### Phase G1 — Content ontology and IA
**Deliverable:** one CMS-ready schema and route/content graph, not six disconnected UI comps.
- Model 3 real content paths end to end:
  A. Something Else 2023: project→location→artwork→person/curator (only credited edges).
  B. Tales of Fustat: workshop→maker/practice→cyanotype→related programme.
  C. Live utility: verified current workshop/opportunity→event→form/contact.
- Define two-language variants, event statuses, image rights/credits and archive indexing.
- Freeze taxonomy/status/date rules and editorial update lifecycle.
**Gate:** editor can describe update process for event, project and artwork.

### Phase G2 — Experience + art direction language
**Deliverable:** one design system **specification across the whole site**:
- Typography family strategy and AR/EN motion/spacing behavior.
- Fixed House primitives (navigation, captions, date/location, status, controls).
- Guest visual skins (project-specific poster, gallery, art, stories) with authorship.
- Media rules, source fidelity, relative image hierarchy and editorial sequences.
- Interaction rules for Browse/Explore/Index/Participate and explicit escape routes.
**Gate:** evaluate coherence across 3 representative authentic content paths and different screens. These tests can be diagrams/storyboards or small vertical prototypes, not isolated final-page beauty contests.

### Phase G3 — Technical risk spikes (temporary proof ONLY)
**Deliverable:** objective answers to four high-risk questions:
1. AR/EN server-rendered route & mixed-direction text test (320/390/1440px).
2. True entity graph from Sanity preview → published → expired event state → searchable archive.
3. One approved story with CSS/GSAP scroll transitions; native scroll vs Lenis; measure accessibility/performance.
4. Optional 3D / artwork zoom ONLY IF named source content and artist approval justify it.
**Gate:** stop adding packages if goals achieved by CSS/HTML; discard unsuccessful experiments.

### Phase G4 — Real product implementation
**Deliverable:** functional production-grade site implemented as vertical slices with real data:
- Foundation: localization, navigation, responsive design system, content connection, image pipeline.
- Content: home, What's On, project/story, people/media, Archive/Explore, Participate, About, Visit/Contact.
- Editorial: CMS Studio editing, preview, translation, publishing, media/rights approval, cache revalidation.
- Narrative: authored interaction modules only after behavior proof.
- Reliable delivery: CI, testing, SEO, analytics if commissioned, deployment preview, cutover plan.
**Gate:** staff can publish and change real programme content; visitors can browse, read, participate, navigate history. Nothing is "demo" only.

### Phase G5 — Acceptance and go-live
**Deliverable:** accessibility/performance acceptance; verified venue/forms; accurate captions; public consent; screen/device QA; structured SEO; backup/handoff.
- Core Web Vitals target p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- AR/EN keyboard and assistive tech; responsive at 320/375/390/430/768/1024/1440.
- Reduced motion / native scroll fallback, caption/audio support, no scroll-jacking.
- Review duplicate image IDs (77 objects ≠ 77 unique photos), responsive variants and photographer/artist credits.

## Build acceptance examples (full site, not a single page)
**Visitor task 1:** Enter at /ar, know what Darb does, identify verified event date/location, open registration without mandatory animation.

**Research task 2:** Enter via a project/story, view a known artist/artwork with credits, change to index view, search time/discipline and share URL that restores mode.

**Editor task 3:** Create an English + Arabic exhibition, add rights-cleared media, preview; publish/correct without code; later see event archived but project record persists.

**Accessibility task 4:** Turn off animations and navigate entire site with keyboard, then try mobile low-power mode and see full content.

## Risks ranked
- **P0 Content truth:** staff approvals for real venues, deadlines, rights, artist credits and images.
- **P0 Publishing owner:** Who changes What’s On, calls and archive?
- **P1 Asset fidelity:** many source PDF images too small for immersive widescreen; request originals.
- **P1 UI coherence:** project posters vary, but stable navigation/caption controls cannot.
- **P1 Immersion tax:** pinned scrollytelling and WebGL performance vs real mobile access.
- **P2 Costs/licenses:** CMS traffic/media, deployment, fonts, third-party video/deep zoom and operations. Validate before commitment, never guess prices.

## Research finished vs not finished
- **Finished enough to recommend an architecture:** original asset archive, archive/story analysis, international benchmarks, content architecture and candidate tech stack, design principles and baseline QA targets.
- **Not yet verified:** team sign-off, current operations/venue, artwork and photographer credit detail, high-res photos, exact budget, optional immersive feature content, CMS/hosting ownership. These are finite gates, not indefinite brainstorm.
- **Explicitly not started:** Next.js app, backend/CMS instance, functional site, deployments, final brand tokens/fonts/motion. No fake readiness claim.

## Master source links
- [Benchmark analysis](../research/06-reference-experience-systems-deconstruction.md)
- [Whole-site experience architecture](../creative/13-whole-site-experience-architecture.md)
- [ADR-001 conditional technical stack](ADR-001-conditional-tech-stack.md)
- [Brand evidence](../research/visual-identity-archaeology-2022-2026.md)
- [Media inventory and QA](../assets/visual-audit-77.md)
- [Source index](../source-material/overview-2026.md)

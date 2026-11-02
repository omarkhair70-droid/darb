# ADR-001 — Conditional Technical Stack for Darb 1718, pre-code decision

**Date:** 2026-11-02 | **Status: RECOMMENDED BASELINE / pending client infrastructure and editorial confirmation.** This is the likely starting implementation stack after gates; it is not an actual initialized codebase.

The original mistake to avoid: naming GSAP / Three.js / Lenis / Next.js and then inventing experiences that justify them. Instead, this record maps **each Darb job → capability → candidate implementation → validation → defer/reject**.

## Recommended baseline (choose this unless one stated gate fails)
**Application & SEO:** **Next.js App Router + TypeScript + React** (server-first editorial pages; client-only interactive islands). Start at then-current supported releases, pin exact versions in lockfile after the approval gate.

**Editorial & CMS:** **Sanity Studio** with structured `project/event/story/person/artwork/media/place/opportunity/source` types, GROQ queries, image CDN, authenticated draft preview, roles and approval process. **Two-language AR/EN editorial authoring**: field-level localisation for short facts; document-level translations linked for long editorial stories when independently publishable. Validate actual workflow before irreversible schema.

**Visual system:** **CSS variables/tokens + CSS Modules** for unusual, authored layouts, with **Tailwind CSS** optionally for utilities if it measurably simplifies common layout. Do **not** import a global off-the-shelf component look. Native HTML semantics and accessible primitives for dialogs, menus etc.

**Motion choreography:** **GSAP + ScrollTrigger** as one chosen orchestration layer for specially authored story chapters only; CSS transitions/animations for ordinary UI interactions. Use `gsap.matchMedia()` (including `prefers-reduced-motion`), cleanup on route transitions, and per-device fallbacks. **Do not additionally install Motion/Framer Motion for the same behavior by default**.

**Scrolling:** **native browser scrolling as default**. Trial **Lenis** only for a proven continuity requirement in a complex story and with measured keyboard/touch/focus/anchor/scroll restoration and perf. If Lenis is selected, follow official GSAP ticker integration and respect reduced motion; avoid scroll hijacking.

**3D rendering:** **NO baseline Three.js/R3F dependency.** First investigate CSS transform/perspective and DOM-based layering, as Q42 deliberately did for Oculi Mundi. Introduce Three.js + R3F in a dynamically imported isolated route **only** if an approved Darb-specific spatial work/installation or otherwise non-replicable experience requires it, and has accessible HTML fallback and realistic media budget.

**Images:** original archival binaries retained in GitHub; publish approved derivatives through **Sanity image CDN + Next Image optimization**. For normal photos use responsive picture/next-image. For a selected truly enormous original artwork, evaluate **Micrio or tiled IIIF/OpenSeadragon** at feature level only after source resolution, license, integration/price and screen-reader test. The 77 PDF-extracted objects aren't sufficient evidence for universal deep zoom.

**Search/filtering:** start with structured GROQ/CMS archive queries, cache and URL-driven filters; do not add Algolia/Meilisearch/AI recommendations without measured search need. As collection grows, re-evaluate Arabic stemming, tolerance and performance.

**Forms/registration:** link to verified official existing forms initially (Darb Linktree shows classes, internships, residency, film submission and rental links, but their current acceptance state is unknown). Build an authenticated, spam-protected first-party submission layer **only if** Darb's operations and data retention require it. Do not copy live legacy forms or collect unnecessary sensitive data.

**Infrastructure:** GitHub main + PR review; Vercel preview deployment and production target as a **preferred candidate**, with Sanity Studio deployment and signed revalidation/webhook. Repo currently contains source/media/research, **no website app is initialized**. Hosting/domain ownership, budget and compliance must be confirmed with client.

**QA/observability:** TypeScript strict, lint, Vitest for schema/data utilities, Playwright for journeys & AR/EN + 320–1440px cross-browser, axe-core for automated accessibility checks (manual assistive tech mandatory), Lighthouse CI budgets, image/caption integrity checks, privacy-respecting analytics if commissioned, error tracking as justified.

## Why this family fits Darb
1. **SEO and AR/EN editorial content** require SSR/SSG and controlled metadata for dates, artworks and language paths. Next.js and structured Sanity content support this.
2. **One content model, two levels of presentation** (Explore/Index and live programmes) is easier to maintain when the source isn't a hand-coded scroll page.
3. **Story-specific art direction** requires bespoke CSS, media treatment and motion choreography; a rigid UI template is a poor fit.
4. **Source images are variable quality**: progressive responsive assets, source attribution and per-project hi-res option are more valuable than full-screen GPU texture processing.
5. **Small operational team** should be able to publish, preview and update programs with a CMS; don't make every programme update a Git commit.
6. **3D is optional**: Imaginarium required an explicitly virtual world, while Q42 Oculi Mundi documented intentional CSS 3D instead of WebGL.

## Technical decision matrix
| Need | Proposed tech | Choice | Why / trigger |
|---|---|---|---|
| Site framework, SSR, routes | Next.js + TypeScript | **Baseline** | SEO, AR/EN, server-first, shared content |
| Content and workflow | Sanity | **Preferred** | rich schemas, preview, image CDN, localized content |
| Editorial visual layout | authored CSS/CSS modules + tokens | **Baseline** | bespoke and responsive, no template look |
| UI layout utilities | Tailwind optional | **Trial** | decide after initial shared components |
| Story sequencing | GSAP ScrollTrigger | **Baseline for special stories** | controllable authored sequence, matchMedia |
| Ordinary transitions | CSS/WAAPI | **Baseline** | low overhead, native semantics |
| Smooth scrolling | Lenis | **Deferred** | only if real narrative experiment requires it |
| Spatial effects | CSS 3D | **Prefer trial** | accessible DOM, lower GPU footprint |
| Full spatial canvas | Three.js/R3F | **Conditional** | real dedicated artistic concept + performance proof |
| Image close examination | responsive images first, Micrio/IIIF only selected | **Conditional** | high-res original asset and curatorial reason |
| Search | CMS queries + URL filters | **Baseline** | small corpus / editorial tags first |
| Analytics | minimal privacy-respecting | **Conditional** | measure real goals with approval |
| First-party form backend | not yet | **Deferred** | operations/retention need validation |
| AI | none in baseline | **Not selected** | no legitimate use established; safeguard art integrity |

## Security/operations principles
- Sanity write credentials server-side only; editor access roles / draft visibility / audit.
- Signed ISR revalidation endpoints, validated callback URLs, no client leaked tokens.
- Public personal or clinical details only by approved editorial policy; no raw internal correspondence in public repo.
- Event status computed using a time zone field (Africa/Cairo when applicable) rather than guessing hours from old listings.
- Preview/prod environments isolated; source PDF/image originals are archive, not web-served as automatic full-res on home.
- Screenshot/attribution and alt-text checks become part of content publish workflow.

## Performance and accessible experience gates
- Adopt Core Web Vitals at field p75 **LCP <=2.5s, INP <=200ms, CLS <=0.1** (targets, not current results); measure mobile and desktop on real networks.
- Client JavaScript only for interactive elements; above-the-fold art loads prioritised; offscreen media lazy; cap transforms and simultaneous pinned scenes.
- One story page should remain legible with animations disabled, CSS disabled where feasible and at 200% zoom.
- Keyboard focus and back/forward restoration, URL-driven view/filter mode, language equivalence and transcripts/audio controls.
- Q42 Oculi Mundi team specifically described ~4s LCP for 3D cluster as a caution, not a target.

## Alternative paths and conditions
- If client insists on self-hosted CMS, strict data residency or custom backoffice: **Payload CMS + Postgres** may be more appropriate than Sanity, but requires operations/security ownership and cost assessment.
- If the project reduces to mostly static editorial content with little per-page JS: **Astro** could be leaner, but switching late from fully relational live programmes is expensive.
- If current web presence already has an enterprise CMS and feeds, plan migration/integration rather than duplicating editorial operations.

## Sources (do not claim current live site measurements)
- Imaginarium maker stack: https://www.q42.nl/en/work/imaginarium-national-gallery
- Getty / Resn stack: https://www.commarts.com/project/38649/tracing-art
- Oculi Mundi actual CSS-vs-WebGL and mode design: https://engineering.q42.nl/oculi-mundi/
- Oculi Mundi case stack: https://www.q42.nl/en/work/oculimundi
- Next.js internationalization docs (Feb 2026): https://nextjs.org/docs/app/guides/internationalization
- Sanity localization docs (Oct 2026): https://www.sanity.io/docs/studio/localization
- Sanity Visual Editing (2026): https://www.sanity.io/docs/visual-editing
- GSAP ScrollTrigger and matchMedia: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ ; https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/
- Lenis source and GSAP integration: https://github.com/darkroomengineering/lenis/blob/main/README.md
- Web Vitals targets: https://web.dev/articles/vitals

## Decisive build-gate checklist
- [ ] Confirm project owner approves Next.js/Sanity hosting and ongoing editing cost.
- [ ] Identify at least one editor to create, preview, publish and archive bilingual event.
- [ ] Confirm 3 representative **real** pieces of content with IDs, credits, rights and original hires variants.
- [ ] Confirm essential visitor tasks, actual public open/closed programme forms, current venues.
- [ ] Select which narrative feature (if any) truly needs CSS 3D or WebGL; no preinstalled GPU stack.
- [ ] Freeze security/content and performance requirements; set up feature-specific PoC acceptance.
- [ ] Approve entering the implementation phase. Until then, this is decision documentation.

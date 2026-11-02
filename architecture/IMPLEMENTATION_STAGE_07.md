# Stage 07 — Real Application Foundation, 2026-11-02

**Scope authorised by user:** proceed beyond research into a REAL website; no isolated design contests. Work is on feature/darb-site-foundation-20261102 with a draft PR. The existing source and research archives remain untouched on main until reviewed.

## Implemented in this first engineering slice
- Next.js 16 App Router + TypeScript + responsive bespoke CSS with an Arabic-first root and English peer route.
- House navigation: Explore, Archive, Programme, Participate, About and Visit, with keyboard/mobile navigation and language switch.
- One source-led canonical catalogue, seeded with 9 historical project/programme records tied to original PDF pages and xrefs.
- Related stories based only on documented project relationships and explicitly marked editorial proposals.
- Searchable archive with URL-backed filters; project detail and cross-links.
- Genuine original PDF-derived media copied from the research bank into the app public folder at build/dev time.
- No invented open event times, no false 2026 address after the 2024 demolition, no participant health data in public media.
- Embedded, *unconfigured until credentials provided*, Sanity Studio schema for project/person/credit/media/event/story/opportunity/place/source; server-side read of editorially approved records when connected.
- Prevent search indexing with robots noindex until client content and publication approvals.
- GitHub Actions attempt to install/build/typecheck/test the site on PR. **A passing check is required before merge or deployment**.

## Not yet implemented or validated
- Sanity project ID/dataset and approved editorial roles/preview; draft/live editing not connected.
- Current venue and current programmes; published site makes no current booking claims.
- Publisher-approved hi-resolution images and full credits; the source samples are PDF-derived.
- Official vector logo/font masters and creative motion choreography tied to a signed-off narrative beat.
- Real server-side form submissions/notifications; don't build without confirmed privacy and workflow.
- Browser QA across AR/EN, screen reader, mobile, animation preference and performance budgets.
- Production hosting/domain and official public-site launch.

## Why motion/3D is not shipped in slice 1
The source material supports art-rich editorial composition and relationship discovery. It doesn't establish a real spatial installation requiring 3D, nor validate a need for smooth-scroll hijacking. CSS + semantic navigation is deliberately present first. GSAP is available to introduce in a source-authored chapter when the scene/curator evidence is ready. Lenis, R3F and tiled deep zoom remain gated.

## Production engineering decisions next (not mockups)
1. Obtain actual Sanity project/dataset and editorial owners; configure secure drafts/role approvals.
2. Close 3 end-to-end real editorial flows: Something Else programme → credited artwork → curators; Tales of Fustat craftspeople; real verified current participation event.
3. Content-driven project templates must preserve exhibition-specific artistic identities in images/type, with stable House controls.
4. Accessibility and performance QA on the real application (AR and EN, mobile and desktop), not an isolated presentation.
5. Choose motion only after narrative module and substantive artwork source/credits approved.

## Run commands
From repository root:
- cd site
- npm install
- npm run check:content
- npm run dev

Node >=22.12 required. The script requires ../assets/original in the same checkout and copies 9 selected assets. Run CI on the PR. Do not merge if build/typecheck fails.

**Important:** building a working foundation is not equivalent to completing the website. Keep the project stage and limitations explicit.

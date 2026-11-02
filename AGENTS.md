# AGENTS.md — Darb 1718 Research Mode

**2026-11-02. Commission:** research-first official-site Creative R&D. **DO NOT implement website/code until the client approves the story and explicit build gate.** This repository is a research workspace, not the website.

## Hard rules
1. Read `README.md`, `creative/00-research-workflow.md`, `creative/01-creative-brief.md`, `source-material/overview-2026.md`, `assets/manifest.csv` and `research/open-questions.md` before proposing work.
2. Stay in discovery: history, sources, image/video research, interviews, reference site decomposition, three competing art directions, typography/experience studies, editorial IA, CMS/tech options, tested hypotheses.
3. Avoid premature **hero design, homepage code, chosen colors, fonts, stacks, Three.js, GSAP, animations or deployment**.
4. Do not call unverified claims facts: e.g. completed new venue, employment role of Nourhan, detailed personal biography, sourced demolition losses.
5. Reflect actual Darb material (Fustat, artists, workshops, exhibitions, film, collaboration), not copied Awwwards shots.
6. Preserve the real 21-page PDF, 77 embedded image IDs, page preview and rights annotations. **As of 2 Nov 2026 these binaries are merged in `main`**: `source-material/original/`, `assets/original/`, `assets/previews/`, `assets/contact-sheets/`, via PR #1.
7. User states rights to use supplied PDF/images for official website. Online third-party images may have separate rights and should remain source-linked until cleared.
8. For each reference, record **Source / Award evidence / Problem / Medium / Decision / Technique / Transferable principle / Not-to-copy / Darb experiment**.
9. Use confidence labels A/B/C/D/H and bilingual AR/EN as first-class; research source dates.
10. Design for real utility: current events, historical/current venues, programme access, artist credits, accessibility, limited mobile bandwidth, modest editorial team.
11. No fabricated local events, testimonials, artist portraits, 3D mock archives, success/award claims.

## Sequence
`Source & Content Inventory → Audience Goals → Reference Analysis → Three Narrative Directions → Experience/IA → Visual/Type/Motion Grammar → Editorial CMS Decisions → Focused Prototype Critique → Approval → Code/QA/Release`.

## Asset and source handoff
The original user-provided PDF and extracted 77 embedded media assets are available in the associated research chat ZIP:
`darb1718_research_media_2026-11-02.zip`.
Its source checksum is recorded in `source-material/README.md`. The binaries are now present in the repository; continue verifying individual image credits and public-use consent before site publication.

## Research issue convention
Every work item: objective / actual evidence / source URL+date / hypothesis or fact / affected content / editorial owner / open questions / next validation.



## COMMISSIONER CORRECTION — Stage 06 whole-site research → real build (2026-11-02)
**Do not propose next to make one or two page mockups and compare them, or to generate an isolated image to “choose a design.”** The commissioner explicitly wants to consolidate the entire website's **experience architecture, editorial source system, full UX, international reference systems and the chosen technology rationale** and then proceed to **real production implementation**, not decorative demos.

**Read these before any new tasks:** `research/06-reference-experience-systems-deconstruction.md`, `creative/13-whole-site-experience-architecture.md`, `architecture/ADR-001-conditional-tech-stack.md`, `architecture/EXECUTION_HANDOFF_PREBUILD.md`.

Current **recommended baseline** (not a repo initialization): Next.js App Router, TypeScript, React, Sanity, bespoke CSS, GSAP ScrollTrigger for story chapters; native scroll by default; Lenis only if demonstrated benefit; no default Three.js or arbitrary AI; source-respecting responsive images and optional Micrio/IIIF only for actual hires art. Earlier blanket “avoid choosing stack” instructions are superseded by this *conditional architecture choice*. Exact dependencies and hosting require build-gate validation.

All future visual/type/motion studies must serve **the joined website system**: Explore + searchable Archive/Index + live programmes/Participation. Don't fork into separate one-off exhibition microsites or lock visual identity based solely on 3 collages. Tech spikes may be real coded vertical tests only after the explicit implementation gate; no pretend full site deployments.

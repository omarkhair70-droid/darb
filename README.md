# Darb 1718 — Creative R&D / Living Archive

**Official website commissioned research workspace** • Research snapshot **2 Nov 2026** • **Research only, no site implementation started**.

Goal: an international-quality cultural website whose experience emerges from Darb's **authentic work, people, artworks, Fustat place, memory and current programme** — *not* copied award-site effects.

> This repository is an **unofficial research workspace** for a proposed official site, not yet a published Darb website or final approved creative direction. This public working repository distinguishes evidence, interpretation, and speculation. Programme times, staff roles and present venue require validation.

## Start here

- [PROJECT STATUS / current gate](PROJECT_STATUS.md)
- [AGENTS.md — no-code discovery rule](AGENTS.md)
- [Research methodology / Omar's Creative R&D workflow](creative/00-research-workflow.md)
- [Creative & experience brief](creative/01-creative-brief.md)
- [3 competing story territories](creative/02-narrative-territories.md)
- [Award-winning cultural website case studies](references/award-winning-case-studies.md)

## Source archive — 21 pages + 77 images

- [2026 Overview 21-page content index](source-material/overview-2026.md)
- [Source and verified PDF checksum](source-material/README.md)
- [77-asset exact image/page XREF manifest](assets/manifest.csv)
- [Archive-ingest PowerShell script (PDF + 77 images + 21 previews)](source-material/import-overview-media.ps1)
- [All 77 image-object visual descriptions, proposed stories, credits checklist](assets/curation-77.csv)
- [External image links & source rights](media/image-sources.md)
- [Media, image and CMS editorial requirements](creative/08-content-and-media-spec.md)

**Binary archive status: COMPLETE — merged to `main` in [PR #1](https://github.com/omarkhair70-droid/darb/pull/1) on 2 Nov 2026.** Original [21-page PDF](source-material/original/Darb_1718_Overview_2026.pdf), [77 extracted image assets](assets/original/), [21 page previews](assets/previews/), [two contact sheets](assets/contact-sheets/), [original JSON](assets/manifest-original.json) and [CSV manifest](assets/manifest-original.csv) are now in this repo. PDF SHA-256 was checked during upload. Commissioner confirmed permission to use supplied material for website; individual photographer/artwork credit and participant consent are still editorial gates. Separate external media has separate rights.

## Darb story, history, people, programme

- [Timeline 2001–2026](research/timeline.md)
- [Institutional mission, place and DNA](research/institution.md)
- [Documented people, including Nourhan Elmeligy](research/people.md)
- [Events / residencies / exhibitions 2025–26](research/programmes-2025-2026.md)
- [Source-led editorial human stories](research/stories-and-angles.md)
- [Public institution contact records — historic vs current](research/contacts.md)
- [Verification & interview backlog](research/open-questions.md)
- [Evidence bibliography](sources/bibliography.md)

## Experience, visual and technology studies

- [Experience architecture / routes / content models](creative/03-story-architecture.md)
- [Art-direction material and visual grammar research](creative/04-visual-grammar-research.md)
- [Interaction / motion research](creative/05-motion-and-interaction.md)
- [Technology feasibility options, not selected](creative/06-technology-research.md)
- [Design System research](creative/07-design-system-research.md)
- [Quality and research gates](creative/09-evaluation-scorecard.md)

## No-code / no premature solutions

No final palette, font, logo alteration, homepage hero, site coding, motion library, WebGL scene or CMS is chosen. The next gates are: complete media/story mapping → client/audience validation → three authentic-photo story studies → bilingual type/UX decisions → focused interaction evidence → code approval.

## Cultural accuracy and attribution

The 2008 founding and 2024 demolition, fundraiser and 2025/26 creative programmes have documentary sources but the **present venue, exact staff titles, fundraising outcome, early opening discrepancy and individual captions** remain open. Never make a private-person biography or a “comeback” scene from uncertain details.


## Stage 04 — verified visual research checkpoint (2 Nov 2026)

- [77-image individual visual audit + research priority](assets/visual-audit-77.md) — 31 high-potential, 39 supporting, 5 low, 2 layout artifacts.
- [77-image audit CSV](assets/visual-audit-77.csv) — per-object PDF page, XREF, visual description, proposed use and validation gate.
- [Image quality / duplication / dimensions check](assets/source-image-quality-qa.md) — 77 objects, 75 binary-unique streams; artwork and photographer captions pending.
- [Three source-grounded storyboards, without website UI](creative/10-story-prototypes-on-paper.md): *Between*, *Made by Many*, *What Then?*.
- [Deep maker-led international comparison](references/deep-comparative-research.md): Getty/Resn, National Gallery, Rijksmuseum, Clyfford Still Museum, Detroit Institute of Arts and Darb's own *No Problem: The People*.
- [2026 source disagreements](research/fact-check-and-discrepancies-2026.md) — Something Else 2025/26 numbering, venue and authorship caveats.
- [Source import script](source-material/upload_from_pdf.ps1) — used for the completed upload. Source image and PDF binaries are now merged to `main` in [PR #1](https://github.com/omarkhair70-droid/darb/pull/1).

## Stage 05 — visual research after source ingestion (2 Nov 2026)

- [Three non-final, source-photo editorial art-direction territories](creative/11-visual-direction-test-lab.md): **Between**, **Made by Many**, **What Then?**. Their original-photo montage previews were delivered as PNG files in the ChatGPT handoff, not site implementation assets.
- [Visual identity archaeology](research/visual-identity-archaeology-2022-2026.md): institution logo versus exhibition-specific posters; Aouda 2022 pre-dates 2024 demolition; 2020 Behance work isn't presumed official branding.
- [House & Guest identity framework](creative/12-house-and-guest-identity-framework.md): permanent Darb navigation/credibility with flexible project-specific visual identities, AR/EN typography and two-speed visitor journeys.
- [77-image quality audit](assets/source-image-quality-qa.md): 77 embedded objects include duplicates and non-photo layout art; request original hires photos and author credits for flagship work.

**Still NOT selected:** final logo treatment, typefaces, palette, homepage, motion stack, interactive narrative or any website code. Visual composition boards are research tests; photographed objects were not edited or invented.


## Stage 06 — Whole-Site Architecture Consolidation (2 Nov 2026)

**The commissioner rejected the workflow of designing isolated exhibition/homepage variants first.** The correct next step is a holistic site contract and stack decision, then actual product implementation. Prior boards are research evidence, **not candidate standalone sites**.

- [Live reference systems deconstructed](research/06-reference-experience-systems-deconstruction.md) — National Gallery Imaginarium, Getty/Resn Tracing Art, Oculi Mundi, Rijksmuseum; art strategy, internal tools, interaction, accessibility and performance choices.
- [Whole-site experience & content architecture](creative/13-whole-site-experience-architecture.md) — House/Guest identity, Explore + Index/Archive + What's On/Participate, shared relational schema, AR/EN, routes and publishing workflow.
- [ADR-001 preferred technology baseline](architecture/ADR-001-conditional-tech-stack.md) — Next.js / TypeScript / Sanity / authored CSS / GSAP for special chapters; conditional Lenis, CSS 3D, R3F, deep zoom and forms.
- [Real execution handoff and finite gates](architecture/EXECUTION_HANDOFF_PREBUILD.md) — full product vertical slices, content/approval/technology probes, no code yet.

**State:** research supports a strong conditional stack and whole-site model. The client must still confirm editorial ownership, current venues/open forms, artwork and photographer credits, production infrastructure and any purpose-specific immersive module. No actual Next.js website or CMS instance has been built.

# Darb 1718 — Client rejection of V1 and whole-site creative reset

Date: 2026-11-02. Status: USER REJECTED all present UI / identity. Source and technical work NOT rejected.

## What the actual Vercel screenshot reveals
- Default six-link horizontal header: Explore, Archive, Programme, Participate, About, Contact.
- Beige/charcoal/one muted accent inherited from assistant's generic editorial aesthetic.
- Giant English brand phrase on left and one rectangular, low-resolution PDF image on right.
- Numbered sections and repeated image cards further down.
- A layout strongly reminiscent of unrelated earlier projects (client specifically named Fokhara).
- A generic website with Darb content dropped inside, **not a designed Darb experience**.

Evidence is in the actual branch:
- site/src/app/[lang]/page.tsx contains home-hero, hero-grid, manifesto-band, project-grid and an assistant-written headline.
- site/src/app/globals.css fixes paper #edeae3, accent #a24732, Georgia, Arial and Tahoma; no client approved those values.
- site/src/components/project-card.tsx makes works, workshops, festivals and films the same rectangular card.
- Nine historic source records are useful as seed data, but no verified individual artwork/artist full records and no current programme are yet published.

## Root-cause decision
We misunderstood the international references and the initial brief. The research asked: what can this cultural institution enable **that the web can do better than a brochure**? We answered by defaulting to a homepage, huge type, image, sections and cards. Passing TypeScript, QA and deploying to Vercel demonstrated engineering health, **not** successful art direction.

## Non-negotiable status
The current homepage, CSS, page layouts, fixed typographic/color palette, card grammar and default section hierarchy are **REJECTED**. Do not polish them, reuse as creative reference, present them as client-approved, or merge PR #2 claiming the website is finished. All prototype visuals are disposable. The existing Vercel preview is *known rejected visual scaffolding*, not a new project milestone.

The following remain valid:
- Source research, international references, original PDF, 77 media objects, rights constraints and content audit.
- Next.js/TypeScript, bilingual routing, tests, GitHub PR and auto Vercel Preview plumbing, preliminary Sanity schemas and provenance metadata.
- GSAP/ScrollTrigger, CSS3D, Three.js/R3F, Lenis and deep zoom remain valid tool options. No blanket technology bans.
- Every prior board, House & Guest idea, Three Reading Paths and stack decision is a **hypothesis**, NOT a binding design.

## Required replacement process — no two-homepage beauty contest
1. Read source 2026 overview: people, work, event, film, installation, text, participation, identity materials. Keep fact / interpretation / unknown separate.
2. Deconstruct benchmark **experiences** end-to-end: initial encounter, user agency, viewing rhythm, interaction, artistic authorship, content dependencies, technology, mobile and fallback.
3. Define Darb's unique digital medium and content model (real artist/media/relations); only then derive interaction and typographic/spatial grammar.
4. Test a connected user journey across actual artwork, people, event, archive and participation; NOT a disconnected static home image.
5. Replace rejected UI across the real application coherently, then review actual Vercel screenshots on desktop and mobile. Keep CI/QA.
6. Keep high-resolution original image and artist/photographer credit approvals as clear publication gates.

## Important anti-patterns
No instant switch to black/brutalist/3D. No random shapes, paper textures, motion or editorial minimalism from previous work. No gallery pretending to be an invented Darb building. No claim that an old Fustat address is currently open. No published artist identity inferred from a photo. No argument that a site is good merely because 16/16 tests passed.

The client wants **everything researched as a cohesive whole**, then a real, distinctive execution — with delivery previews as a normal workflow.

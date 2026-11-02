# Stage 08 — Experience Atlas: real source-led navigation, not a style template

**2 Nov 2026. Implementation in Draft PR #2, not public launch.**

## Why this feature exists
Earlier Explore rendered three cards in a fixed grid. It repeated a generic portfolio pattern rather than letting authentic Darb material become the basis for exploration.

This slice keeps the existing technical and editorial workflow (Next.js, Sanity-ready source model, GSAP, QA) but builds a **functional way to navigate actual artwork/programmes through a question**, while leaving the entire visual system deliberately unapproved.

### Three editorial lenses, NOT three separate identities / style variants
- **Material & Trace / المادة والأثر:** Tales of Fustat (2026 PDF p.11), Natalia Ossef residency (p.10), INBETWEEN exhibition (p.7).
- **Gathering & Voice / التجمّع والصوت:** Jusoor film programme (p.9), A Room of One's Own workshop (p.12), Darb fi Al-Hadiqqa (p.6).
- **Questions & Continuity / السؤال والاستمرار:** Something Else 2023 (p.18), 2025 symposium (p.16), INBETWEEN 2025 (p.7).

A lens is **a transparent editorial comparison**. It does not claim the same artist, same people, same curatorial intent or an official shared programme between any two records. Some of the original documents lack a date or full photo credits; nothing in this feature invents them.

### Implemented interaction behavior
1. Open /ar/explore or /en/explore to choose a lens.
2. Each scene presents a real archival project, source PDF page, photographic object only when a source image exists, sourced summary and independent record link.
3. Navigate scene-by-scene with explicit Previous/Next or direct numbered choices; no forced scroll animation.
4. Every selection uses shareable URL state \`?path=material&step=1\`, supports browser Back and Forward, and is preserved when switching Arabic/English.
5. The archive remains one click away. This follows Oculi Mundi's lesson about Discover/Research states being connected, without copying its particular appearance or spatial metaphor.
6. GSAP is used only for a modest **state transition** between distinct scenes. Prefers-reduced-motion receives immediate, fully legible DOM. No WebGL, Lenis or giant dependencies for a small media view.
7. Media publication and credits warning remains visible. "No image published" is a deliberate placeholder for sensitive/uncredited workshop images, not synthetic art.

### Sources
- \`source-material/original/Darb_1718_Overview_2026.pdf\` (21 pages; 77 extracted objects)
- \`source-material/overview-2026.md\` and \`assets/manifest-original.json\` (metadata)
- \`creative/10-story-prototypes-on-paper.md\` (earlier hypotheses; lenses are not approved brand directions)
- \`architecture/EXECUTION_HANDOFF_PREBUILD.md\` (overall website)
- \`research/06-reference-experience-systems-deconstruction.md\` (museum/cultural examples)

### Technical artifacts
- \`site/src/content/reading-paths.json\` — bilingual project-scene insight and independent source record references.
- \`site/src/lib/reading-paths.ts\` — typed projection; only valid visible project references become scenes.
- \`site/src/components/experience-atlas.tsx\` — client-side state, navigation, GSAP reveal with reduced-motion.
- \`site/src/app/[lang]/explore/page.tsx\` — server-side Sanity/fallback connection and initial URL state.
- \`site/src/app/[lang]/explore/reading-paths.css\` — throwaway presentation scaffolding. **Not Darb brand standards**.
- \`site/e2e/darb-site.spec.ts\` — desktop/mobile, AR/EN, deep link, language switch, history, reduced motion.
- \`site/scripts/check-content.mjs\` — validates editorial lens IDs, bilingual copy and project references.

## Next product improvement
- Replace text-only credits with approved artist/photographer attribution and authoritative source links for each displayed media.
- Allow editors to manage reading paths and evidence relationships in Sanity, with workflow approval and AR/EN editorial control.
- Cross-link actual artwork records and consenting makers where source ownership is confirmed; don't fabricate source graph edges.
- Verify current activities and venues with Darb staff before a live programme view can show booking CTA.
- Finish creative-language research into **Darb-specific** composition, type, interaction timing, audio and art integrity — without importing any permanent palette from other projects.
- Conduct screen-reader audit, 320/390/1440 media QA and performance budgets on the real application.

**Release gate:** this feature can be technically tested but must not be represented as a signed-off curatorial narrative or public-site design until the institution validates all links, rights and language.

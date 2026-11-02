# Technical feasibility radar (uncommitted stack)

**No implementation started.** Evaluate only against approved narratives, CMS editing requirements, asset quality, 2026 browsers, budgets and mobile conditions.

## Platform candidates
| Layer | Primary low-risk candidate | Conditional alternative | Reason to defer |
|---|---|---|---|
| Site / SEO / bilingual | Next.js + React + TypeScript | Astro for largely editorial content | Editing, archive volume, SSR/ISR, client interactivity not decided |
| Content & editorial | Sanity schema (projects/people/places/events/media) | Payload CMS or Storyblok | Team workflows, cost, preview and rights approvals need demonstration |
| Images | image CDN + responsive `srcset`/Next Image | IIIF/Micrio deep zoom for unusually large art | Source resolution, license and zoom value unproven |
| Layout and effects | CSS + lightweight Motion | GSAP for complex timeline/scroll chapters | Do not use two overlapping animation engines without reason |
| Smooth scrolling | Native browser first | Lenis only if a measurable sync requirement | Accessibility and iOS, anchor links, scroll restoration |
| Spatial 3D | none by default | Three.js / React Three Fiber | 77 photographs don't justify 3D scenes |
| Sound | opt-in native audio with transcripts | Web Audio API spatial audio if legitimate recording | Capture rights, audio budgets and no autoplay |
| Search | indexed metadata/query through CMS | dedicated search provider for deeper archive | Corpus size, Arabic stemming, editorial tagging need audit |
| Video | captioned adaptive hosted video | short edited audiovisual feature | Need authentic footage and licenses |
| Analytics | privacy-respecting aggregate measurement | event analytics after goals agreed | No unnecessary identity collection |

## Technology evidence
- **Official GSAP ScrollTrigger**: sequencing, pinned and scrubbed storytelling; can adapt via matchMedia. https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- **Official Motion**: gesture, layout and scroll animations; CSS may be lighter for simple states. https://motion.dev/docs/react
- **Lenis official project**: integrates native scroll and GSAP timelines, but is not required. https://github.com/darkroomengineering/lenis/blob/main/README.md
- **Three.js manual**: GPU memory can dwarf compressed image file size (approx width × height × 4 × 1.33 bytes for textures); so no full-page textures at unbounded resolution. https://threejs.org/manual/pages/textures.html
- **Next.js Image**: responsive widths, reduced layout shift, lazy loading, remote sources. https://nextjs.org/docs/pages/getting-started/images
- **Sanity Asset/Media Library**: metadata and programmable asset workflows; CMS/editor permission design still needed. https://www.sanity.io/docs/http-reference/assets
- **WCAG 2.2**: target AA at minimum; controls for motion, keyboard use, language and captions. https://www.w3.org/TR/wcag/

## Feasibility spikes before coding
- Spike A: 77-image PDF extraction quality/crop/alt/credits and visual consistency.
- Spike B: realistic AR/EN page with long curatorial text and mixed-script artist names.
- Spike C: compare CSS, Motion, GSAP *for one approved story beat* at 320–1440px.
- Spike D: test low-bandwidth first page and long gallery image load; image placeholder failures.
- Spike E: Sanity vs Payload vs Storyblok operator flow: create → preview → approve → translate → publish → unpublish.
- Spike F: search, filtering, deep links, program expiration and archive migration.
- Spike G: check R3F only if archival venue plan / installation space is confirmed to justify real 3D.
- Spike H: video/audio consent, subtitles, controls, no autoplay.

## Performance targets (proposed acceptance goals, not audited results)
- Core Web Vitals: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75; test slow mobile and Cairo network realities.
- Avoid oversized entry payload; media progressive; lazy load archives; typography swap considered.
- No flash or automatic rapid movement, reduced motion respected.
- Accessibility: robust keyboard flow, focus, alt/captions, AR / EN lang, contrast, screen reader.
- Screen widths: 320, 375, 390, 430, 768, 1024, 1440 and ultrawide.
- SEO: canonical translated page and structured events, stable slugs and metadata.

## Architectural principle
Content and proof documents outlive the presentation layer. Repositories and CDN hold assets with media IDs/credits; editors own content; site components render governed models. **Avoid a fragile handcrafted scroll show that the museum cannot update itself.**

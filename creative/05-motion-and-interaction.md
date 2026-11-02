# Interaction & motion grammar — research, not an animation spec

## Proposed modes of attention
| Mode | User goal | Possible behavior | Limit |
|---|---|---|---|
| Discover | Find current programme | Direct list and filtering; no cinematic preload | Most important route stays usable |
| Read | Understand a project | Gentle scroll rhythm, in situ credits | Text must remain selectable, accessible |
| Inspect | Examine artwork | Deliberate zoom + caption/artist and provenance | No generative alteration of artwork |
| Connect | Travel between stories | Relationship links, related artists/events | No inaccessible canvas-only navigation |
| Participate | Register or contact | Plain form/verified external link | Never obscure the submission status |
| Remember | Explore timeline | Compare project chapters over time | Attribute demolition claims, no sensational visuals |

## Research moves to prototype
- **Image as threshold:** large editorial photo reveals a smaller truthful detail on interaction.
- **Material continuity:** photo sequence joined by recurring clay/printed line only if historical/artistic link valid.
- **Editorial montage:** exhibition photos and public comments, composer controls and media captions.
- **Small, opt-in sound:** authentic hall/workshop ambience, optional controls and transcript where applicable.
- **Responsive typography:** page-specific type motion only where reading remains calm.
- **Archive encounters:** select one artist → see related projects/media/locations without losing context.

## Interaction quality gates
- Reduced motion mode: all story and content visible without animation.
- Keyboard focus and pointer/touch parity; no hover-only essential information.
- Short transitions, no scroll hijack or pinned sections that trap mobile.
- No animation that makes an image artifact misleading or substitutes for its original.
- Audio off by default, persistent explicit mute/play.
- Pause/skip motion, meaningful fallbacks, no low-FPS route loss.

## Candidates, not dependencies
CSS/browser native; Motion for React for modest states; GSAP ScrollTrigger for precise chapter choreography; Lenis ONLY if smooth scrolling proves compatible; Three.js/R3F for a distinct spatial experience backed by a concept; Micrio or deep-zoom tiling for ultra-high-resolution art.

Official references:
- https://motion.dev/docs/react
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://github.com/darkroomengineering/lenis/blob/main/README.md
- https://threejs.org/manual/pages/textures.html
- https://www.w3.org/TR/wcag/

**No library selected.** Technical demonstration must compare plain CSS, Motion and GSAP before adding WebGL.

# Darb Archive — What the Getty screen recording changed

**Reference inspected:** user-provided ~64.5-second screen recording of Getty / Resn *Tracing Art* (9 Nov 2026).  
**Use:** behavioral analysis only. Do not publish/reuse the recording or reproduce Getty assets, typographic composition or motions as Darb assets.

## Observed transitions

| Video time (approx.) | Observable interaction/composition | Meaning for experience design |
|---|---|---|
| 00:00–00:06 | Editorial statement sits within a broad floating visual field; optional chapter overlay appears on top without displacing scene | Scene is the primary interface. Navigation is secondary. |
| 00:08–00:12 | Dense collection of small artworks coheres spatially, then the view moves into an individual artifact | The experience uses **scale as navigation**: collection → object. |
| 00:20–00:29 | Multiple original works inhabit a moving spatial composition, with one object held in focus while narrative provenance appears | Context and individual object remain present in the same world. |
| 00:32–00:44 | Artist names, artworks and explanatory writing form distinct editorial beats; content changes scale and placement | Typography participates in the choreography; it is not a persistent left column. |
| 00:48–00:55 | A single artwork fills the screen and text is placed with it; the work becomes immersive rather than a card | Give attention to artworks and real media; allow meaningful slow looking. |
| 00:56–01:04 | The larger collection field returns in a compact spatial composition | A return to the archive should feel like a continuous change in viewpoint, not a route change. |

## Direct critique of our rejected first archive web shell

The first implementation had a conventional full-screen intro; then a separate text-column plus sticky image-column; then a graph screen opened as a different mode with a rectangular inspector. Its interactions *worked*, but this **website workflow remained legible through the animation**. It did not create the unified visual environment visible in the reference video.

This is a **structural** issue: adding scroll reveals, parallax or Three.js to the old panels would not fix it.

## What Stage 02 actually changes

1. Replace home page / chapters / feature panel with **one persistent 5200×3000 archive field**, never torn down between story moments.
2. Every guided beat moves **one interpolated camera** through the same source media.
3. A seven-moment timeline is used for narration and camera placement, not seven stacked page components.
4. Object inspection happens *inside* the experience through a contextual overlay.
5. Free Wander mode uses pan + zoom in the same field; it is not a separate conventional graph route.
6. Full-screen index gives access to moments without becoming site navigation.
7. A text-first reading mode exists for those who prefer it, but it is a real alternative rather than the underlying dominant interface.

## Evidence and content

The larger field uses eighteen **actual** objects from the supplied 2026 overview, with page context. The designed itinerary is currently Tales of Fustat through archive IDs #39–42. Surrounding programmes include INBETWEEN, Jusoor, Something Else, artist residencies and performance, each shown as its own named source record. Spatial proximity does not imply undocumented collaboration.

## What Stage 02 does **not** prove yet

- It is a DOM/CSS 2.5D research renderer, not a custom Three.js physics or cinematic GPU system.
- Only one guided, five-content-moment story is authored. More meaningful cross-project relations need real archive records.
- Art direction, camera pace, typography and visual transitions must be reviewed from real rendered browser captures, not source-code confidence.
- Desktop + mobile browser, accessibility and real-world speed require independent acceptance.
- Publishing remains separate from approved final Darb experience.

## Next decisions / design engineering

- Visual QA of entry, 02, 04, 05, end, and free wander on desktop + mobile.
- Treat visible source photos as artwork-specific, not uniformly cropped rectangles; preserve native ratios and image-specific typography.
- Build camera movement around **narrative edges** once metadata provides richer authentic cross-project paths.
- Add occasional quiet detail, then scale inversion back to source constellation; test guided/free navigation continuity.
- Consider custom shaders, WebGL and image sprites **only where needed for performance or a distinctive interaction**; avoid recreating Getty's image sphere.

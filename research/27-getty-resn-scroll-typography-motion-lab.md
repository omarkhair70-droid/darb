# Stage 13 — Getty / Resn Tracing Art method, reverse-engineering LAB 02

**2 November 2026 · Source-based study, not Darb approved art direction**

The client rejected both previous homepage and image viewer, and specifically asked to actually understand **typography, composition, movement, interaction** in Getty, Oculi Mundi and other references, instead of collecting only generic words/photos. This lab is **not** a reproduction of Getty's original code/assets and not a complete Darb homepage. It is an experimentally measurable spatial-and-scroll composition.

## Confirmed maker evidence (vs our choices)
**Maker confirmed** (Communication Arts Getty/Resn case: https://www.commarts.com/project/38649/tracing-art ):
- A three-chapter provenance story based on complex Getty research, using ~400 Getty-supplied images and 16 collaborators over 13 weeks.
- GSAP ScrollTrigger coordinates scroll-based timeline events. Lenis supplied inertia-based scroll. three.js was used selectively for some custom particle/spritesheet scenes (artwork sphere).
- Makers prioritized an intuitive, meaningful relationship between complex evidence, pacing and visual clarity.

**Source screenshots**:
- https://www.commarts.com/project/38649/tracing-art (wave of varied painting thumbnails in a whitespace field, title separated into islands and archival captions)
- https://www.awwwards.com/tracing-art.html (mobile image river: winding sequence with scale changes, separate full-work scene and many-art constellation)
- https://www.getty.edu/tracingart/ (institution's live project + intro screenshots)
The *exact original* font files, path coordinates, easing curve, time values, breakpoints and private source code are **unverified**. The site may have changed since published screenshots. We do not assert that our values reproduce theirs.

## Composition anatomy translated into an original lab
**Reference visual grammar:** an undulating path of objects, unequal sizes, authored whitespace, very compact institutional mark, large restrained narrative type and tiny work/provenance caption roles. *Movement changes the relation the reader sees*.

**Our chosen reconstruction** (none of these are claimed Getty CSS):
- SVG curve `M 84 534 C 263 657 380 170 534 233 S 784 588 913 188` over a responsive field.
- Four heterogeneous content artifacts distributed on the curve, not copied paintings: film as typographic work, credited maker as source label, genuine small *Jusoor* programme mark from the commissioned Darb PDF p.9, and the institutional source-page numeral. No false movie stills.
- Native `position: sticky` scene across **four actual semantic `section`s**. We retain native scrolling and browser/keyboard access.
- `gsap/ScrollTrigger` measures progress and animates relative object scale, opacity, y-position and SVG stroke reveal. Scroll controls evidence exposure, not arbitrary image transitions.
- Experiment-owned type scale: serif for literary story/work names, a compact sans for documentary context, tiny mono for year/source/status, with separately authored AR/EN text. **NOT** Darb's selected typeface.
- A contextual four-stop chapter rail links to genuine sections `#film/#maker/#programme/#source`. The copy is **not** a scroll-jacked deck; each section exists as semantic HTML with direct index/work links.
- Responsive rules vary representation; mobile retains legible text, context labels and original document image with no horizontal clipping; reduced-motion removes nonessential transitions.

## Real source and relationship chain

1. FILM Braids of Identity / جدائل الهوية — director's film listed in Darb commissioned 2026 overview p.9; filmmaker text at https://www.sslh.info/ar/posts/braids-of-identity ; original official online video https://www.youtube.com/watch?v=hRO8xdEWCRA
2. FILMMAKER Hafsa Borai — director and researcher, also described in her own Africa Foto Fair profile https://africafotofair.com/aff25-participants-2/
3. PROGRAMME Jusoor — Darb Overview 2026, p.9 lists the film within the Sudanese shorts programme.
4. SOURCE commissioned Darb institutional 2026 overview, p.9. This is **not** a confirmed exact film screening date, a grant of film rehosting rights, or proof of a director-attended Q&A.

Routes to `/[lang]/works/braids-of-identity`, `/[lang]/people/hafsa-borai`, `/[lang]/projects/jusoor`, `/[lang]/archive` are existing real app routes. Typed evidence is in `site/src/content/artworks.json` and `evidence.json`. The active programme picture is an existing small image from the client's PDF, NOT a Getty image.

## Why this is not the same failed image viewer
- There is a physically connected curve evolving with scroll, not photo swapping by buttons.
- Graphic objects have different *types* and meanings; a film, person, programme and document can't be flattened to four generic crop cards.
- The visuals have a separate semantic narrative, with an explicitly source-supported change at each beat.
- Actual ScrollTrigger and responsive layout behavior are now visible and testable, including keyboard/deep link and reduced motion. Technical implementation alone STILL does not mean successful artistic design.

## Explicit research gaps, continuing checks
- This does not mimic Getty's **actual** font, precise motion timing or exact source code. Those must be inspected/verified before making equivalence claims.
- A truly authored interactive film moment would require filmmaker-curated scenes/timecodes, captions and licenses.
- A full Darb system cannot be declared complete from one lab. The rejected public-facing homepage remains unchanged.
- The lab route is `/ar/lab/getty-method` or `/en/lab/getty-method` on *protected* automatic Vercel Preview.
- Deploy and browser tests are reported **after** GitHub CI / Vercel actually complete, never before.

# Stage 14 — Imaginarium slow-looking/approach and fidelity laboratory
**2026-11-02 | Reference Lab 03, not approved Darb art direction.**

The commissioner wants actual typography, visual composition, spatial interaction and motion deconstructed and reproduced **mechanically**, not an archive of words, photos or design language applied identically across projects. This laboratory creates a working **threshold → approach → guided/free seeing → detail → context** system, independent from both prior rejected homepages and the Getty/Oculi labs.

## A. Verified makers' original methodology
Sources:
- Q42 original maker case: https://www.q42.nl/en/work/imaginarium-national-gallery
- Fabrique original creative case: https://www.fabrique.com/cases/museums-and-heritage/imaginarium/
- National Gallery's own description: https://www.nationalgallery.org.uk/visiting/virtual-gallery/national-gallery-imaginarium
- Micrio maker: https://micr.io/showcases/imaginarium

**Q42/Fabrique confirm**:
- Digital entry through a virtual version of NG's Room 36, then the space opens beyond real-world architecture; paintings float independently, spatial introduction gives way to imagination.
- Visitors may explore unguided OR follow a questions-driven route written by **actual National Gallery curators**. The questions—not 3D cosmetics—guide "slow looking".
- Selecting paintings approaches them; real high-resolution painting masters enable Micrio deep zoom. Some pieces have carefully curated AI motion/sound, with unsuccessful integrity-compromising animation rejected.
- Published tech: Three.js, React Three Fiber, Micrio, Sanity, Firebase. Verified curatorial contributors and artist sound/poetry; the National Gallery calls it both solo and group experience.

**Visible maker screenshot anatomy** (not source-computed CSS):
- An actual gallery threshold shifts to luminous dreamlike fields; artwork physical position/approach is part of the invitation.
- Art-first visual hierarchy: minimal UI labels, spatial paintings and dialogic text, no conventional image-card archive.
- In detailed view a small progress label is paired with prompts overlaying/adjacent to actual full painting; navigation must not block attention.
- **We have NOT measured** original Imaginarium camera values, typography font files, zoom limits, curator question text or exact animation easing. Those are not copied.

## B. What is *actually* implemented in Darb Lab 03
URL: \`/[lang]/lab/imaginarium-method\` (AR + EN). Under original protected Git-linked Vercel Preview; not indexed/public or approved site identity.

**Real limited source:** 2026 commissioned Darb Overview p.7, INBETWEEN: pdf_image_0360.jpeg (1920 × 1080) as an exhibition documentary view, pdf_image_0359.jpeg (1210 × 908) as a separate installation view. Both are programme **documentation**, NOT individual work records; artist identity, object size and photographer rights are unverified.

**Experience structure**
1. **Threshold** — an ABSTRACT atmospheric field with one photograph as an object in perspective; deliberately **not a reconstruction of the old Darb physical building**. Spatial layers, light and slight floating motion are the lab author's choices, not original Q42 assets.
2. **Choose guided vs free** — real functional branch; no fake curator voice. Clear distinct typography, hierarchy and movement.
3. **Approach** — the actual image becomes a large full view with no generated artwork or crop styling. Native CSS transform-origin focus point, visitor-controlled zoom from 100% to a strict 160% cap, click-to-change focus and keyboard zoom (plus/minus).
4. **Guided looking** — 3 source-agnostic **lab-authored observation questions**, explicitly labelled as written by the design lab, NOT Darb artists or National Gallery curators. They ask about looking and the limitations of photographic documentation; no invented artist intent.
5. **Context** — compare two distinct real documentary images from p.7 with separate sizes and labels, explain evidence limits, and link to verified Darb INBETWEEN project record. No Q&A claims, hi-res miracle zoom, soundscape or AI manipulation.
6. **Direct navigation** — URL query holds stage/mode/question; browser back restores previous state, full AR/EN and reduced-motion equivalents. A normal Darb archive route remains accessible.

## C. Typography & movement specimens are our own
- Entrance large literary serif and small documentary mono labels, with a separate RTL line-height and balance.
- The study/photo surface uses dark materials and a large original image rather than an invented wall or 3D fake canvas; 3D perspective and portal framing express *approach*, not the visual identity of Darb.
- LAB tokens (not the source site's): CSS perspective 1100px, portal drift 7s with alternate motion, entrance portal opening from off-axis rotateY(-13deg), image transform 650ms cubic-bezier(.2,.8,.15,1), GSAP prompts 550ms with power2.out, maximum photographic zoom 160%.
- Responsive layout turns threshold into a tall portal-over-text composition on 390px; looking becomes image above dialogue, not tiny side-by-side desktop panels. Content is accessible without any animation.

## D. Honest limitation and production gateway
This is NOT Imaginarium's deep zoom: no approved individual hi-res artwork master, so 160% is a small, source-respecting magnification of an already 1920px document. No commissioned curator authored these 3 prompts. We have not secured exhibition artists' commentary or republishing approval. No rehosted National Gallery art. No artist-approved soundtrack. No invented physical architecture.

**Production next:** get one fully attributed hi-res work or filmmaker-curated scene and deliberate guided prompts; investigate true master size and rights; then adapt these mechanics selectively with an art director in Darb's actual connected project/people/programme/source experience, rather than copying the whole lab page or its colors into the public site.

## E. Acceptance gates for this lab
- Working threshold → guided/free → detailed view → context flow with original media and source attribution.
- AR and EN, viewport 390/1440, keyboard, reduced-motion, fully user-started motion and no forced autoplay.
- Image zoom cap enforced; absence of confirmed work artist displayed rather than guessed.
- Browser QA screenshots / Playwright source graph checks, and Vercel READY before labeling deliverable verified.
- Qualitative art-direction review follows, because **green CI ≠ creative approval**.


## F. Actual screenshot review and honest visual assessment (after QA)

GitHub Actions run #41455145294 passed 52/52 Playwright tests, including AR/EN, desktop/mobile, guided/free paths, source-image loading, 160% zoom cap and reduced motion. Vercel Preview for code commit 865807ede3b5acf60e29f1d85d9c8a7103a5a8be reached READY. https://github.com/omarkhair70-droid/darb/actions/runs/41455145294

Screenshot review issue 1: first entrance-copy screenshot was captured partly translucent during GSAP reveal. The animation now begins at 88% opacity, and evidence capture waits for the settled state. Text is legible from the beginning.

Screenshot review issue 2: initial mobile context screenshot showed the second image as a dark rectangle because it was lazy loading at capture time. Browser tests now scroll to that image and wait for actual image naturalWidth > 0 for both authentic source photographs. The corrected screenshot shows both.

CRITICAL CREATIVE CRITIQUE: the threshold still reads as a large photograph adjacent to a large title. This resembles the same visual layout grammar rejected in Darb V1. DO NOT carry this entrance composition into the final public homepage. The valuable reusable part is progressive proximity, free/guided observation, bounded native zoom, evidence questions and source context. A distinctive artist-led threshold is still unresolved.

Green CI is not visual approval. No Q42/Fabrique original font or camera timing was claimed; artist/curator approvals, original artwork master rights and true institutional editing workflow remain separate gates.

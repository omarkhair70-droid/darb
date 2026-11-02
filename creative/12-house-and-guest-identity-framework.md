# Stage 05 — An editorial host, not a single template

**Status:** proposed experience-design principles for critique. **No code. No approved visual direction or component library.**

## Core problem
Darb's source shows unlike media next to one another: traditional craft, contemporary installation, cyanotype prints, films, participatory writing, music and multi-nation Something Else. Forcing them into one card template would erase distinctions; allowing every exhibition page an entirely custom UI would make the site hard to navigate and maintain.

## Strategic hypothesis — House & Guest identities
**The House** is the institutional wayfinding system (Darb signature, navigation, archive links, event status, venue, language, accessibility, credits). **The Guests** are artist/project identity expressions (their own photographs, artwork, exhibitions' original posters, typography and palette when licensed).

The House must **never fake artistic authorship**; The Guest must **never make it difficult to find practical programme information**.

### Fixed even when exhibition visuals vary
- Navigation labels and placement conventions across pages
- Arabic/English language switching and actual RTL layout
- Programmatic date/time/venue/status labels, captions/credits and legible registration links
- Access to What’s On, archive, visit/contact, opportunities, search
- Meaningful skip links, focus, captions/alt text, reduced-motion behavior
- Bilingual content models; publication and archive workflow
- Performance constraints and media fallbacks

### Flexible and authored per project
- Gallery/exhibition banner art, image proportion, background theme and artwork sequence
- Programme-specific cover poster, title lockup, curator essay
- Documentary storytelling rhythm and art-direction accent
- Optional interactive artifact zoom, sound or narrative chapter only when relevant
- Project-specific curatorial relationships/links

## A useful “2 speeds” hypothesis, test against audience interviews
**Speed 1: live practical access**, from every route:
- What’s On / upcoming with explicitly verified date and location
- Open calls / residency / workshop registration
- Contact / collaboration / venue rental (if confirmed)
- Visit (location must be verified post-2024)
- No forced loading intro, excessive scroll or immersive media dependency

**Speed 2: unhurried editorial exploration**
- One compelling real artifact leads into person, material, event, place
- Source narrative opens in a way that retains artwork context
- Go deeper into related programmes through explicit relationships
- Chronology when useful, not the only navigation or the hero idea

Neither speed is “the homepage”. Define the homepage's role only after a content and task audit.

## Structural content priorities from public Linktree (not live verified)
Public https://linktr.ee/darb1718 currently lists:
- weekly pottery workshop
- internship open call
- short film submissions
- artist residency application
- event hall rental
- UNSPOKEN and other cultural events
This is stronger evidence for purposeful website routes than a guessed museum navigation. **Do not present forms as currently open until their dates/status are checked.**

## Bilingual editorial tests — necessary before typography selection
### Test AR-01 — display scale and rhythm
- Long Arabic exhibition title with diacritics vs English condensed display
- Arabic numbers/date with 2026, Gregorian month, 12/24 hour format
- Artist names originally in Arabic vs romanized names, punctuation mixed RTL/LTR
- Allow independent line breaks; don't translate exactly by number of words
- Accessibility with 200% zoom and reduced width; native text, not image-based type

### Test AR-02 — caption and credits
- Artwork title, creator, year, medium, venue, photographic credit, consent notes
- Different reading order in AR/EN and inline Latin proper names
- Gallery hides no attribution when cropped; display link to full piece
- Mobile captions, bottom sheets and screen reader semantics

## Typographic system candidates (not fonts chosen)
- **Publisher:** calm institution labels and reading text; one contrast display face
- **Experimental festival:** bold exhibition headline where project owns it; quiet fixed utilities
- **Living documentary:** medium contrast and source-like captions/indices; spacing varies with scene

## Motion grammar deliberately restricted by meaning
1. **Attention:** zoom to an actual art detail when source resolution suffices.
2. **Relation:** visually connect two verified events/artists/places.
3. **Transition:** indicate context change, not draw attention to the animation.
4. **Process:** show transformation when the works actually document a process.
5. **Pause:** let photo and text become still, especially near artwork and accessible information.

No scrolling tricks or autoplay sound should block contact, registration, event date or artwork credits.

## Proposed first five content templates to critique (not implement)
- **Current programmes index**: active, upcoming, past; true status and clear next step.
- **Event detail**: art-first when appropriate, but with date/venue/access above the fold.
- **Artist/work**: artwork + verified authorship; project connections and media rights.
- **Editorial story**: image-led authored sequence with footnotes and skip/quiet mode.
- **Darb / People / Place**: institutional about, accurate history, present location state and credit roles.

## Practical interview to validate
1. Which 3 tasks produce the most public questions this month?
2. Which of the active forms can become directly managed by site CMS?
3. Are exhibition posters approved to be used as website color/layout skins?
4. Can the same content editor produce AR and EN on publication day?
5. Which of the 77 source photos do artists recognize, and which original high-resolution files exist?
6. Who approves curatorial attribution and photo use, including child/clinical workshop photos?
7. Which moments are worth an optional 3D/sound experience, and which are better left still?

## Evidence links
- [Source PDF pages & visual audit](../assets/visual-audit-77.md)
- [Darb Linktree programme/application links](https://linktr.ee/darb1718)
- [Khatt Foundation older description of art archive mission](https://www.khtt.net/en/page/14055/darb-1718)
- [Darb programme visual-identity archaeology](../research/visual-identity-archaeology-2022-2026.md)
- [Clyfford Still Museum process study](../references/deep-comparative-research.md)
- [Latcham Art Centre 2026 institutional web case and 80-exhibition archive](https://rgd.ca/articles/designing-for-the-spotlight-arts-and-culture-projects)

## Gate
Only after staff approves information priorities and art-credit rights do we define final design tokens, typography/font licensing, motion libraries or site implementation.

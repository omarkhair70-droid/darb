# 30 — DARB 1718 / THE OPEN FIELD
## First original, integrated art-direction proposal for the ACTUAL website (not a lab)

**02 Nov 2026 | Source-authored concept & implementation V01 | NOT signed off by Darb.**
**Creative direction:** Omar Khair / Khair Creative R&D **INTERNAL PROJECT CREDIT ONLY**, never represented as an official institution appointment or shipped as an intrusive signature in the public design.

### Why this is Darb-specific
Darb 1718's independent arts practice has lived through **Fustat crafts, film screenings and debates, international contemporary exhibitions, residency research, music and collective making**. Its 2026 institutional overview documents this breadth but does not supply a single complete work-by-work artist catalogue. Older institutional descriptions explicitly propose linking emerging artists with local craftspeople and building a research/archive platform. It would be artistically dishonest to establish ONE standardized poster or produce an invented exhibition room to represent everything.

The proposal is **THE OPEN FIELD / المجال المفتوح**: not a logo or a metaphorical 3D room, but a composition of source fragments that coexist without being homogenized. The institution is the **score / set of relationships**; artists and historical programmes are the individual authored works.

**The personal authored fingerprint** isn't a surface copied from another client: it is in sequencing, unequal power/scale and rhythm, truthful source identifiers, tension between institutional typographic order and artistic variety, and the refusal to flatten every project into another generic feature block. Do not paste Khair/Omar name over Darb's own identity.

### Real programmed encounter
**First desktop view = five simultaneous entry points, not a two-column hero or 3-photo viewer.**
- Tales of Fustat: source PDF p.11, *cyanotype/photographic workshop documentation*.
- INBETWEEN: original p.7 installation photo.
- Jusoor: actual p.9 graphic identity, not a random film still.
- Natalia Ossef Residency: original p.10 textile practice photo.
- Something Else 2023: original p.18/17 artwork installation documentation.
- All have **different size, overlap, angle, documentary source ID and route**, anchored by a giant typographic Darb 1718 field. Repetition is in the *source link behavior*, not rectangular cards. The foreground archive retains all artist/photographer credit uncertainty explicitly.
- Small pointer-responsive movement acts as **presence and attention**, not forced storytelling. The labels remain actual links even without animation; keyboard/reduced-motion and mobile must work.

**Second encounter = FOUR EDITORIAL VERBS**, not four random claims of affiliation:
- Hand = Tales of Fustat; Voice = Jusoor; Space = INBETWEEN; Question = Something Else. They are **editorial routes, NOT official categories or an assertion that these artists worked together**.
- Use large typographic word-role, actual programme title and source ID. Unequal media placement resists a repeated portfolio card.
- The member’s specific genre is still accessible from source/records.

**Third encounter = FILM provenance slice**: Braids of Identity by Hafsa Borai, film → filmmaker → Jusoor programme. Links to existing verified work and official publisher player. No extracted movie still/clip, no invented attendance or screening date. Its genuine green programme graphic is used as its own identity, not appropriated as Darb's website brand.

**Fourth = direct participation / access**: archived programme status and official Linktree for possible activities, with an explicit note that current deadlines, venue and acceptance are not verified. Avoid old address or fabricated "Open Now".

### Typographic decisions (THIS prototype, not eternal brand standards)
- Large institutional typography is a **spatial anchor** (oversized 'DARB / 17·18'), not a marketing slogan occupying a conventional left hero.
- Alphabetic roles: bold Latin/Arabic for expressive terms, micro monospaced source/page/year identifiers for the evidence layer, real programme names keep their own voice.
- Two languages have independently tested wrapping and positioning; do not treat AR as a flipped EN layout.
- Large *hidden* institution headings are prohibited: primary identity is a visible semantic H1, even when partly obscured by artwork in the composition.
- Font stack remains browser-native for this iteration because an officially approved Arabic/Latin mark and type license are still missing; **these exact fallback families are not a final Darb font specification**.

### Motion grammar & why these tools
- GSAP entrance choreographs five real objects, a one-time spatial arrival rather than repeating identical fade animations on every item.
- Pointer drift is deliberately small (single-digits to teen px; no fake movement inside individual artworks). No forced playback, no scroll hijack, no compulsory WebGL/Three.js.
- CSS hover/provenance and anchor navigation remain accessible and fast.
- Oculi/GGetty/Imaginarium labs are SOURCE STUDIES; none of their complete scene backgrounds, fonts, room or gallery is copied into this public-facing proposal.
- The institution archive gets a **functional index** with fuller typographic scale and responsive visual source marks, and project detail gets a **single large original document view** with source notes beneath. The film route retains its own medium-native dark playback presentation. These are not the same page repeated with different photos.

### Exactly where implemented
- ACTUAL homepage: \`site/src/app/[lang]/page.tsx\` / \`site/src/app/[lang]/entry.css\`.
- Kinetic multi-source field: \`site/src/components/darb-open-field.tsx\`.
- Institution header, archive and exhibition source-room visual continuity: \`site/src/app/darb-direction-v01.css\`, imported after functional earlier CSS from \`site/src/app/[lang]/layout.tsx\`.
- Content: \`site/src/content/records.json\` via the approved-record fallback in \`site/src/lib/sanity-source.ts\`, \`site/src/content/artworks.json\` and source-derived images \`site/public/media\` prepared from user-supplied 2026 PDF.
- All previous labs and original documents preserved: \`creative/29-CREATIVE-INTEGRATION-ATLAS.md\` + \`/[lang]/lab\`.
- Draft PR #2 remains Draft, Vercel preview is protected; not a published/official new Darb website.

### What to evaluate visually, not via green CI alone
1. **First 3 seconds:** Does it feel like a cultural field with distinct media, not a design agency homepage? No single generic photo sits next to a long headline.
2. **Attention:** Can you tell apart the 5 source documents immediately? Does the actual Jusoor programme graphic remain identifiable? Do labels obscure authentic images on 390px?
3. **Typographic authorship:** Is the huge institutional type a good *supporting skeleton* rather than overwhelming actual artists? Does Arabic avoid collisions with documented material? Is hierarchy strong but not oppressive?
4. **Motion:** Do rotations and pointer shifts add orientation rather than visual noise? Is reduced motion equally good?
5. **Whole-site flow:** Can a visitor go from source fragment to programme, film and director, and then research index / actual institution channels without getting trapped in a cinematic portal?
6. **Source ethics:** Did we avoid claiming that a historic event is happening this week, a former venue is open, a photographed work belongs to an unverified artist, or a film is ours to redistribute?
7. **Legibility:** Mobile 320/390, desktop 1440, keyboard, semantic heading, tap targets, contrast and image loading.

### Open issues / strict acceptance gate
- Some PDF media are low resolution or unclear credit. This prototype is commissioner-only until rights and original high-res files are cleared.
- We have not established current open venue/official mark, current events and exact programme dates for the film. The old Darb logo was not replaced.
- This is the **first actual visual direction we should critique**, not claim approved. Source and research decisions can be reused even if the proposed visual composition is judged weak. Feedback should be on rhythm, attention, hierarchy, typography, source integrity, Arabic and the visual relation of the five practices.
- Next: inspect authentic desktop/mobile screenshots, improve composition and motion; compare against user’s rejected Fokhara-ish homepage **before** merging or declaring the final art direction.

**Decision: no Lab 04; creative integration is occurring in actual public routes now.**

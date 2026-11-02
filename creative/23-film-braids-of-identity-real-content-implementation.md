# Stage 11 — First genuinely sourced film in Darb's content graph

**Research/implementation 2026-11-02. Draft PR #2 / protected Git-linked Vercel Preview only. NOT a client-approved art direction or public launch.**

## New rights-aware media discovery
1. Full documentary film 'Braids Of Identity | جدائل الهوية' by original publisher [Safeguarding Sudan's Living Heritage](https://www.youtube.com/watch?v=hRO8xdEWCRA), uploaded 2025-02-15. This is a publisher-controlled video, not a license to download, edit or rehost.
2. Named filmmaker/researcher حفصة برعي / Hafsa Borai, credited by [SSLH Museum Arabic](https://www.sslh.info/ar/posts/braids-of-identity) and [English](https://www.sslh.info/en/posts/braids-of-identity), explaining Sudanese mashat hair braiding, collective memory and social/economic heritage.
3. [Africa Foto Fair — Hafsa Boraei Mohammed](https://africafotofair.com/aff25-participants-2/) contains the filmmaker's own artist statement connecting the film to Sudan/Cairo, displacement and belonging. Our site offers a labelled paraphrase and a source link, not a quote from footage or an invented scene.
4. Client-supplied 2026 Darb Overview p.9 independently documents the same film/maker under Jusoor.

## Source-backed relationship graph
- FILM braids-of-identity -> director/researcher PERSON hafsa-borai (SSLH, Africa Foto Fair)
- FILM braids-of-identity -> PROGRAMME jusoor (Darb PDF p.9)
- FILM braids-of-identity -> SUBJECT traditional Sudanese mashat craft (SSLH filmmaker text)
- FILM braids-of-identity -> VIDEO publisher's official YouTube video (not a local movie file)
- Dukhan, The Last Henna and Motive are separate named film/maker records within the same Jusoor programme, with no fake synopsis, videos, exact times or dates.

## What was actually added in working application
- Canonical source-aware structured data: site/src/content/artworks.json, people.json, evidence.json and site/src/lib/work-graph.ts.
- Real /ar/works/[slug] and /en/works/[slug] documentary pages: attribution, film context, visitor-controlled official YouTube player on click, source/evidence ledger, maker, Jusoor and peer film cross-links.
- Real /ar/people/[id] and /en/people/[id] contribution pages, no unsourced biographies.
- Jusoor programme and index route link to actual film records instead of solely generic project photos.
- Draft Sanity schemas for film/contribution editorial approval and rights.
- Node data-integrity validation and Playwright checks for source graph, bilingual routes, publisher iframe and no claimed screening date.

## Rights and source date caveats
- The Arabic/English SSLH article pages have inconsistent date variants (18 June and 25 June 2025 in cached/live versions). Do not assert a single date for that article; it is NOT the date of the film upload.
- The SSLH article cover photograph is credited © أماني بشير / Amani Basheer, and should NOT be called the film cinematographer or presumed licensed for Darb.
- Player is a privacy-enhanced official YouTube embed that loads only on a visitor click. If the publisher blocks embedding, the direct original YouTube link remains accessible. No local downloading, restyling of film frames, altered clips, screenshots, automatic autoplay or implied permission to use promotional stills.
- The exact Darb screening date and venue, audience discussion participation, current film call status, clip subtitles/timecodes, and remaining film credit list are NOT confirmed.
- The public film page is a technical research preview behind Vercel Authentication, NOT Darb's approved published artist record.

## Next source/creative gate
Acquire a filmmaker-approved source packet: official credits, subtitles/transcript, 2–3 verified scene/timecode details, sanctioned still and film-specific viewing question, actual venue/date and publishing rights. Then develop a distinct cinematic interaction based on the TRUE film content while connecting work/person/programme/action to the whole site. This first real film entity is meaningful progress but NOT the creative resolution of the overall website.

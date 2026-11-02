# Experience architecture v0.1 — public site and special editorial chapters

**This is a proposed IA for discussion. Routes are provisional.**

## Layer 1 — utility, always reachable
- **What's on / الآن**: now / upcoming events, date, location, category, clear status, RSVP / partner event links.
- **Explore / اكتشف**: editorial stories, exhibitions, artists, film, music, workshops, residencies.
- **Darb / عن درب**: identity, ethos, timeline, people, place, 2008–2026 history.
- **Opportunities / شارك**: artist residency, open calls, workshop application, collaboration.
- **Visit & contact / الزيارة والتواصل**: verified current physical site, access, hours and public contacts.
- Language toggle AR / EN; search; direct page deep linking.

## Layer 2 — editorial experience (suggested)
- Main entry: genuine work hero / live activities / visual fragments and one curatorial line.
- **Chapter: Where it began**: Fustat and craftsmen; photographic narrative with attributions.
- **Chapter: Gatherings**: performances, film, oral history, interactions.
- **Chapter: Experiments**: contemporary installations, multidisciplinary creation.
- **Chapter: Disruptions and continuities**: 2023–24 timeline, documented demolition, 2025–26 programmes, with nuance.
- **Chapter: What comes next**: current artists, opportunities and ways to participate.

## Layer 3 — linked editorial archive
Core models:
- **Project / Exhibition** {id, names ar/en, start/end, venue, status, disciplines[], intro, long story, artist IDs[], object IDs[], gallery[], related events, curator, source, credits}
- **Person** {id, public display name ar/en, pronouns if approved, public role, works[], projects[], photo consent, contact policy}
- **Media** {id, file/source, date, caption ar/en, alt ar/en, author, subject, context, permission, crop variants, sensitive consent, rights expiry}
- **Event** {id, dates/times timezone, location, accessibility, registration URL, capacity if known, status, associated project, image}
- **Story / Chapter** {id, title, editorial beats[], evidence[], authors, publication state, related people/events/artworks}
- **Place** {id, historical/current flag, verified address, accessibility and update date}
- **Open call** {id, eligibility, opening/closing, instructions, contact, status, owner}
- **Source** {id, citation URL/file, organization, published/observed, confidence, claim IDs}

Routes (all bilingual): `/en/`, `/ar/`, `/en/whats-on/`, `/en/people/`, `/en/stories/`, `/en/archive/`, `/en/archive/[slug]/`, `/en/opportunities/`, `/en/about/`, `/en/visit/`.

## Experience rules
- No story is a gate: immediate utility access, skip intro, keyboard paths and static/transcript alternative.
- Stories permit non-linear entrances and easy exit.
- Artworks/photo pages require caption and credits; gallery order is authored.
- Programmes are **not** PDFs-only: extract editorial content while retaining PDF download.
- No login for visitors without an actual product requirement.
- Search by person, place, discipline, time and programme; semantic AI search not assumed.

## Critical unanswered decisions
- What is physically open now? Which events happen at Darb vs partner venues?
- Are programmes published by team or external forms? Do partner venue pages accept bookings?
- Public donation flow, online ticketing, non-profit reporting?
- Exact archive depth and older years' photos/metadata.
- Content language translation ownership and ethical photo approvals.

# Darb Archive — the voice trapped inside writing

**Creative direction chosen in conversation · 11 November 2026**  
**Status:** first coded scene study; final motion/visual/audio direction **not approved**  
**Scope:** #44 `A Room of One's Own` → #47 `Voice in Motion`, an **editorial comparison** between distinct programmes, not a documented connection, participant experience, historical sequence, or co-authorship claim.

## The decisive idea
The writing does **not** smoothly transform into sound. The voice is already concealed inside the writing, constrained and almost suffocated; something tries to get free.

This interpretation is **a metaphor authored by the artistic collaboration**, not a claim that the people in the photographs felt silenced or trapped. Do not invent quotes, biographies, pain, or context for the archive participants.

## Visitor's timeline

### 0–650 ms | Held
- The original #44 source photograph remains intact and readable.
- The camera holds its location.
- At the photograph's spatial center, several fine imperfect hairlines press together. Very little of the long relationship is disclosed.
- An intimate light contraction suggests pressure, not aggressive image manipulation.
- No explanatory text overlay, instruction, fake archival audio, or dramatic scream.

### 650–950 ms | Strain
- The lines push out, retract, and hesitate, rather than simply stretching from A to B.
- The frame still refuses to depart. The visitor senses effort without being told what it means.
- No fake kinetic typography; do not make the faces of participants contort.

### 950–3000 ms | Release
- One mark reaches farther; the others find their way.
- The camera finally starts moving toward actual #47's archive coordinates.
- The color and visual density lighten. This should register as breathing room, not an explosion.
- The last image is the actual unchanged source photograph from Voice in Motion, and the provenance is readable when requested.

## Current implementation
- `src/editorial-resonance.mjs`: a pure source-grounded score and shared dramaturgical timing.
- `web/app.mjs`: held-camera beat, explicit visual phases, reversible encounter, disabled-motion immediate transition, interruption protection.
- `web/styles.css`: slow staged stroke revelation and lighting changes; source photography is not altered.
- `e2e/editorial-resonance.spec.mjs`: real-camera linking, source evidence, phase visibility, no overlay caption and mobile/desktop capture.

## Nonnegotiable edit
**Artwork first; caption second; archive information on request.** `ABOUT THIS IMAGE` must be readable on mobile and RTL without stacking over image/related art; this is tracked in Issue #8. Do not add a full-page `What this transition means` panel.

## Next art review
- Does it feel like pressure, or just a very slow line-drawing effect?
- Is 950 ms of withholding enough? Does the breath arrive too quickly on an actual phone?
- Is the camera release earned by the mark or just mechanically delayed?
- Does anything resemble a fictional claim about programme participants?
- Can visitors reverse or interrupt without old image/motion ghosts?
- Could a sound element add meaning **only if designed as original interpretive sound** (not falsely labeled archive audio)? Silence remains a complete option.
- Are there optical collisions at 320–430 px and in Arabic?

**Release gate:** Full CI passing, three mid-motion captures per device reviewed, then specific visual approval; keep main Production untouched until then.

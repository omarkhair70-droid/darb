# Darb Archive / Story Proof 001 — Tales of Fustat / حكاوي الفسطاط
**Date:** 2026-11-09
**Stage:** Source-backed story specification, not an approved or built frontend.
**Source:** supplied *Darb 1718 Overview 2026*, p.11; cross-indexed in `source-material/overview-2026.md`, `research/programmes-2025-2026.md`, `assets/visual-audit-77.csv`.

## Why this material?
Tales of Fustat offers more than a gallery: the supplied Darb overview documents neighborhood photo walking, meeting and interviewing craftspeople, photography, cyanotype, and hand-printed notebooks with stories. Images show several different stages of cultural creation. We can **curate** a coherent journey across media without pretending the supplied photos prove a chronological sequence or the identity of participants.

## Evidence records
| Source asset ID | PDF page / XREF | Image audit description | Proposed editorial role | Publication gate |
|---|---|---|---|---|
| 39 | 11 / 400 | Group interviews and conversation in open courtyard | Encounter / listening | Verify individual consent, names, exact courtyard |
| 40 | 11 / 401 | Seated group at photography workshop | Participation / looking | Participant consent, activity label |
| 41 | 11 / 402 | Blue cyanotype image of craft form | Object / image transformation | Maker, original print provenance, rights |
| 42 | 11 / 403 | Cyanotype sheets, photos and notebooks | Material record / printed stories | Makers, object captions, rights |

Image IDs refer to archived PDF objects, **not** approved image credits, verified portraits, or high-resolution assets. Do not crop artwork destructively.

## Explicit nodes and verified connections
- `project:tales-of-fustat`: named Darb programme, source p.11.
- `practice:photowalk-interview`: documented project activity, source p.11.
- `practice:cyanotype`: documented two-session workshop technique, source p.11.
- `object:printed-notebooks`: documented outputs, source p.11.
- `place:fustat-neighborhood`: documented neighborhood context, **not** proof of precise location for photo #39.
Edges from **project → practices/outputs/place** are documented at programme level.  
Links between **specific image → specific person, maker, individual artwork, event day or venue** remain unverified. No maker/person profiles should be generated from photos.

## Sequence 001 — authored storyboard, bilingual draft
These are editorial lines, not quotations or factual claims about named people.

1. **A neighbourhood holds stories. / الحي مليان حكايات.**
   Start with a breathing composition of authentic neighborhood/documentary imagery. Asset #39 is an option, pending clearances. No fake streetscape or digitally manufactured faces.
2. **A conversation becomes a record. / من الكلام تبدأ الذاكرة.**
   Invite the visitor to explore the programme's photo walk and interviews, then reveal asset #40 in the correct caption context. Transition signals a change of perspective, not an assertion that these images are one continuous filmed event.
3. **Light leaves a trace. / الضوء بيسيب أثر.**
   Move from photographic documentation to cyanotype as an artistic technique; hold asset #41 still with full caption and maker credit. If assets are not clearable, use a labeled production-study placeholder, not a forged artwork.
4. **The record becomes tangible. / والذكرى تبقى حاجة نلمسها.**
   Explore photo prints and notebooks represented in asset #42, allowing material-level detail where source resolution supports it.
5. **Where does this lead? / والخيط ده يودّينا فين؟**
   Offer two substantiated paths: back through documented **Tales of Fustat** objects or a neutral explore-projects landing. Any cross-project link must have its own evidentiary label and must not imply a relationship not proven by sources.

### Core interaction study
**The Thread** should express connections through transitions that preserve orientation:
- enter one object; a discreet thread indicates its related programme;
- expand programme activities with traceable source labels;
- follow a practice to one or more correctly credited outcomes;
- keep backtracking, browse-all, AR/EN, low-motion and keyboard paths;
- include an evidence panel per node (source PDF p.11 / asset # / metadata confidence).
The visual signature is yet to be designed. No Getty ribbon imitation; no compulsory cinematic loader; no click-to-fade slides disguised as an archive.

## Data entries / editorial status
```json
{
  "storyId": "tales-of-fustat-001",
  "title": {"en":"Tales of Fustat","ar":"حكاوي الفسطاط"},
  "source": {"document":"Darb 1718 Overview 2026","page":11},
  "documentedNodeIds": ["project:tales-of-fustat","practice:photowalk-interview","practice:cyanotype","object:printed-notebooks","place:fustat-neighborhood"],
  "archiveMediaIds":[39,40,41,42],
  "publicRelease":"blocked-pending-credit-consent-resolution",
  "dateOfProgramme":"unverified",
  "currentVenue":"unverified"
}
```

## What this proof can and cannot establish
**Established**: programme exists in supplied institutional source; four relevant image objects; craftspeople interviews, cyanotype and printed story notebooks are described at project level.  
**Not established**: individuals' names, exact itinerary, chronological photography sequence, precise date/location per frame, rights to publicly display each specific image, high-resolution originals.
**Not approved**: story headline, translation, motion, visual art direction or public deployment.

## Next production gate
1. Retrieve originals of images 39–42 and inspect resolution (not just PDF extracts).
2. Confirm captions, author names, depiction permissions, individual workshop identities with Darb.
3. Produce a verified relationship graph and explicit source-to-edge table.
4. Validate an AR/EN narration transcript and one no-motion user journey.
5. Then prototype the single journey's **interaction**, comparing SVG/DOM and GPU options for artistic necessity, not just technical novelty.

## Readout
This is a **story specification with identified assets and uncertainty**, not yet the fully substantiated three-to-six-node *person/work/place* path envisioned by the foundation. It deliberately withholds unsupported person edges until they can be evidenced.

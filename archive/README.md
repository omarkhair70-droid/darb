# Darb Archive — The Living Memory

A separate, bilingual, interactive cultural archive. Its first **running research experience** is Tales of Fustat; it does not replace the institutional Darb website, and this experience is **not a final Getty-level release**.

## Run

```sh
cd archive
npm run check
npm run dev
# http://localhost:4173
```

Uses Node >=22.12; no runtime dependencies. `npm run build` generates `dist/` and copies original media #39–42 from the repository into the static output. For Vercel set **Root Directory: archive**, framework Other, build `npm run build`, output `dist`. The research deployment is protected by Vercel Authentication.

## What is built

- `web/index.html`, `web/styles.css`, `web/app.mjs`: a five-beat editorial scroll experience with actual archival media and distinct compositional states; click any source image to open its graph context.
- **Story / Trace**: related but distinct modes; spatial connection map with source-backed relationships, navigation, reversibility and inspector.
- Arabic/English toggle with bilingual narrative/data; reduced-motion toggle; responsive stage layout and keyboard-enabled source exploration.
- `data/tales-of-fustat-001.json`: programme-level evidence graph (10 nodes, 9 documented edges, 5 editorial story beats), original PDF page/media IDs.
- `src/graph.mjs`: validated and reversible navigation, references and public-data status controls.
- `tests/`: source-link, media, accessibility-contract and graph guardrail tests.
- `QUALITY_GATE.md`: Getty/Resn production standard and unpassed art-direction/QA gates.

## What is *not* claimed

This is the first custom interactive experience, **not** a finished visual system nor Getty parity. The original site stage 08/09 remains rejected and untouched. The design awaits visual comparison on desktop/mobile, interaction polish, actual curatorial art direction, high-resolution media and publication approvals. Programme-level edges cannot establish named artist-to-work authorship, participant identities or photo chronology.

No final site domain has been transferred; no mainstream public launch is authorized. Continue on the research branch until artistic and technical review.

# Darb Archive — The Living Memory
An **independent interactive archive**, not the institutional Darb website, and not a re-skin of an existing rejected prototype.

Current status: an **experimental, source-linked narrative kernel**, not a public-facing website. Work proceeds on a dedicated research branch; do not deploy as Darb's official archive without curatorial, rights and technical acceptance.

## Current proof
- \`data/tales-of-fustat-001.json\`: bilingual source graph (project, place, activities, outcome, four PDF-linked media entries), five editorial story beats, explicit research/rights statuses.
- \`src/graph.mjs\`: validation, evidence-only relationship navigation, backtracking and search for traceable connection paths.
- \`tests/graph.test.mjs\`: evidence, source integrity, bilingual coverage, rights gating, reversible traversal.
- \`QUALITY_GATE.md\`: creative and engineering acceptance contract benchmarked against Getty/Resn.

## Run the data-level tests
\`\`\`sh
cd archive
node --version # >= 22.12
npm test
\`\`\`
No install or runtime dependencies required.

## Boundaries
Graph connections are programme-level evidence. They are **not** proof that two pictured people know each other, that someone made an artwork, or that individual images are in chronological order. All supplied image extracts currently have public-display blocked pending granular credits/consent/high-resolution checks. The archive source programme is undated in the supplied reference; do not invent dates.

This module is an early *functional* content/traversal foundation. A full bespoke interface, scroll choreography, art direction, mobile behavior and public launch are **not yet implemented**. Never describe a passing content test as Getty-level visual quality.

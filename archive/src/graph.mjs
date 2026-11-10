// Darb Archive — source-aware narrative graph kernel.
// No framework or visual dependency. An edge is evidence, not an animation cue.
export const LANGUAGES = ["ar", "en"];

function localized(value) {
  return value && LANGUAGES.every((lang) => typeof value[lang] === "string" && value[lang].trim());
}

export function isPublicNode(node) {
  if (node.publication !== "published") return false;
  if (node.type !== "media") return true;
  const media = node.media ?? {};
  return media.publicDisplay === true
    && media.credit !== "unverified"
    && media.consent === "cleared"
    && media.rightsReview === "cleared";
}

export function validateArchive(archive) {
  const errors = [];
  if (archive?.schemaVersion !== 1) errors.push("Unsupported archive schema version");
  const nodes = archive?.nodes ?? [];
  const edges = archive?.edges ?? [];
  const sources = archive?.sourceRegistry ?? [];
  const steps = archive?.storySteps ?? [];
  const nodeIds = new Set(), sourceIds = new Set(), edgeIds = new Set(), stepIds = new Set();

  for (const source of sources) {
    if (!source.id || sourceIds.has(source.id)) errors.push("Missing or duplicate source: " + source.id);
    sourceIds.add(source.id);
  }

  for (const node of nodes) {
    if (!node.id || nodeIds.has(node.id)) errors.push("Missing or duplicate node: " + node.id);
    nodeIds.add(node.id);
    if (!localized(node.title)) errors.push("Missing AR/EN node title: " + node.id);
    if (!Array.isArray(node.evidence) || node.evidence.length === 0) errors.push("No node evidence: " + node.id);
    for (const ref of node.evidence ?? []) if (!sourceIds.has(ref)) errors.push("Unknown node source " + ref + ": " + node.id);
    if (node.type === "media" && node.media?.publicDisplay && !isPublicNode(node)) {
      errors.push("Media publicDisplay without full publication clearance: " + node.id);
    }
  }

  for (const edge of edges) {
    if (!edge.id || edgeIds.has(edge.id)) errors.push("Missing or duplicate edge: " + edge.id);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) errors.push("Broken relationship: " + edge.id);
    if (!localized(edge.label)) errors.push("Missing AR/EN relationship label: " + edge.id);
    if (!Array.isArray(edge.evidence) || edge.evidence.length === 0) errors.push("No relationship evidence: " + edge.id);
    for (const ref of edge.evidence ?? []) if (!sourceIds.has(ref)) errors.push("Unknown edge source " + ref + ": " + edge.id);
    if (!["documented-at-programme-level", "curated-interpretation"].includes(edge.certainty)) {
      errors.push("Unlabelled relationship certainty: " + edge.id);
    }
    if (edge.certainty === "curated-interpretation" && !edge.editorialAuthor) {
      errors.push("Curatorial connection needs an author: " + edge.id);
    }
  }

  for (const step of steps) {
    if (!step.id || stepIds.has(step.id)) errors.push("Missing or duplicate story beat: " + step.id);
    stepIds.add(step.id);
    if (!nodeIds.has(step.focus) || (step.media && !nodeIds.has(step.media))) errors.push("Unresolved story beat reference: " + step.id);
    if (!localized(step.heading) || !localized(step.body)) errors.push("Missing bilingual story beat: " + step.id);
    if (!step.interaction || !step.quietMode) errors.push("Missing interaction or quiet alternative: " + step.id);
  }
  return errors;
}

function allowed(node, publicMode) {
  return !!node && (!publicMode || isPublicNode(node));
}

export function getConnections(archive, nodeId, {publicMode = false} = {}) {
  const nodeMap = new Map(archive.nodes.map((node) => [node.id, node]));
  if (!allowed(nodeMap.get(nodeId), publicMode)) return [];
  return archive.edges.flatMap((edge) => {
    if (edge.from !== nodeId && edge.to !== nodeId) return [];
    const targetId = edge.from === nodeId ? edge.to : edge.from;
    if (!allowed(nodeMap.get(targetId), publicMode)) return [];
    if (publicMode && edge.publication !== "published") return [];
    return [{edgeId: edge.id, from: nodeId, to: targetId, relation: edge.relation,
      label: edge.label, certainty: edge.certainty, evidence: [...edge.evidence]}];
  });
}

// Returns an *evidence trail*, never a claim that the start and end are directly linked.
export function findEvidencePath(archive, startId, endId, opts = {}) {
  if (startId === endId) return archive.nodes.some((n) => n.id === startId && allowed(n, opts.publicMode ?? false)) ? {nodes:[startId],connections:[]} : null;
  const queue = [{at:startId, nodes:[startId], connections:[]}];
  const visited = new Set([startId]);
  while (queue.length) {
    const current = queue.shift();
    for (const connection of getConnections(archive, current.at, opts)) {
      if (visited.has(connection.to)) continue;
      const next = {at:connection.to, nodes:[...current.nodes, connection.to],
        connections:[...current.connections, connection]};
      if (connection.to === endId) return {nodes:next.nodes, connections:next.connections};
      visited.add(connection.to);
      queue.push(next);
    }
  }
  return null;
}

export function startVisit(archive, startId = "project:tales", opts = {}) {
  const node = archive.nodes.find((entry) => entry.id === startId);
  if (!allowed(node, opts.publicMode ?? false)) throw new Error("Unpublished or unknown entry node: " + startId);
  return {current:startId, history:[startId], followed:[], publicMode:opts.publicMode ?? false};
}

export function followEdge(archive, session, edgeId) {
  const connection = getConnections(archive, session.current, {publicMode:session.publicMode})
    .find((candidate) => candidate.edgeId === edgeId);
  if (!connection) throw new Error("Cannot follow unverified or unavailable edge: " + edgeId);
  return {...session, current:connection.to, history:[...session.history, connection.to],
    followed:[...session.followed, connection]};
}

export function retrace(session) {
  if (session.history.length <= 1) return session;
  const history = session.history.slice(0, -1);
  return {...session, current:history.at(-1), history, followed:session.followed.slice(0, -1)};
}

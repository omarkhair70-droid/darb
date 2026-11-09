import test from "node:test";
import assert from "node:assert/strict";
import archive from "../data/tales-of-fustat-001.json" with {type:"json"};
import {validateArchive,isPublicNode,getConnections,findEvidencePath,startVisit,followEdge,retrace} from "../src/graph.mjs";

test("first story graph is consistent, sourced and bilingual", () => {
  assert.deepEqual(validateArchive(archive), []);
  assert.equal(archive.nodes.length, 10);
  assert.equal(archive.edges.length, 9);
  assert.equal(archive.storySteps.length, 5);
});

test("all image records point to actual PDF objects 400–403", () => {
  assert.deepEqual(
    archive.nodes.filter(n => n.type === "media").map(n => n.media.pdfXref),
    [400,401,402,403]
  );
});

test("media stays hidden without photographer/subject/rights clearance", () => {
  for (const node of archive.nodes.filter(n => n.type === "media")) {
    assert.equal(isPublicNode(node), false);
    assert.equal(node.media.publicDisplay, false);
  }
  assert.equal(getConnections(archive,"project:tales",{publicMode:true}).length,0);
});

test("reader can trace media 39 to media 42 only through evidenced programme", () => {
  const path = findEvidencePath(archive, "media:39","media:42");
  assert.deepEqual(path.nodes,["media:39","project:tales","media:42"]);
  assert.deepEqual(path.connections.map(c=>c.edgeId),["media-39","media-42"]);
  assert.ok(path.connections.every(c=>c.evidence.length>=1));
});

test("reader cannot jump to an unconnected or invented artist", () => {
  assert.equal(findEvidencePath(archive,"media:39","person:invented"),null);
  const visit = startVisit(archive);
  assert.throws(()=>followEdge(archive,visit,"made-up-edge"),/Cannot follow/);
});

test("navigation follows verified connections and can retrace", () => {
  const begin = startVisit(archive,"media:39");
  const project = followEdge(archive,begin,"media-39");
  assert.equal(project.current,"project:tales");
  const interview = followEdge(archive,project,"e3");
  assert.equal(interview.current,"practice:interviews");
  assert.equal(retrace(interview).current,"project:tales");
  assert.equal(retrace(retrace(interview)).current,"media:39");
});

test("missing evidence prevents validation", () => {
  const invalid=structuredClone(archive);
  invalid.edges[0].evidence=["invented-source"];
  assert.ok(validateArchive(invalid).some(err=>err.includes("Unknown edge source")));
});

test("cannot publish image by flipping its display flag", () => {
  const invalid=structuredClone(archive);
  invalid.nodes.find(n=>n.id==="media:41").media.publicDisplay=true;
  assert.ok(validateArchive(invalid).some(err=>err.includes("publication clearance")));
});

test("all five story beats provide non-motion reading routes", () => {
  for (const step of archive.storySteps) {
    assert.ok(step.heading.ar && step.heading.en && step.body.ar && step.body.en);
    assert.ok(step.quietMode && step.interaction);
  }
});

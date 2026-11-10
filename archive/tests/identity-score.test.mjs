import test from "node:test";
import assert from "node:assert/strict";
import {IDENTITY_LENSES,createIdentityLenses,discoveredIdentityLenses,identityViewAlignment} from "../src/identity-score.mjs";
const identities=[
 [46,"room",120,170],[44,"room",200,100],[43,"room",260,190],[45,"room",330,205],
 [7,"practices",500,110],[39,"fustat",700,150],[41,"fustat",850,150],[35,"residency",1060,150],
 [47,"voice",1290,120],[48,"voice",1390,180],[49,"voice",1530,200],[50,"voice",1490,100],
 [53,"symposium",300,1100],[61,"citadel",450,1350],[62,"citadel",250,1300],
 [60,"citadel",300,1220],[58,"citadel",400,1210],[69,"citadel",350,1530]
];
const objects=identities.map(([id,cluster,x,y])=>({id,cluster,x,y,w:80,h:60}));
const connections=[
 ["makers",7,39,"practices","fustat"],
 ["material",41,35,"fustat","residency"],
 ["voice",44,47,"room","voice"],
 ["something-else",53,61,"symposium","citadel"]
].map(([id,fromId,toId,fromCluster,toCluster])=>({
  id,fromId,toId,fromCluster,toCluster,type:"editorial-comparison",sourcePages:[3,11]
}));
test("all four readings are rooted in existing objects, never typographic paths",()=>{
  const lenses=createIdentityLenses(objects,{connections});
  assert.deepEqual(lenses.map(x=>x.key),["D","A","R","B"]);
  for(const lens of lenses){
    assert.ok(lens.segments.length>=3);
    assert.ok(lens.bounds.width>0&&lens.bounds.height>0);
    assert.ok(lens.segments.every(edge=>edge.fromPosition&&edge.toPosition));
    assert.ok(lens.segments.every(edge=>edge.kind==="shared-programme"||edge.kind==="editorial-comparison"));
  }
  assert.equal(JSON.stringify(IDENTITY_LENSES).includes("svgPath"),false);
});
test("all four readings require a personal visit, with no imposed sequence",()=>{
  const lenses=createIdentityLenses(objects,{connections});
  assert.deepEqual(discoveredIdentityLenses(lenses,[]),[]);
  assert.deepEqual(discoveredIdentityLenses(lenses,[53,61,44,46]),["D","B"]);
  assert.deepEqual(discoveredIdentityLenses(lenses,[39,41,44,47]),["A","R"]);
  assert.deepEqual(discoveredIdentityLenses(lenses,[44,46,39,41,47,53,61]),["D","A","R","B"]);
});
test("relations must be truthful: never silently turn a comparison into a collaboration",()=>{
  assert.throws(()=>createIdentityLenses(objects.slice(1),{connections}),/Missing identity source/);
  assert.throws(()=>createIdentityLenses(objects.map(x=>x.id===49?{...x,cluster:"garden"}:x),{connections}),/Cannot fabricate/);
  assert.throws(()=>createIdentityLenses(objects,{connections:connections.filter(x=>x.id!=="voice")}),/Missing sourced/);
});
test("viewpoint reading depends on existing object's camera coordinates",()=>{
  const d=createIdentityLenses(objects,{connections})[0];
  assert.ok(identityViewAlignment(d,{x:d.bounds.x,y:d.bounds.y,z:.5})>.9);
  assert.equal(identityViewAlignment(d,{x:5000,y:5000,z:.5}),0);
  assert.ok(identityViewAlignment(d,{x:d.bounds.x,y:d.bounds.y,z:3})<.2);
});

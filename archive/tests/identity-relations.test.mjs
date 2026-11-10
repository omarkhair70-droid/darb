import test from "node:test";
import assert from "node:assert/strict";
import {MATERIAL_BRIDGE,materialBridgeSegments} from "../src/identity-relations.mjs";
const records=[
 {id:7,cluster:"practices",x:100,y:150,w:70,h:60},
 {id:39,cluster:"fustat",x:300,y:200,w:90,h:60},
 {id:41,cluster:"fustat",x:350,y:340,w:70,h:50},
 {id:35,cluster:"residency",x:600,y:140,w:80,h:80}
];
const threads={connections:[
 {id:"makers",type:"editorial-comparison",fromId:7,toId:39,fromCluster:"practices",toCluster:"fustat",sourcePages:[3,11]},
 {id:"material",type:"editorial-comparison",fromId:41,toId:35,fromCluster:"fustat",toCluster:"residency",sourcePages:[11,10]}
]};
test("identity network follows actual object positions, never a hard-coded glyph",()=>{
 const segments=materialBridgeSegments(records,threads);
 assert.equal(segments.length,3);
 assert.deepEqual(segments.map(x=>[x.from,x.to]),[[7,39],[39,41],[41,35]]);
 assert.deepEqual(segments.map(x=>x.kind),["editorial-comparison","shared-programme","editorial-comparison"]);
 assert.equal(segments[0].x1,135);
 assert.equal(segments[0].y2,230);
 assert.equal(segments[2].x2,640);
 assert.equal(MATERIAL_BRIDGE.some(x=>x.letter||x.svgPath),false);
});
test("identity network refuses invented source, maker or cross-programme edges",()=>{
 assert.throws(()=>materialBridgeSegments(records.slice(1),threads),/anchor missing/);
 assert.throws(()=>materialBridgeSegments(records.map(x=>x.id===41?{...x,cluster:"residency"}:x),threads),/programme edge/);
 assert.throws(()=>materialBridgeSegments(records,{connections:[threads.connections[1]]}),/editorial edge/);
 assert.throws(()=>materialBridgeSegments(records,{connections:threads.connections.map(x=>({...x,type:"documented-collaboration"}))}),/editorial edge/);
});

import test from "node:test";
import assert from "node:assert/strict";
import {passageProjection} from "../src/passage-geometry.mjs";

test("the actual source rectangle, not a full-screen background, defines the photograph's destination",()=>{
 const projected=passageProjection(
  {x:193,y:450},{left:62,top:176,width:255,height:181},{width:390,height:844}
 );
 assert.equal(projected.left,62);
 assert.equal(projected.top,176);
 assert.equal(projected.width,255);
 assert.equal(projected.height,181);
 assert.equal(projected.shiftX,193-(62+255/2));
 assert.equal(projected.shiftY,450-(176+181/2));
 assert.ok(projected.scale>.035&&projected.scale<=.24);
 assert.deepEqual(projected.sourceCenter,{x:193,y:450});
});
test("desktop, narrow phone and rotated screen all retain finite source geometry",()=>{
 for(const [width,height,rectangle] of [
  [1440,900,{left:360,top:112,width:480,height:320}],
  [320,568,{left:11,top:205,width:285,height:170}],
  [844,390,{left:299,top:40,width:206,height:175}]
 ]){
  const source=passageProjection(
   {x:width*.38,y:height*.49},rectangle,{width,height});
  assert.ok(Object.values(source).slice(0,7).every(Number.isFinite));
  assert.equal(source.targetCenter.x,rectangle.left+rectangle.width/2);
  assert.equal(source.targetCenter.y,rectangle.top+rectangle.height/2);
 }
});
test("incomplete/late image measurements cannot crash the woven entry",()=>{
 const p=passageProjection({x:180,y:240},{left:NaN,top:NaN,width:0,height:0},{width:360,height:700});
 assert.ok(Number.isFinite(p.left)&&Number.isFinite(p.top));
 assert.ok(Number.isFinite(p.shiftX)&&Number.isFinite(p.shiftY));
 assert.ok(p.width>=1&&p.height>=1);
});

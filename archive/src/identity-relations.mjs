/**
 * First D–A–R–B identity-network seed: not a letter glyph.
 * Three actual source-supported relations, placed where their real objects
 * already live in the spatial archive. Any letter-like reading belongs to
 * viewpoint and discovery, never to a pasted logo or invented collaboration.
 */
export const MATERIAL_BRIDGE=Object.freeze([
 Object.freeze({from:7,to:39,kind:"editorial-comparison",thread:"makers"}),
 Object.freeze({from:39,to:41,kind:"shared-programme",cluster:"fustat"}),
 Object.freeze({from:41,to:35,kind:"editorial-comparison",thread:"material"})
]);

export function materialBridgeSegments(records,threads){
 const byId=new Map(records.map(record=>[record.id,record]));
 const links=threads?.connections||[];
 return MATERIAL_BRIDGE.map(edge=>{
  const a=byId.get(edge.from),b=byId.get(edge.to);
  if(!a||!b)throw new Error("Identity anchor missing from existing spatial archive");
  if(edge.kind==="shared-programme"){
   if(a.cluster!==edge.cluster||b.cluster!==edge.cluster)
    throw new Error("Identity programme edge lacks common documented cluster");
  }else{
   const fact=links.find(t=>t.id===edge.thread);
   if(!fact||fact.type!=="editorial-comparison"||
      fact.fromId!==edge.from||fact.toId!==edge.to||
      fact.fromCluster!==a.cluster||fact.toCluster!==b.cluster||
      !Array.isArray(fact.sourcePages)||fact.sourcePages.length<2)
    throw new Error("Identity editorial edge lacks the existing sourced comparison");
  }
  return {
   from:edge.from,to:edge.to,kind:edge.kind,
   x1:a.x+a.w/2,y1:a.y+a.h/2,
   x2:b.x+b.w/2,y2:b.y+b.h/2
  };
 });
}

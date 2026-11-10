/**
 * Four spatial readings of the existing Darb archive (not four glyphs).
 *
 * Every endpoint is an exhibited original source object. A line is either
 * within the same documented programme or an existing editorial comparison
 * carrying its own source-page evidence. A bend may be composed for viewing,
 * but never presented as historical collaboration, authorship or chronology.
 *
 * The four letters are art-direction lens names (not text rendered to visitors).
 */
export const IDENTITY_LENSES=Object.freeze([
  Object.freeze({
    key:"D",required:Object.freeze([44,46]),zone:"room",
    edges:Object.freeze([
      {from:46,to:44,kind:"shared-programme"},
      {from:44,to:43,kind:"shared-programme"},
      {from:43,to:45,kind:"shared-programme"},
      {from:45,to:46,kind:"shared-programme"}
    ])
  }),
  Object.freeze({
    key:"A",required:Object.freeze([39,41]),zone:"fustat",
    edges:Object.freeze([
      {from:7,to:39,kind:"editorial-comparison",thread:"makers"},
      {from:39,to:41,kind:"shared-programme"},
      {from:41,to:35,kind:"editorial-comparison",thread:"material"}
    ])
  }),
  Object.freeze({
    key:"R",required:Object.freeze([44,47]),zone:"voice",
    edges:Object.freeze([
      {from:44,to:47,kind:"editorial-comparison",thread:"voice"},
      {from:47,to:48,kind:"shared-programme"},
      {from:48,to:49,kind:"shared-programme"},
      {from:49,to:50,kind:"shared-programme"},
      {from:50,to:47,kind:"shared-programme"}
    ])
  }),
  Object.freeze({
    key:"B",required:Object.freeze([53,61]),zone:"citadel",
    edges:Object.freeze([
      {from:53,to:61,kind:"editorial-comparison",thread:"something-else"},
      {from:62,to:60,kind:"shared-programme"},
      {from:60,to:58,kind:"shared-programme"},
      {from:58,to:62,kind:"shared-programme"},
      {from:62,to:61,kind:"shared-programme"},
      {from:61,to:69,kind:"shared-programme"},
      {from:69,to:62,kind:"shared-programme"}
    ])
  })
]);

const assert=(condition,message)=>{if(!condition)throw new Error(message);};
const center=(record)=>({x:record.x+record.w/2,y:record.y+record.h/2});

export function createIdentityLenses(records,threads){
  const byId=new Map(records.map(record=>[record.id,record]));
  const comparisons=threads?.connections||[];
  return IDENTITY_LENSES.map(lens=>{
    const segments=lens.edges.map(edge=>{
      const from=byId.get(edge.from),to=byId.get(edge.to);
      assert(from&&to,"Missing identity source in real atlas: "+edge.from+" → "+edge.to);
      if(edge.kind==="shared-programme"){
        assert(from.cluster===to.cluster,
          "Cannot fabricate a shared programme: "+edge.from+" → "+edge.to);
      }else{
        const evidence=comparisons.find(connection=>
          connection.id===edge.thread&&
          connection.type==="editorial-comparison"&&
          connection.fromId===edge.from&&connection.toId===edge.to&&
          connection.fromCluster===from.cluster&&connection.toCluster===to.cluster&&
          Array.isArray(connection.sourcePages)&&connection.sourcePages.length>=2
        );
        assert(evidence,"Missing sourced editorial comparison: "+edge.thread);
      }
      const a=center(from),b=center(to);
      return {...edge,fromPosition:a,toPosition:b};
    });
    const ids=[...new Set(lens.edges.flatMap(edge=>[edge.from,edge.to]))];
    const points=ids.map(id=>center(byId.get(id)));
    const extents={
      minX:Math.min(...points.map(p=>p.x)),maxX:Math.max(...points.map(p=>p.x)),
      minY:Math.min(...points.map(p=>p.y)),maxY:Math.max(...points.map(p=>p.y))
    };
    const bounds={
      x:(extents.minX+extents.maxX)/2,y:(extents.minY+extents.maxY)/2,
      width:extents.maxX-extents.minX,height:extents.maxY-extents.minY
    };
    assert(lens.required.every(id=>ids.includes(id)),"Lens must be earned from its source endpoints");
    return {key:lens.key,required:[...lens.required],zone:lens.zone,ids,segments,bounds};
  });
}

export function discoveredIdentityLenses(lenses,visited){
  const seen=new Set(visited);
  return lenses.filter(lens=>lens.required.every(id=>seen.has(id))).map(lens=>lens.key);
}

/** A viewpoint reading, not a camera lock or an unavoidable letter sequence. */
export function identityViewAlignment(lens,camera){
  if(!lens||!camera)return 0;
  const radius=Math.max(650,Math.hypot(lens.bounds.width,lens.bounds.height)*.72);
  const distance=Math.hypot(camera.x-lens.bounds.x,camera.y-lens.bounds.y);
  const inRange=Math.max(0,Math.min(1,1-distance/(radius*1.4)));
  // A too-tight camera cannot see the relation as a whole.
  const zoom=Number.isFinite(camera.z)?camera.z:.5;
  const contextual=zoom>.12&&zoom<1.40?1:.18;
  return Math.round(inRange*contextual*1000)/1000;
}

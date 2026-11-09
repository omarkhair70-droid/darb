// Darb Archive — authored spatial atlas with deterministic placements.
// Coordinates encode editorial neighbourhoods in one continuous world, not facts about geography.
export const WORLD_WIDTH=9200;
export const WORLD_HEIGHT=6400;
export const CLUSTERS={
  place:{x:1100,y:900,shape:"diagonal",en:"Place",ar:"المكان"},
  practices:{x:2050,y:800,shape:"constellation",en:"Encounter",ar:"اللقاء"},
  fustat:{x:3450,y:1050,shape:"flow",en:"Tales of Fustat",ar:"حكاوي الفسطاط"},
  residency:{x:4950,y:800,shape:"diagonal",en:"Residency",ar:"إقامة فنية"},
  room:{x:6150,y:800,shape:"orbit",en:"A Room of One's Own",ar:"غرفة تخصنا وحدنا"},
  voice:{x:7650,y:880,shape:"flow",en:"Voice in Motion",ar:"الحركة في الصوت"},
  jusoor:{x:8000,y:2450,shape:"orbit",en:"Jusoor",ar:"جسور"},
  inbetween:{x:6600,y:2600,shape:"diagonal",en:"INBETWEEN",ar:"INBETWEEN"},
  young:{x:5400,y:2600,shape:"constellation",en:"Young Artists",ar:"فنانون شباب"},
  unspoken:{x:3970,y:2650,shape:"orbit",en:"UNSPOKEN",ar:"ما لم يُقال"},
  garden:{x:2600,y:2550,shape:"diagonal",en:"Darb fi Al-Hadiqqa",ar:"درب في الحديقة"},
  citadel:{x:1900,y:4200,shape:"constellation",en:"Something Else / Citadel",ar:"Something Else / القلعة"},
  symposium:{x:3900,y:4450,shape:"orbit",en:"Something Else / Symposium",ar:"ملتقى Something Else"},
  something:{x:5050,y:4750,shape:"diagonal",en:"Something Else",ar:"Something Else"},
  music:{x:6650,y:4700,shape:"flow",en:"Live Performance",ar:"الأداء الحي"},
  sector:{x:7900,y:5000,shape:"diagonal",en:"Wider Context",ar:"سياق أوسع"},
  plans:{x:8150,y:5920,shape:"flow",en:"Future Plans / Research",ar:"مخططات / بحث"}
};

const ratio=(n)=>((n*0.61803398875)%1);
const sizes={
 architectural_plan:[340,420],artwork_documentation:[410,325],installation_photo:[500,370],
 exhibition_photo:[470,325],workshop_photo:[430,315],craft_photo:[450,330],
 portrait_photo:[360,415],place_photo:[470,360],screening_photo:[475,330],
 performance_photo:[470,330],logo_graphic:[300,225],identity_graphic:[300,240],
 title_graphic:[360,230]
};

export function layoutCatalog(catalog){
 const visible=catalog.items.filter(item=>item.display);
 const byCluster=Object.groupBy ? Object.groupBy(visible,item=>item.cluster)
    : visible.reduce((a,item)=>{(a[item.cluster]??=[]).push(item);return a;},{});
 const results=[];
 for(const [cluster,arr] of Object.entries(byCluster)){
  const zone=CLUSTERS[cluster];
  if(!zone)throw new Error("Unknown editorial zone "+cluster);
  for(let i=0;i<arr.length;i++){
   const item=arr[i];
   const [basisW,basisH]=sizes[item.kind]||[425,310];
   const pulse=ratio(item.id+7);
   const w=Math.round(basisW*(.8+pulse*.34));
   const h=Math.round(basisH*(.79+ratio(item.id*13)*.28));
   const centerIndex=i-(arr.length-1)/2;
   const phi=i*2.399963229728653+ratio(arr[0].id)*Math.PI;
   const spacing=145+Math.sqrt(i)*75;
   const orbit=Math.sqrt(i)*spacing;
   let dx,dy;
   if(zone.shape==="orbit"){
    dx=Math.cos(phi)*orbit*.73;dy=Math.sin(phi)*orbit*.66;
   }else if(zone.shape==="flow"){
    dx=centerIndex*250;dy=Math.sin(i*1.8)*220+centerIndex*65;
   }else if(zone.shape==="diagonal"){
    dx=centerIndex*205+Math.cos(phi)*90;
    dy=centerIndex*125+Math.sin(phi)*150;
   }else{
    dx=Math.cos(phi)*orbit*.91;dy=Math.sin(phi)*orbit*.83;
   }
   const x=Math.round(Math.max(85,Math.min(WORLD_WIDTH-w-85,zone.x-w/2+dx)));
   const y=Math.round(Math.max(80,Math.min(WORLD_HEIGHT-h-120,zone.y-h/2+dy)));
   const rotation=Number((Math.sin(item.id*2.29)*5.9).toFixed(1));
   results.push({...item,x,y,w,h,r:rotation,zone:cluster});
  }
 }
 return results.sort((a,b)=>a.id-b.id);
}
export function cameraForObject(item,{zoom=.88,rotation=0}={}){
 return {x:item.x+item.w/2,y:item.y+item.h/2,z:zoom,r:rotation};
}
export function validateAtlas(catalog,atlas){
 const problems=[];
 if(catalog.recordCount!==77||catalog.items.length!==77)problems.push("Missing original source records");
 const refs=new Set();
 for(const item of catalog.items){
  if(refs.has(item.id))problems.push("Duplicate ID "+item.id);
  refs.add(item.id);
  if(!item.src.startsWith("/media/"+item.id+"."))problems.push("Bad source path "+item.id);
  if(!item.title.ar||!item.title.en||!item.project.ar||!item.project.en)problems.push("Missing locale "+item.id);
  if(!item.page||!item.xref)problems.push("Missing evidence "+item.id);
 }
 if(atlas.length!==catalog.items.filter(x=>x.display).length)problems.push("Incorrect stage object count");
 for(const item of atlas){
  if(!Number.isFinite(item.x)||!Number.isFinite(item.y)||item.x<0||item.y<0)problems.push("Invalid position "+item.id);
  if(item.x+item.w>WORLD_WIDTH||item.y+item.h>WORLD_HEIGHT)problems.push("Object escapes world "+item.id);
 }
 return problems;
}

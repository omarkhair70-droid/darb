/**
 * The physical textile opening and the existing source photograph are two
 * projected views of the same archive record. No arbitrary screen-cover wipe.
 *
 * Inputs are screen-space DOMRect-like primitives, kept pure for phone/desktop
 * and browser regression tests. We do not crop, recolor or fake source pixels.
 */
export function passageProjection(aperture,photograph,viewport){
 const finite=(n,fallback)=>Number.isFinite(Number(n))?Number(n):fallback;
 const vw=Math.max(1,finite(viewport?.width,1));
 const vh=Math.max(1,finite(viewport?.height,1));
 const width=Math.max(1,finite(photograph?.width,1));
 const height=Math.max(1,finite(photograph?.height,1));
 const left=finite(photograph?.left,(vw-width)*.5);
 const top=finite(photograph?.top,(vh-height)*.5);
 const startX=finite(aperture?.x,vw*.5);
 const startY=finite(aperture?.y,vh*.45);
 const centerX=left+width*.5,centerY=top+height*.5;
 // The first exposed fibers occupy a small real aperture, not a giant photo
 // covering the screen. The same image is then eased to its actual frame.
 const scale=Math.min(.24,Math.max(.035,Math.min(vw*.13/width,vh*.13/height)));
 return {
  left,top,width,height,
  shiftX:startX-centerX,shiftY:startY-centerY,scale,
  sourceCenter:{x:startX,y:startY},
  targetCenter:{x:centerX,y:centerY}
 };
}

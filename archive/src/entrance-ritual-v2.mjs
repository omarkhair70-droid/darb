/**
 * Entrance Ritual V2 — a pure interaction contract, not a renderer.
 *
 * The physical textile and eyes must be authored in a future visual slice.
 * No auto-timer, autoplay sound, fake historical provenance or separate site.
 */
export const RITUAL_PHASES=Object.freeze([
  "unlit","unfurl","tension","recognition","passage","arrived"
]);

const events=Object.freeze({
  unlit:["START","unfurl"],
  unfurl:["CLOTH_EXTENDED","tension"],
  tension:["APERTURES_REVEALED","recognition"],
  recognition:["VIEW_ALIGNED","passage"],
  passage:["SOURCE_SELECTED","arrived"]
});

function assertState(state){
  if(!state || !RITUAL_PHASES.includes(state.phase))throw new Error("Invalid ritual phase");
}

export function initialRitual({quiet=true,reducedMotion=false}={}){
  return {
    phase:"unlit",
    quiet:Boolean(quiet),
    reducedMotion:Boolean(reducedMotion),
    completed:false,
    history:["unlit"],
    chosenSourceId:null,
    // Rendering is intentionally separate from this event-driven contract.
  };
}

export function transitionRitual(state,event,{sourceId=null}={}){
  assertState(state);
  if(event==="ENTER_ARCHIVE"){
    if(sourceId!==null && ![39,40,41,42].includes(sourceId))throw new Error("Unverified prototype source ID");
    return {...state,phase:"arrived",completed:true,
      chosenSourceId:sourceId??state.chosenSourceId,history:[...state.history,"arrived"]};
  }
  if(event==="SET_QUIET"){
    return {...state,quiet:true};
  }
  if(event==="ENABLE_SOUND"){
    // Sound can only follow an explicit user action.
    return {...state,quiet:false};
  }
  if(event==="SET_REDUCED_MOTION"){
    return {...state,reducedMotion:true};
  }
  if(event==="REPLAY"){
    if(state.phase!=="arrived")throw new Error("Replay only after arrival");
    return {...state,phase:"unlit",completed:false,history:["unlit"],chosenSourceId:null};
  }
  if(state.phase==="arrived")throw new Error("Ritual already arrived");
  const [expected,next]=events[state.phase];
  if(event!==expected)throw new Error("Invalid event "+event+" during "+state.phase);
  if(event==="SOURCE_SELECTED"&&![39,40,41,42].includes(sourceId)){
    throw new Error("Passage requires a real source record");
  }
  return {...state,phase:next,completed:next==="arrived",
    chosenSourceId:event==="SOURCE_SELECTED"?sourceId:state.chosenSourceId,
    history:[...state.history,next]};
}

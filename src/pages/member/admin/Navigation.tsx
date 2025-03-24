import React from "react";

export default function Navigation({phases , activephase , setactivephase}) {
  return (
    <div className="phase-navigation">
      <button className="nav-btn" id="prevPhase" title="Previous Phase">
        <i className="fa fa-arrow-left" aria-hidden="true" />
      </button>

      <div className="phases-container" id="phasesContainer">
        {phases.map((d: any,k:number) => (
          <div
            className={
               activephase == d.id ? "phase-item  active finished" : "phase-item "
            }
            onClick={(e)=> setactivephase(d.id) }
          >
            <div className="phase-title">{d.name}</div>
            <div className="phase-count">Phase {k+1} of {phases.length}</div>
          </div>
        ))}
      </div>

      <button className="nav-btn" id="nextPhase" title="Next Phase">
        <i className="fa fa-arrow-right" aria-hidden="true" />
      </button>
      <div className="progress-bar" style={{ width: "20%" }} />
    </div>
  );
}

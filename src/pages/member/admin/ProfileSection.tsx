import React from "react";

export default function ProfileSection({phases, activephase}:any) {

  const phaseDetails = phases?.find((d: any) => d.id == activephase);

  return (
    <div className="profile-card">
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src="https://cdn.usegalileo.ai/sdxl10/7d846e02-b4e7-4a76-b76d-5645b14be6ce.png"
          alt="Profile"
          className="profile-image"
        />
        <div>
          <h5 className="mb-1">Phase {phaseDetails?.id}</h5>
          <small className="opacity-75">{phaseDetails?.name}</small>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <small className="opacity-75">Total Questions</small>
          <h6 className="mb-0">24</h6>
        </div>
        <div>
          <small className="opacity-75">Sections</small>
          <h6 className="mb-0">4</h6>
        </div>
      </div>
    </div>
  );
}

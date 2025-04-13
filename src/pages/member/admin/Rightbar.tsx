import { enablePhaseOutput } from "@/utils";
import React from "react";

interface RightbarProps {
  setshowSavedQuestion: (show: boolean) => void;
  onSubmitPhaseOutput: () => void;
}

const Rightbar: React.FC<RightbarProps> = ({
  setshowSavedQuestion,
  onSubmitPhaseOutput,
}) => {
  return (
    <div className="__right-sidebar __height-half">
      <div>
        <button
          className="close_right_sidebar btn btn-danger mb-3"
          type="button"
        >
          <i className="fa fa-times" aria-hidden="true" />
          Close
        </button>
      </div>
      <h5>AI Tools and Aids</h5>
      <div className="suggestions-grid">
        <div
          className="suggestion-item text-center"
          onMouseEnter={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Business Model Canvas";
            if (icon) icon.style.display = "none"; // Hides the icon
          }}
          onMouseLeave={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Canvas";
            if (icon) icon.style.display = ""; // Resets to default display (inline by default for icons)
          }}
        >
          <i className="fas fa-diagram" />

          <span>Canvas</span>
        </div>
        <div
          className="suggestion-item text-center"
          onMouseEnter={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Causes Diagram";
            if (icon) icon.style.display = "none"; // Hides the icon
          }}
          onMouseLeave={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Causes Diagram";
            if (icon) icon.style.display = ""; // Resets to default display (inline by default for icons)
          }}
        >
          <i className="fas fa-comments" />
          <span>Causes Diagram</span>
        </div>
        <div
          className="suggestion-item text-center"
          onMouseEnter={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Portfolio Sense-Making";
            if (icon) icon.style.display = "none"; // Hides the icon
          }}
          onMouseLeave={(e) => {
            const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            if (span) span.textContent = "Portfolio";
            if (icon) icon.style.display = ""; // Resets to default display (inline by default for icons)
          }}
        >
          <i className="fas fa-file-alt" />
          <span>Portfolio</span>
        </div>
        <div
          className="suggestion-item text-center"
          onMouseEnter={(e) => {
            // const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            // if (span) span.textContent = "Business Model Canvas";
            if (icon) icon.style.display = "none"; // Hides the icon
          }}
          onMouseLeave={(e) => {
            //  const span = e.currentTarget.querySelector("span");
            const icon = e.currentTarget.querySelector("svg");

            //  if (span) span.textContent = "Canvas";
            if (icon) icon.style.display = ""; // Resets to default display (inline by default for icons)
          }}
        >
          <i className="fas fa-image" />
          <span>Inversion</span>
        </div>
      </div>
      <div className="button-group __custom-group-btn">
        <button className="active">Relevant Case Studies</button>
        <button className="btn-info">Institutional Structure</button>
          <button
            type="button"
            onClick={onSubmitPhaseOutput}
            className="btn-warning"
            disabled={!enablePhaseOutput()}
            title={enablePhaseOutput() ? '' : 'Please give answer to all questions'}
            data-toggle="tooltip"
          >
            Phase Output Summarize
          </button>
      </div>
      <a
        className="phase-output text-decoration-none"
        id="showSavedBtn"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setshowSavedQuestion(true);
        }}
      >
        <i className="fas fa-bookmark" />
        Show Saved Responses
      </a>
    </div>
  );
};

export default Rightbar;

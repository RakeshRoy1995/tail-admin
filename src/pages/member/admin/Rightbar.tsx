import React from "react";

export default function Rightbar({
  setshowSavedQuestion,
  onSubmitPhaseOutput,
}: any) {
  return (
    <div className=" __right-sidebar __height-half">
      <div>
        <button
          className="close_right_sidebar btn btn-danger mb-3"
          type="button"
        >
          <i className="fa fa-times" aria-hidden="true" />
          close
        </button>
      </div>
      <div className="suggestions-grid">
        <div className="suggestion-item">
          {/* <i className="fas fa-question-circle" /> */}
          <span>Business model canvas</span>
        </div>
        <div className="suggestion-item">
          {/* <i className="fas fa-comments" /> */}
          <span>Causes Diagram</span>
        </div>
        <div className="suggestion-item">
          {/* <i className="fas fa-file-alt" /> */}
          <span>Portfolio Sense making</span>
        </div>
        <div className="suggestion-item">
          <i className="fas fa-lightbulb" />
          <span>Inversion</span>
        </div>
      </div>
      <div className="button-group __custom-group-btn">
        <button className="active">Relevant case studies</button>
        <button className="btn-success">Show Saved Responses</button>
        <button className="btn-info">Institutional Structure</button>
        {/* <button className="btn-danger">Implementation</button> */}
        <button
          type="button"
          onClick={(e) => onSubmitPhaseOutput()}
          className="btn-warning"
        >
          Phase Output Summarize{" "}
        </button>
      </div>
      <a
        className="phase-output text-decoration-none"
        id="showSavedBtn"
        href="#"
        onClick={(e) => setshowSavedQuestion(true)}
      >
        <i className="fas fa-bookmark" />
        Show Phase output
      </a>
    </div>
  );
}

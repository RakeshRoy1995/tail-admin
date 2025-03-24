import React from "react";

export default function Rightbar() {
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
          <i className="fas fa-question-circle" />
          <span>Questions</span>
        </div>
        <div className="suggestion-item">
          <i className="fas fa-comments" />
          <span>Discussion</span>
        </div>
        <div className="suggestion-item">
          <i className="fas fa-file-alt" />
          <span>Resources</span>
        </div>
        <div className="suggestion-item">
          <i className="fas fa-lightbulb" />
          <span>Ideas</span>
        </div>
      </div>
      <div className="button-group __custom-group-btn">
        <button className="active">Core Problems</button>
        <button className="btn-success">User Research</button>
        <button className="btn-info">Solution Design</button>
        <button className="btn-danger">Implementation</button>
      </div>
      <a
        className="phase-output text-decoration-none"
        id="showSavedBtn"
        href="#"
      >
        <i className="fas fa-bookmark" />
        Show Saved
      </a>
    </div>
  );
}

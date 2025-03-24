import React from "react";

export default function QuesAnswer({ data, AllQues, setdata, submit, onSubmit }: any) {
  console.log(`AllQues`, AllQues, data);
  return (
    <div className="__question-and-answer position-relative __margin-left __margin-right __height-full ">
      <div className="toggle_sidebar align-items-center justify-content-between px-3 w-100">
        <div className="toggle_left_sidebar">
          <i className="fa fa-bars fs-3" aria-hidden="true" />
        </div>
        <div className="toggle_right_sidebar">
          <i className="fa fa-bars fs-3" aria-hidden="true" />
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="bot-avatar">
            <i className="fas fa-robot" />
          </div>
          <div>
            <h5 className="mb-0">AI Assistant</h5>
            <small className="opacity-75">Always here to help</small>
          </div>
        </div>
        <div className="__floating_question_text">
          <h4>
            {" "}
            {AllQues.find((d: any) => d.id == data.question_id)?.question}{" "}
          </h4>
        </div>
        <div className="chat-body">
          {/* Bot Message */}
          <div className="message">
            <div className="bot-avatar">
              <i className="fas fa-robot" />
            </div>
            <div className="message-content">
              <div className="message-bubble">
                Hello! How can I assist you today?
              </div>
            </div>
          </div>
          {/* User Message */}
          <div className="message user-message">
            <div className="user-avatar">
              <i className="fas fa-user" />
            </div>
            <div className="message-content">
              <div className="message-bubble">Can you tell me about AI?</div>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="message">
            <div className="bot-avatar">
              <i className="fas fa-robot" />
            </div>
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>
        <div className="chat-footer">
          <div className="input-wrapper">
            <div className="input-actions">
              <button className="action-btn">
                <i className="fas fa-paperclip" />
              </button>
              <button className="action-btn">
                <i className="fas fa-image" />
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
              onChange={(e) =>
                setdata({
                  ...data,
                  ["message"]: e.target.value,
                })
              }
            />
            <button
              className="btn-send"
              disabled={submit}
              onClick={(e) => onSubmit()}
            >
              <i className="fas fa-paper-plane text-white" />
            </button>
          </div>
        </div>
      </div>
      {/* Floating Buttons with Tooltips */}
      <div className="floating-buttons">
        {/* Save Button */}
        <button
          className="floating-btn save_btn"
          id="saveBtn"
          title="Save"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
        >
          <i className="fas fa-save" />
        </button>
      </div>
      <div className="overlay" id="overlay">
        <div className="saved-sidebar" id="savedSidebar">
          <div className="sidebar-header">
            <h2>Saved Questions</h2>
            <button type="button" className="close-btn" id="closeBtn">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="saved-questions">
            <div className="question-item">
              <div className="question">
                <i className="fas fa-question-circle" />
                <span>
                  What is the primary goal of user research in design thinking?
                </span>
              </div>
              <div className="answer">
                User research helps understand user needs, behaviors, and
                motivations through systematic investigation, informing design
                decisions with real data rather than assumptions.
              </div>
              <div className="meta">
                <span className="tag">User Research</span>
                <span>Saved 2 days ago</span>
              </div>
            </div>
            <div className="question-item">
              <div className="question">
                <i className="fas fa-question-circle" />
                <span>How do you identify core problems in a project?</span>
              </div>
              <div className="answer">
                Core problems are identified through stakeholder interviews,
                data analysis, user feedback, and systematic problem-solving
                techniques that help uncover root causes rather than symptoms.
              </div>
              <div className="meta">
                <span className="tag">Core Problems</span>
                <span>Saved 1 week ago</span>
              </div>
            </div>
            <div className="question-item">
              <div className="question">
                <i className="fas fa-question-circle" />
                <span>What makes a solution design effective?</span>
              </div>
              <div className="answer">
                An effective solution design addresses user needs, is
                technically feasible, aligns with business goals, and provides a
                seamless user experience while being scalable and maintainable.
              </div>
              <div className="meta">
                <span className="tag">Solution Design</span>
                <span>Saved today</span>
              </div>
            </div>
          </div>
          <a
            className="phase-output text-decoration-none mt-4"
            href="./phase-description.html"
          >
            <i className="fas fa-arrow-circle-right" />
            Phase Output
          </a>
        </div>
      </div>
    </div>
  );
}

import AiResponseForm from "@/pages/Form/AiResponseForm";
import AiResponseFormMember from "@/pages/Form/AiResponseFormMember";
import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";
import { getPreviousQuestion } from "@/utils";
import React from "react";

export default function QuesAnswer({
  data,
  AllQues,
  setdata,
  submit,
  onSubmit,
  AiResponse,
  onSubmitAnswer,
  showSavedQuestion,
  setshowSavedQuestion,
  output,
  setshowPhaseOutput,
  activephase,
}: any) {
  return (
    <div className="__question-and-answer position-relative __margin-left __margin-right __height-full">
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
            {AllQues.find((d: any) => d.id == data?.question_id)?.question}{" "}
          </h4>
        </div>
        <div className="chat-body">
          {getPreviousQuestion(output, data?.question_id) && (
            <AiResponseFormMember
              ai_d={getPreviousQuestion(output, data?.question_id)}
              onSubmitAnswer={onSubmitAnswer}
              submit={submit}
              type="edit"
            />
          )}

          {AiResponse.map((ai_d: any) => (
            <>
              {ai_d.aiReply && (
                <>
                  {ai_d.yourMessage && (
                    <div className="message user-message">
                      <div className="user-avatar">
                        <i className="fas fa-user" />
                      </div>
                      <div className="message-content">
                        <div className="message-bubble">{ai_d.yourMessage}</div>
                      </div>
                    </div>
                  )}

                  <div className="message">
                    <div className="bot-avatar">
                      <i className="fas fa-robot" />
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        {ai_d.aiReply && (
                          <AIOutputShow messages={ai_d.aiReply} />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}

          {/* Typing Indicator */}
          {submit && (
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
          )}
        </div>
        {/* Previous Code */}
        {/* {AllQues.find((d: any) => d.id == data?.question_id)?.question ? (
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
                onChange={(e) => {
                  setdata({
                    ...data,
                    ["message"]: e.target.value,
                  });
                }}
                value={data.message}
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
        ) : (
          <p className="text-danger text-center chat-footer">
            please select a question to start conversation
          </p>
        )} */}

        {/* Shakhawat Code*/}
        <div
          className={`chat-footer ${AllQues.find((d: any) => d.id == data?.question_id)?.question ? "" : "invisible"}`}
        >
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
              onChange={(e) => {
                setdata({
                  ...data,
                  ["message"]: e.target.value,
                });
              }}
              value={data.message}
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

        <p
          className={`text-danger text-center  ${AllQues.find((d: any) => d.id == data?.question_id)?.question ? "d-none" : ""}`}
        >
          please select a question to start conversation
        </p>
      </div>
      
      {/* Floating Buttons with Tooltips */}
      <div className="floating-buttons">
        <button
          className={`floating-btn save_btn ${AiResponse.length === 0 ? "no-hover" : ""}`}
          id="saveBtn"
          title="Save"
          disabled={submit || AiResponse.length === 0}
          onClick={(e) => onSubmitAnswer(AiResponse[AiResponse.length - 1])}
          data-bs-toggle="tooltip"
          data-bs-placement="left"
        >
          <i className="fas fa-save" />
        </button>
        <style>
          {`
            .no-hover:hover {
              pointer-events: none;
            }
          `}
        </style>
      </div>
      <div
        className={showSavedQuestion ? "overlay active" : "overlay"}
        id="overlay"
      >
        <div
          className={
            showSavedQuestion ? "saved-sidebar active" : "saved-sidebar"
          }
          id="savedSidebar"
        >
          <div className="sidebar-header">
            <h2>Saved Questions</h2>
            <button
              type="button"
              className="close-btn"
              id="closeBtn"
              onClick={(e) => setshowSavedQuestion(false)}
            >
              <i className="fas fa-times" />
            </button>
          </div>

          <div className="saved-questions">
            {output.map((d: any) => (
              <>
                {d
                  .filter((info: any) => info.phaseId == activephase)
                  .map((outPut_d: any) => (
                    <div className="question-item">
                      <div className="question">
                        <i className="fas fa-question-circle" />
                        <span>{outPut_d?.question}</span>
                      </div>
                      <div className="answer">
                        <AIOutputShow messages={outPut_d?.aiReply} />
                      </div>
                      <div className="meta">
                        <span className="tag">{outPut_d?.block_name}</span>
                        {/* <span>Saved 2 days ago</span> */}
                      </div>
                    </div>
                  ))}
              </>
            ))}
          </div>
          <a
            className="phase-output text-decoration-none mt-4"
            href="#"
            onClick={(e) => {
              setshowSavedQuestion(false);
              setshowPhaseOutput(true);
            }}
          >
            <i className="fas fa-arrow-circle-right" />
            Phase Output
          </a>
        </div>
      </div>
    </div>
  );
}

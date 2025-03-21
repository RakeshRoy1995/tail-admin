import React from "react";

export default function AiResponseForm({
  ai_d,
  onSubmitAnswer,
  submit,
  type,
}: any) {
  return (
    <div className="container" style={{ paddingTop: "10px" }}>
      {!type && (
        <div
          style={{
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f1f1f1",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        >
          <img
            src="asset/assets/img/User.png"
            alt=""
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
            }}
          />
          {ai_d.yourMessage}
        </div>
      )}
      <div
        style={{
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      >
        <img
          src="asset/assets/img/img1.png"
          alt=""
          style={{
            width: "24px",
            height: "24px",
            marginRight: "8px",
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: ai_d.aiReply,
          }}
        />

        {(ai_d.saved || ai_d.saved == false) && !type && (
          <button
            type="button"
            disabled={submit}
            onClick={(e) => onSubmitAnswer(ai_d)}
            style={{
              marginLeft: "auto",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            <i className="fa fa-save" aria-hidden="true" /> Save
          </button>
        )}
      </div>
      <hr />
    </div>
  );
}

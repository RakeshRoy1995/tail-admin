import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";
import React from "react";

export default function AiResponseFormMember({ ai_d }: any) {
  
  return (
    <>
      {ai_d.aiReply && (
        <div className="message">
          <div className="bot-avatar">
            <i className="fas fa-robot" />
          </div>
          <div className="message-content">
            <div className="message-bubble">
              {ai_d.aiReply && <AIOutputShow messages={ai_d.aiReply} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { statusOfQuestion } from "@/utils";
import React from "react";

export default function BlockSection({
  classname,
  d,
  active,
  setactiveBlock,
  AllQues,
  setdata,
  settextareaShow,
  setactiveQuestion,
  data,
  totalQues,
  output,
}: any) {
  return (
    <div className={'section-item ' + classname} onClick={(e) => setactiveBlock(d.id)}>
      <h6 className="mb-1 d-flex justify-content-between">
        <span>{d.name}</span>
        <span className="icon_section">
          <i className="fa fa-angle-down" aria-hidden="true" />
        </span>
      </h6>
      <small className="text-muted">{totalQues?.length} questions </small>
      <div className={`questions-list  mt-2 flex-column gap-1 ${classname}`}>
        {AllQues?.map((qd: any) => (
          <>
            {qd.blockId == d.id && (
              <span
                className={`question_item d-flex ${data?.question_id == qd.id || statusOfQuestion(output, qd.id) == 1 ? "active" : ""} gap-2`}
                onClick={(e) => {
                  localStorage.setItem("chat_id", String( Math.floor(Math.random() * (100000 - 1 + 1)) + 1));
                  setdata({
                    ...data,
                    ["question_id"]: qd.id,
                  });
                  settextareaShow(true);
                  setactiveBlock(d.id);
                  setactiveQuestion(qd.id);
                }}
              >
                <span>
                  <i
                    className="fa fa-check-circle text-white"
                    aria-hidden="true"
                  />
                </span>
                <p className=" mb-0">{qd.question}</p>
              </span>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

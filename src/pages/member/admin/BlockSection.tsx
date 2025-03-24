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
  console.log(`d`, d, totalQues);
  return (
    <div className={classname} onClick={(e) => setactiveBlock(d.id)}>
      <h6 className="mb-1 d-flex justify-content-between">
        <span>{d.name}</span>
        <span className="icon_section">
          <i className="fa fa-angle-down" aria-hidden="true" />
        </span>
      </h6>
      <small className="text-muted">{totalQues?.length} questions</small>
      <div className={`questions-list ${active} mt-2 flex-column gap-1`}>
        {AllQues?.map((qd: any) => (
          <>
            {qd.blockId == d.id && (
              <span
                className={`question_item d-flex ${data?.question_id == qd.id || statusOfQuestion(output, qd.id) == 1 ? "active" : ""} gap-2`}
                onClick={(e) => {
                  setdata({
                    ...data,
                    ["question_id"]: qd.id,
                  });
                  settextareaShow(true);
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

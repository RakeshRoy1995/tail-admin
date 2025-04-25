import React from "react";
import BlockSection from "./BlockSection";

export default function SidebarMember({
  Allblocks,
  activephase,
  activeBlock,
  AllQues,
  setdata,
  settextareaShow,
  setactiveQuestion,
  data,
  setactiveBlock,
  output,
  setAiResponse
}: any) {
  return (
    <div className="section-list">
      {Allblocks.map((d: any) => (
        <>
          {d.phaseId == activephase && (
            <>
              {activeBlock == d.id ? (
                <BlockSection
                  d={d}
                  active={activeBlock}
                  classname="active"
                  AllQues={AllQues}
                  setdata={setdata}
                  settextareaShow={settextareaShow}
                  setactiveQuestion={setactiveQuestion}
                  data={data}
                  setactiveBlock={setactiveBlock}
                  totalQues={AllQues?.filter((dq: any) => dq.blockId == d.id)}
                  output={output}
                  setAiResponse={setAiResponse}
                />
              ) : (
                <BlockSection
                  d={d}
                  classname=""
                  AllQues={AllQues}
                  setdata={setdata}
                  settextareaShow={settextareaShow}
                  setactiveQuestion={setactiveQuestion}
                  data={data}
                  setactiveBlock={setactiveBlock}
                  totalQues={AllQues?.filter((dq: any) => dq.blockId == d.id)}
                  output={output}
                  setAiResponse={setAiResponse}
                />
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
}

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
  output
}: any) {
  return (
    <div className="section-list">
      {Allblocks.map((d: any) => (
        <>
          {d.phaseId == activephase && (
            <>
              {activeBlock == d.id ? (
                <div>
                  <BlockSection
                    d={d}
                    classname="section-item active"
                    active={"active"}
                    AllQues={AllQues}
                    setdata={setdata}
                    settextareaShow={settextareaShow}
                    setactiveQuestion={setactiveQuestion}
                    data={data}
                    setactiveBlock={setactiveBlock}
                    totalQues={AllQues?.filter((dq:any)=> dq.blockId == d.id )}
                    output={output}
                  />
                </div>
              ) : (
                <BlockSection
                  d={d}
                  classname="section-item"
                  AllQues={AllQues}
                  setdata={setdata}
                  settextareaShow={settextareaShow}
                  setactiveQuestion={setactiveQuestion}
                  data={data}
                  setactiveBlock={setactiveBlock}
                  totalQues={AllQues?.filter((dq:any)=> dq.blockId == d.id )}
                  output={output}
                />
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
}

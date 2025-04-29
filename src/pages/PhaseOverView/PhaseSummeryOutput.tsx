import React from "react";
import profileImage from "../../../assets/icons/Profile.svg";
import { groupBy } from "@/utils";
const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { submitFormData } from "@/api/Reqest";
import PhaseSummery from "../PropsedSystemMappainig/PhaseSummery";

export default function PhaseSummeryOutput({
  phaseId,
  allUsersList,
  userChat,
  question,
  output,
  getSummeryPhaseOutput
}: any) {
  
  const [outPutQues, setoutPutQues] = React.useState<any>([]);
  const [singleData, setsingleData] = React.useState<any>(null);
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [activeFaqs, setActiveFaqs] = React.useState({});

  const OnGOingprogress = (userId) => {
    const chat = userChat.filter((user: any) => user.userId === userId);
    const output = Object.values(groupBy(chat, "blockId"));

    const percentage = (chat.length / question.length) * 100;

    const Blockids = [...new Set(chat.map((item) => item.blockId))];
    const phaseId = [...new Set(chat.map((item) => item.phaseId))];

    return {
      percentage: percentage.toFixed(0) || 0,
      questionCount: question.length,
      blockCount: Blockids.length,
      phaseCount: phaseId.length,
      chat: chat,
      output: output,
    };
  };

  

  console.log(`outputfffff`, output);
  return (
    <div>
      <div className=" bg-light ">
        <div className="row g-4">
          {!singleData &&
            allUsersList?.map((project, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-6"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setsingleData(project);
                  getSummeryPhaseOutput(project.id)
                }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={"../../../assets/icons/Profile.svg"}
                          alt={project.name}
                          width={48}
                          height={48}
                          className="rounded-circle me-3"
                        />
                        <div>
                          <h5 className="mb-0">{project.username}</h5>
                          <small className="text-muted">{project.email}</small>
                        </div>
                      </div>
                      <button className="btn btn-sm text-muted">
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Progress</span>
                        <span>{OnGOingprogress(project.id)?.percentage}%</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width: `${OnGOingprogress(project.id)?.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-auto d-flex text-muted small">
                      <div className="me-4 d-flex align-items-center">
                        <i className="bi bi-list-task me-1"></i>
                        <strong className="me-1">
                          {OnGOingprogress(project.id)?.phaseCount}
                        </strong>
                        Phase
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-chat-left-text me-1"></i>
                        <strong className="me-1">
                          {OnGOingprogress(project.id)?.blockCount}
                        </strong>
                        Block
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {singleData && (
            <div className="col-md-12 col-lg-12">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={profileImage}
                        alt={singleData.name}
                        width={48}
                        height={48}
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h5 className="mb-0">{singleData.username}</h5>
                        <small className="text-muted">{singleData.email}</small>
                      </div>
                    </div>
                    <button className="btn btn-sm text-muted">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small text-muted">
                      <span>Progress</span>
                      <span>{OnGOingprogress(singleData.id)?.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${OnGOingprogress(singleData.id)?.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-auto d-flex text-muted small">
                    <div className="me-4 d-flex align-items-center">
                      <i className="bi bi-list-task me-1"></i>
                      <strong className="me-1">
                        {OnGOingprogress(singleData.id)?.phaseCount}
                      </strong>
                      Phase
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-chat-left-text me-1"></i>
                      <strong className="me-1">
                        {OnGOingprogress(singleData.id)?.blockCount}
                      </strong>
                      Block
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        {output.length > 0 && <PhaseSummery output={output} error={""} />}
      </div>
    </div>
  );
}

import React from "react";
import profileImage from "../../../assets/icons/Profile.svg";
import { groupBy } from "@/utils";
import AIOutputShow from "@/shared/showOutputFormat/AIOutputShow";

export default function PhaseOutputDetails({
  blocks,
  allUsersList,
  userChat,
  question,
}: any) {
  const [output, setoutput] = React.useState<any>([]);
  const [outPutQues, setoutPutQues] = React.useState<any>([]);
  const [singleData, setsingleData] = React.useState<any>(null);
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [activeFaqs, setActiveFaqs] = React.useState({});

  const activateSection = (index) => {
    setActiveSectionIndex(index);
  };
  const toggleFaq = (sectionIndex, faqIndex) => {
    setActiveFaqs((prevState) => {
      const newState = { ...prevState };
      const sectionKey = `${sectionIndex}-${faqIndex}`;
      newState[sectionKey] = !newState[sectionKey]; // Toggle the specific FAQ
      return newState;
    });
  };

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

  console.log(`output`, outPutQues);
  return (
    <div>
      <div className=" bg-light ">
        <div className="row g-4">
          {!singleData &&
            allUsersList.map((project, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-6"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  setsingleData(project);
                  setoutput(OnGOingprogress(project.id).output);
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

                    {/* <p className="text-muted small mb-4">
                    I distinguish three main text objectives. First, your
                    objective could be merely to inform people.
                  </p> */}

                    {/* <div className="row mb-3">
                    <div className="col">
                      <small className="text-muted">Start</small>
                      <div>
                        <span className="badge bg-primary-subtle text-primary">
                          {project.startDate}
                        </span>
                      </div>
                    </div>
                    <div className="col">
                      <small className="text-muted">Due</small>
                      <div>
                        <span className="badge bg-danger-subtle text-danger">
                          {project.dueDate}
                        </span>
                      </div>
                    </div>
                  </div> */}

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
        <div className="col-4">
          <div className="phase-sections mt-4">
            <div className="section-list" id="sectionList">
              {output?.map((section: any, index: any) => (
                <div
                  key={index}
                  className={`section-item } bg-white`}
                  onClick={() => {
                    setoutPutQues(section);
                    activateSection(index);
                  }}
                >
                  <div className="section-title">{section[0].block_name}</div>
                  <div className="section-count">
                    {section.length} questions
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-8 p-5 bg-white">
          <div id="sectionContents ">
            <div className="section-header bg-white">
              <h2 className="section-title" style={{ fontSize: "1.25rem" }}>
                {outPutQues[activeSectionIndex]?.block_name}
              </h2>
              <p className="section-description">
                Define the boundaries and scope of the problem we are trying to
                solve.
              </p>
            </div>
            <div className="section-content">
              <div className="faq-list ">
                {outPutQues.map((faq: any, faqIndex: number) => (
                  <div
                    className={`faq-item  ${
                      activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                        ? "active"
                        : ""
                    }`}
                    key={faqIndex}
                    onClick={() => toggleFaq(activeSectionIndex, faqIndex)}
                  >
                    <div className="faq-question bg-white">
                      <span className="question-text">{faq.question}</span>
                      <i
                        className={`toggle-icon ${
                          activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                            ? "ri-arrow-up-s-line"
                            : "ri-arrow-down-s-line"
                        }`}
                      ></i>
                    </div>
                    <div
                      className={`faq-answer bg-white ${
                        activeFaqs[`${activeSectionIndex}-${faqIndex}`]
                          ? "active"
                          : ""
                      }`}
                    >
                      <p>
                        {" "}
                        <AIOutputShow messages={faq.aiReply} />{" "}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { get_all_data, submitFormData } from "@/api/Reqest";
import React, { useState } from "react";
const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { groupBy } from "@/utils";
import ShowOutput from "@/shared/ShowOutput/ShowOutput";
import PhaseSummery from "../PropsedSystemMappainig/PhaseSummery";

const projects = [
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "Nexa - Next generation SAAS",
    tagline: "Creates limitless possibilities",
    startDate: "14 Jan, 17",
    dueDate: "15 Oct, 18",
    progress: 59,
    taskCount: 72,
    commentCount: 648,
  },
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "B & O - Food Company",
    tagline: "Creates limitless possibilities",
    startDate: "12 Jan, 14",
    dueDate: "17 Oct, 26",
    progress: 81,
    taskCount: 72,
    commentCount: 668,
  },
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "Ad Brand - Luxury Footwear",
    tagline: "Creates limitless possibilities",
    startDate: "22 Jan, 24",
    dueDate: "12 Oct, 23",
    progress: 78,
    taskCount: 34,
    commentCount: 432,
  },
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "Air B & B - Real Estate",
    tagline: "Creates limitless possibilities",
    startDate: "13 Jan, 14",
    dueDate: "14 Oct, 25",
    progress: 65,
    taskCount: 45,
    commentCount: 342,
  },
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "B & O - Food Company",
    tagline: "Tasty food for everyone",
    startDate: "23 Jan, 31",
    dueDate: "15 Oct, 22",
    progress: 74,
    taskCount: 123,
    commentCount: 542,
  },
  {
    logo: "../../../assets/icons/Profile.svg",
    name: "Nexa - Next generation",
    tagline: "Tasty food for everyone",
    startDate: "13 Jan, 21",
    dueDate: "25 Oct, 12",
    progress: 84,
    taskCount: 43,
    commentCount: 545,
  },
];

const PhaseOutput = () => {
  const [allUsersList, setAllUsersList] = React.useState([]);
  const [allPhaseList, setAllPhaseList] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null,
  );

  const [type, settype] = React.useState<number | null>(null);

  const [phaseID, setPhaseID] = React.useState<number | null>(null);
  const [selectedPhase, setselectedPhase] = React.useState<number>(null);

  const [expandedPhaseId, setExpandedPhaseId] = React.useState<number | null>(
    null,
  );

  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [outPutQues, setoutPutQues] = useState<any>([]);

  const togglePhase = (phaseId: number) => {
    setPhaseID(phaseId);
    setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllUsersURL = "users/all-members";
        const { data: allUsersList }: any = await get_all_data(getAllUsersURL);
        setAllUsersList(allUsersList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getSummeryPhaseOutput = async (phaseId: any, userId: any) => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    try {
      const page_list = `${API_URL}/summary-output-phase/phase-userId/${phaseId}/${userId}`;
      const method = "get";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      setoutput(data);
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type) {
          const getAllPhaseURL = "phases";
          const { data: allPhaseList }: any =
            await get_all_data(getAllPhaseURL);
          setAllPhaseList(allPhaseList);
        } else {
          if (selectedPhase && selectedUserId) {
            getSummeryPhaseOutput(selectedPhase, selectedUserId);
          }
        }

        console.log("allPhaseList", allPhaseList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedUserId, type]);

  const getPhaseOutput = async (id = null) => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    setoutPutQues([]);
    try {
      const page_list = `${API_URL}/user-ai-chat/userId-phaseId/${selectedUserId}/${phaseID}`;
      const method = "post";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      const res = data.filter((d: any) => d.phaseId == phaseID);

      if (res.length) {
        setoutput(Object.values(groupBy(res, "blockId")));
      }
      setrender(!render);
    } catch (error) {
      // seterror("Something Went Wrong");
    }
    setsubmit(false);
  };

  React.useEffect(() => {
    if (phaseID) {
      getPhaseOutput();
    }
  }, [phaseID]);

  return (
    <div className="container-fluid tab-panel">
      <div className="row tab-panel-body form-tab-panel-body">
        <div className="col-md-12 from-panel-wrap">
          <div className="row ">
            <div className="phase-wrapper">

              <div className=" min-vh-100">
                <div className="row g-4">
                  {projects.map((project, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <img
                                src={project.logo}
                                alt={project.name}
                                width={48}
                                height={48}
                                className="rounded-circle me-3"
                              />
                              <div>
                                <h5 className="mb-0">{project.name}</h5>
                                <small className="text-muted">
                                  {project.tagline}
                                </small>
                              </div>
                            </div>
                            <button className="btn btn-sm text-muted">
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                          </div>

                          <p className="text-muted small mb-4">
                            I distinguish three main text objectives. First,
                            your objective could be merely to inform people.
                          </p>

                          <div className="row mb-3">
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
                          </div>

                          <div className="mb-3">
                            <div className="d-flex justify-content-between small text-muted">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="progress" style={{ height: "6px" }}>
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="mt-auto d-flex text-muted small">
                            <div className="me-4 d-flex align-items-center">
                              <i className="bi bi-list-task me-1"></i>
                              <strong className="me-1">
                                {project.taskCount}
                              </strong>
                              Tasks
                            </div>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-chat-left-text me-1"></i>
                              <strong className="me-1">
                                {project.commentCount}
                              </strong>
                              Comments
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="forms-wrapper">
                <div className="mb-3">
                  <label htmlFor="user-select" className="form-label">
                    Select User
                  </label>
                  <select
                    id="user-select"
                    className="form-select"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setSelectedUserId(Number(e.target.value));
                    }}
                    value={selectedUserId || ""}
                  >
                    <option value="" disabled>
                      -- Select a User --
                    </option>
                    {allUsersList.map((user: any) => (
                      <option key={user.id} value={user.id}>
                        {user?.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="user-select" className="form-label">
                    Select Output Type
                  </label>
                  <select
                    id="user-select"
                    className="form-select"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      settype(Number(e.target.value));
                    }}
                    value={type || ""}
                  >
                    <option value="">Phase Topic Output</option>
                    <option value="1">Phase Summary Output</option>
                  </select>
                </div>

                {type == 1 && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="phase-select" className="form-label">
                        Select Phase
                      </label>
                      <select
                        id="phase-select"
                        className="form-select"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setselectedPhase(Number(e.target.value));
                        }}
                        value={selectedPhase || ""}
                      >
                        <option value="">Select</option>
                        {allPhaseList.map((phase: any) => (
                          <option key={phase.id} value={phase.id}>
                            {phase?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <PhaseSummery output={output} error={""} />
                  </>
                )}

                {selectedUserId && !type && (
                  <div className="phase-list">
                    <h4 style={{ marginBottom: "15px" }}>All Phase List</h4>
                    {allPhaseList.map((phase: any) => (
                      <div key={phase.id} className="phase-item">
                        <div
                          className="phase-header"
                          onClick={() => togglePhase(phase.id)}
                          style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            backgroundColor: "#f8f9fa",
                            padding: "10px",
                            border: "1px solid #ddd",
                            marginBottom: "5px",
                          }}
                        >
                          {phase.name}
                        </div>
                        {expandedPhaseId === phase.id && (
                          <div
                            className="phase-description"
                            style={{
                              padding: "10px",
                              border: "1px solid #ddd",
                              borderTop: "none",
                              backgroundColor: "",
                            }}
                          >
                            {/* {phase?.discription} */}
                            <ShowOutput
                              setoutPutQues={setoutPutQues}
                              output={output}
                              outPutQues={outPutQues}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseOutput;

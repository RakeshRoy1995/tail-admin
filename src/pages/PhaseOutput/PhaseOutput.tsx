import { get_all_data, submitFormData } from "@/api/Reqest";
import React, { useState } from "react";
const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { groupBy } from "@/utils";
import ShowOutput from "@/shared/ShowOutput/ShowOutput";
import PhaseSummery from "../PropsedSystemMappainig/PhaseSummery";

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

  console.log(`type`, type);

  return (
    <div className="container-fluid tab-panel">
      <div className="row tab-panel-body form-tab-panel-body">
        <div className="col-md-12 from-panel-wrap">
          <div className="row ">
            <div className="phase-wrapper">
              <h3>Phase Output</h3>
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

                    <PhaseSummery output={output} error={''} />
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

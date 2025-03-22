import { get_all_data } from "@/api/Reqest";
import React from "react";

const PhaseOutput = () => {
  const [allUsersList, setAllUsersList] = React.useState([]);
  const [allPhaseList, setAllPhaseList] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null,
  );
  const [expandedPhaseId, setExpandedPhaseId] = React.useState<number | null>(null);

  const togglePhase = (phaseId: number) => {
    setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllUsersURL = "users";
        const { data: allUsersList }: any = await get_all_data(getAllUsersURL);
        setAllUsersList(allUsersList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllPhaseURL = "phases";
        const { data: allPhaseList }: any = await get_all_data(getAllPhaseURL);
        setAllPhaseList(allPhaseList);

        console.log("allPhaseList", allPhaseList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedUserId]);

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
                              
                              
                {selectedUserId && (
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
                            {phase?.discription}
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

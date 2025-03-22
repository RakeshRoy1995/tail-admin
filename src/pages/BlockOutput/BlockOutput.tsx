import { get_all_data, submitFormData } from "@/api/Reqest";
import React, { useState } from "react";
const token = localStorage.getItem("token");
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { groupBy } from "@/utils";
import ShowOutput from "@/shared/ShowOutput/ShowOutput";

const BlockOutput = () => {
  const [allUsersList, setAllUsersList] = React.useState([]);
  const [allAllBlockList, setAllBlocksList] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null,
  );
  const [blockID, setBlockID] = React.useState<number | null>(null);

  const [expandedPhaseId, setExpandedPhaseId] = React.useState<number | null>(
    null,
  );


  const [render, setrender] = useState<any>(true);
  const [submit, setsubmit] = useState<any>(false);
  const [error, seterror] = useState<any>("");
  const [output, setoutput] = useState<any>([]);
  const [showMode, setshowMode] = useState<any>("");
  const [outPutQues, setoutPutQues] = useState<any>([]);
  const [textareaShow, settextareaShow] = useState<any>(false);

  const toggleBlock = (blockID: number) => {
    setBlockID(blockID);
    setExpandedPhaseId(expandedPhaseId === blockID ? null : blockID);
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
        const url = "blocks";
        const { data: allBlocksList }: any = await get_all_data(url);
        setAllBlocksList(allBlocksList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedUserId]);

  const getPhaseOutput = async () => {
    seterror("");
    setsubmit(true);
    setoutput([]);
    setoutPutQues([]);
    try {

      const page_list = `${API_URL}/user-ai-chat/userId/${selectedUserId}/blockId/${phaseID}`;
      const method = "PUT";

      const options = {
        method,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await submitFormData(page_list, options);
      const res = data.filter((d: any) => d.blockId == blockID);

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
    if (blockID) {
      getPhaseOutput();
    }
  }, [blockID]);

  return (
    <div className="container-fluid tab-panel">
      <div className="row tab-panel-body form-tab-panel-body">
        <div className="col-md-12 from-panel-wrap">
          <div className="row ">
            <div className="phase-wrapper">
              <h3>Block Output</h3>
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
                    <h4 style={{ marginBottom: "15px" }}>All Block List</h4>
                    {allAllBlockList?.map((block: any) => (
                      <div key={block.id} className="phase-item">
                        <div
                          className="phase-header"
                          onClick={() => toggleBlock(block.id)}
                          style={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            backgroundColor: "#f8f9fa",
                            padding: "10px",
                            border: "1px solid #ddd",
                            marginBottom: "5px",
                          }}
                        >
                          {block.name}
                        </div>
                        {expandedPhaseId === block.id && (
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

export default BlockOutput;

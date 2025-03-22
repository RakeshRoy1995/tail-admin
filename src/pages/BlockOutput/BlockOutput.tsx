import { get_all_data } from "@/api/Reqest";
import React from "react";

const BlockOutput = () => {
  const [allUsersList, setAllUsersList] = React.useState([]);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null,
    );
    



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

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockOutput;

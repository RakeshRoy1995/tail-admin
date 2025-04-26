import axiosInstance from "@/api/axios";
import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function UpdateBlock({ data, handleSubmit }: any) {
  const [phase, setphase] = useState([]);
  const [singledata, setsingledata] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/phases`);
        setphase(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(`phase`, phase);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-fill bg-white border rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center border-bottom p-4">
          <div>
            <h5 className="mb-1">Block</h5>
            <small className="text-muted">{data?.name}</small>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success">Save Changes</button>
            <button className="btn btn-outline-secondary" type="button">
              Cancel
            </button>
          </div>
        </div>

        <div className="p-4">
          <h6 className="mb-4">Update Block:</h6>

          {/* Username */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Name</label>
            <div className="col-sm-9 position-relative">
              <input
                type="text"
                name="name"
                defaultValue={data?.name}
                className="form-control bg-light"
              />
              <Check
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#20c997",
                }}
              />
            </div>
          </div>

          {/* description */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Description</label>
            <div className="col-sm-9">
              <div className="input-group">
                {/* <span className="input-group-text bg-light border-light text-muted">
                  @
                </span> */}
                <textarea
                  className="form-control bg-light"
                  name="discription"
                  cols={5}
                  rows={5}
                >
                  {data?.discription}
                </textarea>
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Prompt</label>
            <div className="col-sm-9 position-relative">
              <input
                type="text"
                name="prompt"
                defaultValue={data?.prompt}
                className="form-control bg-light"
              />
              <Check
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#20c997",
                }}
              />
            </div>
          </div>

          {/* sort */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Sort</label>
            <div className="col-sm-9 position-relative">
              <input
                type="text"
                name="sort"
                defaultValue={data?.sort}
                className="form-control bg-light"
              />
              <Check
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#20c997",
                }}
              />
            </div>
          </div>

          {/* Phase */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Phase</label>
            <div className="col-sm-9 position-relative">
              <select
                name="phaseId"
                className="form-select bg-light"
                onChange={(e) =>
                  setsingledata({
                    ...singledata,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                {phase.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#6c757d",
                }}
              />
            </div>
          </div>

          {/* Communication */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Status</label>
            <div className="col-sm-9 d-flex gap-4">
              {["Inactive", "Active"].map((method, index) => (
                <div
                  className="form-check d-flex align-items-center gap-2"
                  key={index}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    value={index}
                    name="status"
                    defaultChecked={data?.status == index}
                  />
                  <label className="form-check-label">{method}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

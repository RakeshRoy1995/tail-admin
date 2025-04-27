import axiosInstance from "@/api/axios";
import { submitFormData } from "@/api/Reqest";
import { Check, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function UpdateQuestion({ data, handleSubmit }: any) {
  const [phase, setphase] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [singledata, setsingledata] = useState<any>({});
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

  useEffect(() => {
    const fetchBlock = async (phase_id: any) => {
      try {
        const page_list = `${API_URL}/phases/get-block-by-phaseid`;
        const method = "POST";

        const options = {
          method,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            phase_id,
          },
        };

        const { data } = await submitFormData(page_list, options);
        console.log(`data`, data);
        setblocks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBlock(singledata.phaseId);
  }, [singledata.phaseId]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-fill bg-white border rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center border-bottom p-4">
          <div>
            <h5 className="mb-1">Question</h5>
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
          <h6 className="mb-4">{data?.status ? "Update" : "Add"} Block:</h6>

          {/* Username */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Name</label>
            <div className="col-sm-9 position-relative">
              <input
                type="text"
                name="question"
                defaultValue={data?.question_question}
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
                className="form-select bg-light"
                value={singledata?.phaseId || data?.phaseId}
                onChange={(e) =>
                  setsingledata({
                    ...singledata,
                    ['phaseId']: e.target.value,
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

          {/* Blocks */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Block</label>
            <div className="col-sm-9 position-relative">
              <select
                name="blockId"
                className="form-select bg-light"
                value={singledata?.blockId || data?.question_blockId}
                onChange={(e) =>
                  setsingledata({
                    ...singledata,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value={data?.question_blockId}>
                  {data?.blockName}
                </option>

                {blocks.map((item: any) => (
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

          {/* sort */}
          <div className="row mb-4 align-items-center">
            <label className="col-sm-3">Sort</label>
            <div className="col-sm-9 position-relative">
              <input
                type="text"
                name="sort"
                defaultValue={data?.question_sort}
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

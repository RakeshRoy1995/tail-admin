import { submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const GuidePrompt = () => {
  const [render, setrender] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [phases, setphases] = useState([]);
  const [blocks, setblocks] = useState([]);

  const {
    data,
    loading,
    error,
    fetchData,
    deleteData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    fetchSingleDataCommonByID,
    setsingleData,
    singleData,
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/phase-prompt`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: "Question",
      selector: (row: any) => row.question,
      sortable: true,
    },
    {
      name: "prompt",
      selector: (row: any) => row.prompt,
      sortable: true,
    },

    {
      name: "Phase",
      selector: (row: any) => findPhaseName(row.phaseId),
      sortable: true,
    },

    {
      name: "Block",
      selector: (row: any) => findBlockName(row.blockId),
      sortable: true,
    },

    {
      name: "Sort Order",
      selector: (row: any) => row.sort,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => (row.status == 1 ? "Active" : "Inactive"),
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.id, false, true, true)}</>
      ),
    },
  ];

  const handleStatusChange = (e: any) => {
    setsingleData((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submissionData = {
      ...singleData,
      color,
    };

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    console.log("Submitting Data:", submissionData);

    let page_list = `${API_URL}/phase-prompt`;
    let method = "POST";

    if (singleData?.id) {
      page_list = `${API_URL}/phase-prompt/${singleData?.id}`;
      method = "PUT";
    }
    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetchDataCommon(page_list, options);
    setsingleData(null);

    // Add API call logic here
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/phase-prompt/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetchSingleDataCommonByID(page_list, options);
      setrender(true);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/phase-prompt/${id}`;
      deleteData(page_list);
      // fetchData();
    }
    setrender(true);
    setaddFormShow(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchPhaseBlock = async () => {
    const page_list = `${API_URL}/phases`;
    const options = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data} =  await submitFormData(page_list, options);
    console.log(`data`, data);
    setphases(data)
    const page_list1 = `${API_URL}/blocks`;
    const options1 = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data: data1} =  await submitFormData(page_list1, options1);
    console.log(`data1`, data1);
    setblocks(data1)
  };

  const findPhaseName = (id: any) => {
    const phase = phases.find((phase: any) => phase.id === id);
    return phase ? phase.name : "";
  }

  const findBlockName = (id: any) => {
    const phase = blocks.find((block: any) => block.id === id);
    return phase ? phase.name : "";
  }

  const fetchInitData = async () => {
    fetchPhaseBlock();
    fetchData();
    
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (common_data) {
      setaddFormShow(false);
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      fetchData();
      setsingleData(null);
      const form: any = document.querySelector("form");
      form.reset();
    }

    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message ? error?.data?.message : error,
        confirmButtonText: "Close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (deleteMsg) {
      //show success message
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  console.log(`blocks`, blocks , phases);

  return (
    <div className="container-fluid tab-panel">
      <div className="row tab-panel-body form-tab-panel-body">
        <div className="col-md-12 from-panel-wrap">
          <div className="row ">
            <div className="phase-wrapper">
              <h3>Prompts</h3>
              <div className="forms-wrapper">
                <form id="avatar-form" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label
                      htmlFor="phase-name"
                      className="col-form-label col-sm-4"
                    >
                      Question
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="AI Name"
                        required
                        defaultValue={singleData?.name}
                        onChange={(e) =>
                          setsingleData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Code Name"
                      className="col-form-label col-sm-4"
                    >
                      Code Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="code"
                        className="form-control"
                        id="Code Name"
                        placeholder="code"
                        required
                        defaultValue={singleData?.code}
                        onChange={(e) =>
                          setsingleData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="Sort Order"
                      className="col-form-label col-sm-4"
                    >
                      Sort Order
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        name="sort"
                        className="form-control"
                        id="Sort Order"
                        placeholder="Order"
                        required
                        defaultValue={singleData?.sort}
                        onChange={(e) =>
                          setsingleData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="status" className="col-form-label col-sm-4">
                      Status
                    </label>
                    <div className="col-sm-8">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="status"
                          checked={singleData?.status}
                          onChange={handleStatusChange}
                        />
                        <label className="form-check-label" htmlFor="status">
                          Active / Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-sm-12 d-flex justify-content-end gap-2 mt-5">
                    {singleData?.id ? (
                      <UpdateButton
                        setsingleData={setsingleData}
                        loading={loading}
                        setaddFormShow={setaddFormShow}
                      />
                    ) : (
                      <AddButton
                        setsingleData={setsingleData}
                        loading={loading}
                        setaddFormShow={setaddFormShow}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table
        rows={data || []}
        column={column}
        getheaderColor={getheaderColor}
      />
    </div>
  );
};

export default GuidePrompt;

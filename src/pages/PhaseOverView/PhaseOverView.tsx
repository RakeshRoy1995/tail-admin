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

const PhaseOverView = () => {
  const [render, setrender] = useState(true);
  const [color, setColor] = useState("#ffffff");
 

  const colorOptions = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
  ];

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
  } = useFetch(`${API_URL}/phases`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.discription,
      sortable: true,
    },
    {
      name: "Prompt",
      selector: (row: any) => row.prompt,
      sortable: true,
    },
    {
      name: "Sort Order",
      selector: (row: any) => row.sort,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row: any) => row.color,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.id, false, true, true)}</>
      ),
    },
  ];

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setsingleData((prev) => ({
      ...prev,
      [id]: id === "sort" ? (value === "1" ? "1" : "0") : value,
    }));
  };

  const handleFileChange = (e: any) => {
    setsingleData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleStatusChange = (e: any) => {
    setsingleData((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submissionData = {
      ...singleData,
      color,
    };
    console.log("Submitting Data:", submissionData);

    let page_list = `${API_URL}/phases`;
    let method = "POST";

    if (singleData?.id) {
      page_list = `${API_URL}/phases/${singleData?.id}`;
      method = "PUT";
    }
    const options = {
      method,
      data: submissionData,
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
      const page_list = `${API_URL}/phases/${id}`;
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
      const page_list = `${API_URL}/phases/${id}`;
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

  const fetchInitData = async () => {
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

  console.log("dtata", data);

  return (
    <div className="container-fluid tab-panel">
      <div className="row tab-panel-body form-tab-panel-body">
        <div className="col-md-12 from-panel-wrap">
          <div className="row ">
            <div className="phase-wrapper">
              <h3>Phase Information</h3>
              <div className="forms-wrapper">
                <form id="avatar-form" onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <label htmlFor="img" className="col-form-label col-sm-4">
                      Avatar
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="file"
                        className="form-control"
                        id="img"
                        accept="image/*"
                        defaultValue={singleData?.img}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="phase-name"
                      className="col-form-label col-sm-4"
                    >
                      Phase Name *
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Phase Name"
                        required
                        defaultValue={singleData?.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="phase-description"
                      className="col-form-label col-sm-4"
                    >
                      Phase Description *
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        id="discription"
                        rows={4}
                        placeholder="Enter Phase Description"
                        required
                        defaultValue={singleData?.discription}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="phase-description"
                      className="col-form-label col-sm-4"
                    >
                      prompt *
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        id="prompt"
                        rows={4}
                        placeholder="Enter prompt"
                        required
                        defaultValue={singleData?.prompt}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="sort-order"
                      className="col-form-label col-sm-4"
                    >
                      Sort Order
                    </label>
                    <div className="col-sm-8 d-flex align-items-center">
                      <div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="0"
                            value="0"
                            checked={singleData?.sort}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="email">
                            Email
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="0"
                            value="0"
                            checked={singleData?.sort}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="phone">
                            Phone
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="phase-name"
                      className="col-form-label col-sm-4"
                    >
                      Color *
                    </label>
                    <div className="col-sm-8">
                      <SketchPicker
                        color={color}
                        onChangeComplete={(newColor) => setColor(newColor.hex)}
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
                  <div className="d-flex justify-content-end gap-2 col-sm-12 submit-box">
                    {/* <span>
                      <button type="button" className="btn btn-secondary">
                        Discard
                      </button>
                    </span>
                    <span>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </span> */}

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

export default PhaseOverView;

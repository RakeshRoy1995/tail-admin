import React, { useEffect, useState } from "react";
import profileImage from "../../../assets/icons/Profile.svg";
import { current_user_infos } from "@/utils";
import { submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const EditUserProfile = () => {
  const currentUserData = current_user_infos();
  const navigate = useNavigate();
  console.log("currentUserData", currentUserData);

  const [isLoading, setIsLoading] = useState(false); // Add loading state

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
  } = useFetch(`${API_URL}/users`);

  const fetchInitData = async () => {
    fetchData();
  };

  const fetchDataByID = async () => {
    const page_list = `${API_URL}/users/${currentUserData?.id}`;
    const options = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetchSingleDataCommonByID(page_list, options);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchDataByID();
  }, []);

  console.log("singleData", singleData);

  const handleEditProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/users/${currentUserData?.id}`;
    const method = "PATCH";

    const options = {
      method,
      data: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await submitFormData(page_list, options);
      toast.success("Profile Updated!");
      fetchDataByID();
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      toast.error("Profile Update Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container py-3" style={{ maxWidth: "800px" }}>
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-0">
                {/* Top navigation tabs */}
                <div className="px-3 border-bottom">
                  <ul className="nav">
                    <li className="nav-item">
                      <a
                        className="nav-link active text-primary d-flex align-items-center"
                        href="#profile"
                      >
                        <i
                          className="bi bi-circle-fill text-primary me-1"
                          style={{ fontSize: "8px" }}
                        ></i>
                        Profile
                      </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link text-secondary d-flex align-items-center"
                        href="#account"
                      >
                        <i
                          className="bi bi-person me-1"
                          style={{ fontSize: "16px", opacity: 0.5 }}
                        ></i>
                        Account
                      </a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a
                        className="nav-link text-secondary d-flex align-items-center"
                        href="#changePassword"
                      >
                        <i
                          className="bi bi-key me-1"
                          style={{ fontSize: "16px", opacity: 0.5 }}
                        ></i>
                        Change Password
                      </a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a
                        className="nav-link text-secondary d-flex align-items-center"
                        href="#settings"
                      >
                        <i
                          className="bi bi-gear me-1"
                          style={{ fontSize: "16px", opacity: 0.5 }}
                        ></i>
                        Settings
                      </a>
                    </li> */}
                  </ul>
                </div>

                {/* Form content */}
                <div className="px-4 py-4">
                  <h6 className="mb-4 text-dark">User Info:</h6>

                  <form onSubmit={handleEditProfile}>
                    {/* Avatar */}
                    {/* <div className="row mb-4">
                      <div className="col-md-2 text-md-end">
                        <label className="form-label text-muted mt-2">
                          Avatar
                        </label>
                      </div>
                      <div className="col-md-10">
                        <div
                          className="position-relative"
                          style={{ width: "80px" }}
                        >
                          <div
                            className="bg-light border rounded"
                            style={{
                              width: "80px",
                              height: "80px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i
                              className="bi bi-person"
                              style={{ fontSize: "40px", color: "#ccc" }}
                            >
                              <img src={profileImage} alt="Profile" />
                            </i>
                          </div>
                          <div
                            className="position-absolute bg-white rounded-circle shadow-sm"
                            style={{ top: "0", right: "0", padding: "3px" }}
                          >
                            <i
                              className="bi bi-pencil text-secondary"
                              style={{ fontSize: "10px" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* First Name */}
                    <div className="row mb-3">
                      <div className="col-md-2 text-md-end">
                        <label
                          htmlFor="firstName"
                          className="form-label text-muted mt-2"
                        >
                          User Name
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control bg-light"
                          id="username"
                          name="username"
                          value={singleData?.username}
                          onChange={(event) => {
                            setsingleData({
                              ...singleData,
                              [event.target.name]: event.target.value,
                            });
                          }}
                          style={{ maxWidth: "350px" }}
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="row mb-3">
                      <div className="col-md-2 text-md-end">
                        <label
                          htmlFor="lastName"
                          className="form-label text-muted mt-2"
                        >
                          Email Address
                        </label>
                      </div>
                      <div className="col-md-10">
                        <input
                          type="email"
                          className="form-control bg-light"
                          id="email"
                          name="email"
                          value={singleData?.email}
                          onChange={(event) => {
                            setsingleData({
                              ...singleData,
                              [event.target.name]: event.target.value,
                            });
                          }}
                          style={{ maxWidth: "350px" }}
                        />
                      </div>
                    </div>

                    {/* Save Changes Button */}
                    <div className="row mt-4">
                      <div className="col-12 text-end">
                        <button
                          type="submit"
                          className="btn btn-primary px-4"
                          style={{ width: "170px" }} // Fixed button size
                          disabled={isLoading} // Disable button while loading
                        >
                          {isLoading ? "Saving..." : "Save Changes"}{" "}
                          {/* Show loading text */}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUserProfile;

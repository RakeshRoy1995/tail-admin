import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import { get_all_data, submitFormData } from "@/api/Reqest";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import Select from "react-select";
import { motion } from "framer-motion";
import {
  get_org_organizationLevelId,
  get_org_UserGrp,
  validatePassword,
} from "@/utils";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const User = () => {
  const [role, setrole] = useState<any>([]);
  const [user, setuser] = useState<any>([]);
  const [userDetails, setuserDetails] = useState<any>(null);
  const [errMsg, seterrMsg] = useState<any>("");
  const [employInfo, setEmployInfo] = useState<any>([]);
  const [combinedOptions, setCombinedOptions] = useState<any>([]);
  const [selectedRoles, setSelectedRoles] = useState({
    Employee: true,
    Trainer: false,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const { t } = useTranslation();
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
  } = useFetch(`${API_URL}/employee?currentPage=1&pageSize=10000`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: t("Name"),
      selector: (row: any) => row.name,
      sortable: true,
      width: "150px",
    },

    {
      name: t("User name"),
      selector: (row: any) => row.username,
      sortable: true,
    },

    {
      name: t("Organization Type"),
      selector: (row: any) => row.organizationType,
      sortable: true,
      width: "105px",
    },

    {
      name: t("Email"),
      selector: (row: any) => row.email,
      sortable: true,
      width: "195px",
    },

    {
      name: t("action"),
      width: "95px",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.userId, false, true, false)}</>
      ),
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    const role = [];
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      if (key == "roleIds__") {
        role.push(value);
      }
      obj = { ...obj, [key]: value };
    }

    obj.roleIds = role;
    obj.isEmployee = true;
    obj.isTrainer = selectedRoles?.Trainer;

    let page_list = `${API_URL}/user/create`;
    let method = "POST";

    if (singleData?.userId) {
      page_list = `${API_URL}/user/update/${singleData?.userId}`;
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
  };

  const role_list_api = async () => {
    const user_role_level = get_org_organizationLevelId();
    const grp_id = selectedRoles?.Trainer == true ? [1, 2] : [1];

    const userGroup = grp_id.join(",");

    const apiEndPoint =
      "role/getRoleByGroupAndOrgLevel?userGroupId=" +
      userGroup +
      "&orgLevel=" +
      user_role_level +
      "";

    if (userDetails?.personId) {
      const response_ministry_List: any = await get_all_data(apiEndPoint);
      const ministry_List_Array = response_ministry_List?.data;
      setrole(ministry_List_Array);
    }
  };

  const user_list_api = async () => {
    const apiEndPoint = "user?currentPage=1&pageSize=100000000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setuser(ministry_List_Array);
  };

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/user/by/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const userData: any = await submitFormData(page_list, options);

      if (userData?.data?.userId) {
        const option = combinedOptions.filter(
          (d: any) => d.value == userData?.data?.employeeId,
        );
        setSelectedOption(option);

        const details = data?.content.find(
          (d: any) => d.employeeId == userData?.data?.employeeId,
        );
        setuserDetails(details);

        setsingleData({
          ...userData?.data,
          ...details,
          ["employeeId"]: userData?.data?.employeeId,
        });
      }

      console.log(`combinedOptions`, combinedOptions);
      setaddFormShow(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const fetchInitData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
    user_list_api();
  }, []);

  useEffect(() => {
    role_list_api();
  }, [selectedRoles, userDetails?.personId]);

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      fetchData();
      user_list_api();
      setaddFormShow(false);
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

  // State to track selected roles (Employee and/or Trainer)

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "Trainer") {
      setSelectedRoles((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }
  };

  // Combine options dynamically based on checkbox selection

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "5px", // Increase padding here
      borderRadius: "0.375rem", // Optional, adjust border radius
      minHeight: "3rem", // Ensure input height is sufficient
      boxShadow: "none", // Optional, remove default box shadow
    }),
    input: (provided) => ({
      ...provided,
      padding: "0.5rem", // You can adjust input padding here
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem", // Optional, adjust placeholder text size
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem", // Optional, round menu corners
    }),
  };

  useEffect(() => {
    if (employInfo?.length > 0) {
      const options = employInfo?.map((item: any) => ({
        label: item?.codeWithName,
        value: item?.employeeId,
      }));
      setCombinedOptions(options);
    }
  }, [employInfo]);
  // Fetch org lvl
  useEffect(() => {
    const fetchEmployInfo = async () => {
      try {
        const page_list = `${API_URL}/employee/by/active`;
        const options = {
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data }: any = await submitFormData(page_list, options);

        setEmployInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployInfo();
  }, []);

  const confrmPass = singleData?.password == singleData?.confirmPassword;

  console.log(`data?.content`, data?.content , userDetails);
  return (
    <>
      {addFormShow ? (
        <Breadcrumb name1={t("User")} name2={t("User")} />
      ) : (
        <BreadcumbWithButton
          name={t("User")}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {addFormShow && (
          <form
            action="submit"
            className="px-6 py-10 space-y-6 shadow-lg rounded-xl bg-white "
            onSubmit={handleSubmit}
          >
            <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {/* employ or trainer */}
              <div>
                <div className="flex items-center space-x-6 ">
                  {/* Employee Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="employee"
                      name="Employee"
                      checked={selectedRoles.Employee}
                      onChange={() => {}}
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500
            "
                      disabled
                    />
                    <label
                      htmlFor="employee"
                      className="ml-2 text-sm text-gray-700"
                    >
                      {t("Employee")}
                    </label>
                  </div>

                  {/* Trainer Checkbox */}
                  {userDetails?.personId && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="trainer"
                        name="Trainer"
                        checked={selectedRoles.Trainer}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="trainer"
                        className="ml-2 text-sm text-gray-700"
                      >
                        {t("Trainer")}
                      </label>
                    </div>
                  )}

                  <input
                    type="hidden"
                    value={userDetails?.personId}
                    name="userPersonId"
                  />
                  <input
                    type="hidden"
                    value={userDetails?.organizationLevelId}
                    name="organizationLevelId"
                  />
                </div>

                {/* Show React Select when at least one checkbox is checked */}

                {(selectedRoles?.Employee || selectedRoles?.Trainer) && (
                  <div className="mt-5">
                    <label
                      htmlFor="combinedSearch"
                      className="block text-sm bg-white ml-5 -mt-2 mb-2 z-10 absolute"
                    >
                      {t("Search")}
                    </label>
                    <Select
                      name="employeeId"
                      className="relative"
                      id="combinedSearch"
                      options={combinedOptions}
                      value={selectedOption}
                      onChange={(e: any) => {
                        const details = employInfo.find(
                          (d: any) => d.employeeId == e.value,
                        );
                        setuserDetails(details);

                        setSelectedOption(e);

                        setsingleData({
                          ...singleData,
                          ...details,
                          ["employeeId"]: e.value,
                          ["name"]:
                            details?.person?.firstName +
                            " " +
                            details?.person?.lastName,
                          ["phone"]: details?.person?.mobileNo,
                        });
                      }}
                      isSearchable
                      placeholder={t("Search...")}
                      styles={customStyles}
                    />
                  </div>
                )}
              </div>
              <div></div>
              <div></div>
              <div></div>

              {/*  Name */}
              <div className="flex flex-col relative ">
                <label
                  htmlFor="name"
                  className="text-sm absolute -mt-2 ml-4 mb-2  text-QuaternaryColor"
                >
                  {t("Name")}
                </label>
                <input
                  readOnly
                  required
                  maxLength={50}
                  name="name"
                  id="name"
                  value={singleData?.name}
                  type="text"
                  placeholder={t("Write your name here")}
                  className="border p-4 rounded h-14 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col relative ">
                <label
                  htmlFor="phone"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  {t("Phone")}
                </label>
                <input
                  readOnly
                  required
                  maxLength={13}
                  name="phone"
                  id="phone"
                  value={singleData?.phone}
                  type="text"
                  placeholder={t("Write your phone here")}
                  className="border p-4 rounded h-14 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* email */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="email"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  {t("Email")}
                </label>
                <input
                  required
                  maxLength={50}
                  name="email"
                  onChange={(e: any) => {
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  id="email"
                  value={singleData?.email}
                  type="text"
                  placeholder={t("Write your email here")}
                  className="border p-4 rounded h-14"
                />
              </div>

              {userDetails?.personId && (
                <div className="flex flex-col relative">
                  <label
                    htmlFor="roleIds"
                    className="text-sm absolute -mt-2 ml-4 mb-2 bg-white z-10"
                  >
                    {t("Role")}
                  </label>
                  <Select
                    isMulti
                    required
                    name="roleIds__"
                    className="basic-multi-select  relative"
                    closeMenuOnSelect={false}
                    onChange={(e: any) => {
                      const roles = e.map((d: any) => {
                        return d.value;
                      });
                      setsingleData({
                        ...singleData,
                        ["roles"]: roles,
                      });
                    }}
                    value={role?.map((m_d: any) => {
                      if (
                        singleData?.roles?.length &&
                        singleData?.roles.find(
                          (rol: any) =>
                            rol == m_d.roleId || rol.roleId == m_d.roleId,
                        )
                      ) {
                        return {
                          label: m_d.name,
                          value: m_d.roleId,
                        };
                      }
                    })}
                    options={role?.map((m_d: any) => {
                      return {
                        label: m_d.name,
                        value: m_d.roleId,
                      };
                    })}
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        width: "full", // Set the width you want
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "60px", // Set the minimum height you want
                      }),
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col relative ">
                <label
                  htmlFor="password"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  {t("Password")}
                </label>
                <input
                  // required
                  maxLength={50}
                  name="password"
                  id="password"
                  onChange={(e: any) => {
                    const msg = validatePassword(e.target.value);
                    seterrMsg(msg);

                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  // defaultValue={singleData?.password}
                  type="password"
                  placeholder={t("Write your password here")}
                  className="border p-4 rounded h-14"
                />
              </div>

              <div className="flex flex-col relative ">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  {t("Confirm Password")}
                </label>
                <input
                  // required
                  maxLength={50}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e: any) => {
                    const msg = validatePassword(e.target.value);
                    seterrMsg(msg);
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  type="password"
                  placeholder={t("Write your confirm password")}
                  className="border p-4 rounded h-14"
                />

                {errMsg}
                {singleData?.confirmPassword && (
                  <>
                    {!confrmPass && (
                      <p>{t("Password and confirm Password mis matched")}</p>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col relative">
                <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
                  {t("Status")}
                </label>
                <select
                  required
                  data-tooltip="Select Project Status"
                  name="empRecStatus"
                  id="empRecStatus"
                  className=" block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="A" selected={singleData?.empRecStatus == "A"}>
                    {t("Active")}
                  </option>
                  <option value="I" selected={singleData?.empRecStatus == "I"}>
                    {t("Inactive")}
                  </option>
                </select>
                <DropDownIcon />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              {singleData?.userId ? (
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
        )}

        <Table
          rows={user || []}
          column={column}
          getheaderColor={getheaderColor}
        />
      </motion.div>
    </>
  );
};

export default User;

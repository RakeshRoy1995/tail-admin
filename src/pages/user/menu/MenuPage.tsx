import React, { useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Select from "react-select";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { get_all_data } from "@/api/Reqest";
import { motion } from "framer-motion";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { get_parent_name } from "@/utils";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const MenuPage = () => {
  const selectRef = useRef(null);
  const [isEditMood, setIsEditMood] = useState<boolean>(true);
  const [permission, setpermission] = useState<any>([]);
  const [Module, setModule] = useState<any>([]);
  const [usrGroup, setusrGroup] = useState<any>([]);

  const [render, setrender] = useState(true);
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
    setaddFormShow,
    addFormShow,
  } = useFetch(`${API_URL}/menu`);
  const { t } = useTranslation();

  const handleClear = () => {
    if (selectRef.current) {
      setsingleData({ ...singleData, ["parentId"]: "" });
      selectRef.current.clearValue(); // Clears the selected value
    }
  };

  // console.log(`singleData`, singleData);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: t("Name"),
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: t("Route"),
      selector: (row: any) => row.route,
      sortable: true,
    },

    {
      name: t("Parent"),
      selector: (row: any) => get_parent_name(row.parentId)?.name,
      sortable: true,
    },

    {
      name: t("Module"),
      selector: (row: any) => (
        <>
          {
            <>
              {row.menuModuleIds?.includes(1) ? t("USER") : ""}

              {row.menuModuleIds?.includes(2) ? t("CMS") : ""}

              {row.menuModuleIds?.includes(3) ? t("LMS") : ""}

              {row.menuModuleIds?.includes(4) ? t("Accounting") : ""}
            </>
          }
        </>
      ),
      sortable: true,
    },

    {
      name: t("User Group"),
      selector: (row: any) => (
        <>
          {
            <>
              {row.userGroupIds?.includes(1) ? t("Employee") : ""}

              {row.userGroupIds?.includes(2) ? t("Trainer") : ""}

              {row.userGroupIds?.includes(3) ? t("Participant") : ""}

              {row.userGroupIds?.includes(4) ? t("Training Institute") : ""}

              {row.userGroupIds?.includes(5) ? t("Other") : ""}
            </>
          }
        </>
      ),
      sortable: true,
    },

    {
      name: t("Action"),
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.id)}</>,
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    let preFixLink: any = "";
    const permissionIds = [];
    const userGroupId = [];
    const menuModuleId = [];
    for (const [key, value] of formData) {
      console.log(key, ":", value);

      if (key == "permissionId") {
        permissionIds.push(value);
      } else if (key == "userGroupIds") {
        userGroupId.push(value);
      } else if (key == "menuModuleIds") {
        menuModuleId.push(value);
      } else {
        if (key == "Project") {
          preFixLink = value;
        }
        obj = { ...obj, [key]: value };
      }
    }
    const newRouteWithPreFix =
      obj.route[0] == "/"
        ? preFixLink + obj.route.substring(1)
        : preFixLink + obj.route;

    obj.route = newRouteWithPreFix;

    obj.permissionIds = permissionIds;
    obj.userGroupIds = userGroupId;
    obj.menuModuleIds = menuModuleId;

    let page_list = `${API_URL}/menu`;
    let method = "POST";

    if (singleData?.id) {
      page_list = `${API_URL}/menu/${singleData?.id}`;
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
    setaddFormShow(false);
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/menu/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetchSingleDataCommonByID(page_list, options);
      setrender(true);
      setaddFormShow(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (type == "delete") {
      const page_list = `${API_URL}/menu/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const ministry_List_API = async () => {
    const apiEndPoint = "permission";
    const response_ministry_List = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setpermission(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const module_List_API = async () => {
    const apiEndPoint = "menu-modules";
    const response_ministry_List = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setModule(ministry_List_Array);
  };

  const user_grp_List_API = async () => {
    const apiEndPoint = "user-group";
    const response_ministry_List = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setusrGroup(ministry_List_Array);
  };

  const fetchInitData = async () => {
    fetchData();
    ministry_List_API();
    module_List_API();
    user_grp_List_API();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

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

  return (
    <>
      {addFormShow ? (
        <Breadcrumb name1={t("Menu")} name2={t("Menu")} />
      ) : (
        <BreadcumbWithButton
          name={t("Menu")}
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
            onSubmit={handleSubmit}
            className={`${isEditMood ? "block" : "hidden"} w-full`}
          >
            <input type="hidden" name="id" value={singleData?.id} />
            <div className="bg-white rounded-xl shadow-md p-10 mb-5 xl:w-full lg:w-[46rem] overflow-hidden lg:overflow-x-hidden">
              {/*  Name */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5  relative mb-5 w-full container mx-auto px-4">
                <div className="flex flex-col relative">
                  <label
                    htmlFor="projectName"
                    className="text-sm absolute -mt-2 ml-3 mb-2 bg-white"
                  >
                    {t("Name")} <span className="required_field">*</span>
                  </label>
                  <input
                    name="name"
                    id="projectName"
                    type="text"
                    required
                    placeholder={t("Write menu name here")}
                    className="border p-4 rounded-md h-14 text-sm"
                    defaultValue={singleData?.name}
                  />
                </div>
                {/*   Route */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="route"
                    className="text-sm absolute -mt-2 ml-3 mb-2 bg-white"
                  >
                    {t("Route")} <span className="required_field">*</span>
                  </label>
                  <input
                    name="route"
                    id="route"
                    placeholder={t("Route")}
                    required
                    className="border p-4 rounded-md h-14 text-sm"
                    defaultValue={singleData?.route}
                  />
                </div>
                {/*   Parent */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="parent"
                    className="text-sm absolute -mt-2 z-10 ml-3 mb-2 bg-white"
                  >
                    {t("Parent")}
                    {singleData?.parentId && (
                      <button
                        type="button"
                        className="text-red-600 mx-1"
                        onClick={handleClear}
                      >
                        {t("Clear")}
                      </button>
                    )}
                  </label>
                  <Select
                    ref={selectRef}
                    isClearable
                    name="parentId"
                    className=" rounded-md h-14 text-sm relative"
                    menuPortalTarget={document.body}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      container: (provided) => ({
                        ...provided,
                        width: "100%", // Set the width you want
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "55px", // Set the minimum height you want
                      }),
                    }}
                    value={data?.map((m_d: any) => {
                      if (singleData?.parentId == m_d.id) {
                        return {
                          label: m_d.name,
                          value: m_d.id,
                        };
                      }
                    })}
                    onChange={(e: any) => {
                      setsingleData({ ...singleData, ["parentId"]: e.value });
                    }}
                    options={data?.map((m_d: any) => {
                      return {
                        label: m_d.name,
                        value: m_d.id,
                      };
                    })}
                  />
                </div>

                {/*        Permission */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="projectName"
                    className="text-sm z-10 mt-2 ml-3 mb-2 bg-white absolute"
                  >
                    {t("Permission")}
                  </label>
                  <Select
                    isMulti
                    name="permissionId"
                    className=" py-4 rounded-md h-14 text-sm relative"
                    closeMenuOnSelect={false}
                    menuPortalTarget={document.body}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      container: (provided) => ({
                        ...provided,
                        width: "100%", // Set the width you want
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "55px", // Set the minimum height you want
                      }),
                    }}
                    onChange={(e: any) => {
                      const permissionIds = e.map((d: any) => {
                        return d.value;
                      });
                      setsingleData({
                        ...singleData,
                        ["permissionIds"]: permissionIds,
                      });
                    }}
                    value={permission?.map((m_d: any) => {
                      if (
                        singleData?.permissionIds?.length &&
                        singleData?.permissionIds.includes(m_d.permissionId)
                      ) {
                        return {
                          label: m_d.title + " - " + m_d.name,
                          value: m_d.permissionId,
                        };
                      }
                    })}
                    options={permission?.map((m_d: any) => {
                      return {
                        label: m_d.title + " - " + m_d.name,
                        value: m_d.permissionId,
                      };
                    })}
                  />
                </div>

                <div className="flex flex-col relative ">
                  <label
                    htmlFor="parent"
                    className="text-sm absolute mt-2 z-10 ml-3 mb-2 bg-white"
                  >
                    {t("Module")}
                  </label>
                  <Select
                    isMulti
                    name="menuModuleIds"
                    className=" py-4 rounded-md h-14 text-sm relative"
                    closeMenuOnSelect={false}
                    menuPortalTarget={document.body}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      container: (provided) => ({
                        ...provided,
                        width: "100%", // Set the width you want
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "55px", // Set the minimum height you want
                      }),
                    }}
                    onChange={(e: any) => {
                      const menuModuleIds = e.map((d: any) => {
                        return d.value;
                      });
                      setsingleData({
                        ...singleData,
                        ["menuModuleIds"]: menuModuleIds,
                      });
                    }}
                    value={Module?.map((m_d: any) => {
                      if (
                        singleData?.menuModuleIds?.length &&
                        singleData?.menuModuleIds.includes(m_d.menuModuleId)
                      ) {
                        return {
                          label: m_d.name,
                          value: m_d.menuModuleId,
                        };
                      }
                    })}
                    options={Module?.map((m_d: any) => {
                      return {
                        label: m_d.name,
                        value: m_d.menuModuleId,
                      };
                    })}
                  />
                </div>

                <div className="flex flex-col relative ">
                  <label
                    htmlFor="parent"
                    className="text-sm absolute mt-2 z-10 ml-3 mb-2 bg-white"
                  >
                    {t("User Group")}
                  </label>
                  <Select
                    isMulti
                    name="userGroupIds"
                    className="py-4 rounded-md h-14 text-sm relative"
                    closeMenuOnSelect={false}
                    menuPortalTarget={document.body}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      container: (provided) => ({
                        ...provided,
                        width: "100%", // Set the width you want
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "55px", // Set the minimum height you want
                      }),
                    }}
                    onChange={(e: any) => {
                      const userGroupIds = e.map((d: any) => {
                        return d.value;
                      });
                      setsingleData({
                        ...singleData,
                        ["userGroupIds"]: userGroupIds,
                      });
                    }}
                    value={usrGroup?.map((m_d: any) => {
                      if (
                        singleData?.userGroupIds?.length &&
                        singleData?.userGroupIds.includes(m_d.userGroupId)
                      ) {
                        return {
                          label: m_d.userGroupName,
                          value: m_d.userGroupId,
                        };
                      }
                    })}
                    options={usrGroup?.map((m_d: any) => {
                      return {
                        label: m_d.userGroupName,
                        value: m_d.userGroupId,
                      };
                    })}
                  />
                </div>
                <div className="flex flex-col relative mt-2">
                  <label
                    htmlFor="seqNo"
                    className="text-sm absolute -mt-2 ml-3 mb-2 bg-white"
                  >
                    {t("Sequence Number")} <span className="required_field">*</span>
                  </label>
                  <input
                    name="seqNo"
                    id="seqNo"
                    placeholder={t("Sequence Number")}
                    required
                    className="border p-4 rounded-md h-14 text-sm"
                    defaultValue={singleData?.seqNo}
                  />
                </div>
              </div>
              {/* Sector Description */}

              <div className="flex flex-col w-1/2 relative"></div>

              

              {/* Add Button - Right Aligned */}
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
        )}

        <Table
          rows={data || []}
          column={column}
          getheaderColor={getheaderColor}
        />
      </motion.div>
    </>
  );
};

export default MenuPage;

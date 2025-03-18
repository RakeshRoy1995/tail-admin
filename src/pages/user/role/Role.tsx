import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { motion } from "framer-motion";
import PartnerOrgComponent from "@/shared/partner-organization/PartnerOrgComponent";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const Role = () => {
  const [isEditMood, setIsEditMood] = useState<boolean>(true);
  const [userGrp, setUserGrp] = useState([])
  const [organizationLvL, setOrganizationLvL] = useState([])
  const handleCancel = () => {
    setIsEditMood(!isEditMood);
  };
  const { t } = useTranslation();
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
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/role`);

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
      name: t("Description"),
      selector: (row: any) => row.description,
      sortable: true,
    },

    {
      name: t("action"),
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.roleId, false, true, false)}</>
      ),
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    let page_list = `${API_URL}/role`;
    let method = "POST";

    if (singleData?.roleId) {
      page_list = `${API_URL}/role/${singleData?.roleId}`;
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

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/role/${id}`;
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
      const page_list = `${API_URL}/role/${id}`;
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
      setsingleData(null)
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


  // Fetch user grp
  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const response = await fetch(`${API_URL}/user-group`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error fetching projects.");
        const data = await response.json();
        console.log("User Grp", data)
        setUserGrp(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllowance();
  }, []);

  // Fetch org lvl
  useEffect(() => {
    const fetchOrgLevel = async () => {
      try {
        const response = await fetch(`${API_URL}/organization-level`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error fetching projects.");
        const data = await response.json();

        setOrganizationLvL(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrgLevel();
  }, []);

  // console.log(userGrp)
  return (
    <>

      {addFormShow ? (
        <Breadcrumb name1={t("Role")} name2={t("Role")} />
      ) : (
        <BreadcumbWithButton
          name={t("Role")}
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
            className={`${isEditMood ? "block" : "hidden"} mb-5`}
            >
            <input type="hidden" name="id" value={singleData?.id} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5 bg-white rounded-xl shadow-md p-10">

              {/* user grp */}
              <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                {t("User Group")}
              </label>
              <select
                required
                name="userGroupId"
                className="w-full border p-4 rounded  h-14 appearance-none"

              >
                <option value="">{t("Select")}</option>
                {userGrp?.map(user => (
                <option key={user?.userGroupId} value={user?.userGroupId}
                  selected={user?.userGroupId == singleData?.userGroupId}
                >
                  {user?.userGroupName}
                </option>
                ))}
              </select>
              <DropDownIcon />
              </div>
              {/* org lvl */}
              <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                {t("Organization Level")}
              </label>
              <select
                required
                name="organizationLevelId"
                className="w-full border p-4 rounded  h-14 appearance-none"

              >
                <option value="">{t("Select")}</option>
                {organizationLvL?.map(org => (
                <option key={org?.orgLevelId} value={org?.orgLevelId}
                  selected={org?.orgLevelId == singleData?.organizationLevelId}
                >
                  {org?.orgLevelName}
                </option>
                ))}
              </select>
              <DropDownIcon />
              </div>



              {/* Sector Name */}
              <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                {t("Name")}
              </label>
              <input
                name="name"
                id="projectName"
                type="text"
                placeholder={t("Write name here")}
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.name}
              />
              </div>


              {/*  Description */}
              <div className="flex flex-col relative">
              <label
                htmlFor="description"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                {t("Description")}
              </label>
              <textarea
                name="description"
                id="description"
                className="border p-5 rounded h-14 resize-none"
                defaultValue={singleData?.description || ""}
              />
              </div>

            </div>
            {/* Add Button - Right Aligned */}
            <div className="flex justify-end gap-4">
              {singleData?.roleId ? <UpdateButton setsingleData={setsingleData} loading={loading}   setaddFormShow={setaddFormShow}/> : <AddButton setsingleData={setsingleData} loading={loading}  setaddFormShow={ setaddFormShow}/>}
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

export default Role;

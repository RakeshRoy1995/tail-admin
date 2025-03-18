import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Swal from "sweetalert2";
import { get_org_organizationLevelId, treeData_roles } from "@/utils";
import { get_all_data } from "@/api/Reqest";
import SearchBtn from "@/shared/components/ButttonsCollection/SearchBtn";
import RolePermissionTree from "./RolePermissionTree";
import { motion } from "framer-motion";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const RolePermissionManagement = () => {
  const [role, setrole] = useState<any>([]);
  const [menu, setmenu] = useState<any>([]);
  const [Module, setModule] = useState<any>([]);
  const [usrGroup, setusrGroup] = useState<any>([]);

  const [searchApi, setsearchApi] = useState<any>({});
  const {
    error,
    fetchData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    singleData,
    setsearchData,
    searchData,
  } = useFetch(`${API_URL}/permission`);
  const { t } = useTranslation();
  const role_list_api = async (userGroupId:string) => {
    const user_role_level = get_org_organizationLevelId();

    const apiEndPoint = "role/getRoleByGroupAndOrgLevel?userGroupId="+userGroupId+"&orgLevel="+user_role_level+"&currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setrole(ministry_List_Array);
  };

  const menu_list_api = async () => {
    const apiEndPoint = "menu/onlymainmenu";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setmenu(ministry_List_Array);
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
    module_List_API();
    user_grp_List_API();
  };

  useEffect(() => {
    fetchInitData();
    menu_list_api();
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
        text: error?.data?.message,
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

  const treeData = treeData_roles(searchData);


  return (
    <>

      <Breadcrumb
        name1={t("Role Menu Permission")}
        name2={t("Role Menu Permission")}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-md p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-5 lg:gap-5 xl:gap-3 mt-5">

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              {t("Module")}
              </label>
              <select
              name="menuModuleId"
              onChange={(e) => {
                setsearchApi({
                ...searchApi,
                [e.target.name]: e.target.value,
                });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
              <option value="">{t("Select")}</option>
              {Module.map((usr_grp: any) => (
                <option value={usr_grp?.menuModuleId}>{usr_grp?.name}</option>
              ))}
              </select>
              <DropDownIcon/>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              {t("User Group")}
              </label>
              <select
              name="userGroupId"
              onChange={(e) => {
                role_list_api(e.target.value)
                setsearchApi({
                ...searchApi,
                [e.target.name]: e.target.value,
                });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
              <option value="">{t("Select")}</option>
              {usrGroup.map((usr_grp: any) => (
                <option value={usr_grp?.userGroupId}>
                {usr_grp?.userGroupName}
                </option>
              ))}
              </select>
              <DropDownIcon/>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              {t("Role")}
              </label>
              <select
              name="roleId"
              onChange={(e) => {
                setsearchApi({
                ...searchApi,
                [e.target.name]: e.target.value,
                });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
              <option value="">{t("Select")}</option>
              {role?.map((d: any) => (
                <option value={d?.roleId}>{d?.name}</option>
              ))}
              </select>
              <DropDownIcon/>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              {t("Menu")}
              </label>
              <select
              name="menuIds"
              onChange={(e) => {
                setsearchApi({
                ...searchApi,
                [e.target.name]: e.target.value,
                });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
              <option value="">{t("Select")}</option>
              {menu?.map((d: any) => (
                <>
                {searchApi?.project == "LMS" &&
                  d.route &&
                  d.route.includes("loan/") && (
                  <option value={d?.id}>{d?.name}</option>
                  )}

                {searchApi?.project == "CMS" &&
                  d.route &&
                  !d.route.includes("loan/") && (
                  <option value={d?.id}>{d?.name}</option>
                  )}

                {searchApi?.project !== "LMS" &&
                  searchApi?.project !== "CMS" && (
                  <option value={d?.id}>{d?.name}</option>
                  )}
                </>
              ))}
              </select>
            </div>
            <div className="relative">
              <SearchBtn
              params={searchApi}
              setsearchData={setsearchData}
              apiEndPoint={"menu/rolewisemenusubmenu"}
              />
            </div>
            </div>

          <div className="p-2">
            <RolePermissionTree treeData={treeData} searchApi={searchApi} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RolePermissionManagement;

import { submitFormData } from "@/api/Reqest";
import Dashboard from "@/pages/Dashboard/Dashboard";
import { permission_details } from "@/utils";
import { FC, useEffect } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");
const customer_login_auth = localStorage.getItem("customer_login_auth");
const user_info_tmp = JSON.parse(localStorage.getItem("user_info"));

const Home: FC = () => {
  const fetchData = async () => {
    if (token) {
      localStorage.setItem("token", token);
      const current_role = JSON.parse(localStorage.getItem("current_role"));

      let newObj = {};

      const page_list_role_wiseSubmenu = `${API_URL}/menu/rolewisemenusubmenu?roleId=${current_role?.roleId}`;

      const options = {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "content-type": "application/json",
        },
      };

      const data_role_wiseSubmenu: any = await submitFormData(
        page_list_role_wiseSubmenu,
        options,
      );

      newObj = { ...newObj, ...data_role_wiseSubmenu.data };

      const page_list_permission = `${API_URL}/permission`;

      const options_ = {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "content-type": "application/json",
        },
      };
      const data_permission: any = await submitFormData(
        page_list_permission,
        options_,
      );

      const permission = data_permission.data;

      const perMission_ = permission.map((permit: any) => {
        const obj = {
          ...permit,
          ["id"]: permit.permissionId + "-" + Math.random(),
        };

        return obj;
      });
      localStorage.setItem("permission_data", JSON.stringify(perMission_));
      const data_role_wiseSubmenuData = Object.values(newObj);

      const finalArr: any = [];

      for (let index = 0; index < data_role_wiseSubmenuData.length; index++) {
        let obj: any = {};
        const data_role_wiseSubmenuData_el: any =
          data_role_wiseSubmenuData[index];

        const permissionIds = data_role_wiseSubmenuData_el?.permissionIds;
        const submenus = data_role_wiseSubmenuData_el?.submenus;

        const permssion_detls = permission_details(permission, permissionIds);
        delete data_role_wiseSubmenuData_el["permissionIds"];

        const tempArr = [];
        if (submenus.length) {
          let obj_2 = {};

          for (let index = 0; index < submenus.length; index++) {
            const submenus_EL = submenus[index];

            const permissionIds = submenus_EL?.permissionIds;

            const permssion_detls = permission_details(
              permission,
              permissionIds,
            );

            delete submenus_EL["permissionIds"];
            obj_2 = {
              ...submenus_EL,
              ["permission"]: permssion_detls,
            };

            tempArr.push(obj_2);
          }
        }
        delete data_role_wiseSubmenuData_el["submenus"];

        obj = {
          ...data_role_wiseSubmenuData_el,
          ["permission"]: permssion_detls,
          ["subMenu"]: tempArr,
        };
        finalArr.push(obj);
      }

      const object: any = {
        data: finalArr,
      };

      localStorage.setItem("permission", JSON.stringify(object));

      const reordercustomer_login_auth = JSON.parse(customer_login_auth);
      const roles_tmp = reordercustomer_login_auth.user.roles;
      const firstId = current_role?.roleId; // The ID you want to appear first

      roles_tmp.sort((a, b) => {
        if (a.roleId === firstId) return -1; // Move `firstId` to the top
        if (b.roleId === firstId) return 1;
        return a.roleId - b.roleId; // Sort the rest in ascending order
      });

      reordercustomer_login_auth.user.roles = roles_tmp;
      if (user_info_tmp?.roles) {
        user_info_tmp.roles = roles_tmp;
        localStorage.setItem("user_info", JSON.stringify(user_info_tmp));
      }

      localStorage.setItem(
        "customer_login_auth",
        JSON.stringify(reordercustomer_login_auth),
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
     <Dashboard/>
    </>
  );
};

export default Home;

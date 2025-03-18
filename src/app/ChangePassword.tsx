import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import useFetch from "@/hooks/useFetch";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { col_value } from "@/shared/Table/utils";
import ActionButton from "@/shared/Table/ActionButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";

import { motion } from "framer-motion";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { validatePassword } from "@/utils";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function ChangePassword() {
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
  } = useFetch(`${API_URL}/banks`);

  const [PasserrMsg, seterrMsg] = useState<any>("");
  const [cnfPasserrMsg, setcnfPasserrMsg] = useState<any>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    const page_list = `${API_URL}/user/change-password/${token?.user?.userId}`;
    const method = "POST";


    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetchDataCommon(page_list, options);
  };

  useEffect(() => {
    if (common_data) {
      setaddFormShow(false);
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setsingleData(null);
      setcommon_Data(null);
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

  const confrmPass = singleData?.newPassword == singleData?.confirmNewPassword;

  return (
    <>
      <Breadcrumb name1={"Change Password"} name2={"Change Password Setup"} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-5">
          <form className="p-4 space-y-6 form_design" onSubmit={handleSubmit}>
            {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* Bank Name */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="currentPassword"
                  className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  className="border p-4 rounded h-14"
                  placeholder="Sample Name here"
                  maxLength={20}
                />
              </div>
              {/* Description*/}
              <div className="flex flex-col relative ">
                <label
                  htmlFor="newPassword"
                  className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  onChange={(e: any) => {
                    const msg = validatePassword(e.target.value);
                    seterrMsg(msg);

                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  className="border p-4 rounded h-14"
                  placeholder="Password"
                  maxLength={20}
                />
                <p className="text-red-500">{PasserrMsg}</p>
                
              </div>

              <div className="flex flex-col relative ">
                <label
                  htmlFor="confirmNewPassword"
                  className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  onChange={(e: any) => {
                    const msg = validatePassword(e.target.value);
                    setcnfPasserrMsg(msg);

                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="confirmNewPassword"
                  className="border p-4 rounded h-14"
                  placeholder="Sample Name here"
                  maxLength={20}
                />

                <p className="text-red-500">{cnfPasserrMsg}</p> 
                {singleData?.confirmPassword && (
                  <>
                    {!confrmPass && (
                      <p>{"Password and confirm Password mis matched"}</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <AddButton
                setsingleData={setsingleData}
                loading={!loading}
                setaddFormShow={setaddFormShow}
              />
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default ChangePassword;

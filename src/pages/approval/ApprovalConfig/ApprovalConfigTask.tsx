import { get_all_data, submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import SaveButton from "@/shared/components/ButttonsCollection/SaveButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { get_org_organizationLevelId, getRandomInt, userGroupId } from "@/utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import { useTranslation } from "react-i18next";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token_ = localStorage.getItem("token");

const ApprovalConfigTask = () => {
  const authToken = localStorage.getItem("customer_login_auth") || "";

  const token: any = authToken ? JSON.parse(authToken) : "";

  const org_level_ = localStorage.getItem("org_level") || "";

  const org_level: any = authToken ? JSON.parse(org_level_) : [];

  const organizationType = token.user?.organizationType;
  const { t } = useTranslation();
  const layer =
    organizationType == "PMU"
      ? 3
      : organizationType == "PO"
        ? 2
        : organizationType == "BRANCH"
          ? 1
          : 3;
  const {
    data,
    error,
    fetchData,
    deleteData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    fetchSingleDataCommonByID,
    setsingleData,
    loading,
    singleData,
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/approval-config`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const [render, setrender] = useState(false);
  const [role, setrole] = useState<any>(null);
  const [allrole, setallrole] = useState<any>([]);
  const [dataRow, setdataRow] = useState<any>([
    {
      actApprovalStatus: "",
      actOrganizationLevelId: "",
      actRoleId: "",
      actSeqNo: "1",
      actRecStatus: "A",
      id: getRandomInt(10, 100),
    },
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    const array = [];
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };

      if (key == "actRecStatus") {
        array.push(obj);
      }
    }

    obj = { ...obj, approvalConfigTasks: array };

    let page_list = `${API_URL}/approval-config`;
    let method = "POST";

    if (singleData?.approvalConfigId) {
      page_list = `${API_URL}/approval-config/${singleData?.approvalConfigId}`;
      method = "PUT";
    }

    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token_}`,
      },
    };

    await submitFormData(page_list, options);
    Swal.fire({
      icon: "success",
      text: "Success",
      confirmButtonText: "Close",
    });

    fetchData();
    setaddFormShow(false)
  };

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/approval-config/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token_}`,
        },
      };

      const { data }: any = await submitFormData(page_list, options);

      const arry = [];

      let xxx = {};
      for (let index = 0; index < data?.approvalConfigTasks.length; index++) {
        const element = data.approvalConfigTasks[index];

        const obj = {
          ...element,
          ["id"]: index,
        };

        arry.push(obj);
        xxx = {
          ...xxx,
          [index]: obj.actOrganizationLevelId,
          ["actRoleId"]: obj.actRoleId,
        };
      }

      setrole(xxx);
      setdataRow(arry);

      fetchSingleDataCommonByID(page_list, options);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/approval-config/${id}`;
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



  const role_list_api = async () => {
    const userGrpId :any =  userGroupId()
    const Grp_id = userGrpId[0]?.userGroupId || 1
    const user_role_level = get_org_organizationLevelId();

    const apiEndPoint = "role/getRoleByGroupAndOrgLevel?userGroupId="+Grp_id +"&orgLevel="+user_role_level+"&currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setallrole(ministry_List_Array);
  };


  const fetchRole = async (type = "", row: any = {}) => {
    const y = { ...role, [row.id]: type };
    setrole(y);
    // setallrole(data);
    // setrole(data);
  };

  const fetchInitData = async () => {
    fetchRole();
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
    role_list_api();
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

  const addNewStatus = () => {
    setdataRow([]);
    dataRow.push({
      actApprovalStatus: "",
      actOrganizationLevelId: "",
      actRoleId: "",
      actSeqNo: "1",
      actRecStatus: "A",
      id: getRandomInt(10, 100),
    });
    setdataRow(dataRow);
    setrender(!render);
  };

  const removeStatus = (row: any) => {
    if (row.id !== null) {
      setdataRow([]);
      const newData = dataRow.filter((d: any) => d.id != row.id);
      const y = delete role[row.id];
      setrole(y);
      setdataRow(newData);
      setrender(!render);
    }
  };

  const columns = [
    {
      name: t("Approval Status"),
      selector: (row) => row.actApprovalStatus,
      cell: (row: any) => (
        <div className="p-2">
          <div className="p-2">
            <select
              required
              name="actApprovalStatus"
              className=" sm:w-full border p-4 rounded appearance-none h-14"
            >
              <option value="">Select Status</option>
              <option
                value="PENDING"
                selected={"PENDING" == row.actApprovalStatus}
              >
                PENDING
              </option>
              <option
                value="APPROVED"
                selected={"APPROVED" == row.actApprovalStatus}
              >
                APPROVED
              </option>
              <option
                value="DRAFTED"
                selected={"DRAFTED" == row.actApprovalStatus}
              >
                DRAFTED
              </option>
              <option
                value="IN_PROGRESS"
                selected={"IN_PROGRESS" == row.actApprovalStatus}
              >
                IN PROGRESS
              </option>
              <option
                value="COMPLETE"
                selected={"COMPLETE" == row.actApprovalStatus}
              >
                COMPLETE
              </option>
              <option
                value="REJECTED"
                selected={"REJECTED" == row.actApprovalStatus}
              >
                REJECTED
              </option>
            </select>
          </div>
        </div>
      ),
    },
    {
      name: t("serial"),
      width: "10%",
      cell: (row: any) => (
        <div className="p-2">
          <input
            required
            name="actSeqNo"
            type="text"
            className="w-full border rounded-md p-2 text-sm"
            defaultValue={row.actSeqNo}
            placeholder="Sequence No"
          />
        </div>
      ),
    },

    {
      name: t("organization lebel"),
      selector: (row) => row.actOrganizationLevelId,
      cell: (row: any) => (
        <div className="p-2">
          <select
            required
            name={"actOrganizationLevelId"}
            className=" sm:w-full border p-4 rounded appearance-none h-14 text-start"
            onChange={(e: any) => fetchRole(e.target.value, row)}
          >
            <option value="">Select lebel</option>
            {org_level.map((org: any) => (
              <>
                {layer > 2 && org.orgLevelId == 1 && (
                  <option selected={"1" == row.actOrganizationLevelId} value={org?.orgLevelId}>{org?.orgLevelName}</option>
                )}
                {layer > 1 && org.orgLevelId == 2 && (
                  <option selected={"2" == row.actOrganizationLevelId} value={org?.orgLevelId}>{org?.orgLevelName}</option>
                )}
                {layer > 0 && org.orgLevelId == 4 && (
                  <option selected={"4" == row.actOrganizationLevelId} value={org?.orgLevelId}>{org?.orgLevelName}</option>
                )}
              </>
            ))}

          </select>

        </div>
      ),
    },

    {
      name: t("Role"),
      cell: (row: any) => (
        <div className="p-2">
          <select
            name="actRoleId"
            required
            className=" sm:w-full border p-4 rounded appearance-none h-14"
          >
            <option value="">Select Role</option>

            {allrole.map((d: any) => (
              <>
                {d.organizationLevelId >= role[row.id] && (
                  <option value={d.roleId} selected={d.roleId == row.actRoleId}>
                    {d.name}
                  </option>
                )}
              </>
            ))}
          </select>
        </div>
      ),
    },

    {
      name: t("Status"),
      cell: (row: any) => (
        <div className="p-2">
          <select
            name="actRecStatus"
            required
            className=" sm:w-full border p-4 rounded appearance-none h-14"
          >
            <option value={"A"} selected={"A" == row.actOrganizationLevelId}>
              Active
            </option>
            <option value={"I"} selected={"I" == row.actOrganizationLevelId}>
              Inactive
            </option>
          </select>
        </div>
      ),
    },

    {
      name: t("Action"),
      cell: (row: any) => (
        <>
          <button
            onClick={(e: any) => addNewStatus()}
            type="button"
            className="bg-primaryColor font-bold text-sm text-white p-2 w-10 h-10 flex justify-center items-center  mx-2 rounded-full"
          >
            +
          </button>

          {dataRow.length > 1 && (
            <button
              onClick={(e) => removeStatus(row)}
              type="button"
              className="bg-tertiaryColor font-bold text-sm text-white px-2 py-2 flex justify-center items-center w-10 h-10 rounded-full"
            >
              -
            </button>
          )}
        </>
      ),
    },
  ];

  const col_approval_cnfig = [
    {
      name: t("Name"),
      selector: (row) => row.approvalConfigName,
      sortable: true,
      width: "360px",
    },
    {
      name: t("Permission"),
      selector: (row) => row.approvalConfigDescription,
      sortable: true,
      width: "360px",
    },
    {
      name: t("Action"),
      width: "full",
      value: "approvalConfigId",
      onclickEvt: fetchDataByID,
      cell: (row) => (
        <div>{ActionButton(fetchDataByID, row?.approvalConfigId)}</div>
      ),
    },
  ];

  return (
    <>
      {addFormShow ? (
      <Breadcrumb
        name1={t("Approval Configaration")}
        name2={t("Approval Configaration")}
      />
      ) : (
      <BreadcumbWithButton
        name={t("Approval Configaration")}
        url={"#"}
        setaddFormShow={setaddFormShow}
      />
      )}
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
      <div className="mb-10 rounded-2xl bg-white shadow-md">
        {addFormShow && (
        <form className="p-4 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {/* Date */}

          <div className="flex flex-col relative">
            <label
            htmlFor="approvalConfigName"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
            {t("Approval Config Name")}
            </label>
            <input
            readOnly={singleData?.approvalConfigId ? true : false}
            required
            id="approvalConfigName"
            name="approvalConfigName"
            placeholder={t("Approval Config Name")}
            defaultValue={singleData?.approvalConfigName}
            // onChange={(e) => setDateOfSigning(e.target.value)}
            className="border p-4 rounded appearance-none h-14"
            />
          </div>

          <div className="flex flex-col relative ">
            <label
            htmlFor="approvalConfigDescription"
            className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
            >
            {t("Description")}
            </label>
            <textarea
            id="approvalConfigDescription"
            name="approvalConfigDescription"
            defaultValue={singleData?.approvalConfigDescription}
            placeholder={t("Description here")}
            className="w-full border p-4 rounded h-16 text-sm"
            />
          </div>
          {/* Status */}
          <div className="flex flex-col relative ">
            <label
            htmlFor="approvalConfigRecStatus"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
            {t("Status")}
            </label>
            <select
            id="approvalConfigRecStatus"
            name="approvalConfigRecStatus"
            className=" border p-4 rounded appearance-none h-14"
            >
            <option
              value="A"
              selected={singleData?.approvalConfigRecStatus == "A"}
            >
              {t("Active")}
            </option>
            <option
              value="I"
              selected={singleData?.approvalConfigRecStatus == "I"}
            >
              {t("Inactive")}
            </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
              d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
              fill="#5F6368"
              />
            </svg>
            </div>
          </div>
          </div>
          <Table
          rows={dataRow}
          column={columns}
          getheaderColor={getheaderColor}
          pagination={false}
          />

          {singleData?.approvalConfigId ? (
          <UpdateButton
            setaddFormShow={setaddFormShow}
            loading={loading}
          />
          ) : (
          <AddButton loading={loading} setaddFormShow={setaddFormShow} />
          )}
        </form>
        )}
      </div>

      <Table
        rows={data || []}
        column={col_approval_cnfig}
        getheaderColor={getheaderColor}
        pagination={false}
      />
      </motion.div>
    </>
  );
};

export default ApprovalConfigTask;

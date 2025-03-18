import React, { useEffect, useState, useRef } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import {
  get_all_data,
  submitFormData,
  submitFormData_multipart,
} from "@/api/Reqest";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import { motion } from "framer-motion";
import DateFormate from "@/shared/date-formate/DateFormate";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import PartnerOrgComponent from "@/shared/partner-organization/PartnerOrgComponent";
import Location from "@/shared/location/Location";
import { formatDate_2, img_link } from "@/utils";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { useTranslation } from "react-i18next";
import { width } from "@mui/system";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const Employee = () => {
  const [po, setpo] = useState<any>([]);
  const [person, setperson] = useState<any>([]);
  const [department, setdepartment] = useState<any>([]);
  const [designation, setdesignation] = useState<any>([]);
  const [branchs, setbranchs] = useState<any>([]);
  const [allbranchs, setallbranchs] = useState<any>([]);
  const [render, setrender] = useState(true);
  const [search_data, setsearch_data] = useState("");
  const [employeeShow, setemployeeShow] = useState(false);
  const [searchData, setsearchData] = useState(true);
  const {
    data,
    loading,
    error,
    fetchData,
    deleteData,
    deleteMsg,
    common_data,
    setcommon_Data,
    setsingleData,
    singleData,
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/employee?currentPage=1&pageSize=10000`);
  const { t } = useTranslation();
  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const showBranch = (id: any, type = 4) => {
    if (type == 4) {
      const data = allbranchs.find((d: any) => d.id == id);
      const name = data?.code + " " + data?.name;
      return name;
    } else {
      const data = po.find((d: any) => d.partnerId == id);
      const name = data?.code + " " + data?.name;
      return name;
    }
  };

  const column = [
    {
      name: t("Name"),
      selector: (row: any) => row.person?.fullName,
      sortable: true,
    },

    {
      name: t("Code"),
      width: "90px",
      selector: (row: any) => row.code,
      sortable: true,
    },

    {
      name: t("organization level"),
      width: "100px",
      selector: (row: any) =>
        row.organizationLevelId == "1"
          ? "PMU"
          : row.organizationLevelId == "2"
            ? "Partner"
            : "Branch",
      sortable: true,
    },

    {
      name: t("Branch/PO"),
      selector: (row: any) => (
        <>
          {row.organizationLevelId == 4 && (
            <p title={showBranch(row?.branchId)}>{showBranch(row?.branchId)}</p>
          )}

          {row.organizationLevelId == 2 && (
            <p title={showBranch(row?.partnerOrganizationId, 2)}>
              {showBranch(row?.partnerOrganizationId, 2)}
            </p>
          )}
        </>
      ),
      sortable: true,
    },

    {
      name: t("action"),
      width: "90px",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.employeeId)}</>,
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    const address: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      if (key.startsWith("location.")) {
        const locationKey = key.split(".")[1];
        address[locationKey] = value;
      } else {
        obj[key] = value; // Handle general fields
      }
    }

    formData.append("presentAddress.divisionId", address.divisionId);
    formData.append("presentAddress.districtId", address.districtId);
    formData.append("presentAddress.upazilaId", address.upazilaId);
    formData.append("presentAddress.address", address.address);

    let page_list = `${API_URL}/persons`;
    let method = "POST";

    if (singleData?.personId) {
      page_list = `${API_URL}/persons/${singleData?.personId}`;
      method = "PUT";
    }

    if (obj?.submit_type == "emp_submit") {
      page_list = `${API_URL}/employee`;
      method = "POST";

      if (singleData?.employeeId) {
        page_list = `${API_URL}/employee/${singleData?.employeeId}`;
        method = "PUT";
      }

      const options = {
        method,
        data: obj,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await submitFormData(page_list, options);

        fetchData();
        setaddFormShow(false);
        setemployeeShow(false);
        setsingleData(null);

        Swal.fire({
          icon: "success",
          text: "Success",
          confirmButtonText: "Close",
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message
            ? error?.response?.data?.message
            : error,
          confirmButtonText: "Close",
        });
      }
    } else {
      const options = {
        method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data }: any = await submitFormData_multipart(
          page_list,
          options,
        );
        if (data?.personId) {
          setsingleData({ ...singleData, ...data });
          setemployeeShow(true);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          text: error?.response?.data?.message
            ? error?.response?.data?.message
            : error,
          confirmButtonText: "Close",
        });
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // fetchDataCommon(page_list, options);
    // setsingleData(null);
  };

  const Person_list_api = async () => {
    const apiEndPoint = "persons?currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setperson(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const po_list_api = async () => {
    const apiEndPoint =
      "partner-organization?currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setpo(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const department_list_api = async () => {
    const apiEndPoint = "department?currentPage=1&pageSize=5";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setdepartment(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const designation_list_api = async () => {
    const apiEndPoint = "designation";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setdesignation(ministry_List_Array?.data);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `employee/${id}`;

      const { data }: any = await get_all_data(page_list);

      if (data?.employeeId) {
        const newObj = {
          ...data.person,
          ...data,
          location: {
            ...data?.person?.presentAddress,
          },
        };

        console.log(`datadddd`, data, newObj);

        const nidNoTmp: any = document.getElementById("tmp_nidNo");
        const brNoTmp: any = document.getElementById("tmp_brNo");
        const passportNoTmp: any = document.getElementById("tmp_passportNo");
        nidNoTmp.value = data.person?.nidNo;
        brNoTmp.value = data.person?.brNo;
        passportNoTmp.value = data.person?.passportNo;

        setsingleData(newObj);
      }

      setrender(true);
      setaddFormShow(true);
      setsearchData(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (type == "delete") {
      const page_list = `${API_URL}/employee/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const fetchInitData = async () => {
    fetchData();
    Person_list_api();
    po_list_api();
    department_list_api();
    designation_list_api();

    const authToken = localStorage.getItem("customer_login_auth") || "";
    const token: any = authToken ? JSON.parse(authToken) : "";

    setsingleData({
      ...singleData,
      ["organizationLevelId"]: token?.user?.organizationLevelId,
      ["partnerOrganizationId"]: token?.user?.partnerOrganizationId,
      ["branchId"]: token?.user?.branchId,
    });
  };

  const poWiseBranch = async (po_id: any) => {
    const apiEndPoint = "branch/by/po/" + po_id;
    const branchData: any = await get_all_data(apiEndPoint);
    setbranchs(branchData?.data);
  };

  const fetchallBranch = async () => {
    const apiEndPoint = "branch?currentPage=1&pageSize=10000";
    const branchData: any = await get_all_data(apiEndPoint);
    setallbranchs(branchData?.data?.content);
  };

  useEffect(() => {
    poWiseBranch(singleData?.partnerOrganizationId);
  }, [singleData?.partnerOrganizationId]);

  useEffect(() => {
    fetchallBranch();
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

  const inputRef = useRef(null);

  const SearchFetch = async (search_: string) => {
    if (search_) {
      const apiEndPoint = "persons/by/search?search=" + search_;
      const { data }: any = await get_all_data(apiEndPoint);

      if (data?.personId) {
        const authToken = localStorage.getItem("customer_login_auth") || "";
        const token: any = authToken ? JSON.parse(authToken) : "";
        const newObj = {
          ...data,
          ["organizationLevelId"]: token?.user?.organizationLevelId,
          ["partnerOrganizationId"]: token?.user?.partnerOrganizationId,
          ["branchId"]: token?.user?.branchId,
          location: {
            ...data?.presentAddress,
          },
          ...data.person
        };

        setsingleData(newObj);
        setsearchData(false);
      }
    }
  };

  console.log(`singleData`, singleData);

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Handle the click outside the input here
      const nidNo: any = document.getElementById("nidNo");
      const brNo: any = document.getElementById("brNo");
      const passportNo: any = document.getElementById("passportNo");

      const nidNoTmp: any = document.getElementById("tmp_nidNo");
      const brNoTmp: any = document.getElementById("tmp_brNo");
      const passportNoTmp: any = document.getElementById("tmp_passportNo");

      const nid_ = nidNo?.value == nidNoTmp.value ? "" : nidNo?.value;
      const brNo_ = brNo?.value == brNoTmp.value ? "" : brNo?.value;
      const passportNo_ =
        passportNo?.value == passportNoTmp.value ? "" : passportNo?.value;

      const value = nid_ || brNo_ || passportNo_;
      if (value) {
        nidNoTmp.value = nidNo?.value;
        brNoTmp.value = brNo?.value;
        passportNoTmp.value = passportNo?.value;
        SearchFetch(value);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const minDate = new Date(formatDate_2(singleData?.joiningDate));
  const maxDate = new Date();

  // console.log(`minDate`, minDate);
  // image
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  return (
    <>
      {addFormShow ? (
        <Breadcrumb name1={t("Employee")} name2={t("Employee")} />
      ) : (
        <BreadcumbWithButton
          name={t("Employee")}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input type="hidden" id="tmp_nidNo" />
        <input type="hidden" id="tmp_brNo" />
        <input type="hidden" id="tmp_passportNo" />
        {addFormShow && (
          <form
            action="submit"
            className="mb-5 bg-white rounded-xl shadow-md p-10 w-full lg:w-full  xl:w-full"
            onSubmit={handleSubmit}
          >
            {/* Group 1: Personal Information */}

            <input
              type="hidden"
              id="worksearchData"
              value={searchData ? "1" : "0"}
            />

            {!employeeShow && (
              <>
                <fieldset className="col-span-3 border p-4 rounded mb-4">
                  <legend className="font-semibold text-lg mb-2">
                    {t("Personal Information")}
                  </legend>

                  {/* NID */}

                  <div
                    ref={inputRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-4 gap-4 w-full"
                  >
                    <div className="w-full">
                      <label
                        htmlFor="nidNo"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("NID")}{" "}
                        {!singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo && (
                            <span className="required_field">*</span>
                          )}
                      </label>
                      <input
                        required={
                          !singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo
                        }
                        ref={inputRef}
                        maxLength={50}
                        name="nidNo"
                        id="nidNo"
                        defaultValue={singleData?.nidNo}
                        onChange={(e: any) => {
                          setsearch_data(e.target.value);
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        type="text"
                        placeholder={t("Write NID number here")}
                        className="border p-4 rounded h-14 appearance-none w-full "
                      />
                    </div>

                    {/* BRN */}
                    <div className="w-full">
                      <label
                        htmlFor="brNo"
                        className="text-xs md:text-sm lg:text-sm xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Birth Certificate Number (BRN)")}{" "}
                        {!singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo && (
                            <span className="required_field">*</span>
                          )}
                      </label>
                      <input
                        required={
                          !singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo
                        }
                        // ref={inputRef_2}
                        maxLength={50}
                        name="brNo"
                        id="brNo"
                        onChange={(e: any) => {
                          setsearch_data(e.target.value);
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        value={singleData?.brNo}
                        type="text"
                        placeholder={t("Write BRN here")}
                        className="border p-4 rounded h-14 appearance-none w-full "
                      />
                    </div>

                    {/* Passport */}
                    <div className="w-full">
                      <label
                        htmlFor="passportNo"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Passport Number")}
                        {!singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo && (
                            <span className="required_field">*</span>
                          )}
                      </label>
                      <input
                        maxLength={50}
                        name="passportNo"
                        // ref={inputRef_3}
                        required={
                          !singleData?.nidNo &&
                          !singleData?.brNo &&
                          !singleData?.passportNo
                        }
                        id="passportNo"
                        onChange={(e: any) => {
                          setsearch_data(e.target.value);
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        defaultValue={singleData?.passportNo}
                        type="text"
                        placeholder={t("Write passport number here")}
                        className="border p-4 rounded h-14 appearance-none w-full "
                      />
                    </div>
                  </div>

                  <input
                    maxLength={50}
                    name="fullName"
                    id="fullName"
                    value={singleData?.firstName + " " + singleData?.lastName}
                    type="hidden"
                    placeholder={t("Write First Name")}
                    className="border p-4 rounded h-14 appearance-none w-full "
                  />

                  <input
                    maxLength={50}
                    name="fullNameBn"
                    id="fullNameBn"
                    value={
                      singleData?.firstNameBn + " " + singleData?.lastNameBn
                    }
                    type="hidden"
                    placeholder={t("Write First Name here")}
                    className="border p-4 rounded h-14 appearance-none w-full "
                  />

                  <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                    {/*  First Name */}
                    <div className="w-full">
                      <label
                        htmlFor="firstName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("First Name")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="firstName"
                        id="firstName"
                        onChange={(e: any) =>
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        defaultValue={singleData?.firstName}
                        type="text"
                        placeholder={t("Write First Name here")}
                        className="border p-4 rounded h-14 appearance-none w-full l"
                      />
                    </div>

                    {/*  Last Name  */}
                    <div className="w-full">
                      <label
                        htmlFor="lastName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Last Name")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="lastName"
                        id="lastName"
                        onChange={(e: any) =>
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        defaultValue={singleData?.lastName}
                        type="text"
                        placeholder={t("Write Last Name here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* img preview */}
                    <div className="grid grid-rows-1 row-span-3 justify-center items-center border-2 border-yellow-600 rounded w-full h-52 ">
                      {imagePreview || singleData?.person?.photoUrl || singleData?.photoUrl ? (
                        <img
                          src={
                            imagePreview
                              ? imagePreview
                              : img_link(singleData?.person?.photoUrl || singleData?.photoUrl)
                          }
                          alt="Selected Preview"
                          className="h-full w-full   object-cover"
                        />
                      ) : (
                        <span className="text-gray-500  text-center">
                          {t("No Image Selected")}
                        </span>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="w-full">
                      <label
                        htmlFor="firstNameBn"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("First Name (BN)")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="firstNameBn"
                        id="firstNameBn"
                        onChange={(e: any) => {
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        value={singleData?.firstNameBn}
                        type="text"
                        placeholder={t("Write First Name in bangla here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* Last Name (BN){" "} */}
                    <div className="w-full">
                      <label
                        htmlFor="lastNameBn"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Last Name (BN)")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="lastNameBn"
                        id="lastNameBn"
                        onChange={(e: any) => {
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        value={singleData?.lastNameBn}
                        type="text"
                        placeholder={t("Write Last Name here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* Father Name */}
                    <div className="w-full">
                      <label
                        htmlFor="fathersName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Father Name")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="fathersName"
                        id="fathersName"
                        defaultValue={singleData?.fathersName}
                        type="text"
                        placeholder={t("Write Father Name here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* Mother Name */}
                    <div className="w-full">
                      <label
                        htmlFor="mothersName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Mother Name")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="mothersName"
                        id="mothersName"
                        defaultValue={singleData?.mothersName}
                        type="text"
                        placeholder={t("Write Mother Name here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="w-full">
                      <label
                        htmlFor="dateOfBirth"
                        className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor z-10"
                      >
                        {t("Date of Birth")}{" "}
                        <span className="required_field">*</span>
                      </label>
                      <DateFormate
                        name="dateOfBirth" // Key for the date field in singleData
                        singleData={singleData}
                        setsingleData={setsingleData}
                        required={true}
                        label={t("dateOfBirth")}
                      />
                    </div>

                    {/*  Phone Number */}
                    <div className="w-full">
                      <label
                        htmlFor="mobileNo"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Phone Number")}
                        <span className="required_field">*</span>
                      </label>
                      <input
                        required
                        maxLength={50}
                        name="mobileNo"
                        id="mobileNo"
                        // onChange={(e) =>
                        //   setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
                        // }
                        defaultValue={singleData?.mobileNo}
                        type="text"
                        placeholder={t("Write phone number here")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                    </div>

                    {/* img */}
                    {/* <div className="w-full">
                      <label
                        htmlFor="nidNo"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        Image
                      </label>
                      <input
                        required={singleData?.personId ? false : true}
                        accept="image/*"
                        maxLength={50}
                        name="photo"
                        type="file"
                        placeholder="Write NID number here"
                        className="border p-4 rounded h-14 appearance-none w-full"
                      />
                      </div> */}

                    <div className="w-full">
                      <label
                        htmlFor="imageInput"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        {t("Image")}
                      </label>
                      <input
                        required={singleData?.personId ? false : true}
                        accept="image/*"
                        name="photo"
                        id="imageInput"
                        type="file"
                        placeholder={t("Upload Image")}
                        className="border p-4 rounded h-14 appearance-none w-full"
                        onChange={handleImageChange} // Handle file change
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="col-span-3 border p-4 rounded mb-4 mt-5">
                  <legend className="font-semibold text-base md:text-sm lg:text-md xl:text-lg mb-2">
                    Address Information
                  </legend>

                  <div className=" gap-4">
                    <Location singleData={singleData} />
                  </div>
                </fieldset>

                <input
                  type="hidden"
                  value={"person_submit"}
                  name="submit_type"
                />
              </>
            )}

            {employeeShow && (
              <fieldset className="col-span-3 border p-4 rounded mb-4">
                {/* Group 1: Employee Information */}
                <legend className="font-semibold text-lg mb-2">
                  Employee Information
                </legend>

                <input
                  type="hidden"
                  value={singleData?.personId}
                  name="personId"
                />
                <input type="hidden" value={"emp_submit"} name="submit_type" />

                <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  <div className="w-full">
                    <label
                      htmlFor="code"
                      className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                    >
                      Employee Code <span className="required_field">*</span>
                    </label>
                    <input
                      required
                      maxLength={50}
                      name="code"
                      id="code"
                      defaultValue={singleData?.code}
                      type="text"
                      placeholder="Employee Code here"
                      className="border p-4 rounded h-14 appearance-none w-full"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="type"
                      className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                    >
                      Organization Level{" "}
                      <span className="required_field">*</span>
                    </label>
                    <PartnerOrgComponent
                      name={"organizationLevelId"}
                      value={singleData?.organizationLevelId || ""}
                      singleData={singleData}
                      setsingleData={setsingleData}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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

                  {(singleData?.organizationLevelId == "2" ||
                    singleData?.organizationLevelId == "4") && (
                    <div className="w-full">
                      <label
                        htmlFor="partnerOrganizationId"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        Partner Organization
                        <span className="required_field">*</span>
                      </label>

                      <select
                        value={singleData?.partnerOrganizationId}
                        onChange={(e) => {
                          poWiseBranch(e.target.value);
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        id="partnerOrganizationId"
                        name="partnerOrganizationId"
                        className="border p-4 rounded h-14 appearance-none w-full"
                      >
                        <option value={""}>Select</option>
                        {po?.map((d: any) => (
                          <option key={d.partnerId} value={d.partnerId}>
                            {" "}
                            {d.nameBn} - {d.code}{" "}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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
                  )}

                  {singleData?.organizationLevelId == "4" && (
                    <div className="w-full">
                      <label
                        htmlFor="branchId"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                      >
                        Branch <span className="required_field">*</span>
                      </label>

                      <select
                        value={singleData?.branchId}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="branchId"
                        name="branchId"
                        className="border p-4 rounded h-14 appearance-none w-full"
                      >
                        <option value={""}>Select</option>
                        {branchs?.map((d: any) => (
                          <option key={d.id} value={d.id}>
                            {" "}
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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
                  )}

                  <div className="w-full">
                    <label
                      htmlFor="departmentId"
                      className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                    >
                      Department <span className="required_field">*</span>
                    </label>

                    <select
                      id="departmentId"
                      value={singleData?.departmentId}
                      onChange={(e) =>
                        setsingleData({
                          ...singleData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      name="departmentId"
                      className="border p-4 rounded h-14 appearance-none w-full"
                    >
                      <option value={""}>Select Department </option>
                      {department.map((d: any) => (
                        <option value={d.deptId}>
                          {" "}
                          {d.deptName} - {d.deptCode}{" "}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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

                  <div className="w-full">
                    <label
                      htmlFor="designationId"
                      className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                    >
                      Designation
                    </label>

                    <select
                      id="designationId"
                      name="designationId"
                      value={singleData?.designationId}
                      onChange={(e) =>
                        setsingleData({
                          ...singleData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="border p-4 rounded h-14 appearance-none w-full"
                    >
                      <option value={""}>Select Designation </option>
                      {designation?.map((d: any) => (
                        <option key={d?.designId} value={d?.designId}>
                          {" "}
                          {d?.designName} - {d?.designCode}{" "}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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

                  {/*Joining Date */}
                  <div className="w-full">
                    <label
                      htmlFor="joiningDate"
                      className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor z-10"
                    >
                      Joining Date <span className="required_field">*</span>
                    </label>
                    <DateFormate
                      name="joiningDate" // Key for the date field in singleData
                      singleData={singleData}
                      setsingleData={setsingleData}
                      required={true}
                      label="Join of Birth"
                      maxDate={maxDate}
                    />
                  </div>

                  {singleData?.empRecStatus == "I" && (
                    <div className="w-full">
                      <label
                        htmlFor="endingDate"
                        className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor z-10"
                      >
                        Separation Date{" "}
                        <span className="required_field">*</span>
                      </label>
                      <DateFormate
                        name="endingDate" // Key for the date field in singleData
                        singleData={singleData}
                        setsingleData={setsingleData}
                        required={true}
                        label="Join of Birth"
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    </div>
                  )}

                  {singleData?.employeeId ? (
                    <div className="relative mb-5">
                      <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
                        Status
                      </label>
                      <select
                        data-tooltip="Select Project Status"
                        name="empRecStatus"
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        id="empRecStatus"
                        className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                      >
                        <option
                          value="A"
                          selected={singleData?.empRecStatus == "A"}
                        >
                          Active
                        </option>
                        <option
                          value="I"
                          selected={singleData?.empRecStatus == "I"}
                        >
                          Inactive
                        </option>
                      </select>
                      <DropDownIcon />
                    </div>
                  ) : (
                    <input type="hidden" name="empRecStatus" value={"A"} />
                  )}
                </div>
              </fieldset>
            )}

            <div className="flex justify-end gap-4 ">
              {singleData?.employeeId ? (
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
          rows={data?.content || []}
          column={column}
          getheaderColor={getheaderColor}
        />
      </motion.div>
    </>
  );
};

export default Employee;

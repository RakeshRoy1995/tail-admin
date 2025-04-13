// useFetch.js
import { submitFormData } from "@/api/Reqest";
import { useState } from "react";
import Swal from "sweetalert2";

const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";

const useFetch = (url: any, options = {}) => {
  const param = `userId=${token?.id }`;

  const [data, setData] = useState<any>(null);
  const [common_data, setcommon_Data] = useState(null);
  const [common_dataObj, setcommon_DataObj] = useState({});
  const [singleData, setsingleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addFormShow, setaddFormShow] = useState(false);
  const [error, setError] = useState<any>(null);
  const [deleteMsg, setdeleteMsg] = useState<any>(null);
  const [searchData, setsearchData] = useState<any>(null);

  const fetchData = async () => {
    try {
      setError("");
      setLoading(true);
      const option = {
        ...options,
        headers: {
          Authorization: token?.accessToken
            ? `Bearer ${token?.accessToken}`
            : undefined,
        },
      };

      let page = "";

      if (url.includes("?")) {
        page = url + "&" + param;
      } else {
        page = url + "?" + param;
      }

      const response = await fetch(page, option);
      const contentType = response.headers.get("Content-Type");
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage; // Use server-provided error message if available
        } else {
          errorMessage = await response.text(); // Fallback to text response if JSON not available
        }
        throw new Error(errorMessage);
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || "সার্ভারে কিছু ত্রুটি ঘটছে");
      setLoading(false);
    }
    setLoading(false);
  };

  const deleteData = async (api: string, method = "delete") => {
    try {
      setError(null);
      setLoading(true);
      setdeleteMsg(null);

      const option: any = {
        ...options,
        headers: {
          Authorization: token?.accessToken
            ? `Bearer ${token?.accessToken}`
            : undefined,
        },
        method,
      };

      Swal.fire({
        title: "আপনি কি তথ্য মুছে ফেলতে চান?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "না",
        confirmButtonText: "হ্যাঁ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(api, option);
          const contentType = response.headers.get("Content-Type");

          if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            if (contentType && contentType.includes("application/json")) {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage; // Use server-provided error message if available
            } else {
              errorMessage = await response.text(); // Fallback to text response if JSON not available
            }

            Swal.fire({
              icon: "error",
              text: errorMessage,
              confirmButtonText: "Close",
            });
            throw new Error(errorMessage);
          } else {
            Swal.fire({
              icon: "success",
              text: "Delete Success",
              confirmButtonText: "Close",
            });

            setdeleteMsg("success");
            setError(null);
          }
          setLoading(false);
        }
      });
    } catch (err: any) {
      setError(err?.message || "সার্ভারে কিছু ত্রুটি ঘটছে");
      setLoading(false);
    }
    setLoading(false);
  };

  // const fetchDataCommon = async (api: any, options = {}) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     const { data }: any = await submitFormData(api, options);
  //     setcommon_Data(data);
  //   } catch (error: any) {
  //     setError(error.response);
  //   }
  //   setLoading(false);
  // };
  
  const fetchDataCommon = async (api: any, options = {}) => {
    setError(null);
    setLoading(true);
    try {
        const { data }: any = await submitFormData(api, options);
        setcommon_Data(data);
        setLoading(false);
        return data;
    } catch (error: any) {
        setError(error.response);
        setLoading(false);
        throw error;
    }
};

  const fetchDataCommonObj = async (api: any, options = {}, indexName = "") => {
    setError(null);
    setLoading(true);
    try {
      const { data }: any = await submitFormData(api, options);
      setcommon_DataObj({ ...common_dataObj, [indexName]: data });
    } catch (error: any) {
      setError(error.response);
    }
    setLoading(false);
  };

  const fetchSingleDataCommonByID = async (api: any, options = {}) => {
    setError(null);
    setLoading(true);
    setsingleData(null);

    try {
      const { data }: any = await submitFormData(api, options);
      setsingleData(data);
    } catch (error: any) {
      setError(error.response);
    }
    setLoading(false);
  };

  const fetchDataFromLocalStorage = (indexName: any) => {
    try {
      const value: any = localStorage.getItem(indexName);
      const data = JSON.parse(value);
      setcommon_Data(data);
    } catch (err: any) {
      setError(err?.message || "সার্ভারে কিছু ত্রুটি ঘটছে");
      setLoading(false);
    }
    setLoading(false);
  };

  return {
    data,
    setData,
    setsearchData,
    searchData,
    loading,
    error,
    fetchSingleDataCommonByID,
    setsingleData,
    singleData,
    fetchData,
    deleteData,
    deleteMsg,
    fetchDataCommon,
    fetchDataCommonObj,
    setcommon_Data,
    common_dataObj,
    common_data,
    fetchDataFromLocalStorage,
    setaddFormShow,
    addFormShow
  };
};

export default useFetch;

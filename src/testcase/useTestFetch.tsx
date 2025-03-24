import React from "react";
import { useState } from "react";

const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";

const useFetchMolel = (url: string, options: RequestInit = {}): any => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    const option = {
      ...options,
      headers: {
        Authorization: token?.accessToken
          ? `Bearer ${token?.accessToken}`
          : undefined,
      },
    };

    try {
      setLoading(true);
      setError("");

      const response = await fetch(url, option);

      const contentType = response.headers.get("Content-Type");
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorMessage; // Use server-provided error message if available
        } else {
          errorMessage = await response.text(); // Fallback to text response if JSON not available
        }
        throw new Error(errorMessage);
      }
      const result = await response.json();
      console.log("result", result);

      setAllData(result);
      setLoading(false);
    } catch (error: any) {
      setError(error?.message || "SOMETHING WENT WRONG!!");
      setLoading(false);
    }
    setLoading(false);
  };

  console.log("Hook allData", allData);

  return {
    loading,
    error,
    fetchAllData,
    allData,
  };
};

export default useFetchMolel;

import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_AI = import.meta.env.VITE_REACT_APP_AI;

const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";

const param = `organizationLevelId=${token?.user?.organizationLevelId || ""}&partnerOrganizationId=${token?.user?.partnerOrganizationId || ""}&branchId=${token?.user?.branchId || ""}`;

// const param = `organizationType=${token?.user?.organizationType || ""}&partnerOrganizationId=${token?.user?.partnerOrganizationId || ""}&branchId=${token?.user?.branchId || ""}`;

// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${token?.access_token}`;
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export function loginPassword(data: any) {
  const page_list = `${API_URL}/auth/signin`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function forgetPasswordOptSend(data: any) {
  const page_list = `${API_URL}/auth/forgot-password`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function forgetPasswordOptValidate(data: any) {
  const page_list = `${API_URL}/auth/otp-validate`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function resetPassword(data: string, token: any) {
  const page =`${API_URL}/user/reset/password`;

  const option = {
    data,
    headers: {
      Authorization: `Bearer ${token}` ,
      "content-type": "application/json",
    },
    method: "POST",
    url: page,
  };
  return axios(option);
}

export function registration(data: any) {
  const page_list = `${API_URL}/auth/signup`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function submitFormData(api: string, options: any) {
  let page = "";

  if (api.includes("?")) {
    page = api + "&" + param;
  } else {
    page = api + "?" + param;
  }

  const option = {
    ...options,
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "application/json",
    },
    url: page,
  };
  return axios(option);
}

export function submitFormData_multipart(api: string, options: any) {
  let page = "";

  if (api.includes("?")) {
    page = api + "&" + param;
  } else {
    page = api + "?" + param;
  }

  const option = {
    ...options,
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "multipart/form-data",
    },
    url: page,
  };
  return axios(option);
}

export function submitFIleData(api: string, options: any) {
  const option = {
    ...options,
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "multipart/form-data",
    },
    url: api,
  };

  return axios(option);
}

export function get_all_data(url: string, params: any = undefined) {
  const page_list = `${API_URL}/${url}`;

  let page = "";

  if (page_list.includes("?")) {
    page = page_list + "&" + param;
  } else {
    page = page_list + "?" + param;
  }

  const options = {
    method: "GET",
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "application/json",
    },
    url: page,
    params,
  };

  return axios(options);
}

//All Location

export function getDivisionData() {
  const divisionUrl = `${API_URL}/division`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: divisionUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getDistrictData(divisionId: any) {
  const districtUrl = `${API_URL}/district?divisionId=${divisionId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getUpazilaData(districtId: any) {
  const districtUrl = `${API_URL}/upazila?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getUnionData(upazilaId: any) {
  const districtUrl = `${API_URL}/union/search?upazilaId=${upazilaId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getVillageData(unionId: any) {
  const districtUrl = `${API_URL}/village/search?unionId=${unionId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getCityCorpData(districtId: any) {
  const districtUrl = `${API_URL}/city-corporation/search?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  // console.log('====================================');
  // console.log("divisionUrl",districtUrl);
  // console.log('====================================');
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getWardData(districtId: any) {
  const districtUrl = `${API_URL}/ward/search?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  // console.log('====================================');
  // console.log("divisionUrl",districtUrl);
  // console.log('====================================');
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getPOlist() {
  const partnerOrganizationId = token?.user?.partnerOrganizationId;

  let api = `${API_URL}/partner-organization?currentPage=1&pageSize=10000&recordStatus=A`; // Replace API_URL with your base URL

  if (partnerOrganizationId) {
    api = `${API_URL}/partner-organization/${partnerOrganizationId}`;
  }
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: api,
  };
  // console.log('====================================');
  // console.log("divisionUrl",districtUrl);
  // console.log('====================================');
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function submitAI(message:any) {
  const api = `https://tial-chat.rpu.solutions/api`; // Replace API_URL with your base URL

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data : {message},
    url: api,
  };

  return axios(options);
}

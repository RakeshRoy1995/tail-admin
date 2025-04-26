import axios from "axios";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Example: Get token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting...");
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

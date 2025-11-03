import axios from "axios";

// Create a custom Axios instance
const Axios = axios.create({
  baseURL: "http://localhost:3200/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token from localStorage
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (e.g., token expired)
    if (error.response?.status === 401) {
      // Remove invalid token
      localStorage.removeItem("token");
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Axios;


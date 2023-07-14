import axios from "axios";
const BASE_URL = "https://mern-project-server-5688.onrender.com/api";
//  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

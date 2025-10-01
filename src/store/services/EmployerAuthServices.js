import axios from "axios";
import { BASE_URL } from "../constant";

export const EmployerVerifyLoginApi = (credentials) => {
  return axios.post(`${BASE_URL}/api/employeer/auth/login-otp`, credentials);
};

export const getEmployerDetailsApi = () => {
  return axios.get(`${BASE_URL}/api/employeer/employeer-profile`, {
    headers: { Authorization: `${localStorage.getItem("employeeLoginToken")}` },
  });
};

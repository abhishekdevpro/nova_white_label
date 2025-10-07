// src/services/vendorService.js
import axios from "axios";

const API_BASE = "https://apiwl.novajobs.us/api/admin";

export const vendorLogin = async (payload) => {
  const res = await axios.post(`${API_BASE}/auth/vendor/login`, payload);
  return res.data; // response: data: {...}
};

export const getVendorProfile = async (token) => {
  const res = await axios.get(`${API_BASE}/vendor/user-profile`, {
    headers: { Authorization: `${token}` },
  });
  return res.data; // response: { vendors_detail: {}, company_detail: {} }
};

export const updateVendorProfile = async (token, payload) => {
  const res = await axios.put(`${API_BASE}/company`, payload, {
    headers: { Authorization: `${token}` },
  });
  return res.data; // response: { vendors_detail: {}, company_detail: {} }
};

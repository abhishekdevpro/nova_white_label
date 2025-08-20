import axios from "axios";

const API_BASE = "https://apiwl.novajobs.us/api/admin/coupon";
const token = localStorage.getItem("authToken");
export const getCoupons = async () => {
  const res = await axios.get(API_BASE, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res.data;
};

export const createCoupon = async (data) => {
  const res = await axios.post(API_BASE, data, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res.data;
};

export const updateCoupon = async (data) => {
  // API expects PUT on `/coupon-code` for update
  const res = await axios.put("/api/admin/coupon-code", data, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return res.data;
};

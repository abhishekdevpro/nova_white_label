import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
const token = localStorage.getItem("vendorToken");

export const vendorcompanyFunction = createAsyncThunk(
  "company/fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data, "fulfilled");
      return response.data.data; // This is the resolved value used as action.payload
    } catch (error) {
      // Using rejectWithValue to return a custom error payload
      return rejectWithValue(error.toString());
    }
  }
);

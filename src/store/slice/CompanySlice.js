// src/store/slices/companySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { BASE_URL } from "../constant";

// ✅ Update company info
export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/employeer/company`, data, {
        headers: { Authorization: token },
      });
      if (res.data.status === "success" || res.data.code === 200) {
        showToastSuccess(
          res.data.message || "Company data updated successfully."
        );
        return res.data.data;
      } else {
        showToastError(res.data.message || "Failed to update company");
        return rejectWithValue(res.data);
      }
    } catch (err) {
      showToastError(
        err?.response?.data?.message || "Failed to update company"
      );
      return rejectWithValue(err.response?.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyDetail: JSON.parse(localStorage.getItem("companyDetail")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    setCompanyDetail: (state, action) => {
      state.companyDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCompanyInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Updated company detail", action.payload);
        state.companyDetail = action.payload;
        localStorage.setItem(
          "companyDetail",
          JSON.stringify(action.payload.company_detail)
        );
      })
      .addCase(updateCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCompanyDetail } = companySlice.actions;
export default companySlice.reducer;

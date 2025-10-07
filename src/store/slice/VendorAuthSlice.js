// src/redux/slices/vendorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  vendorLogin,
  getVendorProfile,
  updateVendorProfile,
} from "../services/vendorService";


const initialState = {
  vendorDetail: null,
  companyDetail: null,
  loading: false,
  token : localStorage.getItem("vendorToken") || null,
  error: null,
};

// 🔹 Login
export const loginVendor = createAsyncThunk(
  "vendor/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await vendorLogin(payload);
      return res; // assuming response structure: { data: {...} }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 Get Vendor Profile
export const fetchVendorProfile = createAsyncThunk(
  "vendor/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const res = await getVendorProfile(token);
      console.log(res,"data from the vendor slice fecth00 api")
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// 🔹 Update Vendor/Company Profile
export const updateVendorData = createAsyncThunk(
  "vendor/updateData",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const res = await updateVendorProfile(token, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    logoutVendor: (state) => {
      state.vendorDetail = null;
      state.companyDetail = null;
      localStorage.removeItem("vendorDetail");
      localStorage.removeItem("companyDetail");
    },
    setVendorData: (state, action) => {
      state.vendorDetail = action.payload.vendorDetail;
      state.companyDetail = action.payload.companyDetail;
      localStorage.setItem("vendorDetail", JSON.stringify(state.vendorDetail));
      localStorage.setItem(
        "companyDetail",
        JSON.stringify(state.companyDetail)
      );
    },
    loadVendorFromStorage: (state) => {
      const vendor = localStorage.getItem("vendorDetail");
      const company = localStorage.getItem("companyDetail");
      if (vendor) state.vendorDetail = JSON.parse(vendor);
      if (company) state.companyDetail = JSON.parse(company);
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorDetail = action.payload.data || null;
        // state.companyDetail = action.payload.companyDetail || null;
        state.token = action.payload.data.token
        localStorage.setItem(
          "vendorDetail",
          JSON.stringify(state.vendorDetail)
        );
        // localStorage.setItem("companyDetail", JSON.stringify(state.companyDetail));
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PROFILE
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorDetail = action.payload.vendors_detail || null;
        state.companyDetail = action.payload.company_detail || null;
        console.log(action.payload,"action.payload in vendor slice");
        localStorage.setItem(
          "vendorDetail",
          JSON.stringify(state.vendorDetail)
        );
        localStorage.setItem(
          "companyDetail",
          JSON.stringify(state.companyDetail)
        );
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateVendorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendorData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetail = action.payload || null;
        localStorage.setItem(
          "companyDetail",
          JSON.stringify(state.companyDetail)
        );
      })
      .addCase(updateVendorData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutVendor, setVendorData, loadVendorFromStorage } =
  vendorSlice.actions;

export default vendorSlice.reducer;

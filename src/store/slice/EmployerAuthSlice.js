import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  EmployerVerifyLoginApi,
  getEmployerDetailsApi,
} from "../services/EmployerAuthServices";

// Async thunks
export const EmployeeVerifyOTP = createAsyncThunk(
  "auth/EmployeeVerifyOTP",
  async (credentials, { rejectWithValue }) => {
    console.log("Credentials:", credentials);
    try {
      const response = await EmployerVerifyLoginApi(credentials);
      return response.data; // -> employeer basic info
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchEmployerDetails = createAsyncThunk(
  "auth/fetchEmployerDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployerDetailsApi();
      return response.data; // -> employeer_detail + company_detail
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  employerDetail: JSON.parse(localStorage.getItem("employerDetail")) || null,
  //   companyDetail: null, // from details API
  token: localStorage.getItem("employeeLoginToken") || null,
  loading: false,
  error: null,
};

const EmployerAuthSlice = createSlice({
  name: "Employeeauth",
  initialState,
  reducers: {
    employeeLogout: (state) => {
  state.employerDetail = null;
  state.companyDetail = null;
  state.token = null;
  localStorage.removeItem("employeeLoginToken");
  localStorage.removeItem("employerDetail");
  localStorage.removeItem("companyDetail");
},

  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(EmployeeVerifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(EmployeeVerifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.employerDetail = action.payload.data; // basic info
        // {console.log("employer detail from slice",action.payload)}
        state.token = action.payload.data.token; // if token exists
        localStorage.setItem("employeeLoginToken", state.token);
        localStorage.setItem(
          "employerDetail",
          JSON.stringify(action.payload.data)
        );
      })
      .addCase(EmployeeVerifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch details
      .addCase(fetchEmployerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.employerDetail = action.payload.employeer_detail;
        // state.companyDetail = action.payload.company_detail;
      })
      .addCase(fetchEmployerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { employeeLogout } = EmployerAuthSlice.actions;
export default EmployerAuthSlice.reducer;

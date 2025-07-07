
import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanyInfo } from "../thunkFunctions/companyFunction";

const initialState = {
  companyData: {
    companyName: "",
    summary: "",
    about: "",
    company_size: {
      id: 1,
      name: "Small Size",
      date_added: "",
      range: "0-50",
    },
    email: "",
    company_type: {
      id: 1,
      name: "Public Company",
      date_added: "",
    },
    tagline: "",
    user_id: "",
    website_link: "",
    founded_date: "",
    phone: "",
    country: {
      id: 1,
      sortname: "AF",
      name: "Afghanistan",
      phonecode: "93",
    },
    state: {
      id: 1,
      name: "Andaman and Nicobar Islands",
      country_id: 0,
    },
    city: {
      id: 1,
      name: "Bombuflat",
      state_id: 0,
    },
    zip_code: "",
    address: "",
    facebook_link: "",
    twitter_link: "",
    google_link: "",
    linkedin_link: "",
  },
  isLoading: false, // Add loading state
  error: null, // Add error state
};

const companyDataSlice = createSlice({
  name: "companyDataSlice",
  initialState,
  reducers: {
    // setCompanyData: (state, action) => {
    // console.log("action.payload in company slice",action.payload);
    //   state.companyData = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.isLoading = true; // Set loading to true when fetching starts
        state.error = null; // Reset error state
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading to false after the data is fetched
        console.log("action.payload in company slice", action.payload);
        state.companyData = action.payload; // Store the fetched company data
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.isLoading = false; // Set loading to false if there's an error
        state.error = action.payload; // Store the error message
      });
  },
});

export const { setCompanyData } = companyDataSlice.actions;
export default companyDataSlice.reducer;

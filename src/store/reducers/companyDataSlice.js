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
};

const companyDataSlice = createSlice({
  name: "companyDataSlice",
  initialState,
  reducers: {
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        // console.log("here");
        state.isUserChatsLoading = true;
        state.userChatsError = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        console.log("here");
        state.companyData = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        console.log("here");
        state.isUserChatsLoading = false;
      });
  },
});

export const { setCompanyData } = companyDataSlice.actions;
export default companyDataSlice.reducer;

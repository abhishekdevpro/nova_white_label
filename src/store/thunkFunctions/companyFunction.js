// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { showToastError } from "../../utils/toastify";
// const token = localStorage.getItem("employeeLoginToken");

// export const fetchCompanyInfo = createAsyncThunk(
//   "company/fetchCompanyInfo",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         method: "get",
//         url: "https://apiwl.novajobs.us/api/employeer/employeer-profile",
//         headers: {
//           Authorization: token,
//         },
//       });
//       console.log(response.data.data, "fulfilled");
//       return response.data.data; // This is the resolved value used as action.payload
//     } catch (error) {
//       // Using rejectWithValue to return a custom error payload
//       return rejectWithValue(error.toString());
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToastError } from "../../utils/toastify";

const token = localStorage.getItem("employeeLoginToken") 
const vendorToken = localStorage.getItem("vendorToken");
  const API = vendorToken ? "https://apiwl.novajobs.us/api/admin/vendor/user-profile" :"https://apiwl.novajobs.us/api/employeer/employeer-profile"

export const fetchCompanyInfo = createAsyncThunk(
  "company/fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: API,
        headers: {
          Authorization: vendorToken ?vendorToken:token,  
        },
      });
      return response.data.data;  // Return the response data as action payload
    } catch (error) {
      // Log the error and use rejectWithValue to handle the error in reducers
      console.error("Error fetching company info:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

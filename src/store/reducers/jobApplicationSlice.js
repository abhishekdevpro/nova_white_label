import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobApplicationData: [],
  jobApplicationValues: {
    country_id: "",
    city_id: "",
    state_id: "",
    workplace_type: "",
    experience_level: "",
    job_type: "",
    search_input: "",
    country: "",
    state: "",
    city: "",
    jobCategory: "",
  },
};

const jobApplicationSlice = createSlice({
  name: "jobApplicationSlice",
  initialState,
  reducers: {
    setJobApplicationData: (state, action) => {
      state.jobApplicationData = action.payload;
    },
    setJobApplicationValues: (state, action) => {
      state.jobApplicationValues = action.payload;
    },
  },
});

export const { setJobApplicationData, setJobApplicationValues } =
  jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;

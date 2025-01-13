import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobsData: [],
};

const jobDataSlice = createSlice({
  name: "jobDataSlice",
  initialState,
  reducers: {
    setJobsData: (state, action) => {
      state.jobsData = action.payload;
    },
  },
});

export const { setJobsData } = jobDataSlice.actions;
export default jobDataSlice.reducer;

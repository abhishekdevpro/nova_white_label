import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  browseCandidateValues: {
    education: "",
    experience: "",
    salary: "",
    counry_id: "",
    city_id: "",
    state_id: "",
    search_input: "",
  },
  browseCandidateData: [],
};
const browseCandidateSlice = createSlice({
  name: "browseCandidateSlice",
  initialState,
  reducers: {
    setBrowseCandidateValues: (state, action) => {
      state.browseCandidateValues = action.payload;
    },
    setBrowseCandidateData: (state, action) => {
      state.browseCandidateData = action.payload;
    },
  },
});

export const { setBrowseCandidateData, setBrowseCandidateValues } =
  browseCandidateSlice.actions;
export default browseCandidateSlice.reducer;

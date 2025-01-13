import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobProfileValues: {
    first_name: "",
    last_name: "",
    professional_title: "",
    languages: "",
    age: "",
    current_salary: "",
    expected_salary: "",
    description: "",
    phone: "",
    email: "",
    country_id: "",
    city_id: "",
    state_id: "",
  },
  profileImageValue: {},
};

const jobProfileSlice = createSlice({
  name: "jobProfileSlice",
  initialState,
  reducers: {
    setJobProfileValues: (state, action) => {
      state.jobProfileValues = action.payload;
    },
    setProfileImageValue: (state, action) => {
      state.profileImageValue = action.payload;
    },
  },
});

export const { setJobProfileValues, setProfileImageValue } =
  jobProfileSlice.actions;
export default jobProfileSlice.reducer;

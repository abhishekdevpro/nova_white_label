import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fixedHeaderValues: {
    first_name: "",
    last_name: "",
    professional_title: "",
    email: "",
    country_id: "",
    state_id: "",
    phone: "",
    photo: "",
  },
};

const fixedHeaderSlice = createSlice({
  name: "fixedHeaderSlice",
  initialState,
  reducers: {
    setFixedHeaderValues: (state, action) => {
      state.fixedHeaderValues = action.payload;
    },
  },
});

export const { setFixedHeaderValues } = fixedHeaderSlice.actions;
export default fixedHeaderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  manageJobData: {},
};

const manageJobSlice = createSlice({
  name: "manageJobSlice",
  initialState,
  reducers: {
    setManageJobData: (state, action) => {
      state.manageJobData = action.payload;
    },
  },
});

export const { setManageJobData } = manageJobSlice.actions;
export default manageJobSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skillInput: "",
  skillsValues: {
    skills: "",
  },
  skillsData: [],
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkillsValues: (state, action) => {
      // Immer-based mutation for efficient state updates:
      state.skillsValues = action.payload;
    },
    setSkillsData: (state, action) => {
      // Immer-based mutation:
      state.skillsData = action.payload;
    },
    deleteSkill: (state, action) => {
      // Immer-based mutation:
      state.skillsData.splice(action.payload, 1); // Use splice for deletion
    },
    addItem: (state, action) => {
      // Immer-based mutation:
      state.skillsData.push(action.payload);
    },
    editItem: (state, action) => {
      const { index, newValue } = action.payload;
      // Immer-based mutation:
      state.skillsData[index] = newValue;
    },
    setSkillInput: (state, action) => {
      state.skillInput = action.payload;
    },
  },
});

export const {
  setSkillsValues,
  setSkillsData,
  deleteSkill,
  addItem,
  editItem,
  setSkillInput,
} = skillSlice.actions;

export default skillSlice.reducer;

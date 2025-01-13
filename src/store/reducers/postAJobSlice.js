import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  skillsValues: "",
  skillsData: ["skill2", "skill2", "skill3"],
  employmentData: {
    currentJobTitle: "",
    previousEmployers: "",
    previousJobRole: "",
  },
  references: {
    contactInformation: "",
    primaryReference: "",
  },
  personalInformation: {
    dateOfBirth: "",
  },
  screeningQuestion: {},
  selectedScreeningQuestions: {
    screen_question_keywords: [],
  },
  postAJobData: {
    jobTitle: "",
    company: "",
    workplaceType: "",
    location: "",
    jobType: "",
    description: "",
    education: "",
    qualificationSetting: "",
    selectedCity: "",
    selectedState: "",
    selectedCountry: "",
  },
};

const postAJobSlice = createSlice({
  name: "postAJobSlice",
  initialState,
  reducers: {
    setPostAJobData: (state, action) => {
      console.log(action.payload, "Joy");
      state.postAJobData = action.payload;
    },
    setSkillsValues: (state, action) => {
      state.skillsValues = action.payload;
    },
    setSkillsData: (state, action) => {
      state.skillsData = action.payload;
    },
    setEmploymentData: (state, action) => {
      state.employmentData = action.payload;
    },
    setReferences: (state, action) => {
      state.references = action.payload;
    },
    setPersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
    setScreeningQuestion: (state, action) => {
      state.screeningQuestion = action.payload;
    },
    setSelctedScreeningQuestion: (state, action) => {
      const { category } = action.payload;
      console.log(category, "category in slice file");
      const questions =
        state.selectedScreeningQuestions.screen_question_keywords;

      const index =
        state.selectedScreeningQuestions.screen_question_keywords.findIndex(
          (item) => item.id === category.id
        );
      console.log(index);
      console.log(index, "index");
      if (index === -1) {
        state.selectedScreeningQuestions.screen_question_keywords.push(
          category
        );
      } else {
        state.selectedScreeningQuestions.screen_question_keywords.splice(
          index,
          1
        );
      }
    },
    setSelctedScreeningQuestionGet: (state, action) => {
      console.log(action.payload, "item");
      state.selectedScreeningQuestions = action.payload;
    },
  },
});

export const {
  setPostAJobData,
  setSkillsValues,
  setSkillsData,
  setEmploymentData,
  setReferences,
  setPersonalInformation,
  setScreeningQuestion,
  setSelctedScreeningQuestion,
  setSelctedScreeningQuestionGet,
} = postAJobSlice.actions;

export default postAJobSlice.reducer;

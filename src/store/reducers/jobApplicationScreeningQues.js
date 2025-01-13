import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedScreeningQuestions: {
    screen_question_keywords: [],
  },
};

const jobApplicationScreeningQues = createSlice({
  name: "jobApplicationScreeningQues",
  initialState,
  reducers: {
    setScreeningQuestion: (state, action) => {
      state.selectedScreeningQuestions = action.payload;
    },
    setJobSeekerAnswer: (state, action) => {
      const { index, questionIndex, answer } = action.payload;
      console.log(state.selectedScreeningQuestions.screen_question_keywords[0]);
      state.selectedScreeningQuestions.screen_question_keywords[
        index
      ].screen_questions[questionIndex].user_answer = answer;
    },
  },
});

export const { setScreeningQuestion, setJobSeekerAnswer } =
  jobApplicationScreeningQues.actions;
export default jobApplicationScreeningQues.reducer;

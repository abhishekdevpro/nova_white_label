import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skillTestQuestions: {
    skill_assessment_id: 13,
    job_seeker_id: 12,
    skill_id: 1,
    skill_name: "Basic Knowledge of Computer",
    questions: [
      {
        question: "What is the primary function of an operating system?",
        options: [
          "Managing hardware resources",
          "Performing mathematical calculations",
          "Creating presentations",
          "Developing websites"
        ],
        correct_answer: "Managing hardware resources",
        user_answer: ""
      },
      {
        question: "What is RAM an acronym for?",
        options: [
          "Randomly Accessed Memory",
          "Readily Accessed Memory",
          "Random Access Memory",
          "Read Access Memory"
        ],
        correct_answer: "Random Access Memory",
        user_answer: ""
      },
    ]
  }
};

const skillTestQuestionSlice = createSlice({
  name: "skillTestQuestionSlice",
  initialState,
  reducers: {
    setSkillTestQuestions: (state, action) => {
      state.skillTestQuestions = action.payload;
    },
    setUserAnswer: (state, action) => {
      console.log(action);
      const { index, answer } = action.payload; 
      state.skillTestQuestions.questions[index].user_answer = answer; 
    }
  },
});

export const { setSkillTestQuestions, setUserAnswer } = skillTestQuestionSlice.actions;
export default skillTestQuestionSlice.reducer;

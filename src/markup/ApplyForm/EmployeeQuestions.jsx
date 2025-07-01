
// import axios from "axios";
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const EmployeeQuestionsForm = ({
//   formData,
//   setFormData,
//   errors,
//   questions,
//   setQuestions,
// }) => {
//   const { id } = useParams(); // Get the job ID from the URL
//   console.log(id, "Job ID from URL");
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("jobSeekerLoginToken");
//         const response = await axios.get(
//           `https://apiwl.novajobs.us/api/jobseeker/job-list/${id}`,
//           {
//             headers: {
//               Authorization: `${token}`,
//             },
//           }
//         );
//         console.log(response, "Response from API");
//         // Parse screening_questions if it's a JSON string
//         // const screeningQuestions = response.data.data.screening_question_output
//         //   ? JSON.parse(response.data.data.screening_question_output)
//         //   : [];

//         console.log(
//           response.data.data.screening_question_output,
//           "Screening Questions from API"
//         );

//         setQuestions(response.data.data.screening_question_output); // Pass questions to ApplyForm
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setQuestions([]); // Fallback to an empty array
//       }
//     };

//     if (id) {
//       fetchQuestions();
//     }
//   }, []);

//   console.log(questions, "Screening Questions");

//   // const handleChange = (e) => {
//   //   console.log(e.target, "Selected Option");
//   //   const { name, value } = e.target;

//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: value,
//   //   }));
//   // };

//   const handleChange = (e, question, index) => {
//     const { value } = e.target;
//     const key = `question${index + 1}`;

//     setFormData((prev) => ({
//       ...prev,
//       [key]: {
//         question: question.question,
//         answer: value,
//       },
//     }));
//   };

//   return (
//     <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Screening Questions
//       </h2>
//       {questions && questions?.length > 0 ? (
//         questions.map((question, index) => (
//           <div
//             key={index}
//             className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow"
//           >
//             <label
//               htmlFor={`question${index + 1}`}
//               className="block text-base font-medium text-gray-800"
//             >
//               {question.question}
//             </label>
//             <p className="text-sm text-gray-600 mt-1">{question.description}</p>
//             {question.options && question.options.length > 0 ? (
//               <div className="space-y-2 mt-3">
//                 {question.options.map((option, optIndex) => (
//                   <div key={optIndex} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={`${question.question}_${optIndex}`}
//                       name={`question${index + 1}`}
//                       value={option}
//                       checked={
//                         formData[`question${index + 1}`]?.answer === option
//                       }
//                       onChange={(e) => handleChange(e, question, index)}
//                       className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
//                     />

//                     <label
//                       htmlFor={`question${index + 1}_option${optIndex}`}
//                       className="ml-3 text-sm text-gray-700"
//                     >
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <textarea
//                 id={`question${index + 1}`}
//                 name={`question${index + 1}`}
//                 value={formData[`question${index + 1}`]?.answer || ""}
//                 onChange={(e) => handleChange(e, question, index)}
//                 className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 rows="3"
//                 placeholder="Type your answer here..."
//               />
//             )}
//             {errors[`question${index + 1}`] && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors[`question${index + 1}`]}
//               </p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600">No questions available.</p>
//       )}
//     </div>
//   );
// };

// export default EmployeeQuestionsForm;


import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

// Styled Components
const StyledCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
`;

const QuestionCard = styled.div`
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const QuestionLabel = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #343a40;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const QuestionDescription = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
    cursor: pointer;
  }
  
  label {
    font-size: 0.875rem;
    color: #495057;
    cursor: pointer;
    margin: 0;
    flex: 1;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &::placeholder {
    color: #6c757d;
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #dc3545;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: "⚠";
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

const NoQuestionsMessage = styled.p`
  color: #6c757d;
  font-size: 1rem;
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 0.125rem solid #f3f3f3;
    border-top: 0.125rem solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmployeeQuestionsForm = ({
  formData,
  setFormData,
  errors,
  questions,
  setQuestions,
}) => {
  const { id } = useParams(); // Get the job ID from the URL
  console.log(id, "Job ID from URL");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("jobSeekerLoginToken");
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/job-list/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response, "Response from API");

        console.log(
          response.data.data.screening_question_output,
          "Screening Questions from API"
        );

        setQuestions(response.data.data.screening_question_output); // Pass questions to ApplyForm
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]); // Fallback to an empty array
      }
    };

    if (id) {
      fetchQuestions();
    }
  }, [id, setQuestions]);

  console.log(questions, "Screening Questions");

  const handleChange = (e, question, index) => {
    const { value } = e.target;
    const key = `question${index + 1}`;

    setFormData((prev) => ({
      ...prev,
      [key]: {
        question: question.question,
        answer: value,
      },
    }));
  };

  return (
    <StyledCard>
      <div className="container-fluid">
        <SectionTitle>Screening Questions</SectionTitle>
        
        {questions && questions?.length > 0 ? (
          <div className="row">
            <div className="col-12">
              {questions.map((question, index) => (
                <QuestionCard key={index}>
                  <QuestionLabel htmlFor={`question${index + 1}`}>
                    {question.question}
                  </QuestionLabel>
                  
                  {question.description && (
                    <QuestionDescription>
                      {question.description}
                    </QuestionDescription>
                  )}
                  
                  {question.options && question.options.length > 0 ? (
                    <OptionsContainer>
                      {question.options.map((option, optIndex) => (
                        <RadioOption key={optIndex}>
                          <input
                            type="radio"
                            id={`${question.question}_${optIndex}`}
                            name={`question${index + 1}`}
                            value={option}
                            checked={
                              formData[`question${index + 1}`]?.answer === option
                            }
                            onChange={(e) => handleChange(e, question, index)}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={`${question.question}_${optIndex}`}
                          >
                            {option}
                          </label>
                        </RadioOption>
                      ))}
                    </OptionsContainer>
                  ) : (
                    <div className="mt-3">
                      <StyledTextarea
                        id={`question${index + 1}`}
                        name={`question${index + 1}`}
                        value={formData[`question${index + 1}`]?.answer || ""}
                        onChange={(e) => handleChange(e, question, index)}
                        className="form-control"
                        rows="3"
                        placeholder="Type your answer here..."
                      />
                    </div>
                  )}
                  
                  {errors[`question${index + 1}`] && (
                    <ErrorMessage>
                      {errors[`question${index + 1}`]}
                    </ErrorMessage>
                  )}
                </QuestionCard>
              ))}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <NoQuestionsMessage>
                No screening questions available for this position.
              </NoQuestionsMessage>
            </div>
          </div>
        )}
      </div>
    </StyledCard>
  );
};

export default EmployeeQuestionsForm;
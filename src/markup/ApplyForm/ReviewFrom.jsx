// import React from 'react';

// const ReviewForm = ({ formData = {} }) => {
//   console.log(formData, "Form Data in ReviewForm");
//   return (
//     <div className="space-y-8">
//       <div>
//         <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//         <p>Name: {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}</p>
//         <p>Email: {formData?.email || 'N/A'}</p>
//         <p>Phone: {formData?.phone || 'N/A'}</p>
//         <p>Location: {formData?.location || 'N/A'}</p>
//         <p>Resume: {formData?.resumeOption || 'N/A'}</p>
//         <p>Cover Letter: {formData?.coverLetterOption || 'N/A'}</p>
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-900">Employee Questions</h3>
//         {[1, 2, 3, 4, 5, 6].map((num) => (
//           <p key={num}>Question {num}: {formData?.[`question${num}`] || 'N/A'}</p>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ReviewForm;


// import React from 'react';

// const ReviewForm = ({ formData = {} }) => {
//   console.log(formData, "Form Data in ReviewForm");

//   // Extract screening questions dynamically
//   const screeningQuestions = Object.entries(formData)
//     .filter(([key]) => key.startsWith('question'))
//     .map(([key, value], index) => {
//       if (typeof value === 'object' && value !== null) {
//         return (
//           <div key={key} className="mb-3">
//             <p className="font-medium text-gray-800">
//               Q{index + 1}: {value.question}
//             </p>
//             <p className="text-gray-700">Answer: {value.answer || 'N/A'}</p>
//           </div>
//         );
//       } else if (typeof value === 'string' && value.trim() !== '') {
//         return (
//           <div key={key} className="mb-3">
//             <p className="font-medium text-gray-800">Q{index + 1}</p>
//             <p className="text-gray-700">Answer: {value}</p>
//           </div>
//         );
//       }
//       return null; // Skip empty or undefined
//     });

//   return (
//     <div className="space-y-8">
//       <div>
//         <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//         <p>Name: {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}</p>
//         <p>Email: {formData?.email || 'N/A'}</p>
//         <p>Phone: {formData?.phone || 'N/A'}</p>
//         <p>Location: {formData?.location || 'N/A'}</p>
//         <p>Resume: {formData?.resumeOption || 'N/A'}</p>
//         <p>Cover Letter: {formData?.coverLetterOption || 'N/A'}</p>
//       </div>

//    { screeningQuestions.length > 0 &&  <div>
//         <h3 className="text-lg font-medium text-gray-900">Screening Questions</h3>
//         {screeningQuestions.length > 0 ? screeningQuestions : <p className="text-gray-600">No screening questions answered.</p>}
//       </div>}
//     </div>
//   );
// };

// export default ReviewForm;


import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled Components
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #343a40;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    width: 4px;
    height: 1.5rem;
    background-color: #007bff;
    margin-right: 0.75rem;
    border-radius: 2px;
  }
`;

const InfoItem = styled.p`
  margin-bottom: 0.75rem;
  color: #495057;
  font-size: 0.95rem;
  line-height: 1.5;
  
  strong {
    color: #343a40;
    font-weight: 600;
    margin-right: 0.5rem;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007bff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const QuestionText = styled.p`
  font-weight: 500;
  color: #343a40;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const AnswerText = styled.p`
  color: #6c757d;
  margin-bottom: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  padding-left: 1rem;
  border-left: 3px solid #e9ecef;
  
  strong {
    color: #495057;
    font-weight: 500;
  }
`;

const NoDataMessage = styled.p`
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  border: 1px dashed #dee2e6;
  margin: 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  
  &.resume-selected {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.cover-letter-selected {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }
  
  &.none-selected {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f1aeb5;
  }
`;

const ReviewForm = ({ formData = {} }) => {
  console.log(formData, "Form Data in ReviewForm");

  // Extract screening questions dynamically
  const screeningQuestions = Object.entries(formData)
    .filter(([key]) => key.startsWith('question'))
    .map(([key, value], index) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <QuestionCard key={key}>
            <QuestionText>
              Q{index + 1}: {value.question}
            </QuestionText>
            <AnswerText><strong>Answer:</strong> {value.answer || 'N/A'}</AnswerText>
          </QuestionCard>
        );
      } else if (typeof value === 'string' && value.trim() !== '') {
        return (
          <QuestionCard key={key}>
            <QuestionText>Q{index + 1}</QuestionText>
            <AnswerText><strong>Answer:</strong> {value}</AnswerText>
          </QuestionCard>
        );
      }
      return null; // Skip empty or undefined
    });

  const getStatusBadge = (option, type) => {
    if (!option || option === 'none') {
      return <StatusBadge className="none-selected">Not Selected</StatusBadge>;
    }
    if (type === 'resume') {
      return <StatusBadge className="resume-selected">{option}</StatusBadge>;
    }
    if (type === 'coverLetter') {
      return <StatusBadge className="cover-letter-selected">{option}</StatusBadge>;
    }
    return <StatusBadge>{option}</StatusBadge>;
  };

  return (
    <ReviewContainer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Personal Information Section */}
            <SectionCard className="mb-4">
              <SectionTitle>Personal Information</SectionTitle>
              <div className="row">
                <div className="col-md-6">
                  <InfoItem>
                    <strong>Name:</strong>
                    {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}
                  </InfoItem>
                  <InfoItem>
                    <strong>Email:</strong>
                    {formData?.email || 'N/A'}
                  </InfoItem>
                  <InfoItem>
                    <strong>Phone:</strong>
                    {formData?.phone || 'N/A'}
                  </InfoItem>
                </div>
                <div className="col-md-6">
                  <InfoItem>
                    <strong>Location:</strong>
                    {formData?.location || 'N/A'}
                  </InfoItem>
                  <InfoItem>
                    <strong>Resume:</strong>
                    {formData?.resumeOption || 'N/A'}
                    {getStatusBadge(formData?.resumeOption, 'resume')}
                  </InfoItem>
                  <InfoItem>
                    <strong>Cover Letter:</strong>
                    {formData?.coverLetterOption || 'N/A'}
                    {getStatusBadge(formData?.coverLetterOption, 'coverLetter')}
                  </InfoItem>
                </div>
              </div>
            </SectionCard>

            {/* Screening Questions Section */}
            {screeningQuestions.length > 0 && (
              <SectionCard>
                <SectionTitle>Screening Questions</SectionTitle>
                <div className="row">
                  <div className="col-12">
                    {screeningQuestions.length > 0 ? (
                      screeningQuestions
                    ) : (
                      <NoDataMessage>
                        No screening questions answered.
                      </NoDataMessage>
                    )}
                  </div>
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      </div>
    </ReviewContainer>
  );
};

export default ReviewForm;
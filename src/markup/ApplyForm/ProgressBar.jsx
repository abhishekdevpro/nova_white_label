// // import React from 'react';

// // const ProgressBar = ({ currentStep, totalSteps }) => {
// //   const progress = (currentStep / totalSteps) * 100;

// //   return (
// //     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
// //       <div
// //         className="bg-blue-600 h-2.5 rounded-full"
// //         style={{ width: `${progress}%` }}
// //       ></div>
// //     </div>
// //   );
// // };

// // export default ProgressBar;
// import React from 'react';

// const ProgressSteps = ({ currentStep, totalSteps }) => {
//   return (
//     <div className="flex items-center justify-between w-full px-4 py-2">
//       {[...Array(totalSteps)].map((_, index) => {
//         const stepNumber = index + 1;
//         const isActive = stepNumber <= currentStep;
        
//         return (
//           <div key={stepNumber} className="flex flex-col items-center">
//             <div 
//               className={`
//                 w-10 h-10 rounded-full flex items-center justify-center 
//                 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
//                 font-bold transition-all duration-300
//               `}
//             >
//               {stepNumber}
//             </div>
//             {index < totalSteps - 1 && (
//               <div 
//                 className={`
//                   w-16 h-1 mx-2 my-2 
//                   ${stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
//                   transition-all duration-300
//                 `}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProgressSteps;


import React from 'react';
import styled from 'styled-components';

// Color theme
const primary = "#1c2957";
const secondary = "#fff";
const inactive = "#e9ecef";

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0.5rem;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const StepCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => (props.active ? primary : inactive)};
  color: ${props => (props.active ? secondary : primary)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  border: 2px solid ${primary};
  transition: background 0.2s, color 0.2s;
`;

const StepLine = styled.div`
  flex: 1;
  height: 4px;
  background: ${props => (props.filled ? primary : inactive)};
  margin: 0 8px;
  border-radius: 2px;
  transition: background 0.2s;
`;

const ProgressSteps = ({ currentStep, totalSteps }) => {
  return (
    <ProgressContainer>
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isFilled = stepNumber < currentStep;

        return (
          <StepWrapper key={stepNumber}>
            <StepCircle active={isActive}>{stepNumber}</StepCircle>
            {index < totalSteps - 1 && (
              <StepLine filled={isFilled} />
            )}
          </StepWrapper>
        );
      })}
    </ProgressContainer>
  );
};

export default ProgressSteps
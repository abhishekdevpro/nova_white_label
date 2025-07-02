

const ProgressSteps = ({ currentStep, totalSteps }) => {
  return (
      <div className="d-flex justify-content-between align-items-center px-2 py-3">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="d-flex align-items-center flex-grow-1">
            {/* Step Circle */}
            <div
              className={`rounded-circle d-flex justify-content-center align-items-center fw-bold me-2 transition`}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: isActive ? "#1c2957" : "#dee2e6",
                color: isActive ? "#fff" : "#1c2957",
                border: "2px solid #1c2957",
                fontSize: "1rem",
              }}
            >
              {stepNumber}
            </div>

            {/* Step Line */}
            {index < totalSteps - 1 && (
              <div
                className="flex-grow-1"
                style={{
                  height: "4px",
                  backgroundColor: isCompleted ? "#1c2957" : "#dee2e6",
                  borderRadius: "2px",
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;

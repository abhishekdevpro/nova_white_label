import React from "react";

const ReviewForm = ({ formData = {} }) => {
  console.log(formData, "Form Data in ReviewForm");

  const screeningQuestions = Object.entries(formData)
    .filter(([key]) => key.startsWith("question"))
    .map(([key, value], index) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div className="card border mb-3" key={key}>
            <div className="card-body">
              <p className="fw-semibold mb-1 text-dark">
                Q{index + 1}: {value.question}
              </p>
              <p className="text-secondary ms-3 mb-0">
                <strong>Answer:</strong> {value.answer || "N/A"}
              </p>
            </div>
          </div>
        );
      } else if (typeof value === "string" && value.trim() !== "") {
        return (
          <div className="card border mb-3" key={key}>
            <div className="card-body">
              <p className="fw-semibold mb-1 text-dark">Q{index + 1}</p>
              <p className="text-secondary ms-3 mb-0">
                <strong>Answer:</strong> {value}
              </p>
            </div>
          </div>
        );
      }
      return null;
    });

  const getStatusBadge = (option, type) => {
    if (!option || option === "none") {
      return (
        <span className="badge text-dark border border-danger-subtle text-danger ms-2">
          Not Selected
        </span>
      );
    }
    if (type === "resume") {
      return (
        <span className="badge text-bg-success-subtle border border-success ms-2">
          {option}
        </span>
      );
    }
    if (type === "coverLetter") {
      return (
        <span className="badge text-bg-info-subtle border border-info ms-2">
          {option}
        </span>
      );
    }
    return (
      <span className="badge text-bg-secondary-subtle border ms-2">
        {option}
      </span>
    );
  };

  return (
    <div className="container bg-white p-4 rounded shadow mt-4 mb-4">
      <div className="row">
        <div className="col-12 mb-4">
          <h5
            className="border-bottom pb-2 text-dark"
            style={{ color: "#1c2957" }}
          >
            Personal Information
          </h5>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2 text-secondary">
                <strong>Name:</strong> {formData?.firstName || "N/A"}{" "}
                {formData?.lastName || "N/A"}
              </p>
              <p className="mb-2 text-secondary">
                <strong>Email:</strong> {formData?.email || "N/A"}
              </p>
              <p className="mb-2 text-secondary">
                <strong>Phone:</strong> {formData?.phone || "N/A"}
              </p>
            </div>
            <div className="col-md-6">
              {/* <p className="mb-2 text-secondary">
                <strong>Location:</strong> {formData?.location || 'N/A'}
              </p> */}
              <p className="mb-2 text-secondary">
                <strong>Resume:</strong> {formData?.resumeOption || "N/A"}
                {/* {getStatusBadge(formData?.resumeOption, 'resume')} */}
              </p>
              <p className="mb-2 text-secondary">
                <strong>Cover Letter:</strong>{" "}
                {formData?.coverLetterOption || "N/A"}
                {/* {getStatusBadge(formData?.coverLetterOption, 'coverLetter')} */}
              </p>
              <p className="mb-2 text-secondary">
                <strong>Location:</strong> {formData?.location || "N/A"}
              </p>
            </div>
          </div>
        </div>
        {screeningQuestions.length > 0 && (
          <div className="col-12">
            {/* <h5 className="border-bottom pb-2 text-dark" style={{ color: '#1c2957' }}>
              Screening Questions
            </h5> */}
            {screeningQuestions}
          </div>
        )}

        {screeningQuestions.length === 0 && (
          <div className="col-12">
            <div className="alert alert-secondary text-center" role="alert">
              No screening questions answered.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function InterviewStep({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    experience: "",
    companyName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStartInterview = () => {
    if (!formData.jobTitle || !formData.location || !formData.experience || !formData.companyName) {
      toast.error("Please fill all fields before starting the interview");
      return;
    }

    onNext?.(formData);
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Tell Us About the Role</h2>
        <p className="text-muted">
          Please enter the details before we begin your interview.
        </p>
      </div>

      {/* Form Section */}
      <div className="row g-4">
        <div className="col-md-6">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore, India"
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 3 years"
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="form-control"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center mt-4 gap-3">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleStartInterview} variant="primary">
          Start Interview
        </Button>
      </div>
    </div>
  );
}

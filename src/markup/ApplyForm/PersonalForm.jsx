import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileIcon,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  User,
  UserPlus,
  LocateIcon,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import PDFPopupViewer from "../../components/ui/PdfPopUp";

const PersonalInfoForm = ({ formData, setFormData, errors }) => {
  const [loading, setLoading] = useState(true);
  const [resumeList, setResumeList] = useState([]);
  const [coverLetterList, setCoverLetterList] = useState([]);
  const [previewResume, setPreviewResume] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/user-profile",
          { headers: { Authorization: token } }
        );
        const userData = response.data.data;
        setFormData((prevData) => ({
          ...prevData,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.cities.name || "",
          resumeOption: prevData.resumeOption || "",
          coverLetterOption: prevData.coverLetterOption || "",
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };

    const fetchResumeList = async () => {
      try {
        const res = await axios.get(
          "https://apiwl.novajobs.us/api/user/resume-list",
          { headers: { Authorization: token } }
        );
        setResumeList(res.data.data || []);
      } catch (err) {
        console.error("Error fetching resume list:", err);
      }
    };

    const fetchcoverLetterList = async () => {
      try {
        const res = await axios.get(
          "https://apiwl.novajobs.us/api/user/coverletter",
          { headers: { Authorization: token } }
        );
        setCoverLetterList(res.data.data || []);
      } catch (err) {
        console.error("Error fetching resume list:", err);
      }
    };

    fetchUserProfile();
    fetchResumeList();
    fetchcoverLetterList();
  }, []);

  useEffect(() => {
    if (!formData.resumeOption && formData.resume) {
      const isFromList = resumeList.some(
        (resume) => resume.file_path === formData.resume
      );
      setFormData((prev) => ({
        ...prev,
        resumeOption: isFromList ? "selected" : "upload",
      }));
    }
  }, [resumeList, formData.resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear previous file if user switches mode
    if (name === "resumeOption" && value === "selected") {
      setFormData((prev) => ({ ...prev, resume: "" }));
    }
    if (name === "resumeOption" && value === "upload") {
      setFormData((prev) => ({ ...prev, resume: "" }));
    }

    if (name === "coverLetterOption" && value === "none") {
      setFormData((prev) => ({ ...prev, coverLetter: null }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleClosePDF = () => {
    setPreviewResume(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <AlertCircle className="me-2" />
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Basic Info */}
      <div className="row g-4">
        <div className="col-md-6">
          <label
            htmlFor="firstName"
            className="form-label text-primary fw-semibold"
          >
            <User className="me-1" size={16} />
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.firstName && (
            <div className="text-danger mt-1 d-flex align-items-center">
              <AlertCircle className="me-1" size={16} />
              {errors.firstName}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <label
            htmlFor="lastName"
            className="form-label text-primary fw-semibold"
          >
            <UserPlus className="me-1" size={16} />
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.lastName && (
            <div className="text-danger mt-1 d-flex align-items-center">
              <AlertCircle className="me-1" size={16} />
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      {/* Email + Phone */}
      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <label className="form-label text-primary fw-semibold">
            <Mail className="me-1" size={16} />
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-primary fw-semibold">
            <Phone className="me-1" size={16} />
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            className="form-control"
            readOnly
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-primary fw-semibold">
            <LocateIcon className="me-1" size={16} />
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            className="form-control"
            onChange={handleChange}
            name="location"
            placeholder="location"
          />
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-4 p-4 bg-light border rounded">
        <h5 className="text-primary d-flex align-items-center mb-3">
          <FileIcon className="me-2" />
          Resume
        </h5>
        {["upload", "selected"].map((option) => (
          <div key={option} className="form-check mb-2">
            <input
              type="radio"
              name="resumeOption"
              value={option}
              checked={formData.resumeOption === option}
              onChange={handleChange}
              className="form-check-input"
              id={`resume-${option}`}
            />
            <label
              htmlFor={`resume-${option}`}
              className="form-check-label text-secondary"
            >
              {option === "selected"
                ? "Select existing resume"
                : "Upload a resume"}
            </label>
          </div>
        ))}

        {/* Upload View */}
        {formData.resumeOption === "upload" && (
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "resume")}
            />
            {formData.resume && typeof formData.resume === "object" && (
              <div className="mt-2 text-success">{formData.resume.name}</div>
            )}
          </div>
        )}

        {/* Select Existing Resume */}
        {formData.resumeOption === "selected" && (
          <div className="mt-3">
            {resumeList.length > 0 ? (
              <>
                {resumeList.slice(0, 5).map((resume, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between border p-2 rounded mb-2 bg-white"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="radio"
                        name="selectedResume"
                        value={resume.file_path}
                        checked={formData.resume === resume.file_path}
                        onChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            resume: resume.file_path,
                          }))
                        }
                      />
                      <span>
                        {resume.file_path.split("/").pop() ||
                          `Resume ${index + 1}`}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        setPreviewResume(
                          `https://apiwl.novajobs.us${resume.file_path}`
                        )
                      }
                    >
                      View
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-danger mt-2">
                No resumes found. Please upload one.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cover Letter Section */}
      <div className="mt-4 p-4 bg-light border rounded">
        <h5 className="text-primary d-flex align-items-center mb-3">
          <FileText className="me-2" />
          Cover Letter
        </h5>
        {["upload", "none"].map((option) => (
          <div key={option} className="form-check mb-2">
            <input
              type="radio"
              name="coverLetterOption"
              value={option}
              checked={formData.coverLetterOption === option}
              onChange={handleChange}
              className="form-check-input"
              id={`cover-${option}`}
            />
            <label
              htmlFor={`cover-${option}`}
              className="form-check-label text-secondary"
            >
              {option === "none"
                ? "Don't include a cover letter"
                : "Upload a cover letter"}
            </label>
          </div>
        ))}
        {formData.coverLetterOption === "upload" && (
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "coverLetter")}
            />
            {formData.coverLetter && (
              <div className="mt-2 text-success">
                {formData.coverLetter.name}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      {previewResume && (
        <PDFPopupViewer
          show={previewResume !== null}
          onClose={handleClosePDF}
          fileUrl={previewResume}
        />
      )}
    </div>
  );
};

export default PersonalInfoForm;

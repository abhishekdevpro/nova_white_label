import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddApplicantModal = ({ isOpen, onClose, job, token ,fetchJobs}) => {
  const [useExisting, setUseExisting] = useState(true);
  const [jobSeekers, setJobSeekers] = useState([]);

  const [formData, setFormData] = useState({
    job_seeker_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    resume_path: null,
    cover_letter_path: null,
  });

  useEffect(() => {
    if (isOpen && useExisting) {
      fetchJobSeekers();
    }
  }, [isOpen, useExisting]);

  const fetchJobSeekers = async () => {
    try {
      const res = await axios.get(
        "https://apiwl.novajobs.us/api/admin/job-seekers",
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log(res);
      setJobSeekers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching job seekers:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("job_id", job.id);

    if (useExisting) {
      payload.append("job_seeker_id", formData.job_seeker_id);
    } else {
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);

      if (formData.resume_path) {
        payload.append("resume_upload", formData.resume_path);
      }
      if (formData.cover_letter_path) {
        payload.append("cover_letter_upload", formData.cover_letter_path);
      }
    }

    try {
      const res = await axios.post(
        "https://apiwl.novajobs.us/api/admin/add-candidate",
        payload,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(res.data.code===200 || res.data.status ===  "success"){
          toast.success(res.data.message || "Applicant added successfully!");
          fetchJobs()
        //   console.log(res, "resss");
      }
      else{
        toast.error(res.data.message || "Error while addinf candidate")
      }
      onClose();
      setFormData({
        job_seeker_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        resume_path: null,
        cover_letter_path: null,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to add applicant");
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content shadow-lg border-0 rounded-3">
          {/* Header with Job Title */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="modal-title mb-0 fw-semibold">Add Applicant</h5>
              <span className="fw" style={{ fontSize: "1rem" }}>
                For: {job?.job_title}
              </span>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4 pt-4 pb-2">
              {/* Toggle Selection */}
              <div className="mb-4 d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="useExisting"
                    checked={useExisting}
                    onChange={() => setUseExisting(true)}
                  />
                  <label className="form-check-label" htmlFor="useExisting">
                    Use Existing Job Seeker
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="addNew"
                    checked={!useExisting}
                    onChange={() => setUseExisting(false)}
                  />
                  <label className="form-check-label" htmlFor="addNew">
                    Add New Job Seeker
                  </label>
                </div>
              </div>

              {/* Existing Job Seeker Dropdown */}
              {useExisting ? (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Select Job Seeker
                  </label>
                  <select
                    className="form-select"
                    name="job_seeker_id"
                    value={formData.job_seeker_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Job Seeker --</option>
                    {jobSeekers.map((js) => (
                      <option
                        key={js.jobskkers_detail.id}
                        value={js.jobskkers_detail.id}
                      >
                        {js.jobskkers_detail?.first_name &&
                        js.jobskkers_detail?.last_name
                          ? `${js.jobskkers_detail.first_name} ${js.jobskkers_detail.last_name}`
                          : js.jobskkers_detail?.email}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Resume</label>
                    <input
                      type="file"
                      name="resume_path"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Cover Letter
                    </label>
                    <input
                      type="file"
                      name="cover_letter_path"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer px-4 pb-4">
              <button type="submit" className="btn btn-primary px-4">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApplicantModal;

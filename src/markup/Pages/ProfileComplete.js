import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileComplete = () => {
  const [jobProfileValues, setJobProfileValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginCount, setLoginCount] = useState(0);

  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/user-profile",
          {
            headers: { Authorization: `${token}` },
          }
        );

        const {
          first_name,
          last_name,
          email,
          phone,
          rb_job_seeker_resumes,
          login_count,
          // cities,
          // states,
          // countries,
        } = response.data.data;

        setJobProfileValues((prev) => ({
          ...prev,
          first_name: first_name || "",
          last_name: last_name || "",
          email: email || "",
          phone: phone || "",
          // city: cities?.name || "",
          // state: states?.name || "",
          // country: countries?.name || "",
          uploadedResume: rb_job_seeker_resumes?.file_path || null, // ✅ store existing resume
        }));
      } catch (error) {
        toast.error("Failed to load profile info");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const validate = () => {
    const temp = {};
    if (!jobProfileValues.first_name.trim())
      temp.first_name = "First name is required";
    if (!jobProfileValues.last_name.trim())
      temp.last_name = "Last name is required";
    if (!jobProfileValues.email.trim()) temp.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jobProfileValues.email))
      temp.email = "Invalid email address";
    if (!jobProfileValues.phone.trim()) temp.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(jobProfileValues.phone))
      temp.phone = "Enter valid 10-digit phone number";

    if (
      loginCount > 1 && // ← Only validate resume if loginCount > 1
      !jobProfileValues.resume &&
      !jobProfileValues.uploadedResume
    ) {
      temp.resume = "Resume is required";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setJobProfileValues({ ...jobProfileValues, resume: files[0] });
    } else {
      setJobProfileValues({ ...jobProfileValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Step 1: Upload resume only if a new file is selected
      if (jobProfileValues.resume) {
        const resumeForm = new FormData();
        resumeForm.append("files", jobProfileValues.resume);

        const Resumeresponse = await axios.post(
          "https://apiwl.novajobs.us/api/user/resume-upload",
          resumeForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );

        if (
          Resumeresponse.data.status !== "success" &&
          Resumeresponse.data.code !== 200
        ) {
          throw new Error("Resume upload failed");
        }
      }

      // Step 2: Update profile (always)
      const profileForm = new FormData();
      profileForm.append("first_name", jobProfileValues.first_name);
      profileForm.append("last_name", jobProfileValues.last_name);
      profileForm.append("email", jobProfileValues.email);
      profileForm.append("phone", jobProfileValues.phone);

      const response = await axios.put(
        "https://apiwl.novajobs.us/api/jobseeker/user-profile",
        profileForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "Profile updated successfully!");
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.response?.data?.message ||
          "Error while submitting. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f7f7f7" }}
    >
      <div className="container" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="job-bx job-profile bg-white p-4 rounded shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="font-weight-700 text-uppercase">
              Complete Your Profile
            </h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* First Name */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    onChange={handleChange}
                    value={jobProfileValues.first_name}
                    maxLength={20}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-danger">{errors.first_name}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    onChange={handleChange}
                    value={jobProfileValues.last_name}
                    maxLength={20}
                  />
                </div>
                {errors.last_name && (
                  <p className="text-danger">{errors.last_name}</p>
                )}
              </div>

              {/* Email */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={jobProfileValues.email}
                    readOnly
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    value={jobProfileValues.phone}
                    maxLength={10}
                  />
                </div>
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
              </div>

              {/* Resume Upload */}
              {/* <div className="col-12">
                <div className="form-group">
                  <label htmlFor="resume">Resume (PDF):</label>
                  <input
                    type="file"
                    className="form-control"
                    name="resume"
                    id="resume"
                    onChange={handleChange}
                    accept=".pdf"
                  />
                </div>
                {errors.resume && (
                  <p className="text-danger">{errors.resume}</p>
                )}
              </div> */}
              {/* Resume Upload */}
              <div className="col-12">
                {loginCount <= 1 && (
                  <p className="text-info">
                    Resume is optional for first-time login. You can upload it
                    later.
                  </p>
                )}

                <div className="form-group">
                  <label htmlFor="resume">Resume (PDF):</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    name="resume"
                    id="resume"
                    onChange={(e) =>
                      setJobProfileValues({
                        ...jobProfileValues,
                        resume: e.target.files[0], // ← SET THE FILE!
                      })
                    }
                    // accept=".pdf"
                  />
                  {/* Show existing uploaded file name */}
                  {jobProfileValues.uploadedResume && (
                    <p className="mt-2 text-muted">
                      Uploaded:{" "}
                      <a
                        href={`https://apiwl.novajobs.us${jobProfileValues.uploadedResume}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {jobProfileValues.uploadedResume.split("/").pop()}
                      </a>
                    </p>
                  )}
                </div>
                {errors.resume && (
                  <p className="text-danger">{errors.resume}</p>
                )}
              </div>

              {/* Submit */}
              <div className="col-12">
                <button
                  type="submit"
                  className="site-button w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Profile"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;

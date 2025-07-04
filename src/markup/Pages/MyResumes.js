import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import Profilesidebar from "../Element/Profilesidebar";
import { use } from "react";
import { Edit, Trash2 } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [isResumeList, setIsResumeList] = useState(false);
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState(""); // To determine which modal to show
  const [modalContent, setModalContent] = useState(""); // For score or suggestions
  const [modalResumeName, setModalResumeName] = useState(""); // For modal header
  const [modalSuggestions, setModalSuggestions] = useState([]); // AI Suggestions
  const [deleteresumeid, setDeleteresumeid] = useState(null);
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [newResumeName, setNewResumeName] = useState("");
  const [isDefault, setIsDefault] = useState(false); // New state for is_default
  const token = localStorage.getItem("jobSeekerLoginToken");
  const fetchResumeList = () => {
    setIsResumeList(true);
    if (token) {
      axios
        .get("https://apiwl.novajobs.us/api/user/resume-list", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const resumes = response.data.data || [];
          if (resumes.length === 0) {
            toast.info("No resumes available.");
          }
          setResumes(resumes);
          setIsResumeList(false);
        })
        .catch((error) => {
          console.error("Error fetching resume list:", error);
          toast.error("Failed to fetch resumes.");
          setIsResumeList(false);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  };
  useEffect(() => {
    fetchResumeList();
  }, []);

  const handleGetScore = (resume) => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .post(
          "https://apiwl.novajobs.us/api/user/file-based-ai",
          {
            keyword:
              "Rate this resume content in percentage ? and checklist of scope improvements in manner of content and informations",
            resume_data: resume.ai_resume_parse_data,
          },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          const { content_acuracy_percentage } = response.data.data;
          setScores((prevScores) => ({
            ...prevScores,
            [resume.id]: content_acuracy_percentage,
          }));
          setModalResumeName(resume.name);
          setModalContent(content_acuracy_percentage);
          setModalType("score");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching AI score:", error);
          toast.error("Failed to fetch AI score.");
          setIsLoading(false);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  };

  const handleGetSuggestions = (resume) => {
    // const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .post(
          "https://apiwl.novajobs.us/api/user/file-based-ai",
          {
            keyword:
              "Rate this resume content in percentage ? and checklist of scope improvements in manner of content and informations",
            resume_data: resume.ai_resume_parse_data,
          },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          const { improvement_suggestions } = response.data.data;
          setModalSuggestions(improvement_suggestions || []);
          setModalResumeName(resume.name);
          setModalType("ai");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching AI suggestions:", error);
          setIsLoading(false);
        });
    } else {
      console.error("Token not found in localStorage");
    }
  };
  const handleEditResumeName = async () => {
    // const token = localStorage.getItem("token");
    if (token && editingResumeId) {
      try {
        const response = await axios.put(
          `https://apiwl.novajobs.us/api/user/resume-details/${editingResumeId}`,
          { resume_title: newResumeName, is_default: isDefault ? 1 : 0 }, // Pass is_default as 1 or 0 ,

          {
            headers: { Authorization: token },
          }
        );
        // console.log(response.data, "response from edit resume name");
        if (response.data.status === "success" || response.data.code === 200) {
          toast.success(
            response.message || "Resume name updated successfully!"
          );
          fetchResumeList();
        }

        // Update the local state
        setResumes((prevResumes) =>
          prevResumes.map((resume) =>
            resume.id === editingResumeId
              ? { ...resume, resue_name: newResumeName, is_default: isDefault }
              : resume
          )
        );
        setIsDefault(false);
        setEditingResumeId(null);
        setNewResumeName("");
      } catch (error) {
        console.error("Error updating resume name:", error);
        toast.error("Failed to update resume name.");
      }
    }
  };

  const handleDeleteResume = async () => {
    // const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete(
          `https://apiwl.novajobs.us/api/user/resume-list/${deleteresumeid}`,
          {
            headers: { Authorization: token },
          }
        );
        toast.success("Your Resume Deleted Successfully");
        fetchResumeList();
        setResumes((prevResumes) =>
          prevResumes.filter((resume) => resume.id !== deleteresumeid)
        );

        setModalType(""); // Close modal
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to Delete your Resume");
      }
    } else {
      console.error("Token not found in localStorage");
    }
  };

  console.log(resumes, "Resumes list");

  return (
    <>
      <Header2 />
      <FixedHeader />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"resume-list"} />
                <div className="col-xl-9  m-b30 browse-job">
                  <h6>Resumes List</h6>
                  <div className="overflow-x-auto post-bx">
                    {/* {console.log(resumes.length,"?????")} */}
                    {isResumeList && (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "200px" }}
                      >
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                    {resumes && resumes.length !== 0 ? (
                      <table className="min-w-full bg-white text-black rounded-md">
                        <thead>
                          <tr>
                            <th className="py-2 px-4">Sr. no.</th>
                            {/* <th className="py-2 px-4">Edit Resume Name</th> */}
                            <th className="py-2 px-4">Resume Name</th>

                            <th className="py-2 px-4">Created</th>
                            <th className="py-2 px-4">AI-Score</th>
                            <th className="py-2 px-4">Improve with AI</th>
                            <th className="py-2 px-4">Actions</th>

                            {/* <th className="py-2 px-4">JD Match %</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {resumes?.map((resume, index) => (
                            <tr key={index} className="border-2">
                              <td className="py-2 px-4">{index + 1}</td>

                              <td className="py-2 px-4">
                                {resume.resume_title ||
                                  `${resume.job_seeker_first_name}-resume${
                                    index + 1
                                  }`}
                              </td>

                              <td className="py-2 px-4">
                                {new Date(
                                  resume.created_at
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-2 px-4">
                                <button
                                  className="site-button btn-primary"
                                  onClick={() => {
                                    handleGetScore(resume);
                                    setModalType("score");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalPopup"
                                >
                                  {scores[resume.resume_id] || "View Score"}
                                </button>
                              </td>
                              <td className="py-2 px-4">
                                <button
                                  className="site-button btn-secondary bg-#1c2957"
                                  onClick={() => {
                                    handleGetSuggestions(resume);
                                    setModalType("ai");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalPopup"
                                >
                                  Improve with AI
                                </button>
                              </td>

                              <td className="d-flex gap-3 justify-content-center align-items-center py-2">
                                <p
                                  className="text-primary fw-bold mb-0 px-2 py-1 rounded"
                                  onClick={() => {
                                    setEditingResumeId(resume.resume_id);
                                    setNewResumeName(resume.resume_title || "");
                                    setIsDefault(resume.is_default === 1);
                                    setModalType("edit");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalPopup"
                                  style={{
                                    cursor: "pointer",
                                    transition: "0.3s",
                                  }}
                                >
                                  <Edit />
                                </p>

                                <i
                                  className="fa fa-trash-alt text-danger px-2 py-1 rounded "
                                  onClick={() => {
                                    setDeleteresumeid(resume.resume_id);
                                    setModalType("delete");
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalPopup"
                                  style={{
                                    cursor: "pointer",
                                    transition: "0.3s",
                                  }}
                                >
                                  <Trash2 />
                                </i>
                              </td>

                              {/* <td className="py-2 px-4">Coming Soon</td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p
                        style={{
                          padding: "12px 20px",
                          backgroundColor: "#f8d7da",
                          color: "#721c24",
                          border: "1px solid #f5c6cb",
                          borderRadius: "4px",
                          fontWeight: "600",
                          maxWidth: "100%",
                          margin: "20px auto",
                          textAlign: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        No Resume Found. Please upload it.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal Popup */}

      {/* <div
        className="modal fade"
        id="modalPopup"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Loading spinner on top of modal-content 
            {isLoading && (
              <div
                className="loading-spinner-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <div className="modal-header" style={{ background: "transparent" }}>
              <h5 className="modal-title" style={{ color: "black" }}>
                {modalType === "score"
                  ? modalResumeName || "Resume Score"
                  : modalType === "ai"
                  ? modalResumeName || "AI Suggestion"
                  : modalType === "delete"
                  ? modalResumeName || "Delete"
                  : modalType === "edit"
                  ? modalResumeName || " Edit Resume Name:"
                  : "No Title"}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {modalType === "edit" ? (
                <>
                  <input
                    id="editResumeName"
                    type="text"
                    className="form-control"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                  />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="isDefault"
                      className="form-check-input"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    <label htmlFor="isDefault" className="form-check-label">
                      Set as Default
                    </label>
                  </div>
                </>
              ) : modalType === "score" ? (
                <p>Score: {modalContent || "No score available"}</p>
              ) : modalType === "ai" ? (
                modalSuggestions.length > 0 ? (
                  <ul>
                    {modalSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No suggestions available</p>
                )
              ) : modalType === "delete" ? (
                <p>Are you sure you want to delete this resume?</p>
              ) : (
                <p>No content available</p>
              )}
            </div>

            <div className="modal-footer">
              {modalType === "edit" ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleEditResumeName}
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </>
              ) : modalType === "delete" ? (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteResume}
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" data-bs-dismiss="modal">
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div
        className="modal fade"
        id="modalPopup"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            {/* Loading spinner on top of modal-content */}
            {isLoading && (
              <div
                className="position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 9999,
                  borderRadius: "0.5rem",
                }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <div className="modal-header bg-white border-0">
              <h5 className="modal-title text-dark">
                {modalType === "score"
                  ? modalResumeName || "Resume Score"
                  : modalType === "ai"
                  ? modalResumeName || "AI Suggestion"
                  : modalType === "delete"
                  ? modalResumeName || "Delete Resume"
                  : modalType === "edit"
                  ? modalResumeName || "Edit Resume Name"
                  : "No Title"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {modalType === "edit" ? (
                <>
                  <input
                    id="editResumeName"
                    type="text"
                    className="form-control mb-3"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                  />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="isDefault"
                      className="form-check-input"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                    />
                    <label htmlFor="isDefault" className="form-check-label">
                      Set as Default
                    </label>
                  </div>
                </>
              ) : modalType === "score" ? (
                <p className="text-dark fs-5">
                  Score: <strong>{modalContent || "No score available"}</strong>
                </p>
              ) : modalType === "ai" ? (
                modalSuggestions.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {modalSuggestions.map((suggestion, index) => (
                      <li key={index} className="list-group-item">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No suggestions available</p>
                )
              ) : modalType === "delete" ? (
                <p className="text-danger fw-semibold">
                  Are you sure you want to delete this resume?
                </p>
              ) : (
                <p className="text-muted">No content available</p>
              )}
            </div>

            <div className="modal-footer border-0">
              {modalType === "edit" ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleEditResumeName}
                    data-bs-dismiss="modal"
                  >
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </>
              ) : modalType === "delete" ? (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteResume}
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" data-bs-dismiss="modal">
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyResumes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../Layout/Header2";
import Footer from "../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import Profilesidebar from "../Element/Profilesidebar";
import { useSelector } from "react-redux";

const DocumentUpload = () => {
     const jobProfileValues = useSelector(
        (state) => state.jobProfileSlice.jobProfileValues
      );
  const [documentTypeId, setDocumentTypeId] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileError, setFileError] = useState("");

  const token = localStorage.getItem("jobSeekerLoginToken");
 const getReq = () => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log(response.data.data.id, "all data");
        let data = response.data.data;
       
        setDocumentTypeId(data.document_type_id);
        setDocumentFile(data.document_type);
        if (data.is_document_verified === true) {
          setUploadStatus("verified");
        }
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.response.data.message);
        toast.error(err?.response?.data?.message);
      });
  };
  useEffect(() => {
    getReq();
  }, []);
  const handleDocumentUpload = async (e) => {
    e.preventDefault();

    if (!documentTypeId || !documentFile) {
      setFileError("Please select a document type and choose a file.");
      return;
    }

    setFileError("");
    setUploadStatus("pending");

    const formData = new FormData();
    formData.append("document_type_id", documentTypeId);
    formData.append("document_type_upload", documentFile);

    try {
      const response = await axios.put(
        "https://apiwl.novajobs.us/api/jobseeker/upload-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Document uploaded successfully!");
        setUploadStatus("verified");
        setDocumentTypeId("");
        setDocumentFile(null);
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during upload.");
    } finally {
      setUploadStatus("");
    }
  };

  return (
    <>
      <Header2 />
      {/* <FixedHeader /> */}
      {/* <ToastContainer /> */}

      <div className="page-content bg-white">
        <div className="section-full bg-white py-5">
          <div className="container">
            <div className="row g-4">
              <Profilesidebar data={"upload-documents"} />

              <div className="col-xl-9 col-lg-8 mb-4">
                <div className="job-bx table-job-bx clearfix p-4 bg-light rounded shadow-sm">
                  <div className="job-bx-title clearfix mb-4">
                    <h5 className="font-weight-700 text-uppercase">
                      Upload Document
                    </h5>
                  </div>

                  <form onSubmit={handleDocumentUpload}>
                    {fileError && (
                      <div className="text-danger mb-3">{fileError}</div>
                    )}

                    <div className="row g-3 align-items-center">
                      <div className="col-md-6">
                        <label htmlFor="documents" className="form-label fw-semibold">
                          Document Type
                        </label>
                        <select
                          className="form-select"
                          id="documents"
                          value={documentTypeId}
                          onChange={(e) => setDocumentTypeId(e.target.value)}
                        >
                          <option value="">Select Document Type</option>
                          <option value="1">SSN</option>
                          <option value="2">PassBook</option>
                          <option value="3">Resume</option>
                          <option value="4">Experience Letter</option>
                          <option value="5">Cover Letter</option>
                          <option value="6">Education</option>
                          <option value="7">Certificate</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="documentFile" className="form-label fw-semibold">
                          Upload File
                        </label>
                        {documentFile ? (
                          <div
                            className="form-control bg-light text-truncate"
                            style={{ height: "38px" }}
                          >
                             {documentFile.split("/").pop()}
                          </div>
                        ) : (
                          <input
                            type="file"
                            className="form-control"
                            id="documentFile"
                            disabled={!documentTypeId}
                            onChange={(e) => setDocumentFile(e.target.files[0])}
                          />
                        )}
                      </div>

                      <div className="col-12 mt-3">
                        {uploadStatus === "verified" ? (
                          <button className="btn btn-success w-100" disabled>
                            Verified
                          </button>
                        ) : uploadStatus === "pending" ? (
                          <button className="btn btn-warning w-100" disabled>
                            Uploading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="site-button w-100"
                            disabled={!documentFile || !documentTypeId}
                          >
                            Upload
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DocumentUpload;

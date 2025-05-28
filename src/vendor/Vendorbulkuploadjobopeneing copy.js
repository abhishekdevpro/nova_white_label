import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icons you need
import { Navbar, Nav, Badge } from "react-bootstrap";
import VendorCompanySideBar from "./Vendorsidebar";
import Footer from "../markup/Layout/Footer";
import axios from "axios";
import { showToastError, showToastSuccess } from "../utils/toastify";
import csd from "./downloadjob.csv";
import { useState } from "react";
import VendorHeader from "../markup/Layout/VendorHeader";

function Vendorbulkuploadjobopeneing() {
  const [file, setFile] = useState("");
  const token = localStorage.getItem("vendorToken");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToastError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/file/job-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      showToastSuccess("File uploaded successfully", response.data);
    } catch (error) {
      showToastError("Something went wrong", error);
    }
  };

  return (
    <>
      <div className="page-content bg-white">
        <VendorHeader />

        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-12">
                  <VendorCompanySideBar active="vendorbulkuploadjobseeker" />
                </div>
                <div className="col-lg-9 col-md-12">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 text-center text-uppercase">
                        <FontAwesomeIcon
                          icon={faCloudUploadAlt}
                          className="me-2"
                        />
                        Upload Bulk Job Opening
                      </h5>
                    </div>

                    <div className="row justify-content-center g-4">
                      <div className="col-md-6 col-sm-12">
                        <div
                          className="card border w-100 p-3 rounded-5"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: "#1C2957",
                            minHeight: "250px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div className="card-body text-center">
                            <FontAwesomeIcon
                              icon={faCloudUploadAlt}
                              className="me-2 mb-3"
                              style={{ fontSize: "2rem" }}
                            />
                            <h5 className="card-title mb-4">
                              Upload Bulk Job Opening
                            </h5>
                            <form
                              onSubmit={handleSubmit}
                              className="d-flex flex-column align-items-center"
                            >
                              <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="mb-3 w-100"
                                style={{
                                  fontSize: "14px",
                                  padding: "8px",
                                  borderRadius: "4px",
                                  backgroundColor: "white",
                                  color: "#1C2957",
                                }}
                              />
                              <button
                                type="submit"
                                className="btn btn-white bg-white px-4 py-2"
                                style={{
                                  fontWeight: "500",
                                  color: "#1C2957",
                                  borderRadius: "4px",
                                }}
                              >
                                Upload
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-12">
                        <div
                          className="card border w-100 p-3 rounded-5"
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "white",
                            backgroundColor: "#1C2957",
                            minHeight: "250px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div className="card-body text-center">
                            <FontAwesomeIcon
                              icon={faFileDownload}
                              className="me-2 mb-3"
                              style={{ fontSize: "2rem" }}
                            />
                            <h5 className="card-title mb-4">
                              Download Our Template
                            </h5>
                            <a
                              href={csd}
                              className="btn btn-success px-4 py-2"
                              style={{
                                fontWeight: "500",
                                borderRadius: "4px",
                              }}
                              download
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Vendorbulkuploadjobopeneing;

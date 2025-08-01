import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../Layout/Header2";
import Footer from "../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import Profilesidebar from "../Element/Profilesidebar";
import { useSelector } from "react-redux";
import DocumentList from "./Components/DocumnetList";
// import UploadDocuments from "./Components/uploadDocument";

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
      toast.error(error?.response?.data?.message || "An error occurred during upload.");
    } finally {
      setUploadStatus("");
    }
  };

   const getFileName = (file) => {
    if (!file) return "";
    
    // If it's a File object (newly selected file)
    if (file instanceof File) {
      return file.name;
    }
    
    // If it's a string (URL from API)
    if (typeof file === 'string') {
      return file.split("/").pop();
    }
    
    return "";
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

              <div className="col-xl-9 col-12 mb-4">
                <DocumentList />
                
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


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import VendorCompanySideBar from "./Vendorsidebar";
import { Navbar, Nav } from 'react-bootstrap';
import Footer from "../markup/Layout/Footer";
import axios from "axios";
import { showToastError, showToastSuccess } from "../utils/toastify";
import csd from "./download - demo.csv"
import VendorHeader from "../markup/Layout/VendorHeader";
function Vendorbulkuploadjobseeker() {
  const [file, setFile] = useState("");
  const token = localStorage.getItem("vendorToken");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToastError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://apiwl.novajobs.us/api/admin/file/job-seekers', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
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
        {/* <Navbar bg="white" variant="white" className='py-3 border-bottom'>
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={require("../images/logo/NovaUS.png")}
              className="logo"
              alt="img"
            />
          </Navbar.Brand>
          <Nav className="ml-auto align-items-center">
            {/* Additional nav items can go here 
          </Nav>
        </Navbar> */}
        <VendorHeader/>

        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="vendorbulkuploadjobseeker" />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                        Upload Bulk JobSeeker
                      </h5>
                    </div>

                    <div className="d-flex justify-content-center gap-5 text-center">
                      <div className="mt-4">
                        <div className="card border w-100 p-3 rounded-5" style={{ fontSize: '1.5rem', fontWeight: '500', color: 'white', backgroundColor: '#1C2957' }}>
                          <div className="card-body">
                            <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                            <h5 className="card-title">Upload Bulk JobSeeker</h5>
                            <form onSubmit={handleSubmit} className="text-center">
                              <input type="file" accept=".csv" onChange={handleFileChange} className="text-center " style={{ fontSize: '10px'}}/>
                              <button type="submit" className="btn btn-white bg-white  mt-3">Upload</button>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="card border w-100 p-3 rounded-5" style={{ fontSize: '1.5rem', fontWeight: '500', color: 'white', backgroundColor: '#1C2957' }}>
                          <div className="card-body">
                            <FontAwesomeIcon icon={faFileDownload} className="me-2" />
                            <h5 className="card-title">Download Our Template</h5>
                            <a
                              href={csd}
                              className="btn btn-success  mt-3 "
                              style={{fontWeight: '500'}}
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

export default Vendorbulkuploadjobseeker;

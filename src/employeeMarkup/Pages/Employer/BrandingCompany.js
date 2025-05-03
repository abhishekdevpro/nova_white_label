import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../../utils/toastify";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import CompanySideBar from "../../Layout/companySideBar";

const BrandingCompany = () => {
  const token = localStorage.getItem("employeeLoginToken");
  const [brandingData, setBrandingData] = useState({
    primaryColor: "",
    secondaryColor: "",
    logo: "",
    companyName: "",
    tagline: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: ""
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setBrandingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBrandingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "https://apiwl.novajobs.us/api/employeer/branding",
        headers: {
          Authorization: token,
        },
        data: brandingData
      });
      showToastSuccess("Branding information updated successfully");
    } catch (error) {
      showToastError("Failed to update branding information");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
              <CompanySideBar active="branding" />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Company Branding</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Primary Color</label>
                          <input
                            type="color"
                            className="form-control"
                            name="primaryColor"
                            value={brandingData.primaryColor}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Secondary Color</label>
                          <input
                            type="color"
                            className="form-control"
                            name="secondaryColor"
                            value={brandingData.secondaryColor}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={brandingData.companyName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tagline</label>
                          <input
                            type="text"
                            className="form-control"
                            name="tagline"
                            value={brandingData.tagline}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Facebook URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="socialMedia.facebook"
                            value={brandingData.socialMedia.facebook}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Twitter URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="socialMedia.twitter"
                            value={brandingData.socialMedia.twitter}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>LinkedIn URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="socialMedia.linkedin"
                            value={brandingData.socialMedia.linkedin}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Instagram URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="socialMedia.instagram"
                            value={brandingData.socialMedia.instagram}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
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

export default BrandingCompany; 
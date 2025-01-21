
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar, Nav, Badge, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showToastError, showToastSuccess } from "../utils/toastify";
import { vendorcompanyFunction } from "../store/thunkFunctions/vendorcompanyFunction";
import VendorCompanySideBar from "./Vendorsidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../markup/Layout/Footer";
import VendorHeader from "../markup/Layout/VendorHeader";

function VendorCompanyprofile() {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.companyDataSlice.companyData);
  const companyDetail = companyData?.company_detail;

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStates, setSelectedStates] = useState(null);
  const [selectedCities, setSelectedCities] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedYear, setDate] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [googleBusiness, setGoogleBusiness] = useState("");
  const [glassdoor, setGlassdor] = useState("");
  const [industries, setIndustries] = useState([]);

  const token = localStorage.getItem("vendorToken");

  useEffect(() => {
    // Fetch industries from API
    axios.get("https://apiwl.novajobs.us/api/admin/company-industry", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setIndustries(res.data.data);
    })
    .catch((err) => {
      showToastError(err?.response?.data?.message);
    });
  }, [token]);

  useEffect(() => {
    dispatch(vendorcompanyFunction());
  }, [dispatch]);

  useEffect(() => {
    setCompanyName(companyDetail?.company_name || "");
    setTagline(companyDetail?.tagline || "");
    setEmail(companyDetail?.email || "");
    setWebsite(companyDetail?.website_link || "");
    setDate(companyDetail?.founded_date || "");
    setDescription(companyDetail?.about || "");
    setSelectedCountry(companyDetail?.country?.id || null);
    setSelectedStates(companyDetail?.state?.id || null);
    setSelectedCities(companyDetail?.city?.id || null);
    setNumber(companyDetail?.phone || "");
    setAddress(companyDetail?.address || "");
    setlinkdin(companyDetail?.linkedin_link || "");
    setTwitter(companyDetail?.twitter_link || "");
    setGoogleBusiness(companyDetail?.google_link || "");
    setGlassdor(companyDetail?.facebook_link || "");
    setIndustry(companyDetail?.company_industry?.id || "");
  }, [companyData]);

  const getCountry = async () => {
    axios.get("https://apiwl.novajobs.us/api/admin/countries", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setCountries(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const getState = async () => {
    if (selectedCountry) {
      axios.get(`https://apiwl.novajobs.us/api/admin/stats/${selectedCountry}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setStates(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const getCities = async () => {
    if (selectedStates) {
      axios.get(`https://apiwl.novajobs.us/api/admin/cities/${selectedStates}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    getState();
  }, [selectedCountry]);

  useEffect(() => {
    getCities();
  }, [selectedStates]);

  const updateCompanyData = async (e) => {
    e.preventDefault();

    if (!companyName || !industry || !selectedCountry || !selectedStates || !selectedCities) {
      showToastError("Please fill out all required fields.");
      return;
    }
    const payload = {
      company_name: companyName,
      about: description,
      email: email,
      tagline: tagline,
      
      website_link: website,
      founded_date: foundedYear,
      phone: number,
      country_id: Number(selectedCountry),
      state_id: Number(selectedStates),
      city_id: Number(selectedCities),
      address: address,
      facebook_link: glassdoor,
      twitter_link: twitter,
      google_link: googleBusiness,
      linkedin_link: linkdin,
      company_industry_id: Number(industry),
    };

    console.log("Payload:", payload); // Log the payload for debugging
    console.log("URL:", "https://apiwl.novajobs.us/api/admin/company"); // Log the URL for debugging

    axios.put("https://apiwl.novajobs.us/api/admin/company", payload, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      showToastSuccess("Company data updated successfully.");
    })
    .catch((error) => {
      console.error("Error:", error.response); // Log the error response for debugging
      showToastError("Failed to update company data.");
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('vendorToken');
    window.location.href = "/vendor/login";
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
            <Button onClick={handleLogout} style={{backgroundColor:'#1C2957'}} className='text-white px-4'>
              Logout
            </Button>
          </Nav>
        </Navbar> */}
        <VendorHeader/>
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <VendorCompanySideBar active="company" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                    </div>
                    <form onSubmit={updateCompanyData}>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                              type="text"
                              id="companyName"
                              name="companyName"
                              className="form-control"
                              placeholder="Enter Company Name"
                              onChange={(e) => setCompanyName(e.target.value)}
                              value={companyName}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Tagline</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Company Tagline"
                              onChange={(e) => setTagline(e.target.value)}
                              value={tagline}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email ID</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Website Link"
                              onChange={(e) => setWebsite(e.target.value)}
                              value={website}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Founded Year</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setDate(e.target.value)}
                              value={foundedYear}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry</label>
                            <select
                              className="form-control"
                              onChange={(e) => setIndustry(e.target.value)}
                              value={industry}
                              required
                            >
                              <option value="">Select Industry</option>
                              {industries.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Description"
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Number"
                              onChange={(e) => setNumber(e.target.value)}
                              value={number}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <select
                              className="form-control"
                              onChange={(e) => setSelectedCountry(e.target.value)}
                              value={selectedCountry || ""}
                              required
                            >
                              <option value="">Select Country</option>
                              {countries.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>State</label>
                            <select
                              className="form-control"
                              onChange={(e) => setSelectedStates(e.target.value)}
                              value={selectedStates || ""}
                              required
                            >
                              <option value="">Select State</option>
                              {states.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <select
                              className="form-control"
                              onChange={(e) => setSelectedCities(e.target.value)}
                              value={selectedCities || ""}
                              required
                            >
                              <option value="">Select City</option>
                              {cities.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Address"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>LinkedIn</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="LinkedIn Link"
                              onChange={(e) => setlinkdin(e.target.value)}
                              value={linkdin}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Twitter Link"
                              onChange={(e) => setTwitter(e.target.value)}
                              value={twitter}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Google Business</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Google Business Link"
                              onChange={(e) => setGoogleBusiness(e.target.value)}
                              value={googleBusiness}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Glassdoor</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Glassdoor Link"
                              onChange={(e) => setGlassdor(e.target.value)}
                              value={glassdoor}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">Save</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default VendorCompanyprofile;

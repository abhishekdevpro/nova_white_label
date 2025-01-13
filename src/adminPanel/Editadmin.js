import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";


import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";


function Editadmin() {
  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  let companyDetail = companyData?.company_detail;

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
  const [industry, setIndustry] = useState(""); // State variable to hold selected industry ID
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [googleBusiness, setGoogleBusiness] = useState("");
  const [glassdoor, setGlassdor] = useState("");

  const [industries, setIndustries] = useState([]);

  const token = localStorage.getItem("employeeLoginToken");

  useEffect(() => {
    // Fetch industries from API
    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/employeer/company-industry",
      headers: {
        Authorization: token, // Assuming you have token stored
      },
    })
      .then((res) => {
        setIndustries(res.data.data); // Set fetched industries to state
      })
      .catch((err) => {
        console.log(err);
        console.log(err?.response?.data?.message);
      });
  }, [token]); // Added token as dependency to ensure useEffect runs on token change

  // Function to update company data
  const updateCompanyData = async () => {
    // Ensure required fields are filled
    if (!companyName || !email || !industry || !selectedCountry || !selectedStates || !selectedCities) {
        console.log("Please fill out all required fields.");
      return;
    }

    axios({
      method: "put",
      url: `https://api.novajobs.us/api/employeer/company`,
      headers: {
        Authorization: token,
      },
      data: {
        company_name: companyName,
        about: description,
        email: email,
        tagline: tagline,
        user_id: 1,
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
        company_industry_id: Number(industry), // Pass selected industry ID
      },
    })
      .then((res) => {
        console.log(res, "data updated");
        console.log("Company data updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        console.log("Failed to update company data.");
      });
  };

  const dispatch = useDispatch();



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
    setIndustry(companyDetail?.company_industry?.id || ""); // Set industry ID if available
  }, [companyData]);

  const getCountry = async () => {
    axios({
      method: "get",
      url: "https://api.novajobs.us/api/employeer/countries",
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
    axios({
      method: "get",
      url: `https://api.novajobs.us/api/employeer/stats/${selectedCountry}`,
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
  };

  const getCities = async () => {
    axios({
      method: "get",
      url: `https://api.novajobs.us/api/employeer/cities/${selectedStates}`,
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
  };

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    console.log(selectedCountry);
   
    getState();
  }, [selectedCountry]);

  useEffect(() => {
    console.log(selectedStates);
    getCities();
  }, [selectedStates]);

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                      {/*<Link
                        to={"/employer/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link> */}
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        updateCompanyData();
                      }}
                    >
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
                              type="date"
                              className="form-control"
                              onChange={(e) => setDate(e.target.value)}
                              value={foundedYear}
                              aria-required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              onChange={(e) => setIndustry(e.target.value)}
                              value={industry}
                              required
                            >
                              <option value="">Select Industry</option>
                              {industries.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                  {industry.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Description</label>
                            <input
                              className="form-control"
                              placeholder="Company Description"
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                              rows="3"
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
                              placeholder="Phone Number"
                              onChange={(e) => setNumber(e.target.value)}
                              value={number}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <Form.Control
                              as="select"
                              custom
                              onChange={(e) =>
                                setSelectedCountry(e.target.value)
                              }
                              value={selectedCountry}
                              required
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>State</label>
                            <Form.Control
                              as="select"
                              custom
                              onChange={(e) =>
                                setSelectedStates(e.target.value)
                              }
                              value={selectedStates}
                              required
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state.id} value={state.id}>
                                  {state.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <Form.Control
                              as="select"
                              custom
                              onChange={(e) =>
                                setSelectedCities(e.target.value)
                              }
                              value={selectedCities}
                              required
                            >
                              <option value="">Select City</option>
                              {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                  {city.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Address"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>LinkedIn Link</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="LinkedIn Link"
                              onChange={(e) => setlinkdin(e.target.value)}
                              value={linkdin}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter Link</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Twitter Link"
                              onChange={(e) => setTwitter(e.target.value)}
                              value={twitter}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Google Business Link</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Google Business Link"
                              onChange={(e) =>
                                setGoogleBusiness(e.target.value)
                              }
                              value={googleBusiness}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Glassdoor Link</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Glassdoor Link"
                              onChange={(e) => setGlassdor(e.target.value)}
                              value={glassdoor}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="clearfix font-bold">
                            <button
                              type="submit"
                              className="site-button button-sm px-4 py-2 text-bolder"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Editadmin;



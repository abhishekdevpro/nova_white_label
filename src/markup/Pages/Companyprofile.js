
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form } from "react-bootstrap";
import axios from "axios";
import { fetchCompanyInfo } from "../../store/thunkFunctions/companyFunction";
import { useDispatch, useSelector } from "react-redux";
import CompanySideBar from "../../employeeMarkup/Layout/companySideBar";

function Companyprofile() {
  const companyData = useSelector((state) => state.companyDataSlice?.companyData) || {};
  console.log(companyData,"companyDatacompanyDatasele");
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  // Separate state for selected location values
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  
  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    email: "",
    website: "",
    foundedYear: "",
    industry: "",
    description: "",
    number: "",
    address: "",
    linkdin: "",
    twitter: "",
    googleBusiness: "",
    glassdoor: ""
  });

  const token = localStorage.getItem("employeeLoginToken");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getCountry = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://apiwl.novajobs.us/api/employeer/countries",
        headers: { Authorization: token }
      });
      if (response.data?.data) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getState = async (countryId) => {
    if (!countryId) return;
    
    try {
      const response = await axios({
        method: "get",
        url: `https://apiwl.novajobs.us/api/employeer/stats/${countryId}`,
        headers: { Authorization: token }
      });
      if (response.data?.data) {
        setStates(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCities = async (stateId) => {
    if (!stateId) return;
    
    try {
      const response = await axios({
        method: "get",
        url: `https://apiwl.novajobs.us/api/employeer/cities/${stateId}`,
        headers: { Authorization: token }
      });
      if (response.data?.data) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const updateCompanyData = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry || !selectedState || !selectedCity) {
      console.error("Please select country, state and city");
      return;
    }

    try {
      const response = await axios({
        method: "put",
        url: `https://apiwl.novajobs.us/api/employeer/company`,
        headers: { Authorization: token },
        data: {
          company_name: formData.companyName,
          about: formData.description,
          email: formData.email,
          tagline: formData.tagline,
          website_link: formData.website,
          founded_date: formData.foundedYear,
          phone: formData.number,
          country_id: Number(selectedCountry),
          state_id: Number(selectedState),
          city_id: Number(selectedCity),
          address: formData.address,
          facebook_link: formData.glassdoor,
          twitter_link: formData.twitter,
          google_link: formData.googleBusiness,
          linkedin_link: formData.linkdin,
        }
      });
      console.log("Update successful:", response);
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  useEffect(() => {
    getCountry();
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    if (companyData) {
      setFormData({
        companyName: companyData.company_name || "",
        tagline: companyData.tagline || "",
        email: companyData.email || "",
        website: companyData.website_link?.id || "",
        foundedYear: companyData.founded_date || "",
        description: companyData.about || "",
        number: companyData.phone || "",
        address: companyData.address || "",
        linkdin: companyData.linkedin_link || "",
        twitter: companyData.twitter_link || "",
        googleBusiness: companyData.google_link || "",
        glassdoor: companyData.facebook_link || ""
      });

      if (companyData.country_id) {
        setSelectedCountry(companyData.country_id);
        getState(companyData.country_id);
      }
      if (companyData.state_id) {
        setSelectedState(companyData.state_id);
        getCities(companyData.state_id);
      }
      if (companyData.city_id) {
        setSelectedCity(companyData.city_id);
      }
    }
  }, [companyData]);

  useEffect(() => {
    if (selectedCountry) {
      getState(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      getCities(selectedState);
    }
  }, [selectedState]);

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <CompanySideBar />
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                      <Link
                        to={"/company-profile"}
                        className="site-button right-arrow button-sm float-right">
                        Back
                      </Link>
                    </div>
                    <form onSubmit={updateCompanyData}>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              name="companyName"
                              className="form-control"
                              placeholder="Enter Company Name"
                              onChange={handleInputChange}
                              value={formData.companyName}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Tagline</label>
                            <input
                              type="text"
                              name="tagline"
                              className="form-control"
                              placeholder="Enter Company Tagline"
                              onChange={handleInputChange}
                              value={formData.tagline}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email ID</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                              onChange={handleInputChange}
                              value={formData.email}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              name="website"
                              className="form-control"
                              placeholder="Website Link"
                              onChange={handleInputChange}
                              value={formData.website}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Founded Year</label>
                            <input
                              type="text"
                              name="foundedYear"
                              className="form-control"
                              placeholder="17/12/2018"
                              onChange={handleInputChange}
                              value={formData.foundedYear}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry</label>
                            <Form.Control
                              as="select"
                              name="industry"
                              custom
                              className="custom-select"
                              onChange={handleInputChange}
                              value={formData.industry}>
                              <option value="">Select Industry</option>
                              <option value="Web Designer">Web Designer</option>
                              <option value="Web Developer">Web Developer</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              name="description"
                              className="form-control"
                              onChange={handleInputChange}
                              value={formData.description}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Contact Information
                        </h5>
                      </div>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              name="number"
                              className="form-control"
                              placeholder="+1 123 456 7890"
                              onChange={handleInputChange}
                              value={formData.number}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <select
                              className="form-control"
                              value={selectedCountry || ""}
                              onChange={handleCountryChange}>
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
                              value={selectedState || ""}
                              onChange={handleStateChange}
                              disabled={!selectedCountry}>
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
                              value={selectedCity ||""}
                              onChange={handleCityChange}
                              disabled={!selectedState}>
                              <option value="">Select City</option>
                              {cities.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              placeholder="Enter Address"
                              onChange={handleInputChange}
                              value={formData.address}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Social Links
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>LinkedIn</label>
                            <input
                              type="text"
                              name="linkdin"
                              className="form-control"
                              placeholder="https://www.linkedin.com/"
                              onChange={handleInputChange}
                              value={formData.linkdin}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              name="twitter"
                              className="form-control"
                              placeholder="https://www.twitter.com/"
                              onChange={handleInputChange}
                              value={formData.twitter}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Google Business</label>
                            <input
                              type="text"
                              name="googleBusiness"
                              className="form-control"
                              placeholder="https://www.google.com/"
                              onChange={handleInputChange}
                              value={formData.googleBusiness}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Glassdoor</label>
                            <input
                              type="text"
                              name="glassdoor"
                              className="form-control"
                              placeholder="https://www.glassdoor.com/"
                              onChange={handleInputChange}
                              value={formData.glassdoor}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Save Changes
                      </button>
                    </form>
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

export default Companyprofile;
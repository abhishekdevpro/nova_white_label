import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form } from "react-bootstrap";
// import GoogleMaps from "simple-react-google-maps";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { fetchCompanyInfo } from "../../store/thunkFunctions/companyFunction";
import { useDispatch, useSelector } from "react-redux";
import { get } from "react-scroll/modules/mixins/scroller";
import { useState } from "react";

function Companyprofile() {
  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  console.log(companyData, "hey cd");
  const [countries, setCountries] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [states, setStates] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [cities, setCities] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStates, setSelectedState] = useState(null);
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
  const token = localStorage.getItem("employeeLoginToken");
 

  const getCountry = async () => {
    axios({
      method: "get",
      url: "https://apiwl.novajobs.us/api/employeer/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setCountries(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getState = async () => {
    axios({
      method: "get",
      url: `https://apiwl.novajobs.us/api/employeer/stats/${selectedCountry}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setStates(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const getCities = async () => {
    axios({
      method: "get",
      url: `https://apiwl.novajobs.us/api/employeer/cities/${selectedStates}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        // console.log(selectedStates);
        setCities(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCompanyData = async (e) => {
    axios({
      method: "put",
      url: `https://apiwl.novajobs.us/api/employeer/company`,
      headers: {
        Authorization: token,
      },
      data: {
        company_name: companyName,
        // summery: "summery",
        about: description,
        // company_size_id: 1,
        email: email,
        // company_type_id: 1,
        tagline: tagline,
        user_id: 1,
        website_link: website,
        founded_date: foundedYear,
        phone: number,
        country_id: Number(selectedCountry),
        state_id: Number(selectedStates),
        city_id: Number(selectedCities),
        // zip_code: "434",
        address: address,
        facebook_link: glassdoor,
        twitter_link: twitter,
        google_link: googleBusiness,
        linkedin_link: linkdin,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    getCountry();
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setCompanyName(companyData.company_name);
    setTagline(companyData.tagline);
    setEmail(companyData.email);
    setWebsite(companyData.website_link.id);
    setDate(companyData.founded_date);
    setDescription(companyData.about);

    // setIndustry(companyData.country.id)
    setNumber(companyData.phone);
    setAddress(companyData.address);
    setlinkdin(companyData.linkedin_link);
    setTwitter(companyData.twitter_link);
    setGoogleBusiness(companyData.google_link);
    setGlassdor(companyData.facebook_link);
  }, [companyData]);
  useEffect(() => {
    setSelectedState("");
    getState();
  }, [selectedCountry]);

  useEffect(() => {
    // console.log(selectedStates);
    setSelectedCities("");
    getCities();
  }, [selectedStates]);
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
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <Link to={"#"}>
                            <img
                              alt=""
                              src={require("./../../images/logo/icon3.jpg")}
                            />
                          </Link>
                          <div
                            className="upload-link"
                            title="update"
                            data-toggle="tooltip"
                            data-placement="right">
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={"#"}>@COMPANY</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/company-profile"} className="active">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Company Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-post-jobs"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"></i>
                            <span>Post A Job</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-transactions"}>
                            <i className="fa fa-random" aria-hidden="true"></i>
                            <span>Transactions</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-manage-job"}>
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"></i>
                            <span>Manage jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"></i>
                            <span>Resume</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/jobs-change-password"}>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"./"}>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                    <form>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Company Name"
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                              }}
                              value={companyName}
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
                              onChange={(e) => {
                                setTagline(e.target.value);
                              }}
                              value={tagline}
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
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              value={email}
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
                              onChange={(e) => {
                                setWebsite(e.target.value);
                              }}
                              value={website}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Founded Year </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="17/12/2018"
                              onChange={(e) => {
                                setDate(e.target.value);
                              }}
                              value={foundedYear}
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
                              onChange={(e) => {
                                setIndustry(e.target.value);
                              }}
                              value={industry}>
                              <option>Web Designer</option>
                              <option>Web Developer1</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              className="form-control"
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                              value={description}></textarea>
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
                              className="form-control"
                              placeholder="+1 123 456 7890"
                              onChange={(e) => {
                                setNumber(e.target.value);
                              }}
                              value={number}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <select
                              className="form-control"
                              value={selectedCountry}
                              onChange={(e) =>
                                setSelectedCountry(e.target.value)
                              }>
                              <option value=""></option>
                              {countries.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>State</label>
                            <select
                              className="form-control"
                              value={selectedStates}
                              onChange={(e) =>
                                setSelectedState(e.target.value)
                              }>
                              <option value=""></option>
                              {states.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <select
                              className="form-control"
                              value={selectedCities}
                              onChange={(e) => {
                                setSelectedCities(e.target.value);
                              }}>
                              <option value=""></option>

                              {cities.map((item) => (
                                <option value={item.id}>{item.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Contry</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="India"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Delhi"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Zip</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="504030"
                            />
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="New york city"
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              value={address}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          {/* <GoogleMaps
                            apiKey={"AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw"}
                            style={{
                              height: "300px",
                              width: "100%",
                              border: "0",
                            }}
                            zoom={6}
                            center={{ lat: 37.4224764, lng: -122.0842499 }}
                            markers={{ lat: 37.4224764, lng: -122.0842499 }} //optional
                          /> */}
                        </div>
                      </div>

                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Social link
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Connect Linkedin</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="https://www.facebook.com/"
                              onChange={(e) => {
                                setlinkdin(e.target.value);
                              }}
                              value={linkdin}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="https://www.twitter.com/"
                              onChange={(e) => {
                                setTwitter(e.target.value);
                              }}
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
                              placeholder="https://www.google.com/"
                              onChange={(e) => {
                                setGoogleBusiness(e.target.value);
                              }}
                              value={googleBusiness}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Glassdoor</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="https://www.linkedin.com/"
                              onChange={(e) => {
                                setGlassdor(e.target.value);
                              }}
                              value={glassdoor}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="site-button m-b30"
                        onClick={(e) => {
                          e.preventDefault();

                          updateCompanyData();
                        }}>
                        Update Setting
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

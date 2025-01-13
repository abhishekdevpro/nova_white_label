import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form } from "react-bootstrap";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { fetchCompanyInfo } from "../../store/thunkFunctions/companyFunction";
import { useDispatch, useSelector } from "react-redux";
import CompanySideBar from "../Layout/companySideBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from "../Element/Editor";
import ReactQuill from "react-quill";

function EmployeeCompanyprofile() {
  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  let companyDetail = companyData?.company_detail;
  let employeerDetail = companyData?.employeer_detail;

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
  const [foundedYear, setFoundedYear] = useState("");
  const [industry, setIndustry] = useState(""); // State variable to hold selected industry ID
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [googleBusiness, setGoogleBusiness] = useState("");
  const [glassdoor, setGlassdor] = useState("");
  const [services, setServices] = useState([{ title: "", image: null }]);
  const [industries, setIndustries] = useState([]);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("employeeLoginToken");

  // const handleChange = (content, delta, source, editor) => {
  //   const plainText = editor.getText();

  //   // Extract plain text from the editor
  //   setDescription(plainText); // Set the plain text in the state
  // };
  const handleChange = (content) => {
    // Extract plain text from the editor
    setDescription(content); // Set the plain text in the state
  };
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
        showToastError(err?.response?.data?.message);
      });
  }, [token]); // Added token as dependency to ensure useEffect runs on token change

  // Function to update company data
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // Check if the input is numeric
    if (!/^\d*$/.test(value)) {
      showToastError("Phone number must contain only numeric characters.");
      return;
    }

    // Check if the input length exceeds 10 digits
    if (value.length > 10) {
      showToastError("Phone number cannot exceed 10 digits.");
      return;
    }

    // Update the state only if input is valid
    setNumber(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    setCompanyName(companyDetail?.company_name || "");
    setTagline(companyDetail?.tagline || "");
    setEmail(employeerDetail?.email || "");
    setWebsite(companyDetail?.website_link || "");
    setFoundedYear(companyDetail?.founded_date || "");
    setDescription(companyDetail?.about || "");
    setSelectedCountry(companyDetail?.country_id || null);
    setSelectedStates(companyDetail?.state_id || null);
    setSelectedCities(companyDetail?.city_id || null);
    setNumber(employeerDetail?.phone || "");
    setAddress(companyDetail?.address || "");
    setlinkdin(companyDetail?.linkedin_link || "");
    setTwitter(companyDetail?.twitter_link || "");
    setGoogleBusiness(companyDetail?.google_link || "");
    setGlassdor(companyDetail?.facebook_link || "");
    setIndustry(companyDetail?.company_industry?.id || "");
    const companyServices = companyDetail?.company_services;

    // Check if companyServices is a valid JSON string
    if (
      companyServices &&
      typeof companyServices === "string" &&
      companyServices.trim() !== ""
    ) {
      try {
        const parsedServices = JSON.parse(companyServices);
        const formattedServices = parsedServices.map((service) => ({
          title: service.service_name,
          image: service.service_photo,
        }));
        setServices(formattedServices);
      } catch (error) {
        console.error("Failed to parse company services:", error);
        // Optionally set services to an empty array or handle the error as needed
        setServices([]);
      }
    } else {
      // If companyServices is not valid, set services to an empty array
      setServices([]);
    }
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

  // ... (previous useEffect hooks and functions)

  const addService = () => {
    setServices([...services, { title: "", image: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, [field]: value };
      }
      return service;
    });
    setServices(updatedServices);
  };

  const handleImageChange = (index, e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);

    const updatedServices = services.map((service, i) => {
      if (i === index) {
        return { ...service, image: img, url: url }; // Store the file and its URL
      }
      return service;
    });
    setServices(updatedServices);
  };

  const updateCompanyData = async () => {
    if (
      !companyName ||
      !email ||
      !industry ||
      !selectedCountry ||
      !selectedStates ||
      !selectedCities
    ) {
      showToastError("Please fill out all required fields.");
      return;
    }

    try {
      const servicesName = services.map((service) => service.title);
      const formData = new FormData();
      const serviceFiles = []; // Array to hold service images
      const serviceNames = []; // Array to hold service names

      // Function to convert a URL or string to a Blob/File
      const convertImageToBinary = async (image) => {
        if (typeof image === "string") {
          // If the image is a URL, fetch it as a Blob
          const response = await fetch(image);
          const blob = await response.blob();
          return new File([blob], "image.png"); // You can adjust the file name and type if necessary
        }
        return image; // If it's already a File or Blob, return as is
      };

      // Process each service to prepare the data
      for (const service of services) {
        serviceNames.push(service.title); // Collect service titles
        if (service.image) {
          const binaryImage = await convertImageToBinary(service.image); // Convert image to binary if needed
          serviceFiles.push(binaryImage); // Collect service images
        }
      }

      // Append each service image and its corresponding name to formData
      for (let i = 0; i < serviceFiles.length; i++) {
        formData.append("images", serviceFiles[i]);
        formData.append("services_name", serviceNames[i] || `file-${i}`); // Use a default name if none provided
      }

      // First request to update company data
      await axios({
        method: "put",
        url: `https://api.novajobs.us/api/employeer/company`,
        headers: {
          Authorization: token,
        },
        data: {
          company_name: companyName,
          about: description.trim(),
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
        },
      });

      showToastSuccess("Company data updated successfully.");

      // Second request to update company services
      await axios({
        method: "put",
        url: `https://api.novajobs.us/api/employeer/company-services`,
        headers: {
          Authorization: token,
          // No need to set 'Content-Type' when sending FormData; the browser sets it automatically
        },
        data: formData, // This is the FormData containing images and names
      });

      showToastSuccess("Services updated successfully.");
    } catch (error) {
      console.error("Error updating company data or services:", error);
      showToastError("Failed to update company data or services.");
    }
  };

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <CompanySideBar active="company" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Profile
                      </h5>
                      <Link
                        to={`/user/company/178`}
                        className="site-button right-arrow button-sm float-right"
                      >
                        View Company page
                      </Link>
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
                          {/* <div className="form-group">
                            <label>Email ID</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              required
                            />
                          </div> */}
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                              value={email}
                              disabled
                              style={{
                                paddingRight: "2.5rem", // Leave space for the icon
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px", // Adjust spacing from the right
                                transform: "translateY(-50%)",
                                color: "green",
                                fontSize: "1.2rem",
                                cursor: "pointer",
                              }}
                              title="Verified"
                            >
                              ✅
                            </span>
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
                              type="text" // Allows the user to select year and month
                              className="form-control"
                              onChange={(e) => setFoundedYear(e.target.value)}
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
                        <div className="col-lg-12 col-md-6">
                          <div className="form-group">
                            <label>Company Description</label>
                            {/* <input
                              className="form-control"
                              placeholder="Company Description"
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
                              rows="3"
                              required
                            /> */}
                            <ReactQuill
                              theme="snow"
                              value={description}
                              onChange={handleChange}
                              style={{
                                height: "200px",
                                width: "100%",
                                marginBottom: "70px",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Services</label>
                            {services.map((service, index) => (
                              <div key={index} className="row mb-3">
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Service Title"
                                      value={service.title}
                                      onChange={(e) =>
                                        handleServiceChange(
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                  <div className="form-group">
                                    <input
                                      type="file"
                                      className="form-control-file"
                                      onChange={(e) =>
                                        handleImageChange(index, e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-1 col-md-1">
                                  <button
                                    type="button"
                                    className="site-button button-sm red"
                                    onClick={() => removeService(index)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                                {service.image && (
                                  <div className="col-lg-12 col-md-12 mt-2">
                                    <img
                                      src={`https://api.novajobs.us${service.image}`}
                                      alt="Service"
                                      className="img-fluid"
                                      style={{ maxHeight: "100px" }}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              className="site-button button-sm"
                              onClick={addService}
                            >
                              Add Service
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone Number"
                              // onChange={(e) => setNumber(e.target.value)}
                              onChange={(e) => handlePhoneNumberChange(e)}
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
                        {/* <div className="col-lg-12 col-md-12">
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
                        </div> */}

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
      <Footer />
      <ToastContainer />
    </>
  );
}

export default EmployeeCompanyprofile;



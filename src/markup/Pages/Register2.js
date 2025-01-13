import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import {  showToastSuccess } from "../../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import processVid from "../../gif process.mp4";
import { DNA, InfinitySpin, MutatingDots } from "react-loader-spinner";
import validator from "validator";
// var bnr = require("./../../images/background/bg6.jpg");
import bnr from "../../images/login/loginbg.jpeg";
import Footer from "../Layout/Footer";
function Register2(props) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [runAiButton, setRunAiButton] = useState("Run Ai");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [showUpload, setShowUpload] = useState(true);
  const [file, setFile] = useState();
  const [jobSeekerId, setJobSeekerId] = useState("");
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [AiBtn, setAiBtn] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    jobTitle: "",
  });
  console.log(registerValues, "values");
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
    // first name
    if (
      name === "firstName" &&
      !validator.matches(value, /^(?!\d)[a-zA-Z0-9]{3,}$/)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName:
          "First Name must be at least 3 characters long and not start with a number.",
      }));
    } else if (name === "firstName") {
      const newErrors = { ...errors };
      delete newErrors.firstName;
      setErrors(newErrors);
    }
    // lastName

    if (
      name === "lastName" &&
      !validator.matches(value, /^(?!\d)[a-zA-Z0-9]{3,}$/)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName:
          "Last Name must be at least 3 characters long and not start with a number.",
      }));
    } else if (name === "lastName") {
      const newErrors = { ...errors };
      delete newErrors.lastName;
      setErrors(newErrors);
    }

    // phone number

    if (name === "phone" && !validator.matches(value, /^\d{7,10}$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone Number must be between 7 and 10 digits.",
      }));
    } else if (name === "phone") {
      const newErrors = { ...errors };
      delete newErrors.phone;
      setErrors(newErrors);
    }
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleIdChange(event) {
    setJobSeekerId(event.target.value);
  }

  function handleSubmit(event) {
    setSpinner(true);
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }

    axios
      .post("https://api.novajobs.us/api/jobseeker/resume-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => {
        setSpinner(false);
        setResumeUrl(res.data.data[0].file_path);
        setAiBtn(false);
        console.log(resumeUrl, res, res.data.data[0].file_path);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        showToastError(error?.response?.data?.message);
      });
  }

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const body = {
      first_name: registerValues.firstName,
      last_name: registerValues.lastName,
      company_name: registerValues.company,
      email: registerValues.email,
      phone: registerValues.phone,
      password: registerValues.password,
    };
  
    try {
      const res = await axios.post("https://api.novajobs.us/api/jobseeker/auth/signup", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
  
      localStorage.setItem("jobSeekerLoginToken", res.data.data);
      showToastSuccess("Please, check your email inbox to complete the registration");
  
      // Send confirmation email with verification link
      await sendConfirmationEmail(registerValues.email, res.data.token);
  
      // Reset the form fields
      setRegisterValues({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        jobTitle: "",
      });
  
      setErrors({}); // Clear any existing errors
      setShowUpload(false);
    } catch (err) {
      console.log(err);
      showToastError("User already registered with this email");
    }
  };
  

// Function to send confirmation email with verification link
const sendConfirmationEmail = async (email, token) => {
  try {
    const encodedEmail = encodeURIComponent(email); // Encode email
    const encodedToken = encodeURIComponent(token); // Encode token

    const verificationLink = `https://api.novajobs.us/api/jobseeker/verify-account/${encodedToken}?email=${encodedEmail}`;
    const emailBody = {
      to: email,
      subject: "Confirm Your Email",
      body: `Please click on the following link to confirm your email: ${verificationLink}`,
    };

    await axios.post("YOUR_BACKEND_EMAIL_SENDING_ENDPOINT", emailBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



const verifyAccount = async () => {
  try {
    const response = await axios.get(`/api/user/verify-account/${token}`);
    console.log("Account verified successfully:", response.data);
    // Handle success, maybe show a success message or redirect the user
  } catch (error) {
    console.error("Error verifying account:", error);
    // Handle error, maybe show an error message to the user
  }
};

// Call verifyAccount when component mounts
useEffect(() => {
  verifyAccount();
}, []);

  const runAi = async (e) => {
    setRunAiButton("Running Ai");
    setShowVideo(true);
    e.preventDefault();
    console.log(resumeUrl);
    await axios({
      method: "post",
      url: "https://api.novajobs.us/api/jobseeker/file-based-ai",
      data: {
        keyword: "Rate this resume content in percentage ?",
        file_location: resumeUrl,
      },
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data.content_acuracy_percentage);
        setShowPercentage(true);
        setPercentage(
          `Your Ai Resume score is ${res.data.data.content_acuracy_percentage}`
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  
  return (
    <div className="page-wraper">
      <ToastContainer />
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            backgroundImage: `url(${bnr})`,
            height: "100%",
          }}
        >
          <div className="row">
            <div
              style={{ right: "-49%" }}
              className="col-xl-6 col-lg-7 col-md-8 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom"
            >
              <div
                className="login-form style-2"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex" }}>
                  <div className="logo-header text-center p-tb30">
                    {/* <Link to={"./"}><img src={require("./../../images/logo.png")} alt="" /></Link> */}
                    <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        className="logo"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <h2 className="text-center">JobSeeker Signup</h2>
                </div>
                <div className="tab-content nav p-b30 tab">
                  <div id="login" className="tab-pane active ">
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form className=" dez-form " onSubmit={onSignUp}>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            name="firstName"
                            id="firstName"
                            value={registerValues.firstName}
                            onChange={handleRegisterChange}
                            className="form-control"
                            placeholder="First Name"
                            required
                          />
                          {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                        </div>
                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            name="lastName"
                            id="lastName"
                            value={registerValues.lastName}
                            onChange={handleRegisterChange}
                            className="form-control"
                            placeholder="Last Name"
                            required
                          />
                          {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                        </div>

                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            id="phone"
                            name="phone"
                            value={registerValues.phone}
                            type="number"
                            className="form-control"
                            defaultValue="Password"
                            placeholder="Phone Number"
                            required
                            onChange={handleRegisterChange}
                          />
                          {/* <div className="text-danger">
                              {errors.password && <div>{errors.password}</div>}
                            </div> */}
                        </div>
                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            type="text"
                            name="jobTitle"
                            id="jobTitle"
                            onChange={handleRegisterChange}
                            value={registerValues.jobTitle}
                            className="form-control"
                            placeholder="Job Title"
                            required
                          />
                        </div>

                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={registerValues.email}
                            onChange={handleRegisterChange}
                            className="form-control"
                            placeholder="Work Email Address"
                            required
                          />
                          {/* <div className="text-danger">
                              {errors.email && <div>{errors.email}</div>}
                            </div> */}
                        </div>
                        <div className="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="input-group d-flex align-items-center">
                            <span
                              className="input-group-addon position-absolute"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                cursor: "pointer",
                                right: "0px",
                                zIndex: "11",
                                position: "absolute",
                              }}
                            >
                              <i
                                className={
                                  showPassword
                                    ? "fa fa-eye-slash "
                                    : "fa fa-eye"
                                }
                              ></i>
                            </span>
                            <input
                              type={showPassword ? "text" : "password"} // Toggle password visibility
                              name="password"
                              id="password"
                              className="form-control position-relative"
                              value={registerValues.password}
                              placeholder="Type Your Password"
                              defaultValue="Password"
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group text-left ">
                          {/* <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5"
                          >
                            Sign me up
                          </button> */}

                          <span className="custom-control custom-checkbox mt-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="terms"
                              name="terms"
                              required
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="terms"
                            >
                              {" "}
                              I agree to the{" "}
                              {
                                <Link to={"/employer/privacy-rights"}>
                                  Privacy Policy
                                </Link>
                              }{" "}
                              and{" "}
                              <Link to={"/employer/term-of-use-nova-jobs"}>
                                Terms & conditions{" "}
                              </Link>
                            </label>
                          </span>
                        </div>
                      </div>

                      <div className="text-danger mb-3 ">
                        {errors.firstName && (
                          <div className="text-center ">{errors.firstName}</div>
                        )}

                        {errors.lastName && (
                          <div className="text-center ">{errors.lastName}</div>
                        )}

                        {errors.phone && (
                          <div className="text-center ">{errors.phone}</div>
                        )}
                      </div>
                      <div className="text-center ">
                        <button
                          type="submit"
                          className="site-button dz-xs-flex m-r5"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/*{showUpload ? : (
                  <div>
                    {AiBtn ? (
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="form-group">
                            <input
                              type="file"
                              onChange={handleChange}
                              className="form-control"
                              accept=".pdf, .doc, .docx"
                            />
                          </div>
                          <p>{percentage}</p>
                        </div>
                        {spinner ? (
                          <MutatingDots
                            visible={true}
                            height="100"
                            width="100"
                            color="#1c2957"
                            secondaryColor="#1c2957"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : (
                          <button
                            type="submit"
                            className="site-button dz-xs-flex m-r5"
                          >
                            Upload Resume
                          </button>
                        )}
                      </form>
                    ) : (
                      <div>
                        <div>
                          <video
                            width="200px"
                            loop={showVideo}
                            autoPlay={showVideo}
                          >
                            <source src={processVid} type="video/mp4" />
                          </video>
                        </div>
                        {showPercentage ? (
                          <div>
                            <p>{percentage}</p>
                            <button
                              className="site-button dz-xs-flex m-r5"
                              onClick={(e) => {
                                navigate("/");
                              }}
                            >
                              Go To Dashboard
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              runAi(e);
                            }}
                            className="site-button dz-xs-flex m-r5"
                          >
                            {runAiButton}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}*/}
                <div className="bottom-footer clearfix m-t10 m-b20 row text-center">
                  <div className="col-lg-12 text-center">
                    <span>
                      {/* {" "}
                      © Copyright by{" "} */}
                      {/*   <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />  <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  /> */}
                      Already have an account ?
                      <a class="site-button-link " href="/user/login">
                        <i class="fa fa-unlock-alt"></i> Sign In
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Register2);

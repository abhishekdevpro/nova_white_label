// import React, { useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import { Link, Redirect, useNavigate } from "react-router-dom";
// import {
//   loadingToggleAction,
//   loginAction,
// } from "../../store/actions/AuthActions";

// // image
// //import logo from "../../images/logo-full-white.png";
// import loginbg from "./../../images/login/loginbg.jpeg";
// import axios from "axios";
// import { showToastError } from "../../utils/toastify";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Footer from "../Layout/Footer";
// import Header from "../Layout/Header"
// import { Modal } from "react-bootstrap";
// const bnr3 = require("./../../images/background/bg3.jpg");
// function EmployeeLogin(props) {
//   const [email, setEmail] = useState("demo@example.com");
//   let errorsObj = { email: "", password: "" };
//   const [errors, setErrors] = useState(errorsObj);
//   const [password, setPassword] = useState("123456");

//   const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP modal
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   //   function onLogin(e) {
//   //     e.preventDefault();
//   //     let error = false;
//   //     const errorObj = { ...errorsObj };
//   //     if (email === "") {
//   //       errorObj.email = "Email is Required";
//   //       error = true;
//   //     }
//   //     if (password === "") {
//   //       errorObj.password = "Password is Required";
//   //       error = true;
//   //     }
//   //     setErrors(errorObj);
//   //     if (error) {
//   //       return;
//   //     }
//   //     dispatch(loadingToggleAction(true));
//   //     dispatch(loginAction(email, password, props.history));
//   //   }

//   // const history = useHistory();
//   const notify = (data) => toast.warning(data);

//   const handlePostRequest = async (e) => {
//     e.preventDefault();
//     if (password === "") {
//       notify("Password is required");
//       if (email === "") {
//         notify("Email is required");
//       }
//       return;
//     }

//     const reqBody = {
//       email: email,
//       password: password,
//     };
//     await axios({
//       method: "POST",
//       url: "https://apiwl.novajobs.us/api/employeer/auth/login",
//       headers: {
//         "Content-Type": "Application/json",
//       },
//       data: reqBody,
//     })
//       .then((response) => {
//         console.log(response, "login");
//         localStorage.setItem("employeeLoginToken", response?.data?.data?.token);
//         navigate("/employer/company-profile");
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log(err.response.data.message);
//         showToastError(err?.response?.data?.message);
//       });
//   };
//   const startTimer = () => {
//     setTimer(60);
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 1) {
//           clearInterval(interval);
//           return 0;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const sendEmail = async () => {
//     try {
//       setLoading(true);
//       await axios.post(
//         "https://apiwl.novajobs.us/api/employeer/auth/send-loginotp",
//         { email }
//       );
//       setStep(2);
//       startTimer();
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.message ||
//         "Failed to send OTP. Please register first.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const sendEmail = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await axios.post(
//   //       "https://apiwl.novajobs.us/api/jobseeker/auth/send-loginotp",
//   //       { email }
//   //     );

//   //     // Check if the response contains the token
//   //     if (response?.data?.data?.token) {
//   //       localStorage.setItem("employeeLoginToken", response?.data?.data?.token); // Store token
//   //       setStep(2); // Move to OTP step
//   //       startTimer(); // Start OTP timer
//   //     } else {
//   //       // If no token, show an error
//   //       toast.error("Please register first.");
//   //     }
//   //   } catch (error) {
//   //     const errorMessage =
//   //       error?.response?.data?.message ||
//   //       "Failed to send OTP. Please try again.";
//   //     toast.error(errorMessage); // Show error if API call fails
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const verifyOtp = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "https://apiwl.novajobs.us/api/employeer/auth/login-otp",
//         { email, otp }
//       );
//       toast.success("Login successful!");
//       localStorage.setItem("jobSeekerLoginToken", response?.data?.data?.token);
//       setShowOtpModal(false);
//       navigate("/employer/company-profile");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Invalid OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       setLoading(true);
//       await axios.post(
//         "https://apiwl.novajobs.us/api/employeer/auth/send-loginotp",
//         { email }
//       );
//       toast.success("OTP has been resent!");
//       startTimer();
//     } catch (error) {
//       toast.error("Failed to resend OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="page-wraper">
//       <Header />
//
//       <div
//         className="page-content bg-white login-style2"
//         style={{
//           backgroundImage: "url(" + loginbg + ")",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         <div className="section-full">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-6 col-md-6 d-flex">
//                 <div className=" max-w400 align-self-center">
//                   <div className="logo">
//                     {/* <Link to={"/"}><img src={logo2} alt="" /></Link> */}
//                     {/* <Link to={"/"}>
//                       <img
//                         src={require("./../../images/logo/NovaUS.png")}
//                         alt=""
//                       />
//                     </Link> */}
//                   </div>
//                   <h2 className="m-b10 text-white">
//                     {" "}
//                     Sign up or Login To Dashboard
//                   </h2>
//                   <p
//                     className="m-b30"
//                     style={{
//                       fontWeight: "bolder",
//                       color: "white",
//                     }}
//                   >
//                     Welcome To One Stop AI Powered Staffing Solution
//                   </p>
//                   <ul
//                     className="list-inline m-r10 text-white "
//                     style={{
//                       fontWeight: "bolder",
//                       fontSize: "30px",
//                     }}
//                   >
//                     {/* <li>
//                       <Link to={""} className="m-r10 text-white ">
//                         <i className="fa fa-facebook"></i>
//                       </Link>
//                     </li> */}
//                     {/*<li>
//                       <Link to={""} className="m-r10 text-black fs-4">
//                         <i className="fa fa-google-plus"></i>
//                       </Link>
//                   </li>*/}
//                     <li>
//                       <Link to={""} className="m-r10 text-white">
//                         <i className="fa fa-linkedin"></i>
//                       </Link>
//                     </li>
//                     {/* <li>
//                       <Link to={""} className="m-r10 text-white ">
//                         <i className="fa fa-instagram"></i>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to={""} className="m-r10 text-white">
//                         <i className="fa fa-twitter"></i>
//                       </Link>
//                     </li> */}
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6">
//                 <div className="login-2 submit-resume p-a30 seth">
//                   <div className="d-flex justify-content-center align-items-center">
//                     <h2 className="text-center">Employer Login</h2>
//                   </div>
//                   <div className="nav">
//                     <form className="col-12 p-a0 ">
//                       <p className="font-weight-600">
//                         If you have an account with us, please log in.
//                       </p>
//                       {props.errorMessage && (
//                         <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
//                           {props.errorMessage}
//                         </div>
//                       )}
//                       {props.successMessage && (
//                         <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
//                           {props.successMessage}
//                         </div>
//                       )}
//                       <div className="form-group ">
//                         <label>E-Mail Address*</label>
//                         <div className="input-group">
//                           <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Type Your Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                           />
//                           {errors.email && (
//                             <div className="text-danger fs-12">
//                               {errors.email}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label>Password *</label>
//                         <div className="input-group d-flex align-items-center">
//                           <span
//                             className="input-group-addon position-absolute"
//                             onClick={() => setShowPassword(!showPassword)}
//                             style={{
//                               cursor: "pointer",
//                               right: "0px",
//                               zIndex: "11",
//                               position: "absolute",
//                             }}
//                           >
//                             <i
//                               className={
//                                 showPassword ? "fa fa-eye-slash " : "fa fa-eye"
//                               }
//                             ></i>
//                           </span>
//                           <input
//                             type={showPassword ? "text" : "password"} // Toggle password visibility
//                             className="form-control position-relative"
//                             value={password}
//                             placeholder="Type Your Password"
//                             onChange={(e) => setPassword(e.target.value)}
//                           />
//                         </div>

//                         {errors.password && (
//                           <div className="text-danger fs-12">
//                             {errors.password}
//                           </div>
//                         )}
//                       </div>
//                       <div className="form-group text-center">
//                         <Link
//                           data-toggle="tab"
//                           to={"/employer/forgot-password"}
//                           className="forget-pass m-l5"
//                         >
//                           <i className="fa fa-unlock-alt"></i> Forgot Password
//                         </Link>
//                       </div>
//                       <div className="dz-social clearfix">
//                         <h5 className="form-title m-t5 pull-left">
//                           Sign In With
//                         </h5>
//                         {/*<ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
//                           <li>
//                             <Link
//                               to={""}
//                               className="fa fa-linkedin link-btn mr-1"
//                               target="bank"
//                             ></Link>
//                           </li>
//                           <li onClick="">
//                             <Link
//                               to={""}
//                               className="fa fa-google link-btn mr-1"
//                               target="bank"
//                             ></Link>
//                           </li>
//                         </ul> */}
//                       </div>
//                       <div className="text-center">
//                         <button
//                           onClick={handlePostRequest}
//                           className="site-button float-left"
//                         >
//                           login
//                         </button>
//                         <Link
//                           to="/employer/register-2"
//                           className="site-button-link forget-pass m-t15 float-right"
//                         >
//                           <i className="fa fa-unlock-alt"></i> Sign up
//                         </Link>
//                       </div>
//                       <div className="form-group text-center">
//                         <button
//                           type="button"
//                           className="site-button "
//                           onClick={() => setShowOtpModal(true)}
//                         >
//                           Sign in with OTP
//                         </button>
//                       </div>
//                     </form>
//                     <div className="form-group text-center">
//                       <Link
//                         to="mailto:mailto:contact@novajobs.us"
//                         className="site-button-link  m-t15 "
//                       >
//                         Need help click here
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <footer className="login-footer">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12 text-center text-white">
//                 <span className="float-left ">
//                   © Copyright by{" "}
//                   <img
//                     src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
//                     alt=""
//                     style={{
//                       width: "40px",
//                     }}
//                   />{" "}
//                   <Link to={"#"} style={{ color: "white", fontWeight: "bold" }}>
//                     Nova Jobs{" "}
//                   </Link>{" "}
//                 </span>
//                 <span className="float-right">
//                   “Hyper V Solutions” | All Rights Reserved
//                 </span>
//               </div>
//             </div>
//           </div>
//         </footer> */}
//       </div>
//       <Footer />
//       <Modal
//         className="lead-form-modal"
//         show={showOtpModal}
//         onHide={() => setShowOtpModal(false)}
//         centered
//       >
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <button
//               type="button"
//               className="close"
//               onClick={() => setShowOtpModal(false)}
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//             <div className="modal-body row m-a0 clearfix">
//               <div
//                 className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
//                 style={{
//                   backgroundImage: "url(" + bnr3 + ")",
//                   backgroundPosition: "center",
//                   backgroundSize: "cover",
//                 }}
//               >
//                 <div className="form-info text-white align-self-center">
//                   <h3 className="m-b15">Login To Your Account</h3>
//                   <p className="m-b15">
//                     Access your account and explore new opportunities!
//                   </p>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 p-a0">
//                 <div className="lead-form browse-job text-left">
//                   {step === 1 && (
//                     <>
//                       <h6 className="m-t0">Enter Your Email</h6>
//                       <div className="form-group">
//                         <input
//                           className="form-control"
//                           placeholder="Email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>
//                       <button
//                         className="btn-primary site-button btn-block"
//                         onClick={sendEmail}
//                         disabled={loading}
//                       >
//                         {loading ? "Checking Email..." : "Next"}
//                       </button>
//                     </>
//                   )}
//                   {step === 2 && (
//                     <>
//                       <h6 className="m-t0">Enter OTP</h6>
//                       <div className="form-group">
//                         <input
//                           className="form-control"
//                           placeholder="OTP"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                         />
//                       </div>
//                       <button
//                         className="btn-primary site-button btn-block"
//                         onClick={verifyOtp}
//                         disabled={loading}
//                       >
//                         {loading ? "Verifying..." : "Submit"}
//                       </button>
//                       <p>
//                         Resend OTP in: <strong>{timer}</strong> seconds
//                       </p>
//                       <button
//                         onClick={resendOtp}
//                         disabled={timer > 0} // Disable the button while timer is active
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: timer > 0 ? "#ccc" : "#1C2957",
//                           color: timer > 0 ? "#666" : "#fff",
//                         }}
//                       >
//                         Resend OTP
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.auth.errorMessage,
//     successMessage: state.auth.successMessage,
//     showLoading: state.auth.showLoading,
//   };
// };
// export default connect(mapStateToProps)(EmployeeLogin);
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import { FcGoogle } from "react-icons/fc";
// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/login/loginbg.jpeg";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal } from "react-bootstrap";
import UserHeader from "../../markup/Layout/Header";
// import CookiesBanner from "../../markup/Layout/CookiesBanner";
import Footer from "../../markup/Layout/Footer";
import GoogleOneTapLoginEmployee from "../../components/GoogleOneTapEmployee";

const bnr3 = require("./../../images/background/bg3.jpg");
function EmployeeLogin(props) {
  const [email, setEmail] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");

  const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP modal
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const domain = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
  const notify = (data) => toast.warning(data);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    if (!termsChecked) {
      toast.warn(
        "You must agree to the Privacy Policy and Terms & Conditions before continuing."
      );
      return;
    }

    if (email === "") {
      notify("Email is required");
      return;
    }

    const reqBody = {
      email: email,
      domain: domain,
      // password: password,
    };
    await axios({
      method: "POST",
      url: "https://apiwl.novajobs.us/api/employeer/auth/send-loginotp",
      headers: {
        "Content-Type": "Application/json",
      },
      data: reqBody,
    })
      .then((response) => {
        console.log(response);
        // localStorage.setItem("employeeLoginToken", response?.data?.data?.token);
        // navigate("/employer/company-profile");
        if (response.status === 200 || response.data.code === 200) {
          console.log(response);
          toast.success(response.data.message || " Otp sent to your email.");
          localStorage.setItem("userEmail", email);
          navigate("/employer/login-code");
        } else {
          toast.error("Failed to sent otp");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };
  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://apiwl.novajobs.us/api/employeer/auth/send-loginotp",
        { email }
      );
      setStep(2);
      startTimer();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to send OTP. Please register first.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  // const sendEmail = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://apiwl.novajobs.us/api/jobseeker/auth/send-loginotp",
  //       { email }
  //     );

  //     // Check if the response contains the token
  //     if (response?.data?.data?.token) {
  //       localStorage.setItem("employeeLoginToken", response?.data?.data?.token); // Store token
  //       setStep(2); // Move to OTP step
  //       startTimer(); // Start OTP timer
  //     } else {
  //       // If no token, show an error
  //       toast.error("Please register first.");
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error?.response?.data?.message ||
  //       "Failed to send OTP. Please try again.";
  //     toast.error(errorMessage); // Show error if API call fails
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/employeer/auth/login-otp",
        { email, otp }
      );
      toast.success("Login successful!");
      localStorage.setItem("jobSeekerLoginToken", response?.data?.data?.token);
      setShowOtpModal(false);
      navigate("/employer/company-profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://apiwl.novajobs.us/api/employeer/auth/send-loginotp",
        { email }
      );
      toast.success("OTP has been resent!");
      startTimer();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignin = async () => {
    const url = `https://apiwl.novajobs.us/api/employeer/auth/google?domain=${domain}`;

    try {
      const response = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Google sign-in token: ", response.data.data);
        window.location.href = response.data.data;
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
    }
  };
  return (
    <div className="page-wraper">
      <GoogleOneTapLoginEmployee />
      <UserHeader />

      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className=" max-w400 align-self-center">
                  <div className="logo">
                    {/* <Link to={"/"}><img src={logo2} alt="" /></Link> */}
                    {/* <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        alt=""
                      />
                    </Link> */}
                  </div>
                  <h2 className="m-b10 text-white text-center">
                    {" "}
                    Login As Employer{" "}
                  </h2>
                  <p
                    className="m-b30"
                    style={{
                      fontWeight: "bolder",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    Welcome To One Stop AI Powered Staffing Solution
                  </p>
                  <ul
                    className="list-inline m-r10 text-white "
                    style={{
                      fontWeight: "bolder",
                      fontSize: "30px",
                    }}
                  >
                    {/* <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li> */}
                    {/*<li>
                      <Link to={""} className="m-r10 text-black fs-4">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                  </li>*/}
                    {/* <li>
                      <Link to={""} className="m-r10 text-white">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="d-flex justify-content-center align-items-center">
                    <h2 className="text-center">Employer Login</h2>
                  </div>
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      {/* <p className="font-weight-600">
                        If you have an account with us, please log in.
                      </p> */}
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      {window.location.origin === "https://novajobs.us" && (
                        <>
                          <div>
                            <button
                              onClick={handleGoogleSignin}
                              type="button"
                              className="w-100 mb-4 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
                            >
                              <FcGoogle className="h-6 w-6 mr-2" />
                              Continue with Google
                            </button>
                          </div>
                          <div className=" d-flex justify-content-center align-items-center">
                            <p> OR</p>
                          </div>
                        </>
                      )}

                      <div className="form-group ">
                        <label>E-Mail Address*</label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Type Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="dz-social clearfix">
                        <span className="custom-control custom-checkbox mt-3">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="terms"
                            name="terms"
                            required
                            checked={termsChecked}
                            onChange={(e) => setTermsChecked(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="terms"
                          >
                            {" "}
                            I agree to the{" "}
                            {
                              <Link to={"/privacy-policy"}>Privacy Policy</Link>
                            }{" "}
                            and{" "}
                            <Link to={"/terms-and-conditions"}>
                              Terms & conditions{" "}
                            </Link>
                          </label>
                        </span>
                      </div>
                      <div className="text-center mt-4">
                        <button
                          onClick={handlePostRequest}
                          className="site-button w-100"
                        >
                          Send Otp
                        </button>
                        {/* <Link
                          to="/employer/register-2"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Sign up
                        </Link> */}
                      </div>
                      {/* <div className="form-group text-center">
                        <button
                          type="button"
                          className="site-button "
                          onClick={() => setShowOtpModal(true)}
                        >
                          Sign in with OTP
                        </button>
                      </div> */}
                    </form>
                    <div className="form-group text-center">
                      <Link
                        to="mailto:mailto:contact@novajobs.us"
                        className="site-button-link  m-t15 "
                      >
                        Need help click here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        className="lead-form-modal"
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        centered
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={() => setShowOtpModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body row m-a0 clearfix">
              <div
                className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                style={{
                  backgroundImage: "url(" + bnr3 + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="form-info text-white align-self-center">
                  <h3 className="m-b15">Login To Your Account</h3>
                  <p className="m-b15">
                    Access your account and explore new opportunities!
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-a0">
                <div className="lead-form browse-job text-left">
                  {step === 1 && (
                    <>
                      <h6 className="m-t0">Enter Your Email</h6>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn-primary site-button btn-block"
                        onClick={sendEmail}
                        disabled={loading}
                      >
                        {loading ? "Checking Email..." : "Next"}
                      </button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h6 className="m-t0">Enter OTP</h6>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn-primary site-button btn-block"
                        onClick={verifyOtp}
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Submit"}
                      </button>
                      <p>
                        Resend OTP in: <strong>{timer}</strong> seconds
                      </p>
                      <button
                        onClick={resendOtp}
                        disabled={timer > 0} // Disable the button while timer is active
                        className="btn btn-primary"
                        style={{
                          backgroundColor: timer > 0 ? "#ccc" : "#1C2957",
                          color: timer > 0 ? "#666" : "#fff",
                        }}
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <CookiesBanner/> */}
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
export default connect(mapStateToProps)(EmployeeLogin);

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header2 from "../Layout/Header2";
import Footer from "../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import Profilesidebar from "./Profilesidebar";

function Jobreferral() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (!validatePhone(value)) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (!validatePhone(phone)) {
  //     toast.error("Please enter a valid 10-digit phone number.");
  //     return;
  //   }

  //   const token = localStorage.getItem("jobSeekerLoginToken");
  //   const referralData = { name, phone, email, remark };

  //   try {
  //     const response = await axios.post(
  //       "https://apiwl.novajobs.us/api/jobseeker/add-referral",
  //       referralData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Referral added successfully!");
  //       setName("");
  //       setPhone("");
  //       setEmail("");
  //       setRemark("");
  //     } else {
  //       toast.error("Failed to add referral. Please try again.");
  //     }
  //   } catch (err) {
  //     toast.error("An error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setPhoneError(""); // reset error first

  if (!validatePhone(phone)) {
    setPhoneError("Please enter a valid 10-digit phone number.");
    setLoading(false); // stop loading if invalid
    return;
  }

  const token = localStorage.getItem('jobSeekerLoginToken');
  const referralData = { name, phone, email, remark };

  try {
    const response = await axios.post("https://apiwl.novajobs.us/api/jobseeker/add-referral", referralData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });

    if (response.status === 200) {
      toast.success("Referral added successfully!");
      setName("");
      setPhone("");
      setEmail("");
      setRemark("");
    } else {
      toast.error("Failed to add referral. Please try again.");
    }
  } catch (err) {
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header2 />
      <FixedHeader />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"jobs-referral"} />

                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Add Referral
                      </h5>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${
                            phoneError ? "is-invalid" : ""
                          }`}
                          id="phone"
                          pattern="[0-9]{10}"
                          maxLength="10"
                          minLength="10"
                          inputMode="numeric"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                        />
                        {phoneError && (
                          <div className="invalid-feedback d-block">
                            {phoneError}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="remark" className="form-label">
                          Remark
                        </label>
                        <textarea
                          className="form-control"
                          id="remark"
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="site-button w-100"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
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

export default Jobreferral;

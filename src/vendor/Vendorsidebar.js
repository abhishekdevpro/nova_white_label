import axios from "axios";
import { showToastError, showToastSuccess } from "../utils/toastify";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons"; // Import the specific icons you need
import {
  setPostAJobData,
  setSkillsData,
} from "../store/reducers/postAJobSlice";
import { fetchCompanyInfo } from "../store/thunkFunctions/companyFunction";
import { ToastContainer } from "react-toastify";
import "../css/profilesidebar.css";
import { Navigate } from "react-router-dom";

const VendorCompanySideBar = ({ active }) => {
  const token = localStorage.getItem("vendorToken");
  //   const [res.data.data, setres.data.dataa] = useState({})

  const handleLogout = () => {
    // Clear authentication token or perform necessary logout actions
    localStorage.removeItem("vendorToken");
    // Redirect to admin login screen
    <Navigate to="/vendor/login" />;
    return;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postJob = async () => {
    await axios({
      url: "https://api.novajobs.us/api/admin/job-post",
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data, "job");
        // setres.data.dataa(res.data.data);
        dispatch(
          setPostAJobData({
            jobTitle: res.data.data.job_title,
            company: res.data.data.country_id,
            workplaceType: res.data.data.workplace_type_id,
            // location: res.data.data.,
            jobType: res.data.data.job_type_id,
            description: res.data.data.job_description,
            // education: res.data.data.,
            // qualificationSetting: res.data.data.,
            selectedCity: res.data.data.city_id,
            selectedState: res.data.data.state_id,
            selectedCountry: res.data.data.country_id,
          })
        );
        // dispatch(setSkillsData(res.data.data.skills_arr))
        navigate(`/vendor/vendorcomponypostjobs/${res.data.data.id}`);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getLogo = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.novajobs.us/api/admin/vendor/user-profile",
        headers: {
          Authorization: token,
        },
      });
      setLogo(`${response.data.data.company_detail.logo}`);
    } catch (error) {
      console.error("Error fetching logo:", error);
      // Handle error if necessary
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    getLogo(); // Fetch logo on component mount
  }, []); // Empty dependency array ensures it runs only once

  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  let companyDetail = companyData?.company_detail;

  console.log("compaysidebardetail", companyDetail);

  const [file, setFile] = useState([]);
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);
    setFile({
      file: img,
      url: url,
    });
  };
  const formData = new FormData();
  formData.append("logo", file?.file);
  const handleUpdateCompanyLogo = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: "https://api.novajobs.us/api/admin/company-logo",
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        showToastSuccess(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="">
          <ToastContainer />
          <div className="sticky-top">
            <div className="candidate-info company-info">
              <div className="candidate-detail text-center">
                <div className="canditate-des">
                  <Link to={"#"}>
                    {file?.url ? (
                      <img
                        className="img-fluid"
                        alt=""
                        src={file?.url}
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 1,
                          backgroundImage: "fit",
                        }}
                      />
                    ) : (
                      <img
                        className="img-fluid"
                        alt=""
                        src={`https://api.novajobs.us${logo}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 1,
                        }}
                      />
                    )}
                  </Link>
                  <div
                    className="upload-link"
                    title="update"
                    data-toggle="tooltip"
                    data-placement="right"
                  >
                    <input
                      type="file"
                      className="update-flie"
                      name="file"
                      id="file"
                      onChange={handleImageChange}
                    />
                    <i className="fa fa-pencil"></i>
                  </div>
                </div>
              </div>
              {console.log(companyDetail?.company_name, "datahi")}
              <div className="candidate-title text-center candidate-detail text-break">
                <h4 className="m-b5">
                  <Link to={"#"}>{companyDetail?.company_name}</Link>
                </h4>
                {file?.url ? (
                  <button
                    onClick={handleUpdateCompanyLogo}
                    className="site-button"
                  >
                    Update
                  </button>
                ) : null}
              </div>
              <ul>
                <li>
                  <Link
                    to={"/vendor/vendorplan"}
                    className={active === "vendorplan" ? "" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Plan</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className={active === "form" ? "active" : null}
                    to={"/vendor/form"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>White Label Form</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    className={active === "lading" ? "active" : null}
                    to={"/white-label"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>White Label Landing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorprofile"}
                    className={active === "company" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Company Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      active === "vendorcomponypostjobs" ? "active" : null
                    }
                    onClick={postJob}
                    // to={"/vendor/vendorcomponypostjobs"}
                  >
                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                    <span>Post A Job</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "transactions" ? "active" : null}
                    to={"/vendor/vendorwallet"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>Wallet</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/vendor/vendorcompanymanage/jobs"}
                    className={
                      active === "company-manage-job" ? "active" : null
                    }
                  >
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                    <span>Manage jobs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/vendor/vendorbulkuploadjobopeneing"}
                    className={
                      active === "vendorbulkuploadjobopeneing" ? "active" : null
                    }
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                    <span>upload bulk job opening</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorbulkuploadjobseeker"}
                    className={
                      active === "vendorbulkuploadjobseeker" ? "active" : null
                    }
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                    <span>upload bulk jobseeker</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/editors"}
                    className={active === "editors" ? "active" : null}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                    <span>Vendor Website</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorchangepasswordpage"}
                    className={
                      active === "jobs-change-password" ? "active" : null
                    }
                  >
                    <i className="fa fa-key" aria-hidden="true"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/vendor/login"}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span onClick={handleLogout}>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCompanySideBar;

import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setPostAJobData,
  setSkillsData,
} from "../../store/reducers/postAJobSlice";
import { fetchCompanyInfo } from "../../store/thunkFunctions/companyFunction";
import { ToastContainer } from "react-toastify";
import "../../css/profilesidebar.css";
import { FaBell, FaComment } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const CompanySideBar = ({ active }) => {
  const token = localStorage.getItem("employeeLoginToken");
  //   const [res.data.data, setres.data.dataa] = useState({})

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postJob = async () => {
    await axios({
      url: "https://api.novajobs.us/api/employeer/job-post",
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
        navigate(`/employer/company-post-jobs/${res.data.data.id}`);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getLogo = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.novajobs.us/api/employeer/employeer-profile",
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

  console.log(logo, "lavi");

  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  let companyDetail = companyData?.company_detail;

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
      url: "https://api.novajobs.us/api/employeer/company-logo",
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
                        src={logo}
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
                    to={"/employer/company-profile"}
                    className={active === "company" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Company Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "postJob" ? "active" : null}
                    onClick={postJob}
                    //   to={"/employer/company-post-jobs"}
                  >
                    <i className="fa fa-file-text-o" aria-hidden="true"></i>
                    <span>Post A Job</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employer/company-manage-job/jobs"}
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
                    className={active === "community" ? "active" : null}
                    to={"/employer/community"}
                  >
                    <FaUser />
                    <span>Community</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "messages" ? "active" : null}
                    to={"/employer/messages"}
                  >
                    <FaComment />
                    <span>Messages</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "notifications" ? "active" : null}
                    to={"/employer/jobs-alerts"}
                  >
                    <FaBell />
                    <span>Notifications</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/employer/browse-candidates"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={active === "browse-candidates" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Browse Candidates</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "wallet" ? "active" : null}
                    to={"/employer/company-transactions"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>Wallet</span>
                  </Link>
                </li>

                {/* <li>
              <Link
                to={"/employer/company-resume"}
                className={active === "company-resume" ? "active" : null}
              >
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>Applicants</span>
              </Link>
            </li> */}

                <li>
                  <Link
                    to={"/employer/jobs-change-password"}
                    className={
                      active === "jobs-change-password" ? "active" : null
                    }
                  >
                    <i className="fa fa-key" aria-hidden="true"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/"}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Log Out</span>
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

export default CompanySideBar;

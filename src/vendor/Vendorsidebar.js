import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Settings, X } from "lucide-react";
import { toast } from "react-toastify";
import { setPostAJobData } from "../store/reducers/postAJobSlice";
import styled from "styled-components";
import "../css/profilesidebar.css";
const VendorCompanySideBar = ({ active }) => {
  const token = localStorage.getItem("vendorToken");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [myPortalOpen, setMyPortalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [domainName, setdomainName] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const planName = {
    1: "Free",
    2: "Nova Pro",
    3: "Nova Enterprise",
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor/login");
  };

  const postJob = async () => {
    try {
      const res = await axios({
        url: "https://apiwl.novajobs.us/api/admin/job-post",
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data.data, "job");
      dispatch(
        setPostAJobData({
          jobTitle: res.data.data.job_title,
          company: res.data.data.country_id,
          workplaceType: res.data.data.workplace_type_id,
          jobType: res.data.data.job_type_id,
          description: res.data.data.job_description,
          selectedCity: res.data.data.city_id,
          selectedState: res.data.data.state_id,
          selectedCountry: res.data.data.country_id,
        })
      );
      navigate(`/vendor/vendorcomponypostjobs/${res.data.data.id}`);
    } catch (err) {
      console.log(err, "joy");
    }
  };

  const getLogo = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
        headers: {
          Authorization: token,
        },
      });
      const vendorDetails = response.data.data.company_detail;
      setLogo(vendorDetails.logo); // Set the logo
      setdomainName(response.data?.data?.vendors_detail?.domain);
      setUserData(response.data.data?.vendors_detail); // Store user data for plan info
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMyPortal = () => {
    setMyPortalOpen(!myPortalOpen);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  useEffect(() => {
    getLogo();
  }, [token]); // Added getLogo to dependencies

  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  const companyDetail = companyData?.company_detail;

  const [file, setFile] = useState([]);
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);
    setFile({
      file: img,
      url: url,
    });
  };

  const handleUpdateCompanyLogo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", file?.file);
    axios({
      method: "PUT",
      url: "https://apiwl.novajobs.us/api/admin/company-logo",
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message || "Logo updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || "Failed to update logo");
      });
  };

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  console.log(`https://apiwl.novajobs.us${logo}`, "llll");
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar-2 ${sidebarOpen ? "open" : ""}`}>
        <div className="">
          <div className="sticky-top">
            <div className="d-flex justify-content-start d-lg-none p-3">
              <X onClick={toggleSidebar} style={{ cursor: "pointer" }} />
            </div>
            <div className="candidate-info company-info">
              <div className="candidate-detail text-center">
                <div className="canditate-des">
                  <Link to={"#"}>
                    {file?.url ? (
                      <img
                        className="img-fluid"
                        alt=""
                        src={file?.url || "/placeholder.svg"}
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
                        src={`https://apiwl.novajobs.us${logo}`}
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
                    to={"/vendor/dashboard"}
                    className={active === "dashboard" ? "active" : null}
                  >
                    <i className="fa fa-dashboard" aria-hidden="true"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorplan"}
                    className={active === "vendorplan" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>
                      Plan{" "}
                      <FreeBadge>
                        {userData?.plan_id
                          ? planName[userData.plan_id]
                          : "Free"}
                      </FreeBadge>
                    </span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className={active === "lading" ? "active" : null}
                    to={"/white-label"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>White Label Landing</span>
                  </Link>
                </li> */}
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
                    to={"/vendor/branding"}
                    className={active === "branding" ? "active" : null}
                  >
                    <i className="fa fa-paint-brush" aria-hidden="true"></i>
                    <span>Branding</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={toggleMyPortal}>
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>My Portal </span>
                    <i
                      className={`fa fa-chevron-${
                        myPortalOpen ? "up" : "down"
                      } float-right`}
                    ></i>
                  </Link>
                  {myPortalOpen && (
                    <ul className="sub-menu">
                      <li>
                        <Link
                          className={
                            active === "vendorcomponypostjobs" ? "active" : null
                          }
                          onClick={postJob}
                        >
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          <span>Post A Job</span>
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
                            active === "vendorbulkuploadjobopeneing"
                              ? "active"
                              : null
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCloudUploadAlt}
                            className="me-2"
                          />
                          <span>Upload job opening</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/vendor/vendorbulkuploadjobseeker"}
                          className={
                            active === "vendorbulkuploadjobseeker"
                              ? "active"
                              : null
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCloudUploadAlt}
                            className="me-2"
                          />
                          <span>Upload jobseeker</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="#" onClick={toggleServices}>
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                    <span>Services</span>
                    <i
                      className={`fa fa-chevron-${
                        servicesOpen ? "up" : "down"
                      } float-right`}
                    ></i>
                  </Link>
                  {servicesOpen && (
                    <ul className="sub-menu">
                      <li>
                        <Link
                          to={"/vendor/ai-resume-builder"}
                          className={
                            active === "ai-resume-builder" ? "active" : null
                          }
                        >
                          <i className="fa fa-file-text" aria-hidden="true"></i>
                          <span>AI Resume Builder</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  {/* <Link
                    to={domainName && `https://${domainName}`}
                    target="_blank"
                    className={active === "editors" ? "active" : null}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                    <span>
                      Vendor Website
                      <i
                        className="fa fa-external-link"
                        aria-hidden="true"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </span>
                  </Link> */}
                  {/* {console.log(domainName, "domain")} */}
                  {domainName ? (
                    // If domain exists → external link
                    <a
                      href={`https://${domainName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={active === "editors" ? "active" : ""}
                    >
                      <i
                        className="fa fa-external-link"
                        aria-hidden="true"
                        style={{ marginLeft: "5px" }}
                      ></i>
                      <span>Vendor Website</span>
                    </a>
                  ) : (
                    // If domain doesn't exist → internal link to /vendor
                    <Link
                      to="/vendor/setting?tab=popup"
                      className="text-gray-400 pointer-events-auto hover:text-gray-600"
                      title="Activate your vendor subdomain"
                    >
                      <FontAwesomeIcon
                        icon={faCloudUploadAlt}
                        className="me-2"
                      />
                      <span>Activate Subdomain</span>
                    </Link>
                  )}
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
                  <Link
                    to={"/vendor/setting"}
                    className={active === "setting" ? "active" : null}
                  >
                    <Settings aria-hidden="true" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/vendor/login"} onClick={handleLogout}>
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

const FreeBadge = styled.span`
  background-color: #28a745;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
  font-weight: bold;
`;

export default VendorCompanySideBar;

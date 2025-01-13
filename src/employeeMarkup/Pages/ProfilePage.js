import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Profile.css";
import Header2 from "../Layout/Header2";
import Footer from "../Layout/Footer";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { useEffect } from "react";
import coverImg from "../../images/blue.jpg";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const token = localStorage.getItem("employeeLoginToken");
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getUser = async () => {
    try {
      await axios({
        url: `https://api.novajobs.us/api/employeer/job-seekers/${id}`,
        method: "GET",
      })
        .then((res) => {
          console.log(res, "userinfo");
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  console.log(userData, "userdata");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/employeer/job-seekers?page_size=10",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data, "job seekers data");
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {userData ? (
        <div>
          <Header2 />
          <div className="page-content bg-white break-all">
            <div className="content-block">
              <div className="section-full bg-white p-t50 p-b20">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
                      <div className="profile-summary">
                        <div className="p-content">
                          <div className="profile-card ">
                            <img
                              src={coverImg}
                              alt="Profile"
                              className="cover-picture"
                            />
                            <img
                              src={userData?.jobskkers_detail?.photo}
                              alt="Profile"
                              roundedCircle
                              className="profile-picture"
                            />
                          </div>
                          <div style={{ padding: "10px 30px" }}>
                            {userData.jobskkers_detail.first_name ||
                            userData.jobskkers_detail.proffesional_title ? (
                              <>
                                {/* <p style={{ fontWeight:600,fontSize:"1rem" }}
                               className="mb-0">
                              {userData.jobskkers_detail.first_name}{" "}
                              {userData.jobskkers_detail.last_name}
                            </p> */}
                                <h4 className="mb-0">
                                  {userData.jobskkers_detail.proffesional_title}{" "}
                                </h4>
                              </>
                            ) : null}

                            <div className="relative">
                              <div className="job-time m-t15 m-b10">
                                <a
                                  className="mr-1"
                                  href="#"
                                  onClick={handleLinkClick}
                                >
                                  <span
                                    style={{
                                      padding: "5px 15px",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    Message
                                  </span>
                                </a>
                                <a
                                  className="mr-1"
                                  href="#"
                                  onClick={handleLinkClick}
                                >
                                  <span
                                    style={{
                                      padding: "5px 15px",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    View Contact
                                  </span>
                                </a>
                                <a
                                  className="mr-1"
                                  href="#"
                                  onClick={handleLinkClick}
                                >
                                  <span
                                    style={{
                                      padding: "5px 15px",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    View Email ID
                                  </span>
                                </a>
                              </div>

                              {isModalOpen && (
                                <div
                                  className="modal show d-block "
                                  style={{ backdropFilter: "blur(2px)" }}
                                >
                                  <div className="modal-dialog ">
                                    <div className="modal-content rounded-3 mt-5 ">
                                      <div className="modal-header rounded-3">
                                        <h5 className="modal-title ">
                                          Please Subscribe
                                        </h5>
                                        <button
                                          type="button"
                                          className="close"
                                          onClick={handleCloseModal}
                                        >
                                          <span>&times;</span>
                                        </button>
                                      </div>
                                      <div className="modal-body text-center">
                                        <h5>Hire Fast, Activate Premium Now</h5>
                                        <p>
                                          To access this feature, please
                                          subscribe to our service.
                                        </p>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          onClick={handleCloseModal}
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {userData.jobskkers_detail.countries.name ||
                            userData.jobskkers_detail.states.name ||
                            userData.jobskkers_detail.cities.name ? (
                              <h6 className="mb-0">
                                🏠︎ {userData.jobskkers_detail.cities.name},{" "}
                                {userData.jobskkers_detail.states.name},{" "}
                                {userData.jobskkers_detail.countries.name}
                              </h6>
                            ) : null}
                            <div className="post-bx mt-3">
                              <div className="job-post-info m-a0">
                                {userData.jobskkers_detail.ai_resume_parse_data
                                  .jobsMyResumeData.resumeHeadline ? (
                                  <div className="posted-info clearfix">
                                    <p className="m-tb0 text-primary ">
                                      {
                                        userData.jobskkers_detail
                                          .ai_resume_parse_data.jobsMyResumeData
                                          .resumeHeadline
                                      }
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="mt-4 profile-summary"
                        style={{ padding: "10px 30px" }}
                      >
                        <div className="candidate-info company-info">
                          {userData.jobskkers_detail.ai_resume_parse_data
                            .jobsMyResumeData.employmentData ? (
                            <div className="job-list-container">
                              <h4 className="mb-2 mt-4">Work Experience</h4>
                              {userData.jobskkers_detail.ai_resume_parse_data.jobsMyResumeData.employmentData.map(
                                (item) => (
                                  <div className="d-flex justify-content-start aligns-item-center ">
                                    <div>
                                      <i
                                        className="fa fa-user-o"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                    <div className="ml-2">
                                      <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                        {item.jobTitle}
                                      </h6>
                                      <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                        {item.company}
                                      </h6>
                                      <p
                                        className="mb-0"
                                        style={{ color: "#1c2957" }}
                                      >
                                        {item.jobDescription}
                                      </p>
                                      <div className="job-time m-t15 m-b10"></div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : null}
                        </div>
                        <div className="candidate-info company-info">
                          {userData.jobskkers_detail.ai_resume_parse_data
                            .jobsMyResumeData.skillsData ? (
                            <div className="job-list-container">
                              <h4 className="mb-2 mt-4">Skills</h4>
                              <div className="job-time m-t15 m-b10">
                                {userData.jobskkers_detail.ai_resume_parse_data.jobsMyResumeData.skillsData.map(
                                  (item) => (
                                    <a className="mr-1" href="#">
                                      <span
                                        style={{
                                          padding: "5px 15px",
                                          borderRadius: "100px",
                                        }}
                                      >
                                        {item}
                                      </span>
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12 ">
                      <div
                        className=" profile-summary"
                        style={{ padding: "10px 30px" }}
                      >
                        <div className="candidate-info company-info">
                          <div className="job-list-container text-center">
                            <p
                              className=""
                              style={{
                                color: "#1c2957",
                                fontSize: "13px",
                                lineHeight: "20px",
                              }}
                            ></p>
                            <div className="d-flex justify-content-around aligns-item-center ">
                              <div>
                                <i
                                  className="fa fa-user-o"
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>

                            <p
                              className="mb-2 mt-2"
                              style={{
                                color: "#1c2957",
                                fontSize: "15px",
                                lineHeight: "20px",
                              }}
                            >
                              Hire Fast, Activate Premium Now
                            </p>
                            <div className="job-time m-t15 m-b10">
                              <a
                                className="mr-1"
                                href="#"
                                onClick={handleLinkClick}
                              >
                                <span
                                  style={{
                                    padding: "5px 15px",
                                    borderRadius: "100px",
                                  }}
                                >
                                  Try for free
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="mt-4 profile-summary"
                        style={{ padding: "10px 30px" }}
                      >
                        <div className="candidate-info company-info">
                          <h6 className="mb-4 mt-2">Other similar profiles</h6>
                          {data.map((item, index) => (
                            <ul
                              key={index}
                              onClick={() =>
                                navigate(
                                  `/employer/profilepage/${item?.jobskkers_detail?.id}`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="post-bx"
                                style={{ fontSize: "10px" }}
                              >
                                <div className="d-flex m-b30">
                                  <div
                                    className="job-post-company"
                                    style={{ width: "50px" }}
                                  >
                                    <span>
                                      <img
                                        alt="profile"
                                        src={
                                          item?.jobskkers_detail?.photo ||
                                          "path-to-default-image.jpg"
                                        }
                                        onError={(e) => {
                                          e.target.onerror = null;
                                        }}
                                      />
                                    </span>
                                    {console.log(
                                      item?.jobskkers_detail?.photo,
                                      "data is comming"
                                    )}
                                  </div>
                                  <div className="job-post-info">
                                    <h4 style={{ fontSize: "20px" }}>
                                      {
                                        item?.jobskkers_detail
                                          ?.proffesional_title
                                      }
                                    </h4>

                                    <ul>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item?.jobskkers_detail?.cities?.name}
                                        {", "}
                                        {item?.jobskkers_detail?.states?.name}
                                        {", "}
                                        {
                                          item?.jobskkers_detail?.countries
                                            ?.name
                                        }
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : null}
    </>
  );
};

export default ProfilePage;

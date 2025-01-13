import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form, Button } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import TextEditor from "../Element/Editor";
import AddSkills from "../Element/AddSkills";
import AddScreening from "../Element/AddScreening";
import { FaCircleQuestion } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setPostAJobData } from "../../store/reducers/postAJobSlice";
import ReactQuill from "react-quill";
import QualificationSetting from "../Element/qualificationSettingsEditor";
function Componypostjobs() {
  const [suggestions, setSuggestions] = useState(true);
  const handleSuggestions = () => {
    setSuggestions(false);
  };
  const postAJobData = useSelector((state) => state.postAJobSlice.postAJobData);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "hshhas");
    dispatch(setPostAJobData({ ...postAJobData, [name]: value }));
  };

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
                            data-placement="right"
                          >
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={"#"}>hello</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link to={"/company-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Company Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-post-jobs"} className="active">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
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
                              aria-hidden="true"
                            ></i>
                            <span>Manage jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/company-resume"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
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
                              aria-hidden="true"
                            ></i>
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
                        Post A Job
                      </h5>
                      <Link
                        to={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-12 ">
                          <div className="form-group">
                            <label htmlFor="jobTitle">Job Title</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Job Title"
                              id="jobTitle"
                              name="jobTitle"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 ">
                          <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nova Jobs"
                              id="company"
                              name="company"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {/* <div className="col-12">
                          <div className="form-group">
                            <label>Your email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                            />
                          </div>
                        </div> */}
                        {/* <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Tags</label>
                            <input
                              type="text"
                              className="form-control tags_input"
                            />
                          </div>
                        </div> */}
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="workplaceType">
                              Workplace type
                            </label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              onChange={handleChange}
                              name="workplaceType"
                              id="workplaceType"
                            ></Form.Control>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="USA, Rajasthan, India"
                              id="location"
                              name="location"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="jobType">Job Type</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                              name="jobType"
                              id="jobType"
                              value={postAJobData.jobTitle}
                              onChange={handleChange}
                            >
                              <option>Full Time</option>
                              <option>Part Time</option>
                              <option>Contract</option>
                              <option>Temporary</option>
                              <option>Other</option>
                              <option>Volunteer</option>
                              <option>Internship</option>
                            </Form.Control>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>1 Years</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                              <option>5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Minimum Salary ($):</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="e.g. 10000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Maximum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Region</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>New York</option>
                              <option>London</option>
                              <option>Los Angeles</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload File</label>
                            <div className="custom-file">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p>
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                              />
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {/* <button type="button" className="site-button m-b30">
                        Upload
                      </button> */}
                    </form>
                    {suggestions === false ? null : (
                      <div
                        className="d-flex flex-column  flex-row  p-4"
                        style={{
                          backgroundColor: "#edf3f8",
                          borderRadius: "7px",
                        }}
                      >
                        <div className="d-flex justify-content-end ">
                          <FaX
                            className="outline-none p-0 border-0 f"
                            onClick={handleSuggestions}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        <p>
                          987 members with titles similar to Business
                          Development Specialist are actively seeking jobs in
                          USA.
                        </p>
                      </div>
                    )}
                    <div className="d-flex my-3 flex-column gap-3 ">
                      <Button
                        className="py-3 "
                        style={{ borderRadius: "50px", fontWeight: "600" }}
                      >
                        Write With AI
                      </Button>
                      <Button
                        className="py-3 mt-2 border-1 bg-transparent"
                        style={{
                          borderRadius: "50px",
                          color: "#0a66c2",
                          fontWeight: "600",
                        }}
                      >
                        Write On My Own
                      </Button>
                    </div>
                    <p className="text-center ">
                      If You want help with your job description, we will use
                      the information above and AI to suggest One. <br />{" "}
                      <span style={{ color: "#0a66c2", fontWeight: "600" }}>
                        Learn More
                      </span>
                    </p>
                    <p className="text-center ">
                      Limits may apply to free job posts.
                      <span style={{ color: "#0a66c2", fontWeight: "600" }}>
                        View Our Policy
                      </span>
                    </p>
                    <div>
                      <h4>Description</h4>
                      <TextEditor />
                    </div>
                    <div>
                      <h4>Skills</h4>
                      <p className="mb-2">
                        Add Skill Keywords (max 10) to make your job more
                        visible to the right candidates.
                      </p>
                      <AddSkills />
                    </div>
                    <div className="mt-4">
                      <h4>Screening Questions</h4>
                      <AddScreening />
                    </div>
                    <div className="mt-4">
                      <h4>Qualification setting</h4>
                      <div className="d-flex justify-content-start align-items-center">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            id="check1"
                            class="custom-control-input selectAllCheckBox"
                            name="example1"
                          />
                          <label
                            class="custom-control-label"
                            for="check1"
                          ></label>
                        </div>
                        <div style={{ color: "#9d9d9d" }}>
                          Filter out and send rejections to applicants who don't
                          meet any must-have qualifications.{" "}
                          <FaCircleQuestion />
                        </div>
                      </div>
                      <p className="mb-0 mt-2">Preview*</p>
                      <QualificationSetting />
                    </div>
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
export default Componypostjobs;

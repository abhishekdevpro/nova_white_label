import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setDesiredCareerProfile } from "../../store/reducers/jobsMyResumeSlice";

const DesiredCareerComponent = () => {
  const [careerprofile, setCareerProfile] = useState(false);
  const desiredCareerProfile = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.desiredCareerProfile
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setDesiredCareerProfile({ ...desiredCareerProfile, [name]: value })
    );
  };
  return (
    <div>
      <div className="d-flex">
        <h5 className="m-b30">Desired Career Profile</h5>
        <Link
          to={"#"}
          onClick={() => setCareerProfile(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      <Modal
        className="modal fade modal-bx-info editor"
        show={careerprofile}
        onHide={setCareerProfile}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="DesiredprofileModalLongTitle">
                Desired Career Profile{" "}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setCareerProfile(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="industry">Industry</label>
                      {/* <Form.Control as="select" name="industry" id="industry" onChange={handleChange} value={desiredCareerProfile.industry}>
                        <option>Accounting / Finance</option>
                        <option>Banking / Financial Services / Broking</option>
                        <option>Education / Teaching / Training</option>
                        <option>IT-Hardware &amp; Networking</option>
                        <option>Other</option>
                      </Form.Control> */}
                      <input
                        type="text"
                        name="industry"
                        id="industry"
                        onChange={handleChange}
                        value={desiredCareerProfile.industry}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="functionalArea">
                        Functional Area / Department
                      </label>
                      {/* <Form.Control as="select">
                        <option>Agent</option>
                        <option>Architecture / Interior Design</option>
                        <option>Beauty / Fitness / Spa Services</option>
                        <option>IT Hardware / Technical Support</option>
                        <option>IT Software - System Programming</option>
                        <option>Other</option>
                      </Form.Control> */}
                      <input
                        type="text"
                        name="functionalArea"
                        id="functionalArea"
                        onChange={handleChange}
                        value={desiredCareerProfile.functionalArea}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      {/* <Form.Control as="select">
                        <option>Creative</option>
                        <option>Web Designer</option>
                        <option>Graphic Designer</option>
                        <option>National Creative Director</option>
                        <option>Fresher</option>
                        <option>Other</option>
                      </Form.Control> */}
                      <input
                        type="text"
                        name="role"
                        id="role"
                        onChange={handleChange}
                        value={desiredCareerProfile.role}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="jobType">Job Type</label>
                      <input
                        type="text"
                        name="jobType"
                        id="jobType"
                        onChange={handleChange}
                        value={desiredCareerProfile.jobType}
                        className="form-control"
                      />
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="permanent"
                              name="example1"

                            />
                            <label
                              className="custom-control-label"
                              htmlFor="permanent"
                            >
                              Permanent
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="contractual"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="contractual"
                            >
                              Contractual
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="employmentType">Employment Type</label>
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="fulltime"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="fulltime"
                            >
                              Full Time
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="parttime"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="parttime"
                            >
                              Part Time
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <input
                        type="text"
                        name="employmentType"
                        id="employmentType"
                        onChange={handleChange}
                        value={desiredCareerProfile.employmentType}
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Preferred Shift</label>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="day"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="day"
                            >
                              Day
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="night"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="night"
                            >
                              Night
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="flexible"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="flexible"
                            >
                              Part Time
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-6">
                    <div className="d-flex flex-column form-group">
                      <label htmlFor="availabilityToJoin">
                        Availability to Join
                      </label>
                      <input
                        type="date"
                        name="availabilityToJoin"
                        id="availabilityToJoin"
                        onChange={handleChange}
                        value={desiredCareerProfile.availabilityToJoin}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="expectedSalary">Expected Salary</label>
                      <input
                        type="text"
                        name="expectedSalary"
                        id="expectedSalary"
                        onChange={handleChange}
                        value={desiredCareerProfile.expectedSalary}
                        className="form-control"
                      />
                      {/* <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="usdollars"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="usdollars"
                            >
                              US Dollars
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="rupees"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="rupees"
                            >
                              Indian Rupees
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <Form.Control as="select">
                            <option>0 lakh</option>
                            <option>1 lakh</option>
                            <option>2 lakh</option>
                            <option>5 lakh</option>
                            <option>4 lakh</option>
                            <option>5 lakh</option>
                          </Form.Control>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <Form.Control as="select">
                            <option> 05 Thousand </option>
                            <option> 10 Thousand </option>
                            <option> 15 Thousand </option>
                            <option> 20 Thousand </option>
                            <option> 25 Thousand </option>
                            <option> 30 Thousand </option>
                            <option> 35 Thousand </option>
                            <option> 40 Thousand </option>
                            <option> 45 Thousand </option>
                            <option> 50 Thousand </option>
                          </Form.Control>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="desiredLocation">Desired Location</label>
                      {/* <Form.Control as="select">
                        <option>India</option>
                        <option>Australia</option>
                        <option>Bahrain</option>
                        <option>China</option>
                        <option>Dubai</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Hong Kong</option>
                        <option>Kuwait</option>
                      </Form.Control> */}
                      <input
                        type="text"
                        name="desiredLocation"
                        id="desiredLocation"
                        value={desiredCareerProfile.desiredLocation}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="desiredIndustry">Desired Industry</label>
                      {/* <Form.Control as="select">
                        <option>Software</option>
                        <option>Factory</option>
                        <option>Ngo</option>
                        <option>Other</option>
                      </Form.Control> */}
                      <input
                        type="text"
                        name="desiredIndustry"
                        id="desiredIndustry"
                        onChange={handleChange}
                        value={desiredCareerProfile.desiredIndustry}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                onClick={() => setCareerProfile(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => setCareerProfile(false)}
                type="button"
                className="site-button"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          {desiredCareerProfile.industry ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Industry</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.industry}
              </span>
            </div>
          ) : null}
          {desiredCareerProfile.role ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Role</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.role}
              </span>
            </div>
          ) : null}
          {desiredCareerProfile.employmentType ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Employment Type</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.employmentType}
              </span>
            </div>
          ) : null}

          {desiredCareerProfile.availabilityToJoin ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Availability to Join</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.availabilityToJoin}
              </span>
            </div>
          ) : null}

          {desiredCareerProfile.desiredLocation ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Location</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.desiredLocation}
              </span>
            </div>
          ) : null}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          {desiredCareerProfile.functionalArea ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Functional Area</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.functionalArea}
              </span>
            </div>
          ) : null}

          {desiredCareerProfile.jobType ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Job Type</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.jobType}
              </span>
            </div>
          ) : null}
          {desiredCareerProfile.desiredShift ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Shift</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.desiredShift}
              </span>
            </div>
          ) : null}

          {desiredCareerProfile.expectedSalary ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Expected Salary</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.expectedSalary}
              </span>
            </div>
          ) : null}
          {desiredCareerProfile.desiredIndustry ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Industry</label>
              <span className="clearfix font-13">
                {desiredCareerProfile.desiredIndustry}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DesiredCareerComponent;

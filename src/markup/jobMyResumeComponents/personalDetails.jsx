import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPersonalDetailsValue } from "../../store/reducers/jobsMyResumeSlice";

const PersonalDetailsComponent = () => {
  const dispatch = useDispatch();
  const personalDetails = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.personalDetailsValue
  );
  const [personaldetails, setPersonalDetails] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPersonalDetailsValue({ ...personalDetails, [name]: value }));
  };
  return (
    <div>
      {" "}
      <div className="d-flex">
        <h5 className="m-b30">Personal Details</h5>
        <Link
          to={"#"}
          onClick={() => setPersonalDetails(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      <Modal
        className="modal fade modal-bx-info editor"
        show={personaldetails}
        onHide={setPersonalDetails}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="PersonaldetailsModalLongTitle">
                Personal Details
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setPersonalDetails(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      {/* <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                          </Form.Control>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <Form.Control as="select">
                            <option>january</option>
                            <option>february</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </Form.Control>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <Form.Control as="select">
                            <option>2018</option>
                            <option>2017</option>
                            <option>2016</option>
                            <option>2015</option>
                            <option>2014</option>
                            <option>2013</option>
                            <option>2012</option>
                            <option>2011</option>
                            <option>2010</option>
                            <option>2009</option>
                            <option>2008</option>
                            <option>2007</option>
                            <option>2006</option>
                            <option>2005</option>
                            <option>2004</option>
                            <option>2003</option>
                            <option>2002</option>
                            <option>2001</option>
                          </Form.Control>
                        </div>
                      </div> */}
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        onChange={handleChange}
                        value={personalDetails.dateOfBirth}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="male"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="male"
                            >
                              Male
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="female"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <input
                        type="text"
                        name="gender"
                        id="gender"
                        onChange={handleChange}
                        value={personalDetails.gender}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="addPermanentAddress">
                        Permanent Address
                      </label>
                      <input
                        type="text"
                        name="addPermanentAddress"
                        id="addPermanentAddress"
                        onChange={handleChange}
                        value={personalDetails.addPermanentAddress}
                        className="form-control"
                        placeholder="Enter Your Permanent Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="homeTown">Hometown</label>
                      <input
                        type="text"
                        id="homeTown"
                        name="homeTown"
                        onChange={handleChange}
                        value={personalDetails.homeTown}
                        className="form-control"
                        placeholder="Enter Hometown"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="areaPinCode">Pincode</label>
                      <input
                        type="text"
                        name="areaPinCode"
                        id="areaPinCode"
                        onChange={handleChange}
                        value={personalDetails.areaPinCode}
                        className="form-control"
                        placeholder="Enter Pincode"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="maritalStatus">Marital Status</label>
                      <select
                        name="maritalStatus"
                        id="maritalStatus"
                        onChange={handleChange}
                        className="form-control"
                        value={personalDetails.maritalStatus}
                      >
                        <option>Married</option>
                        <option>Single / Unmarried</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="passportNumber">Passport Number</label>
                      <input
                        type="text"
                        id="passportNumber"
                        name="passportNumber"
                        onChange={handleChange}
                        value={personalDetails.passportNumber}
                        className="form-control"
                        placeholder="Enter Passport Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="languages">Languages</label>
                      <input
                        type="text"
                        id="languages"
                        name="languages"
                        onChange={handleChange}
                        value={personalDetails.languages}
                        className="form-control"
                        placeholder="Enter Passport Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="differentlyAbled">
                        Differently Abled?
                      </label>
                      <input
                        type="text"
                        name="differentlyAbled"
                        id="differentlyAbled"
                        onChange={handleChange}
                        value={personalDetails.differentlyAbled}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="workPermitOfOtherCountry">
                        Work Permit for Other Countries
                      </label>
                      <Form.Control
                        as="select"
                        name="workPermitOfOtherCountry"
                        id="workPermitOfOtherCountry"
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option>India</option>
                        <option>Australia</option>
                        <option>Bahrain</option>
                        <option>China</option>
                        <option>Dubai</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Hong Kong</option>
                        <option>Kuwait</option>
                      </Form.Control>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                onClick={() => setPersonalDetails(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => setPersonalDetails(false)}
                type="button"
                className="site-button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          {personalDetails.dateOfBirth ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Date of Birth</label>
              <span className="clearfix font-13">
                {personalDetails.dateOfBirth}
              </span>
            </div>
          ) : null}
          {personalDetails.gender ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Gender</label>
              <span className="clearfix font-13">{personalDetails.gender}</span>
            </div>
          ) : null}

          {personalDetails.maritalStatus ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Marital Status</label>
              <span className="clearfix font-13">
                {personalDetails.maritalStatus}
              </span>
            </div>
          ) : null}

          {personalDetails.passportNumber ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Passport Number</label>
              <span className="clearfix font-13">
                {personalDetails.passportNumber}
              </span>
            </div>
          ) : null}

          {personalDetails.differentlyAbled ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Differently Abled</label>
              <span className="clearfix font-13">
                {personalDetails.differentlyAbled}
              </span>
            </div>
          ) : null}

          {personalDetails.languages ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Languages</label>
              <span className="clearfix font-13">
                {personalDetails.languages}
              </span>
            </div>
          ) : null}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          {personalDetails.addPermanentAddress ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Permanent Address</label>
              <span className="clearfix font-13">
                {personalDetails.addPermanentAddress}
              </span>
            </div>
          ) : null}

          {personalDetails.areaPinCode ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Area Pin Code</label>
              <span className="clearfix font-13">
                {personalDetails.areaPinCode}
              </span>
            </div>
          ) : null}

          {personalDetails.homeTown ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Hometown</label>
              <span className="clearfix font-13">
                {personalDetails.homeTown}
              </span>
            </div>
          ) : null}

          {personalDetails.workPermitOfOtherCountry ? (
            <div className="clearfix m-b20">
              <label className="m-b0">Work permit of other country</label>
              <span className="clearfix font-13">
                {personalDetails.workPermitOfOtherCountry}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsComponent;

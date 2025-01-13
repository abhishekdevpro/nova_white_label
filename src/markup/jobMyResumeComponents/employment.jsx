import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setEmploymentData,
  setEmploymentValues,
} from "../../store/reducers/jobsMyResumeSlice";
import { FaEdit } from "react-icons/fa";

const EmploymentComponent = () => {
  const dispatch = useDispatch();
  const employmentData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.employmentData
  );
  const employmentValues = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.employmentValues
  );
  const [employment, setEmployment] = useState(false);

  const [editIndex, setEditIndex] = useState(-1);

  const updateItem = () => {
    if (editIndex === -1) {
      return;
    }

    const updatedFormData = [...employmentData];
    updatedFormData[editIndex] = {
      ...updatedFormData[editIndex],
      ...employmentValues,
    };
    dispatch(setEmploymentData(updatedFormData));
    setEmployment(false);
    dispatch(
      setEmploymentValues({
        jobTitle: "",
        company: "",
        jobStartDate: "",
        jobEndDate: "",
        jobDescription: "",
      })
    );
    setEditIndex(-1);
  };

  const editItem = (index) => {
    const item = employmentData[index];
    const editData = {
      jobTitle: item.jobTitle,
      company: item.company,
      jobStartDate: item.jobStartDate,
      jobEndDate: item.jobEndDate,
      jobDescription: item.jobDescription,
    };
    dispatch(setEmploymentValues(editData));
    setEditIndex(index);
    setEmployment(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEmploymentValues({ ...employmentValues, [name]: value }));
  };

  const handleAdd = () => {
    if (editIndex !== -1) {
      return;
    }
    const trimmedJobTitle = employmentValues.jobTitle.trim();
    const trimmedCompany = employmentValues.company.trim();
    const trimmedStartDate = employmentValues.jobStartDate.trim();
    const trimmedEndDate = employmentValues.jobEndDate.trim();
    const trimmedJobDescription = employmentValues.jobDescription.trim();

    if (
      trimmedJobTitle &&
      trimmedCompany &&
      trimmedStartDate &&
      trimmedEndDate &&
      trimmedJobDescription
    ) {
      const newItem = {
        jobTitle: trimmedJobTitle,
        company: trimmedCompany,
        jobStartDate: trimmedStartDate,
        jobEndDate: trimmedEndDate,
        jobDescription: trimmedJobDescription,
      };
      const newEmployementData = [...employmentData, newItem];
      dispatch(setEmploymentData(newEmployementData));
      dispatch(
        setEmploymentValues({
          jobTitle: "",
          company: "",
          jobStartDate: "",
          jobEndDate: "",
          jobDescription: "",
        })
      );
      setEmployment(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="d-flex">
        <h5 className="m-b15 text-break">Employment</h5>
        <Link
          to={"#"}
          data-toggle="modal"
          onClick={() => setEmployment(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-plus m-r5"></i> Add
        </Link>
      </div>
      {employmentData ? (
        <div >
          {employmentData.map((item, index) => {
            return (
              <div key={index} className="text-break">
                <div
                  className="d-flex justify-content-between align-items-center px-3 "
                  style={{ gap: "20px" }}
                >
                  <div style={{ width: "80%" }}>
                    <h6 className="font-14 m-b0">{item.jobTitle}</h6>
                    <p className="m-b0">{item.company}</p>
                    <p className="m-b0">
                      {item.jobStartDate} {item.jobEndDate}
                    </p>
                    <p className="m-b0">{item.jobDescription}</p>
                  </div>
                  <button
                    onClick={() => editItem(index)}
                    className="site-button row justify-content-center  align-items-center "
                    style={{ gap: "7px", width: "20%" }}
                  >
                    Edit <FaEdit />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <Modal
        show={employment}
        onHide={setEmployment}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EmploymentModalLongTitle">
                Add Employment
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setEmployment(false);
                  dispatch(
                    setEmploymentValues({
                      jobTitle: "",
                      company: "",
                      jobStartDate: "",
                      jobEndDate: "",
                      jobDescription: "",
                    })
                  );
                  setEditIndex(-1);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="jobTitle">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        onChange={handleChange}
                        value={employmentValues?.jobTitle}
                        className="form-control"
                        placeholder="Enter Your Designation"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="company">Your Organization</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        onChange={handleChange}
                        value={employmentValues?.company}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Is this your current company?</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="employ_yes"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="employ_yes"
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="employ_no"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="employ_no"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Started Working From</label>
                      <div className="row">
                        <div className="col-lg-6 col-12 d-flex flex-column  ">
                          <label htmlFor="jobStartDate">Start Date</label>
                          <input
                            type="date"
                            name="jobStartDate"
                            id="jobStartDate"
                            value={employmentValues.jobStartDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-lg-6 col-12 d-flex flex-column ">
                          <label htmlFor="jobEndDate">End Date</label>
                          <input
                            type="date"
                            name="jobEndDate"
                            id="jobEndDate"
                            value={employmentValues.jobEndDate}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="jobDescription">
                        Describe your Job Profile
                      </label>
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        onChange={handleChange}
                        value={employmentValues.jobDescription}
                        className="form-control"
                        placeholder="Type Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="site-button"
                onClick={() => {
                  setEmployment(false);
                  dispatch(
                    setEmploymentValues({
                      jobTitle: "",
                      company: "",
                      jobStartDate: "",
                      jobEndDate: "",
                      jobDescription: "",
                    })
                  );
                  setEditIndex(-1);
                }}
              >
                Cancel
              </button>
              <button onClick={handleAdd} type="button" className="site-button">
                Save
              </button>
              <button
                onClick={updateItem}
                type="button"
                className="site-button"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmploymentComponent;

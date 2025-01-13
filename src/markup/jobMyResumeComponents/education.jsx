import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setEducationData,
  setEducationValues,
} from "../../store/reducers/jobsMyResumeSlice";
import { FaEdit } from "react-icons/fa";

const EducationComponent = () => {
  const educationData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.educationData
  );
  const educationValues = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.educationValues
  );
  const [education, setEducation] = useState(false);
  const dispatch = useDispatch();

  const [editIndex, setEditIndex] = useState(-1);

  const updateItem = () => {
    if (editIndex === -1) {
      return;
    }

    const updatedFormData = [...educationData];
    updatedFormData[editIndex] = {
      ...updatedFormData[editIndex],
      ...educationValues,
    };
    dispatch(setEducationData(updatedFormData));
    dispatch(
      setEducationValues({
        education: "",
        course: "",
        passOutDate: "",
        university: "",
      })
    );
    setEducation(false);
    setEditIndex(-1);
  };

  const editItem = (index) => {
    const item = educationData[index];
    const editData = {
      education: item.education,
      course: item.course,
      passOutDate: item.passOutDate,
      university: item.university,
    };
    dispatch(setEducationValues(editData));
    setEditIndex(index);
    setEducation(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEducationValues({ ...educationValues, [name]: value }));
  };

  const handleAdd = () => {
    if (editIndex !== -1) {
      return;
    }

    const trimmedEducation = educationValues.education.trim();
    const trimmedCourse = educationValues.course.trim();
    const trimmedPassOutDate = educationValues.passOutDate.trim();
    const trimmedUniversity = educationValues.university.trim();

    if (
      trimmedEducation &&
      trimmedCourse &&
      trimmedPassOutDate &&
      trimmedUniversity
    ) {
      const newItem = {
        education: trimmedEducation,
        course: trimmedCourse,
        passOutDate: trimmedPassOutDate,
        university: trimmedUniversity,
      };
      const newData = [...educationData, newItem];

      dispatch(setEducationData(newData));

      dispatch(
        setEducationValues({
          education: "",
          course: "",
          passOutDate: "",
          university: "",
        })
      );
      setEducation(false);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <h5 className="m-b15">Education</h5>
        <Link
          to={"#"}
          onClick={() => setEducation(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-plus m-r5"></i> Add
        </Link>
      </div>
      <p>
        Mention your employment details including your current and previous
        company work experience
      </p>

      <Modal
        className="modal fade modal-bx-info editor"
        show={education}
        onHide={setEducation}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EducationModalLongTitle">
                Education
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setEducation(false);
                  dispatch(
                    setEducationValues({
                      education: "",
                      course: "",
                      passOutDate: "",
                      university: "",
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
                      <label htmlFor="education">Education</label>
                      <Form.Control
                        as="select"
                        name="education"
                        id="education"
                        onChange={handleChange}
                        value={educationValues.education}
                      >
                        <option>Doctorate/PhD</option>
                        <option>Masters/Post-Graduation</option>
                        <option>Graduation/Diploma</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="course">Course</label>
                      <input
                        type="text"
                        className="form-control"
                        name="course"
                        id="course"
                        onChange={handleChange}
                        value={educationValues.course}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="passOutDate">Pass Out</label>
                      <input
                        type="date"
                        className="form-control"
                        name="passOutDate"
                        id="passOutDate"
                        onChange={handleChange}
                        value={educationValues.passOutDate}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="university">University/Institute</label>
                      <input
                        type="text"
                        className="form-control"
                        name="university"
                        id="university"
                        onChange={handleChange}
                        value={educationValues.university}
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
                onClick={() => {
                  setEducation(false);
                  dispatch(
                    setEducationValues({
                      education: "",
                      course: "",
                      passOutDate: "",
                      university: "",
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
      {educationData ? (
        <div className="row">
          {educationData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center justify-content-between "
              >
                <div className="clearfix m-b20" style={{ width: "80%" }}>
                  <label className="m-b0">
                    {item.education} {item.university}
                  </label>
                  <span className="clearfix font-13">{item.course}</span>
                  <span className="clearfix font-13">{item.passOutDate}</span>
                </div>
                <button
                  onClick={() => editItem(index)}
                  className="site-button row align-items-center justify-content-center "
                  style={{ gap: "7px", width: "20%" }}
                >
                  Edit <FaEdit />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default EducationComponent;

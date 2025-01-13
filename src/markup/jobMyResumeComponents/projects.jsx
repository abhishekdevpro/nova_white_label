import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setProjectsData,
  setProjectsValue,
} from "../../store/reducers/jobsMyResumeSlice";
import { FaEdit } from "react-icons/fa";

const ProjectsComponent = () => {
  const [projects, setProjects] = useState(false);
  const dispatch = useDispatch();
  const projectsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.projectsData
  );
  const projectsValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.projectsValue
  );
  const [editIndex, setEditIndex] = useState(-1);

  const updateItem = () => {
    if (editIndex === -1) return;

    const updatedFormData = [...projectsData];
    updatedFormData[editIndex] = {
      ...updatedFormData[editIndex],
      ...projectsValue,
    };
    dispatch(setProjectsData(updatedFormData));
    setProjects(false);
    dispatch(
      setProjectsValue({
        projectTitle: "",
        clientName: "",
        projectStatus: "",
        workStarted: "",
        workedTill: "",
        projectDescription: "",
      })
    );
    setEditIndex(-1);
  };

  const editItem = (index) => {
    const item = projectsData[index];
    const editData = {
      projectTitle: item.projectTitle,
      clientName: item.clientName,
      projectStatus: item.projectStatus,
      workStarted: item.workStarted,
      workedTill: item.workedTill,
      projectDescription: item.projectDescription,
    };
    dispatch(setProjectsValue(editData));
    setEditIndex(index);
    setProjects(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProjectsValue({ ...projectsValue, [name]: value }));
  };

  const handleAdd = () => {
    if (editIndex !== -1) {
      return;
    }
    const trimmedProjectTitle = projectsValue.projectTitle.trim();
    const trimmedClientName = projectsValue.clientName.trim();
    const trimmedProjectStatus = projectsValue.projectStatus.trim();
    const trimmedWorkStarted = projectsValue.workStarted.trim();
    const trimmedWorkedTill = projectsValue.workedTill.trim();
    const trimmedDescription = projectsValue.projectDescription.trim();

    if (
      trimmedProjectTitle &&
      trimmedClientName &&
      trimmedProjectStatus &&
      trimmedWorkStarted &&
      trimmedWorkedTill &&
      trimmedDescription
    ) {
      const newItem = {
        projectTitle: trimmedProjectTitle,
        clientName: trimmedClientName,
        projectStatus: trimmedProjectStatus,
        workStarted: trimmedWorkStarted,
        workedTill: trimmedWorkedTill,
        projectDescription: trimmedDescription,
      };

      const newData = [...projectsData, newItem];
      dispatch(setProjectsData(newData));
      dispatch(
        setProjectsValue({
          projectTitle: "",
          clientName: "",
          projectStatus: "",
          workStarted: "",
          workedTill: "",
          projectDescription: "",
        })
      );
      setProjects(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="d-flex">
        <h5 className="m-b15">Projects</h5>
        <Link
          to={"#"}
          onClick={() => setProjects(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-plus m-r5"></i> Add
        </Link>
      </div>
      {projectsData ? (
        <div>
          {projectsData.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center "
              >
                <div>
                  <h6 className="font-14 m-b0">{item.projectTitle}</h6>
                  <p className="m-b0">{item.clientName}</p>
                  <p className="m-b0">{item.projectStatus}</p>
                  <p className="m-b0">
                    {item.workStarted} {" - "} {item.workedTill}
                  </p>
                  <p className="m-b0">{item.projectDescription}</p>
                </div>
                <button
                  onClick={() => editItem(index)}
                  className="d-flex align-items-center site-button"
                  style={{ gap: "7px" }}
                >
                  Edit
                  <FaEdit />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
      <Modal
        className="modal fade modal-bx-info editor"
        show={projects}
        onHide={setProjects}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ProjectsModalLongTitle">
                Add Projects
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  dispatch(
                    setProjectsValue({
                      projectTitle: "",
                      clientName: "",
                      projectStatus: "",
                      workStarted: "",
                      workedTill: "",
                      projectDescription: "",
                    })
                  );
                  setProjects(false);
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
                      <label htmlFor="projectTitle">Project Title</label>
                      <input
                        type="email"
                        name="projectTitle"
                        id="projectTitle"
                        onChange={handleChange}
                        value={projectsValue.projectTitle}
                        className="form-control"
                        placeholder="Enter Project Title"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Tag this project with your Employment/Education
                      </label>
                      <select>
                        <option>Class 12th</option>
                        <option>Class 10th</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="clientName">Client</label>
                      <input
                        type="email"
                        id="clientName"
                        name="clientName"
                        onChange={handleChange}
                        value={projectsValue.clientName}
                        className="form-control"
                        placeholder="Enter Client Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group d-flex flex-column ">
                      <label>Project Status</label>
                      <input
                        type="text"
                        name="projectStatus"
                        id="projectStatus"
                        onChange={handleChange}
                        className="form-control"
                        value={projectsValue.projectStatus}
                        placeholder="Project Status"
                      />
                      {/* <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="inprogress"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="inprogress"
                            >
                              In Progress
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="finished"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="finished"
                            >
                              Finished
                            </label>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>Started Working From</label>
                      {/* <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
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
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
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
                      </div> */}
                      <input
                        type="date"
                        name="workStarted"
                        id="workStarted"
                        className="form-control"
                        onChange={handleChange}
                        value={projectsValue.workStarted}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>Worked Till</label>
                      <input
                        type="date"
                        name="workedTill"
                        id="workedTill"
                        onChange={handleChange}
                        value={projectsValue.workedTill}
                        className="form-control"
                      />
                      {/* <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
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
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
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
                      </div> */}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="projectDescription">
                        Details of Project
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Type Description"
                        name="projectDescription"
                        id="projectDescription"
                        onChange={handleChange}
                        value={projectsValue.projectDescription}
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
                  dispatch(
                    setProjectsValue({
                      projectTitle: "",
                      clientName: "",
                      projectStatus: "",
                      workStarted: "",
                      workedTill: "",
                      projectDescription: "",
                    })
                  );
                  setProjects(false);
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

export default ProjectsComponent;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkillsData,
  setSkillsValue,
} from "../../store/reducers/jobsMyResumeSlice";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const SkillsComponent = () => {
  const [keyskill, setKeyskill] = useState(false);
  const dispatch = useDispatch();
  const skillsValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.skillsValue
  );
  const skillsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.skillsData
  );
  const handleSkillChange = (event) => {
    dispatch(setSkillsValue({ skills: event.target.value }));
  };
  const [keySkillModalOpen, setKeySkillModalOpen] = useState(false);

  //Edit Item Function
  const [editSkillIndex, setEditSkillIndex] = useState(-1);
  const updateSkillItem = () => {
    if (editSkillIndex === -1) {
      return;
    }
    const updatedSkills = [...skillsData];
    updatedSkills[editSkillIndex] = skillsValue.skills.trim();
    dispatch(setSkillsData(updatedSkills));
    dispatch(setSkillsValue({ skills: "" }));
    setKeySkillModalOpen(false);
    setEditSkillIndex(-1);
  };

  const editSkillItem = (index) => {
    const skillToEdit = skillsData[index];
    dispatch(setSkillsValue({ skills: skillToEdit }));
    setEditSkillIndex(index);
    setKeySkillModalOpen(true);
  };

  //Editing Functionality Ends here

  // handle add functionality starts in skills Component

  const handleAddSkill = () => {
    if (editSkillIndex !== -1) {
      return;
    }
    const trimmedSkill = skillsValue.skills.trim();
    if (trimmedSkill) {
      const newSkillData = [...skillsData, trimmedSkill];
      dispatch(setSkillsData(newSkillData));
      dispatch(setSkillsValue({ skills: "" }));
      setKeySkillModalOpen(false);
    }
  };

  // handle Add Functionality ends

  return (
    <div>
      <div className="d-flex">
        <h5 className="m-b15">Key Skills</h5>
        <Link
          to={"#"}
          data-toggle="modal"
          data-target="#keyskills"
          onClick={() => setKeySkillModalOpen(true)}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-plus m-r5"></i> Add
        </Link>
      </div>
      {skillsData ? (
        <div className="job-time row mr-auto">
          {skillsData.map((item, index) => {
            return (
              <Link key={index} to={"#"} className="mr-1  ">
                <span
                  className="d-flex align-items-center "
                  style={{ gap: "7px" }}
                >
                  {item}
                  <FaEdit onClick={() => editSkillItem(index)} />
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}

      <Modal
        className="modal fade modal-bx-info editor"
        show={keySkillModalOpen}
        onHide={() => setKeySkillModalOpen(false)}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="KeyskillsModalLongTitle">
                Key Skills
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setKeySkillModalOpen(false);
                  dispatch(setSkillsValue({ skills: "" }));
                  setEditSkillIndex(-1);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                It is the first thing recruiters notice in your profile. Write
                concisely what makes you unique and right person for the job you
                are looking for.
              </p>
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label htmlFor="skills">Skills</label>
                      <input
                        type="text"
                        id="skills"
                        name="skills"
                        onChange={handleSkillChange}
                        className="form-control tags_input"
                        value={skillsValue.skills}
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
                  setKeySkillModalOpen(false);
                  dispatch(setSkillsValue({ skills: "" }));
                  setEditSkillIndex(-1);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="site-button"
                onClick={handleAddSkill}
              >
                Save
              </button>
              <button
                type="button"
                className="site-button"
                onClick={updateSkillItem}
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

export default SkillsComponent;

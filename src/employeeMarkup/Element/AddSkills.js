import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkillsData,
  setSkillsValues,
} from "../../store/reducers/postAJobSlice";

const AddSkills = () => {
  const dispatch = useDispatch();
  // const [skills, setSkills] = useState([
  //   "Skill 1",
  //   "Skill 2",
  //   "Skill 3",
  //   "Skill 4",
  //   "Skill 5",
  //   "Skill 6",
  //   "Skill 7",
  //   "Skill 8",
  //   "Skill 9",
  //   "Skill 10",
  // ]);
  // const [newSkill, setNewSkill] = useState("");
  const skillsValues = useSelector((state) => state.postAJobSlice.skillsValues);
  const skillsData = useSelector((state) => state.postAJobSlice.skillsData);

  const handleChange = (e) => {
    dispatch(setSkillsValues(e.target.value));
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skillsData];
    updatedSkills.splice(index, 1);
    dispatch(setSkillsData(updatedSkills));
  };

  const handleAddSkill = () => {
    if (skillsValues) {
      const newSkillData = [...skillsData, skillsValues];
      dispatch(setSkillsData(newSkillData));
      dispatch(setSkillsValues(""));
    }
  };

  console.log(skillsValues, skillsData);
  return (
    <div>
      <div>
        {skillsData.map((skill, index) => (
          <React.Fragment key={index}>
            <ListGroup.Item
              style={{
                backgroundColor: "#e1e7ff",
                color: "#1c2957",
                display: "inline-block",
                margin: "5px",
                padding: "5px 15px",
                borderRadius: "10px",
              }}
            >
              <span className="d-flex justify-content-center align-items-center">
                {skill}{" "}
                <FaTimes
                  onClick={() => handleDeleteSkill(index)}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </span>
            </ListGroup.Item>
          </React.Fragment>
        ))}
      </div>
      <Form.Group>
        <Form.Control
          type="text"
          value={skillsValues}
          onChange={handleChange}
          placeholder="Enter new skill"
          style={{ marginTop: "15px" }}
        />
      </Form.Group>
      <button
        onClick={handleAddSkill}
        className="site-button d-flex justify-content-center align-items-center"
      >
        Add Skill <FaPlus className="ml-2" />
      </button>
    </div>
  );
};

export default AddSkills;

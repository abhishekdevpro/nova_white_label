// SkillComponent.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkillsValues,
  setSkillsData,
  deleteSkill,
} from "../../store/reducers/skillSlice";
import { FaCirclePlus, FaCircleXmark, FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { setSkillInput } from "../../store/reducers/skillSlice";

function SkillComponent(props) {
  const skillsValues = useSelector((state) => state.skills.skillsValues);
  const skillsData = useSelector((state) => state.skills.skillsData);
  const dispatch = useDispatch();
  const inputValues = useSelector((state) => state.skillInputs);

  const [addItem4, setAddItem4] = useState(false);
  const showAddItem4 = () => {
    setAddItem4((prev) => !prev);
  };

  const handleSkillChange = (event, setter) => {
    dispatch(setter(event.target.value));
    dispatch(setSkillsValues({ skills: event.target.value })); // Change this line
  };

  //Edit Item Function
  const [editIndex, setEditIndex] = useState(-1);

  const updateItem = () => {
    if (editIndex !== -1) {
      const updatedFormData = [...skillsData];
      updatedFormData[editIndex] = skillsValues.skills;
      dispatch(setSkillsData(updatedFormData));
      dispatch(setSkillInput(""));
      dispatch(setSkillsValues({ skills: "" }));
      setEditIndex(-1);
    }
  };

  const editItem = (index) => {
    dispatch(setSkillsValues({ skills: skillsData[index] }));
    dispatch(setSkillInput(skillsData[index]));
    setEditIndex(index);
  };

  //Editing Functionality Ends here
  const handleAddSkill = () => {
    if (editIndex !== -1) {
      return;
    }
    const trimmedSkill = skillsValues.skills.trim();
    if (trimmedSkill) {
      const newSkillData = [...skillsData, trimmedSkill];
      dispatch(setSkillsData(newSkillData));
      dispatch(setSkillsValues({ skills: "" }));
      dispatch(setSkillInput(""));
    }
  };
  return (
    <div className="w-full flex flex-col mb-5 items-start">
      <h2 className="text-lg font-semibold">Skills</h2>
      <p>
        Highlight specific skills that show you fit the position. Make Sure they
        match the key skills mentioned in the job listing (especially when
        applying via an online system)
      </p>
      <h3
        onClick={showAddItem4}
        className="font-semibold my-3 flex gap-2 cursor-pointer items-center"
      >
        Add Item {addItem4 ? <FaCircleXmark /> : <FaCirclePlus />}
      </h3>
      {addItem4 ? (
        <div className="flex gap-x-6 flex-wrap items-baseline w-full">
          <input
            className="w-4/5 h-12 bg-cosretBlue-300 px-3 text-black text-sm outline-none border-[0.5px] border-[#323232] rounded-lg"
            type="text"
            id="skills"
            name="skills"
            placeholder="Skills"
            onChange={(e) => handleSkillChange(e, setSkillInput)}
            value={inputValues.skillInput}
          />
          <button
            onClick={handleAddSkill}
            className="px-4 text-white rounded-md mt-4 py-2 bg-clearanceGrey cursor-pointer hover:bg-clearanceDarkBlue"
          >
            Done
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 my-6">
        {skillsData.map((data, index) => {
          return (
            <div
              key={index}
              className="flex justify-between gap-2 bg-clearanceGrey py-2 items-center rounded-lg px-4 text-white"
            >
              <h3>{data}</h3>

              <div className="flex gap-2">
                {editIndex === index ? (
                  <button
                    onClick={() => {
                      updateItem();
                    }}
                  >
                    <h2>Save</h2>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      editItem(index);
                    }}
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch(deleteSkill(index));
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillComponent;

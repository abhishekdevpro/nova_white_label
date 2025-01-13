import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPostAJobData } from "../../store/reducers/postAJobSlice";

export default function QualificationSetting() {
  const dispatch = useDispatch();
  const postAJobData = useSelector((state) => state.postAJobSlice.postAJobData);

  const handleChange = (value) => {
    dispatch(setPostAJobData({ ...postAJobData, qualificationSetting: value }));
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={postAJobData.qualificationSetting}
        onChange={handleChange}
        style={{ height: "200px", width: "100%", marginBottom: "70px" }}
      />
    </div>
  );
}

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { setPostAJobData } from "../../store/reducers/postAJobSlice";

export default function TextEditor() {
  const dispatch = useDispatch();
  const postAJobData = useSelector((state) => state.postAJobSlice.postAJobData);

  const handleChange = (value) => {
    dispatch(setPostAJobData({ ...postAJobData, description: value }));
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={postAJobData.description}
        onChange={handleChange}
        style={{ height: "200px", width: "100%", marginBottom: "70px", border: "1px solid #ccc" }}
      />
    </div>
  );
}

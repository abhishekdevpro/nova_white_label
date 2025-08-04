
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange, maxLength = 500 }) => {
  const quillRef = useRef(null);

  const handleEditorChange = (content, delta, source, editor) => {
    const plainText = editor.getText().trim();

    // Allow deleting or editing within the limit
    if (plainText.length <= maxLength) {
      onChange(content);
    } else {
      // Prevent further input
      const currentEditor = quillRef.current.getEditor();
      const selection = currentEditor.getSelection();

      // Remove the extra characters
      currentEditor.deleteText(maxLength, plainText.length);

      // Restore cursor position
      if (selection) {
        currentEditor.setSelection(selection.index - (plainText.length - maxLength));
      }
    }
  };

  const getCharCount = () => {
    const div = document.createElement("div");
    div.innerHTML = value || "";
    return div.innerText.trim().length;
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleEditorChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        style={{border:"1px solid #ccc"}}
      />
      <div style={{ textAlign: "right", marginTop: "4px", fontSize: "12px", color: "#666", }}>
        {getCharCount()} / {maxLength} characters
      </div>
    </div>
  );
};

TextEditor.modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

TextEditor.formats = ["bold", "italic", "underline", "list", "bullet", "link"];

export default TextEditor;

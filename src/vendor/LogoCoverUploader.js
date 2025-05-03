import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LogoCoverUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
    }
  };

  return (
    <div className="logo-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="logo-upload"
      />
      <label
        htmlFor="logo-upload"
        className="cursor-pointer p-4 border-2 border-dashed rounded-lg flex items-center justify-center"
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected logo"
            className="max-h-32"
          />
        ) : (
          <span>Click to upload logo</span>
        )}
      </label>
    </div>
  );
};

export default LogoCoverUploader; 
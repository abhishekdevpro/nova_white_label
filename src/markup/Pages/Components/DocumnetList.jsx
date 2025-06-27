import React, { useState } from 'react';
import styled from 'styled-components';

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) =>
    props.status === 'Verified'
      ? '#155724'
      : props.status === 'Rejected'
      ? '#721c24'
      : '#856404'};
  background-color: ${(props) =>
    props.status === 'Verified'
      ? '#d4edda'
      : props.status === 'Rejected'
      ? '#f8d7da'
      : '#fff3cd'};
`;

const DocumentList = () => {
  const [docType, setDocType] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleUpload = () => {
    if (!docType || !file) {
      alert('Please select document type and file.');
      return;
    }

    const newDoc = { type: docType, name: file.name, status: 'In Progress' };
    setDocuments([...documents, newDoc]);
    setDocType('');
    setFile(null);
  };

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow">
      <h2 className="text-center mb-4">Upload Document</h2>

      <div className="mb-3">
        <label className="form-label">Document Type</label>
        <select
          className="form-select"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        >
          <option value="">Select Document Type</option>
          <option value="SSN">SSN</option>
          <option value="PassBook">PassBook</option>
          <option value="Resume">Resume</option>
          <option value="Experience Letter">Experience Letter</option>
          <option value="Cover Letter">Cover Letter</option>
          <option value="Education">Education</option>
          <option value="Certificate">Certificate</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Upload File</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf, .jpg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleUpload}>
        Upload
      </button>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Document Type</th>
            <th>File Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.type}</td>
              <td>{doc.name}</td>
              <td>
                <Badge status={doc.status}>{doc.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;

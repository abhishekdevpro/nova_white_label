import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const BulkResumeTable = ({resumes}) => {
  // const [resumes, setResumes] = useState([]);

  // useEffect(() => {
  //   const fetchResumes = async () => {
  //     try {
  //       const token = localStorage.getItem("vendorToken");

  //       if (!token) {
  //         console.error("Unauthorized. Please log in.");
  //         return;
  //       }

  //       const response = await axios.get(
  //         "https://apiwl.novajobs.us/api/admin/bulk-resume",
  //         {
  //           headers: { Authorization: token },
  //         }
  //       );

  //       if (response.data?.status === "success") {
  //         setResumes(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching resumes:", error);
  //     }
  //   };

  //   fetchResumes();
  // }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Bulk Resumes</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>

            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <tr key={index}>
                <td>{resume.name}</td>
                <td>{resume.email}</td>
                <td>{resume.contact_number}</td>
                <td>{resume.address}</td>

                <td>
                  <Button
                    variant="primary"
                    href={`https://apiwl.novajobs.us${resume.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No resumes found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BulkResumeTable;

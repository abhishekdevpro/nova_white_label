import React, { useState, useEffect } from "react";
import axios from "axios";

import { Award, CheckCircle, XCircle } from "lucide-react";

const LoadingSpinner = () => (
  <div className="d-flex align-items-center justify-content-center min-vh-50">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const SkillHistory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillHistory = async () => {
      try {
        const token = localStorage.getItem("jobSeekerLoginToken");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(
          "https://api.novajobs.us/api/user/skill-assessment-history",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (
          response.data?.status === "success" &&
          Array.isArray(response.data?.data)
        ) {
          setUsers(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching skill history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillHistory();
  }, []);

  return (
    <div className="">
      <div className=" bg-white shadow rounded">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 text-dark fw-bold">Skill Test History</h2>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <LoadingSpinner />
              <p className="mt-3 text-secondary">Loading skill history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger fs-5">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <Award className="fs-1 text-secondary mb-3" />
              <p className="fs-4 mb-2">No Skill Assessment History</p>
              <p>Complete skill assessments to see your progress.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Date / Time</th>
                    <th>Skill Name</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Correct</th>
                    <th className="text-center">Incorrect</th>
                    <th className="text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="align-middle">
                      <td>{user.date_time || "N/A"}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Award className="me-2 text-primary" />
                          <span className="fw-semibold">
                            {user.skill_assessment.skill_name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        {user.is_verified ? (
                          <span className="badge bg-success">
                            <CheckCircle className="me-1" />
                            Passed
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            <XCircle className="me-1" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        {user.results?.total_question || 0}
                      </td>
                      <td className="text-center text-success">
                        {user.results?.right_answer || 0}
                      </td>
                      <td className="text-center text-danger">
                        {user.results?.wrong_answer || 0}
                      </td>
                      <td className="text-center fw-semibold">
                        <span
                          className={
                            parseFloat(user.results?.Percentage) >= 70
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {user.results?.Percentage || "0"}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillHistory;

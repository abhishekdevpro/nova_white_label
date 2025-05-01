import React, { useEffect, useState } from "react";

const Pricing = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedData = localStorage.getItem("vendorFormData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#555" }}>
        <h2>No Form Data Available</h2>
        <p>Please submit the form first to view the details.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
     
      <div style={{ marginBottom: "16px" }}>
        <strong>Company Name:</strong>{" "}
        <a
          href={`https://${formData.companyName}.novajobs.us`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {formData.companyName}.novajobs.us
        </a>
      </div>
     
    </div>
  );
};

export default Pricing;
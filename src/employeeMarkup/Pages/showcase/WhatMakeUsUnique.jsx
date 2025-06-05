import { useState } from "react";

const WhatMakesUsUnique = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    health_insurance: false,
    health_insurance_value: "",
    wellness_center: false,
    wellness_center_value: "",
    cafeteria: false,
    cafeteria_value: "",
    maternity_leave: false,
    maternity_leave_value: "",
    recreational_area: false,
    recreational_area_value: "",
    life_insurance: false,
    life_insurance_value: "",
    personal_accident_insurance: false,
    personal_accident_insurance_value: "",
  });

  // Define unique features
  const uniqueFeatures = [
    {
      title: "Health Insurance",
      toggleKey: "health_insurance",
      valueKey: "health_insurance_value",
    },
    {
      title: "24 hour Wellness Center",
      toggleKey: "wellness_center",
      valueKey: "wellness_center_value",
    },
    {
      title: "Cafeteria",
      toggleKey: "cafeteria",
      valueKey: "cafeteria_value",
    },
    {
      title: "Maternity and Paternity Leave",
      toggleKey: "maternity_leave",
      valueKey: "maternity_leave_value",
    },
    {
      title: "Recreational Area",
      toggleKey: "recreational_area",
      valueKey: "recreational_area_value",
    },
    {
      title: "Life Insurance",
      toggleKey: "life_insurance",
      valueKey: "life_insurance_value",
    },
    {
      title: "Personal Accident Insurance",
      toggleKey: "personal_accident_insurance",
      valueKey: "personal_accident_insurance_value",
    },
  ];

  // Handle toggle switch change
  const handleToggleChange = (toggleKey, valueKey) => {
    setFormData(prev => ({
      ...prev,
      [toggleKey]: !prev[toggleKey],
      // Clear the text value when toggle is turned off
      [valueKey]: !prev[toggleKey] ? prev[valueKey] : ""
    }));
  };

  // Handle text input change
  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form Data:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-center">What Makes Us Unique</h2>
          <div onSubmit={handleSubmit}>
            <div className="row g-4">
              {uniqueFeatures.map((feature) => {
                const isEnabled = formData[feature.toggleKey];
                
                return (
                  <div key={feature.toggleKey} className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <label className="form-label fw-medium mb-0">
                            {feature.title}
                          </label>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={feature.toggleKey}
                              checked={isEnabled}
                              onChange={() => handleToggleChange(feature.toggleKey, feature.valueKey)}
                              style={{
                                backgroundColor: isEnabled ? '#0d6efd' : '',
                                borderColor: isEnabled ? '#0d6efd' : ''
                              }}
                            />
                          </div>
                        </div>
                        
                        {isEnabled && (
                          <div className="mt-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder={`Describe ${feature.title}`}
                              value={formData[feature.valueKey]}
                              onChange={(e) => handleInputChange(feature.valueKey, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button type="button" className="btn btn-primary btn-lg px-5" onClick={handleSubmit}>
                  Submit Form
                </button>
              </div>
            </div>
                      </div>
        </div>
      </div>
      
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      {/* Custom styles for better switch appearance */}
      <style jsx>{`
        .form-check-input:checked {
          background-color: #0d6efd !important;
          border-color: #0d6efd !important;
        }
        
        .card {
          border: 1px solid #dee2e6;
          border-radius: 0.5rem;
          transition: box-shadow 0.15s ease-in-out;
        }
        
        .card:hover {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        }
        
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        
        .btn-primary {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        
        .btn-primary:hover {
          background-color: #0b5ed7;
          border-color: #0a58ca;
        }
      `}</style>
    </div>
  );
};

export default WhatMakesUsUnique;
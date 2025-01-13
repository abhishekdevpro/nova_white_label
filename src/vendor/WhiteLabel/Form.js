// import React, { useState } from 'react';
// import styled from 'styled-components';

// const FormContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h1`
//   color: black;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   margin-bottom: 20px;
// `;

// const SectionTitle = styled.h2`
//   color: black;
//   margin-bottom: 10px;
// `;

// const InputGroup = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   color: black;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const CheckboxGroup = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 5px;
// `;

// const Checkbox = styled.input`
//   margin-right: 10px;
// `;

// const RadioGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const RadioOption = styled.label`
//   display: flex;
//   align-items: center;
//   margin-bottom: 5px;
// `;

// const SubmitButton = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// const VendorPartnershipForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: '',
//     website: '',
//     countryCode: '',
//     phoneNumber: '',
//     email: '',
//     location: '',
//     services: {
//       recruitmentWebsite: false,
//       jobPosting: false,
//       resumeBuilder: false,
//       careerPages: false,
//       hrAutomation: false,
//     },
//     customFeatures: '',
//     launchTime: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleServicesChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       services: {
//         ...prevState.services,
//         [name]: checked,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Here you would typically send the data to your backend
//   };

//   return (
//     <FormContainer>
//       <Title>Vendor White-Label Partnership Form</Title>
//       <form onSubmit={handleSubmit}>
//         <Section>
//           <SectionTitle>1. Basic Information</SectionTitle>
//           <InputGroup>
//             <Label htmlFor="companyName">Company Name:</Label>
//             <Input
//               type="text"
//               id="companyName"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleInputChange}
//               required
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label htmlFor="website">Website/Domain Name (if available):</Label>
//             <Input
//               type="text"
//               id="website"
//               name="website"
//               value={formData.website}
//               onChange={handleInputChange}
//             />
//           </InputGroup>
//         </Section>

//         <Section>
//           <SectionTitle>2. Contact Information</SectionTitle>
//           <InputGroup>
//             <Label htmlFor="countryCode">Country Code:</Label>
//             <Input
//               type="text"
//               id="countryCode"
//               name="countryCode"
//               value={formData.countryCode}
//               onChange={handleInputChange}
//               required
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label htmlFor="phoneNumber">Phone Number:</Label>
//             <Input
//               type="tel"
//               id="phoneNumber"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label htmlFor="email">Email:</Label>
//             <Input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </InputGroup>
//           <InputGroup>
//             <Label htmlFor="location">Location (City, Country):</Label>
//             <Input
//               type="text"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               required
//             />
//           </InputGroup>
//         </Section>

//         <Section>
//           <SectionTitle>3. Services of Interest</SectionTitle>
//           <CheckboxGroup>
//             <Checkbox
//               type="checkbox"
//               id="recruitmentWebsite"
//               name="recruitmentWebsite"
//               checked={formData.services.recruitmentWebsite}
//               onChange={handleServicesChange}
//             />
//             <Label htmlFor="recruitmentWebsite">Recruitment Website</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <Checkbox
//               type="checkbox"
//               id="jobPosting"
//               name="jobPosting"
//               checked={formData.services.jobPosting}
//               onChange={handleServicesChange}
//             />
//             <Label htmlFor="jobPosting">Job Posting & Management</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <Checkbox
//               type="checkbox"
//               id="resumeBuilder"
//               name="resumeBuilder"
//               checked={formData.services.resumeBuilder}
//               onChange={handleServicesChange}
//             />
//             <Label htmlFor="resumeBuilder">Resume Builder</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <Checkbox
//               type="checkbox"
//               id="careerPages"
//               name="careerPages"
//               checked={formData.services.careerPages}
//               onChange={handleServicesChange}
//             />
//             <Label htmlFor="careerPages">Career Pages for Clients</Label>
//           </CheckboxGroup>
//           <CheckboxGroup>
//             <Checkbox
//               type="checkbox"
//               id="hrAutomation"
//               name="hrAutomation"
//               checked={formData.services.hrAutomation}
//               onChange={handleServicesChange}
//             />
//             <Label htmlFor="hrAutomation">HR Automation</Label>
//           </CheckboxGroup>
//         </Section>

//         <Section>
//           <SectionTitle>4. Additional Needs</SectionTitle>
//           <RadioGroup>
//             <RadioOption>
//               <input
//                 type="radio"
//                 id="customYes"
//                 name="customFeatures"
//                 value="yes"
//                 checked={formData.customFeatures === 'yes'}
//                 onChange={handleInputChange}
//               />
//               <Label htmlFor="customYes">Yes (briefly describe):</Label>
//             </RadioOption>
//             <RadioOption>
//               <input
//                 type="radio"
//                 id="customNo"
//                 name="customFeatures"
//                 value="no"
//                 checked={formData.customFeatures === 'no'}
//                 onChange={handleInputChange}
//               />
//               <Label htmlFor="customNo">No</Label>
//             </RadioOption>
//           </RadioGroup>
//           {formData.customFeatures === 'yes' && (
//             <InputGroup>
//               <Input
//                 type="text"
//                 name="customFeaturesDescription"
//                 placeholder="Briefly describe your custom features"
//                 onChange={handleInputChange}
//               />
//             </InputGroup>
//           )}
//         </Section>

//         <Section>
//           <SectionTitle>5. Ready to Start</SectionTitle>
//           <RadioGroup>
//             <RadioOption>
//               <input
//                 type="radio"
//                 id="within2days"
//                 name="launchTime"
//                 value="within2days"
//                 checked={formData.launchTime === 'within2days'}
//                 onChange={handleInputChange}
//               />
//               <Label htmlFor="within2days">Within 2 days</Label>
//             </RadioOption>
//             <RadioOption>
//               <input
//                 type="radio"
//                 id="within7days"
//                 name="launchTime"
//                 value="within7days"
//                 checked={formData.launchTime === 'within7days'}
//                 onChange={handleInputChange}
//               />
//               <Label htmlFor="within7days">Within 7 days</Label>
//             </RadioOption>
//             <RadioOption>
//               <input
//                 type="radio"
//                 id="within1month"
//                 name="launchTime"
//                 value="within1month"
//                 checked={formData.launchTime === 'within1month'}
//                 onChange={handleInputChange}
//               />
//               <Label htmlFor="within1month">Within 1 month</Label>
//             </RadioOption>
//           </RadioGroup>
//         </Section>

//         <SubmitButton type="submit">Submit Form</SubmitButton>
//       </form>
//     </FormContainer>
//   );
// };

// export default VendorPartnershipForm;

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const FormContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 40px;
  font-weight: 600;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  ${(props) =>
    props.fullWidth &&
    `
    grid-column: 1 / -1;
  `}
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 2px 4px rgba(0, 112, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled(Input).attrs({ as: "select" })`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 24px;
  width: 100%;

  &:hover {
    background-color: #0061d5;
  }
`;

const VendorPartnershipForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    location: "",
    services: {
      recruitmentWebsite: false,
      jobPosting: false,
      resumeBuilder: false,
      careerPages: false,
      hrAutomation: false,
    },
    customFeatures: "",
    launchTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleServicesChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      services: {
        ...prevState.services,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div
        className="modal fade"
        id="vendorFormModal"
        tabIndex="-1"
        aria-labelledby="vendorFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: "white" }}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form Content */}
              <FormContainer>
                <Title>Vendor White-Label Partnership Form</Title>
                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    <FormGroup>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        type="text"
                        id="companyName"
                        name="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="website">Website/Domain Name</Label>
                      <Input
                        type="text"
                        id="website"
                        name="website"
                        placeholder="Enter website URL"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="countryCode">Country Code</Label>
                      <Input
                        type="text"
                        id="countryCode"
                        name="countryCode"
                        placeholder="Enter country code"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup fullWidth>
                      <Label>Services of Interest</Label>
                      <CheckboxGroup>
                        <Checkbox
                          type="checkbox"
                          id="recruitmentWebsite"
                          name="recruitmentWebsite"
                          checked={formData.services.recruitmentWebsite}
                          onChange={handleServicesChange}
                        />
                        <Label htmlFor="recruitmentWebsite">
                          Recruitment Website
                        </Label>
                      </CheckboxGroup>
                      <CheckboxGroup>
                        <Checkbox
                          type="checkbox"
                          id="jobPosting"
                          name="jobPosting"
                          checked={formData.services.jobPosting}
                          onChange={handleServicesChange}
                        />
                        <Label htmlFor="jobPosting">
                          Job Posting & Management
                        </Label>
                      </CheckboxGroup>
                      <CheckboxGroup>
                        <Checkbox
                          type="checkbox"
                          id="resumeBuilder"
                          name="resumeBuilder"
                          checked={formData.services.resumeBuilder}
                          onChange={handleServicesChange}
                        />
                        <Label htmlFor="resumeBuilder">Resume Builder</Label>
                      </CheckboxGroup>
                      <CheckboxGroup>
                        <Checkbox
                          type="checkbox"
                          id="careerPages"
                          name="careerPages"
                          checked={formData.services.careerPages}
                          onChange={handleServicesChange}
                        />
                        <Label htmlFor="careerPages">
                          Career Pages for Clients
                        </Label>
                      </CheckboxGroup>
                      <CheckboxGroup>
                        <Checkbox
                          type="checkbox"
                          id="hrAutomation"
                          name="hrAutomation"
                          checked={formData.services.hrAutomation}
                          onChange={handleServicesChange}
                        />
                        <Label htmlFor="hrAutomation">HR Automation</Label>
                      </CheckboxGroup>
                    </FormGroup>

                    <FormGroup fullWidth>
                      <Label>Additional Needs</Label>
                      <RadioGroup>
                        <RadioOption>
                          <input
                            type="radio"
                            id="customYes"
                            name="customFeatures"
                            value="yes"
                            checked={formData.customFeatures === "yes"}
                            onChange={handleInputChange}
                          />
                          <span>Yes (briefly describe)</span>
                        </RadioOption>
                        {formData.customFeatures === "yes" && (
                          <Input
                            type="text"
                            name="customFeaturesDescription"
                            placeholder="Describe your custom features"
                            onChange={handleInputChange}
                            style={{ marginTop: "8px" }}
                          />
                        )}
                        <RadioOption>
                          <input
                            type="radio"
                            id="customNo"
                            name="customFeatures"
                            value="no"
                            checked={formData.customFeatures === "no"}
                            onChange={handleInputChange}
                          />
                          <span>No</span>
                        </RadioOption>
                      </RadioGroup>
                    </FormGroup>

                    <FormGroup fullWidth>
                      <Label>Ready to Start</Label>
                      <RadioGroup>
                        <RadioOption>
                          <input
                            type="radio"
                            id="within2days"
                            name="launchTime"
                            value="within2days"
                            checked={formData.launchTime === "within2days"}
                            onChange={handleInputChange}
                          />
                          <span>Within 2 days</span>
                        </RadioOption>
                        <RadioOption>
                          <input
                            type="radio"
                            id="within7days"
                            name="launchTime"
                            value="within7days"
                            checked={formData.launchTime === "within7days"}
                            onChange={handleInputChange}
                          />
                          <span>Within 7 days</span>
                        </RadioOption>
                        <RadioOption>
                          <input
                            type="radio"
                            id="within1month"
                            name="launchTime"
                            value="within1month"
                            checked={formData.launchTime === "within1month"}
                            onChange={handleInputChange}
                          />
                          <span>Within 1 month</span>
                        </RadioOption>
                      </RadioGroup>
                    </FormGroup>
                  </FormGrid>
                  <Link to="/vendor/vendorprofile">
                    <SubmitButton type="submit">Submit Form</SubmitButton>
                  </Link>
                </form>
              </FormContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorPartnershipForm;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333333;
  margin-bottom: 24px;
  text-align: center;
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
  color: #555555;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #aaaaaa;
  }
`;

const Select = styled(Input).attrs({ as: "select" })`
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #005bb5;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    color: #555555;
    margin-bottom: 24px;
  }

  button {
    padding: 10px 20px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #005bb5;
    }
  }
`;
// const DomainSection = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 1fr;
//   gap: 16px;
//   align-items: flex-end;
//   margin-bottom: 24px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 12px;
//   }
// `;

const DomainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
    gap: 16px;
  // margin-bottom: 24px;
  // border:2px solid green;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;


const DomainWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.error ? '#ff4d4f' : '#d0d0d0'};
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #0070f3;
    background-color: #ffffff;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  }
`;

const DomainInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  
  &::placeholder {
    color: #aaaaaa;
  }
`;

const DomainSuffix = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  background-color: #eeeeee;
  border-left: 1px solid #d0d0d0;
`;

const ActivateButton = styled.button`
  background-color: ${props => props.disabled ? '#0000FF' : '#0070f3'};
  color: #ffffff;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  height: 45px; // Match input height
  
  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#005bb5'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(1px)'};
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
`;


// const VendorPartnershipForm = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [error, setError] = useState('');
//   const [isActivated, setIsActivated] = useState(false);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     website: "",
//     domain:"",
//     countryCode: "",
//     phoneNumber: "",
//     email: "",
//     location: "",
//     services: {
//       recruitmentWebsite: false,
//       jobPosting: false,
//       resumeBuilder: false,
//       careerPages: false,
//       hrAutomation: false,
//     },
//     customFeatures: "",
//     launchTime: "",
//   });
//   const token = localStorage.getItem("vendorToken")
//   const checkstatus =async ()=>{
//     const response = await axios.get('https://apiwl.novajobs.us/api/admin/acount-info',{
//       headers:{
//         'Authorization':token,
//       }
//     })
//     console.log(response,"status");
//     setIsActivated(response.data.data.domain_active)
//   }
//   useEffect(()=>{
//     checkstatus()
//   })
//   console.log(isActivated,"llll");

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleServicesChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       services: {
//         ...prevState.services,
//         [name]: checked,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowPopup(true);
//     console.log("Form submitted:", formData);
//   };

//   const handleClosePopup = () => setShowPopup(false);

//   const handleActivate = async () => {
//     if (!formData.domain) {
//       setError('Subdomain name is required!');
//       return;
//     }
  
//     if (!isActivated) {
//       try {
  
//         const response = await axios.post(
//           'https://apiwl.novajobs.us/api/admin/vendor/domain-active',
//           {
//             sub_domain: formData.domain,
//           },
//           {
//             headers: {
//               Authorization: `${token}`,
//             },
//           }
//         );
  
//         if (response.status === 200) {
//           setIsActivated(true);
//           alert(`Activated subdomain:`);
//         } else {
//           setError('Failed to activate the subdomain. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error activating subdomain:', error);
//         setError('An error occurred. Please try again.');
//       }
//     } else {
//       alert(`Subdomain is already activated: ${formData.website}-impressivewebs.com`);
//     }
//   };
  
//   return (
//     <>
//       <FormContainer>
//         <Title>Vendor White-Label Partnership Form</Title>
//         <form onSubmit={handleSubmit}>
//         <FormGrid>
//         <FormGroup>
//       <Label htmlFor="domain">Subdomain Name</Label>
//       <DomainWrapper error={!!error}>
//         <Input
//           type="text"
//           id="domain"
//           name="domain"
//           value={formData.domain}
//           onChange={handleInputChange}
//           placeholder="Enter subdomain name..."
//         />
//         <Suffix>.novajobs.us</Suffix>
//       </DomainWrapper>
//       {error && <ErrorText>{error}</ErrorText>}
      
//     </FormGroup>
//     <ActivateButton
//         onClick={handleActivate}
//         // disabled={!!error || !formData.website}
//       >
//         Activate
//       </ActivateButton>
//         </FormGrid>
//           <FormGrid>
//             <FormGroup>
//               <Label htmlFor="companyName">Company Name</Label>
//               <Input
//                 type="text"
//                 id="companyName"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 placeholder="Enter company name"
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="website">Website</Label>
//               <Input
//                 type="text"
//                 id="website"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleInputChange}
//                 placeholder="Enter website"
//               />
//             </FormGroup>
          

//             <FormGroup>
//                       <Label htmlFor="countryCode">Country Code</Label>
//                       <Input
//                         type="text"
//                         id="countryCode"
//                         name="countryCode"
//                         placeholder="Enter country code"
//                         value={formData.countryCode}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </FormGroup>

//                     <FormGroup>
//                       <Label htmlFor="phoneNumber">Phone Number</Label>
//                       <Input
//                         type="tel"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         placeholder="Enter phone number"
//                         value={formData.phoneNumber}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </FormGroup>

//                     <FormGroup>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         type="email"
//                         id="email"
//                         name="email"
//                         placeholder="Enter email address"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </FormGroup>

//                     <FormGroup>
//                       <Label htmlFor="location">Location</Label>
//                       <Input
//                         type="text"
//                         id="location"
//                         name="location"
//                         placeholder="City, Country"
//                         value={formData.location}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </FormGroup>

//                     <FormGroup fullWidth>
//                       <Label>Services of Interest</Label>
//                       <CheckboxGroup>
//                         <Checkbox
//                           type="checkbox"
//                           id="recruitmentWebsite"
//                           name="recruitmentWebsite"
//                           checked={formData.services.recruitmentWebsite}
//                           onChange={handleServicesChange}
//                         />
//                         <Label htmlFor="recruitmentWebsite">
//                           Recruitment Website
//                         </Label>
//                       </CheckboxGroup>
//                       <CheckboxGroup>
//                         <Checkbox
//                           type="checkbox"
//                           id="jobPosting"
//                           name="jobPosting"
//                           checked={formData.services.jobPosting}
//                           onChange={handleServicesChange}
//                         />
//                         <Label htmlFor="jobPosting">
//                           Job Posting & Management
//                         </Label>
//                       </CheckboxGroup>
//                       <CheckboxGroup>
//                         <Checkbox
//                           type="checkbox"
//                           id="resumeBuilder"
//                           name="resumeBuilder"
//                           checked={formData.services.resumeBuilder}
//                           onChange={handleServicesChange}
//                         />
//                         <Label htmlFor="resumeBuilder">Resume Builder</Label>
//                       </CheckboxGroup>
//                       <CheckboxGroup>
//                         <Checkbox
//                           type="checkbox"
//                           id="careerPages"
//                           name="careerPages"
//                           checked={formData.services.careerPages}
//                           onChange={handleServicesChange}
//                         />
//                         <Label htmlFor="careerPages">
//                           Career Pages for Clients
//                         </Label>
//                       </CheckboxGroup>
//                       <CheckboxGroup>
//                         <Checkbox
//                           type="checkbox"
//                           id="hrAutomation"
//                           name="hrAutomation"
//                           checked={formData.services.hrAutomation}
//                           onChange={handleServicesChange}
//                         />
//                         <Label htmlFor="hrAutomation">HR Automation</Label>
//                       </CheckboxGroup>
//                     </FormGroup>

//                     <FormGroup fullWidth>
//                       <Label>Additional Needs</Label>
//                       <RadioGroup>
//                         <RadioOption>
//                           <input
//                             type="radio"
//                             id="customYes"
//                             name="customFeatures"
//                             value="yes"
//                             checked={formData.customFeatures === "yes"}
//                             onChange={handleInputChange}
//                           />
//                           <span>Yes (briefly describe)</span>
//                         </RadioOption>
//                         {formData.customFeatures === "yes" && (
//                           <Input
//                             type="text"
//                             name="customFeaturesDescription"
//                             placeholder="Describe your custom features"
//                             onChange={handleInputChange}
//                             style={{ marginTop: "8px" }}
//                           />
//                         )}
//                         <RadioOption>
//                           <input
//                             type="radio"
//                             id="customNo"
//                             name="customFeatures"
//                             value="no"
//                             checked={formData.customFeatures === "no"}
//                             onChange={handleInputChange}
//                           />
//                           <span>No</span>
//                         </RadioOption>
//                       </RadioGroup>
//                     </FormGroup>

//                     <FormGroup fullWidth>
//                       <Label>Ready to Start</Label>
//                       <RadioGroup>
//                         <RadioOption>
//                           <input
//                             type="radio"
//                             id="within2days"
//                             name="launchTime"
//                             value="within2days"
//                             checked={formData.launchTime === "within2days"}
//                             onChange={handleInputChange}
//                           />
//                           <span>Within 2 days</span>
//                         </RadioOption>
//                         <RadioOption>
//                           <input
//                             type="radio"
//                             id="within7days"
//                             name="launchTime"
//                             value="within7days"
//                             checked={formData.launchTime === "within7days"}
//                             onChange={handleInputChange}
//                           />
//                           <span>Within 7 days</span>
//                         </RadioOption>
//                         <RadioOption>
//                           <input
//                             type="radio"
//                             id="within1month"
//                             name="launchTime"
//                             value="within1month"
//                             checked={formData.launchTime === "within1month"}
//                             onChange={handleInputChange}
//                           />
//                           <span>Within 1 month</span>
//                         </RadioOption>
//                       </RadioGroup>
//                     </FormGroup>
//             {/* Other Input Fields */}
//           </FormGrid>
//           <SubmitButton type="submit">Submit</SubmitButton>
//         </form>
//       </FormContainer>
//       {showPopup && (
//         <PopupOverlay>
//           <PopupContent>
//             <h2>Form Submitted Successfully!</h2>
//             <p>Thank you for submitting the form.</p>
//             <button onClick={handleClosePopup}>Close</button>
//           </PopupContent>
//         </PopupOverlay>
//       )}
//     </>
//   );
// };

// export default VendorPartnershipForm;



const VendorPartnershipForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    subdomain: "", // Changed from domain to subdomain to match API
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
    customFeaturesDescription: "",
    launchTime: "",
  });

  const token = localStorage.getItem("vendorToken");

  const checkStatus = async () => {
    try {
      const response = await axios.get('https://apiwl.novajobs.us/api/admin/acount-info', {
        headers: {
          'Authorization': token
        }
      });
      setIsActivated(response.data.data.domain_active);
    } catch (error) {
      console.error('Error checking status:', error);
      setError('Failed to check domain status');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []); // Added dependency array to prevent infinite loop

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user types in subdomain field
    if (name === 'subdomain') {
      setError('');
    }
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

  // const handleActivate = async () => {
  //   if (!formData.subdomain) {
  //     setError('Subdomain name is required!');
  //     return;
  //   }

  //   if (!isActivated) {
  //     // const formData = new FormData();
  //     formData.append('sub_domain',formData.subdomain)
  //     try {
  //       const response = await axios.post(
  //         'https://apiwl.novajobs.us/api/admin/vendor/domain-active',
  //         {
  //           formData // Using subdomain in the request
  //         },
  //         {
  //           headers: {
  //             Authorization: token,
  //             // 'Content-Type': 'multipart/form-data',
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsActivated(true);
  //         alert(`Subdomain activated successfully: ${formData.subdomain}.novajobs.us`);
  //       }
  //     } catch (error) {
  //       console.error('Error activating subdomain:', error);
  //       setError(error.response?.data?.message || 'Failed to activate subdomain');
  //     }
  //   } else {
  //     alert(`Subdomain is already activated: ${formData.subdomain}.novajobs.us`);
  //   }
  // };
  const handleActivate = async () => {
    if (!formData.subdomain) {
      setError('Subdomain name is required!');
      return;
    }
  
    if (!isActivated) {
      // Create a FormData instance
      const formDataInstance = new FormData();
      formDataInstance.append('sub_domain', formData.subdomain);
  
      try {
        const response = await axios.post(
          'https://apiwl.novajobs.us/api/admin/vendor/domain-active',
          formDataInstance, // Pass the FormData instance here
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data', // Set Content-Type for FormData
            },
          }
        );
  
        if (response.status === 200) {
          setIsActivated(true);
          toast.succes(`Subdomain activated successfully`);
        }
      } catch (error) {
        console.error('Error activating subdomain:', error);
        setError(error.response?.data?.message || 'Failed to activate subdomain');
      }
    } else {
      toast.error(`Subdomain is already activated`);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // try {
    //   // Prepare the form data
    //   const submissionData = {
    //     ...formData,
    //     subdomain: formData.subdomain, // Ensure subdomain is included
    //     services: Object.keys(formData.services)
    //       .filter(key => formData.services[key])
    //       .join(', ')
    //   };

    //   // Submit the form data
    //   const response = await axios.post(
    //     'https://apiwl.novajobs.us/api/admin/vendor/partnership',
    //     submissionData,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     setShowPopup(true);
    //   }
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   setError('Failed to submit form. Please try again.');
    // }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <FormContainer>
        <Title>Vendor White-Label Partnership Form</Title>
        <form onSubmit={handleSubmit}>
          {/* <FormGrid>
            <FormGroup>
              <Label htmlFor="subdomain">Subdomain Name</Label>
              <DomainWrapper error={!!error}>
                <Input
                  type="text"
                  id="subdomain"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleInputChange}
                  placeholder="Enter subdomain name..."
                />
                <Suffix>.novajobs.us</Suffix>
              </DomainWrapper>
              {/* {error && <ErrorText>{error}</ErrorText>}
            </FormGroup>
            <ActivateButton
              onClick={handleActivate}
              type="button"
              disabled={!formData.subdomain || isActivated}
            >
              {isActivated ? 'Activated' : 'Activate'}
            </ActivateButton>
          </FormGrid> */}
          <DomainSection>
            <FormGroup>
              <Label htmlFor="subdomain">Subdomain Name</Label>
              <DomainWrapper error={!!error}>
                <DomainInput
                  type="text"
                  id="subdomain"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleInputChange}
                  placeholder="Enter subdomain name..."
                />
                <DomainSuffix>.novajobs.us</DomainSuffix>
              </DomainWrapper>
              {error && <ErrorText>{error}</ErrorText>}
            </FormGroup>
            <ActivateButton
              onClick={handleActivate}
              type="button"
              disabled={!formData.subdomain || isActivated}
            >
              {isActivated ? 'Activated' : 'Activate'}
            </ActivateButton>
          </DomainSection>

          <FormGrid>
            <FormGroup>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter website"
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
              {/* <CheckboxGroup>
                {Object.keys(formData.services).map((service) => (
                  <CheckboxWrapper key={service}>
                    <Checkbox
                      type="checkbox"
                      id={service}
                      name={service}
                      checked={formData.services[service]}
                      onChange={handleServicesChange}
                    />
                    <Label htmlFor={service}>
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </CheckboxWrapper>
                ))}
              </CheckboxGroup> */}
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
                    value={formData.customFeaturesDescription}
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
                {['within2days', 'within7days', 'within1month'].map((time) => (
                  <RadioOption key={time}>
                    <input
                      type="radio"
                      id={time}
                      name="launchTime"
                      value={time}
                      checked={formData.launchTime === time}
                      onChange={handleInputChange}
                    />
                    <span>
                      {time === 'within2days'
                        ? 'Within 2 days'
                        : time === 'within7days'
                        ? 'Within 7 days'
                        : 'Within 1 month'}
                    </span>
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormGroup>
          </FormGrid>
          
          <SubmitButton 
            type="submit"
            disabled={!isActivated}
          >
            Submit
          </SubmitButton>
        </form>
      </FormContainer>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <h2>Form Submitted Successfully!</h2>
            <p>Thank you for submitting the form.</p>
            <button onClick={handleClosePopup}>Close</button>
          </PopupContent>
        </PopupOverlay>
      )}
    </>
  );
};

export default VendorPartnershipForm;
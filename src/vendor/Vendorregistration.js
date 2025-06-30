import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { Container, Form, Logo, Title, FormGroup, Label, Input, CheckboxGroup, SubmitButton } from "./StyledComponents"
import styled from "styled-components";

import DomainSection from "./DomainSection";
import UserHeader from "../markup/Layout/Header";
import Footer from "../markup/Layout/Footer";
import { useLogo } from "../Context/LogoContext";
import { Link, useNavigate } from "react-router-dom";
import TermsPopup from "../employeeMarkup/Pages/TermsPopup";
// import CookiesBanner from "../markup/Layout/CookiesBanner"

// const VendorRegistration = () => {
//   const {logo} = useLogo()
//   const navigate = useNavigate()
//   const [termsChecked, setTermsChecked] = useState(false);
//   const [showTermsPopup, setShowTermsPopup] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     domain: "https://abc.novajobs.us",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }
//   const handleTermsCheckbox = (e) => {
//     const checked = e.target.checked;
//     setTermsChecked(checked);

//     if (checked) {
//       setShowTermsPopup(true); // Show popup when checked
//     } else {
//       setTermsAccepted(false); // Reset if unchecked again
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await fetch("https://apiwl.novajobs.us/api/admin/auth/vendor/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (response.ok && data.status === "success") {
//         toast.success(data.message || "Vendor registered successfully! Please check your email for verification.")
//         setFormData({
//           first_name: "",
//           last_name: "",
//           email: "",
//           phone: "",
//           password: "",
//           domain: "https://abc.novajobs.us",
//         })
//         navigate('/vendor/login')
//       } else {
//         toast.error(data.message || "Registration failed. Please try again.")
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.")
//       console.error("Error:", error)
//     }
//   }

//   return (
//     <>
//       <UserHeader />
//       <Container>
//         <Logo src={logo} alt="Company Logo" />
//         <Title>Vendor Registration</Title>
//         <Form onSubmit={handleSubmit}>
//           <FormRow>
//             <FormGroup>
//               <Label htmlFor="first_name">First Name *</Label>
//               <Input
//                 type="text"
//                 id="first_name"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="last_name">Last Name *</Label>
//               <Input
//                 type="text"
//                 id="last_name"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label htmlFor="email">Email address *</Label>
//               <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//             </FormGroup>
//             <FormGroup>
//               <Label htmlFor="phone">Phone *</Label>
//               <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
//             </FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label htmlFor="password">Password *</Label>
//               <Input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>
//           </FormRow>
//           <TermsContainer>
//             <TermsCheckbox type="checkbox" id="terms" required checked={termsChecked}
//               onChange={handleTermsCheckbox}
//               />
//             <TermsText htmlFor="terms">
//               By submitting this form, you agree to our <Link target="_blank" className="text-primary fw-bold" to={'/terms-and-conditions'}>Terms of Use</Link> & <Link target="_blank" className="text-primary fw-bold" to={'/privacy-policy'}>Privacy Policy</Link>.
//             </TermsText>
//           </TermsContainer>
//           <SubmitButton type="submit" disabled={!termsAccepted}>Register</SubmitButton>
//         </Form>
//       </Container>
//        {showTermsPopup && (
//         <TermsPopup
//           email={formData?.email}

//         />
//       )}

//       <Footer />
//       {/* <CookiesBanner /> */}
//     </>
//   )
// }

const VendorRegistration = () => {
  const { logo } = useLogo();
  const navigate = useNavigate();

  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    domain: "https://abc.novajobs.us",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTermsCheckbox = (e) => {
    const checked = e.target.checked;
    setTermsChecked(checked);

    if (checked) {
      setShowTermsPopup(true); // Show the popup
    } else {
      setTermsAccepted(false); // Reset acceptance
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://apiwl.novajobs.us/api/admin/auth/vendor/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast.success(
          data.message ||
            "Vendor registered successfully! Please check your email."
        );
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          domain: "https://abc.novajobs.us",
        });
        navigate("/vendor/login");
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
      console.error("Error:", error);
    }
  };

  return (
    <>
      <UserHeader />
      <Container>
        <Logo src={logo} alt="Company Logo" />
        <Title>Vendor Registration</Title>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="email">Email address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <TermsContainer>
            <TermsCheckbox
              type="checkbox"
              id="terms"
              required
              checked={termsChecked}
              onChange={handleTermsCheckbox}
            />
            <TermsText htmlFor="terms">
              By submitting this form, you agree to our{" "}
              <Link
                target="_blank"
                className="text-primary fw-bold"
                to={"/terms-and-conditions"}
              >
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link
                target="_blank"
                className="text-primary fw-bold"
                to={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
              .
            </TermsText>
          </TermsContainer>
          <SubmitButton type="submit" disabled={!termsAccepted}>
            Register
          </SubmitButton>
        </Form>
      </Container>

      {showTermsPopup && (
        <TermsPopup
          email={formData?.email}
          onAgree={() => {
            setTermsAccepted(true);
            setShowTermsPopup(false);
          }}
          onCancel={() => {
            setTermsChecked(false); // uncheck the checkbox
            setShowTermsPopup(false); // hide modal
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default VendorRegistration;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  h4 {
    grid-column: 1 / -1;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SubmitButton = styled.button`
  background-color: #1c2957;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #161f3f;
  }
`;

export const Logo = styled.img`
  width: 210px;
  display: block;
  margin: 2rem auto;
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
`;
export const RemarksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const RemarksLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

export const RemarksTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #1c2957;
    outline: none;
  }
`;

export const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TermsCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const TermsText = styled.label`
  font-size: 0.9rem;
  color: #333;

  a {
    color: #1c2957;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

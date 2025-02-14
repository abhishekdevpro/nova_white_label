

import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
// import { Container, Form, Logo, Title, FormGroup, Label, Input, CheckboxGroup, SubmitButton } from "./StyledComponents"
import styled from "styled-components"


import DomainSection from "./DomainSection"
import UserHeader from "../markup/Layout/Header"
import Footer from "../markup/Layout/Footer"
import { useLogo } from "../Context/LogoContext"

const VendorRegistration = () => {
  const {logo} = useLogo()
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    company_name: "",
    website: "",
    company_linkedin: "",
    access: [],
    domain: "https://abc.novajobs.us",
  })



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      const updatedAccess = checked ? [...formData.access, name] : formData.access.filter((item) => item !== name)
      setFormData({ ...formData, access: updatedAccess })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://apiwl.novajobs.us/api/admin/auth/vendor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(response.message || "Vendor registered successfully! Please check your email for verification.")
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          company_name: "",
          website: "",
          company_linkedin: "",
          access: [],
        })
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
      console.error("Error:", error)
    }
  }

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
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone *</Label>
              <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
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
            <FormGroup>
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="website">Website</Label>
              <Input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="company_linkedin">Company LinkedIn</Label>
              <Input
                type="url"
                id="company_linkedin"
                name="company_linkedin"
                value={formData.company_linkedin}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <DomainSection formData={formData} setFormData={setFormData} />
          <CheckboxGroup>
            <h4>Required Services on Portal</h4>
            {[
              { label: "Jobs portal", name: "A" },
              { label: "Employer Login", name: "A+" },
              { label: "Jobseeker Login", name: "B" },
              { label: "ATS", name: "B+" },
              { label: "HRMS", name: "C" },
              { label: "AI Resume builder", name: "skill_test" },
              { label: "Community", name: "resume_builder" },
              { label: "Messaging", name: "jobseeker_access" },
              { label: "SEO & Digital Marketing", name: "D" },
            ].map((item) => (
              <label key={item.name}>
                <input
                  type="checkbox"
                  name={item.name}
                  checked={formData.access.includes(item.name)}
                  onChange={handleChange}
                />
                {item.label}
              </label>
            ))}
          </CheckboxGroup>
          <RemarksContainer>
      <div>
        <RemarksLabel htmlFor="remarks">Additional Remarks</RemarksLabel>
        <RemarksTextarea id="remarks" placeholder="Enter any additional remarks..."></RemarksTextarea>
      </div>
      <TermsContainer>
        <TermsCheckbox type="checkbox" id="terms" />
        <TermsText htmlFor="terms">
          By submitting this form, you agree to our <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>.
        </TermsText>
      </TermsContainer>
    </RemarksContainer>
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </Container>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default VendorRegistration

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

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
`

export const SubmitButton = styled.button`
  background-color: #1C2957;
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
`

export const Logo = styled.img`
  width: 210px;
  display: block;
  margin: 2rem auto;
`

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
`
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
    border-color: #1C2957;
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
    color: #1C2957;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
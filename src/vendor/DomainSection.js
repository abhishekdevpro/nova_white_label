// "use client"

// import { useState } from "react"
// import styled from "styled-components"


// export const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// export const Label = styled.label`
//   margin-bottom: 0.5rem;
//   font-weight: bold;
// `

// export const Input = styled.input`
//   padding: 0.5rem;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `

// const DomainWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `

// const DomainSuffix = styled.div`
//   padding: 12px 16px;
//   font-size: 14px;
//   font-weight: 500;
//   color: #666666;
//   background-color: #eeeeee;
//   border-left: 1px solid #d0d0d0;
// `;

// const ActivateButton = styled.button`
//   background-color: ${(props) => (props.isActivated ? "#4CAF50" : "#1C2957")};
//   color: white;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${(props) => (props.isActivated ? "#45a049" : "#161f3f")};
//   }

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `

// const DomainSection = ({ formData, setFormData }) => {
//   const [isActivated, setIsActivated] = useState(false)
//   const [loading, setLoading] = useState(false)

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, subdomain: e.target.value })
//   }

//   const handleActivate = async () => {
//     setLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     setIsActivated(true)
//     setLoading(false)
//   }

//   return (
//     <FormGroup>
//       <Label htmlFor="subdomain">Subdomain Name</Label>
//       <DomainWrapper>
//         <Input
//           type="text"
//           id="subdomain"
//           name="subdomain"
//           value={formData.subdomain}
//           onChange={handleInputChange}
//           placeholder="Enter subdomain name..."
//           readOnly={isActivated}
//         />
//         <DomainSuffix>.novajobs.us</DomainSuffix>
//       </DomainWrapper>
//       <ActivateButton
//         onClick={handleActivate}
//         disabled={!formData.subdomain || isActivated || loading}
//         isActivated={isActivated}
//       >
//         {isActivated ? "Activated" : loading ? "Under Progress..." : "Activate"}
//       </ActivateButton>
//     </FormGroup>
//   )
// }

// export default DomainSection

"use client"

import { useState } from "react"
import styled from "styled-components"

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
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
const DomainWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const DomainInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const DomainSuffix = styled.span`
  margin-left: 0.5rem;
`

const ActivateButton = styled.button`
  background-color: ${(props) => (props.isActivated ? "#4CAF50" : "#1C2957")};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => (props.isActivated ? "#45a049" : "#161f3f")};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const DomainSection = ({ formData, setFormData }) => {
  const [isActivated, setIsActivated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({ ...formData, subdomain: e.target.value })
  }

  const handleActivate = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsActivated(true)
    setLoading(false)
  }

  return (
    <FormGroup>
      <Label htmlFor="subdomain">Subdomain Name</Label>
      <DomainWrapper>
        <DomainInputWrapper>
          <Input
            type="text"
            id="subdomain"
            name="subdomain"
            value={formData.subdomain}
            onChange={handleInputChange}
            placeholder="Enter subdomain name..."
            readOnly={isActivated}
          />
          <DomainSuffix>.novajobs.us</DomainSuffix>
        </DomainInputWrapper>
        <ActivateButton
          onClick={handleActivate}
          disabled={!formData.subdomain || isActivated || loading}
          isActivated={isActivated}
        >
          {isActivated ? "Under Progress..." : loading ? "Under Progress..." : "Activate"}
        </ActivateButton>
      </DomainWrapper>
    </FormGroup>
  )
}

export default DomainSection


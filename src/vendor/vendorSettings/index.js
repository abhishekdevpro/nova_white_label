// import React, { useState } from "react";
// import styled from "styled-components";
// import VendorCompanySideBar from "../Vendorsidebar";
// import Footer from "../../markup/Layout/Footer";
// import VendorHeader from "../../markup/Layout/VendorHeader";
// import NavbarManagementForm from "./NavbarForm";
// import HeaderManagementForm from "./HeaderManagementForm";
// import FooterManagementForm from "./FooterManagement";
// import TestimonialManagementForm from "./TestimonialManagement";
// import BulkUploadForm from "./BulkUploadForm";

// const PageWrapper = styled.div`
//   background-color: white;
// `;

// const ContentWrapper = styled.div`
//   background-color: white;
// `;

// const Section = styled.section`
//   background-color: white;
//   padding-top: 50px;
//   padding-bottom: 20px;
// `;

// const Container = styled.div`
//   width: 100%;
//   padding-right: 15px;
//   padding-left: 15px;
//   margin-right: auto;
//   margin-left: auto;
//   max-width: 1200px;
// `;

// const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin-right: -15px;
//   margin-left: -15px;
// `;

// const ContentBlock = styled.div`
//   width: 100%;
// `;

// const SidebarWrapper = styled.div`
//   flex: 0 0 25%;
//   max-width: 25%;
//   padding: 0 15px;

//   @media (max-width: 1199px) {
//     flex: 0 0 33.333333%;
//     max-width: 33.333333%;
//   }

//   @media (max-width: 991px) {
//     flex: 0 0 100%;
//     max-width: 100%;
//     margin-bottom: 30px;
//   }
// `;

// const ChatWrapper = styled.div`
//   flex: 0 0 75%;
//   max-width: 75%;
//   padding: 0 15px;

//   @media (max-width: 1199px) {
//     flex: 0 0 66.666667%;
//     max-width: 66.666667%;
//   }

//   @media (max-width: 991px) {
//     flex: 0 0 100%;
//     max-width: 100%;
//   }
// `;
// // const jobseekerToken = localStorage.getItem("jobSeekerLoginToken");
// // console.log(jobseekerToken);
// function VendorSetting() {
//   const [activeTab, setActiveTab] = useState("navbar");

//   const renderForm = () => {
//     switch (activeTab) {
//       case "navbar":
//         return <NavbarManagementForm />;
//       case "header":
//         return <HeaderManagementForm />;
//       case "footer":
//         return <FooterManagementForm />;
//       case "testimonial":
//         return <TestimonialManagementForm />;
//       case "bulkUpload":
//         return <BulkUploadForm />;
//       default:
//         return <NavbarManagementForm />;
//     }
//   };
//   return (
//     <>
//       {/* <UserHeader2 /> */}
//       {/* {jobseekerToken? <FixedHeader />:""} */}
//      <VendorHeader/>
//       <PageWrapper>
//         <ContentBlock>
//           <Section>
//             <Container>
//               <Row>
//                 <SidebarWrapper>
//                   <VendorCompanySideBar active="form" />
//                 </SidebarWrapper>
//                 <ChatWrapper>
//                   {/* <VendorPartnershipForm /> */}
//                   {/* <NavbarManagementForm/>
//                   <HeaderManagementForm/>
//                   <FooterManagementForm/>
//                   <TestimonialManagementForm/>
//                   <BulkUploadForm /> */}
//                   <>
//                   {[
//           { key: "navbar", label: "Navbar" },
//           { key: "header", label: "Header" },
//           { key: "footer", label: "Footer" },
//           { key: "testimonial", label: "Testimonial" },
//           { key: "bulkUpload", label: "Bulk Upload" },
//         ].map((tab) => (
//           <button
//             key={tab.key}
//             className={`px-4 py-2 ${
//               activeTab === tab.key ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"
//             }`}
//             onClick={() => setActiveTab(tab.key)}
//           >
//             {tab.label}
//           </button>
//         ))}
    
//       <div className="mt-4">{renderForm()}</div>
//                   </>
//                 </ChatWrapper>
//               </Row>
//             </Container>
//           </Section>
//         </ContentBlock>
//       </PageWrapper>

//       <Footer />
//     </>
//   );
// }

// export default VendorSetting;
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import VendorCompanySideBar from "../Vendorsidebar";
import Footer from "../../markup/Layout/Footer";
import VendorHeader from "../../markup/Layout/VendorHeader";
import NavbarManagementForm from "./NavbarForm";
import HeaderManagementForm from "./HeaderManagementForm";
import FooterManagementForm from "./FooterManagement";
import TestimonialManagementForm from "./TestimonialManagement";
import BulkUploadForm from "./BulkUploadForm";

// Animation for tab transition
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  background-color: #f4f7fa;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  background-color: white;
  padding-top: 50px;
  padding-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const ContentBlock = styled.div`
  width: 100%;
`;

const SidebarWrapper = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 15px;

  @media (max-width: 1199px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const ChatWrapper = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
  padding: 0 15px;

  @media (max-width: 1199px) {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.25rem;
  margin-right: 0.5rem;
  border: none;
  background-color: ${props => props.active ? '#3b82f6' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f3f4f6'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: #3b82f6;
    transition: width 0.3s ease;
  }
`;

const AnimatedFormContainer = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
`;

function VendorSetting() {
  const [activeTab, setActiveTab] = useState("navbar");

  const renderForm = () => {
    switch (activeTab) {
      case "navbar":
        return <NavbarManagementForm />;
      case "header":
        return <HeaderManagementForm />;
      case "footer":
        return <FooterManagementForm />;
      case "testimonial":
        return <TestimonialManagementForm />;
      case "bulkUpload":
        return <BulkUploadForm />;
      default:
        return <NavbarManagementForm />;
    }
  };

  const tabs = [
    { key: "navbar", label: "Navbar" },
    { key: "header", label: "Header" },
    { key: "footer", label: "Footer" },
    { key: "testimonial", label: "Testimonial" },
    { key: "bulkUpload", label: "Bulk Upload" },
  ];

  return (
    <>
      <VendorHeader />
      <PageWrapper>
        <ContentBlock>
          <Section>
            <Container>
              <Row>
                <SidebarWrapper>
                  <VendorCompanySideBar active="form" />
                </SidebarWrapper>
                <ChatWrapper>
                  <TabContainer>
                    {tabs.map((tab) => (
                      <TabButton
                        key={tab.key}
                        active={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        {tab.label}
                      </TabButton>
                    ))}
                  </TabContainer>
                  
                  <AnimatedFormContainer key={activeTab}>
                    {renderForm()}
                  </AnimatedFormContainer>
                </ChatWrapper>
              </Row>
            </Container>
          </Section>
        </ContentBlock>
      </PageWrapper>
      <Footer />
    </>
  );
}

export default VendorSetting;
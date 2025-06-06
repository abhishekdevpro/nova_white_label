import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import VendorCompanySideBar from "../Vendorsidebar";
import Footer from "../../markup/Layout/Footer";
import VendorHeader from "../../markup/Layout/VendorHeader";
import NavbarManagementForm from "./NavbarForm";
import HeaderManagementForm from "./HeaderManagementForm";
import FooterManagementForm from "./FooterManagement";
import TestimonialManagementForm from "./TestimonialManagement";
import BulkUploadForm from "./BulkUploadForm";
import Popup from "./Popup";
import Pricing from "./Pricing";
import AboutUsForm from "./AboutUs";
import AboutusForm from "../../adminPanel/CMS/About";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  padding-top: 60px; // Add padding for fixed header
`;

const ContentWrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  background-color: white;
  padding: 20px 0;
  @media (min-width: 768px) {
    padding-top: 50px;
    padding-bottom: 20px;
  }
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
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
  margin-bottom: 20px;
  position: relative;

  @media (min-width: 992px) {
    flex: 0 0 25%;
    max-width: 25%;
    margin-bottom: 0;
  }
`;

const MobileSidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isVisible ? '0' : '-100%'};
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  z-index: 1000;
  transition: left 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (min-width: 992px) {
    position: relative;
    width: 100%;
    max-width: none;
    height: auto;
    box-shadow: none;
    left: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isVisible ? 'block' : 'none'};

  @media (min-width: 992px) {
    display: none;
  }
`;

const ChatWrapper = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;

  @media (min-width: 992px) {
    flex: 0 0 75%;
    max-width: 75%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  background-color: ${props => props.active ? '#3b82f6' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '400'};
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;

  @media (min-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 16px;
  }

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
  padding: 1px;
  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  
  @media (min-width: 992px) {
    display: none;
  }
`;

// function VendorSetting() {
//   const [activeTab, setActiveTab] = useState("navbar");
//   const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
//       case "about-us":
//         return <AboutusForm />;
//       case "bulkUpload":
//         return <BulkUploadForm />;
//       case "popup":
//         return <Popup />;
      
//       default:
//         return <NavbarManagementForm />;
//     }
//   };

//   const tabs = [
//     { key: "navbar", label: "Navbar" },
//     { key: "header", label: "Header" },
//     { key: "footer", label: "Footer" },
//     { key: "testimonial", label: "Testimonial" },
//     { key: "about-us", label: "About Us" },
//     { key: "bulkUpload", label: "Bulk Upload" },
//     { key: "popup", label: "Form" },

//   ];

//   return (
//     <>
//       <VendorHeader />
//       <PageWrapper>
//         <ContentBlock>
//           <Section>
//             <Container>
//               <Row>
               
                
//                     <VendorCompanySideBar active="setting" />
                
//                 <ChatWrapper>
//                   <TabContainer>
//                     {tabs.map((tab) => (
//                       <TabButton
//                         key={tab.key}
//                         active={activeTab === tab.key}
//                         onClick={() => setActiveTab(tab.key)}
//                       >
//                         {tab.label}
//                       </TabButton>
//                     ))}
//                   </TabContainer>
                  
//                   <AnimatedFormContainer key={activeTab}>
//                     {renderForm()}
//                   </AnimatedFormContainer>
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

function VendorSetting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryTab = searchParams.get("tab");
  const defaultTab = queryTab || "navbar";

  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Sync tab if query param changes from outside
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey }); // Updates URL query string
  };

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
      case "about-us":
        return <AboutusForm />;
      case "bulkUpload":
        return <BulkUploadForm />;
      case "popup":
        return <Popup />;
      default:
        return <NavbarManagementForm />;
    }
  };

  const tabs = [
    { key: "navbar", label: "Navbar" },
    { key: "header", label: "Header" },
    { key: "footer", label: "Footer" },
    { key: "testimonial", label: "Testimonial" },
    { key: "about-us", label: "About Us" },
    { key: "bulkUpload", label: "Bulk Upload" },
    { key: "popup", label: "Form" },
  ];

  return (
    <>
      <VendorHeader />
      <PageWrapper>
        <ContentBlock>
          <Section>
            <Container>
              <Row>
                <VendorCompanySideBar active="setting" />
                <ChatWrapper>
                  <TabContainer>
                    {tabs.map((tab) => (
                      <TabButton
                        key={tab.key}
                        active={activeTab === tab.key}
                        onClick={() => handleTabClick(tab.key)}
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
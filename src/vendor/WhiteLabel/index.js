import React from "react";
import styled from "styled-components";
import VendorCompanySideBar from "../Vendorsidebar";
import VendorPartnershipForm from "./Form";
import UserHeader2 from "../../markup/Layout/Header2";
import Footer from "../../markup/Layout/Footer";

const PageWrapper = styled.div`
  background-color: white;
`;

const ContentWrapper = styled.div`
  background-color: white;
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
const jobseekerToken = localStorage.getItem("jobSeekerLoginToken");
console.log(jobseekerToken);
function WhiteLabelForm() {
  return (
    <>
      <UserHeader2 />
      {/* {jobseekerToken? <FixedHeader />:""} */}

      <PageWrapper>
        <ContentBlock>
          <Section>
            <Container>
              <Row>
                <SidebarWrapper>
                  <VendorCompanySideBar active="form" />
                </SidebarWrapper>
                <ChatWrapper>
                  <VendorPartnershipForm />
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

export default WhiteLabelForm;

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TabNavigation from "./tabs/TabNavigation";
import BasicInformationTab from "./tabs/BasicInformationTab";
import AboutCompanyTab from "./tabs/AboutCompanyTab";
import ImagesTab from "./tabs/ImagesTab";
import TeamMembersTab from "./tabs/TeamMembersTab";
import { useCompanyData } from "./hooks/useCompanyData";
import { useMakesUsUnique } from "./hooks/useMakesUsUnique";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { useInsideImages } from "./hooks/useInsideImages";
import "./styles/SocialNetworkBox.css";
import UserHeader2 from "../../../markup/Layout/Header2";
import CompanySideBar from "../../Layout/companySideBar";

import VendorHeader from "../../../markup/Layout/VendorHeader";
import VendorCompanySideBar from "../../../vendor/Vendorsidebar";
import { Link } from "react-router-dom";
import EmployeeHeader2 from "../../Layout/Header2";

const BrandingTabs = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const isEmployer = window.location.href.includes("employer");

  const {
    companyData,
    setCompanyData,
    handleInputChange,
    fetchCompanyData,
    handleSave,
    handleAboutSave,
  } = useCompanyData();

  // Create a wrapper function to pass the selectedPdf
  const handleAboutSaveWrapper = (event) => {
    handleAboutSave(event, selectedImages, selectedPdf);
  };

  const { makesUsUnique, setMakesUsUnique } = useMakesUsUnique();

  const {
    teamMembers,
    setTeamMembers,
    editingId,
    setEditingId,
    tempMember,
    setTempMember,
    addTeamMember,
    saveTeamMember,
    cancelEdit,
    forceUpdate,
  } = useTeamMembers();

  const {
    insideCultureImages,
    setInsideCultureImages,
    insideWorkplaceImages,
    setInsideWorkplaceImages,
    insidePeopleImages,
    setInsidePeopleImages,
    handleInsideImageUpload,
    removeInsideImage,
    handleInsideImagesSave,
  } = useInsideImages();

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "about", label: "About Company" },
    { id: "images", label: "Inside Company Images" },
    { id: "team", label: "Team Members" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 3) {
      toast.error("You can only upload up to 3 images");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedPdf(file);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  useEffect(() => {
    // Pass the actual setter functions from useInsideImages hook
    fetchCompanyData(
      setMakesUsUnique,
      setInsideCultureImages, // This should properly set the initial state
      setInsideWorkplaceImages, // This should properly set the initial state
      setInsidePeopleImages, // This should properly set the initial state
      setSelectedImages
    );
  }, [setInsideCultureImages, setInsideWorkplaceImages, setInsidePeopleImages]);

  console.log("Debug - Images state:");
  console.log("insideCultureImages:", insideCultureImages);
  console.log("insideWorkplaceImages:", insideWorkplaceImages);
  console.log("insidePeopleImages:", insidePeopleImages);
  console.log(
    "companyData.inside_culture_images:",
    companyData.inside_culture_images
  );

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="">
              <div className="">
                <div className="">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Company Branding
                      </h5>
                      <Link
                        to={
                          localStorage.getItem("vendorToken")
                            ? `/vendor/branding-company`
                            : `/employer/showcase`
                        }
                        className={`site-button right-arrow button-sm float-right`}
                      >
                        View
                      </Link>
                    </div>
                    <form>
                      <TabNavigation
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />

                      <div className="tab-content">
                        <BasicInformationTab
                          activeTab={activeTab}
                          companyData={companyData}
                          handleInputChange={handleInputChange}
                          makesUsUnique={makesUsUnique}
                          setMakesUsUnique={setMakesUsUnique}
                          setCompanyData={setCompanyData}
                          handleSave={handleSave}
                        />

                        <AboutCompanyTab
                          activeTab={activeTab}
                          companyData={companyData}
                          handleInputChange={handleInputChange}
                          setCompanyData={setCompanyData}
                          selectedImages={selectedImages}
                          handleImageUpload={handleImageUpload}
                          removeImage={removeImage}
                          selectedPdf={selectedPdf}
                          setSelectedPdf={setSelectedPdf}
                          handlePdfUpload={handlePdfUpload}
                          handleAboutSave={handleAboutSaveWrapper}
                        />

                        <ImagesTab
                          activeTab={activeTab}
                          insideCultureImages={insideCultureImages}
                          insideWorkplaceImages={insideWorkplaceImages}
                          insidePeopleImages={insidePeopleImages}
                          handleInsideImageUpload={handleInsideImageUpload}
                          removeInsideImage={removeInsideImage}
                          handleInsideImagesSave={handleInsideImagesSave}
                        />

                        <TeamMembersTab
                          activeTab={activeTab}
                          teamMembers={teamMembers}
                          editingId={editingId}
                          tempMember={tempMember}
                          setTempMember={setTempMember}
                          addTeamMember={addTeamMember}
                          saveTeamMember={saveTeamMember}
                          cancelEdit={cancelEdit}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default BrandingTabs;

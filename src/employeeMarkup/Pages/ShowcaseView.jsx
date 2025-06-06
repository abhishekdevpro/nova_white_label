import React from "react";
import ShowcaseComponent from "./showcase/Showcase";
import Header from "../Layout/Header";
import UserHeader from "../../markup/Layout/Header";
import Footer from "../../markup/Layout/Footer";
import VendorHeader from "../../markup/Layout/VendorHeader";

const ShowcaseView = () => {
  const Employeetoken = localStorage.getItem("employeeLoginToken");
  const vendorToken = localStorage.getItem("vendorToken");

  const path = window.location.pathname;

  const showVendorHeader = path.includes("/vendor") && vendorToken;
  const showEmployeeHeader = Employeetoken && path.includes("/employer");
  return (
    <>
      {showVendorHeader ? <VendorHeader /> : showEmployeeHeader ? <Header /> : <UserHeader />}
      <div className="min-h-screen bg-gray-50">
        <ShowcaseComponent />
      </div>
      <Footer />
    </>
  );
};

export default ShowcaseView;

import React from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

import "./aboutus.css";

import AdminAboutus from "../../adminPanel/CMS/About/AdminAboutus";

// Aboutus1 :
function Aboutus1() {
  return (
    <>
      <Header />

      <AdminAboutus />
      <Footer />
    </>
  );
}

export default Aboutus1;
import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";

import axios from "axios";

import "./aboutus.css";
import MoreServices from "../../adminPanel/CMS/About/MoreServices";
import Novajobsus from "../../adminPanel/CMS/About/Novajobsus";
import ForEmployer from "../../adminPanel/CMS/About/ForEmployer";
import ForJobseeker from "../../adminPanel/CMS/About/ForJobseeker";
import Introductions from "../../adminPanel/CMS/About/Introductions";

// Aboutus1 :
function Aboutus1() {
  const [sections, setSections] = React.useState([]);

  // Fetch data from the GET API
  const fetchContent = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/admin/get-aboutus-content"
      );
      const data = response.data;
      setSections(data.data || []);
      // Fallback content if fields are empty or null
    } catch (error) {
      console.error("Error fetching content:", error);
      // alert("An error occurred while fetching content.");
    }
  };
  useEffect(() => {
    fetchContent();
  }, []);

  const getSectionData = (id) => {
    console.log("sections", sections);
    return sections.find((section) => section.id === id);
  };
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx">
                  {sections.length ? (
                    <>
                      <Introductions introductionData={getSectionData(1)} />
                      <ForJobseeker forJobseekerData={getSectionData(2)} />
                      <ForEmployer forEmployerData={getSectionData(3)} />
                      <Novajobsus novaJobsusData={getSectionData(4)} />
                      <MoreServices moreServicesData={getSectionData(5)} />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Aboutus1;

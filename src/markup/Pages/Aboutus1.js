// import React from "react";
// import Header from "./../Layout/Header";
// import Footer from "./../Layout/Footer";

// import "./aboutus.css";

// import AdminAboutus from "../../adminPanel/CMS/About/AdminAboutus";

// // Aboutus1 :
// function Aboutus1() {
//   return (
//     <>
//       <Header />

//       <AdminAboutus />
//       <Footer />
//     </>
//   );
// }

// export default Aboutus1;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import Introductions from "../../adminPanel/CMS/About/Introductions";
import ForJobseeker from "../../adminPanel/CMS/About/ForJobseeker";
import ForEmployer from "../../adminPanel/CMS/About/ForEmployer";
import Novajobsus from "../../adminPanel/CMS/About/Novajobsus";
import MoreServices from "../../adminPanel/CMS/About/MoreServices";
import FullPageLoader from "../skeleton/FullPageLoader";

function AboutUs() {
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch data from the GET API
  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://apiwl.novajobs.us/api/admin/get-aboutus-content"
      );
      const data = response.data;
      setSections(data.data || []);
      // Fallback content if fields are empty or null
    } catch (error) {
      console.error("Error fetching content:", error);
      // alert("An error occurred while fetching content.");
    } finally {
      setLoading(false);
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
      {loading && <FullPageLoader isLoading={loading} />}
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx">
                  <div className=" justify-content-center ">
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
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;

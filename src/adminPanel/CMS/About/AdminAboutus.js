// import React, { useEffect, useState } from "react";

// import axios from "axios";

// import Introductions from "./Introductions";
// import ForJobseeker from "./ForJobseeker";
// import ForEmployer from "./ForEmployer";
// import Novajobsus from "./Novajobsus";
// import MoreServices from "./MoreServices";

// function AdminAboutus({ projectName }) {
//   const [sections, setSections] = React.useState([]);

//   const [activeSection, setActiveSection] = useState(null);

//   // Fetch data from the GET API
//   const fetchContent = async () => {
//     try {
//       const response = await axios.get(
//         `https://apiwl.novajobs.us/api/admin${
//           projectName ? projectName : ""
//         }/get-aboutus-content`
//       );
//       const data = response.data;
//       setSections(data.data || []);
//       // Fallback content if fields are empty or null
//     } catch (error) {
//       console.error("Error fetching content:", error);
//       // alert("An error occurred while fetching content.");
//     }
//   };
//   useEffect(() => {
//     fetchContent();
//   }, [projectName]);

//   const getSectionData = (id) => {
//     console.log("sections", sections);
//     return sections.find((section) => section.id === id);
//   };

//   const toggleSection = (id) => {
//     setActiveSection(activeSection === id ? null : id);
//   };
//   return (
//     <>
//       <div className="page-content bg-white">
//         <div className="content-block">
//           <div className="section-full bg-white p-t50 p-b20">
//             <div className="container">
//               <div className="m-b30">
//                 <div className="job-bx">
//                   {" "}
//                   <div className="accordion-container">
//                     {sections.length ? (
//                       <>
//                         <div className="accordion-item">
//                           <button
//                             className="accordion-title"
//                             onClick={() => toggleSection(1)}
//                           >
//                             Introduction
//                           </button>
//                           {activeSection === 1 && (
//                             <div className="accordion-content">
//                               <Introductions
//                                 introductionData={getSectionData(1)}
//                               />
//                             </div>
//                           )}
//                         </div>

//                         <div className="accordion-item">
//                           <button
//                             className="accordion-title"
//                             onClick={() => toggleSection(2)}
//                           >
//                             For Jobseeker
//                           </button>
//                           {activeSection === 2 && (
//                             <div className="accordion-content">
//                               <ForJobseeker
//                                 forJobseekerData={getSectionData(2)}
//                               />
//                             </div>
//                           )}
//                         </div>

//                         <div className="accordion-item">
//                           <button
//                             className="accordion-title"
//                             onClick={() => toggleSection(3)}
//                           >
//                             For Employer
//                           </button>
//                           {activeSection === 3 && (
//                             <div className="accordion-content">
//                               <ForEmployer
//                                 forEmployerData={getSectionData(3)}
//                               />
//                             </div>
//                           )}
//                         </div>

//                         <div className="accordion-item">
//                           <button
//                             className="accordion-title"
//                             onClick={() => toggleSection(4)}
//                           >
//                             NovaJobs Us
//                           </button>
//                           {activeSection === 4 && (
//                             <div className="accordion-content">
//                               <Novajobsus novaJobsusData={getSectionData(4)} />
//                             </div>
//                           )}
//                         </div>

//                         <div className="accordion-item">
//                           <button
//                             className="accordion-title"
//                             onClick={() => toggleSection(5)}
//                           >
//                             More Services
//                           </button>
//                           {activeSection === 5 && (
//                             <div className="accordion-content">
//                               <MoreServices
//                                 moreServicesData={getSectionData(5)}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </>
//                     ) : null}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AdminAboutus;
import React, { useEffect, useState } from "react";
import axios from "axios";

import Introductions from "./Introductions";
import ForJobseeker from "./ForJobseeker";
import ForEmployer from "./ForEmployer";
import Novajobsus from "./Novajobsus";
import MoreServices from "./MoreServices";

function AdminAboutus({ projectName }) {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
 const domain = window.location.origin.includes("localhost")
  ? "https://novajobs.us"
  : window.location.origin;
  // Fetch data from the GET API
  const fetchContent = async () => {
    try {
      const url = `https://apiwl.novajobs.us/api/admin${
        projectName || ""
      }/get-aboutus-content?domain=${domain}`;
      console.log("Fetching from URL:", url);

      const response = await axios.get(url);
      console.log("API Response:", response.data);

      if (!response.data || !Array.isArray(response.data.data)) {
        console.error("Unexpected API response format:", response.data);
        setSections([]); // Ensuring sections is always an array
        return;
      }
      // console.log(response.data.data);
      setSections(response.data.data);
    } catch (error) {
      console.error("Error fetching content:", error);
      setSections([]);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [projectName]);

  const getSectionData = (id) => {
    if (!sections || sections.length === 0) {
      console.error("Sections array is empty!");
      return { title: "Not Found", content: "Data unavailable." };
    }
    const section = sections.find((section) => section.id === id);
    if (!section) {
      console.error(`Section with id ${id} not found!`);
      return { title: "Not Found", content: "Data unavailable." };
    }
    console.log(section,"sectionq");
    return section;
  };

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };
console.log(sections,"sections");
  return (
    <div className="page-content bg-white">
      <div className="content-block">
        <div className="section-full bg-white p-t50 p-b20">
          <div className="container">
            <div className="m-b30">
              <div className="job-bx">
                <div className="accordion-container">
                  {sections.length > 0 ? (
                    sections.map((section) => (
                      
                      <div key={section.id} className="accordion-item">
                        {console.log(section,"sectionsection")}
                        <button
                          className="accordion-title"
                          onClick={() => toggleSection(section.id)}
                        >
                          {section.title || "Untitled Section"}
                        </button>
                        {activeSection === section.id && (
                          <div className="accordion-content">
                            {section.id === 1 && (
                              <Introductions
                                introductionData={getSectionData(1)}
                                projectName={projectName}
                              />
                            )}
                            {section.id === 2 && (
                              <ForJobseeker
                                forJobseekerData={getSectionData(2)}
                                projectName={projectName}
                              />
                            )}
                            {section.id === 3 && (
                              <ForEmployer
                                forEmployerData={getSectionData(3)}
                                projectName={projectName}
                              />
                            )}
                            {section.id === 4 && (
                              <Novajobsus
                                novaJobsusData={getSectionData(4)}
                                projectName={projectName}
                              />
                            )}
                            {section.id === 5 && (
                              <MoreServices
                                moreServicesData={getSectionData(5)}
                                projectName={projectName}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No content available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAboutus;

import React, { useEffect, useState } from "react";

import axios from "axios";

import Introductions from "./Introductions";
import ForJobseeker from "./ForJobseeker";
import ForEmployer from "./ForEmployer";
import Novajobsus from "./Novajobsus";
import MoreServices from "./MoreServices";

function AdminAboutus({ projectName }) {
  const [sections, setSections] = React.useState([]);


  const [activeSection, setActiveSection] = useState(null);

  // Fetch data from the GET API
  const fetchContent = async () => {
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/admin${
          projectName ? projectName : ""
        }/get-aboutus-content`
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
  }, [projectName]);

  const getSectionData = (id) => {
    console.log("sections", sections);
    return sections.find((section) => section.id === id);
  };


  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx">

                  {" "}
                  <div className="accordion-container">
                    {sections.length ? (
                      <>
                        <div className="accordion-item">
                          <button
                            className="accordion-title"
                            onClick={() => toggleSection(1)}
                          >
                            Introduction
                          </button>
                          {activeSection === 1 && (
                            <div className="accordion-content">
                              <Introductions
                                introductionData={getSectionData(1)}
                              />
                            </div>
                          )}
                        </div>

                        <div className="accordion-item">
                          <button
                            className="accordion-title"
                            onClick={() => toggleSection(2)}
                          >
                            For Jobseeker
                          </button>
                          {activeSection === 2 && (
                            <div className="accordion-content">
                              <ForJobseeker
                                forJobseekerData={getSectionData(2)}
                              />
                            </div>
                          )}
                        </div>

                        <div className="accordion-item">
                          <button
                            className="accordion-title"
                            onClick={() => toggleSection(3)}
                          >
                            For Employer
                          </button>
                          {activeSection === 3 && (
                            <div className="accordion-content">
                              <ForEmployer
                                forEmployerData={getSectionData(3)}
                              />
                            </div>
                          )}
                        </div>

                        <div className="accordion-item">
                          <button
                            className="accordion-title"
                            onClick={() => toggleSection(4)}
                          >
                            NovaJobs Us
                          </button>
                          {activeSection === 4 && (
                            <div className="accordion-content">
                              <Novajobsus novaJobsusData={getSectionData(4)} />
                            </div>
                          )}
                        </div>

                        <div className="accordion-item">
                          <button
                            className="accordion-title"
                            onClick={() => toggleSection(5)}
                          >
                            More Services
                          </button>
                          {activeSection === 5 && (
                            <div className="accordion-content">
                              <MoreServices
                                moreServicesData={getSectionData(5)}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAboutus;

// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import Sidebar from "../../Sidebar";
// import CustomNavbar from "../../Navbar";
// import Introductions from "./Introductions";
// import ForJobseeker from "./ForJobseeker";
// import ForEmployer from "./ForEmployer";
// import Novajobsus from "./Novajobsus";
// import MoreServices from "./MoreServices";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Default items order
// const defaultSections = [
//   { id: "1", content: <Introductions /> },
//   { id: "2", content: <ForJobseeker /> },
//   { id: "3", content: <ForEmployer /> },
//   { id: "4", content: <Novajobsus /> },
//   { id: "5", content: <MoreServices /> },
// ];

// function AboutusForm() {
//   const [sections, setSections] = React.useState(defaultSections);

//   // Function to handle drag end
//   const onDragEnd = (result) => {
//     const { destination, source } = result;

//     // If dropped outside of a valid destination, or in the same spot, do nothing
//     if (!destination || destination.index === source.index) {
//       return;
//     }

//     // Reorder the sections
//     const updatedSections = Array.from(sections);
//     const [movedItem] = updatedSections.splice(source.index, 1);
//     updatedSections.splice(destination.index, 0, movedItem);

//     setSections(updatedSections);
//   };

//   return (
//     <>
//       <CustomNavbar />
//       <Container fluid>
//         <Row>
//           <Col md={2} className="p-0">
//             <Sidebar />
//           </Col>
//           <Col md={10}>
//             <Container
//               fluid
//               className="p-4"
//               style={{ overflow: "auto", maxHeight: "100vh" }}
//             >
//               <div className="page-content bg-white">
//                 <div className="content-block">
//                   <div className="section-full bg-white p-t50 p-b20">
//                     <div className="container">
//                       <div className="m-b30">
//                         <div className="job-bx">
//                           <DragDropContext onDragEnd={onDragEnd}>
//                             <Droppable droppableId="sections">
//                               {(provided) => (
//                                 <div
//                                   {...provided.droppableProps}
//                                   ref={provided.innerRef}
//                                 >
//                                   {sections.map((section, index) => (
//                                     <Draggable
//                                       key={section.id}
//                                       draggableId={section.id}
//                                       index={index}
//                                     >
//                                       {(provided, snapshot) => (
//                                         <div
//                                           ref={provided.innerRef}
//                                           {...provided.draggableProps}
//                                           {...provided.dragHandleProps}
//                                           className={`draggable-item ${
//                                             snapshot.isDragging
//                                               ? "dragging"
//                                               : ""
//                                           }`}
//                                           style={{
//                                             ...provided.draggableProps.style,
//                                             marginBottom: "15px",
//                                           }}
//                                         >
//                                           {section.content}
//                                         </div>
//                                       )}
//                                     </Draggable>
//                                   ))}
//                                   {provided.placeholder}
//                                 </div>
//                               )}
//                             </Droppable>
//                           </DragDropContext>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default AboutusForm;

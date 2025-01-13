import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Sidebar";
import CustomNavbar from "../../Navbar";
import Introductions from "./Introductions";
import ForJobseeker from "./ForJobseeker";
import ForEmployer from "./ForEmployer";
import Novajobsus from "./Novajobsus";
import MoreServices from "./MoreServices";

function AboutusForm() {
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
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container
              fluid
              className="p-4"
              style={{ overflow: "auto", maxHeight: "100vh" }}
            >
              <div className="page-content bg-white">
                <div className="content-block">
                  <div className="section-full bg-white p-t50 p-b20">
                    <div className="container">
                      <div className="m-b30">
                        <div className="job-bx">
                          {sections.length ? (
                            <>
                              <Introductions
                                introductionData={getSectionData(1)}
                              />
                              <ForJobseeker
                                forJobseekerData={getSectionData(2)}
                              />
                              <ForEmployer
                                forEmployerData={getSectionData(3)}
                              />
                              <Novajobsus novaJobsusData={getSectionData(4)} />
                              <MoreServices
                                moreServicesData={getSectionData(5)}
                              />
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutusForm;

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

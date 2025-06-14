// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Carousel from "react-bootstrap/Carousel";
// import "./aboutus.css";
// import axios from "axios";
// import pic1 from "../../../assests/1 (1).png";
// import pic2 from "../../../assests/1 (2).png";
// import pic3 from "../../../assests/1 (3).png";
// import pic4 from "../../../assests/1 (4).png";
// import pic5 from "../../../assests/1 (5).png";
// import pic6 from "../../../assests/1 (6).png";
// import pic7 from "../../../assests/1 (7).png";
// import pic8 from "../../../assests/1 (8).png";
// import pic9 from "../../../assests/1 (9).png";
// import pic10 from "../../../assests/1 (10).png";
// import pic11 from "../../../assests/1 (11).png";
// import pic12 from "../../../assests/1 (12).png";

// function Novajobsus({ novaJobsusData, projectName }) {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [heading, setHeading] = useState("NovaJobs.US");
//   const [paragraph1Content, setParagraph1Content] = useState(`
//     <p>
//       Hyper V Solutions, offers NovaJobs.us, which is AI-Enabled
//       Job Portal with advanced functionality like Jobs search,
//       Profile listing, Skill Test, Resume Building, AI Data
//       Parsing & more.
//     </p>
//   `);

//   const [images, setImages] = useState([
//     { file: null, preview: pic1 },
//     { file: null, preview: pic2 },
//     { file: null, preview: pic3 },
//     { file: null, preview: pic4 },
//     { file: null, preview: pic5 },
//     { file: null, preview: pic6 },
//     { file: null, preview: pic7 },
//     { file: null, preview: pic8 },
//     { file: null, preview: pic9 },
//     { file: null, preview: pic10 },
//     { file: null, preview: pic11 },
//     { file: null, preview: pic12 },
//   ]);

//   useEffect(() => {
//     if (!novaJobsusData) return;

//     setHeading(novaJobsusData.title || heading);
//     setParagraph1Content(novaJobsusData.paragraph1 || paragraph1Content);

//     if (novaJobsusData.images) {
//       const imgData = (novaJobsusData.images);
//       const updatedImages = imgData.map((img) => ({
//         file: null,
//         preview: "https://apiwl.novajobs.us" + img,
//       }));
//       setImages(updatedImages);
//     }
//   }, [novaJobsusData]);

//   const handleImageChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages];
//         updatedImages[index] = { file, preview: previewUrl };
//         return updatedImages;
//       });
//     }
//   };

//   const handleAddMoreImages = () => {
//     setImages((prevImages) => [...prevImages, { file: null, preview: null }]);
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     setIsEditing(false);
//     console.log("Saved content:", heading, paragraph1Content, images);

//     const formData = new FormData();
//     formData.append("title", heading);
//     formData.append("paragraph1", paragraph1Content);

//     images.forEach((image) => {
//       if (image.file) {
//         formData.append("images", image.file);
//       }
//     });

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.patch(
//         `https://apiwl.novajobs.us/api/admin/${
//           projectName ? projectName : ""
//         }update-aboutus-content/4`,
//         formData,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("API Response:", response.data);
//     } catch (error) {
//       console.error("Error updating content:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const authToken = localStorage.getItem("authToken");

//   return (
//     <div className="mt-5">
//       {authToken && (
//         <button
//           className="btn btn-warning mt-3 float-end"
//           onClick={() => setIsEditing(true)}
//         >
//           Edit
//         </button>
//       )}
//       <div className="mx-3 mx-lg-5 mb-4 mb-lg-0">
//         {isEditing ? (
//           <div>
//             <label>
//               Heading(Title Mandatory):
//               <input
//                 type="text"
//                 value={heading}
//                 onChange={(e) => setHeading(e.target.value)}
//                 className="form-control"
//               />
//             </label>
//             <h5>Paragraph 1:</h5>
//             <ReactQuill
//               value={paragraph1Content}
//               onChange={setParagraph1Content}
//             />

//             {images.map((image, index) => (
//               <div key={index}>
//                 <label className="mt-3">
//                   Change Image (400px x 800px) {index + 1}:
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(index, e)}
//                   className="form-control mt-2"
//                 />
//                 {image.preview && (
//                   <div className="mt-3">
//                     <strong>Preview {index + 1}:</strong>
//                     <img
//                       src={image.preview}
//                       alt={`Preview ${index + 1}`}
//                       style={{
//                         height: "300px",
//                         width: "600px",
//                         border: "2px solid #ccc",
//                         borderRadius: "10px",
//                         marginTop: "10px",
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}

//             <button
//               className="btn btn-secondary mt-3"
//               onClick={handleAddMoreImages}
//             >
//               Add More Images
//             </button>

//             <button
//               className="btn btn-primary mt-3"
//               onClick={handleSave}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               className="btn btn-secondary mt-3 ms-2"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h1
//               className="mb-4"
//               style={{
//                 fontSize: "clamp(24px, 5vw, 30px)",
//                 fontWeight: "bold",
//               }}
//             >
//               {heading}
//             </h1>
//             <div
//               dangerouslySetInnerHTML={{ __html: paragraph1Content }}
//               style={{ fontSize: "clamp(14px, 3vw, 15px)" }}
//             ></div>

//             <div className="mx-3 mx-lg-5 d-flex justify-content-center position-relative">
//               <Carousel
//                 style={{
//                   width: "800px",
//                   padding: "20px",
//                 }}
//                 prevIcon={
//                   <span
//                     className="carousel-control-prev-icon position-absolute"
//                     style={{ backgroundColor: "#000", right: "200px" }}
//                     aria-hidden="true"
//                   />
//                 }
//                 nextIcon={
//                   <span
//                     className="carousel-control-next-icon position-absolute"
//                     style={{ backgroundColor: "#000", left: "200px" }}
//                     aria-hidden="true"
//                   />
//                 }
//               >
//                 {images.map((image, index) => (
//                   <Carousel.Item key={index}>
//                     <img
//                       className="d-block w-100"
//                       src={image.preview}
//                       alt={`Slide ${index + 1}`}
//                     />
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Novajobsus;

// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Carousel from "react-bootstrap/Carousel";
// import "./aboutus.css";
// import axios from "axios";
// import pic1 from "../../../assests/1 (1).png";
// import pic2 from "../../../assests/1 (2).png";
// import pic3 from "../../../assests/1 (3).png";
// import pic4 from "../../../assests/1 (4).png";
// import pic5 from "../../../assests/1 (5).png";
// import pic6 from "../../../assests/1 (6).png";
// import pic7 from "../../../assests/1 (7).png";
// import pic8 from "../../../assests/1 (8).png";
// import pic9 from "../../../assests/1 (9).png";
// import pic10 from "../../../assests/1 (10).png";
// import pic11 from "../../../assests/1 (11).png";
// import pic12 from "../../../assests/1 (12).png";

// function Novajobsus({ novaJobsusData, projectName }) {
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [heading, setHeading] = useState("NovaJobs.US");
//   const [paragraph1Content, setParagraph1Content] = useState(`
//     <p>
//       Hyper V Solutions, offers NovaJobs.us, which is AI-Enabled
//       Job Portal with advanced functionality like Jobs search,
//       Profile listing, Skill Test, Resume Building, AI Data
//       Parsing & more.
//     </p>
//   `);

//   const [images, setImages] = useState([
//     { file: null, preview: pic1 },
//     { file: null, preview: pic2 },
//     { file: null, preview: pic3 },
//     { file: null, preview: pic4 },
//     { file: null, preview: pic5 },
//     { file: null, preview: pic6 },
//     { file: null, preview: pic7 },
//     { file: null, preview: pic8 },
//     { file: null, preview: pic9 },
//     { file: null, preview: pic10 },
//     { file: null, preview: pic11 },
//     { file: null, preview: pic12 },
//   ]);

//   useEffect(() => {
//     if (!novaJobsusData) return;

//     setHeading(novaJobsusData.title || heading);
//     setParagraph1Content(novaJobsusData.paragraph1 || paragraph1Content);

//     if (novaJobsusData.images) {
//       const imgData = (novaJobsusData.images);
//       const updatedImages = imgData.map((img) => ({
//         file: null,
//         preview: "https://apiwl.novajobs.us" + img,
//       }));
//       setImages(updatedImages);
//     }
//   }, [novaJobsusData]);

//   const handleImageChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setImages((prevImages) => {
//         const updatedImages = [...prevImages];
//         updatedImages[index] = { file, preview: previewUrl };
//         return updatedImages;
//       });
//     }
//   };

//   const handleAddMoreImages = () => {
//     setImages((prevImages) => [...prevImages, { file: null, preview: null }]);
//   };

//   const handleDeleteImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     setIsEditing(false);
//     console.log("Saved content:", heading, paragraph1Content, images);

//     const formData = new FormData();
//     formData.append("title", heading);
//     formData.append("paragraph1", paragraph1Content);

//     images.forEach((image) => {
//       if (image.file) {
//         formData.append("images", image.file);
//       }
//     });

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.patch(
//         `https://apiwl.novajobs.us/api/admin/${
//           projectName ? projectName : ""
//         }update-aboutus-content/4`,
//         formData,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("API Response:", response.data);
//     } catch (error) {
//       console.error("Error updating content:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const authToken = localStorage.getItem("authToken");
//   const handleDelete = (field) => {
//     switch (field) {
//       case "heading":
//         setHeading("");
//         break;
//       case "paragraph1":
//         setParagraph1Content("");
//         break;

//       default:
//         break;
//     }
//   };
//   return (
//     <div className="mt-5">
//       {authToken && (
//         <button
//           className="btn btn-warning mt-3 float-end"
//           onClick={() => setIsEditing(true)}
//         >
//           Edit
//         </button>
//       )}
//       <div className="mx-3 mx-lg-5 mb-4 mb-lg-0">
//         {isEditing ? (
//           <div>
//             <div className="d-flex justify-content-start gap-2">
//               <label>
//                 <h5> Heading(Title Mandatory):</h5>
//                 <input
//                   type="text"
//                   value={heading}
//                   onChange={(e) => setHeading(e.target.value)}
//                   className="form-control"
//                 />
//               </label>
//               <button
//                 className="btn btn-danger mt-4 mb-2 px-4 btn btn-primary"
//                 onClick={() => handleDelete("heading")}
//               >
//                 Delete Heading
//               </button>
//             </div>
//             <button
//               className="btn btn-danger mt-2 mb-2 px-4 btn btn-primary"
//               onClick={() => handleDelete("paragraph1")}
//             >
//               Delete Paragraph 1
//             </button>
//             <h5>Paragraph 1:</h5>
//             <ReactQuill
//               value={paragraph1Content}
//               onChange={setParagraph1Content}
//             />

//             {images.map((image, index) => (
//               <div key={index}>
//                 <label className="mt-3">
//                   Change Image (400px x 800px) {index + 1}:
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleImageChange(index, e)}
//                   className="form-control mt-2"
//                 />
//                 {image.preview && (
//                   <div className="mt-3">
//                     <strong>Preview {index + 1}:</strong>
//                     <img
//                       src={image.preview}
//                       alt={`Preview ${index + 1}`}
//                       style={{
//                         height: "300px",
//                         width: "600px",
//                         border: "2px solid #ccc",
//                         borderRadius: "10px",
//                         marginTop: "10px",
//                       }}
//                     />
//                   </div>
//                 )}
//                 <button
//                   className="btn btn-danger mt-2"
//                   onClick={() => handleDeleteImage(index)}
//                 >
//                   Delete Image {index + 1}
//                 </button>
//               </div>
//             ))}

//             <button
//               className="btn btn-secondary mt-3 "
//               onClick={handleAddMoreImages}
//             >
//               Add More Images
//             </button>

//             <button
//               className="btn btn-primary mt-3 ms-2"
//               onClick={handleSave}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               className="btn btn-secondary mt-3 ms-2"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h1
//               className="mb-4"
//               style={{
//                 fontSize: "clamp(24px, 5vw, 30px)",
//                 fontWeight: "bold",
//               }}
//             >
//               {heading}
//             </h1>
//             <div
//               dangerouslySetInnerHTML={{ __html: paragraph1Content }}
//               style={{ fontSize: "clamp(14px, 3vw, 15px)" }}
//             ></div>

//             <div className="mx-3 mx-lg-5 d-flex justify-content-center position-relative">
//               <Carousel
//                 style={{
//                   width: "800px",
//                   padding: "20px",
//                 }}
//                 prevIcon={
//                   <span
//                     className="carousel-control-prev-icon position-absolute"
//                     style={{ backgroundColor: "#000", right: "200px" }}
//                     aria-hidden="true"
//                   />
//                 }
//                 nextIcon={
//                   <span
//                     className="carousel-control-next-icon position-absolute"
//                     style={{ backgroundColor: "#000", left: "200px" }}
//                     aria-hidden="true"
//                   />
//                 }
//               >
//                 {images.map((image, index) => (
//                   <Carousel.Item key={index}>
//                     <img
//                       className="d-block w-100"
//                       src={image.preview}
//                       alt={`Slide ${index + 1}`}
//                     />
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Novajobsus;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Carousel from "react-bootstrap/Carousel";
import "./aboutus.css";
import axios from "axios";
import pic1 from "../../../assests/1 (1).png";
import pic2 from "../../../assests/1 (2).png";
import pic3 from "../../../assests/1 (3).png";
import pic4 from "../../../assests/1 (4).png";
import pic5 from "../../../assests/1 (5).png";
import pic6 from "../../../assests/1 (6).png";
import pic7 from "../../../assests/1 (7).png";
import pic8 from "../../../assests/1 (8).png";
import pic9 from "../../../assests/1 (9).png";
import pic10 from "../../../assests/1 (10).png";
import pic11 from "../../../assests/1 (11).png";
import pic12 from "../../../assests/1 (12).png";

function Novajobsus({ novaJobsusData, projectName }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("NovaJobs.US");
  const [paragraph1Content, setParagraph1Content] = useState(`
    <p>
      Hyper V Solutions, offers NovaJobs.us, which is AI-Enabled
      Job Portal with advanced functionality like Jobs search,
      Profile listing, Skill Test, Resume Building, AI Data
      Parsing & more.
    </p>
  `);

  const initialImages = [
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
    pic11,
    pic12,
  ].map((pic) => ({ file: null, preview: pic, isVisible: true }));

  const [images, setImages] = useState(initialImages);
  const [showParagraph1, setShowParagraph1] = useState(true); // Toggle visibility of Paragraph 1
  const [showImages, setShowImages] = useState(true); // Toggle visibility of images section
  const [showHeading, setShowHeading] = useState(true); // Toggle visibility of heading
  useEffect(() => {
    if (!novaJobsusData) return;

    setHeading(novaJobsusData.title || heading);
    setParagraph1Content(novaJobsusData.paragraph1 || paragraph1Content);
    setShowHeading(novaJobsusData.is_title_display);
    setShowParagraph1(novaJobsusData.is_paragraph1_display);
    // setShowImages(novaJobsusData.is_images_display);

    if (novaJobsusData.images) {
      const imgData = (novaJobsusData.images);

      const updatedImages = imgData.map((img, index) => ({
        file: null,
        preview: "https://apiwl.novajobs.us" + img,
        // isVisible:
        //   Array.isArray(novaJobsusData.is_images_display) &&
        //   novaJobsusData.is_images_display.length > index
        //     ? novaJobsusData.is_images_display[index]
        //     : true, // Default to true if no specific visibility info is available
        isVisible: (() => {
          try {
            const parsedData = (novaJobsusData.is_images_display); // First parse
            const actualArray = (parsedData[0]); // Second parse to get actual array
            return actualArray[index] === true; // Check for boolean true/false
          } catch (error) {
            console.error("Error parsing is_images_display:", error);
            return true; // Default to true in case of an error
          }
        })(),
      }));

      setImages(updatedImages);
    }
  }, [novaJobsusData]);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = {
          ...updatedImages[index],
          file,
          preview: previewUrl,
        };
        return updatedImages;
      });
    }
  };

  const handleAddMoreImages = () => {
    setImages((prevImages) => [...prevImages, { file: null, preview: null }]);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  // const handleToggleImage = (index) => {
  //   setImages((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages[index].isVisible = !updatedImages[index].isVisible;
  //     return updatedImages;
  //   });
  // };
  const handleToggleImage = (index) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, isVisible: !img.isVisible } : img
      )
    );
  };

  const handleSave = async () => {
    setLoading(true);
    setIsEditing(false);
    console.log("Saved content:", heading, paragraph1Content, images);

    const formData = new FormData();
    formData.append("title", heading);
    formData.append("paragraph1", paragraph1Content);

    formData.append("is_title_display", showHeading);
    formData.append("is_paragraph1_display", showParagraph1);
    // formData.append("is_images_display", showImages);
    formData.append(
      "is_images_display",
      JSON.stringify(images.map((img) => img.isVisible))
    );
    images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    try {
        const authToken = localStorage.getItem("authToken") || localStorage.getItem("vendorToken");

      const response = await axios.patch(
        `https://apiwl.novajobs.us/api/admin/${
          projectName ? projectName : ""
        }update-aboutus-content/4`,
        formData,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating content:", error);
    } finally {
      setLoading(false);
    }
  };

    const authToken = localStorage.getItem("authToken") || localStorage.getItem("vendorToken");


  const handleDelete = (field) => {
    switch (field) {
      case "heading":
        setHeading("");
        break;
      case "paragraph1":
        setParagraph1Content("");
        break;
      default:
        break;
    }
  };

  return (
    // <div className="mt-5">
    //   {authToken && (
    //     <button
    //       className="btn btn-warning mt-3 float-end"
    //       onClick={() => setIsEditing(true)}
    //     >
    //       Edit
    //     </button>
    //   )}
    //   <div className="mx-3 mx-lg-5 mb-4 mb-lg-0">
    //     {isEditing ? (
    //       <div>

    //         <div className="d-flex justify-content-start gap-2">
    //           <div className="d-flex justify-content-start gap-2">
    //             <label className="form-check form-switch">
    //               <input
    //                 className="form-check-input"
    //                 type="checkbox"
    //                 checked={showHeading}
    //                 onChange={() => setShowHeading(!showHeading)}
    //               />
    //             </label>
    //           </div>
    //           <label>
    //             <h5> Heading(Title Mandatory):</h5>
    //             {showHeading && (
    //               <input
    //                 type="text"
    //                 value={heading}
    //                 onChange={(e) => setHeading(e.target.value)}
    //                 className="form-control"
    //                 style={{ marginBottom: "10px" }}
    //               />
    //             )}
    //           </label>
    //         </div>
    //         <div className="d-flex justify-content-start gap-4">
    //           <div className="d-flex justify-content-start gap-2">
    //             <label className="form-check form-switch mt-4 mb-2">
    //               <input
    //                 className="form-check-input"
    //                 type="checkbox"
    //                 id="toggleParagraph1"
    //                 checked={showParagraph1}
    //                 onChange={() => setShowParagraph1(!showParagraph1)}
    //               />
    //             </label>
    //             <div>
    //               <h5>Paragraph 1:</h5>
    //               {showParagraph1 && (
    //                 <ReactQuill
    //                   value={paragraph1Content}
    //                   onChange={setParagraph1Content}
    //                 />
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //         <>
    //           {images.map((image, index) => (
    //             <div key={index}>
    //               <div className="d-flex justify-content-start gap-2">
    //                 <label className="form-check form-switch mt-4 mb-2">
    //                   <label className="form-check form-switch mt-4 mb-2">
    //                     <input
    //                       className="form-check-input"
    //                       type="checkbox"
    //                       checked={image.isVisible}
    //                       onChange={() => handleToggleImage(index)}
    //                     />
    //                     <span className="form-check-label">

    //                       {/* {image.isVisible ? "Hide" : "Show"}  */}
    //                       Image {index + 1}
    //                     </span>
    //                   </label>
    //                   {image.isVisible && (
    //                     <div>
    //                       <label className="mt-3">
    //                         Change Image (400px x 800px) {index + 1}:
    //                       </label>
    //                       <input
    //                         type="file"
    //                         accept="image/*"
    //                         onChange={(e) => handleImageChange(index, e)}
    //                         className="form-control mt-2"
    //                       />
    //                       {image.preview && (
    //                         <div className="mt-3">
    //                           <strong>Preview {index + 1}:</strong>
    //                           <img
    //                             src={image.preview}
    //                             alt={`Preview ${index + 1}`}
    //                             style={{
    //                               height: "300px",
    //                               width: "600px",
    //                               border: "2px solid #ccc",
    //                               borderRadius: "10px",
    //                               marginTop: "10px",
    //                             }}
    //                           />
    //                         </div>
    //                       )}
    //                     </div>
    //                   )}
    //                 </label>
    //               </div>
    //             </div>
    //           ))}


    //           <button
    //             className="btn btn-secondary mt-3 "
    //             onClick={handleAddMoreImages}
    //           >
    //             Add More Images
    //           </button>
    //         </>


    //         <div className="mt-4">
    //           <button
    //             className="btn btn-primary mt-3 ms-2"
    //             onClick={handleSave}
    //             disabled={loading}
    //           >
    //             {loading ? "Saving..." : "Save"}
    //           </button>
    //           <button
    //             className="btn btn-secondary mt-3 ms-2"
    //             onClick={() => setIsEditing(false)}
    //           >
    //             Cancel
    //           </button>
    //         </div>

    //       </div>
    //     ) : (
    //       <div>
    //         {showHeading && (
    //           <h1
    //             className="mb-4"
    //             style={{
    //               fontSize: "clamp(24px, 5vw, 30px)",
    //               fontWeight: "bold",
    //             }}
    //           >
    //             {heading}
    //           </h1>
    //         )}
    //         {showParagraph1 && (
    //           <div
    //             dangerouslySetInnerHTML={{ __html: paragraph1Content }}
    //             style={{ fontSize: "clamp(14px, 3vw, 15px)" }}
    //           ></div>
    //         )}

    //         <div className="mx-3 mx-lg-5 d-flex justify-content-center position-relative">
    //           <Carousel
    //             style={{
    //               width: "800px",
    //               padding: "20px",
    //             }}
    //             prevIcon={
    //               <span
    //                 className="carousel-control-prev-icon position-absolute"
    //                 style={{ backgroundColor: "#000", right: "200px" }}
    //                 aria-hidden="true"
    //               />
    //             }
    //             nextIcon={
    //               <span
    //                 className="carousel-control-next-icon position-absolute"
    //                 style={{ backgroundColor: "#000", left: "200px" }}
    //                 aria-hidden="true"
    //               />
    //             }
    //           >
    //             {images.map((image, index) =>
    //               image.isVisible ? (
    //                 <Carousel.Item key={index}>
    //                   <img
    //                     className="d-block w-100"
    //                     src={image.preview}
    //                     alt={`Slide ${index + 1}`}
    //                   />
    //                 </Carousel.Item>
    //               ) : null
    //             )}
    //           </Carousel>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="container-fluid px-0">
    <div className="row">
      <div className="col-12 mt-4">
        {authToken && (
          <div className="text-end mb-3">
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
        
        <div className="px-2 px-md-4 px-lg-5 mb-4">
          {isEditing ? (
            <div>
              <div className="d-flex flex-column flex-md-row align-items-start gap-2 mb-3">
                <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
                  <label className="form-check form-switch mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={showHeading}
                      onChange={() => setShowHeading(!showHeading)}
                    />
                  </label>
                </div>
                <div className="flex-grow-1 w-100">
                  <h5 className="mb-2">Heading (Title Mandatory):</h5>
                  {showHeading && (
                    <input
                      type="text"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      className="form-control"
                      style={{ marginBottom: "10px" }}
                    />
                  )}
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-start gap-2">
                  <label className="form-check form-switch mt-2 mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleParagraph1"
                      checked={showParagraph1}
                      onChange={() => setShowParagraph1(!showParagraph1)}
                    />
                  </label>
                  <div className="flex-grow-1 w-100">
                    <h5 className="mb-2">Paragraph 1:</h5>
                    {showParagraph1 && (
                      <div className="react-quill-container">
                        <ReactQuill
                          value={paragraph1Content}
                          onChange={setParagraph1Content}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="image-section">
                {images.map((image, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex align-items-start gap-2">
                      <label className="form-check form-switch mt-2 mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={image.isVisible}
                          onChange={() => handleToggleImage(index)}
                        />
                        <span className="form-check-label d-block ms-2">
                          Image {index + 1}
                        </span>
                      </label>
                      
                      {image.isVisible && (
                        <div className="flex-grow-1 w-100">
                          <label className="d-block mb-2">
                            Change Image (400px x 800px) {index + 1}:
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                            className="form-control"
                          />
                          {image.preview && (
                            <div className="mt-3">
                              <strong>Preview {index + 1}:</strong>
                              <div className="preview-container mt-2">
                                <img
                                  src={image.preview}
                                  alt={`Preview ${index + 1}`}
                                  className="img-fluid preview-image"
                                  style={{
                                    maxHeight: "300px",
                                    maxWidth: "100%",
                                    border: "2px solid #ccc",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  className="btn btn-secondary"
                  onClick={handleAddMoreImages}
                >
                  Add More Images
                </button>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              {showHeading && (
                <h1
                  className="mb-4 text-center text-md-start"
                  style={{
                    fontSize: "clamp(24px, 5vw, 30px)",
                    fontWeight: "bold",
                  }}
                >
                  {heading}
                </h1>
              )}
              {showParagraph1 && (
                <div
                  dangerouslySetInnerHTML={{ __html: paragraph1Content }}
                  style={{ fontSize: "clamp(14px, 3vw, 15px)" }}
                  className="mb-4"
                ></div>
              )}

              {images.some(img => img.isVisible) && (
                <div className="carousel-container position-relative mx-auto my-4">
                  <Carousel
                    className="responsive-carousel"
                    prevIcon={
                      <span
                        className="carousel-control-prev-icon"
                        style={{ 
                          backgroundColor: "#000",
                          position: "absolute",
                          left: "10px",
                          zIndex: 2
                        }}
                        aria-hidden="true"
                      />
                    }
                    nextIcon={
                      <span
                        className="carousel-control-next-icon"
                        style={{ 
                          backgroundColor: "#000",
                          position: "absolute",
                          right: "10px",
                          zIndex: 2
                        }}
                        aria-hidden="true"
                      />
                    }
                  >
                    {images.map((image, index) =>
                      image.isVisible && image.preview ? (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100 img-fluid"
                            src={image.preview}
                            alt={`Slide ${index + 1}`}
                          />
                        </Carousel.Item>
                      ) : null
                    )}
                  </Carousel>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Novajobsus;

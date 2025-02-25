// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Quill editor styles
// import axios from "axios";
// import logo3 from "../../../assests/logo3.jpg";

// function ForEmployer({ forEmployerData, projectName }) {
//   // State for heading and paragraph content
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [heading, setHeading] = useState("For Employers:");
//   const [paragraph1Content, setParagraph1Content] = useState(`
//     <p>
//        Discover the ultimate solution for employers with
//                         Novajobs.us. Leverage AI-enabled job listings,
//                         seamlessly browse applicants, and access our extensive
//                         database to hire faster.
//     </p>
//   `);
//   const [paragraph1AContent, setParagraph1AContent] = useState(`
//     <p>
//        Manage applicants effortlessly with just a few clicks,
//                         conduct interviews, share openings, and refresh listings
//                         with one click. Simplify your recruitment process and
//                         find top talent efficiently.
//     </p>
//   `);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(logo3); // Preview for new image

//   const authToken = localStorage.getItem("authToken"); // Retrieve auth token

//   // Fetch data from the GET API
//   useEffect(() => {
//     if (!forEmployerData) {
//       return;
//     }

//     setHeading(forEmployerData.title || heading);
//     setParagraph1Content(forEmployerData.paragraph1 || paragraph1Content);
//     setParagraph1AContent(forEmployerData.paragraph2 || paragraph1AContent);

//     if (forEmployerData.images && JSON.parse(forEmployerData.images)) {
//       const imgData = JSON.parse(forEmployerData.images);

//       setImagePreview(
//         imgData[0] ? "https://apiwl.novajobs.us" + imgData[0] : logo3
//       );
//     }
//   }, [forEmployerData]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file); // Directly store the selected file
//       setImagePreview(URL.createObjectURL(file)); // Set preview
//     }
//   };

//   const handleSave = async () => {
//     setIsEditing(false);
//     setLoading(true);

//     // Prepare data to send to the API
//     const formData = new FormData();
//     formData.append("title", heading);
//     formData.append("paragraph1", paragraph1Content);
//     formData.append("paragraph2", paragraph1AContent);

//     if (image) {
//       formData.append("images", image, "image.jpg");
//     }

//     try {
//       const response = await axios.patch(
//         `https://apiwl.novajobs.us/api/admin${
//           projectName ? projectName : ""
//         }/update-aboutus-content/3`,
//         formData,
//         {
//           headers: {
//             Authorization: authToken,
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
//   const handleDelete = (field) => {
//     switch (field) {
//       case "heading":
//         setHeading("");
//         break;
//       case "paragraph1":
//         setParagraph1Content("");
//         break;
//       case "paragraph2":
//         setParagraph1AContent("");
//         break;

//       case "image":
//         setImage(null);
//         setImagePreview(logo3);
//         break;
//       default:
//         break;
//     }
//   };
//   return (
//     <>
//       <div className="mt-5">
//         {/* Conditionally render "Edit" button based on authToken */}
//         {authToken && (
//           <button
//             className="btn btn-warning mt-3 float-end"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit
//           </button>
//         )}
//         <div className="mx-3 mx-lg-5 mb-4 mb-lg-0">
//           {isEditing ? (
//             <div>
//               <div className="d-flex justify-content-start gap-2">
//                 <label>
//                   <h5> Heading(Title Mandatory):</h5>
//                   <input
//                     type="text"
//                     value={heading}
//                     onChange={(e) => setHeading(e.target.value)}
//                     className="form-control"
//                     style={{ marginBottom: "10px" }}
//                   />
//                 </label>
//                 <button
//                   className="btn btn-danger mt-4 mb-2 px-4 btn btn-primary"
//                   onClick={() => handleDelete("heading")}
//                 >
//                   Delete Heading
//                 </button>
//               </div>
//               <button
//                 className="btn btn-danger mt-2 mb-2 px-4 btn btn-primary"
//                 onClick={() => handleDelete("paragraph1")}
//               >
//                 Delete Paragraph 1
//               </button>
//               <h5>Paragraph 1:</h5>
//               <ReactQuill
//                 value={paragraph1Content}
//                 onChange={setParagraph1Content}
//               />
//               <button
//                 className="btn btn-danger mt-2 mb-2 px-4 btn-primary"
//                 onClick={() => handleDelete("paragraph2")}
//               >
//                 Delete Paragraph 2
//               </button>
//               <h5 className="">Paragraph 2:</h5>
//               <ReactQuill
//                 value={paragraph1AContent}
//                 onChange={setParagraph1AContent}
//               />

//               <div className="d-flex justify-content-start gap-2">
//                 <label className="mt-3">
//                   <h5>Change Image (400px x 800px):</h5>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="form-control"
//                   />
//                 </label>
//                 <button
//                   className="btn btn-danger mt-4 mb-2 px-4 btn-primary"
//                   onClick={() => handleDelete("image")}
//                 >
//                   Delete Image
//                 </button>
//               </div>
//               {imagePreview && (
//                 <div className="mt-3">
//                   <p>
//                     <strong>Preview:</strong>
//                   </p>
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     style={{
//                       height: "300px",
//                       width: "600px",
//                       border: "2px solid #ccc",
//                       borderRadius: "10px",
//                       marginTop: "10px",
//                     }}
//                   />
//                 </div>
//               )}

//               <button
//                 className="btn btn-primary mt-3"
//                 onClick={handleSave}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 className="btn btn-secondary mt-3 ms-2"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <div>
//               <h1
//                 style={{
//                   fontSize: "clamp(14px, 5vw, 20px)",
//                   fontWeight: "500",
//                   textDecoration: "underline",
//                 }}
//               >
//                 {heading}
//               </h1>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: paragraph1Content,
//                 }}
//                 style={{
//                   fontSize: "clamp(14px, 3vw, 15px)",
//                 }}
//               ></div>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: paragraph1AContent,
//                 }}
//                 style={{
//                   fontSize: "clamp(14px, 3vw, 15px)",
//                 }}
//               ></div>
//               <div className="mx-3 mx-lg-5 d-flex justify-content-center">
//                 <img
//                   src={imagePreview}
//                   alt="Uploaded"
//                   style={{
//                     height: "400px",
//                     width: "800px",
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ForEmployer;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill editor styles
import axios from "axios";
import logo3 from "../../../assests/logo3.jpg";

function ForEmployer({ forEmployerData, projectName }) {
  // State for heading and paragraph content
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState("For Employers:");
  const [paragraph1Content, setParagraph1Content] = useState(`
    <p>
       Discover the ultimate solution for employers with
                        Novajobs.us. Leverage AI-enabled job listings,
                        seamlessly browse applicants, and access our extensive
                        database to hire faster.
    </p>
  `);
  const [paragraph1AContent, setParagraph1AContent] = useState(`
    <p>
       Manage applicants effortlessly with just a few clicks,
                        conduct interviews, share openings, and refresh listings
                        with one click. Simplify your recruitment process and
                        find top talent efficiently.
    </p>
  `);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(logo3); // Preview for new image
  const [showParagraph1, setShowParagraph1] = useState(true); // State for showing/hiding Paragraph 1
  const [showParagraph2, setShowParagraph2] = useState(true); // State for showing/hiding Paragraph 2
  const [showImage, setShowImage] = useState(true); // State for showing/hiding image
  const [showHeading, setShowHeading] = useState(true);
  const authToken = localStorage.getItem("authToken"); // Retrieve auth token

  // Fetch data from the GET API
  useEffect(() => {
    if (!forEmployerData) {
      return;
    }

    setHeading(forEmployerData.title || heading);
    setParagraph1Content(forEmployerData.paragraph1 || paragraph1Content);
    setParagraph1AContent(forEmployerData.paragraph2 || paragraph1AContent);
    setShowHeading(forEmployerData.is_title_display);
    setShowParagraph1(forEmployerData.is_paragraph1_display);
    setShowParagraph2(forEmployerData.is_paragraph2_display);
    setShowImage(forEmployerData.is_images_display);
    if (forEmployerData.images && JSON.parse(forEmployerData.images)) {
      const imgData = JSON.parse(forEmployerData.images);

      setImagePreview(
        imgData[0] ? "https://apiwl.novajobs.us" + imgData[0] : logo3
      );
    }
  }, [forEmployerData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Directly store the selected file
      setImagePreview(URL.createObjectURL(file)); // Set preview
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    setLoading(true);

    // Prepare data to send to the API
    const formData = new FormData();
    formData.append("title", heading);
    formData.append("paragraph1", paragraph1Content);
    formData.append("paragraph2", paragraph1AContent);
    formData.append("is_title_display", showHeading);
    formData.append("is_paragraph1_display", showParagraph1);
    formData.append("is_paragraph2_display", showParagraph2);
    formData.append("is_images_display", showImage);

    if (image) {
      formData.append("images", image, "image.jpg");
    }

    try {
      const response = await axios.patch(
        `https://apiwl.novajobs.us/api/admin${
          projectName ? projectName : ""
        }/update-aboutus-content/3`,
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

  const handleDelete = (field) => {
    switch (field) {
      case "heading":
        setHeading("");
        break;
      case "paragraph1":
        setParagraph1Content("");
        break;
      case "paragraph2":
        setParagraph1AContent("");
        break;

      case "image":
        setImage(null);
        setImagePreview(logo3);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mt-5">
        {/* Conditionally render "Edit" button based on authToken */}
        {authToken && (
          <button
            className="btn btn-warning mt-3 float-end"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <div className="mx-3 mx-lg-5 mb-4 mb-lg-0">
          {isEditing ? (
            <div>
              <div className="d-flex justify-content-start gap-4">
                {showHeading && (
                  <label>
                    Heading (Title Mandatory):
                    <input
                      type="text"
                      value={heading}
                      onChange={(e) => setHeading(e.target.value)}
                      className="form-control"
                    />
                  </label>
                )}
                {/* <button
                  className="btn btn-danger mt-4 mb-2 px-4 btn btn-primary"
                  onClick={() => handleDelete("heading")}
                >
                  Delete Heading
                </button> */}
                <div className="d-flex justify-content-start gap-2">
                  <label className="form-check form-switch mt-4 mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleHeading"
                      checked={showHeading}
                      onChange={() => setShowHeading(!showHeading)}
                    />
                    <span className="form-check-label">
                      {showHeading ? "Hide" : "Show"} Heading
                    </span>
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-start gap-4">
                {/* <button
                  className="btn btn-danger mt-4 mb-2 px-4 btn btn-primary"
                  onClick={() => handleDelete("paragraph1")}
                >
                  Delete Paragraph 1
                </button> */}

                <div className="d-flex justify-content-start gap-2">
                  <label className="form-check form-switch mt-4 mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleParagraph1"
                      checked={showParagraph1}
                      onChange={() => setShowParagraph1(!showParagraph1)}
                    />
                    <span className="form-check-label">
                      {showParagraph1 ? "Hide" : "Show"} Paragraph 1
                    </span>
                  </label>
                </div>
              </div>

              {showParagraph1 && (
                <div>
                  <h5>Paragraph 1:</h5>
                  <ReactQuill
                    value={paragraph1Content}
                    onChange={setParagraph1Content}
                  />
                </div>
              )}

              <div className="d-flex justify-content-start gap-4">
                {/* <button
                  className="btn btn-danger mt-2 mb-2 px-4 btn-primary"
                  onClick={() => handleDelete("paragraph2")}
                >
                  Delete Paragraph 2
                </button> */}

                <div className="d-flex justify-content-start gap-2">
                  <label className="form-check form-switch mt-4 mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleParagraph2"
                      checked={showParagraph2}
                      onChange={() => setShowParagraph2(!showParagraph2)}
                    />
                    <span className="form-check-label">
                      {showParagraph2 ? "Hide" : "Show"} Paragraph 2
                    </span>
                  </label>
                </div>
              </div>

              {showParagraph2 && (
                <div>
                  <h5 className="">Paragraph 2:</h5>
                  <ReactQuill
                    value={paragraph1AContent}
                    onChange={setParagraph1AContent}
                  />
                </div>
              )}

              <div className="d-flex justify-content-start gap-4">
                {showImage && (
                  <label className="mt-3">
                    <h5>Change Image (400px x 800px):</h5>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control"
                    />
                  </label>
                )}
                {/* <button
                  className="btn btn-danger mt-4 mb-2 px-4 btn-primary"
                  onClick={() => handleDelete("image")}
                >
                  Delete Image
                </button> */}
                <div className="d-flex justify-content-start gap-2">
                  <label className="form-check form-switch mt-4 mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="toggleHeading"
                      checked={showImage}
                      onChange={() => setShowImage(!showImage)}
                    />
                    <span className="form-check-label">
                      {showImage ? "Hide" : "Show"} Image
                    </span>
                  </label>
                </div>
              </div>

              {showImage && imagePreview && (
                <div className="mt-3">
                  <p>
                    <strong>Preview:</strong>
                  </p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      height: "300px",
                      width: "600px",
                      border: "2px solid #ccc",
                      borderRadius: "10px",
                      marginTop: "10px",
                    }}
                  />
                </div>
              )}

              <button
                className="btn btn-primary mt-3"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-secondary mt-3 ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {showHeading && (
                <h1
                  style={{
                    fontSize: "clamp(14px, 5vw, 20px)",
                    fontWeight: "500",
                    textDecoration: "underline",
                  }}
                >
                  {heading}
                </h1>
              )}
              {showParagraph1 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: paragraph1Content,
                  }}
                  style={{
                    fontSize: "clamp(14px, 3vw, 15px)",
                  }}
                ></div>
              )}
              {showParagraph2 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: paragraph1AContent,
                  }}
                  style={{
                    fontSize: "clamp(14px, 3vw, 15px)",
                  }}
                ></div>
              )}

              <div className="mx-3 mx-lg-5 d-flex justify-content-center">
                {showImage && (
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    style={{
                      height: "400px",
                      width: "800px",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForEmployer;



// const BASE_IMAGE_URL = "https://apiwl.novajobs.us"

// const ImageSection = ({ title, images, type, handleImageUpload, removeImage, handleSave, colClass }) => {
//   console.log(`${type} images:`, images); // Debug log
  
//   // Ensure we always have an array of at least 3 slots
//   const imageSlots = Array.from({ length: 3 }, (_, index) => images[index] || null);
  
//   return (
//     <div className={colClass}>
//       <div className="form-group">
//         <label>{title}</label>
//         <div className="d-flex flex-wrap gap-3 mb-3">
//           {imageSlots.map((image, index) => (
//             <div key={index} className="position-relative d-flex flex-column align-items-center">
//               <label
//                 htmlFor={`${type}-file-${index}`}
//                 style={{
//                   cursor: "pointer",
//                   width: "100px",
//                   height: "100px",
//                   border: "2px dashed #ccc",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 {image ? (
//                   <img
//                     src={
//                       typeof image === "string" && !image.startsWith("http")
//                         ? `${BASE_IMAGE_URL}${image}`
//                         : typeof image === "string"
//                         ? image
//                         : URL.createObjectURL(image)
//                     }
//                     alt={`${title} ${index + 1}`}
//                     className="img-thumbnail"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                 ) : (
//                   <span>+</span>
//                 )}
//               </label>
//               <input
//                 id={`${type}-file-${index}`}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, type, index)}
//                 className="d-none"
//               />
//               {image && (
//                 <button
//                   type="button"
//                   className="site-button btn-danger btn-sm mt-1"
//                   onClick={() => removeImage(index, type)}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
        
//         <button
//           type="button"
//           onClick={() => handleSave(type)}
//           className="site-button"
          
//         >
          
//           Save {title}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ImageSection

const BASE_IMAGE_URL = "https://apiwl.novajobs.us";

const ImageSection = ({
  title,
  images,
  type,
  handleImageUpload,
  removeImage,
  handleSave,
  colClass,
}) => {
  console.log(`${type} images:`, images); // Debug log

  const imageSlots = Array.from({ length: 3 }, (_, index) => images[index] || null);

  return (
    <div className={colClass}>
      <div className="form-group">
        <label className="form-label fw-bold mb-2">{title}</label>

        {/* Responsive image grid */}
        <div className="row gx-3 gy-3">
          {imageSlots.map((image, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
              {/* Image Box */}
              <label
                htmlFor={`${type}-file-${index}`}
                className="w-100"
                style={{
                  cursor: "pointer",
                  height: "120px",
                  border: "2px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {image ? (
                  <img
                    src={
                      typeof image === "string" && !image.startsWith("http")
                        ? `${BASE_IMAGE_URL}${image}`
                        : typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`${title} ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: "2rem", color: "#888" }}>+</span>
                )}
              </label>

              <input
                id={`${type}-file-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, type, index)}
                className="d-none"
              />

              {/* Remove Button */}
              {image && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeImage(index, type)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="w-100 mt-4">
          <button type="button" onClick={() => handleSave(type)} className="w-100 site-button">
            Save {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;


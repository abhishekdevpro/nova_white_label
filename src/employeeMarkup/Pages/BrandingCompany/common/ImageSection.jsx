// "use client"

// const BASE_IMAGE_URL = "https://apiwl.novajobs.us"

// const ImageSection = ({ title, images, type, handleImageUpload, removeImage, handleSave, colClass }) => {
//   return (
//     <div className={colClass}>
//       <div className="form-group">
//         <label>{title}</label>
//         <div className="d-flex flex-wrap gap-2 mb-3">
//           {images.map((image, index) => (
//             <div key={index} className="position-relative">
//               <img
//                 src={typeof image === "string" ? `${BASE_IMAGE_URL}${image}` : URL.createObjectURL(image)}
//                 alt={title}
//                 className="img-thumbnail"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                 }}
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index, type)}
//                 className="btn btn-danger btn-sm position-absolute top-0 end-0"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//         {images.length < 3 && (
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleImageUpload(e, type)}
//             className="form-control mb-3"
//             multiple
//           />
//         )}
//         <button
//           type="button"
//           onClick={() => handleSave(type)}
//           className="btn btn-primary d-flex align-items-center gap-2"
//           style={{
//             backgroundColor: "#1967d2",
//             border: "none",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <i className="fa-solid fa-save"></i>
//           Save {title}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ImageSection
"use client"

const BASE_IMAGE_URL = "https://apiwl.novajobs.us"

const ImageSection = ({ title, images, type, handleImageUpload, removeImage, handleSave, colClass }) => {
  console.log(images, "images in ImageSection");
  return (
    <div className={colClass}>
      <div className="form-group">
        <label>{title}</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="position-relative d-flex flex-column align-items-center">
              <label
                htmlFor={`${type}-file-${index}`}
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  border: "2px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {images[index] ? (
                  <img
                    src={
                      typeof images[index] === "string"
                        ? `${BASE_IMAGE_URL}${images[index]}`
                        : URL.createObjectURL(images[index])
                    }
                    alt={`Image ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span>+</span>
                )}
              </label>
              <input
                id={`${type}-file-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, type, index)}
                className="d-none"
              />
              {images[index] && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-1"
                  onClick={() => removeImage(index, type)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleSave(type)}
          className="btn btn-primary d-flex align-items-center gap-2"
          style={{
            backgroundColor: "#1967d2",
            border: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          <i className="fa-solid fa-save"></i>
          Save {title}
        </button>
      </div>
    </div>
  )
}

export default ImageSection

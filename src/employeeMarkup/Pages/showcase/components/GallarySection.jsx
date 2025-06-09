
import { MdEdit } from "react-icons/md"


const GallerySection = ({
  companyData,
  isEdit,
  handleEditClick,
  handleImageError,
  BASE_IMAGE_URL,
  FALLBACK_IMAGES,
}) => {
  return (
    <section id="gallery" className="section">
      {isEdit && (
        <button className="edit-button" onClick={() => handleEditClick("gallery")}>
          <MdEdit size={18} />
          Edit Gallery
        </button>
      )}
      <h2 className="section-title">Life at {companyData?.company_name}</h2>
      <div className="gallery-container">
        {(companyData?.inside_culture_images?.length > 0
          ? companyData.inside_culture_images
          : FALLBACK_IMAGES.gallery
        ).map((image, index) => (
          <img
            key={index}
            src={typeof image === "string" ? `${BASE_IMAGE_URL}${image}` : image}
            alt={`Company Culture ${index + 1}`}
            className="gallery-image"
            onError={handleImageError}
          />
        ))}
      </div>
    </section>
  )
}

export default GallerySection

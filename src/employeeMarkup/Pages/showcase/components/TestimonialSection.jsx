
import { MdEdit } from "react-icons/md"
import { FaPlay } from "react-icons/fa"



const TestimonialsSection = ({
  wtsData,
  isEdit,
  handleEditClick,
  handleImageError,
  BASE_IMAGE_URL,
  FALLBACK_IMAGES,
}) => {
  return (
    <section id="wts" className="section">
      {isEdit && (
        <button className="edit-button" onClick={() => handleEditClick("wts")}>
          <MdEdit size={18} />
          Edit Testimonials
        </button>
      )}
      <h2 className="section-title">What They Say</h2>
      <div className="wts-container">
        {(wtsData.length > 0 ? wtsData : FALLBACK_IMAGES.testimonials).map((wts, index) => (
          <div key={index} className="wts-item">
            <img
              src={typeof wts.image === "string" ? `${BASE_IMAGE_URL}${wts.image}` : wts.image}
              alt={wts.title}
              className="wts-image"
              onError={handleImageError}
            />
            <div className="wts-play-button">
              <FaPlay />
            </div>
            <div className="wts-content">
              <h3 className="wts-title">{wts.title}</h3>
              <p className="wts-description">{wts.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection

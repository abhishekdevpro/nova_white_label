
import { MdEdit, MdLocationOn, MdBusiness, MdPeople } from "react-icons/md"



const Header = ({ companyData, isEdit, handleEditClick, handleImageError, FALLBACK_IMAGES }) => {
  return (
    <div className="header">
      <div className="header-content">
        {isEdit && (
          <button className="edit-button" onClick={() => handleEditClick("hero")}>
            <MdEdit size={18} />
            Edit Hero
          </button>
        )}
        <img
          src={companyData?.logo || FALLBACK_IMAGES.logo}
          alt="Company Logo"
          className="logo"
          onError={handleImageError}
        />
        <div className="header-text">
          <h1 className="company-name">{companyData?.company_name || "Company Name"}</h1>
          <p className="tagline">{companyData?.tagline || "Company Tagline"}</p>
          <div className="company-info">
            <div className="info-item">
              <MdLocationOn size={28} />
              <span>{companyData?.city?.name || "Location"}</span>
            </div>
            <div className="info-item">
              <MdBusiness size={28} />
              <span>{companyData?.company_industry?.name || "Industry"}</span>
            </div>
            <div className="info-item">
              <MdPeople size={28} />
              <span>{companyData?.company_size?.name || "Company Size"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

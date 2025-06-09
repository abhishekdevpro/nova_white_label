"use client"

import { MdEdit } from "react-icons/md"
import DOMPurify from "dompurify"



const AboutSection = ({ companyData, isEdit, handleEditClick }) => {
  return (
    <section id="about" className="section">
      {isEdit && (
        <button className="edit-button" onClick={() => handleEditClick("about")}>
          <MdEdit size={18} />
          Edit About
        </button>
      )}
      <h2 className="section-title">About Us</h2>
      {companyData?.about ? (
        <div
          className="about-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(companyData?.about || ""),
          }}
        />
      ) : (
        <div>No Summary at the moment. Please check back later.</div>
      )}
    </section>
  )
}

export default AboutSection

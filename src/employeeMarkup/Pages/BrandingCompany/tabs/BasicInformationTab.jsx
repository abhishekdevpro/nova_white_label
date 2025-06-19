// "use client"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import FormSection from "../common/FormSection"
// import SectionTitle from "../common/SectionTitle"
// import Switch from "../../../../components/ui/switch"

// const BasicInformationTab = ({
//   activeTab,
//   companyData,
//   handleInputChange,
//   makesUsUnique,
//   setMakesUsUnique,
//   setCompanyData,
//   handleSave,
// }) => {
//   if (activeTab !== "basic") return null
//   console.log(makesUsUnique,"make");
//   return (
//     <div className="tab-pane fade show active">
//       <div className="row">
//         <div className="col-lg-12">
//           <FormSection>
//             <SectionTitle>Basic Information</SectionTitle>
//             <div className="row">
//               <div className="col-lg-12 mb-3">
//                 <label>Company Name</label>
//                 <input
//                   type="text"
//                   name="company_name"
//                   value={companyData.company_name || ""}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Enter company name"
//                 />
//               </div>
//             </div>

//             <SectionTitle>What Makes Us Unique</SectionTitle>
//             <div className="row">
//               {makesUsUnique.map((item, idx) => (
//                 <div className="col-md-6 mb-3" key={item.key}>
//                   <div className="d-flex align-items-center mb-1">
//                     <label className="me-2 mb-0" style={{ fontWeight: 500 }}>
//                       {item.title}
//                     </label>
//                     <Switch
//                       checked={item.toogle}
//                       onChange={(checked) => {
//                         setMakesUsUnique((prev) => prev.map((el, i) => (i === idx ? { ...el, toogle: checked } : el)))
//                       }}
//                       className="me-2"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={item.value}
//                     onChange={(e) => {
//                       setMakesUsUnique((prev) =>
//                         prev.map((el, i) => (i === idx ? { ...el, value: e.target.value } : el)),
//                       )
//                     }}
//                     placeholder={item.title}
//                   />
//                 </div>
//               ))}
//             </div>

//             <SectionTitle>Join Us</SectionTitle>
//             <div className="mb-3">
//               <label>Career Opportunities</label>
//               <ReactQuill
//                 theme="snow"
//                 value={companyData.join_us || ""}
//                 onChange={(value) =>
//                   setCompanyData((prev) => ({
//                     ...prev,
//                     join_us: value,
//                   }))
//                 }
//                 className="h-48 mb-12"
//               />
//             </div>

//             <SectionTitle>Social Media & Website</SectionTitle>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label>Facebook</label>
//                 <input
//                   type="text"
//                   name="facebook_link"
//                   value={companyData.facebook_link || ""}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Facebook"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label>Linkedin</label>
//                 <input
//                   type="text"
//                   name="linkedin_link"
//                   value={companyData.linkedin_link || ""}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Linkedin"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label>Twitter</label>
//                 <input
//                   type="text"
//                   name="twitter_link"
//                   value={companyData.twitter_link || ""}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Twitter"
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label>Website</label>
//                 <input
//                   type="text"
//                   name="website_link"
//                   value={companyData.website_link || ""}
//                   onChange={handleInputChange}
//                   className="form-control"
//                   placeholder="Website"
//                 />
//               </div>
//             </div>
//           </FormSection>

//           <div className="row mt-4">
//             <div className="col-lg-12">
//               <div className="form-group text-end">
//                 <button
//                   type="submit"
//                   onClick={handleSave}
//                   className="btn btn-primary btn-lg d-flex align-items-center gap-2"
//                   style={{
//                     backgroundColor: "#1967d2",
//                     border: "none",
//                     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                     transition: "all 0.3s ease",
//                     padding: "0.75rem 1.5rem",
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   <i className="fa-solid fa-save"></i>
//                   Save All Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BasicInformationTab


"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import FormSection from "../common/FormSection"
import SectionTitle from "../common/SectionTitle"
import Switch from "../../../../components/ui/switch"

const BasicInformationTab = ({
  activeTab,
  companyData,
  handleInputChange,
  makesUsUnique,
  setMakesUsUnique,
  setCompanyData,
  handleSave,
}) => {
  if (activeTab !== "basic") return null

  return (
    <div className="tab-pane fade show active">
      <div className="row">
        <div className="col-lg-12">
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            <div className="row">
              <div className="col-lg-12 mb-3">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={companyData.company_name || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter company name"
                  maxLength={100}
                />
              </div>
            </div>

            <SectionTitle>What Makes Us Unique</SectionTitle>
            <div className="row">
              {makesUsUnique.map((item, idx) => (
                <div className="col-md-6 mb-3" key={item.key}>
                  <div className="d-flex align-items-center mb-1">
                    <label className="me-2 mb-0" style={{ fontWeight: 500 }}>
                      {item.title}
                    </label>
                    <Switch
                      checked={item.toogle}
                      onChange={(checked) => {
                        setMakesUsUnique((prev) => prev.map((el, i) => (i === idx ? { ...el, toogle: checked } : el)))
                      }}
                      className="me-2"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={item.value}
                    onChange={(e) => {
                      setMakesUsUnique((prev) =>
                        prev.map((el, i) => (i === idx ? { ...el, value: e.target.value } : el)),
                      )
                    }}
                    placeholder={item.title}
                  />
                </div>
              ))}
            </div>

            <SectionTitle>Join Us</SectionTitle>
            <div className="mb-3">
              <label>Career Opportunities</label>
              <ReactQuill
                theme="snow"
                value={companyData.join_us || ""}
                onChange={(value) =>
                  setCompanyData((prev) => ({
                    ...prev,
                    join_us: value,
                  }))
                }
                className="h-48 mb-12"
              />
            </div>

            <SectionTitle>Social Media & Website</SectionTitle>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Facebook</label>
                <input
                  type="url"
                  name="facebook_link"
                  value={companyData.facebook_link || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Facebook url"
                  maxLength={500}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Linkedin</label>
                <input
                  type="url"
                  name="linkedin_link"
                  value={companyData.linkedin_link || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Linkedin"
                  maxLength={500}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Twitter</label>
                <input
                  type="url"
                  name="twitter_link"
                  value={companyData.twitter_link || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Twitter"
                  maxLength={500}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Website</label>
                <input
                  type="url"
                  name="website_link"
                  value={companyData.website_link || ""}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Website"
                  maxLength={500}
                />
              </div>
            </div>
          </FormSection>

          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="form-group text-end">
                <button
                  type="submit"
                  onClick={(e) => handleSave(e, makesUsUnique)}
                  className="site-button w-100"
                  
                >
                  {/* <i className="fa-solid fa-save"></i> */}
                  Save All Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInformationTab

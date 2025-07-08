"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormSection from "../common/FormSection";
import SectionTitle from "../common/SectionTitle";
import Switch from "../../../../components/ui/switch";
import { Link } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BasicInformationTab = ({
  activeTab,
  companyData,
  handleInputChange,
  makesUsUnique,
  setMakesUsUnique,
  setCompanyData,
  handleSave,
  fetchCompanyData,
}) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const token =
    localStorage.getItem("vendorToken") || localStorage.getItem("authToken");
  if (activeTab !== "basic") return null;

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      const url = URL.createObjectURL(img);
      setFile({
        file: img,
        url: url,
      });
    }
  };

  const handleUpdateCompanyLogo = async () => {
    if (!file?.file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file.file);

      console.log("Uploading logo:", file.file.name);

      const response = await axios.put(
        "https://apiwl.novajobs.us/api/admin/company-logo",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Logo upload response:", response.data);

      if (response.status === 200) {
        // Update the company data with the new logo URL
        const logoUrl = response.data?.logo || response.data?.logo_url;
        if (logoUrl) {
          // Construct the full URL if it's a relative path
          const fullLogoUrl = logoUrl.startsWith("http")
            ? logoUrl
            : `https://apiwl.novajobs.us${logoUrl}`;

          console.log("Setting logo URL:", fullLogoUrl);

          setCompanyData((prev) => ({
            ...prev,
            logo: fullLogoUrl,
          }));
        }

        toast.success("Logo updated successfully!");

        // Refresh company data to get the latest logo
        if (fetchCompanyData) {
          setTimeout(() => {
            fetchCompanyData();
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Failed to upload logo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Default logo placeholder - you can replace this with your default logo
  const defaultLogo =
    companyData?.logo ||
    "https://via.placeholder.com/150x150/1e40af/ffffff?text=Logo";

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
              <div className="col-lg-12 mb-3">
                <label className="form-label fw-bold mb-3">
                  Upload Company Logo
                </label>
                <div className="">
                  <div className=" position-relative">
                    <div
                      className="logo-preview-container"
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto",
                        border: "2px dashed #ddd",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {file?.url ? (
                        <img
                          className="img-fluid"
                          alt="Company Logo Preview"
                          src={file?.url}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <img
                          className="img-fluid"
                          alt="Company Logo"
                          src={defaultLogo}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150x150/1e40af/ffffff?text=Logo";
                          }}
                        />
                      )}

                      {/* Upload overlay */}
                      <div
                        className="upload-overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = "1")}
                        onMouseLeave={(e) => (e.target.style.opacity = "0")}
                        onClick={() =>
                          document.getElementById("logo-file-input").click()
                        }
                      >
                        <div className="text-center text-white">
                          <i className="fa fa-camera fa-2x mb-2"></i>
                          <div className="small">Click to upload</div>
                        </div>
                      </div>
                    </div>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="logo-file-input"
                      className="d-none"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* File selection feedback */}
                {file?.file && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <i className="fa fa-file-image text-primary me-2"></i>
                        <div>
                          <div className="fw-bold">{file.file.name}</div>
                          <div className="text-muted small">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          onClick={handleUpdateCompanyLogo}
                          className="btn btn-primary btn-sm"
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <i className="fa fa-spinner fa-spin me-1"></i>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <i className="fa fa-upload me-1"></i>
                              Upload Logo
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setFile(null)}
                          className="btn btn-outline-secondary btn-sm"
                          disabled={isUploading}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    {isUploading && (
                      <div className="mt-2 text-center">
                        <small className="text-primary">
                          <i className="fa fa-info-circle me-1"></i>
                          Uploading logo... Please wait
                        </small>
                      </div>
                    )}
                  </div>
                )}

                {/* Upload instructions */}
                {!file?.file && (
                  <div className="mt-2 text-center">
                    <small className="text-muted">
                      Click on the image above to select a logo file (JPG, PNG,
                      GIF up to 5MB)
                    </small>
                  </div>
                )}
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
                        setMakesUsUnique((prev) =>
                          prev.map((el, i) =>
                            i === idx ? { ...el, toogle: checked } : el
                          )
                        );
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
                        prev.map((el, i) =>
                          i === idx ? { ...el, value: e.target.value } : el
                        )
                      );
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
  );
};

export default BasicInformationTab;

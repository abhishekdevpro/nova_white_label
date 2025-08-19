"use client";
import ReactPlayer from "react-player";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../../../../common/TextEditor";

const AboutCompanyTab = ({
  activeTab,
  companyData,
  handleInputChange,
  setCompanyData,
  selectedImages,
  handleImageUpload,
  removeImage,
  selectedPdf,
  setSelectedPdf,
  handlePdfUpload,
  handleAboutSave,
}) => {
  if (activeTab !== "about") return null;

  return (
    <div className="tab-pane fade show active">
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          animation: "fadeInUp 0.7s",
          transition: "box-shadow 0.2s",
        }}
      >
        {/* <h4
          style={{
            fontWeight: 500,
            fontSize: 15,
            marginBottom: 5,
            color: "#1a237e",
            letterSpacing: 0.3,
          }}
        >
          About Company
        </h4> */}

        <div style={{ marginBottom: 0 }}>
          <label className="modern-label">
            Company Description (one Line Short Description)
          </label>
          <input
            type="text"
            name="title"
            value={companyData.title || ""}
            onChange={handleInputChange}
            className="form-control modern-input"
            placeholder="Enter company title"
            maxLength={100}
            // style={{
            //   borderRadius: 10,
            //   border: "1.5px solid #dbeafe",
            //   padding: "14px 18px",
            //   fontSize: 17,
            //   width: "100%",
            //   marginTop: 4,
            //   background: "#fafdff",
            //   transition: "border 0.2s, box-shadow 0.2s",
            // }}
          />
        </div>

        <div className="modern-divider"></div>

        <div style={{ marginBottom: 0 }}>
          <label className="modern-label">Summary</label>
          {/* <ReactQuill
            theme="snow"
            value={companyData.summery || ""}
            onChange={(value) =>
              setCompanyData((prev) => ({
                ...prev,
                summery: value,
              }))
            }
            className="h-48 mb-12 modern-input"
            style={{
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              marginTop: 4,
              background: "#fafdff",
              minHeight: 120,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          /> */}
          <TextEditor
            value={companyData.summery || ""}
            onChange={(value) =>
              setCompanyData((prev) => ({
                ...prev,
                summery: value,
              }))
            }
          />
        </div>

        <div className="modern-divider"></div>

        <div style={{ marginBottom: 0 }}>
          <label className="modern-label">Description</label>
          {/* <ReactQuill
            theme="snow"
            value={companyData.about || ""}
            onChange={(value) =>
              setCompanyData((prev) => ({
                ...prev,
                about: value,
              }))
            }
            className="h-48 mb-12 modern-input"
            style={{
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              marginTop: 4,
              background: "#fafdff",
              minHeight: 120,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          /> */}
          <TextEditor
            value={companyData.about || ""}
            onChange={(value) =>
              setCompanyData((prev) => ({
                ...prev,
                about: value,
              }))
            }
          />
        </div>

        <div className="modern-divider"></div>

        <div style={{ marginBottom: 0 }}>
          <label className="modern-label">Video URL</label>
          <input
            type="url"
            name="video_urls"
            value={companyData.video_urls || ""}
            onChange={handleInputChange}
            className="form-control modern-input"
            placeholder="Enter video URL (YouTube, Vimeo, etc.)"
            style={{
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              padding: "14px 18px",
              fontSize: 17,
              width: "100%",
              marginTop: 4,
              background: "#fafdff",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          />
          {Array.isArray(companyData.video_urls) &&
            companyData.video_urls.map((url, index) =>
              ReactPlayer.canPlay(url) ? (
                <div key={index} style={{ marginTop: 16 }}>
                  <ReactPlayer url={url} controls width="100%" height="360px" />
                </div>
              ) : null
            )}
        </div>

        <div className="modern-divider"></div>

        <div style={{ marginBottom: 0 }}>
          <label className="modern-label">PDF Upload</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="form-control mb-2 modern-file"
            style={{
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              padding: "12px 14px",
              fontSize: 16,
              background: "#fafdff",
              marginTop: 4,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          />

          {/* Show existing PDFs */}
          {companyData?.pdf_urls && companyData.pdf_urls.length > 0 && (
            <div className="mt-3 p-3 bg-light rounded">
              <h6 className="mb-2">Existing PDFs:</h6>
              {companyData.pdf_urls.map((pdfUrl, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between mb-2"
                >
                  <div className="d-flex align-items-center">
                    <i className="fa fa-file-pdf text-danger me-2"></i>
                    <span className="text-muted">
                      {pdfUrl.split("/").pop() || `PDF ${index + 1}`}
                    </span>
                  </div>
                  <a
                    href={`https://apiwl.novajobs.us${pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="fa fa-external-link-alt me-1"></i>
                    View
                  </a>
                </div>
              ))}
            </div>
          )}

          {selectedPdf && (
            <div
              className="mt-2 p-2"
              style={{ background: "#f8f9fa", borderRadius: 8 }}
            >
              <small className="text-muted">Selected: {selectedPdf.name}</small>
              <button
                type="button"
                onClick={() => setSelectedPdf(null)}
                className="btn btn-sm btn-outline-danger ms-2"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="modern-divider"></div>

        {/* <div style={{ marginBottom: 0 }}>
          <label className="modern-label">Images (Max: 3)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control mb-2 modern-file"
            multiple
            style={{
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              padding: "12px 14px",
              fontSize: 16,
              background: "#fafdff",
              marginTop: 4,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          />
        </div> */}

        <button
          type="button"
          onClick={handleAboutSave}
          className="site-button w-100"
        >
          Save About Section
        </button>
      </div>
    </div>
  );
};

export default AboutCompanyTab;

import { Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const updatePageWidth = () => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;

      if (isMobile) {
        setPageWidth(window.innerWidth - 40); // 20px padding on each side
      } else if (isTablet) {
        setPageWidth(Math.min(window.innerWidth - 60, 600));
      } else {
        setPageWidth(Math.min(window.innerWidth - 100, 800));
      }
    };

    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF");
    setLoading(false);
  };

  const openInNewTab = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          margin: "0.5rem",
        }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2rem", height: "2rem" }}
        >
          <span className="visually-hidden">Loading PDF...</span>
        </div>
        <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
          Loading PDF document...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          border: "1px solid #dc3545",
          borderRadius: "8px",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          margin: "0.5rem",
        }}
      >
        <p className="mb-3" style={{ fontSize: "0.9rem" }}>
          Unable to display PDF. The file may be corrupted or inaccessible.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
          <button onClick={openInNewTab} className="btn btn-primary btn-sm">
            Open in New Tab
          </button>
          <a href={fileUrl} download className="btn btn-outline-primary btn-sm">
            Download PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "0.5rem",
        margin: "0.5rem",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          marginBottom: "1rem",
          display: window.innerWidth <= 768 ? "column" : "row",
          justifyContent:
            window.innerWidth <= 768 ? "stretch" : "space-between",
          alignItems: window.innerWidth <= 768 ? "stretch" : "center",
          gap: "0.5rem",
        }}
      >
        <h5
          className="mb-0"
          style={{ fontSize: window.innerWidth <= 768 ? "1rem" : "1.25rem" }}
        >
          PDF Document
        </h5>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button
            onClick={openInNewTab}
            className="btn btn-sm btn-outline-primary"
            style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
          >
            <i className="fa fa-external-link-alt me-1"></i>
            Open
          </button>
          <a
            href={fileUrl}
            download
            className="btn btn-sm btn-outline-secondary"
            style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
          >
            <i className="fa fa-download me-1"></i>
            Download
          </a>
        </div>
      </div>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "1.5rem", height: "1.5rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div
              key={`page_${index + 1}`}
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth}
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;

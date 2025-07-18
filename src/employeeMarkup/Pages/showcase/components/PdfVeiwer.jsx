import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Configure PDF.js worker - using unpkg CDN which is more reliable
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageWidth, setPageWidth] = useState(800);
  const [urlAccessible, setUrlAccessible] = useState(false);
  const [corsIssue, setCorsIssue] = useState(false);
  const [showInline, setShowInline] = useState(false);

  // Add debugging
  useEffect(() => {
    console.log("PDFViewer: fileUrl received:", fileUrl);

    // Test if URL is accessible
    const testUrlAccess = async () => {
      try {
        const response = await fetch(fileUrl, { method: "HEAD" });
        console.log("URL accessibility test:", response.status, response.ok);
        setUrlAccessible(response.ok);

        if (!response.ok) {
          setError(`PDF not accessible (HTTP ${response.status})`);
          setLoading(false);
        } else {
          // If URL is accessible but we expect CORS issues, show download interface
          setCorsIssue(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("URL accessibility test failed:", err);
        // If it's a CORS error, show download interface instead of error
        if (err.name === "TypeError" || err.message.includes("CORS")) {
          setCorsIssue(true);
          setLoading(false);
        } else {
          setError("PDF URL not accessible - network issue");
          setLoading(false);
        }
      }
    };

    if (fileUrl) {
      testUrlAccess();
    }
  }, [fileUrl]);

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
    console.log("PDF loaded successfully with", numPages, "pages");
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    setCorsIssue(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    console.error("PDF URL that failed:", fileUrl);
    // If react-pdf fails, show download interface instead of error
    setCorsIssue(true);
    setLoading(false);
  };

  const openInNewTab = () => {
    console.log("Opening PDF in new tab:", fileUrl);
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const tryInlineView = () => {
    setShowInline(true);
    setCorsIssue(false);
  };

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.error("PDF loading timeout after 10 seconds");
        setCorsIssue(true);
        setLoading(false);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Show inline PDF viewer
  if (showInline) {
    return (
      <div
        style={{
          border: "1px solid #007bff",
          borderRadius: "8px",
          padding: "1rem",
          backgroundColor: "#fff",
          margin: "0.5rem",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ color: "#1e40af", margin: 0 }}>PDF Document Viewer</h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => setShowInline(false)}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="fa fa-times me-1"></i>
              Close
            </button>
            <button
              onClick={openInNewTab}
              className="btn btn-sm btn-outline-primary"
            >
              <i className="fa fa-external-link-alt me-1"></i>
              New Tab
            </button>
            <a
              href={fileUrl}
              download
              className="btn btn-sm btn-outline-success"
            >
              <i className="fa fa-download me-1"></i>
              Download
            </a>
          </div>
        </div>

        <div
          style={{
            height: "600px",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
          }}
        >
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "4px" }}
            title="PDF Document"
            onError={() => {
              console.log("Iframe failed to load PDF");
              setShowInline(false);
              setCorsIssue(true);
            }}
          />
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            color: "#6c757d",
            marginTop: "0.5rem",
            marginBottom: "0",
          }}
        >
          File: {fileUrl.split("/").pop()}
        </p>
      </div>
    );
  }

  // Show download interface for CORS issues
  if (corsIssue) {
    return (
      <div
        style={{
          border: "1px solid #007bff",
          borderRadius: "8px",
          padding: "1.5rem",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          margin: "0.5rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <i
            className="fa fa-file-pdf-o"
            style={{ fontSize: "3rem", color: "#dc3545", marginBottom: "1rem" }}
          ></i>
          <h5 style={{ color: "#1e40af", marginBottom: "0.5rem" }}>
            Company Document Available
          </h5>
          {/* <p
            style={{
              color: "#6c757d",
              fontSize: "0.9rem",
              marginBottom: "1rem",
            }}
          >
            Due to browser security restrictions, this PDF cannot be displayed
            directly. You can try viewing it inline, open it in a new tab, or
            download it.
          </p> */}
        </div>

        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button
            onClick={tryInlineView}
            className="btn btn-primary"
            style={{ minWidth: "140px" }}
          >
            <i className="fa fa-eye me-2"></i>
            View
          </button>
          {/* <button
            onClick={openInNewTab}
            className="btn btn-outline-primary"
            style={{ minWidth: "140px" }}
          >
            <i className="fa fa-external-link-alt me-2"></i>
            Open in New Tab
          </button> */}
          {/* <a
            href={fileUrl}
            download
            className="btn btn-outline-success"
            style={{ minWidth: "140px" }}
          >
            <i className="fa fa-download me-2"></i>
            Download PDF
          </a> */}
        </div>

        <p
          style={{
            fontSize: "0.8rem",
            color: "#6c757d",
            marginTop: "1rem",
            marginBottom: "0",
          }}
        >
          File: {fileUrl.split("/").pop()}
        </p>
      </div>
    );
  }

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
        <p
          className="mt-1 mb-0"
          style={{ fontSize: "0.8rem", color: "#6c757d" }}
        >
          URL: {fileUrl}
        </p>
        <p
          className="mt-1 mb-0"
          style={{ fontSize: "0.8rem", color: "#6c757d" }}
        >
          URL Accessible: {urlAccessible ? "Yes" : "Checking..."}
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
        <p className="mb-2" style={{ fontSize: "0.8rem", color: "#721c24" }}>
          Error: {error}
        </p>
        <p className="mb-3" style={{ fontSize: "0.8rem", color: "#721c24" }}>
          URL: {fileUrl}
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

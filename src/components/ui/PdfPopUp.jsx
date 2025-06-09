// // import React from "react";
// // import { Document, Page } from "react-pdf";
// // import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const PDFPopupViewer = ({ show, onClose, fileUrl }) => {
// //   const [numPages, setNumPages] = React.useState(null);

// //   const onDocumentLoadSuccess = ({ numPages }) => {
// //     setNumPages(numPages);
// //   };

// //   if (!show) return null;

// //   return (
// //     <div
// //       className="modal show d-block"
// //       tabIndex="-1"
// //       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
// //     >
// //       <div className="modal-dialog modal-xl modal-dialog-centered">
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">PDF Preview</h5>
// //             <button type="button" className="btn-close" onClick={onClose} />
// //           </div>
// //           <div className="modal-body" style={{ maxHeight: "80vh", overflowY: "auto" }}>
// //             {fileUrl ? (
// //               <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
// //                 {Array.from(new Array(numPages), (el, index) => (
// //                   <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.2} />
// //                 ))}
// //               </Document>
// //             ) : (
// //               <p>No file to display.</p>
// //             )}
// //           </div>
// //           <div className="modal-footer">
// //             <button className="btn btn-secondary" onClick={onClose}>
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PDFPopupViewer;


// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const PDFPopupViewer = ({ show, onClose, fileUrl }) => {
//   if (!show) return null;
//   console.log(fileUrl,"lll");
//   return (
//     <div
//       className="modal show d-block"
//       tabIndex="-1"
//       style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//     >
//       <div className="modal-dialog modal-xl modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">PDF Preview</h5>
//             <button type="button" className="btn-close" onClick={onClose} />
//           </div>
//           <div
//             className="modal-body"
//             style={{
//               height: "80vh",
//               overflow: "hidden",
//               padding: 0,
//             }}
//           >
//             {fileUrl ? (
//               <iframe
//                 src={fileUrl}
//                 title="PDF Preview"
//                 width="100%"
//                 height="100%"
//                 style={{ border: "none" }}
//               ></iframe>
//             ) : (
//               <p className="text-center p-4">No file to display.</p>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFPopupViewer;


import React, { useState } from 'react';

// Mock PDF component since react-pdf isn't available in this environment
// In your actual project, uncomment the imports below:
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for react-pdf (add this to your actual project)
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

 const PDFPopupViewer = ({ show, onClose, fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError('Failed to load PDF document');
    setLoading(false);
    console.error('PDF load error:', error);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const goToPage = (page) => {
    const pageNum = parseInt(page);
    if (pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
  };

  if (!show) return null;

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-xl modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="bi bi-file-pdf me-2"></i>
              PDF Preview
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>

          {/* Page Controls - Sticky Header */}
          {numPages && numPages > 1 && (
            <div className="bg-light border-bottom p-3">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={goToPrevPage}
                      disabled={pageNumber <= 1}
                    >
                      <i className="bi bi-chevron-left"></i> Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={goToNextPage}
                      disabled={pageNumber >= numPages}
                    >
                      Next <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
                
                <div className="col-md-4 text-center">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">Page</span>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={pageNumber}
                      min="1"
                      max={numPages}
                      onChange={(e) => goToPage(e.target.value)}
                      style={{ maxWidth: '60px' }}
                    />
                    <span className="input-group-text">of {numPages}</span>
                  </div>
                </div>
                
                <div className="col-md-4 text-end">
                  <small className="text-muted">
                    Total: {numPages} pages
                  </small>
                </div>
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="modal-body bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="text-muted">Loading PDF...</h5>
                <p className="text-muted small">Please wait while we load your document</p>
              </div>
            )}

            {error && (
              <div className="text-center py-5">
                <div className="text-danger mb-3">
                  <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="text-danger">{error}</h5>
                <p className="text-muted">
                  Please check if the file exists and try again.
                </p>
                <p className="text-muted small">
                  File: <code>{fileUrl}</code>
                </p>
              </div>
            )}

            {fileUrl && !error && (
              <div className="text-center">
                {/* Demo placeholder - replace with actual Document/Page components */}
                <div className="card mx-auto mb-3" style={{ maxWidth: '800px' }}>
                  <div className="card-body p-5">
                    <div className="text-center text-muted">
                      <i className="bi bi-file-pdf" style={{ fontSize: '4rem', color: '#dc3545' }}></i>
                      <h4 className="mt-3">PDF Document Preview</h4>
                      <p className="text-muted">Page {pageNumber} of {numPages || 1}</p>
                      <div className="bg-light p-3 rounded mt-3">
                        <small className="text-muted">
                          <strong>File:</strong> {fileUrl}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uncomment this section in your actual project:
                <Document
                  file={fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={1.2}
                    className="mx-auto shadow-sm"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
                */}
              </div>
            )}

            {!fileUrl && !loading && (
              <div className="text-center py-5">
                <div className="text-warning mb-3">
                  <i className="bi bi-file-earmark-x" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="text-warning">No PDF file provided</h5>
                <p className="text-muted">Please provide a valid PDF file URL or filename.</p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer bg-light">
            <div className="d-flex justify-content-between w-100">
              <div>
                {fileUrl && (
                  <small className="text-muted">
                    Document: <strong>{fileUrl.split('/').pop()}</strong>
                  </small>
                )}
              </div>
              <div>
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  <i className="bi bi-x-lg me-1"></i>
                  Close
                </button>
                {/* {fileUrl && (
                  <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-download me-1"></i>
                    Download
                  </a>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PDFPopupViewer
// Demo App Component

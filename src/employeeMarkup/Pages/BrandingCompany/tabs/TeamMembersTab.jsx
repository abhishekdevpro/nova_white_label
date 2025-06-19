// // "use client"
// // import axios from "axios"
// // import { useEffect, useState } from "react"
// // import ReactQuill from "react-quill"
// // import "react-quill/dist/quill.snow.css"

// // const TeamMembersTab = ({
// //   activeTab,
// //   // teamMembers,
// //   editingId,
// //   tempMember,
// //   setTempMember,
// //   addTeamMember,
// //   saveTeamMember,
// //   cancelEdit,
// // }) => {

// //   const [teamMembers, setTeamMembers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (activeTab === "team") {
// //       fetchTeamMembers();
// //     }
// //   }, [activeTab]);

// //   const fetchTeamMembers = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken");

// //       const response = await axios.get(
// //         "https://apiwl.novajobs.us/api/employeer/company-teams",
// //         {
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       const result = response.data;

// //       if (result.status === "success" && result.data) {
// //         setTeamMembers(result.data);
// //       } else {
// //         setError(result.message || "Failed to fetch team members");
// //       }
// //     } catch (err) {
// //       setError("Error fetching team members: " + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   if (activeTab !== "team") return null
// //   return (
// //     <div className="tab-pane fade show active">
// //       <div style={{ maxWidth: 420, margin: "0 auto", paddingTop: 32 }}>
// //         {editingId !== null ? (
// //           <div
// //             style={{
// //               background: "#fff",
// //               borderRadius: 16,
// //               boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
// //               padding: 32,
// //               marginBottom: 32,
// //               minWidth: 320,
// //             }}
// //           >
// //             <input
// //               type="text"
// //               value={tempMember.name}
// //               onChange={(e) =>
// //                 setTempMember((prev) => ({
// //                   ...prev,
// //                   name: e.target.value,
// //                 }))
// //               }
// //               placeholder="Name"
// //               style={{
// //                 width: "100%",
// //                 padding: "12px 16px",
// //                 borderRadius: 8,
// //                 border: "1.5px solid #e0e0e0",
// //                 fontSize: 17,
// //                 marginBottom: 18,
// //                 background: "#fafbfc",
// //               }}
// //             />
// //             <ReactQuill
// //               theme="snow"
// //               value={tempMember.description}
// //               onChange={(val) =>
// //                 setTempMember((prev) => ({
// //                   ...prev,
// //                   description: val,
// //                 }))
// //               }
// //               style={{
// //                 height: 120,
// //                 marginBottom: 18,
// //                 borderRadius: 8,
// //                 border: "1.5px solid #e0e0e0",
// //                 background: "#fafbfc",
// //               }}
// //             />
// //             <div style={{ fontWeight: 700, marginBottom: 8, color: "#222" }}>Update Photo</div>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={(e) =>
// //                 setTempMember((prev) => ({
// //                   ...prev,
// //                   image: e.target.files[0],
// //                 }))
// //               }
// //               style={{ marginBottom: 24 }}
// //             />
// //             <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
// //               <button
// //                 type="button"
// //                 onClick={saveTeamMember}
// //                 style={{
// //                   background: "#22c55e",
// //                   color: "#fff",
// //                   border: "none",
// //                   borderRadius: 8,
// //                   padding: "10px 28px",
// //                   fontWeight: 700,
// //                   fontSize: 18,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 8,
// //                   cursor: "pointer",
// //                   boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
// //                   transition: "background 0.2s",
// //                 }}
// //               >
// //                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
// //                   <path
// //                     fill="#fff"
// //                     d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
// //                   />
// //                 </svg>
// //                 <span>Save</span>
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={cancelEdit}
// //                 style={{
// //                   background: "#6b7280",
// //                   color: "#fff",
// //                   border: "none",
// //                   borderRadius: 8,
// //                   padding: "10px 28px",
// //                   fontWeight: 700,
// //                   fontSize: 18,
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 8,
// //                   cursor: "pointer",
// //                   boxShadow: "0 2px 8px rgba(107,114,128,0.08)",
// //                   transition: "background 0.2s",
// //                 }}
// //               >
// //                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
// //                   <path
// //                     fill="#fff"
// //                     d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
// //                   />
// //                 </svg>
// //                 <span>Cancel</span>
// //               </button>
// //             </div>
// //           </div>
// //         ) : null}

// //         <button
// //           type="button"
// //           onClick={addTeamMember}
// //           style={{
// //             marginBottom:"1rem",
// //           }}
// //           className="site-button bg-primary text-white d-flex align-items-center gap-2"
// //         >
// //           Add New Team Member
// //         </button>
// //       </div>

// //       {/* Team Member List */}
// //         {loading ? (
// //           <div className="text-center text-muted">Loading team members...</div>
// //         ) : error ? (
// //           <div className="alert alert-danger">{error}</div>
// //         ) : teamMembers.length > 0 ? (
// //           <div className="d-flex flex-column flex-lg-row flex-wrap gap-3 justify-content-center">
// //             {teamMembers.map((member) => (
// //               <div
// //                 className="card flex-fill"
// //                 key={member.id}
// //                 style={{ minWidth: 280, maxWidth: 320 }}
// //               >
// //                 <div className="card-body d-flex flex-column align-items-center text-center">
// //                   <img
// //                     src={`https://apiwl.novajobs.us${member.media}`}
// //                     alt={member.name}
// //                     className="rounded-circle mb-3"
// //                     style={{
// //                       width: 100,
// //                       height: 100,
// //                       objectFit: "cover",
// //                     }}
// //                   />
// //                   <h5 className="card-title">{member.name}</h5>
// //                   <div
// //                     className="card-text text-muted"
// //                     dangerouslySetInnerHTML={{ __html: member.description }}
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="text-center text-muted">No team members found.</div>
// //         )}
// //     </div>
// //   )
// // }

// // export default TeamMembersTab


// "use client"
// import { useEffect } from "react"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import {useTeamMembers} from "../hooks/useTeamMembers" // Adjust the import path as needed

// const TeamMembersTab = ({ activeTab }) => {
//   const {
//     teamMembers,
//     loading,
//     error,
//     editingId,
//     tempMember,
//     fetchTeamMembers,
//     addTeamMember,
//     editTeamMember,
//     saveTeamMember,
//     deleteTeamMember,
//     cancelEdit,
//     setTempMember,
//     clearError,
//   } = useTeamMembers();

//   useEffect(() => {
//     if (activeTab === "team") {
//       fetchTeamMembers();
//     }
//   }, [activeTab, fetchTeamMembers]);

//   if (activeTab !== "team") return null;

//   return (
//     <div className="tab-pane fade show active">
//       <div style={{ maxWidth: 420, margin: "0 auto", paddingTop: 32 }}>
//         {/* Editing Form */}
//         {editingId !== null ? (
//           <div
//             style={{
//               background: "#fff",
//               borderRadius: 16,
//               boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
//               padding: 32,
//               marginBottom: 32,
//               minWidth: 320,
//             }}
//           >
//             <h4 style={{ marginBottom: 20, color: "#222" }}>
//               {editingId === "new" ? "Add New Team Member" : "Edit Team Member"}
//             </h4>
            
//             {error && (
//               <div className="alert alert-danger d-flex justify-content-between align-items-center">
//                 {error}
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={clearError}
//                   aria-label="Close"
//                 ></button>
//               </div>
//             )}

//             <input
//               type="text"
//               value={tempMember.name}
//               onChange={(e) =>
//                 setTempMember((prev) => ({
//                   ...prev,
//                   name: e.target.value,
//                 }))
//               }
//               placeholder="Name"
//               style={{
//                 width: "100%",
//                 padding: "12px 16px",
//                 borderRadius: 8,
//                 border: "1.5px solid #e0e0e0",
//                 fontSize: 17,
//                 marginBottom: 18,
//                 background: "#fafbfc",
//               }}
//             />
            
//             <div style={{ marginBottom: 18 }}>
//               <ReactQuill
//                 theme="snow"
//                 value={tempMember.description}
//                 onChange={(val) =>
//                   setTempMember((prev) => ({
//                     ...prev,
//                     description: val,
//                   }))
//                 }
//                 style={{
//                   height: 120,
//                   borderRadius: 8,
//                   border: "1.5px solid #e0e0e0",
//                   background: "#fafbfc",
//                 }}
//               />
//             </div>
            
//             <div style={{ fontWeight: 700, marginBottom: 8, color: "#222", marginTop: 40 }}>
//               {editingId === "new" ? "Upload Photo" : "Update Photo"}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setTempMember((prev) => ({
//                   ...prev,
//                   image: e.target.files[0],
//                 }))
//               }
//               style={{ marginBottom: 24 }}
//             />
            
//             <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
//               <button
//                 type="button"
//                 onClick={saveTeamMember}
//                 disabled={loading}
//                 style={{
//                   background: loading ? "#ccc" : "#22c55e",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   padding: "10px 28px",
//                   fontWeight: 700,
//                   fontSize: 18,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   cursor: loading ? "not-allowed" : "pointer",
//                   boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
//                   transition: "background 0.2s",
//                 }}
//               >
//                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                   <path
//                     fill="#fff"
//                     d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
//                   />
//                 </svg>
//                 <span>{loading ? "Saving..." : "Save"}</span>
//               </button>
              
//               <button
//                 type="button"
//                 onClick={cancelEdit}
//                 disabled={loading}
//                 style={{
//                   background: "#6b7280",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 8,
//                   padding: "10px 28px",
//                   fontWeight: 700,
//                   fontSize: 18,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   cursor: loading ? "not-allowed" : "pointer",
//                   boxShadow: "0 2px 8px rgba(107,114,128,0.08)",
//                   transition: "background 0.2s",
//                 }}
//               >
//                 <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//                   <path
//                     fill="#fff"
//                     d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
//                   />
//                 </svg>
//                 <span>Cancel</span>
//               </button>
//             </div>
//           </div>
//         ) : null}

//         {/* Add New Button */}
//         <button
//           type="button"
//           onClick={addTeamMember}
//           disabled={loading}
//           style={{
//             marginBottom: "1rem",
//           }}
//           className="site-button bg-primary text-white d-flex align-items-center gap-2"
//         >
//           <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//             <path
//               fill="currentColor"
//               d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
//             />
//           </svg>
//           Add New Team Member
//         </button>
//       </div>

//       {/* Team Member List */}
//       {loading && editingId === null ? (
//         <div className="text-center text-muted">Loading team members...</div>
//       ) : error && teamMembers.length === 0 ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : teamMembers.length > 0 ? (
//         <div className="d-flex flex-column flex-lg-row flex-wrap gap-3 justify-content-center">
//           {teamMembers.map((member) => (
//             <div
//               className="card flex-fill"
//               key={member.id}
//               style={{ minWidth: 280, maxWidth: 320 }}
//             >
//               <div className="card-body d-flex flex-column align-items-center text-center">
//                 <img
//                   src={`https://apiwl.novajobs.us${member.media}`}
//                   alt={member.name}
//                   className="rounded-circle mb-3"
//                   style={{
//                     width: 100,
//                     height: 100,
//                     objectFit: "cover",
//                   }}
//                 />
//                 <h5 className="card-title">{member.name}</h5>
//                 <div
//                   className="card-text text-muted mb-3"
//                   dangerouslySetInnerHTML={{ __html: member.description }}
//                 />
                
//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2 mt-auto">
//                   <button
//                     type="button"
//                     onClick={() => editTeamMember(member)}
//                     disabled={loading}
//                     className="btn btn-outline-primary btn-sm"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 4,
//                     }}
//                   >
//                     <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
//                       <path
//                         fill="currentColor"
//                         d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
//                       />
//                     </svg>
//                     Edit
//                   </button>
                  
//                   <button
//                     type="button"
//                     onClick={() => {
//                       if (window.confirm("Are you sure you want to delete this team member?")) {
//                         deleteTeamMember(member.id);
//                       }
//                     }}
//                     disabled={loading}
//                     className="btn btn-outline-danger btn-sm"
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 4,
//                     }}
//                   >
//                     <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
//                       <path
//                         fill="currentColor"
//                         d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
//                       />
//                     </svg>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-muted">No team members found.</div>
//       )}
//     </div>
//   );
// };

// export default TeamMembersTab;
// "use client"
// import { useEffect } from "react"
// import ReactQuill from "react-quill"
// import "react-quill/dist/quill.snow.css"
// import "./TeamMemeberTab.css" // Import our custom CSS
// import { useTeamMembers } from "../hooks/useTeamMembers"

// const TeamMembersTab = ({ activeTab }) => {
//   const {
//     teamMembers,
//     loading,
//     error,
//     editingId,
//     tempMember,
//     fetchTeamMembers,
//     handleAdd,
//     handleEdit,
//     handleSave,
//     handleDelete,
//     handleCancel,
//     setTempMember,
//     clearError,
//   } = useTeamMembers();

//   useEffect(() => {
//     if (activeTab === "team") {
//       fetchTeamMembers();
//     }
//   }, [activeTab, fetchTeamMembers]);

//   if (activeTab !== "team") return null;

//   return (
//     <div className="team-members-container">
//       {/* Header Section */}
//       <div className="team-header">
//         <div className="team-header-content">
//           <h2 className="team-title">
//             <i className="fas fa-users"></i>
//             Team Members
//           </h2>
//           <p className="team-subtitle">Manage your team members here</p>
//         </div>

//         {/* Add New Button */}
//         {editingId === null && (
//           <div className="add-button-container">
//             <button
//               type="button"
//               onClick={handleAdd}
//               disabled={loading}
//               className="add-member-btn"
//             >
//               <i className="fas fa-plus"></i>
//               <span>Add New Team Member</span>
//               <div className="btn-ripple"></div>
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Modal Overlay for Editing */}
//       {editingId !== null && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <div className="modal-header">
//               <h3 className="modal-title">
//                 {editingId === "new" ? (
//                   <>
//                     <i className="fas fa-user-plus"></i>
//                     Add New Team Member
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-user-edit"></i>
//                     Edit Team Member
//                   </>
//                 )}
//               </h3>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="modal-close-btn"
//                 disabled={loading}
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>

//             <div className="modal-body">
//               {/* Error Alert */}
//               {error && (
//                 <div className="error-alert">
//                   <i className="fas fa-exclamation-triangle"></i>
//                   <span>{error}</span>
//                   <button
//                     type="button"
//                     onClick={clearError}
//                     className="error-close-btn"
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//               )}

//               {/* Name Input */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <i className="fas fa-user"></i>
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   value={tempMember.name}
//                   onChange={(e) =>
//                     setTempMember((prev) => ({
//                       ...prev,
//                       name: e.target.value,
//                     }))
//                   }
//                   placeholder="Enter team member's full name"
//                 />
//               </div>
              
//               {/* Description Input */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <i className="fas fa-info-circle"></i>
//                   Description
//                 </label>
//                 <div className="quill-container">
//                   <ReactQuill
//                     theme="snow"
//                     value={tempMember.description}
//                     onChange={(val) =>
//                       setTempMember((prev) => ({
//                         ...prev,
//                         description: val,
//                       }))
//                     }
//                     placeholder="Enter team member's description or role..."
//                     modules={{
//                       toolbar: [
//                         [{ 'header': [1, 2, false] }],
//                         ['bold', 'italic', 'underline'],
//                         ['link'],
//                         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//                         ['clean']
//                       ],
//                     }}
//                   />
//                 </div>
//               </div>
              
//               {/* Photo Upload */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <i className="fas fa-camera"></i>
//                   {editingId === "new" ? "Upload Photo" : "Update Photo"}
//                 </label>
//                 <div className="file-upload-container">
//                   <input
//                     type="file"
//                     className="file-input"
//                     accept="image/*"
//                     onChange={(e) =>
//                       setTempMember((prev) => ({
//                         ...prev,
//                         media_upload: e.target.files[0],
//                       }))
//                     }
//                     id="photo-upload"
//                   />
//                   <label htmlFor="photo-upload" className="file-upload-label">
//                     <i className="fas fa-cloud-upload-alt"></i>
//                     <span>Choose Photo</span>
//                   </label>
//                 </div>
//                 <div className="form-hint">
//                   <i className="fas fa-info-circle"></i>
//                   Recommended: Square image, at least 300x300px
//                 </div>
//               </div>
//             </div>
            
//             {/* Modal Footer */}
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={loading}
//                 className="btn-secondary"
//               >
//                 <i className="fas fa-times"></i>
//                 Cancel
//               </button>
              
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={loading || !tempMember.name.trim()}
//                 className="btn-primary"
//               >
//                 {loading ? (
//                   <>
//                     <div className="spinner"></div>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <i className="fas fa-save"></i>
//                     Save
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Team Members Grid */}
//       <div className="team-grid-container">
//         {loading && editingId === null ? (
//           <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Loading team members...</p>
//           </div>
//         ) : error && teamMembers.length === 0 ? (
//           <div className="error-container">
//             <i className="fas fa-exclamation-triangle"></i>
//             <h4>Error Loading Team Members</h4>
//             <p>{error}</p>
//           </div>
//         ) : teamMembers.length > 0 ? (
//           <div className="team-grid">
//             {teamMembers.map((member) => (
//               <div key={member.id} className="team-card">
//                 <div className="team-card-inner">
//                   {/* Profile Image */}
//                   <div className="profile-image-container">
//                     <img
//                       src={`https://apiwl.novajobs.us${member.media}`}
//                       alt={member.name}
//                       className="profile-image"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/120x120/667eea/ffffff?text=No+Image';
//                       }}
//                     />
//                     <div className="status-indicator"></div>
//                   </div>
                  
//                   {/* Member Info */}
//                   <div className="member-info">
//                     <h5 className="member-name">{member.name}</h5>
//                     <div
//                       className="member-description"
//                       dangerouslySetInnerHTML={{ __html: member.description }}
//                     />
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="action-buttons">
//                     <button
//                       type="button"
//                       onClick={() => handleEdit(member)}
//                       disabled={loading}
//                       className="edit-btn"
//                     >
//                       <i className="fas fa-edit"></i>
//                       Edit
//                     </button>
                    
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(member.id)}
//                       disabled={loading}
//                       className="delete-btn"
//                     >
//                       <i className="fas fa-trash"></i>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <div className="empty-state-icon">
//               <i className="fas fa-users"></i>
//             </div>
//             <h4>No Team Members Found</h4>
//             <p>Get started by adding your first team member!</p>
//             <button
//               type="button"
//               onClick={handleAdd}
//               className="add-first-member-btn"
//             >
//               <i className="fas fa-plus"></i>
//               Add Your First Team Member
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeamMembersTab;

"use client";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TeamMemeberTab.css";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { Plus } from "lucide-react";

const TeamMembersTab = ({ activeTab }) => {
  const {
    teamMembers,
    loading,
    error,
    editingId,
    tempMember,
    fetchTeamMembers,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    setTempMember,
    clearError,
  } = useTeamMembers();

  useEffect(() => {
    if (activeTab === "team") {
      fetchTeamMembers();
    }
  }, [activeTab, fetchTeamMembers]);

  if (activeTab !== "team") return null;

  return (
    <div className="team-members-container">
      <div className="team-header">
        <div className="team-header-content">
          {/* <h2 className="team-title">
            <i className="fas fa-users"></i>
            Team Members
          </h2> */}
          <p className="team-subtitle">Manage your team members here</p>
        </div>

        {editingId === null && (
          <div className="add-button-container">
            <button
              type="button"
              onClick={handleAdd}
              disabled={loading}
              className="site-button"
            >
             <Plus size={20} />
              <span>Add New Team Member</span>
            </button>
          </div>
        )}
      </div>

      {editingId !== null && (
        <div className="inline-form-container">
          {/* <h3 className="modal-title">
            {editingId === "new" ? (
              <>
                <i className="fas fa-user-plus"></i>
                Add New Team Member
              </>
            ) : (
              <>
                <i className="fas fa-user-edit"></i>
                Edit Team Member
              </>
            )}
          </h3> */}

          {error && (
            <div className="error-alert">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
              <button
                type="button"
                onClick={clearError}
                className="error-close-btn"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-user"></i>
              Full Name *
            </label>
            <input
              type="text"
              className="form-input"
              value={tempMember.name}
              onChange={(e) =>
                setTempMember((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter team member's full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-info-circle"></i>
              Description
            </label>
            <div className="quill-container">
              <ReactQuill
                theme="snow"
                value={tempMember.description}
                onChange={(val) =>
                  setTempMember((prev) => ({ ...prev, description: val }))
                }
                placeholder="Enter description"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-camera"></i>
              {editingId === "new" ? "Upload Photo" : "Update Photo"}
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={(e) =>
                  setTempMember((prev) => ({
                    ...prev,
                    media_upload: e.target.files[0],
                  }))
                }
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Choose Photo</span>
              </label>
            </div>
            <div className="form-hint">
              <i className="fas fa-info-circle"></i>
              Recommended: Square image, at least 300x300px
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn-secondary"
            >
              
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !tempMember.name.trim()}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  {editingId === "new" ? "Add" : "Save"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="team-grid-container">
        {loading && editingId === null ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading team members...</p>
          </div>
        ) : teamMembers && teamMembers.length > 0 ? (
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card-inner">
                  <div className="profile-image-container">
                    <img
                      src={`https://apiwl.novajobs.us${member.media}`}
                      alt={member.name}
                      className="profile-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/120x120/667eea/ffffff?text=No+Image";
                      }}
                    />
                    <div className="status-indicator"></div>
                  </div>
                  <div className="member-info">
                    <h5 className="member-name">{member.name}</h5>
                    <div
                      className="member-description"
                      dangerouslySetInnerHTML={{ __html: member.description }}
                    />
                  </div>
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => handleEdit(member)}
                      disabled={loading}
                      className="edit-btn"
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member.id)}
                      disabled={loading}
                      className="delete-btn"
                    >
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fas fa-users"></i>
            </div>
            <h4>No Team Members Found</h4>
            {/* <p>Get started by adding your first team member!</p> */}
            {/* <button
              type="button"
              onClick={handleAdd}
              className="add-first-member-btn"
            >
              <i className="fas fa-plus"></i>
              Add Your First Team Member
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembersTab;

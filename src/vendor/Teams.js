// import React, { useState, useEffect, useCallback } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import LogoCoverUploader from "./LogoCoverUploader";
// import { Trash2, Plus, Edit2, Save, X } from "lucide-react";

// const TeamMemberManager = () => {
//   const baseUrl = "https://apiwl.novajobs.us/api/employeer";
//   const token = localStorage.getItem("vendorToken");
//   const BASE_IMAGE_URL = "https://apiwl.novajobs.us";
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState({});
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [newMember, setNewMember] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editSelectedFile, setEditSelectedFile] = useState(null);

//   const fetchTeamMembers = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${baseUrl}/company-teams`, {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });

//       if (!response.ok) {
//         // Just set empty array instead of throwing error
//         setTeamMembers([]);
//         return;
//       }

//       const result = await response.json();
//       if (result.status === "success" && Array.isArray(result.data)) {
//         setTeamMembers(result.data);
//       } else {
//         setTeamMembers([]);
//       }
//     } catch (err) {
//       setTeamMembers([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);
//   useEffect(() => {
//     fetchTeamMembers();
//   }, [fetchTeamMembers]);
//   const addTeamMember = () => {
//     setTeamMembers((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         name: "",
//         position: "",
//         description: "",
//         image: null,
//       },
//     ]);
//   };

//   const removeTeamMember = (id) => {
//     setTeamMembers((prev) => prev.filter((member) => member.id !== id));
//   };

//   const handleTeamMemberChange = (id, field, value) => {
//     setTeamMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, [field]: value } : member
//       )
//     );
//   };
//   const handleImageChange = (e, isEdit = false) => {
//     e.preventDefault();
//     const file = e.target.files[0];
//     if (file) {
//       if (isEdit) {
//         setEditSelectedFile(file);
//       } else {
//         setSelectedFile(file);
//       }
//     }
//   };
//   const styles = {
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "2rem",
//     },
//     memberCard: {
//       padding: "2rem",
//       background: "linear-gradient(to bottom right, #ffffff, #f9fafb)",
//       borderRadius: "1rem",
//       boxShadow:
//         "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//       border: "1px solid #e5e7eb",
//       transition: "all 0.3s ease",
//     },
//     memberCardHover: {
//       boxShadow:
//         "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//       borderColor: "#bfdbfe",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "1.5rem",
//     },
//     numberBadge: {
//       width: "2.5rem",
//       height: "2.5rem",
//       borderRadius: "9999px",
//       background: "linear-gradient(to right, #3b82f6, #2563eb)",
//       color: "white",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontWeight: 600,
//       marginRight: "0.75rem",
//     },
//     title: {
//       fontSize: "1.25rem",
//       fontWeight: 700,
//       color: "#1f2937",
//     },
//     deleteButton: {
//       padding: "0.5rem",
//       color: "#9ca3af",
//       borderRadius: "9999px",
//       transition: "all 0.2s ease",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     deleteButtonHover: {
//       color: "#ef4444",
//       backgroundColor: "#fee2e2",
//       transform: "scale(1.1)",
//     },
//     deleteIcon: {
//       width: "1.5rem",
//       height: "1.5rem",
//       stroke: "currentColor",
//       strokeWidth: "1.5",
//       fill: "none",
//     },
//     grid: {
//       display: "grid",
//       gridTemplateColumns: "1fr",
//       gap: "1.5rem",
//       marginBottom: "1.5rem",
//     },
//     "@media (min-width: 768px)": {
//       grid: {
//         gridTemplateColumns: "1fr 1fr",
//       },
//     },
//     label: {
//       display: "block",
//       fontSize: "0.875rem",
//       fontWeight: 500,
//       color: "#374151",
//       marginBottom: "0.5rem",
//     },
//     input: {
//       width: "100%",
//       padding: "0.625rem 1rem",
//       backgroundColor: "white",
//       border: "1px solid #e5e7eb",
//       borderRadius: "0.75rem",
//       transition: "all 0.2s ease",
//     },
//     inputHover: {
//       borderColor: "#93c5fd",
//     },
//     inputFocus: {
//       outline: "none",
//       borderColor: "#3b82f6",
//       boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
//     },
//     addButton: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "100%",
//       padding: "1.25rem 1.5rem",
//       background: "linear-gradient(to right, #3b82f6, #2563eb)",
//       borderRadius: "1rem",
//       color: "white",
//       fontWeight: 500,
//       boxShadow:
//         "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//       transition: "all 0.3s ease",
//     },
//     addButtonHover: {
//       background: "linear-gradient(to right, #2563eb, #1d4ed8)",
//       transform: "scale(1.02)",
//       boxShadow:
//         "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//     },
//     plusIcon: {
//       width: "1.75rem",
//       height: "1.75rem",
//       marginRight: "0.75rem",
//       transition: "transform 0.3s ease",
//       stroke: "currentColor",
//       strokeWidth: "2",
//       fill: "none",
//     },
//     plusIconHover: {
//       transform: "rotate(90deg)",
//     },
//   };
//   const handleSave = async (member, e) => {
//     e.preventDefault();
//     try {
//       setActionLoading((prev) => ({ ...prev, [member.id]: true }));
//       const formData = new FormData();
//       formData.append("name", member.name);
//       formData.append("description", member.description);
//       if (editSelectedFile) {
//         formData.append("media_upload", editSelectedFile);
//       }

//       const response = await fetch(`${baseUrl}/company-teams/${member.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to update team member");
//       const updatedMember = await response.json();

//       setTeamMembers((prev) =>
//         prev.map((m) =>
//           m.id === member.id ? { ...m, ...updatedMember.data } : m
//         )
//       );

//       setEditingId(null);
//       setEditSelectedFile(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setActionLoading((prev) => ({ ...prev, [member.id]: false }));
//     }
//   };

//   const handleDelete = async (id, e) => {
//     e.preventDefault();
//     try {
//       setActionLoading((prev) => ({ ...prev, [id]: true }));
//       const response = await fetch(`${baseUrl}/company-teams/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `${token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to delete team member");
//       setTeamMembers((prev) => prev.filter((member) => member.id !== id));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setActionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleAddNew = (e) => {
//     e.preventDefault();
//     setNewMember({ name: "", description: "" });
//     setSelectedFile(null);
//   };

//   const handleSaveNew = async (e) => {
//     e.preventDefault();
//     if (!newMember || !selectedFile) return;

//     try {
//       setActionLoading((prev) => ({ ...prev, new: true }));
//       const formData = new FormData();
//       formData.append("name", newMember.name);
//       formData.append("description", newMember.description);
//       formData.append("media_upload", selectedFile);

//       const response = await fetch(`${baseUrl}/company-teams`, {
//         method: "POST",
//         headers: {
//           Authorization: `${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to add new team member");
//       const result = await response.json();

//       setTeamMembers((prev) => [...prev, result.data]);
//       setNewMember(null);
//       setSelectedFile(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setActionLoading((prev) => ({ ...prev, new: false }));
//     }
//   };

//   const handleCancelNew = (e) => {
//     e.preventDefault();
//     setNewMember(null);
//     setSelectedFile(null);
//   };

//   const handleUpdateField = (id, field, value) => {
//     setTeamMembers((prev) =>
//       prev.map((member) =>
//         member.id === id ? { ...member, [field]: value } : member
//       )
//     );
//   };
//   return (
//     <div style={styles.container}>
//       {error && (
//         <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//           <span className="block sm:inline">{error}</span>
//           <button
//             onClick={() => {
//               setError(null);
//               fetchTeamMembers();
//             }}
//             className="absolute top-0 bottom-0 right-0 px-4 py-3"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       )}

//       {teamMembers.map((member, index) => (
//         <div
//           key={member.id}
//           style={styles.memberCard}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.boxShadow = styles.memberCardHover.boxShadow;
//             e.currentTarget.style.borderColor =
//               styles.memberCardHover.borderColor;
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.boxShadow = styles.memberCard.boxShadow;
//             e.currentTarget.style.borderColor = styles.memberCard.border;
//           }}
//         >
//           <div style={styles.header}>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <div style={styles.numberBadge}>{index + 1}</div>
//               <h5 style={styles.title}>Team Member #{index + 1}</h5>
//             </div>
//             <button
//               type="button"
//               onClick={() => removeTeamMember(member.id)}
//               style={styles.deleteButton}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = styles.deleteButtonHover.color;
//                 e.currentTarget.style.backgroundColor =
//                   styles.deleteButtonHover.backgroundColor;
//                 e.currentTarget.style.transform =
//                   styles.deleteButtonHover.transform;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = styles.deleteButton.color;
//                 e.currentTarget.style.backgroundColor = "transparent";
//                 e.currentTarget.style.transform = "none";
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={styles.deleteIcon}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div style={styles.grid}>
//             <div>
//               <label style={styles.label}>Name</label>
//               <input
//                 type="text"
//                 value={member.name}
//                 onChange={(e) =>
//                   handleTeamMemberChange(member.id, "name", e.target.value)
//                 }
//                 style={styles.input}
//                 onFocus={(e) => {
//                   e.currentTarget.style.borderColor =
//                     styles.inputFocus.borderColor;
//                   e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow;
//                 }}
//                 onBlur={(e) => {
//                   e.currentTarget.style.borderColor = styles.input.border;
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor =
//                     styles.inputHover.borderColor;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = styles.input.border;
//                 }}
//                 placeholder="Enter team member name"
//               />
//             </div>
//             <div>
//               <label style={styles.label}>Position</label>
//               <input
//                 type="text"
//                 value={member.position}
//                 onChange={(e) =>
//                   handleTeamMemberChange(member.id, "position", e.target.value)
//                 }
//                 style={styles.input}
//                 onFocus={(e) => {
//                   e.currentTarget.style.borderColor =
//                     styles.inputFocus.borderColor;
//                   e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow;
//                 }}
//                 onBlur={(e) => {
//                   e.currentTarget.style.borderColor = styles.input.border;
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor =
//                     styles.inputHover.borderColor;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = styles.input.border;
//                 }}
//                 placeholder="Enter team member position"
//               />
//             </div>
//           </div>

//           <div style={{ marginTop: "1rem" }}>
//             <label style={styles.label}>Description</label>
//             <ReactQuill
//               theme="snow"
//               value={member.description}
//               onChange={(value) =>
//                 handleTeamMemberChange(member.id, "description", value)
//               }
//               style={{
//                 height: "9rem",
//                 marginBottom: "3rem",
//                 borderRadius: "0.75rem",
//                 border: "1px solid #e5e7eb",
//               }}
//               placeholder="Describe this team member..."
//             />
//           </div>

//           <div style={{ marginTop: "1rem" }}>
//             <label style={styles.label}>Profile Image</label>
//             {/* <LogoCoverUploader
//               text="Add Profile Image"
//               accept="image/*"
//               onChange={(e) => handleTeamMemberChange(member.id, 'image', e.target.files[0])}
//             /> */}
//             <LogoCoverUploader
//               text="Add Profile Image"
//               accept="image/*"
//               onUpload={(file) => handleImageChange(member.id, "image", file)}
//             />
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={(e) => handleSave(member, e)}
//               className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
//               disabled={actionLoading[member.id]}
//             >
//               {actionLoading[member.id] ? (
//                 "Saving..."
//               ) : (
//                 <Save className="w-5 h-5" />
//               )}
//             </button>
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setEditingId(null);
//               }}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               <X className="w-5 h-5" />
//             </button>
//             <button
//               onClick={(e) => handleDelete(member.id, e)}
//               className="text-red-500"
//               disabled={actionLoading[member.id]}
//             >
//               {actionLoading[member.id] ? (
//                 "..."
//               ) : (
//                 <Trash2 className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={addTeamMember}
//         style={styles.addButton}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.background = styles.addButtonHover.background;
//           e.currentTarget.style.transform = styles.addButtonHover.transform;
//           e.currentTarget.style.boxShadow = styles.addButtonHover.boxShadow;
//           e.currentTarget.querySelector("svg").style.transform =
//             styles.plusIconHover.transform;
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.background = styles.addButton.background;
//           e.currentTarget.style.transform = "none";
//           e.currentTarget.style.boxShadow = styles.addButton.boxShadow;
//           e.currentTarget.querySelector("svg").style.transform = "none";
//         }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           style={styles.plusIcon}
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 4.5v15m7.5-7.5h-15"
//           />
//         </svg>
//         Add New Team Member
//       </button>
//     </div>
//   );
// };

// export default TeamMemberManager;

import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Plus, Edit2, Save, X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newMember, setNewMember] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editSelectedFile, setEditSelectedFile] = useState(null);

  const baseUrl = "https://apiwl.novajobs.us/api/employeer";
  const token = localStorage.getItem("vendorToken");

  const baseImageUrl = "https://apiwl.novajobs.us";

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/company-teams`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        // Just set empty array instead of throwing error
        setTeamMembers([]);
        return;
      }

      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        setTeamMembers(result.data);
      } else {
        setTeamMembers([]);
      }
    } catch (err) {
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const removeTeamMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };
  const handleImageChange = (e, isEdit = false) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditSelectedFile(file);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setEditSelectedFile(null);
  };

  const handleSave = async (member, e) => {
    e.preventDefault();
    try {
      setActionLoading((prev) => ({ ...prev, [member.id]: true }));
      const formData = new FormData();
      formData.append("name", member.name);
      formData.append("description", member.description);
      if (editSelectedFile) {
        formData.append("media_upload", editSelectedFile);
      }

      const response = await fetch(`${baseUrl}/company-teams/${member.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update team member");
      const updatedMember = await response.json();

      setTeamMembers((prev) =>
        prev.map((m) =>
          m.id === member.id ? { ...m, ...updatedMember.data } : m
        )
      );

      setEditingId(null);
      setEditSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [member.id]: false }));
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      setActionLoading((prev) => ({ ...prev, [id]: true }));
      const response = await fetch(`${baseUrl}/company-teams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete team member");
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    setNewMember({ name: "", description: "" });
    setSelectedFile(null);
  };

  const handleSaveNew = async (e) => {
    e.preventDefault();
    if (!newMember || !selectedFile) return;

    try {
      setActionLoading((prev) => ({ ...prev, new: true }));
      const formData = new FormData();
      formData.append("name", newMember.name);
      formData.append("description", newMember.description);
      formData.append("media_upload", selectedFile);

      const response = await fetch(`${baseUrl}/company-teams`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add new team member");
      const result = await response.json();

      setTeamMembers((prev) => [...prev, result.data]);
      setNewMember(null);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, new: false }));
    }
  };

  const handleCancelNew = (e) => {
    e.preventDefault();
    setNewMember(null);
    setSelectedFile(null);
  };

  const handleUpdateField = (id, field, value) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    memberCard: {
      padding: "2rem",
      background: "linear-gradient(to bottom right, #ffffff, #f9fafb)",
      borderRadius: "1rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      border: "1px solid #e5e7eb",
      transition: "all 0.3s ease",
    },
    memberCardHover: {
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: "#bfdbfe",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    numberBadge: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "9999px",
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      marginRight: "0.75rem",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#1f2937",
    },
    deleteButton: {
      padding: "0.5rem",
      color: "#9ca3af",
      borderRadius: "9999px",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    deleteButtonHover: {
      color: "#ef4444",
      backgroundColor: "#fee2e2",
      transform: "scale(1.1)",
    },
    deleteIcon: {
      width: "1.5rem",
      height: "1.5rem",
      stroke: "currentColor",
      strokeWidth: "1.5",
      fill: "none",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    "@media (min-width: 768px)": {
      grid: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: "#374151",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.625rem 1rem",
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "0.75rem",
      transition: "all 0.2s ease",
    },
    inputHover: {
      borderColor: "#93c5fd",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "1.25rem 1.5rem",
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      borderRadius: "1rem",
      color: "white",
      fontWeight: 500,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: "all 0.3s ease",
    },
    addButtonHover: {
      background: "linear-gradient(to right, #2563eb, #1d4ed8)",
      transform: "scale(1.02)",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    plusIcon: {
      width: "1.75rem",
      height: "1.75rem",
      marginRight: "0.75rem",
      transition: "transform 0.3s ease",
      stroke: "currentColor",
      strokeWidth: "2",
      fill: "none",
    },
    plusIconHover: {
      transform: "rotate(90deg)",
    },
  };
  return (
    <div style={styles.container}>
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => {
              setError(null);
              fetchTeamMembers();
            }}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {teamMembers.length > 0 && (
        <div>
          {teamMembers.map((member, index) => (
            <div key={member.id} style={styles.memberCard}>
              <div style={styles.header}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={styles.numberBadge}>{index + 1}</div>
                  <h5 style={styles.title}>Team Member #{index + 1}</h5>
                </div>
                <button
                  type="button"
                  onClick={() => removeTeamMember(member.id)}
                  style={styles.deleteButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      styles.deleteButtonHover.color;
                    e.currentTarget.style.backgroundColor =
                      styles.deleteButtonHover.backgroundColor;
                    e.currentTarget.style.transform =
                      styles.deleteButtonHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = styles.deleteButton.color;
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={styles.deleteIcon}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {editingId === member.id ? (
                <div style={styles.grid}>
                  <div>
                    <label style={styles.label}>Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleUpdateField(member.id, "name", e.target.value)
                      }
                      style={styles.input}
                      placeholder="Name"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          styles.inputFocus.borderColor;
                        e.currentTarget.style.boxShadow =
                          styles.inputFocus.boxShadow;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = styles.input.border;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          styles.inputHover.borderColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = styles.input.border;
                      }}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <label style={styles.label}>Description</label>
                    <ReactQuill
                      style={{
                        height: "9rem",
                        marginBottom: "3rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e5e7eb",
                      }}
                      value={member.description}
                      onChange={(content) =>
                        handleUpdateField(member.id, "description", content)
                      }
                      className="mb-2"
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <label style={styles.label}>Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, true)}
                      className="w-full"
                    />
                    {editSelectedFile && (
                      <p className="text-sm text-gray-500 mt-1">
                        Selected: {editSelectedFile.name}
                      </p>
                    )}
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      onClick={(e) => handleSave(member, e)}
                      className="btn btn-success text-white px-4 py-2 rounded flex items-center"
                      disabled={actionLoading[member.id]}
                    >
                      {actionLoading[member.id] ? (
                        "Saving..."
                      ) : (
                        <Save className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditingId(null);
                      }}
                      className="btn btn-danger text-white px-4 py-2 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {member.media && (
                    <div style={{ marginTop: "1rem" }}>
                      <label style={styles.label}>Profile Image</label>
                      <img
                        src={`${baseImageUrl}${member.media}`}
                        alt={member.name}
                        className="w-24 md:w-auto h-24 md:h-48 object-cover rounded"
                      />
                    </div>
                  )}

                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: member.description }}
                    className="my-2 text-gray-600"
                  />
                  <div className="d-flex justify-content-start gap-2 mt-4">
                    {/* Culture Images */}
                    <div className="">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(member.id);
                        }}
                        className="btn btn-success btn-sm   "
                        disabled={actionLoading[member.id]}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={(e) => handleDelete(member.id, e)}
                        className="btn btn-danger btn-sm  "
                        disabled={actionLoading[member.id]}
                      >
                        {actionLoading[member.id] ? (
                          "..."
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {teamMembers.length === 0 && !loading && !newMember && (
        <div className="text-center p-8 bg-gray-50 rounded-lg mb-4">
          <p className="text-gray-600 mb-4">
            No team members available. Start by adding your first team member!
          </p>
        </div>
      )}

      {newMember ? (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Team Member</h2>

          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    styles.inputFocus.borderColor;
                  e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    styles.inputHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                }}
                placeholder="Enter team member position"
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={styles.label}>Description</label>
              <ReactQuill
                theme="snow"
                value={newMember.description}
                onChange={(content) =>
                  setNewMember({ ...newMember, description: content })
                }
                style={{
                  height: "9rem",
                  marginBottom: "3rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #e5e7eb",
                }}
                placeholder="Describe this team member..."
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={styles.label}>Profile Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {selectedFile && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              {/* Culture Images */}
              <div className="">
                <button
                  onClick={handleSaveNew}
                  style={{
                    backgroundColor: "#1967d2",
                    border: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  className={`flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded transition-all duration-200 ${
                    !selectedFile || !newMember.name || actionLoading.new
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    !selectedFile || !newMember.name || actionLoading.new
                  }
                >
                  {actionLoading.new ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="">
                <button
                  style={{
                    backgroundColor: "#485c77",
                    border: "none",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={handleCancelNew}
                  className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={actionLoading.new}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleAddNew}
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = styles.addButtonHover.background;
            e.currentTarget.style.transform = styles.addButtonHover.transform;
            e.currentTarget.style.boxShadow = styles.addButtonHover.boxShadow;
            e.currentTarget.querySelector("svg").style.transform =
              styles.plusIconHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = styles.addButton.background;
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = styles.addButton.boxShadow;
            e.currentTarget.querySelector("svg").style.transform = "none";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.plusIcon}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Team Member
        </button>
      )}
    </div>
  );
};

export default TeamMemberManager;

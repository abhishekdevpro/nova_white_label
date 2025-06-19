// "use client"

// import { useState, useReducer } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"

// export const useTeamMembers = () => {
//   const [teamMembers, setTeamMembers] = useState([])
//   const [editingId, setEditingId] = useState(null)
//   const [tempMember, setTempMember] = useState({
//     name: "",
//     description: "",
//     image: null,
//   })
//   const [, forceUpdate] = useReducer((x) => x + 1, 0)

//   const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken")

//   const addTeamMember = () => {
//     setEditingId("new")
//     setTempMember({ name: "", description: "", image: null })
//   }

//   const saveTeamMember = async () => {
//     const formData = new FormData()
//     formData.append("name", tempMember.name)
//     formData.append("description", tempMember.description)
//     if (tempMember.image) {
//       formData.append("media_upload", tempMember.image)
//     }

//     try {
//       const response = await axios.post("https://apiwl.novajobs.us/api/employeer/company-teams", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: token,
//         },
//       })

//       if (response.status === 200) {
//         toast.success("Team member saved successfully!")
//         if (editingId === "new") {
//           setTeamMembers((prev) => [...prev, { id: Date.now(), ...tempMember }])
//         } else {
//           setTeamMembers((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...tempMember } : m)))
//         }
//         setEditingId(null)
//         setTempMember({ name: "", description: "", media_upload: null })
//         forceUpdate()
//       } else {
//         toast.error("Failed to save team member.")
//       }
//     } catch (error) {
//       toast.error("Error saving team member.")
//     }
//   }

//   const cancelEdit = () => {
//     setEditingId(null)
//     setTempMember({ name: "", description: "", image: null })
//     forceUpdate()
//   }

//   return {
//     teamMembers,
//     setTeamMembers,
//     editingId,
//     setEditingId,
//     tempMember,
//     setTempMember,
//     addTeamMember,
//     saveTeamMember,
//     cancelEdit,
//     forceUpdate,
//   }
// }

import { useState, useCallback } from "react";
import axios from "axios";

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempMember, setTempMember] = useState({
    name: "",
    description: "",
    media_upload: null,
  });

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken");
  };

  // Fetch team members
  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = getAuthToken();

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      const response = await axios.get(
        "https://apiwl.novajobs.us/api/employeer/company-teams",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = response.data;

      if (result.status === "success" && result.data) {
        setTeamMembers(result.data);
      } else {
        setError(result.message || "Failed to fetch team members");
      }
    } catch (err) {
      setError("Error fetching team members: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle add new team member
  const handleAdd = useCallback(() => {
    setEditingId("new");
    setTempMember({
      name: "",
      description: "",
      media_upload: null,
    });
    setError("");
  }, []);

  // Handle edit existing team member
  const handleEdit = useCallback((member) => {
    setEditingId(member.id);
    setTempMember({
      name: member.name || "",
      description: member.description || "",
      media_upload: null, // Reset media_upload for editing
    });
    setError("");
  }, []);

  // Handle save team member (create or update)
  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = getAuthToken();

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      if (!tempMember.name.trim()) {
        setError("Name is required");
        return;
      }

      const formData = new FormData();
      formData.append("name", tempMember.name.trim());
      formData.append("description", tempMember.description || "");

      if (tempMember.media_upload) {
        formData.append("media_upload", tempMember.media_upload);
      }

      let response;
      
      if (editingId === "new") {
        // Create new team member
        response = await axios.post(
          "https://apiwl.novajobs.us/api/employeer/company-teams",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Update existing team member using PATCH
        response = await axios.patch(
          `https://apiwl.novajobs.us/api/employeer/company-teams/${editingId}`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      const result = response.data;

      if (result.status === "success") {
        // Refresh the team members list
        await fetchTeamMembers();
        
        // Reset form
        setEditingId(null);
        setTempMember({
          name: "",
          description: "",
          media_upload: null,
        });
        setError("");
      } else {
        setError(result.message || "Failed to save team member");
      }
    } catch (err) {
      setError("Error saving team member: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [editingId, tempMember, fetchTeamMembers]);

  // Handle delete team member
  const handleDelete = useCallback(async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = getAuthToken();

      if (!token) {
        setError("Authentication token not found");
        return;
      }

      const response = await axios.delete(
        `https://apiwl.novajobs.us/api/employeer/company-teams/${memberId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = response.data;

      if (result.status === "success") {
        // Remove from local state
        setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      } else {
        setError(result.message || "Failed to delete team member");
      }
    } catch (err) {
      setError("Error deleting team member: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle cancel editing
  const handleCancel = useCallback(() => {
    setEditingId(null);
    setTempMember({
      name: "",
      description: "",
      media_upload: null,
    });
    setError("");
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    // State
    teamMembers,
    loading,
    error,
    editingId,
    tempMember,
    
    // Actions
    fetchTeamMembers,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    setTempMember,
    clearError,
  };
};
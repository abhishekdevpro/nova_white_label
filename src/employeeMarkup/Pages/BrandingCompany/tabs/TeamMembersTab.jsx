
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TeamMemeberTab.css";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { Plus } from "lucide-react";
import TextEditor from "../../../../common/TextEditor";
import { toast } from "react-toastify";

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

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes

  if (file) {
    if (file.size > maxSize) {
      // Show error if file is larger than 2MB
      toast.error("File size exceeds 2MB limit");
      e.target.value = ''; // Clear the input
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      e.target.value = '';
      return;
    }

    // If validation passes, update the tempMember state with the new image
    setTempMember(prev => ({
      ...prev,
      media_upload: file
    }));
  }
};

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
          <div className="">
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

          {/* {error && (
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
          )} */}

          <div className="form-group">
            <label className="form-label">
              {/* <i className="fas fa-user"></i> */}
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
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {/* <i className="fas fa-info-circle"></i> */}
              Description
            </label>
            <div className="quill-container">
              
              <TextEditor 
                value={tempMember.description}
                onChange={(val) =>
                  setTempMember((prev) => ({ ...prev, description: val }))
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              {/* <i className="fas fa-camera"></i> */}
              {editingId === "new" ? "Upload Photo" : "Update Photo"}
            </label>
            <div className="file-upload-container">
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Choose Photo</span>
              </label>
            </div>
            <div className="form-hint">
              {/* <i className="fas fa-info-circle"></i> */}
              Recommended: Square image, at least 300x300px
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="site-button"
            >
              
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !tempMember.name.trim()}
              className="site-button"
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
                      className="site-button "
                    >
                      {/* <i className="fas fa-edit"></i> */}
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member.id)}
                      disabled={loading}
                      className="site-button bg-danger"
                    >
                      {/* <i className="fas fa-trash"></i> */}
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
              {/* <i className="fas fa-users"></i> */}
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

"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const TeamMembersTab = ({
  activeTab,
  teamMembers,
  editingId,
  tempMember,
  setTempMember,
  addTeamMember,
  saveTeamMember,
  cancelEdit,
}) => {
  if (activeTab !== "team") return null

  return (
    <div className="tab-pane fade show active">
      <div style={{ maxWidth: 420, margin: "0 auto", paddingTop: 32 }}>
        {editingId !== null ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              padding: 32,
              marginBottom: 32,
              minWidth: 320,
            }}
          >
            <input
              type="text"
              value={tempMember.name}
              onChange={(e) =>
                setTempMember((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Name"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 8,
                border: "1.5px solid #e0e0e0",
                fontSize: 17,
                marginBottom: 18,
                background: "#fafbfc",
              }}
            />
            <ReactQuill
              theme="snow"
              value={tempMember.description}
              onChange={(val) =>
                setTempMember((prev) => ({
                  ...prev,
                  description: val,
                }))
              }
              style={{
                height: 120,
                marginBottom: 18,
                borderRadius: 8,
                border: "1.5px solid #e0e0e0",
                background: "#fafbfc",
              }}
            />
            <div style={{ fontWeight: 700, marginBottom: 8, color: "#222" }}>Update Photo</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setTempMember((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
              style={{ marginBottom: 24 }}
            />
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <button
                type="button"
                onClick={saveTeamMember}
                style={{
                  background: "#22c55e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontWeight: 700,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
                  transition: "background 0.2s",
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                  />
                </svg>
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                style={{
                  background: "#6b7280",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 28px",
                  fontWeight: 700,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(107,114,128,0.08)",
                  transition: "background 0.2s",
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
                  />
                </svg>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={addTeamMember}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            margin: "0 auto",
            padding: "16px 0",
            background: "#3b82f6",
            borderRadius: 10,
            color: "white",
            fontWeight: 700,
            fontSize: 20,
            boxShadow: "0 4px 16px rgba(59,130,246,0.10)",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
            marginTop: 32,
            marginBottom: 32,
            border: "none",
            cursor: "pointer",
            gap: 12,
          }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
          </svg>
          Add New Team Member
        </button>
      </div>
    </div>
  )
}

export default TeamMembersTab

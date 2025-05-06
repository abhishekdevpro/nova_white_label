import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LogoCoverUploader from './LogoCoverUploader';

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tempMember, setTempMember] = useState({ name: '', description: '', image: null });

  const addTeamMember = () => {
    setEditingId('new');
    setTempMember({ name: '', description: '', image: null });
  };

  const saveTeamMember = () => {
    if (editingId === 'new') {
      setTeamMembers(prev => [
        ...prev,
        { id: Date.now(), ...tempMember }
      ]);
    } else {
      setTeamMembers(prev => prev.map(m => m.id === editingId ? { ...m, ...tempMember } : m));
    }
    setEditingId(null);
    setTempMember({ name: '', description: '', image: null });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempMember({ name: '', description: '', image: null });
  };

  const editTeamMember = (member) => {
    setEditingId(member.id);
    setTempMember({ name: member.name, description: member.description, image: member.image || null });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    memberCard: {
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
    },
    memberCardHover: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      borderColor: '#bfdbfe',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    numberBadge: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #3b82f6, #2563eb)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      marginRight: '0.75rem',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1f2937',
    },
    deleteButton: {
      padding: '0.5rem',
      color: '#9ca3af',
      borderRadius: '9999px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButtonHover: {
      color: '#ef4444',
      backgroundColor: '#fee2e2',
      transform: 'scale(1.1)',
    },
    deleteIcon: {
      width: '1.5rem',
      height: '1.5rem',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      fill: 'none',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      marginBottom: '1.5rem',
    },
    '@media (min-width: 768px)': {
      grid: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#374151',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.625rem 1rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      transition: 'all 0.2s ease',
    },
    inputHover: {
      borderColor: '#93c5fd',
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
    },
    addButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '1.25rem 1.5rem',
      background: 'linear-gradient(to right, #3b82f6, #2563eb)',
      borderRadius: '1rem',
      color: 'white',
      fontWeight: 500,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
    },
    addButtonHover: {
      background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
      transform: 'scale(1.02)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    plusIcon: {
      width: '1.75rem',
      height: '1.75rem',
      marginRight: '0.75rem',
      transition: 'transform 0.3s ease',
      stroke: 'currentColor',
      strokeWidth: '2',
      fill: 'none',
    },
    plusIconHover: {
      transform: 'rotate(90deg)',
    },
  };

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', paddingTop: 32 }}>
      <h2 style={{ fontWeight: 800, fontSize: 36, color: '#444', marginBottom: 32, textAlign: 'left', letterSpacing: 1 }}>Team Member Manager</h2>
      {(editingId !== null) ? (
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          padding: 32,
          marginBottom: 32,
          minWidth: 320,
        }}>
          <input
            type="text"
            value={tempMember.name}
            onChange={e => setTempMember(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 8,
              border: '1.5px solid #e0e0e0',
              fontSize: 17,
              marginBottom: 18,
              background: '#fafbfc',
            }}
          />
          <ReactQuill
            theme="snow"
            value={tempMember.description}
            onChange={val => setTempMember(prev => ({ ...prev, description: val }))}
            style={{ height: 120, marginBottom: 18, borderRadius: 8, border: '1.5px solid #e0e0e0', background: '#fafbfc' }}
          />
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#222' }}>Update Photo</div>
          <input
            type="file"
            accept="image/*"
            onChange={e => setTempMember(prev => ({ ...prev, image: e.target.files[0] }))}
            style={{ marginBottom: 24 }}
          />
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <button
              type="button"
              onClick={saveTeamMember}
              style={{
                background: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 28px',
                fontWeight: 700,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(34,197,94,0.08)',
                transition: 'background 0.2s',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l3.83 3.83A2 2 0 0 1 20 8.83V19a2 2 0 0 1-2 2ZM7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.83a2 2 0 0 0-.59-1.41l-3.83-3.83A2 2 0 0 0 14.17 3H7Zm5 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"></path></svg>
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              style={{
                background: '#6b7280',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 28px',
                fontWeight: 700,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(107,114,128,0.08)',
                transition: 'background 0.2s',
              }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"></path></svg>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={addTeamMember}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 320,
          margin: '0 auto',
          padding: '16px 0',
          background: '#3b82f6',
          borderRadius: 10,
          color: 'white',
          fontWeight: 700,
          fontSize: 20,
          boxShadow: '0 4px 16px rgba(59,130,246,0.10)',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
          marginTop: 32,
          marginBottom: 32,
          border: 'none',
          cursor: 'pointer',
          gap: 12,
        }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5"/></svg>
        Add New Team Member
      </button>
    </div>
  );
};

export default TeamMemberManager; 
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LogoCoverUploader from './LogoCoverUploader';

const TeamMemberManager = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  const addTeamMember = () => {
    setTeamMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        position: '',
        description: '',
        image: null
      }
    ]);
  };

  const removeTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleTeamMemberChange = (id, field, value) => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
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
    <div style={styles.container}>
      {teamMembers.map((member, index) => (
        <div 
          key={member.id} 
          style={styles.memberCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.memberCardHover.boxShadow;
            e.currentTarget.style.borderColor = styles.memberCardHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = styles.memberCard.boxShadow;
            e.currentTarget.style.borderColor = styles.memberCard.border;
          }}
        >
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={styles.numberBadge}>{index + 1}</div>
              <h5 style={styles.title}>Team Member #{index + 1}</h5>
            </div>
            <button
              type="button"
              onClick={() => removeTeamMember(member.id)}
              style={styles.deleteButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = styles.deleteButtonHover.color;
                e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor;
                e.currentTarget.style.transform = styles.deleteButtonHover.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = styles.deleteButton.color;
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={styles.deleteIcon} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div style={styles.grid}>
            <div>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(member.id, 'name', e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = styles.inputFocus.borderColor;
                  e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = styles.inputHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                }}
                placeholder="Enter team member name"
              />
            </div>
            <div>
              <label style={styles.label}>Position</label>
              <input
                type="text"
                value={member.position}
                onChange={(e) => handleTeamMemberChange(member.id, 'position', e.target.value)}
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = styles.inputFocus.borderColor;
                  e.currentTarget.style.boxShadow = styles.inputFocus.boxShadow;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = styles.inputHover.borderColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = styles.input.border;
                }}
                placeholder="Enter team member position"
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={styles.label}>Description</label>
            <ReactQuill
              theme="snow"
              value={member.description}
              onChange={(value) => handleTeamMemberChange(member.id, 'description', value)}
              style={{ height: '9rem', marginBottom: '3rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}
              placeholder="Describe this team member..."
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={styles.label}>Profile Image</label>
            <LogoCoverUploader
              text="Add Profile Image"
              accept="image/*"
              onChange={(e) => handleTeamMemberChange(member.id, 'image', e.target.files[0])}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTeamMember}
        style={styles.addButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = styles.addButtonHover.background;
          e.currentTarget.style.transform = styles.addButtonHover.transform;
          e.currentTarget.style.boxShadow = styles.addButtonHover.boxShadow;
          e.currentTarget.querySelector('svg').style.transform = styles.plusIconHover.transform;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = styles.addButton.background;
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = styles.addButton.boxShadow;
          e.currentTarget.querySelector('svg').style.transform = 'none';
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={styles.plusIcon} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add New Team Member
      </button>
    </div>
  );
};

export default TeamMemberManager; 
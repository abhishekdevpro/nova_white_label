import React from 'react';

const Switch = ({ checked, onChange, className = '' }) => {
  return (
    <>
      {/* Add custom CSS */}
      <style jsx>{`
        .custom-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 18px;
        }
        
        .custom-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 18px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #007bff;
        }
        
        input:checked + .slider:before {
          transform: translateX(18px);
        }
        
        .slider:hover {
          box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }
      `}</style>
      
      <label className={`custom-switch ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Switch;
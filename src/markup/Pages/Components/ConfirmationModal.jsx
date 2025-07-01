import React from 'react';

const ConfirmationModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body px-0 py-2">
            <p>{message}</p>
          </div>
          <div className="modal-footer py-2 ">
            <button className="site-button" onClick={onCancel}>
              {cancelText}
            </button>
            <button className="site-button btn-danger" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

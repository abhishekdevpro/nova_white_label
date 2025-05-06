import React from 'react';

export const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => {
  return (
    <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${className}`}>
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className }) => {
  return (
    <div className={`sm:flex sm:items-start ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className }) => {
  return (
    <h3 className={`text-lg leading-6 font-medium text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const DialogFooter = ({ children, className }) => {
  return (
    <div className={`mt-5 sm:mt-4 sm:flex sm:flex-row-reverse ${className}`}>
      {children}
    </div>
  );
}; 
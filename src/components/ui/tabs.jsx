import React from 'react';

export const Tabs = ({ children, value, className, onValueChange }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value,
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children, className }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ children, value, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      onClick={() => onClick?.(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value, className }) => {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
}; 
// InnerButton.js
import React from 'react';

const InnerButton = ({ onClick, children, stopPropagation = true }) => {
  const handleInnerClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick();
  };

  return (
    <button 
      onClick={handleInnerClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '10px'
      }}
    >
      {children}
    </button>
  );
};

export default InnerButton;
import React from 'react';

function Container({ children }) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      {children}
    </div>
  );
}

export default Container;

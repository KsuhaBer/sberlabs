// Button.js
import React from 'react';
import InnerButton from './InnerButton';

const Button = ({ onClick, children }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '20px',
        backgroundColor: '#2196F3',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center'
      }}
    >
      <p>Внешняя кнопка: {children}</p>
      <InnerButton onClick={() => alert('Внутренняя кнопка нажата!')}>
        Внутренняя кнопка
      </InnerButton>
    </div>
  );
};

export default Button;
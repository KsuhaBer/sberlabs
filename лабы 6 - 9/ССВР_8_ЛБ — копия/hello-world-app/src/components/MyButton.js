import React from 'react';

const MyButton = ({ children, text }) => {
  function handleClick() {
    alert(children ?? text);
  }

  return (
    <button style={{ padding: '10px 20px', margin: '5px' }} onClick={handleClick}>
      {children ?? text}
    </button>
  );
}

export default MyButton;
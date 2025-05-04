import React from "react";

const NestedButtons = ({ onOuterClick, onInnerClick, bubbleToOuter = true }) => {
  const handleOuterClick = (e) => {
    onOuterClick?.(e);
    alert("Нажата внешняя кнопка");
  };

  const handleInnerClick = (e) => {
    onInnerClick?.(e);
    alert("Нажата внутренняя кнопка");
    if (!bubbleToOuter) e.stopPropagation();
  };

  return (
    <button onClick={handleOuterClick}>
      Внешняя кнопка
      <button onClick={handleInnerClick} style={{ marginLeft: 10 }}>
        Внутренняя кнопка
      </button>
    </button>
  );
};

export default NestedButtons;

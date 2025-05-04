// MainPage.js
import React from 'react';
import NestedButtons from './NestedButtons';

const MainPage = () => {
  const handleOuterClick = () => {
    alert('Внешняя кнопка нажата!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Главная страница</h1>
      <p>Добро пожаловать на главную страницу вашего приложения!</p>
      
      <NestedButtons></ NestedButtons>
    </div>
  );
};

export default MainPage;
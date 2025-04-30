
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './Context';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Counter from './components/Counter';
import store from './redux/store';
import './index.css';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import { Container, Box } from '@mui/material';

// Тексты лабораторных работ
const lab1Content = `Реализовать скрипт, который уведомит о полной загрузке страницы.
Реализовать кнопку счетчик, которая будет увеличивать счетчик на "1" и выводить его значение на страницу (button onclick).
Реализовать кнопку счетчик, которая будет уменьшать счетчик на "1" реализовать с помощью listener click.
Реализовать форму аутентификации пользователя (<form>).
Реализовать скрипт очистки данных формы.
Реализовать скрипт отправки данных формы с помощью listener submit. Без отправки на сервер провести валидацию введенных данных, если login=="admin" & pass=="admin" вывести сообщение об успехе, иначе сообщение о неуспехе.
Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage.`;

const lab2Content = `Создать "Hello World" приложение на основе React. Для создания можно использовать create-react-app или vite.
Реализовать компонент кнопку, контейнер и использовать их на странице.
Реализовать шаблон страницы и разместить на нем компоненты навигации.
Разместить проект в репозиторий в github.
Прикрепить текстовый файл с ссылкой на проект.`;

const lab3Content = `Продолжаем задание "Реализовать шаблон страницы и разместить на нем компоненты навигации" (Можно использовать готовые библиотеки Mui/Bootstrap и т.д.).
Реализуем компоненты Header, Footer, Menu и Content.
В меню выводим список лабораторных работ.
В Content выводим содержимое лабораторной работы.
Разместить проект в репозиторий в github.
Прикрепить текстовый файл с ссылкой на проект.`;

const App = () => {
  const [selectedLab, setSelectedLab] = useState(null);

  const labs = [
    {
      title: 'Лабораторная работа 1',
      content: lab1Content
    },
    {
      title: 'Лабораторная работа 2',
      content: lab2Content
    },
    {
      title: 'Лабораторная работа 3',
      content: lab3Content
    },
  ];

  const handleLabSelect = (index) => {
    setSelectedLab(labs[index]);
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Navbar />
            <ThemeToggle />
            <Container component="main" sx={{ flex: 1, display: 'flex' }}>
              <Routes>
                <Route 
                  path="/Main" 
                  element={
                    <>
                      <Menu labs={labs} onLabSelect={handleLabSelect} />
                      <Content 
                        title={selectedLab ? selectedLab.title : 'Выберите лабораторную работу'} 
                        content={selectedLab ? selectedLab.content : 'Пожалуйста, выберите лабораторную работу из меню.'} 
                      />
                    </>
                  } 
                />
                <Route path="/counter" element={<Counter />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

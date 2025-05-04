import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './Context';
import store from './store/store';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import { Container, Box, Button, Typography } from '@mui/material';
import useLoginState from './hooks/useLoginState'; 
import Authentication from './components/Authentication';
import Registration from './components/Registration';
import UpdateProfile from './components/UpdateProfile';
import Counter from './components/Counter'; 
import Home from './components/Home'; 
import About from './components/About'; 
import MainPage from './components/MainPage';
import Admin from './components/Admin';

const lab1Content = `...`; // Ваши тексты лабораторных работ
const lab2Content = `...`;
const lab3Content = `...`;

const App = () => {
  const [selectedLab, setSelectedLab] = useState(null);
  const { isLoggedIn, login, logout, username, password, userRole } = useLoginState();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const labs = [
    { title: 'Лабораторная работа 1', content: lab1Content },
    { title: 'Лабораторная работа 2', content: lab2Content },
    { title: 'Лабораторная работа 3', content: lab3Content },
  ];

  const handleLabSelect = (index) => {
    setSelectedLab(labs[index]);
  };

  const handleRegister = (username, password, role) => {
    login(username, password, role);
    setIsRegistering(false);
    setCurrentUser({ username, password, role });
  };

  const handleUpdate = (updatedUser) => {
    setIsUpdatingProfile(false);
    if (updatedUser) {
      setCurrentUser(updatedUser);
      // Здесь можно обновить данные в useLoginState, если нужно
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header 
              onMenuToggle={() => setDrawerOpen(true)} 
              onToggleTheme={() => { /* Ваша логика переключения темы */ }} 
              onLogout={() => {
                logout();
                setCurrentUser(null);
              }}
              onUpdateProfile={() => setIsUpdatingProfile(true)} 
              onAdmin={() => window.location.href = '/admin'} 
              userRole={userRole} 
            />

            <Container component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {isLoggedIn && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-end' }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    <p>Ваша роль: {userRole}</p>
                  </Typography>
                  {isUpdatingProfile && (
                    <UpdateProfile 
                      currentUser={{ username, password, role: userRole }} 
                      onUpdate={handleUpdate} 
                    />
                  )}
                </Box>
              )}
              <Routes>
                {!isLoggedIn ? (
                  <>
                    <Route 
                      path="/" 
                      element={
                        <div>
                          <h2>Добро пожаловать!</h2>
                          <p>Пожалуйста, войдите или зарегистрируйтесь.</p>
                          <Authentication onLogin={(username, password, role) => {
                            login(username, password, role);
                            setCurrentUser({ username, password, role });
                          }} />
                          <Button variant="outlined" onClick={() => setIsRegistering(true)}>Регистрация</Button>
                          {isRegistering && (
                            <Registration onRegister={handleRegister} />
                          )}
                        </div>
                      } 
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route 
                      path="/Main" 
                      element={
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                          <Menu 
                            labs={labs} 
                            onLabSelect={handleLabSelect} 
                            open={drawerOpen} 
                            onClose={() => setDrawerOpen(false)} 
                          />
                          <Content 
                            title={selectedLab ? selectedLab.title : 'Выберите лабораторную работу'} 
                            content={selectedLab ? selectedLab.content : 'Пожалуйста, выберите лабораторную работу из меню.'} 
                          />
                        </Box>
                      } 
                    />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/MainPage" element={<MainPage />} />
                    <Route 
                      path="/about" 
                      element={<About username={username} password={password} role={userRole} />} 
                    />
                    <Route path="/" element={<Navigate to="/Main" />} />
                  </>
                )}
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
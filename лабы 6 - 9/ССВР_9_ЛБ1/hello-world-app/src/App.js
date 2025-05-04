import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './Context';
import store from './store/store';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container, Box, Button, Typography } from '@mui/material';
import useLoginState from './hooks/useLoginState'; 

// Ленивые импорты компонентов
const Menu = lazy(() => import('./components/Menu'));
const Content = lazy(() => import('./components/Content'));
const Authentication = lazy(() => import('./components/Authentication'));
const Registration = lazy(() => import('./components/Registration'));
const UpdateProfile = lazy(() => import('./components/UpdateProfile'));
const Counter = lazy(() => import('./components/Counter'));
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const MainPage = lazy(() => import('./components/MainPage'));
const Admin = lazy(() => import('./components/Admin'));

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
              username={username}
            />

            <Container component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {isLoggedIn && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-end' }}>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    <p>Ваша роль: {userRole}</p>
                  </Typography>
                  {isUpdatingProfile && (
                    <Suspense fallback={<div>Загрузка...</div>}>
                      <UpdateProfile 
                        currentUser={{ username, password, role: userRole }} 
                        onUpdate={handleUpdate} 
                      />
                    </Suspense>
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
                          <Suspense fallback={<div>Загрузка входа...</div>}>
                            <Authentication onLogin={(username, password, role) => {
                              login(username, password, role);
                              setCurrentUser({ username, password, role });
                            }} />
                          </Suspense>
                          <Button variant="outlined" onClick={() => setIsRegistering(true)}>Регистрация</Button>
                          {isRegistering && (
                            <Suspense fallback={<div>Загрузка регистрации...</div>}>
                              <Registration onRegister={handleRegister} />
                            </Suspense>
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
                          <Suspense fallback={<div>Загрузка меню...</div>}>
                            <Menu 
                              labs={labs} 
                              onLabSelect={handleLabSelect} 
                              open={drawerOpen} 
                              onClose={() => setDrawerOpen(false)} 
                            />
                          </Suspense>
                          <Suspense fallback={<div>Загрузка контента...</div>}>
                            <Content 
                              title={selectedLab ? selectedLab.title : 'Выберите лабораторную работу'} 
                              content={selectedLab ? selectedLab.content : 'Пожалуйста, выберите лабораторную работу из меню.'} 
                            />
                          </Suspense>
                        </Box>
                      } 
                    />
                    <Route 
                      path="/admin" 
                      element={
                        <Suspense fallback={<div>Загрузка админки...</div>}>
                          <Admin username={username} />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/counter" 
                      element={
                        <Suspense fallback={<div>Загрузка счётчика...</div>}>
                          <Counter />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/home" 
                      element={
                        <Suspense fallback={<div>Загрузка главной...</div>}>
                          <Home />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/MainPage" 
                      element={
                        <Suspense fallback={<div>Загрузка страницы...</div>}>
                          <MainPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/about" 
                      element={
                        <Suspense fallback={<div>Загрузка информации...</div>}>
                          <About username={username} password={password} role={userRole} />
                        </Suspense>
                      } 
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
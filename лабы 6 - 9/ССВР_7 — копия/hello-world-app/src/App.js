import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './Context'; // Импортируйте ваш ThemeProvider
import store from './store/store';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import { Container, Box, Button, useMediaQuery } from '@mui/material';
import useLoginState from './hooks/useLoginState'; 
import Authentication from './components/Authentication';
import Registration from './components/Registration';
import UpdateProfile from './components/UpdateProfile';
import Counter from './components/Counter'; 
import Home from './components/Home'; 
import About from './components/About'; 
import MainPage from './components/MainPage'; 

const lab1Content = `...`; // Ваши тексты лабораторных работ
const lab2Content = `...`;
const lab3Content = `...`;

const App = () => {
    const [selectedLab, setSelectedLab] = useState(null);
    const { isLoggedIn, login: loginUser  , logout, username, password } = useLoginState();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Provider store={store}>
            <ThemeProvider> {/* Используйте ваш ThemeProvider */}
                <Router>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            minHeight: '100vh', 
                            backgroundColor: 'background.default',
                        }}
                    >
                        <Header onMenuToggle={() => setDrawerOpen(true)} drawerOpen={drawerOpen} onDrawerClose={() => setDrawerOpen(false)} />
                        <Container component="main" sx={{ flex: 1 }}>
                            <MainContent 
                                isLoggedIn={isLoggedIn} 
                                loginUser ={loginUser } 
                                logout={logout} 
                                isRegistering={isRegistering} 
                                setIsRegistering={setIsRegistering} 
                                isUpdatingProfile={isUpdatingProfile} 
                                setIsUpdatingProfile={setIsUpdatingProfile} 
                                drawerOpen={drawerOpen} 
                                setDrawerOpen={setDrawerOpen} 
                                selectedLab={selectedLab} 
                                setSelectedLab={setSelectedLab} 
                                username={username} // Передаём username
                                password={password} // Передаём password
                            />
                        </Container>
                        <Footer />
                    </Box>
                </Router>
            </ThemeProvider>
        </Provider>
    );
};

const MainContent = ({ 
    isLoggedIn, 
    loginUser , 
    logout, 
    isRegistering, 
    setIsRegistering, 
    isUpdatingProfile, 
    setIsUpdatingProfile, 
    drawerOpen, 
    setDrawerOpen,
    selectedLab,
    setSelectedLab,
    username,
    password
    
}) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const labs = [
        { title: 'Лабораторная работа 1', content: lab1Content },
        { title: 'Лабораторная работа 2', content: lab2Content },
        { title: 'Лабораторная работа 3', content: lab3Content },
    ];

    const handleLabSelect = (index) => {
        setSelectedLab(labs[index]);
    };

    const handleRegister = async (username, password) => {
        // Здесь вы можете вызвать loginUser  для выполнения входа
        await loginUser (username, password); // Вход после регистрации
        setIsRegistering(false);
    };

    const handleUpdate = () => {
        setIsUpdatingProfile(false);
    };

    return (
        <>
            {isLoggedIn && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={logout} 
                        sx={{ 
marginBottom: 2 }} 
>
    Выйти
</Button>
<Button 
    variant="contained" 
    onClick={() => setIsUpdatingProfile(true)} 
    sx={{ marginBottom: 2 }} 
>
    Обновить профиль
</Button>
{isUpdatingProfile && <UpdateProfile onUpdate={handleUpdate} />}
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
                <Authentication onLogin={loginUser } />
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
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
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
    <Route path="/counter" element={<Counter />} />
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Navigate to="/Main" />} />
    // В маршрутах для авторизованных пользователей:
    <Route path="/about" element={<About username={username} password={password} />} />
    <Route path="/MainPage" element={<MainPage />} />
</>
)}
</Routes>
</>
);
};

export default App;

import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Инициализация темы из localStorage
    const [isDarkTheme, _setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkTheme');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    // Обновляем тему, localStorage и стили 
    const setIsDarkTheme = (newTheme) => {
        _setIsDarkTheme(newTheme);
        localStorage.setItem('isDarkTheme', newTheme);
        
        
        document.body.className = newTheme ? 'dark' : 'light';
        document.body.style.backgroundColor = newTheme ? '#000' : '#fff';
        document.body.style.color = newTheme ? '#fff' : '#000';
    };

    
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
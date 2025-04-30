// src/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('isDarkTheme');
        if (savedTheme) {
            setIsDarkTheme(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isDarkTheme', isDarkTheme);
        document.body.className = isDarkTheme ? 'dark' : 'light'; // Изменение класса body
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
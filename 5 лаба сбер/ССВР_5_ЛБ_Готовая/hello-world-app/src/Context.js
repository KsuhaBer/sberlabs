import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
        document.body.style.backgroundColor = isDark ? '#fff' : '#000'; // Изменение цвета фона
        document.body.style.color = isDark ? '#000' : '#fff'; // Изменение цвета текста
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};
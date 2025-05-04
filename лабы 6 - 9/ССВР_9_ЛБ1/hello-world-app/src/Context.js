import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
    const [isDarkTheme, setIsDarkTheme] = useState(savedTheme);

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem('isDarkTheme', isDarkTheme);
    }, [isDarkTheme]);

    const theme = createTheme({
        palette: {
            mode: isDarkTheme ? 'dark' : 'light',
        },
    });

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </MUIThemeProvider>
    );
};

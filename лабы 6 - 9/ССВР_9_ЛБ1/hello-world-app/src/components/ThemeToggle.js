import React, { useContext } from 'react';
import { ThemeContext } from '../Context';
import { IconButton } from '@mui/material';

const ThemeToggle = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px' }}>
            <IconButton 
                onClick={toggleTheme}
                sx={{
                    padding: { xs: '4px', sm: '8px' },
                    borderRadius: '4px',
                    fontSize: '1.5rem' // Увеличиваем размер для смайлика
                }}
            >
                {isDarkMode ? '🐊' : '🐊'} {/* Смайлик крокодила для обеих тем */}
            </IconButton>
        </div>
    );
};

export default ThemeToggle;
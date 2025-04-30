import React, { useContext } from 'react';
import { ThemeContext } from '../Context';

const ThemeToggle = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '8px' }}>
            <button 
                onClick={toggleTheme} 
                style={{ 
                    padding: '0px 100px',
                    fontSize: '160px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                🐊
            </button>
        </div>
    );
};

export default ThemeToggle;
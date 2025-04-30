// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { ThemeProvider } from './Context'; // Импортируем ThemeProvider
import './index.css'; // Импортируем файл стилей

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
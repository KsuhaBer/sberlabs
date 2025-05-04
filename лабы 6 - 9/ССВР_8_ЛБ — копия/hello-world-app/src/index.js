import React from 'react';
import ReactDOM from 'react-dom/client'; // Обратите внимание на измененный импорт
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Создаем корень
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

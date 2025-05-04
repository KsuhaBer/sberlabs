import { useState } from 'react';
import axios from 'axios';

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUsername(response.data.username); // Сохраняем логин пользователя
            }
        } catch (error) {
            console.error('Ошибка входа:', error);
            alert('Неверные учетные данные');
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return { isLoggedIn, login, logout, username };
};

export default useLoginState;

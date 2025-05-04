import { useState, useCallback, useEffect } from 'react';

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // Добавлено состояние для email

    // Загрузка состояния при монтировании
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username') || '';
        const storedPassword = localStorage.getItem('password') || '';
        const storedEmail = localStorage.getItem('email') || ''; // Получаем email из localStorage

        setIsLoggedIn(storedIsLoggedIn);
        setUsername(storedUsername);
        setPassword(storedPassword);
        setEmail(storedEmail); // Устанавливаем email
    }, []);

    const login = useCallback((user, pass, email) => { // Добавлено email в параметры
        setIsLoggedIn(true);
        setUsername(user);
        setPassword(pass);
        setEmail(email); // Устанавливаем email
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user);
        localStorage.setItem('password', pass);
        localStorage.setItem('email', email); // Сохраняем email в localStorage
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setEmail(''); // Очищаем email
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('email'); // Удаляем email из localStorage
    }, []);

    return { isLoggedIn, login, logout, username, password, email }; // Возвращаем email
};

export default useLoginState;
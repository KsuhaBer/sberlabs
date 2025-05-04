import { useState, useEffect, useCallback } from 'react';

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedLoginState = localStorage.getItem('isLoggedIn');
        return savedLoginState === 'true';
    });

    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || '';
    });

    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });

    const [password, setPassword] = useState(() => {
        return localStorage.getItem('password') || '';
    });

    
    const login = useCallback((user, pass, role) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setUsername(user);
        setPassword(pass);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', user);
        localStorage.setItem('password', pass);
    }, []);
    

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserRole('');
        setUsername('');
        setPassword('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }, []);

    return { isLoggedIn, login, logout, userRole, username, password };
};

export default useLoginState;
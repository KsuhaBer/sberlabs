import { useState, useEffect } from 'react';

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
       
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return { isLoggedIn, login, logout };
};

export default useLoginState;

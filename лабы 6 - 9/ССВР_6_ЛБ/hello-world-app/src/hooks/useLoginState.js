// hooks/useLoginState.js
import { useState, useCallback } from 'react';

const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const login = useCallback(() => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    }, []);
    
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
    }, []);
    
    return { isLoggedIn, login, logout };
    };
    
export default useLoginState;
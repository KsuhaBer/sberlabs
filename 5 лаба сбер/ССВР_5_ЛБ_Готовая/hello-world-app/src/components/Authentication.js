import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Authentication = ({ onLogin }) => {
const { register, handleSubmit } = useForm();

const onSubmit = useCallback((data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === data.username && user.password === data.password);
    if (data.username === 'admin' && data.password === 'admin') {
        onLogin();
    } else if (user) {
        onLogin();
    } else {
        alert('Неверные учетные данные');
    }
}, [onLogin]);

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} placeholder="Username" required />
        <input {...register('password')} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
);
};

export default Authentication;
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Authentication = ({ onLogin }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (response.ok) {
            alert('Вход выполнен успешно!');
            onLogin();
        } else {
            alert('Неверные учетные данные. Попробуйте еще раз.');
        }
    }, [onLogin]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Имя пользователя" required />
            <input {...register('password')} type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Authentication;

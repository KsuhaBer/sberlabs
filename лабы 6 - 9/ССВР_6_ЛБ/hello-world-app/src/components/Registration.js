import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Registration = ({ onRegister }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (response.ok) {
            alert('Пользователь зарегистрирован!');
            onRegister();
        } else {
            alert('Ошибка регистрации. Попробуйте еще раз.');
        }
    }, [onRegister]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Имя пользователя" required />
            <input {...register('password')} type="password" placeholder="Пароль" required />
            <button type="submit">Зарегистрироваться</button>
            </form>
    );
};

export default Registration;

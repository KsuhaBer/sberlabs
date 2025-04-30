import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const Registration = ({ onRegister }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = useCallback((data) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Пользователь зарегистрирован!');
        onRegister();
    }, [onRegister]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Username" required />
            <input {...register('password')} type="password" placeholder="Password" required />
            <input 
                {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: 'неверный фомат почты'
                    }
                })} 
                placeholder="Email" 
                required 
            />
            {errors.email && <span>{errors.email.message}</span>}
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;
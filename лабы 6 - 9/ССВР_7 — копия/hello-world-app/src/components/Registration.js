import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container } from '@mui/material';

const Registration = ({ onRegister }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: data.username, 
                password: data.password,
                email: data.email // Передаем email
            }),
        });

        if (response.ok) {
            alert('Пользователь зарегистрирован!');
            onRegister(data.username, data.password); // Вызываем onRegister
            // Удаляем вызов onLogin
        } else {
            const errorMessage = await response.text();
            alert(`Ошибка регистрации: ${errorMessage}`);
        }
    }, [onRegister]);

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('username', { required: true })}
                    label="Имя пользователя"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register('email', { required: true })}
                    label="Электронная почта"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    {...register('password', { required: true })}
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Container>
    );
};

export default Registration;

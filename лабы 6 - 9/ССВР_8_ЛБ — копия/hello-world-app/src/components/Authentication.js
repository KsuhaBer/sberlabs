import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

const Authentication = ({ onLogin }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Вход выполнен успешно! Ваша роль: ${result.role}`);
            onLogin(data.username, data.password, result.role);
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    }, [onLogin]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField {...register('username')} label="Имя пользователя" required />
            <TextField {...register('password')} label="Пароль" type="password" required />
            <Button variant="contained" type="submit">Войти</Button>
        </Box>
    );
};

export default Authentication;
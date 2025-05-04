import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

const Authentication = ({ onLogin }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = useCallback(async (data) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if (response.ok) {
                alert('Вход выполнен успешно!');
                onLogin(data.username, data.password); // Передаем логин и пароль
            } else {
                alert(result.message || 'Неверные учетные данные');
            }
        } catch (error) {
            alert('Ошибка сети: ' + error.message);
        }
    }, [onLogin]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <TextField
                {...register('username', { required: true })}
                label="Имя пользователя"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                {...register('password', { required: true })}
                type="password"
                label="Пароль"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
                Войти
            </Button>
        </Box>
    );
};

export default Authentication;
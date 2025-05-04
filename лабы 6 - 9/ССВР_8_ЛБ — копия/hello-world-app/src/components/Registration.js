import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Registration = ({ onRegister }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const role = watch('role');

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Регистрация успешна!');
            // Automatically log in the user after registration
            const loginResponse = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: data.username, password: data.password }),
            });

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                onRegister(data.username, data.password, loginData.role); // Pass role to onRegister
            } else {
                const errorMessage = await loginResponse.text();
                alert(errorMessage);
            }
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    }, [onRegister]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Регистрация</Typography>
            <TextField 
                {...register('username', { required: 'Имя пользователя обязательно' })} 
                label="Имя пользователя" 
                error={!!errors.username} 
                helperText={errors.username ? errors.username.message : ''}
                required 
            />
            <TextField 
                {...register('password', { required: 'Пароль обязателен' })} 
                label="Пароль" 
                type="password" 
                error={!!errors.password} 
                helperText={errors.password ? errors.password.message : ''}
                required 
            />
            <TextField 
                {...register('email', { 
                    required: 'Электронная почта обязательна', 
                    pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат электронной почты' }
                })} 
                label="Электронная почта" 
                error={!!errors.email} 
                helperText={errors.email ? errors.email.message : ''}
                required 
            />
            <FormControl required>
                <InputLabel>Роль</InputLabel>
                <Select {...register('role', { required: 'Выберите роль' })} error={!!errors.role}>
                    <MenuItem value="user">Пользователь</MenuItem>
                    <MenuItem value="admin">Администратор</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" type="submit">Зарегистрироваться</Button>
        </Box>
    );
};

export default Registration;
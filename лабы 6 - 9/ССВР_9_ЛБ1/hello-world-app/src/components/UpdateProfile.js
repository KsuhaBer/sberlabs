import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';

const UpdateProfile = ({ currentUser, onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: currentUser.username,
            currentPassword: '',
            newPassword: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/updateProfile', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    username: data.username,
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                }),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Ошибка обновления профиля');
            }

            alert('Профиль успешно обновлен!');
            onUpdate();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            maxWidth: 400, 
            margin: 'auto', 
            padding: 2 
        }}>
            <Typography variant="h5" gutterBottom>Обновление профиля</Typography>
            
            <TextField 
                {...register('username')}
                label="Имя пользователя"
                disabled
                fullWidth
            />
            
            <TextField 
                {...register('currentPassword', { required: 'Текущий пароль обязателен' })}
                label="Текущий пароль"
                type="password"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                fullWidth
                required
            />
            
            <TextField 
                {...register('newPassword', { 
                    required: 'Новый пароль обязателен',
                    minLength: {
                        value: 6,
                        message: 'Пароль должен быть не менее 6 символов'
                    }
                })}
                label="Новый пароль"
                type="password"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                fullWidth
                required
            />

            <Button 
                variant="contained" 
                type="submit"
                sx={{ mt: 2 }}
            >
                Обновить профиль
            </Button>
        </Box>
    );
};

export default UpdateProfile;
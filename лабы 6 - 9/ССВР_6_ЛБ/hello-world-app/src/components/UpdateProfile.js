import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const UpdateProfile = ({ onUpdate }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/updateProfile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: data.username, password: data.password }),
        });

        if (response.ok) {
            alert('Данные пользователя обновлены!');
            onUpdate(); // Вызываем функцию onUpdate после успешного обновления
        } else {
            const errorMessage = await response.text();
            alert(`Ошибка обновления данных: ${errorMessage}`);
        }
    }, [onUpdate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                    {...register('username', { required: true })} 
                    placeholder="Новое имя пользователя" 
                />
                {errors.username && <span>Это поле обязательно для заполнения</span>}
            </div>
            <div>
                <input 
                    {...register('password', { required: true })} 
                    type="password" 
                    placeholder="Новый пароль" 
                />
                {errors.password && <span>Это поле обязательно для заполнения</span>}
            </div>
            <button type="submit">Обновить профиль</button>
        </form>
    );
};

export default UpdateProfile;

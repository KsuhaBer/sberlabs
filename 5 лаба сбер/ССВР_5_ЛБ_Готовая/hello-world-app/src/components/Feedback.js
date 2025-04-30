// src/components/Feedback.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const Feedback = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.feedback.reviews); // Получаем отзывы из Redux store

    const onSubmit = (data) => {
        dispatch({ type: 'ADD_FEEDBACK', payload: data.feedback }); // Диспатчим действие для добавления отзыва
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('feedback')} placeholder="Ваш отзыв" required />
                <button type="submit" style={{ marginLeft: '20px'}}>Отправить отзыв</button>
            </form>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
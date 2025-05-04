import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, removeFeedback, setFeedbacks, updateFeedback } from '../store/feedbackSlice'; 

const Feedback = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.feedback);


    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:3001/feedback');
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setFeedbacks(data)); 
                } else {
                    console.error('Ошибка загрузки отзывов:', response.statusText);
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        fetchFeedbacks();
    }, [dispatch]);

    const onSubmit = useCallback(async (data) => {
        const response = await fetch('http://localhost:3001/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback: data.feedback }),
        });

        if (response.ok) {
            dispatch(addFeedback(data.feedback));
        }
    }, [dispatch]);

    const handleDelete = async (index) => {
        await fetch(`http://localhost:3001/feedback/${index}`, {
            method: 'DELETE',
        });
        dispatch(removeFeedback(index));
    };

    const handleUpdate = async (index, newFeedback) => {
        await fetch(`http://localhost:3001/feedback/${index}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback: newFeedback }),
        });
        dispatch(updateFeedback({ index, feedback: newFeedback }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('feedback')} placeholder="Ваш отзыв" required />
                <button type="submit" style={{ marginLeft: '20px'}}>Отправить отзыв</button>
            </form>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        {review}
                        <button onClick={() => handleDelete(index)}>Удалить</button>
                        <button onClick={() => handleUpdate(index, prompt('Введите новый отзыв:', review))}>Редактировать</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Feedback;
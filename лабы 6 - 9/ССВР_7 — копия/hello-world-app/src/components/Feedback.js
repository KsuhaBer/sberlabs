import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, removeFeedback, setFeedbacks, updateFeedback } from '../store/feedbackSlice'; 
import { Box, Button, TextField, Typography } from '@mui/material';

const Feedback = () => {
    const { register, handleSubmit, reset } = useForm();
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
            reset(); // Сброс формы после успешной отправки
        }
    }, [dispatch, reset]);

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
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5">Отзыв</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    {...register('feedback')} 
                    placeholder="Ваш отзыв" 
                    required 
                    fullWidth 
                    multiline 
                    rows={4} 
                    variant="outlined" 
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Отправить отзыв
                </Button>
            </form>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {reviews.map((review, index) => (
                    <li key={index} style={{ margin: '10px 0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {review}
                            </Typography>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={() => handleDelete(index)} 
                                sx={{ marginLeft: 1 }}
                            >
                                Удалить
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => handleUpdate(index, prompt('Введите новый отзыв:', review))} 
                                sx={{ marginLeft: 1 }}
                            >
                                Редактировать
                            </Button>
                        </Box>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default Feedback;
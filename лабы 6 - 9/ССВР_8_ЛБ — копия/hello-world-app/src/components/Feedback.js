import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedbacks } from '../store/feedbackSlice';
import { Box, Typography } from '@mui/material';

const Feedback = () => {
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Отзывы наших пользователей</Typography>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {reviews.map((review, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            <Typography variant="body1">{review}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Feedback;
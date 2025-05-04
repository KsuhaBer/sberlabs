import React from 'react';
import { useGetFeedbacksQuery } from '../api/feedbackApi';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Container
} from '@mui/material';

const Feedback = () => {
  // Используем хук для получения данных о отзывах
  const {
    data: feedbacks = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetFeedbacksQuery();

  // Отображение спиннера загрузки
  if (isLoading || isFetching) {
    return (
      <Container sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px'
      }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  // Обработка ошибок
  if (isError) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Ошибка загрузки отзывов: {error.message}
        </Alert>
      </Container>
    );
  }

  // Отображение списка отзывов
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Отзывы наших пользователей
      </Typography>
      
      {feedbacks.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {feedbacks.map((feedback) => (
            <ListItem key={feedback.id} alignItems="flex-start">
              <ListItemText
                primary={feedback.message}
                secondary={`Автор: ${feedback.username}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Отзывов пока нет</Typography>
      )}
    </Container>
  );
};

export default Feedback;

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
} from '../api/feedbackApi';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import UserList from './UserList';

const Admin = ({ username }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    data: feedbacks = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetFeedbacksQuery();
  const [addFeedback, { isLoading: isAdding }] = useAddFeedbackMutation();
  const [deleteFeedback, { isLoading: isDeleting }] = useDeleteFeedbackMutation();
  const [updateFeedback, { isLoading: isUpdating }] = useUpdateFeedbackMutation();

  const onSubmit = async (data) => {
    try {
      await addFeedback({ 
        feedback: data.feedback, 
        username: username
      }).unwrap();
      reset();
    } catch (err) {
      console.error('Failed to add feedback:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
    } catch (err) {
      console.error('Failed to delete feedback:', err);
    }
  };

  const handleUpdate = async (id, currentFeedback) => {
    const newFeedback = prompt('Введите новый отзыв:', currentFeedback);
    if (newFeedback && newFeedback !== currentFeedback) {
      try {
        await updateFeedback({ id, feedback: newFeedback }).unwrap();
      } catch (err) {
        console.error('Failed to update feedback:', err);
      }
    }
  };

  // Общий статус загрузки
  const isProcessing = isLoading || isFetching || isAdding || isDeleting || isUpdating;

  if (isProcessing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка загрузки данных: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Панель администратора</Typography>
      <Typography variant="subtitle1">Вы вошли как: {username}</Typography>
      
      <UserList />
      
      <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Добавить отзыв</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('feedback')}
          placeholder="Введите отзыв"
          required
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          disabled={isAdding}
        >
          {isAdding ? <CircularProgress size={24} /> : 'Добавить отзыв'}
        </Button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {feedbacks.map((feedback) => (
          <li key={feedback.id} style={{ margin: '10px 0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {feedback.message} (Автор: {feedback.username})
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(feedback.id)}
                sx={{ marginLeft: 1 }}
                disabled={isDeleting}
              >
                {isDeleting ? <CircularProgress size={24} /> : 'Удалить'}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(feedback.id, feedback.message)}
                sx={{ marginLeft: 1 }}
                disabled={isUpdating}
              >
                {isUpdating ? <CircularProgress size={24} /> : 'Редактировать'}
              </Button>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Admin;
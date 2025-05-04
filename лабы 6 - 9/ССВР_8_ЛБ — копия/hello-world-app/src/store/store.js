// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import counterReducer from './reducers/counterReducer';
import feedbackSlice from './feedbackSlice'; // Предполагаем, что вы переместили feedbackSlice в отдельный файл

// Создаем Redux store с объединенными редюсерами
const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    feedback: feedbackSlice.reducer,
  },
});

export default store;
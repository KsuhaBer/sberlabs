// src/store/store.js
import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import counterReducer from './reducers/counterReducer';
import feedbackReducer from './reducers/feedbackReducer'; // Импортируем редьюсер для отзывов

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  feedback: feedbackReducer, // Добавляем редьюсер для отзывов
});

// Создаем Redux store
const store = createStore(rootReducer);

export default store;

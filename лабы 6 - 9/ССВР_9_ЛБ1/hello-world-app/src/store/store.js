// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import counterReducer from './reducers/counterReducer';
import { feedbackApi } from '../api/feedbackApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbackApi.middleware),
});

export default store;
import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: [],
  reducers: {
    setFeedbacks: (state, action) => action.payload,
    addFeedback: (state, action) => {
      state.push(action.payload);
    },
    removeFeedback: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateFeedback: (state, action) => {
      state[action.payload.index] = action.payload.feedback;
    },
  },
});

export const { setFeedbacks, addFeedback, removeFeedback, updateFeedback } = feedbackSlice.actions;

export default feedbackSlice;
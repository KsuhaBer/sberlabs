// src/reducers/feedbackReducer.js
const initialState = {
    reviews: JSON.parse(localStorage.getItem('reviews')) || [],
};

const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FEEDBACK':
            const updatedReviews = [...state.reviews, action.payload];
            localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Сохраняем отзывы в localStorage
            return { ...state, reviews: updatedReviews };
        default:
            return state;
    }
};

export default feedbackReducer;

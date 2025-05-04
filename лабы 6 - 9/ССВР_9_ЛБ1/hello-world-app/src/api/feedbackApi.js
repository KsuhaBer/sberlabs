import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Кастомный baseQuery с задержкой
const delayedFetchBaseQuery = async (args, api, extraOptions) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Фиксированная задержка 2 секунды
  return fetchBaseQuery({ baseUrl: 'http://localhost:3001/' })(args, api, extraOptions);
};

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: delayedFetchBaseQuery,
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedback',
      providesTags: ['Feedback'],
      transformResponse: (response) => 
        Array.isArray(response) 
          ? response.map((item, index) => ({
              id: item.id || index,
              message: item.feedback || item.message || item.text,
              username: item.username || 'Аноним'
            }))
          : []
    }),
    addFeedback: builder.mutation({
      query: ({ feedback, username }) => ({
        url: 'feedback',
        method: 'POST',
        body: { feedback, username },
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `feedback/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
    updateFeedback: builder.mutation({
      query: ({ id, feedback }) => ({
        url: `feedback/${id}`,
        method: 'PUT',
        body: { feedback },
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
  useUpdateFeedbackMutation,
} = feedbackApi;
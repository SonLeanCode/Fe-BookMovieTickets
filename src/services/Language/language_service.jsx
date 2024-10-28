import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => localStorage.getItem('accessToken');

export const apiLanguage = createApi({
  reducerPath: 'languageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/',
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      console.log('Token từ localStorage:', token); // Log token để kiểm tra
      if (!token) {
        console.error('Access token không tồn tại trong localStorage.');
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('x-access-token', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    putLanguage: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/api/user/settings/${id}`,
        method: 'PUT',
        body: credentials,
      }),
    }),
  }),
});

export const { usePutLanguageMutation } = apiLanguage;

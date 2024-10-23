import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => localStorage.getItem('accessToken');

export const apiComents = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4003/', // Địa chỉ API của bạn
        prepareHeaders: (headers) => {
          // Lấy token từ localStorage
          const token = getAccessToken();
          // Nếu có token, thêm vào header Authorization
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            console.log('Authorization header set:', `Bearer ${token}`);
          }
          return headers;
        },
      }),

      endpoints: (builder) => ({
        // Endpoint để login
        postComments: builder.mutation({
          query: (credentials) => ({
            url: '/api/comment',
            method: 'POST',
            body: credentials,
          }),
        }),
        getComments: builder.query({
            query: () => '/api/comment',
        })
    }),
      
})
export const  { useGetCommentsQuery,usePostCommentsMutation} = apiComents
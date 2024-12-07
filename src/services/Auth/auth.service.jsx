import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Tạo API với Redux Toolkit Query
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4003/", // Địa chỉ API của bạn
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage
      const token = getAccessToken();
      // Nếu có token, thêm vào header Authorization
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Authorization header set:", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Endpoint để login  //
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Endpoint để register //
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Endpoint để đăng nhập bằng Google //
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/google",
        method: "POST",
        body: credentials,
      }),
    }),

    //
    facebookLogin: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/facebook",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: builder.query({
      query: (userId) => `/api/user/${userId}`, //
    }),
    patchUser: builder.mutation({
      query: ({ userId, email }) => ({
        url: `/api/user/${userId}`, //
        method: "PATCH",
        body: { email },
      }),
    }),
    patchProfile: builder.mutation({
      query: ({ userId, email, currentPassword, newPassword }) => ({
        url: `/api/changePassword/${userId}`, //
        method: "PATCH",
        body: { email, currentPassword, newPassword },
      }),
    }),
    uploadAvatar: builder.mutation({
      query: ({ userId, selectedFile }) => {
        const formData = new FormData();
        formData.append("avatar", selectedFile);

        return {
          url: `/api/upload-avatar/${userId}`, //
          method: "PATCH",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation, //
  useRegisterMutation,//
  useGoogleLoginMutation, //
  useFacebookLoginMutation,//
  useGetUserQuery, //
  usePatchUserMutation,//
  usePatchProfileMutation,//
  useUploadAvatarMutation,//
} = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token); // Giải mã token
    const currentTime = Date.now() / 1000; // Thời gian hiện tại (tính bằng giây)

    // Kiểm tra thời gian hết hạn
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Nếu có lỗi khi giải mã, coi token đã hết hạn
  }
};

// Đăng xuất và xóa token
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  // Bạn có thể thêm điều hướng về trang đăng nhập nếu cần
  window.location.href = "/"; // Hoặc sử dụng React Router: navigate('/login');
};


export const fetchBaseUrl = fetchBaseQuery({
  baseUrl: "http://be-cyberscreen.shop/", // Địa chỉ API của bạn
  prepareHeaders: (headers) => {
    const token = getAccessToken();

    // Nếu token hết hạn, thực hiện đăng xuất
    if (token && isTokenExpired(token)) {
      logout();
      return headers; // Không cần thêm Authorization header nữa
    }

    // Nếu có token hợp lệ, thêm vào header Authorization
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Tạo API với Redux Toolkit Query
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseUrl,
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

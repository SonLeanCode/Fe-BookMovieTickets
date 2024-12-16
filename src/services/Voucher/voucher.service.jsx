import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Tạo API với Redux Toolkit Query
export const voucherApi = createApi({
  reducerPath: 'voucherApi',
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({

    getVoucher: builder.query({
      query: () => '/api/voucher/',
      method: 'GET',    
    }),
    getVoucherUser: builder.query({
      query: (id) => `/api/codeVoucherUser/${id}`,
      method: 'GET',
    }),
    createVoucher: builder.mutation({
      query: (dataVoucherUser) => ({
        url: `/api/codeVoucherUser`,
        method: "POST",
        body: { ...dataVoucherUser },
      }),
    }),
    deleteVoucher: builder.mutation({
      query: (id) => ({
        url: `/api/codeVoucherUser/${id}`,
        method: 'DELETE',
      }),
    }),


  }),
});

// Xuất các hook để sử dụng trong component
export const {
  useGetVoucherQuery, //
  useGetVoucherUserQuery, //
  useCreateVoucherMutation, //
  useDeleteVoucherMutation //

} = voucherApi;

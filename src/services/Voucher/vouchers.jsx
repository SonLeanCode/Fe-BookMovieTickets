import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from '../Auth/auth.service';

// Tạo API với Redux Toolkit Query
export const vouchersApi = createApi({
    reducerPath: 'vouchersApi',
    baseQuery: fetchBaseUrl,
    endpoints: (builder) => ({
      // Lấy danh sách voucher
      findCodeVoucher: builder.query({
        query: () => '/api/voucher',
      }),
  
      // Tạo mới voucher
     addVoucher: builder.mutation({
      query: (newVoucherData) => ({
        url: "/api/voucher",
        method: "POST",
        body: newVoucherData,
      }),
    }),
  
      // Xóa voucher theo ID
      deleteVoucher: builder.mutation({
        query: (id) => ({
          url: `/api/voucher/${id}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
  
  export const {
    useFindCodeVoucherQuery,
    useAddVoucherMutation,
    useDeleteVoucherMutation,
  } = vouchersApi;

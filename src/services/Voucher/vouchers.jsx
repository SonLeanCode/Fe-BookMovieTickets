import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from '../Auth/auth.service';

// Tạo API với Redux Toolkit Query
export const vouchersApi = createApi({
    reducerPath: 'voucherApi',
    baseQuery: fetchBaseUrl,
    endpoints: (builder) => ({
      // Lấy danh sách voucher
      findCodeVoucher: builder.query({
        query: () => '/api/voucher',
      }),
  
      // Tạo mới voucher
      createVoucher: builder.mutation({
        query: (dataVoucher) => ({
          url: '/api/voucher',
          method: 'POST',
          body: { ...dataVoucher },
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
    useCreateVoucherMutation,
    useDeleteVoucherMutation,
  } = vouchersApi;

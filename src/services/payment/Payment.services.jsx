import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

// Tạo API với Redux Toolkit Query
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    // Endpoint để thanh toán MoMo
    paymentMomo: builder.mutation({
      query: (credentials) => ({
        url: "/api/payment/momo",
        method: "POST",
        body: credentials,
      }),
    }),
    // Endpoint để tạo thông tin thanh toán
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/api/payment",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { 
  usePaymentMomoMutation, //
   useCreatePaymentMutation //
   } = paymentApi;

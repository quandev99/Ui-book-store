import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiPayment = createApi({
  reducerPath: 'payment',
  tagTypes: ['Payments'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: `/payments/create_payment_url`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Payments']
    })
  })
})

export const { useCreatePaymentMutation } = apiPayment

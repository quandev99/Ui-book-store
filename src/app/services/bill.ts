import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
import { ApiResponse, dataAddToCart } from '~/interfaces/Cart'
export const apiBill = createApi({
  reducerPath: 'bill',
  tagTypes: ['Bills'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAll: builder.query<any, void>({
      query: () => ({
        url: `/bills`,
        method: 'GET'
      }),
      providesTags: ['Bills']
    }),
    getBillByUser: builder.query<any, void>({
      query: (_id) => ({
        url: `/bills/getById/${_id}`,
        method: 'GET'
      }),
      providesTags: ['Bills']
    }),
    addBill: builder.mutation<ApiResponse, { data: dataAddToCart }>({
      query: ({ data }) => ({
        url: `/bills/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Bills']
    }),
    updateCartItem: builder.mutation<any, void>({
      query: (dataUpdate) => ({
        url: `/carts/update`,
        method: 'PATCH',
        body: dataUpdate
      }),
      invalidatesTags: ['Bills']
    })
  })
})

export const { useAddBillMutation } = apiBill

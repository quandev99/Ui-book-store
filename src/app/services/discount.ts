import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
import { ApiResponse, dataAddToCart } from '~/interfaces/Cart'
export const apiDiscount = createApi({
  reducerPath: 'discount',
  tagTypes: ['Discounts'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createDiscount: builder.mutation<ApiResponse, { data: dataAddToCart }>({
      query: ({ data }) => ({
        url: `/discounts/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Discounts']
    }),
    applyDiscountToCart: builder.mutation<ApiResponse, { data: dataAddToCart }>({
      query: (data) => ({
        url: `/discounts/apply`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Discounts']
    }),
    getDiscountByUser: builder.query<any, void>({
      query: () => ({
        url: `/discounts/byUser`,
        method: 'GET'
      }),
      providesTags: ['Discounts']
    }),
    getAllDiscounts: builder.query<any, void>({
      query: () => ({
        url: `/discounts`,
        method: 'GET'
      }),
      providesTags: ['Discounts']
    }),

    updateDiscount: builder.mutation<any, any>({
      query: ({ id, ...dataUpdate }) => ({
        url: `/discounts/${id}/update`,
        method: 'PATCH',
        body: dataUpdate
      }),
      invalidatesTags: ['Discounts']
    }),
    removeDiscount: builder.mutation<any, void>({
      query: (id) => ({
        url: `/discounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Discounts']
    })
  })
})

export const {
  useGetAllDiscountsQuery,
  useGetDiscountByUserQuery,
  useApplyDiscountToCartMutation,
  useRemoveDiscountMutation
} = apiDiscount

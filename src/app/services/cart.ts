import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
import { ApiResponse, dataAddToCart } from '~/interfaces/Cart'
export const apiCart = createApi({
  reducerPath: 'cart',
  tagTypes: ['Carts'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCartByUser: builder.query<any, void>({
      query: (_id) => ({
        url: `/carts/getCartByUser/${_id}`,
        method: 'GET'
      }),
      providesTags: ['Carts']
    }),
    addToCart: builder.mutation<ApiResponse, { data: dataAddToCart }>({
      query: ({ data }) => ({
        url: `/carts/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    addCheckedProduct: builder.mutation<ApiResponse, any>({
      query: ({ data }) => ({
        url: `/carts/addCheckedProduct`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    removeCartItem: builder.mutation<any, void>({
      query: (cartItem) => {
        return {
          url: `/carts/remove`,
          method: 'PATCH',
          body: cartItem
        }
      },
      invalidatesTags: ['Carts']
    }),
    UpdateCartItem: builder.query<any, void>({
      query: (dataUpdate) => ({
        url: `/carts/update`,
        method: 'PATCH',
        body: dataUpdate
      }),
      providesTags: ['Carts']
    }),
    deleteAllCartByUser: builder.query<any, void>({
      query: (_id) => ({
        url: `/carts/deleteAll/${_id}`,
        method: 'PATCH'
      }),
      providesTags: ['Carts']
    })
  })
})

export const { useGetCartByUserQuery, useAddToCartMutation, useAddCheckedProductMutation } = apiCart

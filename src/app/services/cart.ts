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
        url: `/carts/getCartByUser/${_id}/getCartByUser`,
        method: 'GET'
      }),
      providesTags: ['Carts']
    }),
    getCartByUserChecked: builder.query<any, void>({
      query: (_id) => ({
        url: `/carts/getCartByUserChecked/${_id}`,
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
      query: (data) => ({
        url: `/carts/addCheckedProduct`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    addCheckedAllProduct: builder.mutation<ApiResponse, any>({
      query: (data) => ({
        url: `/carts/addCheckedAllProduct`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    updateCartItem: builder.mutation<any, void>({
      query: (dataUpdate) => ({
        url: `/carts/update`,
        method: 'PATCH',
        body: dataUpdate
      }),
      invalidatesTags: ['Carts']
    }),
    removeCartItem: builder.mutation<any, void>({
      query: (data) => ({
        url: `/carts/remove`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    increaseQuantity: builder.mutation<any, void>({
      query: (data) => ({
        url: `/carts/increase`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    decreaseQuantity: builder.mutation<any, void>({
      query: (data) => ({
        url: `/carts/decrease`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    }),
    deleteAllCart: builder.mutation<any, void>({
      query: (data) => ({
        url: `/carts/deleteAllCart`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Carts']
    })
  })
})

export const {
  useGetCartByUserQuery,
  useGetCartByUserCheckedQuery,
  useAddToCartMutation,
  useAddCheckedProductMutation,
  useAddCheckedAllProductMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useDeleteAllCartMutation
} = apiCart


import {  createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryConfig } from './apiConfig'

export const apiProduct = createApi({
  reducerPath: 'product',
  tagTypes: ['Products'],
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: () => ({
        url: '/products',
        method: 'GET'
      }),
      providesTags: ['Products']
    }),
    getAllProductsByClient: builder.query<any, void>({
      query: (url) => ({
        url: '/products' + url,
        method: 'GET'
      }),
      providesTags: ['Products']
    }),
    getProductById: builder.query<any, void>({
      query: (_id) => ({
        url: `/products/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Products']
    }),
    getProductByCate: builder.query<any, void>({
      query: (category) => ({
        url: `/products/${category}/getByCate`,
        method: 'GET'
      }),
      providesTags: ['Products']
    }),
    getAllDeletedProducts: builder.query<any, void>({
      query: () => ({
        url: '/products/trash',
        method: 'GET'
      }),
      providesTags: ['Products']
    }),
    createProduct: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/products/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/products/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/products/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    }),
    restoreProduct: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/products/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Products']
    }),
    forceProduct: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/products/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Products']
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetAllProductsByClientQuery,
  useGetProductByCateQuery,
  useForceProductMutation,
  useRestoreProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetAllDeletedProductsQuery,
  useGetProductByIdQuery
} = apiProduct
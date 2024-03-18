import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiClient = createApi({
  reducerPath: 'client',
  tagTypes: ['Clients'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProductsClient: builder.query<any, void>({
      query: (url) => ({
        url: `/clients/product${url}`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    }),
  
    getCategoriesClient: builder.query<any, void>({
      query: () => ({
        url: `/clients/categories`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    }),
    getAllGenresClient: builder.query<any, void>({
      query: () => ({
        url: `/clients/genres`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    }),
    getAllAuthorsClient: builder.query<any, void>({
      query: () => ({
        url: `/clients/authors`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    }),
    getAllPublishersClient: builder.query<any, void>({
      query: () => ({
        url: `/clients/publishers`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    }),
    getAllSuppliersClient: builder.query<any, void>({
      query: () => ({
        url: `/clients/suppliers`,
        method: 'GET'
      }),
      providesTags: ['Clients']
    })
  })
})

export const {
  useGetProductsClientQuery,
  useGetCategoriesClientQuery,
  useGetAllGenresClientQuery,
  useGetAllAuthorsClientQuery,
  useGetAllPublishersClientQuery,
  useGetAllSuppliersClientQuery
} = apiClient


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const apiProduct = createApi({
  reducerPath: 'product',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:2605/api'
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = (getState() as RootState).auth.token
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }
    //   return headers
    // }
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, void>({
      query: () => ({
        url: '/products',
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
  useForceProductMutation,
  useRestoreProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetAllDeletedProductsQuery,
  useGetProductByIdQuery
} = apiProduct
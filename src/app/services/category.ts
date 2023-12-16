import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'


export const apiCategory = createApi({
  reducerPath: 'category',
  tagTypes: ['Categories'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, void>({
      query: () => ({
        url: '/category',
        method: 'GET'
      }),
      providesTags: ['Categories']
    }),
    getCategoryById: builder.query<any, void>({
      query: (_id) => ({
        url: `/category/${_id}/categoryById`,
        method: 'GET'
      }),
      providesTags: ['Categories']
    }),
    getAllDeletedCategories: builder.query<any, void>({
      query: () => ({
        url: '/category/trash',
        method: 'GET'
      }),
      providesTags: ['Categories']
    }),
    createCategory: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/category/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Categories']
    }),
    updateCategory: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/category/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Categories']
    }),
    deleteCategory: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/category/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    }),
    restoreCategory: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/category/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Categories']
    }),
    forceCategory: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/category/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Categories']
    })
  })
})

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,useUpdateCategoryMutation,
  useGetAllDeletedCategoriesQuery,
  useDeleteCategoryMutation,
  useRestoreCategoryMutation,
  useForceCategoryMutation
} = apiCategory
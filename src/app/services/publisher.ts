
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryConfig } from './apiConfig'


export const apiPublisher = createApi({
  reducerPath: 'publisher',
  tagTypes: ['Publishers'],
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getAllPublishers: builder.query<any, void>({
      query: () => ({
        url: '/publishers',
        method: 'GET'
      }),
      providesTags: ['Publishers']
    }),
    getPublisherById: builder.query<any, void>({
      query: (_id) => ({
        url: `/publishers/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Publishers']
    }),
    getAllDeletedPublishers: builder.query<any, void>({
      query: () => ({
        url: '/publishers/trash',
        method: 'GET'
      }),
      providesTags: ['Publishers']
    }),
    createPublisher: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/publishers/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Publishers']
    }),
    updatePublisher: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/publishers/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Publishers']
    }),
    deletePublisher: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/publishers/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Publishers']
    }),
    restorePublisher: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/publishers/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Publishers']
    }),
    forcePublisher: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/publishers/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Publishers']
    })
  })
})

export const {
  useCreatePublisherMutation,
  useGetAllPublishersQuery,
  useGetAllDeletedPublishersQuery,
  useGetPublisherByIdQuery,useUpdatePublisherMutation,
  useDeletePublisherMutation,
  useRestorePublisherMutation,
  useForcePublisherMutation
} = apiPublisher
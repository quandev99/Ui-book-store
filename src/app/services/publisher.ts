
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const apiPublisher = createApi({
  reducerPath: 'publisher',
  tagTypes: ['Publishers'],
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
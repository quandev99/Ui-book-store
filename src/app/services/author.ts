
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const apiAuthor = createApi({
  reducerPath: 'author',
  tagTypes: ['Authors'],
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
    getAllAuthors: builder.query<any, void>({
      query: () => ({
        url: '/authors',
        method: 'GET'
      }),
      providesTags: ['Authors']
    }),
    getAuthorById: builder.query<any, void>({
      query: (_id) => ({
        url: `/authors/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Authors']
    }),
    getAllDeletedAuthors: builder.query<any, void>({
      query: () => ({
        url: '/authors/trash',
        method: 'GET'
      }),
      providesTags: ['Authors']
    }),
    createAuthor: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/authors/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Authors']
    }),
    updateAuthor: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/authors/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Authors']
    }),
    deleteAuthor: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/authors/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Authors']
    }),
    restoreAuthor: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/authors/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Authors']
    }),
    forceAuthor: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/authors/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Authors']
    })
  })
})

export const {
  useCreateAuthorMutation,
  useGetAllAuthorsQuery,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAllDeletedAuthorsQuery,
  useRestoreAuthorMutation,
  useForceAuthorMutation
} = apiAuthor
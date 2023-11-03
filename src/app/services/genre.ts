
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


export const apiGenre = createApi({
  reducerPath: 'genre',
  tagTypes: ['Genres'],
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
    getAllGenres: builder.query<any, void>({
      query: () => ({
        url: '/genres',
        method: 'GET'
      }),
      providesTags: ['Genres']
    }),
    getGenreById: builder.query<any, void>({
      query: (_id) => ({
        url: `/genres/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Genres']
    }),
    getAllDeletedGenres: builder.query<any, void>({
      query: () => ({
        url: '/genres/trash',
        method: 'GET'
      }),
      providesTags: ['Genres']
    }),
    createGenre: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/genres/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Genres']
    }),
    updateGenre: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/genres/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Genres']
    }),
    deleteGenre: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/genres/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Genres']
    }),
    restoreGenre: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/genres/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Genres']
    }),
    forceGenre: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/genres/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Genres']
    })
  })
})

export const {
  useGetGenreByIdQuery,
  useGetAllGenresQuery,
  useForceGenreMutation,
  useRestoreGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useCreateGenreMutation,
  useGetAllDeletedGenresQuery
} = apiGenre
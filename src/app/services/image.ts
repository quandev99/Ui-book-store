import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
export const apiImage = createApi({
  reducerPath: 'images',
  tagTypes: ['Images'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:2605/api'
  }),
  endpoints: (builder) => ({
    deleteImage: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/images/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Images']
    }),

  })
})

export const { useDeleteImageMutation } = apiImage

import {
  createApi,
} from '@reduxjs/toolkit/dist/query/react'
import { baseQueryConfig } from './apiConfig'
export const apiImage = createApi({
  reducerPath: 'images',
  tagTypes: ['Images'],
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    deleteImage: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/images/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Images']
    })
  })
})

export const { useDeleteImageMutation } = apiImage

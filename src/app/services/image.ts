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
    }),
    createImage: builder.mutation<any, void>({
      query: (file) => ({
        url: `/images/uploads/single`,
        method: 'POST',
        body: file
      }),
      invalidatesTags: ['Images']
    }),
    createImages: builder.mutation<any, void>({
      query: (files) => ({
        url: `/images/uploads`,
        method: 'POST',
        body: files
      }),
      invalidatesTags: ['Images']
    })
  })
})

export const { useDeleteImageMutation, useCreateImageMutation, useCreateImagesMutation } = apiImage

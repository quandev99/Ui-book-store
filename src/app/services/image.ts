import {
  createApi,
} from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
import { IImage } from '~/interfaces/image'
export const apiImage = createApi({
  reducerPath: 'images',
  tagTypes: ['Images'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    deleteImage: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/images/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Images']
    }),
    updateImage: builder.mutation({
      query: (file) => ({
        url: `/images/${file.publicId}`,
        method: 'PUT',
        body: file.formData
      }),
      invalidatesTags: ['Images']
    }),
    createImage: builder.mutation({
      query: (file) => ({
        url: `/images/upload`,
        method: 'POST',
        body: file
      }),
      invalidatesTags: ['Images']
    }),
    createImages: builder.mutation<any, IImage>({
      query: (files) => ({
        url: `/images/uploads`,
        method: 'POST',
        body: files
      }),
      invalidatesTags: ['Images']
    })
  })
})

export const { useDeleteImageMutation, useCreateImageMutation, useCreateImagesMutation, useUpdateImageMutation } = apiImage

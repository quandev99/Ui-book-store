import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiReView = createApi({
  reducerPath: 'review',
  tagTypes: ['ReViews'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllReviews: builder.query<any, any>({
      query: ({ search, page = 1, limit = 5 }) => ({
        url: `/reviews?_search=${search}&_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['ReViews']
    }),
    addReView: builder.mutation<any, any>({
      query: (data) => ({
        url: `/reviews/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['ReViews']
    }),
    getReviewProductId: builder.query<any, any>({
      query: ({ productId, page = 1, limit = 5 }) => ({
        url: `/reviews/${productId}?_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['ReViews']
    })
  })
})

export const { useAddReViewMutation, useGetReviewProductIdQuery } = apiReView

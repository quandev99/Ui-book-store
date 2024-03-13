import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiReview = createApi({
  reducerPath: 'review',
  tagTypes: ['Reviews'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllReviews: builder.query<any, any>({
      query: ({ search = '', page = 1, limit = 10, sort = 'createdAt', order = 'asc' }) => ({
        url: `/reviews?_search=${search}&_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
        method: 'GET'
      }),
      providesTags: ['Reviews']
    }),
    addReView: builder.mutation<any, any>({
      query: (data) => ({
        url: `/reviews/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Reviews']
    }),
    hiddenReview: builder.mutation<any, any>({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Reviews']
    }),
    getReviewProductId: builder.query<any, any>({
      query: ({ productId, page = 1, limit = 5 }) => ({
        url: `/reviews/${productId}?_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['Reviews']
    })
  })
})

export const { useGetAllReviewsQuery, useAddReViewMutation, useHiddenReviewMutation, useGetReviewProductIdQuery } = apiReview

import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiReView = createApi({
  reducerPath: 'review',
  tagTypes: ['ReViews'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addReView: builder.mutation<any, any>({
      query: (data) => ({
        url: `/reviews/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['ReViews']
    })
  })
})

export const { useAddReViewMutation } = apiReView

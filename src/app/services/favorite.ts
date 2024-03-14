import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiFavorite = createApi({
  reducerPath: 'favorite',
  tagTypes: ['Favorites'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFavoriteProductsByUser: builder.query<any, any>({
      query: (userId) => ({
        url: `/favorites/${userId}`,
        method: 'GET'
      }),
      providesTags: ['Favorites']
    }),
    addFavoriteProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `/favorites/addFavoriteProduct`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Favorites']
    })
  })
})

export const { useAddFavoriteProductMutation, useGetFavoriteProductsByUserQuery } = apiFavorite

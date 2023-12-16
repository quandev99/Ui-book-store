import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiAuth = createApi({
  reducerPath: 'auth',
  tagTypes: ['Auths'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllAuths: builder.query<any, void>({
      query: () => ({
        url: '/auths',
        method: 'GET'
      }),
      providesTags: ['Auths']
    }),
    getAuthById: builder.query<any, void>({
      query: (_id) => ({
        url: `/auths/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Auths']
    }),
    login: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/auths/signin`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Auths']
    }),
    logout: builder.mutation<any, void>({
      query: () => {
        return {
          url: `/auths/logout`,
          method: 'POST'
        }
      },
      invalidatesTags: ['Auths']
    }),
    refreshToken: builder.mutation<any, void>({
      query: (body: any) => {
        return {
          url: `/auths/refreshToken`,
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Auths']
    })
  })
})

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = apiAuth


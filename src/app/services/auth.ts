import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryConfig } from './apiConfig'

export const apiAuth = createApi({
  reducerPath: 'auth',
  tagTypes: ['Auths'],
  baseQuery: baseQueryConfig,
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
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/auths/logout`,
          method: 'POST'
        }
      },
      invalidatesTags: ['Auths']
    })
  })
})

export const { useLoginMutation } = apiAuth

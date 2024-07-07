import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiNotificationToken = createApi({
  reducerPath: 'notificationToken',
  tagTypes: ['NotificationTokens'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllNotificationTokens: builder.query<any, any>({
      query: () => ({
        url: `/notifyTokens`,
        method: 'GET'
      }),
      providesTags: ['NotificationTokens']
    }),
    getOneNotificationToken: builder.query<any, any>({
      query: (token) => ({
        url: `/notifyTokens/${token}`,
        method: 'GET'
      }),
      providesTags: ['NotificationTokens']
    }),
    createNotifyToken: builder.mutation<any, any>({
      query: (token) => ({
        url: `/notifyTokens`,
        method: 'POST',
        data: token
      }),
      invalidatesTags: ['NotificationTokens']
    })
  })
})

export const { useCreateNotifyTokenMutation, useGetOneNotificationTokenQuery, useGetAllNotificationTokensQuery } = apiNotificationToken

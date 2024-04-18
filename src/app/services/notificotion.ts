import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiNotification = createApi({
  reducerPath: 'notification',
  tagTypes: ['Notifications'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, any>({
      query: ({ page, limit }) => ({
        url: `/notifications?_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['Notifications']
    }),
    getNotificationByUser: builder.query<any, any>({
      query: ({ userId, page, limit }) => ({
        url: `/notifications/getNotificationByUser?_userId=${userId}&_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['Notifications']
    }),
  })
})

export const { useGetNotificationByUserQuery } = apiNotification

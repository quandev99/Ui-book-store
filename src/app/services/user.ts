
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryConfig } from './apiConfig'


export const apiUser = createApi({
  reducerPath: 'user',
  tagTypes: ['Users'],
  baseQuery: baseQueryConfig,
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: '/users',
        method: 'GET'
      }),
      providesTags: ['Users']
    }),
    getUserById: builder.query<any, void>({
      query: (_id) => ({
        url: `/users/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Users']
    }),
    getAllDeletedUsers: builder.query<any, void>({
      query: () => ({
        url: '/users/trash',
        method: 'GET'
      }),
      providesTags: ['Users']
    }),
    createUser: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/users/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/users/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/users/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    }),
    restoreUser: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/users/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Users']
    }),
    forceUser: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/users/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllDeletedUsersQuery,
  useRestoreUserMutation,
  useForceUserMutation,
} = apiUser
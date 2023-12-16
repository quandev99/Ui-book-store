
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'


export const apiSupplier = createApi({
  reducerPath: 'supplier',
  tagTypes: ['Suppliers'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllSuppliers: builder.query<any, void>({
      query: () => ({
        url: '/suppliers',
        method: 'GET'
      }),
      providesTags: ['Suppliers']
    }),
    getSupplierById: builder.query<any, void>({
      query: (_id) => ({
        url: `/suppliers/${_id}/getById`,
        method: 'GET'
      }),
      providesTags: ['Suppliers']
    }),
    getAllDeletedSuppliers: builder.query<any, void>({
      query: () => ({
        url: '/suppliers/trash',
        method: 'GET'
      }),
      providesTags: ['Suppliers']
    }),
    createSupplier: builder.mutation<any, void>({
      query: (data: any) => ({
        url: `/suppliers/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Suppliers']
    }),
    updateSupplier: builder.mutation<any, void>({
      query: (data: any) => {
        const { _id, ...body } = data
        return {
          url: `/suppliers/${_id}/update`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Suppliers']
    }),
    deleteSupplier: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/suppliers/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Suppliers']
    }),
    restoreSupplier: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/suppliers/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Suppliers']
    }),
    forceSupplier: builder.mutation<any, void>({
      query: (id: any) => ({
        url: `/suppliers/${id}/force`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Suppliers']
    })
  })
})

export const {
  useGetAllSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useRestoreSupplierMutation,
  useForceSupplierMutation,
  useGetAllDeletedSuppliersQuery
} = apiSupplier
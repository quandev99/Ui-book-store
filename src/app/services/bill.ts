import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './apiConfig'
export const apiBill = createApi({
  reducerPath: 'bill',
  tagTypes: ['Bills'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllBills: builder.query<any, any>({
      query: ({ page, limit, bill_status }) => ({
        url: `/bills?_bill_status=${bill_status}&_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['Bills']
    }),
    getBillByUser: builder.query<any, any>({
      query: ({ userId, page, limit, bill_status }) => ({
        url: `/bills/getBillByUser?_userId=${userId}&_bill_status=${bill_status}&_page=${page}&_limit=${limit}&_sort=createdAt&_order=asc`,
        method: 'GET'
      }),
      providesTags: ['Bills']
    }),
    getBillById: builder.query<any, any>({
      query: (orderId) => ({
        url: `/bills/getBillById/${orderId}`,
        method: 'GET'
      }),
      providesTags: ['Bills']
    }),
    addBill: builder.mutation<any, any>({
      query: (data) => ({
        url: `/bills/add`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Bills']
    }),
    updateBillStatus: builder.mutation<any, any>({
      query: (data) => {
        const { id, ...body } = data
        return {
          url: `/bills/updateBillStatus/${id}`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Bills']
    }),
    cancelBill: builder.mutation<any, any>({
      query: (data) => {
        const { id, ...body } = data
        return {
          url: `/bills/cancelBill/${id}`,
          method: 'PATCH',
          body
        }
      },
      invalidatesTags: ['Bills']
    })
  })
})

export const {
  useGetAllBillsQuery,
  useGetBillByUserQuery,
  useCancelBillMutation,
  useAddBillMutation,
  useUpdateBillStatusMutation,
  useGetBillByIdQuery
} = apiBill

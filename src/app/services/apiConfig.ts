import { fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query/react'

interface CustomBaseQueryApi extends BaseQueryApi {
  extraData?: string
}

export const prepareHeaders = (headers: Headers, { extraData }: CustomBaseQueryApi) => {
  if (extraData) {
  }
  headers.set('authorization', import.meta.env.VITE_ACCESS_TOKEN)
  headers.set('x-api-key', import.meta.env.VITE_API_KEY)
  return headers
}

export const baseQueryConfig = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders
})

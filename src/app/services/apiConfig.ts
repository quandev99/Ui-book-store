import { fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query/react'

interface CustomBaseQueryApi extends BaseQueryApi {
  extraData?: string
}

export const prepareHeaders = (headers: Headers, { extraData }: CustomBaseQueryApi) => {
  
   
  const token = JSON.parse(localStorage.getItem('accessToken')!)
  console.log('authorization',token)
  if(token) headers.set('authorization', `${token}`)
  headers.set('x-client-id', '655358a9b75763459b174c8d')
  headers.set('x-api-key', import.meta.env.VITE_API_KEY)
  return headers
}

export const baseQueryConfig = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders
})

// // apiConfig.ts
// import { fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query/react'
// import useAuthenticatedApi from '~/hooks/useAuthenticatedApi'

// interface CustomBaseQueryApi extends BaseQueryApi {
//   extraData?: string
// }

// const authenticatedApi = useAuthenticatedApi()

// export const prepareHeaders = (headers: Headers, { getAuthenticatedHeaders }: typeof authenticatedApi) => {
//   const authenticatedHeaders = getAuthenticatedHeaders()
//   authenticatedHeaders.forEach((value, key) => headers.set(key, value))

//   // Add other headers or modifications as needed

//   return headers
// }

// export const baseQueryConfig = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL,
//   prepareHeaders: (headers) => prepareHeaders(headers, authenticatedApi)
// })
// apiConfig.ts

import { fetchBaseQuery, BaseQueryApi, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/dist/query/react'
import { apiAuth } from './auth'
import { useDispatch } from 'react-redux'
import { updateTokens } from '~/store/authSlice/authSlice'

interface CustomBaseQueryApi extends BaseQueryApi {
  extraData?: string
}

export const prepareHeaders = (headers: Headers, { extraData }: CustomBaseQueryApi) => {
  const dataUsers = JSON.parse(localStorage.getItem('dataUsers') || '{}')

  if (dataUsers && dataUsers.tokens) {
    headers.set('Authorization', `${dataUsers.tokens.accessToken}`)
  }

  if (dataUsers && dataUsers.user) {
    headers.set('x-client-id', `${dataUsers.user._id}`)
  }

  headers.set('x-api-key', import.meta.env.VITE_API_KEY)

  return headers
}

export const baseQueryConfig = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders
})
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryConfig(args, api, extraOptions)
  // console.log("result 11111 ádsad",api, result);
  if (result?.error && result?.error?.status === 401 && result?.error?.data?.message === 'Token has expired') {
    const dataUsers = JSON.parse(localStorage.getItem('dataUsers') || '{}')
    if (dataUsers && dataUsers.tokens && dataUsers.tokens.refreshToken) {
      const refreshToken = dataUsers.tokens.refreshToken
      const refreshResult = await baseQueryConfig(
        {
          // credentials: 'include',
          url: '/auths/refreshToken',
          method: 'POST',
          body: { refreshToken }
        },
        api,
        extraOptions
      )
      if (refreshResult?.data) {
        const { refreshToken, accessToken } = refreshResult?.data?.metaData
        // Update values in localStorage directly
        const newDataUsers = JSON.parse(localStorage.getItem('dataUsers') || '{}')
        newDataUsers.tokens.accessToken = accessToken
        newDataUsers.tokens.refreshToken = refreshToken
        localStorage.setItem('dataUsers', JSON.stringify(newDataUsers))
        // dispatch(updateTokens({ tokens: { accessToken, refreshToken } }))
        const retryResult = await baseQueryConfig(args, api, extraOptions)
        console.log('retryResult', retryResult)
        return retryResult
      } else {
        // // Refresh token failed, log out the user
        // api.dispatch(logout());
        localStorage.removeItem('dataUsers')
        window.location.replace('/sign-in')
        // // Return the original error
        return result
      }
    } else {
      // No refresh token available, log out the user
      // api.dispatch(loggedOut());
      localStorage.removeItem('dataUsers')
      // // Return the original error
      return result
    }
  }
  return result
}
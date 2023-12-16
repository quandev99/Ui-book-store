// customFetchBase.js
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { logout } from '../features/userSlice'

const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/`

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl
})

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // ... (rest of your code)

  if ((result.error?.data as any)?.message === 'You are not logged in') {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        // ... (rest of your code)

        if (refreshResult.data) {
          // Retry the initial query
          result = await baseQuery(
            { ...args, headers }, // Merge headers for retry
            api,
            extraOptions
          )
        } else {
          api.dispatch(logout())
          window.location.href = '/login'
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // ... (rest of your code)
    }
  }

  return result
}

export default customFetchBase

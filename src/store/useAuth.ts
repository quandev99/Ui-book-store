import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthTokens, selectCurrentUser } from './authSlice/authSlice'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)
  const tokens = useSelector(selectAuthTokens)

  return useMemo(() => ({ user, tokens }), [user, tokens])
}

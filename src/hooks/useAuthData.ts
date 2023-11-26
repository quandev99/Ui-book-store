import { useSelector } from 'react-redux'

const useAuthData = () => {
  const authData = useSelector((state) => state.authSlice)

  return authData
}

export default useAuthData

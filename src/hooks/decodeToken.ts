import { JwtPayload, jwtDecode, InvalidTokenError } from 'jwt-decode'

export const decodeAccessToken = (dataToken: string | null): JwtPayload | null => {
  try {
    // Check if dataToken is null
    if (dataToken === null) {
      console.error('Token is null')
      return null
    }
    const decodedToken = jwtDecode<JwtPayload>(dataToken)
    return decodedToken
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.error('Invalid token:', error.message)
    } else {
      console.error('Error decoding access token:', error)
    }
    return null
  }
}

export interface JwtPayload {
  _id?: string
  email?: string
  role?: number
  iat?: number
  exp?: number
}

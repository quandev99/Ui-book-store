import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

type AuthState = {
  user: any | null
  tokens: object | null
}

const slice = createSlice({
  name: 'authSlice',
  initialState: { user: null, tokens: null } as unknown as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, tokens } }: PayloadAction<{ user: any; tokens: object }>) => {
      state.user = user
      state.tokens = tokens
    }
  }
})

export const { setCredentials } = slice?.actions

export default slice?.reducer

export const selectCurrentUser = (state: RootState) => state?.authSlice.user
export const selectAuthTokens = (state: RootState) => state?.authSlice.tokens


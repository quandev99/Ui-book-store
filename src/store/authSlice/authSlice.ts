import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Draft } from 'immer'
type Tokens = {
  accessToken: string | null
  refreshToken: string | null
}
type AuthState = {
  user: any | null
  tokens: Tokens | null
}

const slice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
    tokens: {
      accessToken: null,
      refreshToken: null
    }
  }  as AuthState,
  reducers: {
    setCredentials: (state: Draft<AuthState>, { payload: { user, tokens } }: PayloadAction<{ user: any; tokens: Tokens }>) => {
      state.user = user;
      state.tokens = tokens;
    },
    resetState: (state) => {
      state.user = null
      state.tokens = {
        accessToken: null,
        refreshToken: null
      }
    },
    updateTokens: (state, action: PayloadAction<{ user?: any; tokens?: Tokens }>) => {
      if (action.payload.user !== undefined) {
        state.user = action.payload.user
      }

      if (action.payload.tokens !== undefined) {
        if (action.payload.tokens.accessToken !== undefined) {
          state.tokens!.accessToken = action.payload.tokens.accessToken
        }

        if (action.payload.tokens.refreshToken !== undefined) {
          state.tokens!.refreshToken = action.payload.tokens.refreshToken
        }
      }
    }
  }
})

export const { setCredentials, resetState,updateTokens } = slice?.actions

export default slice?.reducer

export const selectCurrentUser = (state: RootState) => state?.authSlice.user
export const selectAuthTokens = (state: RootState) => state?.authSlice.tokens


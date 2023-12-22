import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Draft } from "immer"
import { RootState } from "~/app/store"

const slice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: {
      cart_totalOrder: null,
      cart_totalPrice: null,
      createdAt: null,
      products: null,
      updatedAt: null,
      user_id: null,
      _id: null
    }
  },
  reducers: {
   
  }
})

export const {  } = slice.actions

export const cartReducer = slice.reducer

// Lấy thông tin giỏ hàng từ store
export const selectCart = (state: RootState) => state.cart

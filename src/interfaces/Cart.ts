export interface dataAddToCart {
  userId: String
  quantity: Number
  productId: String
}
interface Product {
  product_id: string
  product_name: string
  product_image: string
  product_price: number
  quantity: number
  _id: string
}

interface Cart {
  cart_totalOrder: number
  cart_totalPrice: number
  createdAt: string
  products: Product[]
  updatedAt: string
  user_id: string
  _id: string
}

export interface ApiResponse {
  message: string
  cart: Cart
}

import { IImage } from "./image"

export interface IProduct {
  id?: string
  name?: string
  image?: IImage
  thumbnail: []
  price?: number
  discount?: number
  discounted_price?: number
  discount_percentage?: number
  quantity?: number
  publishing_year?: number
  review_count?: number
  average_score?: number
  favorite_count?: number
  description?: string
  out_of_stock?: boolean
  active?: boolean
  supplier_id?: string
  genre_id?: string
  category_id?: string
  group_id?: string
  author_id?: string
  slug?: string
  createdAt?: any
  updatedAt?: string
}

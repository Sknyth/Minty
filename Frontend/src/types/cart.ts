import type { Product } from './product'

export interface CartItem {
  id: number
  userId: number
  product_id: number
  size: number | null
  quantity: number
  product: Product
}

export type CartItemUpdate = Pick<CartItem, 'id' | 'quantity'>
export type CartItemInput = { product_id: number; size?: number; quantity?: number }
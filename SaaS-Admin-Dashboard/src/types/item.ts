// export interface Item {
// 	id: string
// 	user_id: string
// 	image_url: string | null
// 	name: string
// 	price: number
// 	description: string
// 	size: string
// 	quantity: number
// }

// export type CartItemUpdate = Pick<Item, 'id' | 'quantity'>

// export type CartItemInput = Omit<Item, 'id' | 'user_id' | 'quantity'> & { quantity?: number }

import type { Product } from './product'

export interface CartItem {
  id: number
  userId: number
  productId: number
  size: number | null
  quantity: number
  product: Product
}

export type CartItemUpdate = Pick<CartItem, 'id' | 'quantity'>
export type CartItemInput = { product_id: number; size?: number; quantity?: number }
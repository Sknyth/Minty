export interface CartItem {
	id: string
	user_id: string
	image_url: string | null
	name: string
	price: number
	description: string
	size: string
	quantity: number
}

export type CartItemUpdate = Pick<CartItem, 'id' | 'quantity'>

export type CartItemInput = Omit<CartItem, 'id' | 'user_id' | 'quantity'> & { quantity?: number }
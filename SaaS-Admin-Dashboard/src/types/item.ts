export interface Item {
	id: string
	user_id: string
	image_url: string | null
	name: string
	price: number
	description: string
	size: string
	quantity: number
}

// export type CartItemUpdate = Pick<Item, 'id' | 'quantity'>

// export type CartItemInput = Omit<Item, 'id' | 'user_id' | 'quantity'> & { quantity?: number }
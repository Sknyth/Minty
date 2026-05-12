import type { Item } from '.'

export interface Order {
	id: string
	user_id: string
	customer_name: string
	customer_surname: string
	email: string
	address_id: string
	payment_id: string
	items: Item[]
	total_price: number
	status: 'pending' | 'delivered' | 'cancelled'
	created_at: string
}
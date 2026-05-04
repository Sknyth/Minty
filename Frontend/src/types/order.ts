import type { CartItem } from '@/types'

export interface Order {
	id: string
	user_id: string
	customer_name: string
	customer_surname: string
	email: string
	address_id: string
	payment_id: string
	items: CartItem[]
	total_price: number
	status: 'pending' | 'delivered' | 'cancelled'
	created_at: string
}
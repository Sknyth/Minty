import type { CartItem } from '../types'

export interface Order {
	id: number
	user_id: number

	customerName: string
	customerSurname: string
	customerEmail: string

	shippingStreet: string
  shippingCity:        string
  shippingCountry:     string
  shippingHouseNumber: string
  shippingApt:         string
  shippingPostcode: string

	cardNumber: string
  cardHolderName: string
  cardCvv: string
  cardExpirationDate: string
  cardType: string

	items: CartItem[]
	total_price: number
	status: 'pending' | 'delivered' | 'cancelled'
	created_at: string
}
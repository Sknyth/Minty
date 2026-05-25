export interface Address {
	id: number
	user_id: number
	country: string
	city: string
	street: string
	house_number: string
	apt: string
	postcode: string
}

export type AddressInput = Omit<Address, 'id' | 'user_id'>
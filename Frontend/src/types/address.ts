export interface Address {
	id: string
	user_id: string
	country: string
	city: string
	street: string
	house_number: number | null
	apt: number | null
	postcode: number | null
}

export type AddressInput = Omit<Address, 'id' | 'user_id'>
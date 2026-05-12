export interface Address {
	id: number
	user_id: string
	country: string
	city: string
	street: string
	house_number: string | null
	apt: string | null
	postcode: string | null
}

export type AddressInput = Omit<Address, 'id' | 'user_id'>
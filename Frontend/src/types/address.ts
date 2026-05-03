export interface Address {
	id: string
	user_id: string
	country: string
	city: string
	street: string
	house_number: number
	apt: number | null
	postcode: number
	phone: string | null
	created_at: string
}
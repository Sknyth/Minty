export interface Product {
	id: string
	name: string
	price: number
	description: string
	sizes: string[]
	image_url: string | null
}
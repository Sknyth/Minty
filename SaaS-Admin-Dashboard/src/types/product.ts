export interface Product {
	id: number
	name: string
	price: number
	description: string
	sizes: number[] 
	image_url: string | null
	showFull?: boolean
}
import { defineStore } from 'pinia'
import supabase from '../supabase'
import type { Product } from '../types'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		loading: false,
	}),
	actions: {
		async fetchProducts() {
			this.loading = true
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.order('id')
			if (error) throw error
			this.products = data
			this.loading = false
		},
		async searchProducts(query: string) {
			this.loading = true
			if (!query) return await this.fetchProducts()

			const { data, error } = await supabase
				.from('products')
				.select('*')
				.textSearch('fts', query, {
					config: 'english',
					type: 'websearch'
				})
			if (error) throw error
			this.products = data
			this.loading = false
		},
		async deleteProduct(productId: string) {
			this.loading = true
			const { error } = await supabase
				.from('products')
				.delete()
				.eq('id', productId)
			if (error) throw error
			this.products = this.products.filter(p => p.id !== productId)
			this.loading = false
		},
		async updateProduct(productId: string, updatedData: Product, file: File | null) {
			this.loading = true

			let finalImageUrl = updatedData.image_url

    	if (file) {
				const fileName = `${Date.now()}_${file.name}`
				const { error: uploadError } = await supabase.storage
					.from('products')
					.upload(fileName, file)

				if (uploadError) throw uploadError

				const { data: urlData } = supabase.storage
					.from('products')
					.getPublicUrl(fileName)
				
				finalImageUrl = urlData.publicUrl
			}

			const { error } = await supabase
				.from('products')
				.update({...updatedData, image_url: finalImageUrl})
				.eq('id', productId)
			if (error) throw error
			const index = this.products.findIndex(p => p.id === productId)
    	if (index !== -1) {
				this.products[index] = { 
					...this.products[index], 
					...updatedData, 
					image_url: finalImageUrl
				}
			}
			this.loading = false
		},
		async addProduct(newProduct: Omit<Product, 'id'>, file: File | null) {
			this.loading = true
			let finalImageUrl = newProduct.image_url

    	if (file) {
				const fileName = `${Date.now()}_${file.name}`
				const { error: uploadError } = await supabase.storage
					.from('products')
					.upload(fileName, file)

				if (uploadError) throw uploadError

				const { data: urlData } = supabase.storage
					.from('products')
					.getPublicUrl(fileName)
				
				finalImageUrl = urlData.publicUrl
			}

			const { data, error } = await supabase
				.from('products')
				.insert([{ ...newProduct, image_url: finalImageUrl }])
				.select()

			if (error) throw error
			
			this.products.push(data[0])

			this.loading = false
		}
	},
})
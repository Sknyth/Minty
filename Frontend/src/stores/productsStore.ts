import { defineStore } from 'pinia'
import type { Product, Criteria } from '@/types'
import { useAuthStore } from './authStore'
import { API_URL } from '@/api/config'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		loading: false,
	}),
	actions: {
		async fetchProducts() {
			this.loading = true
			const res = await fetch(`${API_URL}`)
			this.products = await res.json()
			this.loading = false
		},
		
		async searchProducts(query: string) {
			this.loading = true
			if (!query) return await this.fetchProducts()

			const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`)
			
			if (!res.ok) return this.products = []
			this.products = await res.json()
			this.loading = false
		},

		async sortProducts(criteria: Criteria) {
			this.loading = true
			const res = await fetch(`${API_URL}/sort?criteria=${encodeURIComponent(criteria)}`)
			this.products = await res.json()
			this.loading = false
		},
	},
})
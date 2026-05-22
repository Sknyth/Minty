import { defineStore } from 'pinia'
import type { Product, Criteria } from '@/types'
import { useAuthStore } from './authStore'
import { API_URL } from '@/api/config'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		loading: true,
		error: false
	}),
	actions: {
		async fetchProducts() {
			this.loading = true
			this.error = false
			try {
				const res = await fetch(`${API_URL}`)
				if(!res.ok) {
					this.error = true
					return
				}
				this.products = await res.json()
			} finally {
				this.loading = false
			}
		},
		
		async searchProducts(query: string) {
			this.loading = true
			this.error = false
			try {
				if (!query) return await this.fetchProducts()
	
				const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`)
				
				if (!res.ok){
					this.error = true
					this.products = []
					return 
				} 
				this.products = await res.json()
			} finally {
				this.loading = false
			}
		},

		async sortProducts(criteria: Criteria) {
			this.loading = true
			this.error = false
			try {
				const res = await fetch(`${API_URL}/sort?criteria=${encodeURIComponent(criteria)}`)
				if(!res.ok) {
					this.error = true
					return
				}
				this.products = await res.json()
			} finally {
				this.loading = false
			}
		},
	},
})
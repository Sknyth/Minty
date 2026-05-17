import { defineStore } from 'pinia'
import type { Product } from '../types'
import { useAuthStore } from './authStore'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		loading: false,
	}),
	actions: {
		async fetchProducts() {
			this.loading = true
			const res = await fetch('http://localhost:3000')
			this.products = await res.json()
			this.loading = false
		},

		async deleteProduct(productId: number) {
			this.loading = true
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`http://localhost:3000/delete/${productId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${authStore.access_token}` } })
			if (!req.ok) throw new Error('Failed to delete product')
			this.products = this.products.filter(product => product.id !== productId)
			this.loading = false
		},

		async updateProduct(productId: number, updatedData: Partial<Product>) {
			this.loading = true
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`http://localhost:3000/update/${productId}`, { 
				method: 'PATCH',
				headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore().access_token}`,
        },
				body: JSON.stringify(updatedData)
			})
			if (!req.ok) throw new Error('Failed to update product')
			const updatedProduct = await req.json()
			const index = this.products.findIndex(p => p.id === productId)
			if (index !== -1) {
				this.products[index] = updatedProduct
			}
			this.loading = false
		},

		async addProduct(newProduct: Omit<Product, 'id'>) {
			this.loading = true
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`http://localhost:3000/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify(newProduct)
			})
			if (!req.ok) throw new Error('Failed to create product')
			const createdProduct = await req.json()
			this.products.push(createdProduct)
			this.loading = false
		},
		async searchProducts(query: string) {
			this.loading = true
			if (!query) {
				await this.fetchProducts()
				return
			}

			const res = await fetch(`http://localhost:3000/search?query=${encodeURIComponent(query)}`)

			if (!res.ok) return

			this.products = await res.json()
			this.loading = false
		},
	},
})
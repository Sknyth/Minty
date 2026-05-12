import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { Product, Criteria } from '@/types'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [] as Product[],
		loading: false,
	}),
	actions: {
		async fetchProducts() {
			this.loading = true
			const res = await fetch('http://localhost:3000')
			const data = await res.json()
			this.products = data as Product[]
			this.loading = false
		},
		async searchProducts(query: string) {
			this.loading = true
			if (!query) return await this.fetchProducts()

			const { data, error } = await supabase
				.from('products')
				.select('*')
				.textSearch('name', query, {
					config: 'english',
					type: 'websearch'
				})
			if (error) throw error
			this.products = data as Product[]
			this.loading = false
		},
		async sortProducts(criteria: Criteria) {
			this.loading = true
			let orderBy = 'id'
			let ascending = true

			if (criteria === 'price-low') {
				orderBy = 'price'
				ascending = true
			} else if (criteria === 'price-high') {
				orderBy = 'price'
				ascending = false
			} else if (criteria === 'name') {
				orderBy = 'name'
				ascending = true
			} else if (criteria === 'standard') {
				orderBy = 'id'
				ascending = true
			}

			const { data, error } = await supabase
				.from('products')
				.select('*')
				.order(orderBy, { ascending })
			if (error) throw error
			this.products = data as Product[]
			this.loading = false
		},
	},
})
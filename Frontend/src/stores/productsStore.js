import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useProductsStore = defineStore('products', {
	state: () => ({
		products: [],
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
		async searchProducts(query) {
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
			this.products = data
			this.loading = false
		},
		async sortProducts(criteria) {
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
			this.products = data
			this.loading = false
		},
	},
})
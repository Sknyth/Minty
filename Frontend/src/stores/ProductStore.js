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
	},
})
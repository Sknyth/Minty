import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, Criteria } from '@/types'
import { API_URL } from '@/api/config'

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([])
	const loading = ref(true)
	const error = ref(false)

	const fetchProducts = async () => {
		loading.value = true
		error.value = false
		try {
			const res = await fetch(`${API_URL}`)
			if (!res.ok) {
				error.value = true
				return
			}
			products.value = await res.json()
		} finally {
			loading.value = false
		}
	}

	const searchProducts = async (query: string) => {
		loading.value = true
		error.value = false
		try {
			if (!query) return await fetchProducts()

			const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`)
			if (!res.ok) {
				error.value = true
				products.value = []
				return
			}
			products.value = await res.json()
		} finally {
			loading.value = false
		}
	}

	const sortProducts = async (criteria: Criteria) => {
		loading.value = true
		error.value = false
		try {
			const res = await fetch(`${API_URL}/sort?criteria=${encodeURIComponent(criteria)}`)
			if (!res.ok) {
				error.value = true
				return
			}
			products.value = await res.json()
		} finally {
			loading.value = false
		}
	}

	return {
		products,
		loading,
		error,
		fetchProducts,
		searchProducts,
		sortProducts,
	}
})
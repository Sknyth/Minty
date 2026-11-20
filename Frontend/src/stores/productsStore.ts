import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, Criteria } from '@/types'
import { API_URL } from '@/api/config'

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([])
	const loading = ref(true)
	const error = ref(false)
	let activeRequest: AbortController | undefined

	const loadProducts = async (path = '') => {
		activeRequest?.abort()
		const request = new AbortController()
		activeRequest = request
		loading.value = true
		error.value = false

		try {
			const response = await fetch(`${API_URL}${path}`, { signal: request.signal })
			if (!response.ok) throw new Error('Unable to load products')

			const results: Product[] = await response.json()
			if (activeRequest === request) products.value = results
		} catch {
			if (activeRequest === request) error.value = true
		} finally {
			if (activeRequest === request) {
				activeRequest = undefined
				loading.value = false
			}
		}
	}

	const fetchProducts = () => loadProducts()
	const searchProducts = (query: string) =>
		query ? loadProducts(`/search?query=${encodeURIComponent(query)}`) : fetchProducts()
	const sortProducts = (criteria: Criteria) => loadProducts(`/sort?criteria=${encodeURIComponent(criteria)}`)

	return {
		products,
		loading,
		error,
		fetchProducts,
		searchProducts,
		sortProducts,
	}
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../types'
import { useAuthStore } from './authStore'
import { API_URL } from '../api/config'

export const useProductsStore = defineStore('products', () => {
	const products = ref<Product[]>([])
	const loading = ref(false)

	const fetchProducts = async () => {
		loading.value = true
		const res = await fetch(`${API_URL}`)
		products.value = await res.json()
		loading.value = false
	}

	const deleteProduct = async (productId: number) => {
		loading.value = true
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/delete/${productId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${authStore.access_token}` } })
		if (!req.ok) throw new Error('Failed to delete product')
		products.value = products.value.filter(product => product.id !== productId)
		loading.value = false
	}

	const updateProduct = async (productId: number, updatedData: Partial<Product> | FormData) => {
		loading.value = true
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')

		const isFormData = updatedData instanceof FormData

		const req = await fetch(`${API_URL}/update/${productId}`, {
			method: 'PATCH',
			headers: {
				...(isFormData ? {} : { 'Content-Type': 'application/json' }),
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
			body: isFormData ? updatedData : JSON.stringify(updatedData)
		})
		if (!req.ok) throw new Error('Failed to update product')
		const updatedProduct = await req.json()
		const index = products.value.findIndex(p => p.id === productId)
		if (index !== -1) {
			products.value[index] = updatedProduct
		}
		loading.value = false
	}

	const addProduct = async (newProduct: Omit<Product, 'id'> | FormData) => {
		loading.value = true
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')

		const isFormData = newProduct instanceof FormData

		const req = await fetch(`${API_URL}/create`, {
			method: 'POST',
			headers: {
				...(isFormData ? {} : { 'Content-Type': 'application/json' }),
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: isFormData ? newProduct : JSON.stringify(newProduct)
		})
		if (!req.ok) throw new Error('Failed to create product')
		const createdProduct = await req.json()
		products.value.push(createdProduct)
		loading.value = false
	}

	const searchProducts = async (query: string) => {
		loading.value = true
		if (!query) {
			await fetchProducts()
			return
		}

		const res = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`)

		if (!res.ok) return

		products.value = await res.json()
		loading.value = false
	}

	return { products, loading, fetchProducts, deleteProduct, updateProduct, addProduct, searchProducts }
})
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './authStore'
import type { CartItem, CartItemInput, CartItemUpdate } from '@/types'
import { API_URL } from '@/api/config'

export const useCartStore = defineStore('cart', () => {
	const cartItems = ref<CartItem[]>([])
	const cartTotal = ref(0)
	const quantity = ref(1)
	const orderAccess = ref(false)
	const loading = ref(false)
	const error = ref(false)

	const isInCart = (product_id: number, size: number | undefined) => {
		return cartItems.value.find(
			(i: CartItem) => i.productId === product_id && Number(i.size) === Number(size)
		)
	}

	const fetchCart = async () => {
		loading.value = true
		error.value = false
		try {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const res = await fetch(`${API_URL}/cart/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			if (!res.ok) {
				error.value = true
				return
			}
			const data = await res.json()
			cartItems.value = Array.isArray(data) ? data : []
		} finally {
			loading.value = false
		}
	}

	const addToCart = async ({ size, quantity, product_id }: CartItemInput) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/cart/add/${authStore.user.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({
				productId: product_id,
				size,
				quantity,
			}),
		})
		if (!req.ok) throw new Error('Failed to add to cart')
		await fetchCart()
	}

	const removeFromCart = async (id: number) => {
		const authStore = useAuthStore()
		const req = await fetch(`${API_URL}/cart/remove`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({
				productId: id,
			}),
		})
		if (!req.ok) throw new Error('Failed to remove from cart')
		cartItems.value = cartItems.value.filter(item => item.id !== id)
	}

	const removeCart = async () => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/cart/removeCart/${authStore.user.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${authStore.access_token}`,
			},
		})
		if (!req.ok) throw new Error('Failed to clear cart')
		cartItems.value = []
	}

	const updateQuantity = async ({ id, quantity }: CartItemUpdate) => {
		const authStore = useAuthStore()
		const req = await fetch(`${API_URL}/cart/updateQuantity`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({
				productId: id,
				quantity,
			}),
		})
		if (!req.ok) throw new Error('Failed to update quantity')
		const item = cartItems.value.find(i => i.id === id)
		if (item) {
			item.quantity = quantity
		}
	}

	return {
		cartItems,
		cartTotal,
		quantity,
		orderAccess,
		loading,
		error,
		isInCart,
		fetchCart,
		addToCart,
		removeFromCart,
		removeCart,
		updateQuantity,
	}
})
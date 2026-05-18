import {defineStore} from 'pinia'
import { useAuthStore } from './authStore'
import type { CartItem, CartItemInput, CartItemUpdate } from '@/types'
import { API_URL } from '@/api/config'

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [] as CartItem[],
		cartTotal: 0,
		quantity: 1 ,
		orderAccess: false,
	}),
	getters: {
    isInCart: (state) => (product_id: number, size: number | undefined) => {
			return state.cartItems.find((i: CartItem) => i.product_id === product_id && i.size === size)
		}
  },
	actions: {
		async fetchCart() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const res = await fetch(`${API_URL}/cart/${authStore.user.id}`, {
					headers: {
							Authorization: `Bearer ${authStore.access_token}`,
					},
			})
			const data = await res.json()
			this.cartItems = Array.isArray(data) ? data : []
		},

		async addToCart({ size, quantity, product_id }: CartItemInput) {
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
			this.fetchCart()
		},

		async removeFromCart(id: number) {
			const authStore = useAuthStore()
			const req = await fetch(`${API_URL}/cart/remove`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({
					productId: id
				})
			})
			if (!req.ok) throw new Error('Failed to remove from cart')
			this.cartItems = this.cartItems.filter(item => item.id !== id)
		},

		async removeCart() {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/cart/removeCart/${authStore.user.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				}
			})
			if (!req.ok) throw new Error('Failed to clear cart')
			this.cartItems = []
		},

		async updateQuantity({ id, quantity }: CartItemUpdate) {
			const authStore = useAuthStore()
			const req = await fetch(`${API_URL}/cart/updateQuantity`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({
					productId: id,
					quantity
				})
			})
			if (!req.ok) throw new Error('Failed to update quantity')
			const item = this.cartItems.find(i => i.id === id)
			if (item) {
				item.quantity = quantity
			}
		},
	}
})
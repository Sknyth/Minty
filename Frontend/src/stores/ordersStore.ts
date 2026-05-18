import {defineStore} from 'pinia'
import {useAuthStore} from './authStore'
import { useCartStore } from './cartStore'
import type { Order } from '@/types'
import { useAddressStore } from './addressStore'
import { usePaymentStore } from './paymentStore'
import { API_URL } from '@/api/config'

export const useOrdersStore = defineStore('orders', {
	state: () => ({
		orders: [] as Order[],
	}),
	actions: {
		async createOrder(data: Order) {
			const authStore = useAuthStore()
			const addressStore = useAddressStore()
			const paymentStore = usePaymentStore()
			const cartStore = useCartStore()

			if (!authStore.user || !authStore.user.id) throw new Error("Log in to place an order")
			if (!addressStore.selectedAddressId || !paymentStore.selectedPaymentId) {
				throw new Error("Select address and payment method")
			}

			const req = await fetch(`${API_URL}/order/create/${authStore.user.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify(data),
			})
			if (!req.ok) throw new Error('Failed to add to cart')
				
			cartStore.removeCart()

			cartStore.cartItems = []
			cartStore.cartTotal = 0
		},

		async fetchOrders() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			
			const res = await fetch(`${API_URL}/order/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			this.orders = await res.json()
		}
	}
})
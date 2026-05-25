import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './authStore'
import { useCartStore } from './cartStore'
import { useAddressStore } from './addressStore'
import { usePaymentStore } from './paymentStore'
import type { Order } from '@/types'
import { API_URL } from '@/api/config'

export const useOrdersStore = defineStore('orders', () => {
	const orders = ref<Order[]>([])
	const loading = ref(true)
	const error = ref(false)

	const createOrder = async (data: Order) => {
		const authStore = useAuthStore()
		const addressStore = useAddressStore()
		const paymentStore = usePaymentStore()
		const cartStore = useCartStore()

		if (!authStore.user || !authStore.user.id) throw new Error('Log in to place an order')
		if (!addressStore.selectedAddressId || !paymentStore.selectedPaymentId) {
			throw new Error('Select address and payment method')
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
	}

	const fetchOrders = async () => {
		loading.value = true
		error.value = false
		try {
			const authStore = useAuthStore()
			if (!authStore.user) return

			const res = await fetch(`${API_URL}/order/${authStore.user.id}`, {
				headers: { Authorization: `Bearer ${authStore.access_token}` },
			})

			if (!res.ok) {
				error.value = true
				return
			}

			orders.value = await res.json()
		} finally {
			loading.value = false
		}
	}

	return {
		orders,
		loading,
		error,
		createOrder,
		fetchOrders,
	}
})
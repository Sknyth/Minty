import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from '../types'
import { useAuthStore } from './authStore'
import { API_URL } from '../api/config'

export const useOrdersStore = defineStore('Orders', () => {
	const orders = ref<Order[]>([])
	const loading = ref(false)

	const fetchOrders = async () => {
		const authStore = useAuthStore()
		if (!authStore.user) return
		loading.value = true
		const res = await fetch(`${API_URL}/order/allOrders`, {
			headers: {
				Authorization: `Bearer ${authStore.access_token}`,
			},
		})
		if (!res.ok) return
		orders.value = await res.json()
		loading.value = false
	}

	const searchOrders = async (query: string) => {
		loading.value = true

		if (!query) {
			return await fetchOrders()
		}

		const res = await fetch(`${API_URL}/order/search?query=${encodeURIComponent(query)}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
		})

		if (!res.ok) return

		orders.value = await res.json()
		loading.value = false
	}

	const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
		loading.value = true
		const res = await fetch(`${API_URL}/order/updateStatus/${orderId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${useAuthStore().access_token}`,
			},
			body: JSON.stringify({ newStatus }),
		})
		if (!res.ok) return
		loading.value = false

		const order = orders.value.find(o => o.id === orderId)
		if (order) order.status = newStatus
	}

	return {
		orders,
		loading,
		fetchOrders,
		searchOrders,
		updateOrderStatus,
	}
})
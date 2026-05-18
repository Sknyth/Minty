import { defineStore } from 'pinia'
import type { Order } from '../types'
import { useAuthStore } from './authStore'
import { API_URL } from '../api/config'

export const useOrdersStore = defineStore('Orders', {
  state: () => ({
    orders: [] as Order[],
    loading: false,
  }),
	actions: {
    async fetchOrders() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			this.loading = true
			const res = await fetch(`${API_URL}/order/allOrders`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
      if (!res.ok) return
			this.orders = await res.json()
      this.loading = false
		},

    async searchOrders(query: string) {
      this.loading = true

      if (!query) {
        return await this.fetchOrders()
      }
      
      const res = await fetch(`${API_URL}/order/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
				headers: {
					Authorization: `Bearer ${useAuthStore().access_token}`,
				},
      })

      if(!res.ok) return

      this.orders = await res.json()
      this.loading = false
    },

    async updateOrderStatus(orderId: number, newStatus: Order['status']) {
      this.loading = true
      const res = await fetch(`${API_URL}/order/updateStatus/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore().access_token}`,
        },
        body: JSON.stringify({ newStatus }),
      })
      if (!res.ok) return
      this.loading = false

      const order = this.orders.find(o => o.id === orderId)
      if (order) order.status = newStatus
    },
	}
})
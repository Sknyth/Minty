import supabase from '../supabase'
import { defineStore } from 'pinia'
import type { Order } from '../types'

export const useOrdersStore = defineStore('Orders', {
  state: () => ({
    orders: [] as Order[],
    loading: false,
  }),
	actions: {
    async fetchOrders() {
      this.loading = true
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      this.orders = data
      this.loading = false
      return data
    },

    async searchOrders(query: string) {
      this.loading = true

      if (!query) {
        return await this.fetchOrders()
      }
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .textSearch('fts', query, {
					config: 'english',
					type: 'websearch'
				})
      if (error) throw error
      this.orders = data
      this.loading = false
    },

    async updateOrderStatus(orderId: string, newStatus: Order['status']) {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      const order = this.orders.find(o => o.id === orderId)
      if (order) order.status = newStatus

    },
	}
})
import { defineStore } from 'pinia'
import { useOrdersStore } from './orderStore'

export const useStatStore = defineStore('stats', {
  state: () => ({
    totalEarnings: 0,
    totalOrders: 0,
    chartLabels: [] as string[],
    chartData: [] as number[],

    loading: false,
  }),
  actions: {
    async fetchEarnings() {
      this.loading = true

      const orderStore = useOrdersStore()

      if (orderStore.orders.length === 0) {
        await orderStore.fetchOrders()
      }

      this.totalEarnings = orderStore.orders.filter(order => order.status === 'delivered').reduce((acc, order) => acc + order.total_price, 0)

      this.loading = false
    },
    getStartOfMonth() {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    },

    async fetchOrdersChart() {
      this.loading = true

      const orderStore = useOrdersStore()

      if (orderStore.orders.length === 0) {
        await orderStore.fetchOrders()
      }

      const now = new Date()

      const ordersThisMonth = orderStore.orders.filter(order => {
        const date = new Date(order.created_at)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      });

      this.totalOrders = ordersThisMonth.length

      const stats: { [key: number]: number } = {};
      for (let d = 1; d <= now.getDate(); d++) {
        stats[d] = 0
      }

      ordersThisMonth.forEach(order => {
        const day = new Date(order.created_at).getDate()
        if (stats[day] !== undefined) stats[day]++
      });

      this.chartLabels = Object.keys(stats)
      this.chartData = Object.values(stats)
      this.loading = false
    },

    async fetchProductsChart() {
      
    }
    
  }
})
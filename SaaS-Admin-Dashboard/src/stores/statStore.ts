import supabase from '../supabase'
import { defineStore } from 'pinia'
import type { PaymentMethod, Address } from '../types'
import { useAuthStore } from './authStore'

export const useStatStore = defineStore('stats', {
  state: () => ({
    totalEarnings: 0,
    totalOrders: 0,
    chartLabels: [] as string[],
    chartData: [] as number[],
    address: null as Address | null,
    payment: null as PaymentMethod | null,
    loading: false,
  }),
  actions: {
    async fetchEarnings() {
      this.loading = true

      const { data, error } = await supabase
        .from('orders')
        .select('total_price')

      if (error) throw error

      this.totalEarnings = data.reduce((acc, order) => acc + order.total_price, 0)

      this.loading = false
    },
    getStartOfMonth() {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    },

    async fetchOrdersChart() {
      this.loading = true
      const now = new Date()
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      const { count } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', firstDay)

      this.totalOrders = count || 0

      const { data, error } = await supabase
        .from('orders')
        .select('created_at')
        .gte('created_at', firstDay)
        .order('created_at', { ascending: true })

      if (error) throw error

      const stats: { [key: number]: number } = {}
      for (let d = 1; d <= now.getDate(); d++) {
        stats[d] = 0
      }

      data.forEach(order => {
        const day = new Date(order.created_at).getDate()
        if (stats[day] !== undefined) stats[day]++
      })

      this.chartLabels = Object.keys(stats)
      this.chartData = Object.values(stats)
      this.loading = false
    },

    async fetchAddress(addressID: number) {
      this.loading = true

      const res = await fetch(`http://localhost:3000/address/byId/${addressID}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore().access_token}`,
        },
      })
      if (!res.ok) return
      const data = await res.json()

      this.address = data
      
      this.loading = false
    },

    async fetchPayment(paymentID: string) {
      this.loading = true

      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('id', paymentID)

      if(error) throw error

      this.payment = data[0]
      
      this.loading = false
    }
  }
})
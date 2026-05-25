import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useOrdersStore } from './orderStore'

export const useStatStore = defineStore('stats', () => {
	const totalEarnings = ref(0)
	const totalOrders = ref(0)
	const chartLabels = ref<string[]>([])
	const chartData = ref<number[]>([])
	const loading = ref(false)

	const fetchEarnings = async () => {
		loading.value = true

		const orderStore = useOrdersStore()

		if (orderStore.orders.length === 0) {
			await orderStore.fetchOrders()
		}

		totalEarnings.value = orderStore.orders
			.filter(order => order.status === 'delivered')
			.reduce((acc, order) => acc + order.total_price, 0)

		loading.value = false
	}

	const getStartOfMonth = () => {
		const now = new Date()
		return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
	}

	const fetchOrdersChart = async () => {
		loading.value = true

		const orderStore = useOrdersStore()

		if (orderStore.orders.length === 0) {
			await orderStore.fetchOrders()
		}

		const now = new Date()

		const ordersThisMonth = orderStore.orders.filter(order => {
			const date = new Date(order.created_at)
			return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
		})

		totalOrders.value = ordersThisMonth.length

		const stats: { [key: number]: number } = {}
		for (let d = 1; d <= now.getDate(); d++) {
			stats[d] = 0
		}

		ordersThisMonth.forEach(order => {
			const day = new Date(order.created_at).getDate()
			if (stats[day] !== undefined) stats[day]++
		})

		chartLabels.value = Object.keys(stats)
		chartData.value = Object.values(stats)
		loading.value = false
	}

	return { totalEarnings, totalOrders, chartLabels, chartData, loading, fetchEarnings, getStartOfMonth, fetchOrdersChart }
})
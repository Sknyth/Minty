import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { PaymentMethod } from '@/types'
import { API_URL } from '@/api/config'

export const usePaymentStore = defineStore('payment', () => {
	const payment = ref<PaymentMethod[]>([])
	const selectedPaymentId = ref<number | null>(null)
	const loading = ref(true)
	const error = ref(false)

	const fetchPayment = async () => {
		loading.value = true
		error.value = false
		try {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const res = await fetch(`${API_URL}/payment/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			if (!res.ok) {
				error.value = true
				return
			}
			payment.value = await res.json()
			selectedPaymentId.value = authStore.user.selectedPaymentId ?? null
		} finally {
			loading.value = false
		}
	}

	const addPayment = async (data: PaymentMethod) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/payment/add/${authStore.user.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify(data),
		})
		if (!req.ok) throw new Error('Failed to add to cart')
		fetchPayment()
	}

	const deletePayment = async (paymentId: number) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/payment/delete/${paymentId}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${authStore.access_token}`,
			},
		})
		if (!req.ok) throw new Error('Failed to remove from cart')
		payment.value = payment.value.filter(p => p.id !== paymentId)
		if (selectedPaymentId.value === paymentId) {
			await selectPayment(null)
		}
	}

	const selectPayment = async (id: number | null) => {
		const authStore = useAuthStore()
		if (!authStore.user) throw new Error('You are not logged in')
		const req = await fetch(`${API_URL}/user/selectPayment/${authStore.user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authStore.access_token}`,
			},
			body: JSON.stringify({ selectedPaymentId: id }),
		})
		if (!req.ok) throw new Error('Failed to select payment')
		selectedPaymentId.value = id
	}

	return {
		payment,
		selectedPaymentId,
		loading,
		error,
		fetchPayment,
		addPayment,
		deletePayment,
		selectPayment,
	}
})
import {defineStore} from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { PaymentMethod } from '@/types'
import { API_URL } from '@/api/config'

export const usePaymentStore = defineStore('payment', {
	state: () => ({
		payment: [] as PaymentMethod[],
		selectedPaymentId: null as number | null,
	}),

	actions: {
		async fetchPayment() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const res = await fetch(`${API_URL}/payment/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			this.payment = await res.json()
			this.selectedPaymentId = authStore.user.selectedPaymentId ?? null
		},

		async addPayment(data: PaymentMethod) {
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
			this.fetchPayment()
		},

		async deletePayment(paymentId: number) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/payment/delete/${paymentId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			if (!req.ok) throw new Error('Failed to remove from cart')
			this.payment = this.payment.filter(payment => payment.id !== paymentId)
			if (this.selectedPaymentId === paymentId) {
				await this.selectPayment(null)
			}
		},

		async selectPayment(selectedPaymentId: number | null) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/user/selectPayment/${authStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({ selectedPaymentId })
			})
			if (!req.ok) throw new Error('Failed to select payment')
			this.selectedPaymentId = selectedPaymentId
		}
	}
})
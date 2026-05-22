import {defineStore} from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { Address } from '@/types'
import { API_URL } from '@/api/config'

export const useAddressStore = defineStore('address', {
	state: () => ({
		address: [] as Address[],
		selectedAddressId: null as number | null,
		loading: true,
		error: false
	}),

	actions: {
		async fetchAddress() {
			this.loading = true
			this.error = false
			try {
				const authStore = useAuthStore()
				if (!authStore.user) return
				const res = await fetch(`${API_URL}/address/${authStore.user.id}`, {
					headers: {
						Authorization: `Bearer ${authStore.access_token}`,
					},
				})
				if(!res.ok){
					this.error = true
					return
				} 
				this.address = await res.json()
				this.selectedAddressId = authStore.user.selectedAddressId ?? null
			} finally {
				this.loading = false
			}
		},

		async addAddress(data: Address) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')	
			const req = await fetch(`${API_URL}/address/add/${authStore.user.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify(data),
			})
			if (!req.ok) throw new Error('Failed to add address')
			await this.fetchAddress()
		},

		async deleteAddress(addressId: number) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/address/delete/${addressId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			if (!req.ok) throw new Error('Failed to delete address')
			this.address = this.address.filter(address => address.id !== addressId)
			if (this.selectedAddressId === addressId) {
				await this.selectAddress(null)
			}
		},

		async selectAddress(selectedAddressId: number | null) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/user/selectAddress/${authStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({ selectedAddressId })
			})
			if (!req.ok) throw new Error('Failed to select address')
			this.selectedAddressId = selectedAddressId
		},

		async updateAddress(addressId: number, data: Address) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`${API_URL}/address/update/${addressId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify(data),
			})
			if (!req.ok) throw new Error('Failed to update address')
			await this.fetchAddress()
		},
	}
})
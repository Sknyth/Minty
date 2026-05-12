import {defineStore} from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import type { Address } from '@/types'

export const useAddressStore = defineStore('address', {
	state: () => ({
		address: [] as Address[],
		selectedAddressId: null as number | null,
	}),

	actions: {
		async fetchAddress() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const res = await fetch(`http://localhost:3000/address/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			const data = await res.json()
			this.address = data
			this.selectedAddressId = authStore.user.selectedAddressId ?? null
		},

		async addAddress(data: Address) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')	
			const req = await fetch(`http://localhost:3000/address/add/${authStore.user.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify(
					data
				),
			})
			if (!req.ok) throw new Error('Failed to add to cart')
			this.fetchAddress()
		},

		async deleteAddress(addressId: number){
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')

			const req = await fetch(`http://localhost:3000/address/delete/${addressId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})
			if (!req.ok) throw new Error('Failed to remove from cart')
			this.address = this.address.filter(address => address.id !== addressId)

			if (this.selectedAddressId === addressId) {
        await this.selectAddress(null)
    	}
		},

		async selectAddress(selectedAddressId: number | null) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('You are not logged in')
			const req = await fetch(`http://localhost:3000/user/selectAddress/${authStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({
					selectedAddressId
				})
			})
			if (!req.ok) throw new Error('Failed to select payment')

			this.selectedAddressId = selectedAddressId
		}
	}
})
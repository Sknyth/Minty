import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'
import type { Profile, Address, PaymentMethod } from '@/types'

export const useProfileStore = defineStore('profile', {
	state: () => ({
		profile: null as Profile | null,
		paymentMethods: [] as PaymentMethod[],
		addresses: [] as Address[],
		selectedAddressId: null as string | null,
		selectedPaymentId: null as string | null,
	}),
	actions: {
		async fetchProfile() {
			const authStore = useAuthStore()
			if (!authStore.user) return

			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', authStore.user.id)
				.single()

			if (error) throw error
			this.profile = data as Profile

			if (data.selected_address_id) {
				this.selectedAddressId = data.selected_address_id
			}
			if (data.selected_payment_id) {
				this.selectedPaymentId = data.selected_payment_id
			}
		},

		async updateProfile({ name, surname, phone }: { name: string, surname: string, phone: string | null }) {
			const authStore = useAuthStore()
			if (!authStore.user || !authStore.user.id) {
				throw new Error("User is not authorized")
			}

			const { data: updatedProfile, error } = await supabase
				.from('profiles')
				.update({
					name,
					surname,
					phone
				})
				.eq('id', authStore.user.id)
				.select()
				.single()

			if (error) throw error
			this.profile = updatedProfile as Profile
		},

		async fetchAddresses() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const { data, error } = await supabase
				.from('addresses')
				.select('*')
				.eq('user_id', authStore.user.id)
			if (error) throw error
			this.addresses = data as Address[]
		},

		async addAddress({ country, city, street, house_number, apt, postcode}: Address) {
			const authStore = useAuthStore()

			if (!authStore.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('addresses')
				.insert([
					{
						user_id: authStore.user.id,
						country: country,
						city: city,
						street: street,
						house_number: house_number,
						apt: apt,
						postcode: postcode,
					}
				])

			if (error) throw error
			await this.fetchAddresses()
		},

		async updateAddress({ id, country, city, street, house_number, apt, postcode }: Address) {
			const authStore = useAuthStore()
			if (!authStore.user || !authStore.user.id) {
				throw new Error("User is not authorized")
			}

			if (!id) {
				throw new Error("Address ID is missing")
			}


			const { error } = await supabase
				.from('addresses')
				.update({
					country: country,
					city: city,
					street: street,
					house_number: house_number,
					apt: apt,
					postcode: postcode,
				})
				.eq('id', id)

			if (error) throw error
			await this.fetchAddresses()
		},

		async deleteAddress(id: string) {
			const { error } = await supabase
				.from('addresses')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.addresses = this.addresses.filter(address => address.id !== id)
		},

		async fetchPaymentMethods() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const { data: paymentMethods, error } = await supabase
				.from('payment_methods')
				.select('*')
				.eq('user_id', authStore.user.id)
			if (error) throw error
			this.paymentMethods = paymentMethods
		},

		async addPaymentMethod({ number, holder_name, expiration_date, cvv, type }: PaymentMethod) {
			const authStore = useAuthStore()
			if (!authStore.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('payment_methods')
				.insert([
					{
						user_id: authStore.user.id,
						number: number,
						holder_name: holder_name,
						expiration_date: expiration_date,
						cvv: cvv,
						type: type
					}
				])

			if (error) throw error
			await this.fetchPaymentMethods()
		},

		async deletePaymentMethod(id: string) {
			const { error } = await supabase
				.from('payment_methods')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.paymentMethods = this.paymentMethods.filter(method => method.id !== id)
		},

		async updateSelectedMetadata({ addressId, paymentId }: { addressId: string; paymentId: string }) {
			const authStore = useAuthStore()
			if (!authStore.user) return

			const updateData: Partial<Profile> = {}
			if (addressId) updateData.selected_address_id = addressId
			if (paymentId) updateData.selected_payment_id = paymentId

			const { data, error } = await supabase
				.from('profiles')
				.update(updateData)
				.eq('id', authStore.user.id)
				.select()

			if (error) throw error

			if (data) {
				this.profile = { ...this.profile, ...data[0] } as Profile

				if (addressId) this.selectedAddressId = addressId
				if (paymentId) this.selectedPaymentId = paymentId
			}
		},
	}
})
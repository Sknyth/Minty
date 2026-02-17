import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profile', {
	state: () => ({
		profile: null,
		paymentMethods: [],
		addresses: [],
		selectedAddressId: null,
		selectedPaymentId: null,
		authStore: useAuthStore(),
	}),
	actions: {
		async fetchProfile() {
			if (!this.authStore.user) return

			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', this.authStore.user.id)
				.single()

			if (error) throw error
			this.profile = profile

			if (profile.selected_address_id) {
				this.selectedAddressId = profile.selected_address_id
			}
			if (profile.selected_payment_id) {
				this.selectedPaymentId = profile.selected_payment_id
			}
		},

		async updateProfile({ name, surname, phone }) {
			if (!this.authStore.user || !this.authStore.user.id) {
				throw new Error("User is not authorized")
			}

			const { data: updatedProfile, error } = await supabase
				.from('profiles')
				.update({
					name,
					surname,
					phone
				})
				.eq('id', this.authStore.user.id)
				.select()
				.single()

			if (error) throw error
			this.profile = updatedProfile
		},

		async fetchAddresses() {
			if (!this.authStore.user) return
			const { data: addresses, error } = await supabase
				.from('addresses')
				.select('*')
				.eq('user_id', this.authStore.user.id)
			if (error) throw error
			this.addresses = addresses
		},

		async addAddress({ country, city, street, house_number, apt, postcode, phone }) {
			if (!this.authStore.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('addresses')
				.insert([
					{
						user_id: this.authStore.user.id,
						country: country,
						city: city,
						street: street,
						house_number: house_number,
						apt: apt,
						postcode: postcode,
						phone: phone
					}
				])

			if (error) throw error
			await this.fetchAddresses()
		},

		async updateAddress({ id, country, city, street, house_number, apt, postcode, phone }) {
			if (!this.authStore.user || !this.authStore.user.id) {
				throw new Error("User is not authorized")
			}

			if (!id) {
				throw new Error("Address ID is missing")
			}


			const { data, error } = await supabase
				.from('addresses')
				.update({
					country: country,
					city: city,
					street: street,
					house_number: house_number,
					apt: apt,
					postcode: postcode,
					phone: phone
				})
				.eq('id', id)

			if (error) throw error
			await this.fetchAddresses()
		},

		async deleteAddress(id) {
			const { error } = await supabase
				.from('addresses')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.addresses = this.addresses.filter(address => address.id !== id)
		},

		async fetchPaymentMethods() {
			if (!this.authStore.user) return
			const { data: paymentMethods, error } = await supabase
				.from('payment_methods')
				.select('*')
				.eq('user_id', this.authStore.user.id)
			if (error) throw error
			this.paymentMethods = paymentMethods
		},

		async addPaymentMethod({ number, holder_name, expiration_date, cvv }) {
			if (!this.authStore.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('payment_methods')
				.insert([
					{
						user_id: this.authStore.user.id,
						number: number,
						holder_name: holder_name,
						expiration_date: expiration_date,
						cvv: cvv
					}
				])

			if (error) throw error
			await this.fetchPaymentMethods()
		},

		async deletePaymentMethod(id) {
			const { error } = await supabase
				.from('payment_methods')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.paymentMethods = this.paymentMethods.filter(method => method.id !== id)
		},

		async updateSelectedMetadata({ addressId, paymentId }) {
			if (!this.authStore.user) return

			const updateData = {}
			if (addressId) updateData.selected_address_id = addressId
			if (paymentId) updateData.selected_payment_id = paymentId

			const { data, error } = await supabase
				.from('profiles')
				.update(updateData)
				.eq('id', this.authStore.user.id)
				.select()
				.single()

			if (error) {
				console.error("Supabase Error:", error.message)
				throw error
			}

			if (data) {
				this.profile = data

				if (addressId) this.selectedAddressId = addressId
				if (paymentId) this.selectedPaymentId = paymentId
			}
		},
	}
})
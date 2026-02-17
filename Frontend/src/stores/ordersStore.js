import {defineStore} from 'pinia'
import {useAuthStore} from './authStore'
import {useProfileStore} from './profileStore'
import { supabase } from '../supabase'

export const useOrdersStore = defineStore('orders', {
	state: () => ({
		orders: [],
		cartTotal: 0,
		authStore: useAuthStore(),
		profile: useProfileStore()
	}),
	actions: {
		async createOrder(payload) {

			if (!this.authStore.user || !this.authStore.user.id) throw new Error("Log in to place an order")
			if (!this.profile.selectedAddressId || !this.profile.selectedPaymentId) {
				throw new Error("Select address and payment method")
			}

			const cartTotal = payload?.cartTotal || 0


			const { data, error } = await supabase
				.from('orders')
				.insert({
					user_id: this.authStore.user.id,
					customer_name: this.profile.name,
					customer_surname: this.profile.surname,
					address_id: this.profile.selectedAddressId,
					payment_id: this.profile.selectedPaymentId,
					items: this.cartItems,
					total_price: cartTotal,
					status: 'pending'
				})
				.select()
				.single()

			this.cartTotal = cartTotal

			if (error) throw error

			const { error: cartError } = await supabase
				.from('cart')
				.delete()
				.eq('user_id', this.authStore.user.id)

			if (cartError) throw cartError

			this.cartItems = []
			this.cartTotal = 0

			return data
		},

		async fetchOrders() {
			if (!this.authStore.user) return
			const { data: orders, error } = await supabase
				.from('orders')
				.select('*')
				.eq('user_id', this.authStore.user.id)
			if (error) throw error
			this.orders = orders
		}
	}

})
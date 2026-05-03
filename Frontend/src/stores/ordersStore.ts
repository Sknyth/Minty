import {defineStore} from 'pinia'
import {useAuthStore} from './authStore'
import {useProfileStore} from './profileStore'
import { supabase } from '../supabase'
import { useCartStore } from './cartStore'
import type { Order } from '@/types'

export const useOrdersStore = defineStore('orders', {
	state: () => ({
		orders: [] as Order[],
		cartTotal: 0,
	}),
	actions: {
		async createOrder(payload: { cartTotal: number }) {
			const authStore = useAuthStore()
			const profileStore = useProfileStore()
			const cartStore = useCartStore()

			if (!authStore.user || !authStore.user.id) throw new Error("Log in to place an order")
			if (!profileStore.selectedAddressId || !profileStore.selectedPaymentId) {
				throw new Error("Select address and payment method")
			}

			const cartTotal = payload?.cartTotal || 0

			const { data, error } = await supabase
				.from('orders')
				.insert({
					user_id: authStore.user.id,
					customer_name: profileStore.profile?.name,
					customer_surname: profileStore.profile?.surname,
					email: authStore.user.email,
					address_id: profileStore.selectedAddressId,
					payment_id: profileStore.selectedPaymentId,
					items: cartStore.cartItems,
					total_price: cartTotal,
					status: 'pending'
				})
				.select()
				.single()
				
				if (error) throw error
				
				this.cartTotal = cartTotal
				
			const { error: cartError } = await supabase
				.from('cart')
				.delete()
				.eq('user_id', authStore.user.id)

			if (cartError) throw cartError

			cartStore.cartItems = []
			cartStore.cartTotal = 0

			return data as Order
		},

		async fetchOrders() {
			const authStore = useAuthStore()
			if (!authStore.user) return
			const { data, error } = await supabase
				.from('orders')
				.select('*')
				.eq('user_id', authStore.user.id)
			if (error) throw error
			this.orders = data as Order[]
		}
	}

})
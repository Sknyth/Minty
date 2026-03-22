import {defineStore} from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [],
		cartTotal: 0,
		quantity: 1,
		orderAccess: false,
		authStore: useAuthStore(),
	}),
	actions: {
		async fetchCart() {
			if (!this.authStore.user) return
			const { data: cart, error } = await supabase
				.from('cart')
				.select('*')
				.eq('user_id', this.authStore.user.id)
			if (error) throw error
			this.cartItems = cart
		},

		async addToCart({ image_url, name, price, description, size, quantity }) {
			if (!this.authStore.user) throw new Error('User not authenticated')

			const { error } = await supabase
				.from('cart')
				.insert([
					{
						user_id: this.authStore.user.id,
						image_url: image_url,
						name: name,
						price: price,
						description: description,
						size: size,
						quantity: quantity || 1
					}
				])

			if (error) throw error
			this.fetchCart()
		},

		async removeFromCart(id) {
			const { error } = await supabase
				.from('cart')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.cartItems = this.cartItems.filter(item => item.id !== id)
		},

		async updateQuantity({ id, quantity }) {
			const { error } = await supabase
				.from('cart')
				.update({ quantity: quantity })
				.eq('id', id)
			if (error) throw error
			const item = this.cartItems.find(i => i.id === id)
			if (item) {
				item.quantity = quantity
			}
		},
	}
})
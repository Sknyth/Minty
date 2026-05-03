import {defineStore} from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'
import type { CartItem, CartItemUpdate } from '@/types'

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [] as CartItem[],
		cartTotal: 0,
		quantity: 1 ,
		orderAccess: false,
		authStore: useAuthStore(),
	}),
	getters: {
    isInCart: (state) => (item: CartItem) => {
      return state.cartItems.some((i: CartItem) => i.name === item.name && i.size === item.size)
    }
  },
	actions: {
		async fetchCart() {
			if (!this.authStore.user) return
			const { data, error } = await supabase
				.from('cart')
				.select('*')
				.eq('user_id', this.authStore.user.id)
			if (error) throw error
			this.cartItems = data as CartItem[]
		},

		async addToCart({ image_url, name, price, description, size, quantity }: CartItem) {
			if (!this.authStore.user) throw new Error('You are not logged in')

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

		async removeFromCart(id: string) {
			const { error } = await supabase
				.from('cart')
				.delete()
				.eq('id', id)
			if (error) throw error
			this.cartItems = this.cartItems.filter(item => item.id !== id)
		},

		async updateQuantity({ id, quantity }: CartItemUpdate) {
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
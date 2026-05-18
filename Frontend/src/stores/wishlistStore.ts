import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import type { Wishlist } from '@/types'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: [] as Wishlist[],
    loading: false,
  }),
  getters: {
    isInWishlist: (state) => (productId: number) => {
      return state.wishlist.some((item: Wishlist) => item.productId === productId)
    }
  },
  actions: {
    async fetchWishlist() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      this.loading = true

      const res = await fetch(`http://localhost:3000/wishlist/${authStore.user.id}`, {
				headers: {
					Authorization: `Bearer ${authStore.access_token}`,
				},
			})

      this.wishlist = await res.json()
      this.loading = false
    },

    async addToWishlist(productId: number) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')
      this.loading = true

      const req = await fetch(`http://localhost:3000/wishlist/add/${authStore.user.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({
					productId
      }),
			})
			if (!req.ok) throw new Error('Failed to add to wishlist')

      await this.fetchWishlist() 
      
      this.loading = false
    },


    async deleteFromWishlist(productId: number) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')

      this.loading = true

      const req = await fetch(`http://localhost:3000/wishlist/remove/${authStore.user.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authStore.access_token}`,
				},
				body: JSON.stringify({
					productId
				})
			})
			if (!req.ok){   
        throw new Error('Failed to remove from wishlist')
      } 

      this.wishlist = this.wishlist.filter(
        item => item.productId !== productId
      )
      
      this.loading = false
    }
  }
})
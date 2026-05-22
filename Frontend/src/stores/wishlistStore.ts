import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import type { Wishlist } from '@/types'
import { API_URL } from '@/api/config'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: [] as Wishlist[],
    loading: false,
    error: false
  }),
  getters: {
    isInWishlist: (state) => (productId: number) => {
      return state.wishlist.some((item: Wishlist) => item.productId === productId)
    }
  },
  actions: {
    async fetchWishlist() {
      this.loading = true
      this.error = false

      try {
        const authStore = useAuthStore()
        if (!authStore.user) return
  
        const res = await fetch(`${API_URL}/wishlist/${authStore.user.id}`, {
          headers: {
            Authorization: `Bearer ${authStore.access_token}`,
          },
        })
  
        if(!res.ok) {
          this.error = true
          return
        }

        this.wishlist = await res.json()

      } finally {
        this.loading = false
      }
    },

    async addToWishlist(productId: number) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')

      const req = await fetch(`${API_URL}/wishlist/add/${authStore.user.id}`, {
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
      
    },

    async deleteFromWishlist(productId: number) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')

      const req = await fetch(`${API_URL}/wishlist/remove/${authStore.user.id}`, {
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
    }
  }
})
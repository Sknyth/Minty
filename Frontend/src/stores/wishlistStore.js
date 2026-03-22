import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlistProducts: [],
    loading: false,
		authStore: useAuthStore()
  }),

  getters: {
    isInWishlist: (state) => (productId) => {
      return state.wishlistProducts.some(item => item.product_id === productId)
    }
  },

  actions: {
    async fetchWishlist() {
      if (!this.authStore.user) return

      this.loading = true

      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', this.authStore.user.id)

      if (error) throw error

      this.wishlistProducts = data
      this.loading = false
    },

    async addToWishlist(productId) {
      if (!this.authStore.user) return

      this.loading = true

      const { error } = await supabase
        .from('wishlist')
        .insert([{ user_id: this.authStore.user.id, product_id: productId }])

      if (error) {
        this.loading = false
        throw error
      }

      await this.fetchWishlist() 
      
      this.loading = false
    },


    async deleteFromWishlist(productId) {
      if (!this.authStore.user) return

      this.loading = true

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .match({ user_id: this.authStore.user.id, product_id: productId })

      if (error) {
        this.loading = false
        throw error
      }

      this.wishlistProducts = this.wishlistProducts.filter(
        item => item.product_id !== productId
      )
      
      this.loading = false
    }
  }
})
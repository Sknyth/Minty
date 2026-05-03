import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useAuthStore } from './authStore'
import type { WishlistItem } from '@/types'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlistProducts: [] as WishlistItem[],
    loading: false,
  }),
  getters: {
    isInWishlist: (state) => (productId: string) => {
      return state.wishlistProducts.some((item: WishlistItem) => item.product_id === productId)
    }
  },
  actions: {
    async fetchWishlist() {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')

      this.loading = true

      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', authStore.user.id)

      if (error) throw error

      this.wishlistProducts = data as WishlistItem[]
      this.loading = false
    },

    async addToWishlist(productId: string) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')
      this.loading = true

      const { error } = await supabase
        .from('wishlist')
        .insert([{ user_id: authStore.user.id, product_id: productId }])

      if (error) {
        this.loading = false
        throw error
      }

      await this.fetchWishlist() 
      
      this.loading = false
    },


    async deleteFromWishlist(productId: string) {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('You are not logged in')

      this.loading = true

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .match({ user_id: authStore.user.id, product_id: productId })

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
<script lang="ts">
import { useToast } from "vue-toastification"
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
// import { useWishlistStore } from '../stores/wishlistStore'
import type { CartItemInput, Product } from '../types'
import Card from './Card.vue'

export default {
  components: { Card },
  setup() {
      const toast = useToast()
      // const wishlistStore = useWishlistStore()
      const cartStore = useCartStore()
      const productsStore = useProductsStore()
      const authStore = useAuthStore()
      productsStore.fetchProducts()
      // if (authStore.isAuth) {
      //   wishlistStore.fetchWishlist()
      // }

      return { toast, productsStore, cartStore, authStore }
  },
  methods: {
    async addToCart(product: Product) {
      try{
          const cartProduct: CartItemInput = { 
          product_id: product.id,
          size: product.sizes[0],
          quantity: 1
        }
        const existingItem = this.cartStore.isInCart(cartProduct.product_id, cartProduct.size)
        if(existingItem){
          await this.cartStore.updateQuantity({
            id: existingItem.id,
            quantity: existingItem.quantity + 1
          })
          this.toast.success('Product added to your cart!')  
          return
        }else {
          await this.cartStore.addToCart({
            ...cartProduct     
          })
          this.toast.success('Product added to your cart!')
        }

      } catch(e){   
        this.toast.error("Error: " + (e as Error).message)
      }
    },
    // async toggleWishlist(productID: string) {
    //   try {
    //     if (this.wishlistStore.isInWishlist(productID)) {
    //       await this.wishlistStore.deleteFromWishlist(productID)
    //       this.toast.success('Product removed from wishlist!')
    //     } else {
    //       await this.wishlistStore.addToWishlist(productID)
    //       this.toast.success('Product added to your wishlist!') 
    //     }
    //   } catch(e) {
    //     if((e as Error).message === 'duplicate key value violates unique constraint "wishlist_user_id_product_id_key"'){
    //       this.toast.error("Error: Already in wishlist")
    //       return
    //     }
    //     this.toast.error("Error: " + (e as Error).message)

    //   }
    // }
  },
}
</script>

<template>
	<div class="container-xxl mt-4">
		<div class="products-layout">
				<Card
					v-for="product in productsStore.products"
					:key="product.id"
					:image_url="product.image_url"
					:name="product.name"
					:price="product.price"
          :id="product.id"
					@add-to-cart="() => addToCart(product)"
					class="custom-card"
          />
        </div>
      </div>
      <!-- @toggle-wishlist="toggleWishlist" -->
    </template>

<style scoped>
.products-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px); 
  justify-content: center; 
  gap: 14px;
  margin: 0 auto;
}
</style>
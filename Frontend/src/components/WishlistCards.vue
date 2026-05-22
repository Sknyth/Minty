<script lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import Card from './Card.vue'
import type { CartItemInput, Product } from '../types'

export default {
  components: { Card },
  setup() {
      const toast = useToast()
      const wishlistStore = useWishlistStore()
      const cartStore = useCartStore()
      const productsStore = useProductsStore()

      return { toast, productsStore, cartStore, wishlistStore }
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
    async toggleWishlist(productID: number) {
      try {
        if (this.wishlistStore.isInWishlist(productID)) {
          await this.wishlistStore.deleteFromWishlist(productID)
          this.toast.success('Product removed from wishlist!')
        } else {
          await this.wishlistStore.addToWishlist(productID)
          this.toast.success('Product added to your wishlist!') 
        }
      } catch(e) {
        this.toast.error("Error: " + (e as Error).message)
      }
    },
  },
  computed: {
    favoriteProducts() {
      const favIds = this.wishlistStore.wishlist.map((item: { productId: number }) => item.productId)

      return this.productsStore.products.filter((product: Product) => 
        favIds.includes(product.id)
      )
    }
  }
}
</script>

<template>
	<div class="container-xxl mt-4">
    <div v-if="wishlistStore.loading" class="loading-state text-center p-5">
      <div class="spinner-border"></div>
      <p>Loading wishlist data...</p>
    </div>
		<div v-else class="products-layout">
				<Card
					v-for="product in favoriteProducts"
					:key="product.id"
					:image_url="product.image_url"
					:name="product.name"
					:price="product.price"
          :id="product.id"
					@add-to-cart="() => addToCart(product)"
          @toggle-wishlist="toggleWishlist"
					class="custom-card d-inline-block"
				/>
		</div>
	</div>
</template>

<style>
.products-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px); 
  justify-content: center; 
  gap: 14px;
  margin: 0 auto;
}
</style>


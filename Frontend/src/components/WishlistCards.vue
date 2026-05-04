<script lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import Card from './Card.vue'
import type { CartItem, Product } from '../types'

export default {
  components: { Card },
  setup() {
      const toast = useToast()
      const wishlistStore = useWishlistStore()
      const cartStore = useCartStore()
      const productsStore = useProductsStore()
      productsStore.fetchProducts()
      wishlistStore.fetchWishlist()

      return { toast, productsStore, cartStore, wishlistStore }
  },
  methods: {
    async addToCart(product: Product) {
      try{
        const cartProduct: CartItem = { ...product, size: product.sizes[0], quantity: 1, user_id: '' }
        const existingItem = this.cartStore.isInCart(cartProduct)
        if(existingItem){
          await this.cartStore.updateQuantity({
            id: existingItem.id,
            quantity: existingItem.quantity + 1
          })
        }
        else {
          await this.cartStore.addToCart({
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            description: product.description,
            size: product.sizes[0]      
          })
        }
        this.toast.success('Product added to your cart!')
      } catch(e){
        if((e as Error).message === 'User not authenticated'){
          this.toast.error("Error: " + 'You are not logged in')
          return
        }    
        this.toast.error("Error: " + (e as Error).message)
      }
    },
    async toggleWishlist(productID: string) {
      try {
        if (this.wishlistStore.isInWishlist(productID)) {
          await this.wishlistStore.deleteFromWishlist(productID)
          this.toast.success('Product removed from wishlist!')
        } else {
          await this.wishlistStore.addToWishlist(productID)
          this.toast.success('Product added to your wishlist!') 
        }
      } catch(e) {
        if((e as Error).message === 'duplicate key value violates unique constraint "wishlist_user_id_product_id_key"'){
          this.toast.error("Error: Already in wishlist")
          return
        }
        this.toast.error("Error: " + (e as Error).message)
      }
    },
  },
  computed: {
    favoriteProducts() {
      const favIds = this.wishlistStore.wishlistProducts.map((item: { product_id: string }) => item.product_id)

      return this.productsStore.products.filter((product: Product) => 
        favIds.includes(product.id)
      )
    }
  }
}
</script>

<template>
	<div class="container-xxl mt-4">
		<div class="products-layout">
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

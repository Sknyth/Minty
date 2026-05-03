<script lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import Card from './Card.vue'

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
    async addToCart(product: object) {
      try{
        const cartProduct = { ...product, size: product.sizes[0]}
        const existingItem: boolean = this.cartStore.isInCart(cartProduct)
        if(existingItem){
          await this.cartStore.updateQuantity({
            id: existingItem.id as number,
            quantity: existingItem.quantity + 1 as number 
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
        this.toast.error("Error: " + e.message)
      }
    },
    async toggleWishlist(productID) {
      try {
        if (this.wishlistStore.isInWishlist(productID)) {
          await this.wishlistStore.deleteFromWishlist(productID)
          this.toast.success('Product removed from wishlist!')
        } else {
          await this.wishlistStore.addToWishlist(productID)
          this.toast.success('Product added to your wishlist!') 
        }
      } catch(e) {
        if(e.message === 'duplicate key value violates unique constraint "wishlist_user_id_product_id_key"'){
          this.toast.error("Error: Already in wishlist")
          return
        }
        this.toast.error("Error: " + e.message)

      }
    }
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
          @toggle-wishlist="toggleWishlist"
					class="custom-card"
				/>
		</div>
	</div>
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
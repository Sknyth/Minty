<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import type { CartItemInput, Product } from '../types'
import Card from './Card.vue'

const toast = useToast()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()

const addToCart = async (product: Product) => {
  try {
    const cartProduct: CartItemInput = {
      product_id: product.id,
      size: product.sizes[0],
      quantity: 1
    }
    const existingItem = cartStore.isInCart(cartProduct.product_id, cartProduct.size)
    if (existingItem) {
      await cartStore.updateQuantity({
        id: existingItem.id,
        quantity: existingItem.quantity + 1
      })
      toast.success('Product added to your cart!')
      return
    } else {
      await cartStore.addToCart({ ...cartProduct })
      toast.success('Product added to your cart!')
    }
  } catch (e) {
    toast.error("Error: " + (e as Error).message)
  }
}

const toggleWishlist = async (productID: number) => {
  try {
    if (wishlistStore.isInWishlist(productID)) {
      await wishlistStore.deleteFromWishlist(productID)
      toast.success('Product removed from wishlist!')
    } else {
      await wishlistStore.addToWishlist(productID)
      toast.success('Product added to your wishlist!')
    }
  } catch (e) {
    toast.error("Error: " + (e as Error).message)
  }
}

const favoriteProducts = computed(() => {
  const favIds = wishlistStore.wishlist.map((item: { productId: number }) => item.productId)
  return productsStore.products.filter((product: Product) => favIds.includes(product.id))
})
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
  padding-bottom: 150px;
}
</style>


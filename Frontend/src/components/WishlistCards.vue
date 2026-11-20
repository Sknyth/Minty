<script setup lang="ts">
import { computed } from 'vue'
import { useProductActions } from '../composables/useProductActions'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import Card from './Card.vue'

const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()
const { addProductToCart, toggleWishlist } = useProductActions()

const favoriteProducts = computed(() => {
  const favIds = new Set(wishlistStore.wishlist.map(item => item.productId))
  return productsStore.products.filter(product => favIds.has(product.id))
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
					@add-to-cart="addProductToCart(product.id, product.sizes[0])"
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


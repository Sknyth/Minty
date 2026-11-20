<script setup lang="ts">
import { watch } from 'vue'
import { useProductActions } from '../composables/useProductActions'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import type { Product } from '../types'
import Card from './Card.vue'

defineProps<{ products: Product[] }>()

const authStore = useAuthStore()
const cartStore = useCartStore()
const { addProductToCart, toggleWishlist } = useProductActions()

watch(
  () => authStore.user,
  async (user) => {
    if (user) await cartStore.fetchCart()
  },
  { immediate: true }
)
</script>

<template>
  <div class="products-layout">
    <Card
      v-for="product in products"
      :key="product.id"
      :image_url="product.image_url"
      :name="product.name"
      :price="product.price"
      :id="product.id"
      @add-to-cart="addProductToCart(product.id, Number(product.sizes[0]))"
      @toggle-wishlist="toggleWishlist"
    />
  </div>
</template>

<style scoped>
.products-layout {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 2vw, 24px);
}

@media (max-width: 1000px) {
  .products-layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .products-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

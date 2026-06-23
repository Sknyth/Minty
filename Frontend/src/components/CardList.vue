<script setup lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useProductsStore } from '../stores/productsStore'
import { useWishlistStore } from '../stores/wishlistStore'
import type { CartItemInput, Product } from '../types'
import Card from './Card.vue'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'


const toast = useToast()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const authStore = useAuthStore()


watch(
  () => authStore.user,
  async (user) => {
    if (user) await cartStore.fetchCart()
  },
  { immediate: true }
)

const addToCart = async (product: Product) => {
  try {
    const cartProduct: CartItemInput = { 
      product_id: product.id,
      size: Number(product.sizes[0]),
      quantity: 1
    }

    const existingItem = cartStore.isInCart(
      cartProduct.product_id,
      cartProduct.size
    )

    if (existingItem) {
      await cartStore.updateQuantity({
        id: existingItem.id,
        quantity: existingItem.quantity + 1
      })
    } else {
      await cartStore.addToCart(cartProduct)
    }

    toast.success('Product added to your cart!')
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
      } catch(e) {
        toast.error("Error: " + (e as Error).message)
      }
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
					@add-to-cart="addToCart(product)"
					class="custom-card"
          @toggle-wishlist="toggleWishlist"
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
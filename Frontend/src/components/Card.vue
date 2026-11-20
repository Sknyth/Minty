<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWishlistStore } from '../stores/wishlistStore'

const props = defineProps<{
  image_url: string | null
  name: string
  price: number
  id: number
}>()

const emit = defineEmits<{
  'add-to-cart': []
  'toggle-wishlist': [id: number]
}>()

const wishlistStore = useWishlistStore()
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.id))
const failedImage = ref<string | null>(null)
const formatPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
</script>

<template>
  <article class="product-card">
    <RouterLink :to="{ name: 'Item', params: { id } }" class="product-link">
      <div class="product-image">
        <img
          v-if="image_url && image_url !== failedImage"
          :src="image_url"
          alt=""
          loading="lazy"
          decoding="async"
          @error="failedImage = image_url"
        />
        <i v-else class="bi bi-image" aria-hidden="true"></i>
      </div>
      <h3>{{ name }}</h3>
    </RouterLink>

    <button
      type="button"
      class="wishlist-btn"
      :class="{ saved: isInWishlist }"
      :aria-pressed="isInWishlist"
      :aria-label="`Save ${name} to wishlist`"
      @click="emit('toggle-wishlist', id)"
    >
      <i :class="isInWishlist ? 'bi bi-heart-fill' : 'bi bi-heart'" aria-hidden="true"></i>
    </button>

    <div class="product-actions">
      <p class="item-price">{{ formatPrice.format(price) }}</p>
      <button
        type="button"
        class="add-to-cart-btn"
        :aria-label="`Add ${name} to cart`"
        @click="emit('add-to-cart')"
      >
        <i class="bi bi-bag-plus" aria-hidden="true"></i>
        <span>Add to cart</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--minty-line);
  border-radius: 18px;
  background: white;
  padding: 8px;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.product-card:focus-within,
.product-card:hover {
  border-color: #a6baaa;
  box-shadow: 0 12px 30px #182c2010;
}

.product-link {
  display: block;
  border-radius: 12px;
  color: var(--minty-ink);
}

.product-link h3 {
  margin: 14px 8px 7px;
  font-size: clamp(0.96rem, 1.5vw, 1.13rem);
  font-weight: 650;
  line-height: 1.28;
  overflow-wrap: anywhere;
}

.product-link:hover h3 {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.product-image {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1.12;
  overflow: hidden;
  border-radius: 12px;
  background: #ecf0e9;
  color: var(--minty-muted);
  font-size: 1.8rem;
}

.product-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  transition: transform 240ms ease;
}

.product-card:hover img {
  transform: scale(1.04);
}

.wishlist-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--minty-line);
  border-radius: 100%;
  background: white;
  color: var(--minty-ink);
}

.wishlist-btn:hover {
  background: var(--color2);
}

.wishlist-btn.saved {
  color: #a13e50;
}

.product-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 10px;
  margin-top: auto;
  padding: 0 8px 8px;
}

.item-price {
  margin: 0;
  color: var(--color1);
  font-size: 1.04rem;
  font-weight: 700;
}

.add-to-cart-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 7px 11px;
  border: 0;
  border-radius: 100px;
  background: #edf3e7;
  color: var(--color1);
  font-size: 0.84rem;
  font-weight: 650;
  transition: background 160ms ease, color 160ms ease;
}

.add-to-cart-btn:hover {
  background: var(--color1);
  color: white;
}

@media (max-width: 540px) {
  .product-card {
    padding: 6px;
    border-radius: 14px;
  }

  .product-image {
    border-radius: 9px;
  }

  .wishlist-btn {
    top: 10px;
    right: 10px;
  }

  .product-actions {
    padding-inline: 6px;
  }

  .add-to-cart-btn {
    width: 100%;
  }
}
</style>

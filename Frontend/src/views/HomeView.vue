<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Criteria, Product } from '../types'
import CardList from '../components/CardList.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { useProductsStore } from '../stores/productsStore'

const route = useRoute()
const productStore = useProductsStore()
const sortOption = ref<Criteria>('standard')

const activeQuery = computed(() => typeof route.query.q === 'string' ? route.query.q.trim() : '')

const loadProducts = () => productStore.searchProducts(activeQuery.value)
watch(activeQuery, loadProducts, { immediate: true })

const sortBy: Record<Criteria, (a: Product, b: Product) => number> = {
  standard: (a, b) => a.id - b.id,
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
}

const sortedProducts = computed(() => [...productStore.products].sort(sortBy[sortOption.value]))
</script>

<template>
  <div class="storefront">
    <Header />

    <main class="store-shell storefront-main">
      <section id="catalog" class="catalog" aria-labelledby="catalog-title">
        <div class="catalog-heading">
          <div>
            <h1 id="catalog-title">Sneakers</h1>
            <p class="catalog-count" aria-live="polite">
              <template v-if="!productStore.loading && !productStore.error">
                {{ sortedProducts.length }} {{ sortedProducts.length === 1 ? 'style' : 'styles' }}
                <template v-if="activeQuery"> for “{{ activeQuery }}”</template>
              </template>
            </p>
          </div>

          <label class="sort-control">
            <span>Sort by</span>
            <select v-model="sortOption" name="sort">
              <option value="standard">Default</option>
              <option value="price-low">Lowest price</option>
              <option value="price-high">Highest price</option>
              <option value="name">Name</option>
            </select>
            <i class="bi bi-chevron-down" aria-hidden="true"></i>
          </label>
        </div>

        <div v-if="productStore.loading" class="catalog-state" role="status">
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span>Loading sneakers…</span>
        </div>
        <div v-else-if="productStore.error" class="catalog-state" role="status">
          <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
          <p>We couldn’t load the sneakers. Please try again.</p>
          <button type="button" class="button-color1" @click="loadProducts()">
            Try again
          </button>
        </div>
        <div v-else-if="!productStore.products.length" class="catalog-state" role="status">
          <i class="bi bi-search" aria-hidden="true"></i>
          <p>No sneakers found.</p>
        </div>
        <CardList
          v-show="!productStore.loading && !productStore.error && sortedProducts.length > 0"
          :products="sortedProducts"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.storefront-main {
  padding-block: clamp(20px, 3vw, 42px) clamp(48px, 7vw, 96px);
}

.catalog {
  scroll-margin-top: 96px;
}

.catalog-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.catalog-heading > div {
  min-width: 0;
}

.catalog-heading h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.05;
}

.catalog-count {
  min-height: 1.4em;
  margin: 5px 0 0;
  overflow-wrap: anywhere;
  color: var(--minty-muted);
  font-size: 0.92rem;
}

.sort-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-inline-start: 14px;
  background: white;
  border: 1px solid var(--minty-line);
  border-radius: 100px;
  color: var(--minty-muted);
  font-size: 0.85rem;
}

.sort-control select {
  appearance: none;
  padding: 10px 32px 10px 4px;
  border: 0;
  border-radius: 100px;
  background: transparent;
  color: var(--minty-ink);
  font-size: inherit;
  font-weight: 650;
  cursor: pointer;
}

.sort-control i {
  position: absolute;
  right: 13px;
  pointer-events: none;
}

.catalog-state {
  min-height: 180px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 12px;
  padding: 24px;
  border: 1px solid var(--minty-line);
  border-radius: 18px;
  background: white;
  color: var(--minty-muted);
  text-align: center;
}

.catalog-state p {
  margin: 0;
}

@media (max-width: 680px) {
  .catalog-heading {
    gap: 10px 14px;
    margin-bottom: 14px;
  }
}
</style>

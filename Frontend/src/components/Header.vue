<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const routeQuery = computed(() => typeof route.query.q === 'string' ? route.query.q : '')
const searchQuery = ref(routeQuery.value)
const catalogQuery = () => {
  const query = searchQuery.value.trim()
  return query ? { q: query } : {}
}

watch(routeQuery, (query) => {
  if (searchQuery.value.trim() !== query) searchQuery.value = query
})

const searchCatalog = (event: Event) => {
  if (route.name !== 'HomeView' || (event as InputEvent).isComposing) return

  searchQuery.value = (event.target as HTMLInputElement).value
  return submitSearch()
}

const submitSearch = () => {
  const destination = { name: 'HomeView', query: catalogQuery() }
  if (route.name === 'HomeView') {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return router.replace(destination)
  }

  return router.push(destination)
}
</script>

<template>
  <header class="store-header" :class="{ 'catalog-header': route.name === 'HomeView' }">
    <div class="store-shell header-layout">
      <RouterLink to="/" class="store-brand" aria-label="Minty home">
        <span class="brand-mark"><i class="bi bi-leaf-fill" aria-hidden="true"></i></span>
        Minty
      </RouterLink>

      <form class="store-search" role="search" @submit.prevent="submitSearch">
        <button type="submit" aria-label="Search catalog">
          <i class="bi bi-search" aria-hidden="true"></i>
        </button>
        <input
          v-model="searchQuery"
          name="q"
          type="search"
          aria-label="Search sneakers"
          placeholder="Search sneakers"
          @input="searchCatalog"
        />
      </form>

      <nav class="header-actions" aria-label="Store navigation">
        <RouterLink to="/wishlist" aria-label="Wishlist" title="Wishlist">
          <i class="bi bi-heart" aria-hidden="true"></i>
        </RouterLink>
        <RouterLink
          :to="authStore.user ? '/profile' : '/login'"
          :aria-label="authStore.user ? 'Profile' : 'Sign in'"
          :title="authStore.user ? 'Profile' : 'Sign in'"
        >
          <i class="bi bi-person" aria-hidden="true"></i>
        </RouterLink>
        <RouterLink to="/cart" aria-label="Cart" title="Cart">
          <i class="bi bi-bag" aria-hidden="true"></i>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.store-header {
  background: white;
  border-bottom: 1px solid var(--minty-line);
}

.catalog-header {
  position: sticky;
  top: 0;
  z-index: 20;
}

.header-layout {
  display: grid;
  grid-template-columns: 1fr minmax(190px, 420px) 1fr;
  align-items: center;
  min-height: 74px;
  gap: 20px;
}

.store-search {
  display: flex;
  align-items: center;
  border: 1px solid var(--minty-line);
  border-radius: 100px;
  background: var(--minty-paper);
}

.store-search:focus-within {
  outline: 2px solid var(--color1);
  outline-offset: 2px;
}

.store-search button {
  display: grid;
  place-items: center;
  flex: 0 0 42px;
  min-height: 42px;
  border: 0;
  border-radius: 100px;
  background: transparent;
  color: var(--color1);
}

.store-search input {
  width: 100%;
  min-width: 0;
  padding: 8px 14px 8px 0;
  border: 0;
  background: transparent;
  color: var(--minty-ink);
  box-shadow: none;
}

.store-search input::-webkit-search-cancel-button {
  cursor: pointer;
}

.store-search input::placeholder {
  color: var(--minty-muted);
}

.header-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.header-actions a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--minty-line);
  border-radius: 50%;
  color: var(--minty-ink);
  font-size: 1.16rem;
  transition: background 160ms ease, border-color 160ms ease;
}

.header-actions a:hover,
.header-actions a.router-link-exact-active {
  border-color: var(--color2);
  background: var(--color2);
}

@media (max-width: 680px) {
  .catalog-header {
    /* Keep the search row visible once the brand and navigation scroll away. */
    top: -56px;
  }

  .header-layout {
    grid-template-columns: 1fr auto;
    gap: 10px 12px;
    padding-block: 10px 12px;
  }

  .store-search {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}

@media (max-width: 360px) {
  .header-actions {
    gap: 4px;
  }
}
</style>

<script>
import { useAuthStore } from '../stores/authStore'
import { useProductsStore } from '../stores/productsStore'
import { useProfileStore } from '../stores/profileStore'
export default {
	setup() {
		const profileStore = useProfileStore()
		const authStore = useAuthStore()
		const productsStore = useProductsStore()

		return { profileStore, authStore, productsStore }
	},
	data() {
		return {
			searchQuery: '',
		}
	},
}
</script>

<template>
	<header class="header bg-color1">
		<div class="container d-flex align-items-center justify-content-between">
			<RouterLink to="/" class="logo text-decoration-none color2"
				>Minty</RouterLink
			>

			<div class="search-box">
				<input type="text" placeholder="Search..." v-model="searchQuery" @keyup.enter="productsStore.searchProducts(searchQuery)"/>
				<button @click="productsStore.searchProducts(searchQuery)">Search</button>
			</div>

			<div class="social-links">
				<RouterLink to="/wishlist">
					<img src="/favorite(heart).svg" alt=""/>
				</RouterLink>

				<RouterLink v-if="!authStore.user" to="/login"><img src="/login.svg" alt="" /></RouterLink>
				<RouterLink v-else to="/profile"><img src="/login.svg" alt="" /></RouterLink>

				<RouterLink to="/cart"><img src="/cart.svg" alt="" /></RouterLink>
			</div>
		</div>
	</header>
</template>

<style scoped>
.header {
	height: 84px;
	padding: 12px 0;
}
.search-box input {
	width: 600px;
	height: 40px;
	padding: 4px 8px;
	border: 2px solid var(--color2);
	border-radius: 5px 0 0 5px;
	outline: none;
}
.search-box button {
	background-color: var(--color2);
	color: var(--color1);
	border: 2px solid var(--color2);
	border-radius: 0 5px 5px 0;
	padding: 0 16px;
	height: 40px;
	transition: 0.3s all ease;
}
.search-box button:hover {
	opacity: 0.8;
}
.social-links {
	display: flex;
	gap: 25px;
}
.social-links img:hover {
	opacity: 0.8;
}
@media (max-width: 1000px) {
	.search-box input {
		width: 300px;
	}
}
@media (max-width: 768px) {
	.header {
		height: auto;
		padding: 12px;
	}
	.container {
		flex-direction: column;
		gap: 12px;
		padding: 12px;
	}
	.search-box input {
		width: 260px;
	}
}
</style>

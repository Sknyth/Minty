<script lang="ts">
import type { Criteria } from '../types'
import CardList from '../components/CardList.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { useProductsStore } from '../stores/productsStore'

export default {
	components: { Header, Footer, CardList },
	setup() {
		const productStore = useProductsStore()
		productStore.fetchProducts()

		return { productStore }
	},
	data() {
		return {
			sortOption: 'standard' as Criteria
		}
	},
	methods: {
		async sortProducts() {
			await this.productStore.sortProducts(this.sortOption)
		}
	}
}
</script>

<template>
	<main>
		<Header />
		<div class="container mt-4">
			<div class="d-flex justify-content-end"> 
				<div class="custom-sort position-relative align-items-center d-inline-flex">
					<span class="label position-absolute pe-none text-secondary">Sort by:</span>
					<select name="sort" id="sort" class="custom-select" v-model="sortOption" @change="sortProducts">
						<option value="standard">Standard</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="name">Name</option>
					</select>
				</div>
			</div>
		</div>
		<CardList />
		<Footer />
	</main>
</template>

<style scoped>
.custom-sort .label {
	z-index: 1;
	white-space: nowrap;
	left: 12px;
}

.custom-select {
  padding: 8px 12px 8px 70px;
	outline: none;
	appearance: none;
	cursor: pointer;
}
</style>
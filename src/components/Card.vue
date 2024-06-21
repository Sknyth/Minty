<script lang="ts">
export default {
	props: {
		imageURL: String,
		title: String,
		price: Number,
	},
}
</script>

<template>
	<div class="container">
		<div class="card">
			<img :src="imageURL" class="card-img-top" alt="" />
			<div class="card-body">
				<h5 class="card-title">{{ title }}</h5>
				<p class="card-text">${{ price }}</p>
				<button class="button-color1">Add to cart</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
button {
	width: 100%;
}
</style>

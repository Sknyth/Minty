<script lang="ts">
export default {
	props: {
		imageURL: String,
		title: String,
		price: Number,
		id: [Number, String]
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.title, this.price, this.imageURL);
		},
	},
}
</script>

<template>
	<div class="container">
		<div class="card">
			<router-link :to="{ name: 'Item', params: { id: id } }">
				<img :src="imageURL" class="card-img-top" alt="" />
				<div class="card-body">
					<h5 class="card-title">{{ title }}</h5>
					<p class="card-text">${{ price }}</p>
				</div>
			</router-link>

			<button @click="addToCart" class="button-color1">Add to cart</button>
		</div>
	</div>
</template>

<style scoped>
.card{
	width: 230px;
	height: 440px;
	margin-top: 10px;
}
button {
	width: 100%;
	margin-top: auto;
}
img {
	height: 300px;
}
</style>

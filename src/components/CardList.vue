<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<div class="card-deck">
					<Card
						v-for="item in items"
						:key="item.id"
						:imageURL="item.imageURL"
						:title="item.title"
						:price="item.price"
						class="custom-card d-inline-block"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Card from './Card.vue'

export default {
	components: {
		Card,
	},
	computed: {
		items() {
			return this.$store.state.items
		},
	},
	mounted() {
		if (this.$store) {
			this.$store.dispatch('fetchItems')
		} else {
			console.error('Store is not available')
		}
	},
}
</script>

<style>
.custom-card {
	width: 250px;
	height: 450px;
	margin-top: 10px;
}
</style>

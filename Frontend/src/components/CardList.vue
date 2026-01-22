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
						@add-to-cart="addToCart"
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
  components: { Card },

  computed: {
    items() {
      return this.$store.state.items
    },
    cartItems() {
      return this.$store.state.cartItems
    }
  },

  mounted() {
    this.$store.dispatch('fetchItems')
  },

  methods: {
    addToCart(title, price, imageURL, size) {
      this.$store.commit('ADD_TO_CART', {
        title,
        price,
        imageURL,
        size
      })
    }
  }
}
</script>


<style>
.custom-card {
	width: 250px;
	height: 450px;
	margin-top: 10px;
}
</style>

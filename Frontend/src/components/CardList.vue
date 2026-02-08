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
						@add-to-cart="addToCart(item)"
						class="custom-card d-inline-block"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useToast } from "vue-toastification"
import { mapActions, mapGetters } from 'vuex'
import Card from './Card.vue'

export default {
  components: { Card },
  setup() {
      const toast = useToast();
      return { toast }
  },
  computed: {
    items() {
      return this.$store.state.items
    },
    ...mapGetters({
      cartItems: 'cartItems'
    })
  },
  methods: {
      ...mapActions(['addToCart']),
      async addToCart(item) {
        try{
          await this.$store.dispatch('addToCart', {
            title: item.title,
            price: item.price,
            imageURL: item.imageURL,
          })
          this.toast.success("Product added!")
        } catch(e){
          alert(e)
          console.error(e)
        }
      }
    },
  mounted() {
    this.$store.dispatch('fetchItems')
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

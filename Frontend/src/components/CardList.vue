<script>
import { useToast } from "vue-toastification"
import { useProductsStore } from '../stores/ProductStore'
import { useCartStore } from '../stores/cartStore'
import Card from './Card.vue'

export default {
  components: { Card },
  setup() {
      const toast = useToast()

      const productsStore = useProductsStore()
      productsStore.fetchProducts()

      const cartStore = useCartStore()


      return { toast, productsStore, cartStore }
  },
  methods: {
      async addToCart(item) {
        try{
          await this.cartStore.addToCart({
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            description: item.description,
            size: item.sizes[0]      
          })
          this.toast.success('Product added!')
        } catch(e){
          if(e.message === 'User not authenticated'){
            this.toast.error("Error: " + 'You are not logged in')
            return
          }
            
          this.toast.error("Error: " + e.message)
        }
      }
    },

  
}
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col">
					<Card
						v-for="product in productsStore.products"
						:key="product.id"
						:image_url="product.image_url"
						:name="product.name"
						:price="product.price"
            :id="product.id"
						@add-to-cart="() => addToCart(product)"
						class="custom-card d-inline-block"
					/>

			</div>
		</div>
	</div>
</template>

<style>
.custom-card {
  width: auto;
	margin-top: 10px;
}
</style>

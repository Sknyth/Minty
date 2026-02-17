<script>
import { useToast } from "vue-toastification"
import { useItemsStore } from '../stores/itemsStore'
import { useCartStore } from '../stores/cartStore'
import Card from './Card.vue'

export default {
  components: { Card },
  setup() {
      const toast = useToast()

      const itemsStore = useItemsStore()
      itemsStore.fetchItems()

      const cartStore = useCartStore()


      return { toast, itemsStore, cartStore }
  },
  methods: {
      async addToCart(item) {
        try{
          await this.cartStore.addToCart({
            title: item.title,
            price: item.price,
            imageURL: item.imageURL,
            size: item.size?.[0] || null          
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
						v-for="item in itemsStore.items"
						:key="item.id"
						:imageURL="item.imageURL"
						:title="item.title"
						:price="item.price"
            :id="item.id"
						@add-to-cart="() => addToCart(item)"
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

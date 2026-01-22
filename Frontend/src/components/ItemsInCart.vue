<template>
  <div>
    <ItemInCart 
    v-for="item in cartItems" :key="item.id" 
    :title="item.title"
    :price="item.price"
    :imageURL="item.imageURL"
    :size="item.size"
    :id="item.id"
    @remove-item="removeItem"
    />
    </div>
</template>

<script>
import ItemInCart from './ItemInCart.vue';

export default {
    components: { ItemInCart },
    computed: {
        cartItems() {
        return this.$store.getters.cartItems
        }
    },
    methods: {
        removeItem(id) {
            this.$store.commit('REMOVE_FROM_CART', id);
        },
}
    }
</script>

<style scoped>

</style>
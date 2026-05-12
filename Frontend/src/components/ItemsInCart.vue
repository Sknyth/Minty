<script lang="ts">
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import type { CartItem } from '../types'

export default {
    setup() {
        const toast = useToast()

        const cartStore = useCartStore()
        cartStore.fetchCart()

        return { toast, cartStore }

    },
    methods: {
        async updateQuantity(item: CartItem) {
            try{
                await this.cartStore.updateQuantity({ 
                    id: item.id, 
                    quantity: item.quantity + 1 
                })
            } catch(e){
            if((e as Error).message === 'User not authenticated'){
                this.toast.error("Error: " + 'You are not logged in')
                return
            }
            this.toast.error("Error: " + (e as Error).message)
            }
        },

        async decreaseQuantity(item: CartItem) {
            if (item.quantity > 1) {
                try {
                    await this.cartStore.updateQuantity({ 
                        id: item.id, 
                        quantity: item.quantity - 1 
                    })
                } catch(e) {
                    this.toast.error((e as Error).message);
                }
            } else {
                await this.removeFromCart(item.id);
            }
        },

        async removeFromCart(id: number) {
            if (!id) return
            try{
                await this.cartStore.removeFromCart(id)
                this.toast.success("Product removed!");
            } catch(e) {
                this.toast.error("Error: " + (e as Error).message);
            }
        },
    },
}
</script>

<template>
    <div class="gap-3 d-flex flex-column">
        <div class="item d-flex justify-content-between align-items-center" 
        v-for="item in cartStore.cartItems" :key="item.id">

            <img :src="item.product.image_url ?? undefined" alt="">

            <span class="fw-bold">{{ item.product.name }}</span>

            <span class="fw-bold">size {{ item.size }}</span>
            
            <div>
                <p class="fw-bold">${{ item.product.price }}</p>
                <span>Price for 1 unit.</span>
            </div>

            <div class="count d-flex justify-content-between align-items-center bg-color2">
                <img @click="decreaseQuantity(item)" src="/-.svg" alt="">
                <span class="fw-bold">{{ item.quantity }}</span>
                <img @click="updateQuantity(item)" src="/+.svg" alt="">
            </div>

            <span class="fw-bold">${{ item.product.price * item.quantity }}</span>

            <div class="trash">
                <img @click="removeFromCart(item.id)" src="/trash.svg" alt="">
            </div>
            
        </div>
        <hr/>
    </div>
</template>

<style scoped>
.item {
    margin-right: 40px;
    width: 900px;
    height: 160px;
}
.item img {
    width: 160px;
    height: 160px;
}
.count {
    width: 160px;
    height: 48px;
    border: none;
	border-radius: 10px;
	padding: 10px;
}
.count img {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.trash img {
    height: 24px;
    width: 26px;
    cursor: pointer;
}
@media (max-width: 1399px) {
    .item {
        width: 1100px;
    }
}
@media (max-width: 1199px) {
    .item {
        width: 100%;
    }
}
</style>
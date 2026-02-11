<script>
import { mapActions, mapGetters } from 'vuex'
import { useToast } from "vue-toastification"
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    data(){
        return {
            k: 1
        }
    },
    computed: {
        ...mapGetters({
            cart: 'cartItems'
        })
    },
    methods: {
        ...mapActions(['fetchCart', 'removeFromCart']),

        async removeFromCart(id) {
            try{
                await this.$store.dispatch('removeFromCart', id)
                this.toast.success("Product removed!");
            } catch(e) {
                this.toast.error("Error: " + e.message);
            }
            
        },

        increaseCountItem() {
            this.k++;
        }
    },
    mounted(){
        if (this.$store.state.user) {
        this.fetchCart()
    }
    }
    }
</script>

<template>
    <div class="gap-3 d-flex flex-column">
        <div class="item d-flex justify-content-between align-items-center" 
        v-for="item in cart" :key="item.id">

            <img :src="item.imageURL" alt="">

            <span class="fw-bold">{{ item.title }}</span>

            <span class="fw-bold">size {{ item.size }}</span>
            
            <div>
                <p class="fw-bold">${{ item.price }}</p>
                <span>Price for 1 unit.</span>
            </div>

            <div class="count d-flex justify-content-between align-items-center bg-color2">
                <img @click="k > 1 ? k-- : removeFromCart(item.id)" src="/public/-.svg" alt="">
                <span class="fw-bold">{{ k }}</span>
                <img @click="increaseCountItem" src="/public/+.svg" alt="">
            </div>

            <span class="fw-bold">${{ item.price*k }}</span>

            <div class="trash">
                <img @click="removeFromCart(item.id)" src="/public/trash.svg" alt="">
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
</style>
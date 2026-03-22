<script>
import { useOrdersStore } from '../stores/ordersStore'
export default {
    setup() {
        const ordersStore = useOrdersStore()
        return { ordersStore }
    },
    async mounted() {
        this.ordersStore.fetchOrders()
    },
}
</script>

<template>
    <h2>Order history</h2>

    <div v-for="order in ordersStore.orders" :key="order.id">
        <div class="d-flex justify-content-between align-items-center mt-3 p-3 order-card">
            <div>
            <h4>Order #{{ order.id.slice(0, 8) }}</h4>
            <p>{{ order.created_at.slice(0, 10) }}</p>
        </div>
        

        <div v-if="order.status === 'delivered'" class="status-delivered" >{{ order.status }}</div>
        <div v-else-if="order.status === 'pending'" class="status-pending" >{{ order.status }}</div>
        <div v-else-if="order.status === 'cancelled'" class="status-canceled" >{{ order.status }}</div>
        
        <h5 class="color1">{{ order.total_price }}$</h5>
        </div>
        
    </div>
    
</template>

<style scoped>
.order-card {
    border: 1px solid #c1c1c1;
    border-radius: 8px;
}
.status-delivered {
    background-color: #D4EDDA;
    color: #155724;
    padding: 5px 10px;
    border-radius: 20px;
    text-transform: capitalize;
}
.status-pending {
    background-color: #FFF3CD;
    color: #856404;
    padding: 5px 10px;
    border-radius: 20px;
    text-transform: capitalize;
}
.status-canceled {
    background-color: #F8D7DA;
    color: #721C24;
    padding: 5px 10px;
    border-radius: 20px;
    text-transform: capitalize;
}
</style>
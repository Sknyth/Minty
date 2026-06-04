<script setup lang="ts">
import { useOrdersStore } from '../stores/ordersStore'

const ordersStore = useOrdersStore()
ordersStore.fetchOrders()

</script>

<template>
    <div>
        <h2>Order history</h2>

        <div v-if="ordersStore.loading" class="loading-state text-center p-5">
          <div class="spinner-border"></div>
          <p>Loading orders data...</p>
        </div>

        <div v-else-if="ordersStore.error">
            <p class="text-center">Something went wrong 😕</p>
        </div>

        <div v-else-if="!ordersStore.orders.length">
            <p class="text-center">You don't have orders</p>
        </div>

        <div v-else v-for="order in ordersStore.orders.sort((a,b) => b.id - a.id)" :key="order.id">

            <div class="d-flex justify-content-between align-items-center mt-3 p-3 order-card">
                <div>
                    <h4>Order #{{ order.id }}</h4>
                    <p>{{ order.created_at.slice(0, 10) }}</p>
                </div>
            

            <div v-if="order.status === 'delivered'" class="status-delivered" >{{ order.status }}</div>
            <div v-else-if="order.status === 'pending'" class="status-pending" >{{ order.status }}</div>
            <div v-else-if="order.status === 'cancelled'" class="status-canceled" >{{ order.status }}</div>
            
            <h5 class="color1">{{ order.total_price }}$</h5>
            </div>
            
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

.no-orders {
  padding: 0;
  margin: 20px 0;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .order-card {
    padding: 16px 12px !important;
    flex-wrap: wrap;
  }

  .order-card h4 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .order-card p {
    font-size: 14px;
  }

  .order-card h5 {
    font-size: 16px;
  }

  .status-delivered,
  .status-pending,
  .status-canceled {
    padding: 6px 12px;
    font-size: 12px;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .order-card {
    padding: 12px 10px !important;
    flex-direction: column !important;
    margin: 12px 0 !important;
    gap: 10px;
  }

  .order-card > div {
    width: 100%;
  }

  .order-card h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }

  .order-card p {
    font-size: 13px;
    margin: 4px 0;
  }

  .order-card h5 {
    font-size: 14px;
    margin: 8px 0 0 0;
  }

  .status-delivered,
  .status-pending,
  .status-canceled {
    display: inline-block;
    padding: 6px 10px;
    font-size: 11px;
  }

  h2 {
    font-size: 18px;
  }
}

@media (max-width: 360px) {
  .order-card {
    padding: 10px 8px !important;
  }

  .order-card h4 {
    font-size: 14px;
  }

  .order-card p {
    font-size: 12px;
  }

  .order-card h5 {
    font-size: 13px;
  }

  .status-delivered,
  .status-pending,
  .status-canceled {
    padding: 4px 8px;
    font-size: 10px;
  }

  h2 {
    font-size: 16px;
  }
}
</style>
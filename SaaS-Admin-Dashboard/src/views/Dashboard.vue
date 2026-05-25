<script setup lang="ts">
import EarningChart from '../components/EarningsChart.vue'
import OrdersChart from '../components/OrdersChart.vue'
import NavBar from '../components/NavBar.vue'
import ProductsChart from '../components/ProductsChart.vue'
import { useUsersStore } from '../stores/userStore'
import { useOrdersStore } from '../stores/orderStore'

const userStore = useUsersStore()
const ordersStore = useOrdersStore()
ordersStore.fetchOrders()
userStore.fetchUsers()

</script>

<template>
  <NavBar>
    <h2 class="mb-4">Dashboard</h2>

    <div class="d-flex flex-column gap-4">
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <EarningChart />
        </div>
        <div class="col-12 col-md-4">
          <OrdersChart />
        </div>
        <div class="col-12 col-md-4">
          <ProductsChart />
        </div>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-6">
          <div class="table-card">
            <h6 class="table-card__title">Recent orders</h6>
            <div
              v-for="order in [...ordersStore.orders].sort((a, b) => b.id - a.id).slice(0, 4)"
              :key="order.id"
              class="table-row"
            >
              <span class="row-id">#{{ order.id }}</span>
              <span class="row-name">{{ order.customerName }} {{ order.customerSurname }}</span>
              <span :class="['status-badge', order.status]">{{ order.status }}</span>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <div class="table-card">
            <h6 class="table-card__title">New users</h6>
            <div
              v-for="user in [...userStore.users].sort((a,b) => b.id - a.id).slice(0, 4)"
              :key="user.id"
              class="table-row"
            >
              <span class="row-id">#{{ user.id }}</span>
              <div class="user-avatar">{{ user.name.charAt(0) }}{{ user.surname?.charAt(0) }}</div>
              <span class="row-name">{{ user.name }} {{ user.surname }}</span>
              <span :class="['status-badge', user.role]">{{ user.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NavBar>
</template>

<style scoped>
.table-card {
  background: #ffffff;
  border: 1px solid rgba(134, 134, 149, 0.15);
  border-radius: 18px;
  padding: 1.75rem 2rem;
}

.table-card__title {
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: var(--color3);
}

.table-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(134, 134, 149, 0.08);
  transition: background 0.2s;
}

.table-row:last-child {
  border-bottom: none;
}

.row-id {
  color: var(--color3);
  width: 48px;
  flex-shrink: 0;
  font-size: 14px;
}

.row-name {
  flex: 1;
  font-weight: 500;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color1);
  color: #fff;

  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-transform: uppercase;
}

.status-badge {
  font-size: 14px;
  padding: 4px 14px;
  border-radius: 99px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

.status-badge.delivered {
  background: #d4edda;
  color: #155724;
}

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.status-badge.user {
  background: #cfe2ff;
  color: #084298;
}

.status-badge.admin {
  background: #f8d7da;
  color: #721c24;
}
</style>
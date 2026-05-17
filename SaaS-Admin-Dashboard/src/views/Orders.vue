<script lang="ts">
import { useToast } from "vue-toastification"
import NavBar from '../components/NavBar.vue'
import { useOrdersStore } from '../stores/orderStore'
import type { Order } from '../types'

export default {
  components: { NavBar },
  setup() {
    const ordersStore = useOrdersStore()
    const toast = useToast()

    ordersStore.fetchOrders()

    return { ordersStore, toast }
  },
  data() {
    return {
      orderSearchQuery: ''
    }
  },

  methods: {
    onStatusChange(orderId: number, event: Event) {
      const target = event.target as HTMLSelectElement;
      
      const newStatus = target.value as Order['status'];
      
      this.handleStatusChange(orderId, newStatus);
    },
    async handleStatusChange(orderId: number, newStatus: Order['status']) {
      try {
        await this.ordersStore.updateOrderStatus(orderId, newStatus)
        this.toast.success(`Order updated to ${newStatus}`)
      } catch (error) {
        this.toast.error('Failed to update: ' + (error as Error).message)
        this.ordersStore.fetchOrders()
      }
    }
  }
}
</script>

<template>
  <NavBar>
    <div class="header-section d-flex align-items-center mb-4 row gap-3">
      <div class="header-start col-lg">
        <h2 class="fw-bold">Orders Management</h2>
      </div>

      <div class="header-main col-lg">
        <input type="text" placeholder="Search..." class="custom-input mb-3" @keyup="ordersStore.searchOrders(orderSearchQuery)"  v-model="orderSearchQuery"  />
        
      </div>
      <div class="header-end d-flex col-lg gap-3">
        <div class="stats-mini d-flex">
          <span class="text-muted">Total records:</span> 
          <span class="fw-bold color1 ms-1">{{ ordersStore.orders.length }}</span>
        </div>
      </div>
    </div>

    
    
    <div class="panel shadow-sm p-0 overflow-hidden">
      <div class="table-responsive">
        <table class="custom-table w-full">
          <thead>
            <tr>
              <th class="px-4 py-3">Order ID</th>
              <th class="px-4 py-3">Customer</th>
              <th class="px-4 py-3 text-center">Total</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-end">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr 
            v-for="order in ordersStore.orders" :key="order.id" 
            class="table-row"
            style="cursor: pointer"
            @click="$router.push({ name: 'OrderInfo', params: { id: order.id } })">
              <!-- <td class="px-4 py-3 fw-bold">#{{ order.id.slice(0, 8) }}</td> -->
              <td class="px-4 py-3 fw-bold">#{{ order.id }}</td>
              <td class="px-4 py-3">
                <div class="d-flex flex-column">
                  <span class="fw-bold">{{ order.customerName }} {{ order.customerSurname }}</span>
                  <span class="text-muted small">{{ order.customerEmail }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-center fw-bold color1">
                ${{ order.total_price }}
              </td>
              <td class="px-3 py-2 text-center">
                <div>
                  <select 
                  :value="order.status" 
                  @click.stop
                  :class="['status-select-custom', order.status.toLowerCase()]"
                  @change="onStatusChange(order.id, $event)"
                    class="text-center">
                    <option class="text-center" value="pending">Pending</option>
                    <option class="text-center" value="delivered">Delivered</option>
                    <option class="text-center" value="cancelled">Cancelled</option>
                    </select>
                    <i class="bi bi-chevron-down select-icon"></i>
                </div>
              </td>
              <td class="px-4 py-3 text-end text-muted small">
                {{ order.created_at ? new Date(order.created_at).toLocaleDateString() : '—' }}
              </td>
            </tr>
            <tr v-if="ordersStore.orders.length === 0">
              <td colspan="5" class="text-center py-5 text-muted">
                No orders found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NavBar>
</template>

<style scoped>
.header-section {
  justify-content: space-between;
}

.header-end {
  justify-content: end;
  align-items: end;
  flex-direction: column;
}

.custom-input {
  width: 100%;
}

.panel {
  background: #ffffff;
  border: 1px solid rgba(134, 134, 149, 0.15);
  border-radius: 18px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table thead {
  background: #f8fafb;
  border-bottom: 1px solid rgba(134, 134, 149, 0.1);
}

.custom-table th {
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color3);
}

.table-row {
  transition: background 0.2s ease;
  border-bottom: 1px solid rgba(134, 134, 149, 0.05);
}

.table-row:hover {
  background: rgba(45, 138, 114, 0.03);
}

.table-row:last-child {
  border-bottom: none;
}

.select-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  pointer-events: none;
  opacity: 0.6;
}

@media(max-width: 991px){
  .header-start, .header-main {
    text-align: center;
  }
  .custom-input {
    width: 50%;
  }
  .header-section {
    justify-content: center;
  }
  .header-end {
    align-items: center;
    justify-content: center;
  }
}
</style>
<script lang="ts">
import NavBar from '../components/NavBar.vue'
import { useOrdersStore } from '../stores/orderStore'
import { useStatStore } from '../stores/statStore'
import { useToast } from "vue-toastification"
import type { Order } from '../types'

export default {
	components: { NavBar },
	setup() {
		const ordersStore = useOrdersStore()
		const statStore = useStatStore()
		const toast = useToast()

		return { ordersStore, statStore, toast }
	},
	computed: {
		currentOrder() {
      const id = this.$route.params.id
      return this.ordersStore.orders.find(order => String(order.id) === String(id))
    },
	},
	async mounted() {
		if (this.currentOrder) {
			await this.statStore.fetchAddress(this.currentOrder.address_id)
			await this.statStore.fetchPayment(this.currentOrder.payment_id)
		}
	},
	methods: {
		onStatusChange(orderId: string, event: Event) {
			const target = event.target as HTMLSelectElement;
			
			const newStatus = target.value as Order['status'];
			
			this.handleStatusChange(orderId, newStatus);
		},
		async handleStatusChange(orderId: string, newStatus: Order['status']) {
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
	<div v-if="currentOrder" class="order-container">
		<div class="order-header d-flex justify-content-between align-items-start">
			<div>
				<h2 class="fw-bold mb-2">Order #{{ currentOrder.id.slice(0, 8) }}</h2>
				<p class="text-muted">Created on {{ currentOrder.created_at ? new Date(currentOrder.created_at).toLocaleDateString() : '—' }}</p>
			</div>
			<span class="status-badge fw-bold status-box" :class="['status-select-custom', currentOrder.status.toLowerCase()]">{{ currentOrder.status }}</span>
		</div>

		<hr>

		<div class="row g-4 mt-2">
			<div class="col-lg-6">
				<div class="info-card h-100">
					<h5 class="fw-bold mb-3">Customer Information</h5>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Name:</span>
						<span class="value">{{ currentOrder.customer_name }} {{ currentOrder.customer_surname }}</span>
					</div>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Email:</span>
						<span class="value">{{ currentOrder.email }}</span>
					</div>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Address:</span>
						<span class="value text-end">
								{{ statStore.address?.street }} {{ statStore.address?.house_number }}
								<span>, apt. {{ statStore.address?.apt }}</span>
								<br>
								{{ statStore.address?.city }}, {{ statStore.address?.postcode }}
								<br>
								{{ statStore.address?.country }}
						</span>
					</div>
				</div>
			</div>

			<div class="col-lg-6">
				<div class="info-card h-100">
					<h5 class="fw-bold mb-3">Order Details</h5>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Order ID:</span>
						<span class="value">#{{ currentOrder.id.slice(0, 8) }}</span>
					</div>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Payment Method:</span>
						<span class="value">{{ statStore.payment?.type }}</span>
					</div>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Status:</span>
						<select 
              :value="currentOrder.status" 
              @change="onStatusChange(currentOrder.id, $event)"
              :class="['status-select-custom', currentOrder.status.toLowerCase()]"
              class="text-center"
            >
              <option class="text-center" value="pending">Pending</option>
              <option class="text-center" value="delivered">Delivered</option>
              <option class="text-center" value="cancelled">Cancelled</option>
            </select>
					</div>
					<div class="info-row d-flex justify-content-between">
						<span class="label fw-bold">Created on:</span>
						<span class="value">{{ currentOrder.created_at ? new Date(currentOrder.created_at).toLocaleDateString() : '—' }}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="items-section mt-4">
			<h5 class="fw-bold mb-3">Order Items</h5>
			<div class="table-responsive">
				<table class="items-table w-100">
					<thead>
						<tr>
							<th class="fw-bold">Product</th>
							<th class="fw-bold">Size</th>
							<th class="fw-bold">Quantity</th>
							<th class="fw-bold">Price</th>
							<th class="fw-bold">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in currentOrder.items" :key="item.id">
							<td>
								<div class="product-item d-flex align-items-center gap-3">
									<img :src="item.image_url ?? undefined" alt="Product" class="product-img">
									<div>
										<div class="fw-bold">{{ item.name }}</div>
									</div>
								</div>
							</td>
							<td>{{ item.size }}</td>
							<td>{{ item.quantity }}</td>
							<td>${{ item.price }}</td>
							<td class="fw-bold">${{ item.price * item.quantity }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavBar>
</template>

<style scoped>
.status-badge {
	padding: 8px 16px;
	border-radius: 20px;
	text-transform: uppercase;
}

.status-box {
  box-shadow: none !important;
	cursor: auto !important;
}

.info-card {
	background: white;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	padding: 24px;
}

.info-row {
	padding: 12px 0;
	border-bottom: 1px solid #f5f5f5;
}

.info-row:last-child {
	border-bottom: none;
}

.info-address {
	width: 80%;
}

.items-section {
	background: white;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	padding: 24px;
}

.items-table thead {
	background-color: #f8f9fa;
}

.items-table th {
	padding: 16px;
	border-bottom: 2px solid #e0e0e0;
}

.items-table td {
	padding: 16px;
	border-bottom: 1px solid #f0f0f0;
}

.items-table tbody tr:hover {
	background-color: #fafafa;
}

.product-img {
	width: 50px;
	height: 50px;
	border-radius: 8px;
	object-fit: cover;
	background-color: #f0f0f0;
}

@media (max-width: 768px) {
	.order-header {
		flex-direction: column;
		gap: 16px;
	}

	.items-table {
		font-size: 12px;
	}

	.items-table th,
	.items-table td {
		padding: 12px 8px;
	}
}
</style>
<script lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ProfileAddresses from '../components/ProfileAddresses.vue'
import ProfilePayments from '../components/ProfilePayments.vue'
import ProfilePersInfo from '../components/ProfilePersInfo.vue'
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore'
import { useOrdersStore } from '../stores/ordersStore'
import { useAuthStore } from '../stores/authStore'
import { usePaymentStore } from '../stores/paymentStore'
import { useAddressStore } from '../stores/addressStore'
import type { Order } from '../types'

export default {
	components: { Header, Footer, ProfilePersInfo, ProfileAddresses, ProfilePayments },
	setup() {
		const toast = useToast()
		const cartStore = useCartStore()
		const ordersStore = useOrdersStore()
		const authStore = useAuthStore()
		const paymentStore = usePaymentStore()
		const addressStore = useAddressStore()

		authStore.getUser()
		paymentStore.fetchPayment()
		addressStore.fetchAddress()

		return { toast, cartStore, authStore, ordersStore, paymentStore, addressStore }
  },
	computed: {
		currentPaymentId(): number | null {
			return this.paymentStore.selectedPaymentId
		},
		currentAddressId(): number | null {
			return this.addressStore.selectedAddressId
		},
		totalWithDelivery(): number {
      return this.cartStore.cartItems.reduce(
        (total: number, item: any) => total + (item.product.price * item.quantity), 0) + 12
    }
	},
	methods: {
		async handleConfirmOrder() { 
			try {
				const authStore = useAuthStore()
				if (!authStore.user) throw new Error('You are not logged in')	

				const selectedAddress = this.addressStore.address.find(a => a.id === this.currentAddressId)
				const selectedPayment = this.paymentStore.payment.find(p => p.id === this.currentPaymentId)

				await this.ordersStore.createOrder({ 
					customerName: this.authStore.user?.name,
					customerSurname: this.authStore.user?.surname,
					customerEmail: this.authStore.user?.email,

					shippingStreet: selectedAddress?.street,
					shippingCity: selectedAddress?.city,
					shippingCountry: selectedAddress?.country,
					shippingHouseNumber: selectedAddress?.house_number,
					shippingApt: selectedAddress?.apt,
					shippingPostcode: selectedAddress?.postcode,

					cardNumber: selectedPayment?.number,
					cardHolderName: selectedPayment?.holder_name,
					cardCvv: selectedPayment?.cvv,
					cardExpirationDate: selectedPayment?.expiration_date,
					cardType: selectedPayment?.type,

					items: this.cartStore.cartItems,
					total_price: this.totalWithDelivery,
					status: 'pending',

				} as Order)
				this.ordersStore.fetchOrders()
				this.toast.success(`Order created!`)
				
				this.$router.push('/')
				
			} catch (e) {


				this.toast.error('Error: ' + (e as Error).message)
				}
			}
	},
}
</script>

<template>
	<div>
		<Header />
		<main class="order-page container">
			<div class="order-hero d-flex align-items-center justify-content-between">
				<div class="hero-text">
					<h1 class="fw-bold">Order placement</h1>
					<p class="hero-subtitle color3">
						Complete the form to confirm your delivery details. Your cart is
						almost ready.
					</p>
					<div class="hero-badges d-flex align-items-center">
						<span class="badge-item bg-color2 color1">Fast delivery</span>
						<span class="badge-item bg-color2 color1">Secure payment</span>
						<span class="badge-item bg-color2 color1">Easy returns</span>
					</div>
				</div>
				<div class="hero-card bg-color1 text-white">
					<h3 class="fw-bold">Order summary</h3>
					<div class="summary-row d-flex justify-content-between">
						<p>Items</p>
							<p>${{ cartStore.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0) }}</p>				
						</div>
					<div class="summary-row d-flex justify-content-between">
						<p>Delivery</p>
						<p>$12</p>
					</div>
					<hr class="color2" />
					<div class="summary-total d-flex justify-content-between align-items-center">
						<h4 class="fw-bold">Total</h4>
						<span class=" fw-bold">${{ cartStore.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0) + 12 }}</span>
					</div>
					<button @click="handleConfirmOrder" class="bg-color2 color1 summary-btn">Confirm order</button>
				</div>
			</div>

			<div class="order-body">
				<div class="order-grid">
					<section class="panel">
						<div class="section-head">
							<div>
								<span class="section-kicker">Step 1</span>
								<p class="section-sub color3">
									Add your contact details for the order.
								</p>
							</div>
							<div class="section-tags">
								<span class="tag bg-color2 color1">Required</span>
								<span class="tag bg-color2 color1">Profile</span>
							</div>
						</div>
						<div class="section-body">
							<ProfilePersInfo 
							:componentName="'Contact details'" 
							/>
						</div>
					</section>

					<section class="panel">
						<div class="section-head">
							<div>
								<span class="section-kicker">Step 2</span>
								<p class="section-sub color3">
									Choose where we should deliver your order.
								</p>
							</div>
							<div class="section-tags">
								<span class="tag bg-color2 color1">Editable</span>
								<span class="tag bg-color2 color1">Primary</span>
							</div>
						</div>
						<div class="section-body">
							<ProfileAddresses :componentName="'Delivery address'"  />
						</div>
					</section>

					<section class="panel">
						<div class="section-head">
							<div>
								<span class="section-kicker">Step 3</span>
								<p class="section-sub color3">
									Select your preferred way to pay.
								</p>
							</div>
							<div class="section-tags">
								<span class="tag bg-color2 color1">Secure</span>
								<span class="tag bg-color2 color1">PCI DSS</span>
							</div>
						</div>
						<div class="section-body">
							<ProfilePayments 
							:componentName="'Payment method'" />
						</div>
					</section>
				</div>

				<aside class="side-panel">
					<div class="panel">
						<div class="section-head">
							<div>
								<h3 class="fw-bold">Need help?</h3>
								<p class="section-sub color3">
									Our manager will confirm the order and delivery time with you.
								</p>
							</div>
							<div class="section-tags">
								<span class="tag bg-color2 color1">Support</span>
							</div>
						</div>
						<div class="support-box">
							<p class="fw-bold">Support line</p>
							<p class="color1">+1 (800) 123-4567</p>
						</div>
						<div class="support-box">
							<p class="fw-bold">Email</p>
							<p class="color1">support@minty.com</p>
						</div>
					</div>
				</aside>
			</div>
		</main>
		<Footer />
	</div>
</template>

<style scoped>
.order-page {
	margin-top: 80px;
	margin-bottom: 60px;
}
.order-hero {
	gap: 40px;
	padding: 30px 0;
}
.hero-text {
	max-width: 560px;
}
.hero-subtitle {
	margin-top: 10px;
	font-size: 18px;
	line-height: 1.6;
}
.hero-badges {
	gap: 10px;
	margin-top: 20px;
	flex-wrap: wrap;
}
.badge-item {
	padding: 6px 14px;
	border-radius: 999px;
	font-weight: 600;
	font-size: 14px;
}
.hero-card {
	width: 320px;
	border-radius: 18px;
	padding: 24px;
	box-shadow: 0 16px 40px rgba(45, 138, 114, 0.22);
}
.summary-row {
	margin: 8px 0;
}
.summary-row p {
	margin: 0;
}
.summary-total {
	margin-top: 14px;
}
.summary-btn {
	width: 100%;
	border: none;
	border-radius: 12px;
	height: 46px;
	font-weight: 600;
	margin-top: 18px;
	transition: 0.3s all;
}
.summary-btn:hover {
	opacity: 0.85;
}
.order-body {
	display: grid;
	grid-template-columns: 1fr 300px;
	gap: 30px;
	margin-top: 30px;
}
.order-grid {
	display: grid;
	gap: 24px;
}
.section-head {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 16px;
}
.section-head h3 {
	margin: 0;
}
.section-kicker {
	display: inline-block;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--color1);
	margin-bottom: 6px;
}
.section-sub {
	margin: 0;
	font-size: 14px;
}
.section-tags {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	justify-content: flex-end;
}
.tag {
	padding: 6px 12px;
	border-radius: 999px;
	font-size: 12px;
	font-weight: 600;
}
.section-body {
	margin-top: 18px;
	padding-top: 18px;
	border-top: 1px solid rgba(134, 134, 149, 0.15);
}
.section-body :deep(h2) {
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 16px;
}
.side-panel {
	display: flex;
	flex-direction: column;
	gap: 24px;
}
.support-box {
	margin-top: 16px;
}
.support-box p {
	margin: 0;
}
.side-btn {
	width: 100%;
	border: none;
	border-radius: 12px;
	height: 46px;
	margin-top: 16px;
	font-weight: 600;
}
@media (max-width: 992px) {
	.order-hero {
		flex-direction: column;
		align-items: flex-start;
	}
	.hero-card {
		width: 100%;
	}
	.order-body {
		grid-template-columns: 1fr;
	}
	.side-panel {
		flex-direction: column;
	}
}
</style>

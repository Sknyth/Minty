<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ItemsInCart from '../components/ItemsInCart.vue'
import { useCartStore } from '../stores/cartStore'

const toast = useToast()
const cartStore = useCartStore()
const router = useRouter()

const totalQuantity = computed(() =>
  cartStore.cartItems.reduce((sum: number, item: { quantity: number }) => sum + (item.quantity || 1), 0)
)

const totalPrice = computed((): number =>
  cartStore.cartItems.reduce((sum: number, item: { product: { price: number }, quantity: number }) =>
    sum + (item.product.price * (item.quantity || 1)), 0)
)

const goToCheckout = () => {
  if (cartStore.cartItems.length > 0) {
    cartStore.orderAccess = true
    router.push('/orderPlacement')
  } else {
    toast.error("Cart is empty")
  }
}
</script>

<template>
	<main>
		<Header />
		<div v-if="cartStore.loading" class="loading-state text-center p-5">
      <div class="spinner-border"></div>
      <p>Loading cart data...</p>
    </div>
		<div v-else-if="cartStore.cartItems.length === 0">
			<div class="container d-flex align-items-center justify-content-between">
				<div></div>
				<img
					class="image-container"
					src="/BigCart.png"
					alt=""
				/>

				<div class="text-container text-center d-flex flex-column">
					<h1>Oops... <br />It seems it's still empty here...</h1>

					<div>
						<h3>Your cart is empty</h3>
						<p>
							To make a purchase, please go to the catalog and add selected items
							to your cart.
						</p>
					</div>

					<div class="button-box">
						<RouterLink to="/" class="button-color1"
							>Return to home page</RouterLink
						>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="container align-items-center">
        <div class="top-name d-flex justify-content-between">
            <h1 class="fw-bold">Cart</h1>
            <p>{{ totalQuantity }} products</p>
        </div>
		<div class="cart-wrapper">
			<ItemsInCart class="items-section" />

			<div class="summary-section">
				<div class="summary-card">
					<h2 class="summary-title">Order Summary</h2>
					
					<div class="summary-items">
						<div class="summary-row">
							<span class="summary-label">Subtotal</span>
							<span class="summary-value">${{ totalPrice }}</span>
						</div>
						<div class="summary-row">
							<span class="summary-label">Delivery</span>
							<span class="summary-value">$12</span>
						</div>
						<div class="summary-row">
							<span class="summary-label">Discount</span>
							<span class="summary-value discount">$0</span>
						</div>
					</div>
					
					<div class="summary-divider"></div>
					
					<div class="summary-total">
						<span class="total-label">Total</span>
						<span class="total-value">${{ totalPrice + 12 }}</span>
					</div>
					
					<RouterLink @click="goToCheckout" to="/orderPlacement" class="checkout-btn">
						Place an order
					</RouterLink>
					
					<div class="consent-section">
						<input class="consent-checkbox" type="checkbox" name="agree" id="agree" />
						<label for="agree" class="consent-text">
							By clicking "Place Order", you consent to the processing of <a href="#">personal data</a>
						</label>
					</div>
				</div>
			</div>
		</div>
		</div>
		<Footer />
	</main>
</template>

<style scoped>
.container {
	margin-top: 80px;
	padding-bottom: 150px;
}

.top-name {
    width: 156px;
    margin-bottom: 24px;
}

.top-name h1 {
	font-size: 28px;
	font-weight: 700;
	margin: 0;
}

.top-name p {
	font-size: 14px;
	color: #666;
	margin: 0;
}

.cart-wrapper {
	display: flex;
	gap: 24px;
	align-items: flex-start;
}

.items-section {
	flex: 1;
}

.summary-section {
	flex: 0 0 320px;
	position: sticky;
	top: 100px;
}

.summary-card {
	background: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-title {
	font-size: 18px;
	font-weight: 700;
	color: #333;
	margin: 0 0 20px 0;
}

.summary-items {
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-bottom: 16px;
}

.summary-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
}

.summary-label {
	color: #666;
	font-weight: 500;
}

.summary-value {
	color: #333;
	font-weight: 600;
}

.summary-value.discount {
	color: #4caf50;
}

.summary-divider {
	height: 1px;
	background: #e0e0e0;
	margin: 16px 0;
}

.summary-total {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 16px;
	border-bottom: 2px solid #f0f0f0;
}

.total-label {
	font-size: 16px;
	font-weight: 600;
	color: #333;
}

.total-value {
	font-size: 24px;
	font-weight: 700;
	color: var(--color1);
}

.checkout-btn {
	display: block;
	width: 100%;
	padding: 14px 16px;
	background: var(--color1);
	color: white;
	text-align: center;
	text-decoration: none;
	border-radius: 8px;
	font-weight: 600;
	font-size: 15px;
	transition: background 0.3s ease, transform 0.2s ease;
	border: none;
	cursor: pointer;
	margin-bottom: 16px;
}

.checkout-btn:hover {
	background: #239b7d;
	transform: translateY(-2px);
}

.consent-section {
	display: flex;
	gap: 8px;
	align-items: flex-start;
}

.consent-checkbox {
	width: 16px;
	height: 16px;
	margin-top: 2px;
	cursor: pointer;
	flex-shrink: 0;
}

.consent-text {
	font-size: 12px;
	color: #666;
	cursor: pointer;
	line-height: 1.4;
}

.consent-text a {
	color: var(--color1);
	text-decoration: none;
	font-weight: 600;
}

.consent-text a:hover {
	text-decoration: underline;
}

.image-container {
	margin-right: auto;
	margin-top: auto;
}

.text-container {
	margin-top: 60px;
	gap: 25px;
}

.text-container p {
	margin: 0 auto;
}

.button-box {
	margin-top: 30px;
}

@media (max-width: 768px) {
	.container {
		margin-top: 60px;
		padding: 0 20px 120px 20px;
	}

	.top-name {
		width: 100%;
		font-size: 18px;
	}

	.top-name h1 {
		font-size: 22px;
	}

	.cart-wrapper {
		flex-direction: column;
		gap: 20px;
	}

	.items-section {
		width: 100%;
	}

	.summary-section {
		flex: 1;
		width: 100%;
		position: static;
	}

	.summary-card {
		padding: 20px;
	}

	.summary-title {
		font-size: 16px;
		margin-bottom: 16px;
	}

	.total-value {
		font-size: 20px;
	}

	.checkout-btn {
		padding: 12px 16px;
		font-size: 14px;
	}

	.image-container {
		max-width: 300px;
		width: 100%;
	}

	.text-container {
		margin-top: 40px;
	}

	.text-container h1 {
		font-size: 24px;
	}

	.text-container h3 {
		font-size: 18px;
	}

	.text-container p {
		font-size: 14px;
	}
}

@media (max-width: 480px) {
	.container {
		margin-top: 40px;
		padding: 0 12px 120px 12px;
	}

	.top-name {
		width: 100%;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 16px;
	}

	.top-name h1 {
		font-size: 20px;
		margin: 0;
	}

	.top-name p {
		font-size: 13px;
		margin: 0;
	}

	.cart-wrapper {
		flex-direction: column;
		gap: 12px;
	}

	.summary-section {
		width: 100%;
		position: static;
	}

	.summary-card {
		padding: 16px;
	}

	.summary-title {
		font-size: 15px;
		margin-bottom: 14px;
	}

	.summary-row {
		font-size: 13px;
	}

	.summary-total {
		margin-bottom: 16px;
		padding-bottom: 12px;
	}

	.total-label {
		font-size: 14px;
	}

	.total-value {
		font-size: 18px;
	}

	.checkout-btn {
		padding: 12px;
		font-size: 13px;
		margin-bottom: 12px;
	}

	.consent-checkbox {
		width: 14px;
		height: 14px;
	}

	.consent-text {
		font-size: 11px;
	}

	.image-container {
		display: none;
	}

	.text-container {
		width: 100% !important;
		margin-top: 20px;
	}

	.text-container h1 {
		font-size: 20px;
		line-height: 1.4;
	}

	.text-container h3 {
		font-size: 16px;
	}

	.text-container p {
		font-size: 13px;
		width: 100%;
	}

	.button-box {
		margin-top: 20px;
		width: 100%;
	}

	.button-box a {
		display: block;
		padding: 12px;
		text-align: center;
	}

	.top-name h1 {
		font-size: 20px;
	}
	.top-name p {
		font-size: 13px;
	}
	.d-flex.row {
		flex-direction: column;
	}
	.total-box {
		padding: 16px;
	}
	.btn-order {
		height: 44px;
		font-size: 14px;
	}
}

.btn-order:hover {
	opacity: 0.8;
}
</style>

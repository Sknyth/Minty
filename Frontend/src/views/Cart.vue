<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import CartSummary from '../components/CartSummary.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ItemsInCart from '../components/ItemsInCart.vue'
import { CART_DELIVERY_FEE, useCartStore } from '../stores/cartStore'

const toast = useToast()
const cartStore = useCartStore()
const router = useRouter()

const totalQuantity = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
)

const totalPrice = computed(() =>
  cartStore.cartItems.reduce((sum, item) => sum + item.product.price * (item.quantity || 1), 0)
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

				<CartSummary
					:subtotal="totalPrice"
					:delivery="CART_DELIVERY_FEE"
					@checkout="goToCheckout"
				/>
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

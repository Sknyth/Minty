<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ItemsInCart from '../components/ItemsInCart.vue'
import { useToast } from "vue-toastification"
import { useCartStore } from '../stores/cartStore.ts'

export default {
	components: { Header, Footer, ItemsInCart },
	setup() {
				const toast = useToast()
				const cartStore = useCartStore()
				cartStore.fetchCart()

				return { toast, cartStore }
		},
	computed: {
			totalQuantity() {
				return this.cartStore.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
			},
			totalPrice() {
				return this.cartStore.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
			}
  },
	
	methods: {
		goToCheckout() {
    if (this.cartStore.cartItems.length > 0) {
      this.cartStore.orderAccess = true
      this.$router.push('/orderPlacement')
    } else {
      this.toast.error("Cart is empty")
    }
  }
	}
}
</script>

<template>
	<main>
		<Header />
		<div v-if="cartStore.cartItems.length === 0">
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
		<div v-else-if="cartStore.cartItems" class="container align-items-center">
        <div class="top-name d-flex justify-content-between">
            <h1 class="fw-bold">Cart</h1>
            <p v-if="cartStore.totalQuantity === 1"> {{ totalQuantity }} product</p>
            <p v-else>{{ totalQuantity }} products</p>
        </div>
		<div class="d-flex row">
			<ItemsInCart class="col-xl" />

			<div class="total-box bg-color1 justify-content-between d-flex flex-column col-xl mb-5 mt-3">
				<div class="text-white">
					<div class="d-flex justify-content-between">
						<p>Delivery:</p>
						<p>$12</p>
  				</div>
					
					<div class="d-flex justify-content-between">
						<p>Discount:</p>
						<p>$0</p>
					</div>
				</div>

				<hr class="color2" />

				<h3 class="fw-bold text-white">Total:<br>
					<span class=" fw-bold">${{ totalPrice + 12 }}</span>
				</h3>

				<RouterLink to="/orderPlacement" class="bg-color2 color1 btn-order d-flex justify-content-center align-items-center">Place an order</RouterLink>


				<div class="d-flex align-items-center text-white">
					<input class="agree" type="checkbox" name="agree" />
					<p class="fs-6 ">By clicking the "Place Order" button, you consent to the processing of <a href="#">personal data.</a></p>
				</div>
				
			</div>
		</div>
		
		</div>
		<!-- <div v-else class="loading-state text-center p-5">
			<div class="spinner-border"></div>
			<p>Loading products data...</p>
		</div> -->
		<Footer />
	</main>
</template>

<style scoped>
.container {
	margin-top: 80px;
}
.top-name {
    width: 156px;
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

.total-box {
	border-radius: 10px;
	padding: 24px;
}

.btn-order {
	width: 100%;
	height: 48px;
	border: none;
	border-radius: 10px;
	margin-top: 20px;
	cursor: pointer;
}
.btn-order:hover {
	opacity: 0.8;
}
</style>

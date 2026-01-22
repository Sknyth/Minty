<script lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ItemsInCart from '../components/ItemsInCart.vue';


export default {
	components: { Header, Footer, ItemsInCart },
	computed: {
        cartItems() {
        return this.$store.getters.cartItems
        }
    },
}
</script>

<template>
	<main>
		<Header />
		<div v-if="cartItems.length === 0">
			<div class="container d-flex align-items-center justify-content-between">
				<div></div>
				<img
					class="image-container position-absolute"
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
            <p v-if="this.cartItems.length === 1"> {{ this.cartItems.length }} product</p>
            <p v-else>{{ this.cartItems.length }} products</p>
        </div>
		<div class="d-flex">
			<ItemsInCart />

			<div class="total-box bg-color1 justify-content-between">
				<div class="text-white">
					<div class="d-flex justify-content-between">
						<p>1 item total amount:</p>
						<p>$100.00</p>
					</div>
					
					<div class="d-flex justify-content-between">
						<p>Discounted amount:</p>
						<p>$100.00</p>
					</div>
				</div>

				<hr class="color2" />

				<h3 class="fw-bold text-white">Total:<br>
					<span class=" fw-bold">${{ cartItems.reduce((total, item) => total + item.price, 0) }}</span>
				</h3>

				<button class="bg-color2 color1 btn-order">Place an order</button>


				<div class="d-flex align-items-center justify-content-between text-white">
					<input class="agree" type="checkbox" name="agree" />
					<p class="fs-6 ">By clicking the "Place Order" button, you consent to the processing of <a href="#">personal data.</a></p>
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
}
.top-name {
    width: 156px;
}
.image-container {
	top: 45%;
	transform: translateY(-50%);
}

.text-container {
	width: 578px;
	margin-top: 85px;
	gap: 25px;
}
.text-container p {
	width: 400px;
	margin: 0 auto;
}
.button-box {
	margin-top: 30px;
}

.total-box {
	height: auto;
	width: 300px;
	border-radius: 10px;
	padding: 24px;
	margin-left: auto;
}
.total-box p {
	margin: 4px;
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

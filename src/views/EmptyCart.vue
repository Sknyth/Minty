<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
</script>

<template>
	<main>
		<Header />
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
		<Footer />
	</main>
</template>

<style scoped>
.image-container {
	top: 45%;
	transform: translateY(-50%);
}

.text-container {
	width: 578px;
	margin-top: 165px;
	gap: 25px;
}
.text-container p {
	width: 400px;
	margin: 0 auto;
}
.button-box {
	margin-top: 30px;
}
</style>

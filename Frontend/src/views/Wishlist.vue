<script setup lang="ts">
import { onMounted } from 'vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import WishlistCards from '../components/WishlistCards.vue'
import { useWishlistStore } from '../stores/wishlistStore'

const wishlistStore = useWishlistStore()

onMounted(async () => {
  await wishlistStore.fetchWishlist()
})
</script>

<template>
	<main>
		<Header />
		<div v-if="wishlistStore.loading" class="loading-state text-center p-5">
      <div class="spinner-border"></div>
      <p>Loading wishlist data...</p>
    </div>
		<div v-else-if="wishlistStore.wishlist.length === 0" class="container d-flex align-items-center justify-content-between">
			<div></div>
			<img
				class="image-container position-absolute"
				src="/BigHeart.png"
				alt=""
			/>

			<div class="text-container text-center d-flex flex-column">
				<h1>Oops... <br />It seems it's still empty here...</h1>

				<div>
					<h3>Nothing in favorites</h3>
					<p>
						We're confident that you'll find something you like in our catalog!
					</p>
				</div>

				<div class="button-box">
					<RouterLink to="/" class="button-color1"
						>Return to home page</RouterLink
					>
				</div>
			</div>
		</div>

		<WishlistCards v-else />
		<Footer />
	</main>
</template>

<style scoped>
.container {
	padding-bottom: 150px;
}
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

@media (max-width: 768px) {
	.container {
		padding: 0 20px 120px 20px;
	}
	.image-container {
		max-width: 300px;
	}
	.text-container {
		width: 100% !important;
		margin-top: 100px;
	}
	.text-container h1 {
		font-size: 24px;
	}
	.text-container h3 {
		font-size: 18px;
	}
	.text-container p {
		font-size: 14px;
		width: 100% !important;
	}
}

@media (max-width: 480px) {
	.container {
		padding: 0 12px 80px 12px;
		flex-direction: column;
		align-items: center !important;
		justify-content: center !important;
		min-height: calc(100vh - 300px);
	}
	.image-container {
		display: none !important;
	}
	.text-container {
		width: 100% !important;
		margin-top: 0;
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
		width: 100% !important;
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
}
</style>

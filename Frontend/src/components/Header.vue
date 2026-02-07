<script lang="ts">
export default {
computed: {
    user() {
      return this.$store.state.user;
    },
  },
  
  async mounted() {
    if (this.$store.getters.isAuth && !this.$store.state.user) {
      await this.$store.dispatch('fetchProfile');
    }
  }

};
</script>

<template>
	<header class="header bg-color1">
		<div class="container d-flex align-items-center justify-content-between">
			<RouterLink to="/" class="logo text-decoration-none color2"
				>Minty</RouterLink
			>

			<div class="search-box">
				<input type="text" placeholder="Search..." />
				<button>Search</button>
			</div>

			<div class="social-links d-flex">
				<RouterLink to="/emptyFavorite">
					<img src="/favorite(heart).svg" alt=""/>
				</RouterLink>

				<RouterLink v-if="!user" to="/login"><img src="/login.svg" alt="" /></RouterLink>
				<RouterLink v-else to="/profile"><img src="/login.svg" alt="" /></RouterLink>

				<RouterLink to="/cart"><img src="/cart.svg" alt="" /></RouterLink>
			</div>
		</div>
	</header>
</template>

<style scoped>
.header {
	height: 84px;
	padding: 12px 0;
}
.search-box input {
	width: 600px;
	height: 40px;
	padding: 4px 8px;
	border: 2px solid var(--color2);
	border-radius: 5px 0 0 5px;
	outline: none;
}
.search-box button {
	background-color: var(--color2);
	color: var(--color1);
	border: 2px solid var(--color2);
	border-radius: 0 5px 5px 0;
	padding: 0 16px;
	height: 40px;
}
.social-links {
	gap: 25px;
}
</style>

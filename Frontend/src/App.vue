<script lang="ts">
export default {
  async created() {
    await this.$store.dispatch('initializeAuth');
  }
}
</script>

<template>
	<RouterView />
</template>

<style scoped></style>

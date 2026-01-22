<template>
  <div>
    <h2>Профиль</h2>
    <p v-if="user">Вы вошли как: {{ user.email }}</p>
    <button @click="logout">Выйти</button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('fetchProfile');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>

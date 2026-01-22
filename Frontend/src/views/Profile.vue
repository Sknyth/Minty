<template>
  <Header />
  <div>
    <h2>Профиль</h2>
    <p v-if="user">Вы вошли как: {{ user.email }}, {{ user.name }}</p>
    <button @click="logout">Выйти</button>
  </div>
  <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
  components: { Header, Footer},
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

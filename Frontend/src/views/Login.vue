<template>
  <div>
    <h2>Вход</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { email: '', password: '', message: '' };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });

        this.$router.push('/profile');
      } catch (e) {
        this.message = 'Ошибка входа';
      }
    },
  },
};
</script>


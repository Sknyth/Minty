<script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  export default{
    components: { Header, Footer },
    data() {
      return {
        email: '',
        password: '',
        name: '',
        message: '',
      };
    },
    methods: {
    async signUp() {
      try {
        await this.$store.dispatch('signUp', {
          email: this.email,
          password: this.password,
          name: this.name,
        });

        this.$router.push('/profile');
      } catch (e) {
        this.message = e.message || 'Ошибка регистрации';
      }
    },
  },
}
  
  
</script>

<template>
    <Header />
      <div class="bg-color1 d-flex flex-column justify-content-center auth-box" >
        <div class="d-flex flex-column align-items-center border-0">
          <div class="d-flex flex-column align-items-center ">
            <h1 class="modal-title fs-2 color2">Sign Up</h1>
            <p class="text-light fw-light">Create a new account</p>
          </div>
        </div>
        <form action="post" class="" @submit.prevent="signUp">
          <div class="mb-3">
            <label for="exampleInputName2" class="form-label text-white">Name</label>
            <input v-model="name" type="text" class="form-control" id="exampleInputName2" aria-describedby="emailHelp" placeholder="Alex" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail2" class="form-label text-white">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="example@gmail.com" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword2" class="form-label text-white">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword2" placeholder="123..."/>
          </div>
          <button type="submit" class="btn bg-color2 color1 w-100">Sign Up</button>
        </form>
        <div class="error">
          <p v-if="message" class="text-danger fw-bold">{{ message }}</p>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <p class="text-light fw-light">Already have an account?</p>
          <router-link to="/login" class="empty-btn color2">Sign In!</router-link>
        </div>
      </div>
    <Footer />
</template>

<style scoped>
.auth-box {
  width: 400px;
  margin: 150px auto;
  padding: 20px;
  border-radius: 8px;
}
.form-control {
  border: none;
}
.error {
  margin-top: 10px;
}
.error p {
  padding: 0;
  margin: 0;
}

</style>
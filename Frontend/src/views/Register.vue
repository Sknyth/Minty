<script>
  import axios from 'axios';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  export default{
    components: { Header, Footer },
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
        });

        this.$router.push('/profile');
      } catch (e) {
        this.message = 'Ошибка регистрации';
      }
    },
  },
}
  
  
</script>

<template>
    <Header />
    <div class=" d-flex justify-content-center">
      <form action="post" class="bg-color1" @submit.prevent="register">
          <!-- <div class="mb-3">
            <label for="exampleInputName2" class="form-label text-white">Name</label>
            <input v-model="name" type="text" class="form-control" id="exampleInputName2" aria-describedby="emailHelp" placeholder="Alex" />
          </div> -->
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
    </div>
    
    <Footer />
</template>

<style scoped>
  form {
    width: 400px;
    margin: 150px auto;
    padding: 20px;
    border-radius: 8px;
  }
  .form-control {
    border: none;
  }

</style>
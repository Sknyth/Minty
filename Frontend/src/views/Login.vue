<script>
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
export default {
  components: { Header, Footer },
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return { email: '', password: '', message: '' };
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('signIn', {
          email: this.email,
          password: this.password,
        });

        this.$router.push('/profile');
        this.toast.success("Sign in successful!");
      } catch (e) {
        // this.message = e.message || 'Ошибка входа';
        if(e.message === 'Invalid login credentials'){
          this.toast.error('Error: ' + 'Email or password is incorrect');
          return
        }
        if(e.message === 'missing email or phone'){
          this.toast.error('Error: ' + 'All fields are required');
          return
        }
        this.toast.error('Error: ' + e.message);
      }
    },
  },
};
</script>

<template>
  <Header />
  <div class="bg-color1 d-flex flex-column justify-content-center auth-box" >
    <div class="d-flex flex-column align-items-center">  
        <div class="d-flex flex-column align-items-center ">
          <h1 class="fs-2 color2">Sign In</h1>
          <p class="text-light fw-light">Sign in to your account</p>
      </div>
    </div>
    <form @submit.prevent="signIn" class="bg-color1">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label text-white">Email address</label>
        <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="example@gmail.com" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label text-white">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="123..."/>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" />
        <label class="form-check-label text-white">Remember me</label>
      </div>
      <button type="submit" class="btn bg-color2 color1 w-100">Sign In</button>
    </form>
    <!-- <div class="error">
      <p class="text-danger">{{ message }}</p>
    </div> -->
    <div class="d-flex justify-content-center mt-4">
        <p class="text-light fw-light">Don't have an account yet?</p>
        <router-link to="/register" class="empty-btn color2">Sign up!</router-link>
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
<script>
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/authStore'

  export default{
    components: { Header, Footer },
    setup() {
      const toast = useToast()
      const authStore = useAuthStore()
      return { toast, authStore }
    },
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
        await this.authStore.signUp({
          email: this.email,
          password: this.password,
          name: this.name,
        })

        this.$router.push('/profile')
        this.toast.success("Sign up successful!");
      } catch (e) {
        if(e.message === 'Signup requires a valid password'){
          this.toast.error('Error: ' + 'Password is required')
          return
        }
        if(e.message === 'Anonymous sign-ins are disabled'){
          this.toast.error('Error: ' + 'All fields are required')
          return
        }
        this.toast.error('Error: ' + e.message)
      }
    },
  },
}
  
  
</script>

<template>
    <Header />
    <div class="d-flex container">
      <div class="bg-color1 d-flex flex-column justify-content-center reg-box" >
        <div class="d-flex flex-column align-items-center">
          <div class="d-flex flex-column align-items-center ">
            <h1 class="modal-title fs-2 color2">Sign Up</h1>
            <p class="text-light fw-light">Create a new account</p>
          </div>
        </div>
        <form action="post" class="" @submit.prevent="signUp">
          <div class="mb-3">
            <label for="exampleInputName2" class="form-label text-white">Name</label>
            <input v-model="name" type="text" class="w-100" id="exampleInputName2" aria-describedby="emailHelp" placeholder="Alex" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail2" class="form-label text-white">Email address</label>
            <input v-model="email" type="email" class="w-100" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="example@gmail.com" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword2" class="form-label text-white">Password</label>
            <input v-model="password" type="password" class="w-100" id="exampleInputPassword2" placeholder="123..."/>
          </div>
          <button type="submit" class="button-color2 w-100">Sign Up</button>
        </form>
        <div class="d-flex justify-content-center mt-4">
          <p class="text-light fw-light">Already have an account?</p>
          <router-link to="/login" class="empty-btn color2">Sign In!</router-link>
        </div>
      </div>
    </div>
      
    <Footer />
</template>

<style scoped>
.container{
	min-height: 70vh;
}
.reg-box {
  width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
}
.form-control {
  border: none;
}

input {
	border: 3px solid rgba(45, 138, 114, 0.2);
	border-radius: 12px;
	padding: 8px 10px;
	font-size: 15px;
	font-family: inherit;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
input:hover{
	border-color: var(--color2);
	box-shadow: 0 0 0 3px rgba(45, 138, 114, 0.12);
}
input:focus {
	outline: none;
	border-color: var(--color2);
	box-shadow: 0 0 0 3px rgba(45, 138, 114, 0.15);
}
</style>
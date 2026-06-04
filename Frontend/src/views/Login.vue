<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/authStore'

const toast = useToast()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const signIn = async () => {
  try {
    await authStore.signIn({
      email: email.value,
      password: password.value,
    })
    router.push('/profile')
    toast.success("Sign in successful!")
  } catch (e) {
    toast.error('Error: ' + (e as Error).message)
  }
}
</script>

<template>
  <div>
    <Header />
    <div class="d-flex container">
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
            <input v-model="email" type="email" class="w-100" aria-describedby="emailHelp" placeholder="example@gmail.com" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label text-white">Password</label>
            <input v-model="password" type="password" class="w-100" placeholder="123..."/>
          </div>
          <button type="submit" class="button-color2 w-100">Sign In</button>
        </form>
        <div class="d-flex justify-content-center mt-4">
            <p class="text-light fw-light">Don't have an account yet?</p>
            <router-link to="/register" class="color2">Sign up!</router-link>
          </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>


<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 12px 150px 12px;
}

.auth-box {
  width: 400px;
  padding: 40px;
  border-radius: 18px;
}

.error {
  margin-top: 10px;
}

.error p {
  padding: 0;
  margin: 0;
}

input {
  border: 3px solid rgba(45, 138, 114, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 16px;
}

input:hover {
  border-color: var(--color2);
  box-shadow: 0 0 0 3px rgba(45, 138, 114, 0.12);
}

input:focus {
  outline: none;
  border-color: var(--color2);
  box-shadow: 0 0 0 3px rgba(45, 138, 114, 0.15);
}

@media (max-width: 768px) {
  .container {
    padding: 60px 12px 120px 12px;
  }

  .auth-box {
    width: 90%;
    max-width: 380px;
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 40px 12px 120px 12px;
  }

  .auth-box {
    width: 100%;
    padding: 24px 16px;
    border-radius: 12px;
  }

  .auth-box h1 {
    font-size: 24px;
  }

  input {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>
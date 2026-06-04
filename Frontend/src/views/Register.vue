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
const name = ref('')

const signUp = async () => {
  try {
    await authStore.signUp({
      email: email.value,
      password: password.value,
      name: name.value,
    })
    router.push('/profile')
    toast.success("Sign up successful!")
  } catch (e) {
    toast.error('Error: ' + (e as Error).message)
  }
}
</script>

<template>
  <div>
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

.reg-box {
  width: 400px;
  padding: 40px;
  border-radius: 18px;
}

.form-control {
  border: none;
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

  .reg-box {
    width: 90%;
    max-width: 380px;
    padding: 30px 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 40px 12px 120px 12px;
  }

  .reg-box {
    width: 100%;
    padding: 24px 16px;
    border-radius: 12px;
  }

  .reg-box h1 {
    font-size: 24px;
  }

  input {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>
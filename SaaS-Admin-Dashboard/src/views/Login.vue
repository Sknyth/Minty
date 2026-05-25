<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
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
    router.push('/')
    toast.success('Sign in successful!')
  } catch (e) {
    toast.error('Error: ' + (e as Error).message)
  }
}
</script>

<template>
  <div class="d-flex container">
    <div class="bg-color1 d-flex flex-column justify-content-center auth-box">
      <div class="d-flex flex-column align-items-center">
        <div class="d-flex flex-column align-items-center">
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
          <input v-model="password" type="password" class="w-100" placeholder="123..." />
        </div>
        <button type="submit" class="button-color2 w-100">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 80vh;
}
.auth-box {
  width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
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
  padding: 8px 10px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
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
</style>
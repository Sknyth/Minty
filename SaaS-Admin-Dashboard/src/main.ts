import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue-toastification/dist/index.css'

import Toast from "vue-toastification"
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'


const app = createApp(App)
const pinia = createPinia()

const options = {
  position: "top-right",
  maxToasts: 10,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true
}

app.use(pinia)
app.use(router)
app.use(Toast, options)

async function init() {
  const authStore = useAuthStore()
  await authStore.initializeAuth()
  app.mount('#app')
}

init()
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'


const app = createApp(App)
const store = createPinia()

const options = {
  position: "top-right",
  maxToasts: 10,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true
}

app.use(router)
app.use(store)
app.use(Toast, options)
const authStore = useAuthStore()
authStore.getUser().then(async () => {
  await authStore.getUser()
})


await authStore.getUser()


app.mount('#app')


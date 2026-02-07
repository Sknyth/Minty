import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/main.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'


const app = createApp(App)

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
store.dispatch('getUser').then(() => {
  app.mount('#app')
})



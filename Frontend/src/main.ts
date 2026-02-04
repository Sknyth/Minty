import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/store'

const app = createApp(App)

app.use(router)
app.use(store)
store.dispatch('getUser').then(() => {
  app.mount('#app')
})



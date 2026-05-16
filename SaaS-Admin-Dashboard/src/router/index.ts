import { createMemoryHistory, createRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import OrderInfo from '../views/OrderInfo.vue'

const routes = [
  { path: '/', component: Dashboard, name: 'Dashboard' },
  { path: '/login', component: Login, name: 'Login', meta: { notAuth: true } },
  { path: '/users', component: Users, name: 'Users' },
  { path: '/products', component: Products, name: 'Products' },
  { path: '/orders', component: Orders, name: 'Orders' },
  { path: '/orderInformation:id', component: OrderInfo, name: 'OrderInfo' },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuth) {
      await authStore.initializeAuth()
    }

  const isAuth = authStore.isAuth

  if (!to.meta?.notAuth && !isAuth) {
    return next('/login')
  }
  if (to.meta?.notAuth && isAuth) {
    return next('/')
  }

  next()
})

export default router
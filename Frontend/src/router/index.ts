import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store'

import Cart from '@/views/Cart.vue'
import EmptyFavorite from '@/views/EmptyFavorite.vue'
import HomeView from '@/views/HomeView.vue'
import Item from '@/views/Item.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'


const routes = [
	{ path: '/', component: HomeView, name: 'HomeView' },
	{ path: '/cart', component: Cart, name: 'Cart' },
	{ path: '/emptyFavorite', component: EmptyFavorite, name: 'EmptyFavorite' },
	{ path: '/item', component: Item, name: 'Item' },
	{ path: '/register', component: Register, name: 'Register' },
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } }
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuth;

  if (to.meta.requiresAuth && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase.js'

import Cart from '@/views/Cart.vue'
import EmptyFavorite from '@/views/EmptyFavorite.vue'
import HomeView from '@/views/HomeView.vue'
import Item from '@/views/Item.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import OrderPlacement from '@/views/OrderPlacement.vue'


const routes = [
	{ path: '/', component: HomeView, name: 'HomeView' },
	{ path: '/cart', component: Cart, name: 'Cart' },
	{ path: '/emptyFavorite', component: EmptyFavorite, name: 'EmptyFavorite' },
	{ path: '/item', component: Item, name: 'Item' },
	{ path: '/register', component: Register, name: 'Register' },
	{ path: '/login', component: Login, name: 'Login' },
	{ path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
	{ path: '/OrderPlacement', component: OrderPlacement, name: 'OrderPlacement' },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  const isAuth = !!session;

  if (to.meta.requiresAuth && !isAuth) {
    next('/login');
  } else if (to.path === '/login' && isAuth) {
    next('/profile');
  } else {
    next();
  }
});

export default router;

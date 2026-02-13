import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase.js'

import Cart from '@/views/Cart.vue'
import EmptyFavorite from '@/views/EmptyFavorite.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import HomeView from '@/views/HomeView.vue'
import Item from '@/views/Item.vue'
import Login from '@/views/Login.vue'
import OrderPlacement from '@/views/OrderPlacement.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'


const routes = [
	{ path: '/', component: HomeView, name: 'HomeView' },
	{ path: '/cart', component: Cart, name: 'Cart' },
	{ path: '/emptyFavorite', component: EmptyFavorite, name: 'EmptyFavorite' },
	{ path: '/item:id', component: Item, name: 'Item' },
	{ path: '/register', component: Register, name: 'Register', meta: { notAuth: true } },
	{ path: '/login', component: Login, name: 'Login', meta: { notAuth: true } },
	{ path: '/forgotPassword', component: ForgotPassword, name: 'ForgotPassword', meta: { notAuth: true } },
	{ path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true, fromCart: true } },
	{ path: '/orderPlacement', component: OrderPlacement, name: 'OrderPlacement', meta: { requiresAuth: true } },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const { data: { session } } = await supabase.auth.getSession()
	const isAuth = !!session

	if (to.meta.requiresAuth && !isAuth) {
		return next('/login')
	}

	if (to.meta.notAuth && isAuth) {
		return next('/profile')
	}

	if (to.name === 'OrderPlacement') {
		if (from.name !== 'Cart' && from.name !== 'Item') {
			return next('/cart')
		}
	}

	next()
})

export default router

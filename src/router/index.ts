import Cart from '@/views/Cart.vue'
import EmptyFavorite from '@/views/EmptyFavorite.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: HomeView, name: 'HomeView' },
	{ path: '/Cart', component: Cart, name: 'Cart' },
	{ path: '/EmptyFavorite', component: EmptyFavorite, name: 'EmptyFavorite' },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

import EmptyCart from '@/views/EmptyCart.vue'
import EmptyFavorite from '@/views/EmptyFavorite.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: HomeView, name: 'HomeView' },
	{ path: '/EmptyCart', component: EmptyCart, name: 'EmptyCart' },
	{ path: '/EmptyFavorite', component: EmptyFavorite, name: 'EmptyFavorite' },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router

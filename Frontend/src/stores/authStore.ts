import { defineStore } from 'pinia'
import type { User } from '@/types'
import { useCartStore } from './cartStore'
import router from '@/router'
import { API_URL } from '@/api/config'
import { useWishlistStore } from './wishlistStore'
import { useProductsStore } from './productsStore'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		access_token: localStorage.getItem('access_token') || null,
		refresh_token: localStorage.getItem('refresh_token') || null,
		loading: true,
		error: false
	}),
	getters: {
		isAuth: (state) => !!state.access_token,
	},
	actions: {
		async signUp({ email, password, name }: { email: string, password: string, name: string }) {
			const req = await fetch(`${API_URL}/user`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password,
					name,
					surname: '',
					phone: '',
				})
			})
			if (!req.ok) throw new Error('Failed to create user')
			await this.signIn({ email, password })
			router.push('/profile')
		},

		async signIn({ email, password }: { email: string, password: string }) {
			const req = await fetch(`${API_URL}/auth/signin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			})
			if (!req.ok) throw new Error('Failed to sign in')
			const { access_token, refresh_token } = await req.json()
			this.access_token = access_token
			this.refresh_token = refresh_token
			localStorage.setItem('access_token', access_token)
			localStorage.setItem('refresh_token', refresh_token)
			await this.getUser()
		},

		async getUser() {
			this.loading = true
			this.error = false
			try{
				if (!this.access_token) return;
				const res = await fetch(`${API_URL}/auth/profile`, {
					headers: { Authorization: `Bearer ${this.access_token}` },
				});
				if (!res.ok) {
					this.error = true
					return
				}
				this.user = await res.json()
			} finally {
				this.loading = false
			}
		},

		async refreshToken() {
			const refresh_token = localStorage.getItem('refresh_token');
			if (!refresh_token) {
				this.signOut();
				return;
			}
			const res = await fetch(`${API_URL}/auth/refresh`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refresh_token }),
			});
			if (!res.ok) {
				this.signOut();
				return;
			}
			const data = await res.json();
			if (!data.access_token) {
				this.signOut();
				return;
			}
			this.access_token = data.access_token;
			localStorage.setItem('access_token', data.access_token);
		},

		async initializeAuth() {
			const cartStore = useCartStore()
			const wishlistStore = useWishlistStore()
			const productStore = useProductsStore()
			if (!this.access_token && !this.refresh_token) return;
			if (this.access_token) {
				await this.getUser()
			}
			if (!this.user && this.refresh_token) {
				await this.refreshToken()
				if (this.access_token) {
					await this.getUser()
				}
			}
			if (!this.user) {
				this.signOut()
				return;
			}
			await productStore.fetchProducts()
			await wishlistStore.fetchWishlist()
			await cartStore.fetchCart()
		},

		async signOut() {
			const cartStore = useCartStore()
			this.user = null
			this.access_token = null
			this.refresh_token = null 
			cartStore.cartItems = []
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token') 
		},

		async updateUser(name: string, surname: string, phone: string) {
			if (!this.user) return
			const req = await fetch(`${API_URL}/user/update/${this.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.access_token}`,
				},
				body: JSON.stringify({ name, surname, phone })
			})
			if (!req.ok) throw new Error('Failed to update profile')
			await this.getUser()
		},

		async changePass(oldPass: string, newPass: string) {
			if (!this.user) return
			const req = await fetch(`${API_URL}/user/changePass/${this.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.access_token}`,
				},
				body: JSON.stringify({ oldPass, newPass })
			})
			const data = await req.json()

			if (!req.ok) throw new Error(data.message)
				
			await this.signOut()
			router.push('/login')
		}
	},
})
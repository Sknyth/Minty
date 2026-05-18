import { defineStore } from 'pinia'
import router from '../router'
import type { User } from '../types'
import { API_URL } from '../api/config'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		isAuth: false,
		loading: false,
		access_token: localStorage.getItem('access_token') || null,
		refresh_token: localStorage.getItem('refresh_token') || null
	}),
	actions: {
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
			router.push('/')
		},

		async signOut() {
			this.user = null
			this.access_token = null
			this.refresh_token = null
			this.isAuth = false 
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token') 
			router.push('/login')
		},

		async getUser() {
			if (!this.access_token) return;
			const res = await fetch(`${API_URL}/auth/profile`, {
				headers: { Authorization: `Bearer ${this.access_token}` },
			});
			if (!res.ok) return
			const data: User = await res.json()

			if (data?.role !== 'admin') {
				await this.signOut()
				throw new Error('You are not an administrator')
			}

			this.user = data
			this.isAuth = true
			router.push('/')
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
		},
	}
})
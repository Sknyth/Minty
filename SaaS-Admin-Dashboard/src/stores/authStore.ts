import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import type { User } from '../types'
import { API_URL } from '../api/config'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<User | null>(null)
	const isAuth = ref(false)
	const loading = ref(false)
	const access_token = ref<string | null>(localStorage.getItem('access_token'))
	const refresh_token = ref<string | null>(localStorage.getItem('refresh_token'))

	const signIn = async ({ email, password }: { email: string, password: string }) => {
		const req = await fetch(`${API_URL}/auth/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
		if (!req.ok) throw new Error('Failed to sign in')
		const { access_token: accessToken, refresh_token: refreshToken } = await req.json()

		access_token.value = accessToken
		refresh_token.value = refreshToken
		localStorage.setItem('access_token', accessToken)
		localStorage.setItem('refresh_token', refreshToken)

		await getUser()
		router.push('/')
	}

	const signOut = async () => {
		user.value = null
		access_token.value = null
		refresh_token.value = null
		isAuth.value = false
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		router.push('/login')
	}

	const getUser = async () => {
		if (!access_token.value) return
		const res = await fetch(`${API_URL}/auth/profile`, {
			headers: { Authorization: `Bearer ${access_token.value}` },
		})
		if (!res.ok) return
		const data: User = await res.json()

		if (data?.role !== 'admin') {
			await signOut()
			throw new Error('You are not an administrator')
		}

		user.value = data
		isAuth.value = true
		router.push('/')
	}

	const refreshToken = async () => {
		const storedRefreshToken = localStorage.getItem('refresh_token')
		if (!storedRefreshToken) {
			signOut()
			return
		}

		const res = await fetch(`${API_URL}/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: storedRefreshToken }),
		})

		if (!res.ok) {
			signOut()
			return
		}

		const data = await res.json()
		if (!data.access_token) {
			signOut()
			return
		}

		access_token.value = data.access_token
		localStorage.setItem('access_token', data.access_token)
	}

	const initializeAuth = async () => {
		if (!access_token.value && !refresh_token.value) return

		if (access_token.value) {
			await getUser()
		}

		if (!user.value && refresh_token.value) {
			await refreshToken()
			if (access_token.value) {
				await getUser()
			}
		}

		if (!user.value) {
			signOut()
			return
		}
	}

	return {
		user,
		isAuth,
		loading,
		access_token,
		refresh_token,
		signIn,
		signOut,
		getUser,
		refreshToken,
		initializeAuth,
	}
})
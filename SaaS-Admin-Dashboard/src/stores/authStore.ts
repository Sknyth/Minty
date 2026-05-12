import supabase from '../supabase'
import { defineStore } from 'pinia'
import router from '../router'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '../types'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		users: [] as User[],
		profile: null as Profile | null,
		isAuth: false,
		loading: false,
	}),
	actions: {
		async signIn({ email, password }: { email: string; password: string }) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error

			this.user = data.user
			this.isAuth = !!this.user
			if (!this.user) this.profile = null

			await this.getUser()

		},
		async signOut() {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			this.user = null
			router.push('/login')
		},
		async getUser() {
			const { data: { session } } = await supabase.auth.getSession()

			if (!session) {
				this.user = null
				this.profile = null
				return
			}

			const user = session.user
			this.user = user

			const { data }: { data: Profile | null } = await supabase
				.from('profiles')
				.select('role')
				.eq('id', this.user.id)
				.single()

			if (data?.role === 'admin') {
				this.profile = data
				router.push('/')
			} else {
				await this.signOut()
				throw new Error('You are not an administrator')
			}

			if (data) {
				this.profile = data
			}
		},

		async fetchUsers() {
			this.loading = true
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
			if (error) throw error
			this.users = data
			this.loading = false
		},
	}
})
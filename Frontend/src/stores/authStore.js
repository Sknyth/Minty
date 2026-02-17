import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useProfileStore } from './profileStore'
import { useCartStore } from './cartStore'
export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null,
		profileStore : useProfileStore(),
		cartStore: useCartStore()
	}),
	getters: {
		isAuth: (state) => !!state.user,
	},
	actions: {
		async signUp({ email, password, name }) {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						name,
					},
				},
			})

			if (error) throw error

			this.user = data.user
		},

		async signIn({ email, password }) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error

			this.user = data.user
			this.isAuth = !!this.user
			if (!this.user) this.profile = null

			

			await Promise.all([
				this.profileStore.fetchProfile(),
				this.cartStore.fetchCart(),
				this.profileStore.fetchAddresses(),
				this.profileStore.fetchPaymentMethods()
			])
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

			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single()

			if (profile) {
				this.profile = profile
			}
		},

		async updateEmail({ email }) {
			const { data, error } = await supabase.auth.updateUser({
				email: email
			})
			if (error) throw error
		},

		async updatePassword(password) {
			const { data, error } = await supabase.auth.updateUser({
				password: password
			})
			if (error) throw error
			this.user = data.user
		},

		async initializeAuth() {
			const { data: { session } } = await supabase.auth.getSession()
			if (session) {
				this.user = session.user
				await Promise.all([
					this.profileStore.fetchProfile(),
					this.cartStore.fetchCart(),
					this.profileStore.fetchAddresses(),
					this.profileStore.fetchPaymentMethods()
				])
			}
		},
	}
})

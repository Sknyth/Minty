import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types'
import { useProfileStore } from './profileStore'
import { useCartStore } from './cartStore'
export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		profile: null as Profile | null,
	}),
	getters: {
		isAuth: (state) => !!state.user,
	},
	actions: {
		async signUp({ email, password, name }: { email: string, password: string, name: string }) {
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

		async signIn({ email, password }: { email: string, password: string }) {
			const profileStore = useProfileStore()
			const cartStore = useCartStore()

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error

			this.user = data.user
			if (!this.user) this.profile = null

			await Promise.all([
				profileStore.fetchProfile(),
				cartStore.fetchCart(),
				profileStore.fetchAddresses(),
				profileStore.fetchPaymentMethods()
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

		async updateEmail( email: string ) {
			const { error } = await supabase.auth.updateUser({
				email: email
			})
			if (error) throw error
		},

		async updatePassword(password: string) {
			const { data, error } = await supabase.auth.updateUser({
				password: password
			})
			if (error) throw error
			this.user = data.user
		},

		async initializeAuth() {
			const profileStore = useProfileStore()
			const cartStore = useCartStore()
			const { data: { session } } = await supabase.auth.getSession()
			if (session) {
				this.user = session.user
				await Promise.all([
					profileStore.fetchProfile(),
					cartStore.fetchCart(),
					profileStore.fetchAddresses(),
					profileStore.fetchPaymentMethods()
				])
			}
		},

		async signOut() {
			const cartStore = useCartStore()
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			this.user = null
			this.profile = null
			cartStore.cartItems = []
		}
	}
})

import axios from 'axios'
import { createStore } from 'vuex'
import { supabase } from '../supabase.js'

const store = createStore({
	state() {
		return {
			items: [],
			cartItems: [],
			user: null,
			isAuth: false,
			profile: null,
			payment_methods: [],
		}
	},
	getters: {
		allItems: state => state.items,
		cartItems: state => state.cartItems,
		isAuth: (state) => !!state.user,
    	user: (state) => state.user,
		profile: (state) => state.profile,
		allPayments: state => state.payment_methods
	},
	actions: {
		async fetchItems({ commit }) {
			const response = await axios.get(
				'https://a2dd1e9285d8464a.mokky.dev/items'
			)
			commit('setItems', response.data)
		},

		async signUp({ commit }, { email, password, name}) {
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

			commit('SET_USER', data.user)
    	},

		async signIn({ commit }, { email, password }) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})
			if (error) throw error
			commit('SET_USER', data.user)
		},

		async getUser({ commit }) {
			const { data: { session } } = await supabase.auth.getSession()
			
			if (!session) {
				commit('SET_USER', null)
				commit('SET_PROFILE', null)
				return
			}

			const user = session.user
			commit('SET_USER', user)

			const { data: profile, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single()

			if (profile) {
				commit('SET_PROFILE', profile)
			}
		},

		async fetchPaymentMethods({ commit, state }) {
			if (!state.user) return
			const { data: payment_methods, error } = await supabase
				.from('payment_methods')
				.select('*')
				.eq('user_id', state.user.id)
			if (error) throw error
			commit('SET_PAYMENT_METHODS', payment_methods)
		},

		async addPaymentMethod({ dispatch, state }, { number, holder_name, expiration_date, cvv }) {
			if (!state.user) throw new Error('User not authenticated')
			
			const { error } = await supabase
				.from('payment_methods')
				.insert([
					{
						user_id: state.user.id,
						number: number,
						holder_name: holder_name,
						expiration_date: expiration_date,
						cvv: cvv
					}
				])
			
			if (error) throw error
			await dispatch('fetchPaymentMethods')
		},

		async deletePaymentMethod({ commit, state }, id) {
			const { error } = await supabase
				.from('payment_methods')
				.delete()
				.eq('id', id)
			if (error) throw error
			commit('REMOVE_PAYMENT_METHOD', id);
		},
		
		async signOut({ commit }) {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			commit('SET_USER', null)
			commit('SET_PROFILE', null)
			commit('SET_PAYMENT_METHODS', null)
		},
		
	},
	mutations: {
		setItems(state, items) {
			state.items = items
		},
		ADD_TO_CART(state, item) {
     		state.cartItems.push({...item, id: Date.now()})
    	},
		REMOVE_FROM_CART(state, id){
			state.cartItems = state.cartItems.filter(item => item.id !== id)
		},
		SET_USER(state, user) {
      		state.user = user
			state.isAuth = !!user
			if (!user) state.profile = null
	    	},
		SET_PROFILE(state, profile) {
			state.profile = profile
		},
		SET_PAYMENT_METHODS(state, payment_methods) {
			state.payment_methods = payment_methods
		},
		REMOVE_PAYMENT_METHOD(state, id) {
			state.payment_methods = state.payment_methods.filter(method => method.id !== id)
		}
	},
})

export default store

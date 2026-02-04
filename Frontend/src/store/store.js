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
		}
	},
	getters: {
		allItems: state => state.items,
		cartItems: state => state.cartItems,
		isAuth: (state) => !!state.user,
    	user: (state) => state.user,
		profile: (state) => state.profile,
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
			const { data, error } = await supabase.auth.getUser()
			if (error) throw error
			commit('SET_USER', data.user)
		},

		async signOut({ commit }) {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			commit('SET_USER', null)
			commit('SET_PROFILE', null)
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
	},
})

export default store

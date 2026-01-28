import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
	state() {
		return {
			items: [],
			cartItems: [],
			token: localStorage.getItem('token') || null,
			user: null,
			isAuth: !!localStorage.getItem('token'),
		}
	},
	getters: {
		allItems: state => state.items,
		cartItems: state => state.cartItems
	},
	actions: {
		async fetchItems({ commit }) {
			const response = await axios.get(
				'https://a2dd1e9285d8464a.mokky.dev/items'
			)
			commit('setItems', response.data)
		},
		async login({ commit }, { email, password, name  }) {
		const res = await axios.post('http://localhost:3000/api/login', {
			email,
			password,
			name,
		});

		const token = res.data.token;

		localStorage.setItem('token', token);
		commit('SET_TOKEN', token);
		},

		async register({ commit }, { email, password, name }) {
		const res = await axios.post('http://localhost:3000/api/register', {
			email,
			password,
			name
		});

		const token = res.data.token;

		localStorage.setItem('token', token);
		commit('SET_TOKEN', token);
	},

		

		async fetchProfile({ commit, state }) {
		if (!state.token) {
			return;
		}

		try {
			const res = await axios.get('http://localhost:3000/api/profile', {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});

			commit('SET_USER', res.data.user);
		} catch (error) {
			console.error('Fetch profile failed:', error);
			if (error.response?.status === 401) {
				commit('LOGOUT');
			}
		}
	},

	async updateProfile({ commit, state }, { name, surname, email, phone }) {
		try {
			const res = await axios.put('http://localhost:3000/api/profile', {
				name,
				surname,
				email,
				phone,
			}, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});

			commit('SET_USER', res.data.user);
			return res.data;
		} catch (error) {
			console.error('Profile update failed:', error);
			throw error;
		}
		},



		logout({ commit }) {
		localStorage.removeItem('token');
		commit('LOGOUT');
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
		SET_TOKEN(state, token) {
		state.token = token;
		state.isAuth = true;
		},
		SET_USER(state, user) {
		state.user = user;
		},
		LOGOUT(state) {
		state.token = null;
		state.user = null;
		state.isAuth = false;
		},
		
	},
	
})

export default store
